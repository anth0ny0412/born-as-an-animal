// 화면 그리기와 버튼 연결
const app = document.getElementById("app");
const rng = Math.random;
let mode = "real";
let state = null;

// 큰 수를 "2,222만"처럼 표시
function koreanNumber(n) {
  const units = [[1e16, "경"], [1e12, "조"], [1e8, "억"], [1e4, "만"]];
  for (const [v, name] of units) {
    if (n >= v) return Math.round(n / v).toLocaleString("ko-KR") + name;
  }
  return Math.round(n).toLocaleString("ko-KR");
}

function probabilityText(p) {
  if (p >= 0.5) return (p > 0.999 ? (p * 100).toFixed(5) : (p * 100).toFixed(1)) + "%";
  if (p >= 0.01) return (p * 100).toFixed(1).replace(/\.0$/, "") + "%";
  return "약 " + koreanNumber(1 / p) + " 분의 1";
}

// 받침에 따라 "로" / "으로"
function ro(word) {
  const code = word.charCodeAt(word.length - 1) - 0xac00;
  if (code < 0 || code > 11171) return "(으)로";
  const jong = code % 28;
  return jong === 0 || jong === 8 ? "로" : "으로";
}

// 시간 단위. 기본은 주, 육계처럼 짧게 사는 동물은 일
function unit(a) {
  return a.unit || "주";
}

// 끝까지 산 경우의 문구. 강아지처럼 마지막 상태에 따라 달라지면 함수로 둠
function endText(state) {
  const t = state.animal.endText;
  return typeof t === "function" ? t(state) : t;
}

function tagBadge(tag, note) {
  return `<span class="tag ${tag}">${tag === "사람" ? "사람의 영향" : "자연"}${note ? " · " + note : ""}</span>`;
}

function meter(label, value, max, cls, shown) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return `<div class="meter"><label><span>${label}</span><b>${shown || value}</b></label>
    <div class="track"><div class="fill ${cls}" style="width:${pct}%"></div></div></div>`;
}

// 동물 그룹 → 화면 색 테마
const GROUP_THEME = {
  "곤충": "insect", "가축": "farm", "반려동물": "pet", "도시 동물": "city",
  "야생 동물": "wild", "멸종위기": "endangered", "바다 동물": "sea",
};
function setTheme(species) {
  if (species) app.dataset.group = GROUP_THEME[species.group] || "";
  else delete app.dataset.group;
}

// 개체 수 자료가 없는 동물은 현실 모드에서 빠지고 도감 모드에서만 나옴
function animalProbability(species) {
  const weightOf = (s) => (mode === "real" ? s.population || 0 : 1);
  return weightOf(species) / SPECIES.reduce((s, sp) => s + weightOf(sp), 0);
}

// 확률 막대 길이: 현실 모드는 로그 눈금 (1조 분의 1 ~ 100%)
function barWidth(p) {
  if (!p) return 0;
  return Math.max(3, Math.min(100, ((Math.log10(p) + 12) / 12) * 100));
}

function animalNote(species) {
  return mode === "real" ? species.popSource : "도감 모드라 모든 동물이 같은 확률";
}

// ---------- 1. 뽑기 화면 ----------
function rankRow(sp, i) {
  const off = mode === "real" && !sp.population;
  const p = off ? 0 : animalProbability(sp);
  return `
    <li class="${off ? "off" : ""}">
      <span class="no">${off ? "" : i + 1}</span>
      <span class="em">${sp.emoji}</span>
      <span class="nm"><b>${sp.name}</b><span class="chip plain">${sp.group}</span>
        <div class="bar"><i style="width:${off ? 0 : barWidth(p)}%"></i></div></span>
      <span class="pr">${off ? "자료 없음" : probabilityText(p)}</span>
    </li>`;
}

