// 게임 규칙 (화면과 분리). 브라우저와 node 시뮬레이션 둘 다에서 돌아간다
(function (root) {
  function weightedPick(items, weightOf, rng) {
    const total = items.reduce((s, it) => s + weightOf(it), 0);
    let r = rng() * total;
    for (const it of items) {
      r -= weightOf(it);
      if (r < 0) return it;
    }
    return items[items.length - 1];
  }

  function pickWithProbability(items, weightOf, rng) {
    const total = items.reduce((s, it) => s + weightOf(it), 0);
    const item = weightedPick(items, weightOf, rng);
    return { item, probability: weightOf(item) / total };
  }

  // 현실 모드: 개체 수 비율 (개체 수 자료가 없는 동물은 빠짐), 도감 모드: 모두 같은 확률
  function drawSpecies(speciesList, mode, rng) {
    const r = pickWithProbability(speciesList, mode === "real" ? (s) => s.population || 0 : () => 1, rng);
    return { species: r.item, probability: r.probability };
  }

  // 개미가 나오면 종과 계급을 한 번 더 뽑음. 현실 모드는 국내 추정 개체 수와 계급 비율대로
  function drawAnt(antSpecies, mode, rng) {
    const sp = pickWithProbability(antSpecies, mode === "real" ? (s) => s.koreaPopulation : () => 1, rng);
    const caste = pickWithProbability(sp.item.castes, mode === "real" ? (c) => c.weight : () => 1, rng);
    return {
      antSpecies: sp.item,
      speciesProbability: sp.probability,
      caste: caste.item,
      casteProbability: caste.probability,
    };
  }

  function stageAt(animal, turn) {
    let stage = animal.stages[0];
    for (const s of animal.stages) if (s.fromTurn <= turn) stage = s;
    return stage;
  }

  function startLife(animal) {
    return {
      animal,
      turn: 0,
      health: 100,
      contrib: 0,
      alive: true,
      finished: false,
      weeksLived: 0,
      log: [], // { turnLabel, stage, text, tag, choice, result }
      factors: [], // 삶에 영향을 준 사건의 태그 목록
      seen: {},
      current: null,
      death: null, // { text, tag }
      flags: Object.assign({}, animal.startFlags), // 삶의 상태 (예: 강아지의 보호소·떠돌이 여부)
    };
  }

  // when: { 플래그: true/false } 조건이 모두 맞아야 함
  function flagsMatch(state, when) {
    return !when || Object.entries(when).every(([k, v]) => !!state.flags[k] === v);
  }

  // 이번 턴의 사건 고르기. 이미 겪은 사건은 덜 나오게 함
  function nextEvent(state, rng) {
    const { animal, turn } = state;
    const t = animal.timeline[turn];
    const stage = stageAt(animal, turn);
    // seasons·stages·turns·when은 있을 때만 거름 (turns: 여왕 후보의 결혼비행처럼 그 턴에만 나오는 사건)
    const pool = animal.events.filter(
      (e) =>
        (!e.seasons || e.seasons.includes(t.season)) &&
        (!e.stages || e.stages.includes(stage.id)) &&
        (!e.turns || e.turns.includes(turn)) &&
        flagsMatch(state, e.when)
    );
    if (pool.length === 0) throw new Error(`${animal.name}: ${turn}턴(${t.label}, ${stage.name})에 나올 사건이 없음`);
    const ev = weightedPick(pool, (e) => e.weight * (state.seen[e.id] ? 0.25 : 1), rng);
    state.current = ev;
    return { event: ev, time: t, stage };
  }

  function die(state, text, tag) {
    const t = state.animal.timeline[state.turn];
    state.alive = false;
    state.finished = true;
    state.death = { text, tag };
    // 턴 도중에 죽으면 그 턴의 절반만 산 것으로 침
    state.weeksLived += Math.max(1, Math.round(t.weeks / 2));
  }

  // 선택 처리 → 생존 판정 → 턴 진행
  function choose(state, choiceIndex, rng) {
    const { animal } = state;
    const ev = state.current;
    const c = ev.choices[choiceIndex];
    const t = animal.timeline[state.turn];
    const stage = stageAt(animal, state.turn);
    const frailty = 1 + (100 - state.health) / 100; // 체력이 낮을수록 위험 최대 2배

    state.seen[ev.id] = true;
    state.factors.push(ev.tag);
    // outcomes가 있으면 p 비율대로 결과 하나가 정해짐 (보호소 처리 결과처럼 실제 통계로 갈리는 경우)
    const o = c.outcomes ? weightedPick(c.outcomes, (x) => x.p, rng) : c;
    const entry = { turnLabel: t.label, stage: stage.name, text: ev.text, tag: ev.tag, choice: c.label, result: o.result };
    state.log.push(entry);
    state.current = null;

    const dies = c.outcomes ? !!o.death : rng() < c.risk * frailty;
    if (dies) {
      const deathText = o.death || "알 수 없는 이유로 죽었다.";
      entry.result = deathText;
      die(state, deathText, ev.tag);
      return state;
    }

    state.health = Math.max(0, Math.min(100, state.health + (o.health || 0)));
    state.contrib += o.contrib || 0;
    if (o.setFlags) Object.assign(state.flags, o.setFlags);
    if (state.health <= 0) {
      die(state, animal.healthDeath.text, animal.healthDeath.tag);
      return state;
    }

    // baseRiskFactor: 상태에 따라 기본 위험을 바꿀 때 (예: 입양된 고양이는 길 위의 위험이 줄어듦)
    const factor = animal.baseRiskFactor ? animal.baseRiskFactor(state) : 1;
    const bgPool = animal.backgroundDeaths.filter((d) => d.stages.includes(stage.id) && flagsMatch(state, d.when));
    if (bgPool.length && rng() < stage.baseRisk * factor * frailty) {
      const d = bgPool[Math.floor(rng() * bgPool.length)];
      state.factors.push(d.tag);
      die(state, d.text, d.tag);
      return state;
    }

    state.weeksLived += t.weeks;
    state.contrib += t.contrib || 0; // 그 시기를 살아 내면 쌓이는 값 (산란계의 달걀 등)
    state.turn += 1;
    if (state.turn >= animal.timeline.length) state.finished = true;
    return state;
  }

  function humanShare(state) {
    if (state.factors.length === 0) return 0;
    return state.factors.filter((f) => f === "사람").length / state.factors.length;
  }

  // 같은 날 태어난 동료들: 선택을 무작위로 하는 개체 n마리
  function simulateMany(animal, n, rng) {
    const results = [];
    for (let i = 0; i < n; i++) {
      const s = startLife(animal);
      while (!s.finished) {
        const { event } = nextEvent(s, rng);
        choose(s, Math.floor(rng() * event.choices.length), rng);
      }
      results.push({ weeks: s.weeksLived, alive: s.alive, death: s.death, human: humanShare(s) });
    }
    return results;
  }

  // 한 동물 안의 갈래(강아지의 출신 등) 뽑기. 현실 모드는 weight 비율대로
  function drawVariant(variants, mode, rng) {
    const r = pickWithProbability(variants, mode === "real" ? (v) => v.weight : () => 1, rng);
    return { variant: r.item, probability: r.probability };
  }

  const api = { drawSpecies, drawAnt, drawVariant, stageAt, startLife, nextEvent, choose, humanShare, simulateMany };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.Engine = api;
})(typeof window !== "undefined" ? window : globalThis);