function renderDraw() {
  setTheme(null);
  // 현실 모드에서는 많은 순으로, 자료 없는 동물은 맨 아래
  const list = mode === "real" ? SPECIES.slice().sort((a, b) => (b.population || 0) - (a.population || 0)) : SPECIES;
  const top = list.slice(0, 8);
  const rest = list.slice(8);
  const ring = ["🐜", "🐔", "🐕", "🦌", "🐟", "🐝", "🦊", "🐻", "🐬", "🐈"];
  const ringHtml = ring.map((e, i) => {
    const x = 6 + i * 9.6;
    const y = i % 2 ? 34 : 6;
    return `<span style="left:${x}%;top:${y}px;--r:${(i % 3 - 1) * 8}deg;animation-delay:${(i * 0.37).toFixed(2)}s">${e}</span>`;
  }).join("");

  app.innerHTML = `
    <header class="hero fade">
      <div class="emoji-ring" aria-hidden="true">${ringHtml}</div>
      <h1 class="display">동물로 태어나기</h1>
      <p class="sub">다음 생에 한국에서 동물로 태어난다면,<br>어떤 삶을 살게 될까?</p>
    </header>

    <div class="segmented fade" role="tablist">
      <button data-mode="real" class="${mode === "real" ? "on" : ""}" role="tab" aria-selected="${mode === "real"}">
        <b>현실 모드</b><span>실제 개체 수 비율대로</span></button>
      <button data-mode="dex" class="${mode === "dex" ? "on" : ""}" role="tab" aria-selected="${mode === "dex"}">
        <b>도감 모드</b><span>모든 동물이 같은 확률로</span></button>
    </div>

    <section class="card fade">
      <div class="card-head"><span class="icon">🎲</span><h2>태어날 확률</h2></div>
      <ul class="rank">${top.map(rankRow).join("")}</ul>
      ${rest.length ? `
        <details class="more">
          <summary><span class="closed">나머지 ${rest.length}종 더 보기 ▾</span><span class="opened">접기 ▴</span></summary>
          <ul class="rank">${rest.map((sp, i) => rankRow(sp, i + 8)).join("")}</ul>
        </details>` : ""}
      <p class="small" style="margin-top:12px">국내 추정 개체 수 기준으로 ${SPECIES.length}종 중에서 뽑아요. 개체 수 자료가 없는 동물은 현실 모드에서 빠지고 도감 모드에서만 나와요.</p>
    </section>

    <button class="primary fade" id="draw" data-enter>🎲 태어나기</button>
    <div class="btn-row fade">
      <button class="btn" id="dex">📖 도감 ${allLives().filter((l) => loadDex()[l.lifeId]).length}/${allLives().length}</button>
      <button class="btn" id="sources">📚 자료 출처</button>
    </div>`;

  app.querySelectorAll("[data-mode]").forEach((b) =>
    b.addEventListener("click", () => { mode = b.dataset.mode; renderDraw(); })
  );
  document.getElementById("draw").addEventListener("click", rollAnimation);
  document.getElementById("sources").addEventListener("click", renderSources);
  document.getElementById("dex").addEventListener("click", renderDex);
  window.scrollTo(0, 0);
}

// 슬롯머신처럼 점점 느려지다 멈춤
function rollAnimation() {
  const result = Engine.drawSpecies(SPECIES, mode, rng);
  app.innerHTML = `
    <div class="card slot fade">
      <div class="slot-window" id="roll" aria-live="polite">❔</div>
      <h2 class="display">무엇으로 태어날까…</h2>
      <p>${mode === "real" ? "실제 개체 수 비율로 뽑는 중" : "모든 동물이 같은 확률로 뽑는 중"}</p>
    </div>`;
  const el = document.getElementById("roll");
  const pool = SPECIES.map((s) => s.emoji);
  let delay = 50;
  let i = 0;
  const tick = () => {
    el.textContent = pool[i++ % pool.length];
    delay *= 1.12;
    if (delay < 320) setTimeout(tick, delay);
    else setTimeout(() => renderBirth(result), 350);
  };
  tick();
}

// ---------- 2. 탄생 화면 ----------
function birthHero(emoji, name, total, desc) {
  const modeName = mode === "real" ? "현실 모드" : "도감 모드";
  return `
    <section class="card birth fade">
      <div class="big-emoji">${emoji}</div>
      <p class="label">당신은</p>
      <h2 class="display">${name}${ro(name)} 태어났습니다</h2>
      <span class="prob-pill">${modeName} 확률 · ${probabilityText(total)}</span>
      ${desc ? `<p class="desc">${desc}</p>` : ""}
    </section>`;
}

function stepsCard(steps) {
  return `
    <section class="card fade">
      <div class="card-head"><span class="icon">🧮</span><h2>이 확률은 이렇게 나왔어요</h2></div>
      <ol class="steps">
        ${steps.map((s, i) => `
          <li data-n="${i + 1}">
            <div class="row"><b>${s.title}</b><span>${probabilityText(s.p)}</span></div>
            <p class="small">${s.note}</p>
          </li>`).join("")}
      </ol>
    </section>`;
}

function renderBirth({ species, probability }) {
  setTheme(species);
  if (species.antSpecies) return renderAntBirth(species, probability);
  if (species.variants) return renderVariantBirth(species, probability);

  app.innerHTML = `
    ${birthHero(species.emoji, species.name, probability, "")}
    ${stepsCard([{ title: `동물 중 ${species.name}`, p: probability, note: animalNote(species) }])}
    <button class="primary fade" id="start" data-enter>삶 시작하기</button>`;
  document.getElementById("start").addEventListener("click", () => startGame(species.id, { species }));
  window.scrollTo(0, 0);
}

// 개미: 종과 계급까지 뽑고, 확률을 단계별로 보여줌
function renderAntBirth(species, probability) {
  const a = Engine.drawAnt(ANT_SPECIES, mode, rng);
  const life = ANIMALS[a.caste.life];
  const total = probability * a.speciesProbability * a.casteProbability;
  const speciesNote = mode === "real" ? a.antSpecies.popNote : "도감 모드라 모든 종이 같은 확률";
  const casteNote = a.antSpecies.castes.length === 1
    ? "이 종은 아직 일개미의 삶만 준비돼 있어요"
    : mode === "real" ? "계급 비율은 가정값, 확인 필요" : "도감 모드라 모든 계급이 같은 확률";

  app.innerHTML = `
    ${birthHero(life.emoji, life.name, total, `<b>${a.antSpecies.name}</b> <i>${a.antSpecies.sciName}</i><br>${a.antSpecies.desc}`)}
    ${stepsCard([
      { title: "동물 중 개미", p: probability, note: animalNote(species) },
      { title: `국내 개미 ${ANT_SPECIES.length}종 중 ${a.antSpecies.name}`, p: a.speciesProbability, note: speciesNote },
      { title: `${a.antSpecies.name} 중 ${a.caste.name}`, p: a.casteProbability, note: casteNote },
    ])}
    <button class="primary fade" id="start" data-enter>삶 시작하기</button>`;
  document.getElementById("start").addEventListener("click", () => startGame(a.caste.life, { species, antSpecies: a.antSpecies }));
  window.scrollTo(0, 0);
}

// 강아지처럼 출신 갈래가 있는 동물: 갈래를 한 번 더 뽑음
function renderVariantBirth(species, probability) {
  const { variant, probability: vp } = Engine.drawVariant(window[species.variants], mode, rng);
  const life = ANIMALS[variant.life];
  const note = mode === "real" ? variant.popNote : "도감 모드라 모든 출신이 같은 확률";
  const steps = [{ title: `동물 중 ${species.name}`, p: probability, note: animalNote(species) }];
  if (window[species.variants].length > 1) steps.push({ title: `${species.name} 중 ${variant.name}`, p: vp, note });

  app.innerHTML = `
    ${birthHero(life.emoji, variant.name, probability * vp, variant.desc)}
    ${stepsCard(steps)}
    <button class="primary fade" id="start" data-enter>삶 시작하기</button>`;
  document.getElementById("start").addEventListener("click", () => startGame(variant.life, { species, variant }));
  window.scrollTo(0, 0);
}

// ---------- 3. 플레이 화면 ----------
// origin: 어떤 동물(과 개미 종)로 뽑혔는지. 결과 화면의 세계 비교와 색 테마에 씀
function startGame(lifeId, origin) {
  state = Engine.startLife(ANIMALS[lifeId]);
  state.origin = origin;
  state.lifeId = lifeId;
  setTheme(origin.species);
  app.innerHTML = `
    <section class="card birth fade">
      <div class="big-emoji">${state.animal.emoji}</div>
      <h2 class="display" style="margin-top:8px">${state.animal.name}의 삶</h2>
    </section>
    <section class="card fade"><p class="story">${state.animal.intro}</p></section>
    <button class="primary fade" id="go" data-enter>눈을 뜬다</button>`;
  document.getElementById("go").addEventListener("click", renderTurn);
  window.scrollTo(0, 0);
}

function hud() {
  const a = state.animal;
  const turn = Math.min(state.turn, a.timeline.length - 1);
  const t = a.timeline[turn];
  const stage = Engine.stageAt(a, turn);
  const flags = Object.entries(a.flagLabels || {}).filter(([k]) => state.flags[k]).map(([, label]) => label);
  const hpCls = state.health < 35 ? "low" : state.health < 65 ? "mid" : "";
  const dots = a.timeline.map((_, i) =>
    `<i class="${i < state.turn ? "done" : i === state.turn && !state.finished ? "now" : ""}"></i>`).join("");

  return `
    <section class="card hud">
      <div class="hud-top">
        <div class="avatar">${a.emoji}</div>
        <div class="who">
          <b>${a.name}</b>
          <div class="chips"><span class="chip">${stage.name}</span>${flags.map((f) => `<span class="chip plain">${f}</span>`).join("")}</div>
        </div>
      </div>
      <div class="dots" aria-hidden="true">${dots}</div>
      <div class="when-line"><span>📅 ${t.label}</span><span>${t.season}</span></div>
      <div class="meters">
        ${meter("❤️ 체력", state.health, 100, "hp " + hpCls)}
        ${meter(`⏳ 산 기간`, state.weeksLived, a.lifespan.weeks, "", `${state.weeksLived.toLocaleString()}${unit(a)}`)}
      </div>
      ${a.contribLabel ? `<p class="small" style="margin-top:8px">✨ ${a.contribLabel} <b>${state.contrib.toLocaleString()}</b></p>` : ""}
    </section>`;
}

function renderTurn() {
  const { event, stage, time } = Engine.nextEvent(state, rng);
  const prevStage = state.turn > 0 ? Engine.stageAt(state.animal, state.turn - 1) : null;
  const stageNotice = prevStage && prevStage.id !== stage.id
    ? `<section class="card notice fade"><span class="icon">🌱</span><div><b>삶이 바뀌었다: ${stage.name}</b><p class="small">${stage.desc}</p></div></section>`
    : "";

  app.innerHTML = `
    ${hud()}
    ${stageNotice}
    <section class="card event fade">
      <p class="event-text">${event.text}</p>
      <div class="choices">
        ${event.choices.map((c, i) => `<button class="choice" data-i="${i}"><span class="num">${i + 1}</span><span>${c.label}</span></button>`).join("")}
      </div>
    </section>`;

  app.querySelectorAll("[data-i]").forEach((b) =>
    b.addEventListener("click", () => {
      const ev = state.current;
      Engine.choose(state, Number(b.dataset.i), rng);
      renderOutcome(ev);
    })
  );
}

function renderOutcome(ev) {
  const entry = state.log[state.log.length - 1];
  const diedHere = !state.alive && entry.result === state.death.text;
  let extra = "";
  let cls = "";
  let next = "다음 시기로 →";
  if (!state.alive) {
    cls = "dead";
    // 선택 자체가 아니라 배경 위험이나 체력 때문에 죽은 경우 사망 원인을 따로 보여줌
    if (!diedHere) extra = `<div class="extra"><p class="death">그리고… ${state.death.text}</p><p style="margin-top:6px">${tagBadge(state.death.tag)}</p></div>`;
    next = "삶을 돌아보기";
  } else if (state.finished) {
    cls = "finish";
    extra = `<div class="extra"><p><b>${endText(state)}</b></p></div>`;
    next = "삶을 돌아보기";
  }

  app.innerHTML = `
    ${hud()}
    <section class="card outcome ${cls} fade">
      <p>${tagBadge(ev.tag, ev.tagNote)}</p>
      <p class="picked">${entry.choice}</p>
      <p class="result ${diedHere ? "death" : ""}">${entry.result}</p>
      ${extra}
    </section>
    <button class="primary fade" id="next" data-enter>${next}</button>`;

  document.getElementById("next").addEventListener("click", () => (state.finished ? renderEnd() : renderTurn()));
}

// ---------- 4. 결과 화면 ----------
function renderEnd() {
  const a = state.animal;
  const u = unit(a);
  const peers = Engine.simulateMany(a, 1000, rng);
  const shorter = peers.filter((p) => p.weeks < state.weeksLived).length;
  const fullLife = peers.filter((p) => p.alive).length;
  const deadPeers = peers.filter((p) => !p.alive);
  const humanKilled = deadPeers.filter((p) => p.death.tag === "사람").length;
  const causes = {};
  deadPeers.forEach((p) => (causes[p.death.text] = (causes[p.death.text] || 0) + 1));
  const topCauses = Object.entries(causes).sort((x, y) => y[1] - x[1]).slice(0, 3);

  const share = Math.round(Engine.humanShare(state) * 100);
  const humanCount = state.factors.filter((f) => f === "사람").length;
  const lifePct = Math.min(100, (state.weeksLived / a.lifespan.weeks) * 100);
  const lifeRatio = state.weeksLived / a.lifespan.weeks;
  const lifeRatioText = lifeRatio >= 0.995 ? "100%" : lifeRatio >= 0.01 ? Math.round(lifeRatio * 100) + "%" : "1% 미만";

  const headline = state.alive
    ? `${a.name}${ro(a.name)} 끝까지 살아남았습니다`
    : `${a.name}${ro(a.name)} ${state.weeksLived.toLocaleString()}${u}${u === "일" ? "을" : "를"} 살았습니다`;
  const causeLine = state.alive
    ? `<p class="cause">${endText(state)}</p>`
    : `<p class="cause">${state.death.text}</p><p style="margin-top:8px">${tagBadge(state.death.tag)}</p>`;
  const { isNew, dex } = recordLife(state);
  const dexTotal = allLives().length;
  const dexGot = allLives().filter((l) => dex[l.lifeId]).length;
  const dexBanner = isNew
    ? `<section class="card notice fade"><span class="icon">📖</span><div><b>도감에 새로 등록됐어요!</b><p class="small">${dexGot} / ${dexTotal}개의 삶을 살아 봤어요.</p></div></section>`
    : "";
  const worldNotes = [state.origin.species.world.note, state.origin.antSpecies && state.origin.antSpecies.worldNote].filter(Boolean);

  app.innerHTML = `
    <section class="card birth end-hero ${state.alive ? "alive" : ""} fade">
      <div class="big-emoji">${state.alive ? a.emoji : "🕯️"}</div>
      <h2 class="display">${headline}</h2>
      ${causeLine}
    </section>
    ${dexBanner}

    <div class="tiles fade">
      <div class="tile"><div class="num">${state.weeksLived.toLocaleString()}<small>${u}</small></div><div class="lbl">내가 산 기간</div></div>
      <div class="tile"><div class="num">${lifeRatioText}</div><div class="lbl">자연 수명 대비</div></div>
      <div class="tile"><div class="num">${share}%</div><div class="lbl">사람의 영향</div></div>
    </div>

    <section class="card compare fade">
      <div class="card-head"><span class="icon">⏳</span><h2>내가 산 기간 vs 자연 수명</h2></div>
      <div class="row"><span>나</span><div class="track"><div class="fill" style="width:${lifePct}%"></div></div><span class="val">${state.weeksLived.toLocaleString()}${u}</span></div>
      <div class="row"><span>자연 수명</span><div class="track"><div class="fill natural" style="width:100%"></div></div><span class="val">${a.lifespan.label}</span></div>
      <p class="small">${a.lifespan.note}</p>
    </section>

    <section class="card fade">
      <div class="card-head"><span class="icon">🧍</span><h2>사람이 영향을 준 비율</h2></div>
      <div class="donut-wrap">
        <div class="donut" style="--p:${share}"><span>${share}%</span></div>
        <p>내 삶을 결정한 사건 <b>${state.factors.length}개</b> 중 <b style="color:var(--human)">${humanCount}개</b>가 사람 때문에 일어났어요.<br>
        <span class="small">${tagBadge("사람")} 사람이 만든 사건 · ${tagBadge("자연")} 자연에서 일어난 사건</span></p>
      </div>
    </section>

    <section class="card fade">
      <div class="card-head"><span class="icon">👥</span><h2>같은 날 태어난 ${a.peerLabel} 1,000마리</h2></div>
      <div class="peer-grid">
        <div><b>${shorter.toLocaleString()}</b><span>나보다 먼저 죽음</span></div>
        <div><b>${fullLife.toLocaleString()}</b><span>${a.successLabel}</span></div>
        <div><b style="color:var(--human)">${humanKilled.toLocaleString()}</b><span>사람 때문에 죽음</span></div>
      </div>
      <p class="small" style="margin-bottom:4px">${a.peerLabel}들의 주요 사망 원인</p>
      <ul class="causes">${topCauses.map(([t, n]) => `<li>${t}<span>${n}마리</span></li>`).join("")}</ul>
    </section>

    <section class="card fade">
      <div class="card-head"><span class="icon">📖</span><h2>나의 삶 기록</h2></div>
      <ul class="timeline">
        ${state.log.map((e) => `
          <li class="${e.tag}">
            <div class="when">${e.turnLabel} · ${e.stage} ${tagBadge(e.tag)}</div>
            <div class="ev">${e.text}</div>
            <div class="res">→ <b>${e.choice}</b> · ${e.result}</div>
          </li>`).join("")}
      </ul>
      ${a.contribLabel ? `<p class="small" style="margin-top:12px">✨ ${a.contribLabel} <b>${state.contrib.toLocaleString()}</b></p>` : ""}
    </section>

    <section class="card world fade">
      <div class="card-head"><span class="icon">🌏</span><h2>세계 기준이라면</h2></div>
      ${worldNotes.map((t) => `<p>${t}</p>`).join("")}
    </section>

    ${state.origin.species.realityNote ? `
    <section class="card fade">
      <div class="card-head"><span class="icon">🔎</span><h2>게임에 담지 않은 현실</h2></div>
      <p>${state.origin.species.realityNote}</p>
    </section>` : ""}

    ${sourcesCard(state)}

    <section class="card action fade">
      <div class="card-head"><span class="icon">🤝</span><h2>이 동물을 위해 우리가 할 수 있는 일</h2></div>
      <p>${a.action}</p>
    </section>

    <button class="primary fade" id="again" data-enter>🎲 다시 태어나기</button>
    <div class="btn-row fade">
      <button class="btn" id="same">🔁 같은 동물로 다시 살기</button>
      <button class="btn" id="home">📖 도감 보기</button>
    </div>`;

  document.getElementById("again").addEventListener("click", rollAnimation);
  document.getElementById("same").addEventListener("click", () => startGame(state.lifeId, state.origin));
  document.getElementById("home").addEventListener("click", renderDex);
  window.scrollTo(0, 0);
}

// ---------- 도감 ----------
// 살아 본 삶의 기록. 이 브라우저에만 저장되고, 저장이 막혀 있으면 기록 없이 게임만 돌아감
const DEX_KEY = "born-as-an-animal.dex.v1";
function loadDex() {
  try { return JSON.parse(localStorage.getItem(DEX_KEY)) || {}; } catch (e) { return {}; }
}
function saveDex(dex) {
  try { localStorage.setItem(DEX_KEY, JSON.stringify(dex)); } catch (e) { /* 저장 불가 환경 */ }
}

// 도감에 들어갈 모든 삶 (뽑기와 같은 순서·갈래)
function allLives() {
  const lives = [];
  for (const species of SPECIES) {
    if (species.antSpecies) {
      for (const antSpecies of ANT_SPECIES)
        for (const c of antSpecies.castes) lives.push({ lifeId: c.life, species, origin: { species, antSpecies } });
    } else if (species.variants) {
      for (const variant of window[species.variants]) lives.push({ lifeId: variant.life, species, origin: { species, variant } });
    } else {
      lives.push({ lifeId: species.id, species, origin: { species } });
    }
  }
  return lives;
}

// 결과 화면에 들어올 때 한 번 기록. 새로 등록됐는지 돌려줌
function recordLife(state) {
  const dex = loadDex();
  const prev = dex[state.lifeId];
  dex[state.lifeId] = {
    count: (prev ? prev.count : 0) + 1,
    best: Math.max(prev ? prev.best : 0, state.weeksLived),
    survived: (prev && prev.survived) || state.alive,
  };
  saveDex(dex);
  return { isNew: !prev, dex };
}

function renderDex() {
  setTheme(null);
  const dex = loadDex();
  const lives = allLives();
  const got = lives.filter((l) => dex[l.lifeId]).length;
  const groups = [...new Set(SPECIES.map((s) => s.group))];
  let armed = false;

  app.innerHTML = `
    <header class="hero fade">
      <h1 class="display" style="font-size:2rem">📖 나의 도감</h1>
      <p class="sub">살아 본 삶이 하나씩 채워져요.</p>
    </header>
    <section class="card fade">
      <div class="dex-progress"><b>${got}</b> / ${lives.length}개의 삶</div>
      <div class="track"><div class="fill" style="width:${(got / lives.length) * 100}%"></div></div>
      <p class="small" style="margin-top:8px">기록은 이 브라우저에만 저장돼요. 살아 본 삶을 누르면 그 삶을 다시 살 수 있어요.</p>
    </section>
    ${groups.map((g) => `
      <section class="card fade" data-dex-group="${GROUP_THEME[g] || ""}">
        <div class="card-head"><h2>${g}</h2></div>
        <div class="dex-grid">
          ${lives.filter((l) => l.species.group === g).map((l) => {
            const rec = dex[l.lifeId];
            const life = ANIMALS[l.lifeId];
            if (!rec) return `<div class="dex-card locked"><span class="em">❔</span><b>???</b><span class="small">${l.species.name}</span></div>`;
            return `
              <button class="dex-card" data-life="${l.lifeId}">
                <span class="em">${life.emoji}</span><b>${life.name}</b>
                <span class="small">${rec.count}번 · 최고 ${rec.best.toLocaleString()}${unit(life)}${rec.survived ? " · 🌟" : ""}</span>
              </button>`;
          }).join("")}
        </div>
      </section>`).join("")}
    <p class="small fade" style="margin:0 4px 14px">🌟 끝까지 살아남은 적이 있는 삶</p>
    <button class="primary fade" id="back" data-enter>← 처음으로</button>
    ${got ? `<button class="btn ghost fade" id="reset">도감 기록 지우기</button>` : ""}`;

  app.querySelectorAll("[data-life]").forEach((b) => b.addEventListener("click", () => {
    const l = lives.find((x) => x.lifeId === b.dataset.life);
    startGame(l.lifeId, l.origin);
  }));
  document.getElementById("back").addEventListener("click", renderDraw);
  const reset = document.getElementById("reset");
  // 확인 창 대신 두 번 눌러야 지워지게 함
  if (reset) reset.addEventListener("click", () => {
    if (!armed) { armed = true; reset.textContent = "정말 지울까요? 한 번 더 누르면 지워져요"; return; }
    saveDex({});
    renderDex();
  });
  window.scrollTo(0, 0);
}

// ---------- 출처와 가정값 ----------
// 확인된 통계인지, 추정·가정값인지 표시
function vBadge(ok) {
  return ok ? '<span class="vbadge ok">확인된 통계</span>' : '<span class="vbadge guess">추정·가정값</span>';
}
const looksAssumed = (text) => /가정|확인 필요|추정/.test(text);

function linkList(links) {
  return `<ul class="links">${links.map((l) =>
    `<li><span class="kind ${l.kind}">${l.kind}</span><a href="${l.url}" target="_blank" rel="noopener noreferrer">${l.label}</a></li>`).join("")}</ul>`;
}

const ASSUMED_RULE = "선택지마다의 위험도와 결과 확률은 게임을 위해 정한 값이에요. 사건과 결과 문구 속 사실과 숫자만 아래 자료에 근거해요.";

function sourcesCard(state) {
  const { species, antSpecies, variant } = state.origin;
  const src = SOURCES[species.id] || { calibration: "", links: [] };
  const a = state.animal;
  const sub = antSpecies ? antSpecies.popNote : variant && window[species.variants].length > 1 ? variant.popNote : "";
  return `
    <section class="card sources fade">
      <div class="card-head"><span class="icon">📚</span><h2>이 삶의 숫자는 어디서 왔나요?</h2></div>
      <dl class="facts">
        <div><dt>태어날 확률</dt><dd>${species.popSource} ${vBadge(species.verified)}</dd></div>
        ${sub ? `<div><dt>${antSpecies ? antSpecies.name : variant.name}일 확률</dt><dd>${sub} ${vBadge(!looksAssumed(sub))}</dd></div>` : ""}
        <div><dt>자연 수명</dt><dd>${a.lifespan.label}. ${a.lifespan.note} ${vBadge(a.lifespan.verified)}</dd></div>
        ${src.calibration ? `<div><dt>실제 기록에 맞춘 부분</dt><dd>${src.calibration}</dd></div>` : ""}
        <div><dt>게임용 가정값</dt><dd>${ASSUMED_RULE}</dd></div>
      </dl>
      ${src.links.length ? linkList(src.links) : ""}
    </section>`;
}

// 첫 화면에서 여는 전체 출처 페이지
function renderSources() {
  setTheme(null);
  const list = SPECIES.slice().sort((a, b) => a.group.localeCompare(b.group, "ko") || a.name.localeCompare(b.name, "ko"));
  app.innerHTML = `
    <header class="hero fade">
      <h1 class="display" style="font-size:2rem">자료 출처와 가정값</h1>
      <p class="sub">이 게임의 숫자가 어디서 왔는지, 무엇이 확인된 통계이고 무엇이 가정인지 밝혀 둬요.</p>
    </header>
    <section class="card fade">
      <div class="card-head"><span class="icon">🧭</span><h2>읽는 법</h2></div>
      <dl class="facts">
        <div><dt>${vBadge(true)}</dt><dd>정부 통계, 공식 조사, 논문 등에서 확인한 숫자예요.</dd></div>
        <div><dt>${vBadge(false)}</dt><dd>자료가 없거나 부족해서 계산하거나 가정한 숫자예요. 더 좋은 자료를 찾으면 바꿀 거예요.</dd></div>
        <div><dt>게임용 가정값</dt><dd>${ASSUMED_RULE}</dd></div>
        <div><dt>자료 없음</dt><dd>국내 개체 수 자료가 없는 동물은 현실 모드 뽑기에서 빠지고 도감 모드에서만 나와요.</dd></div>
      </dl>
    </section>
    ${list.map((sp) => {
      const src = SOURCES[sp.id] || { calibration: "", links: [] };
      return `
        <details class="card src-item fade">
          <summary><span class="em">${sp.emoji}</span><b>${sp.name}</b><span class="chip plain">${sp.group}</span>
            ${sp.population ? vBadge(sp.verified) : '<span class="vbadge none">자료 없음</span>'}</summary>
          <dl class="facts">
            <div><dt>국내 개체 수</dt><dd>${sp.popSource}</dd></div>
            ${src.calibration ? `<div><dt>실제 기록에 맞춘 부분</dt><dd>${src.calibration}</dd></div>` : ""}
          </dl>
          ${src.links.length ? linkList(src.links) : ""}
        </details>`;
    }).join("")}
    <p class="small fade" style="margin:6px 4px 14px">더 자세한 정리와 확인이 필요한 항목 목록은 기획 문서에 있어요.</p>
    <button class="primary fade" id="back" data-enter>← 처음으로</button>`;
  document.getElementById("back").addEventListener("click", renderDraw);
  window.scrollTo(0, 0);
}

// 키보드: 숫자로 선택지, Enter로 주 버튼
document.addEventListener("keydown", (e) => {
  if (e.altKey || e.ctrlKey || e.metaKey) return;
  const choice = app.querySelector(`[data-i="${Number(e.key) - 1}"]`);
  if (choice) { e.preventDefault(); choice.click(); return; }
  if (e.key === "Enter" && document.activeElement === document.body) {
    const main = app.querySelector("[data-enter]");
    if (main) { e.preventDefault(); main.click(); }
  }
});

renderDraw();
