// 게임 전체 검사: node tests/check.js
// 1. 데이터: 죽을 확률이 있는데 사망 문구가 없는 선택지, 연결 안 된 삶, 출처 누락
// 2. 경로: 모든 삶을 여러 번 끝까지 돌려 사건이 비는 턴이 없는지
// 3. 화면: 모든 화면을 그려 undefined·NaN이 찍히지 않는지
const { load } = require("./load");

const RUNS = Number(process.env.RUNS || 20000);
const problems = [];
const fail = (msg) => problems.push(msg);

// ---------- 1. 데이터 ----------
const { ctx } = load();
const lifeIds = Object.keys(ctx.ANIMALS);

for (const [id, life] of Object.entries(ctx.ANIMALS)) {
  for (const e of life.events) {
    for (const c of e.choices) {
      if (c.outcomes) {
        if (!c.outcomes.length || c.outcomes.some((o) => !(o.p > 0))) fail(`${id}/${e.id}: outcomes의 p가 비었거나 0 이하`);
      } else if (c.risk > 0 && !c.death) {
        fail(`${id}/${e.id}: "${c.label}" 선택지에 사망 문구가 없음`);
      }
    }
  }
}

for (const s of ctx.SPECIES) {
  const lives = s.antSpecies ? ctx.ANT_SPECIES.flatMap((a) => a.castes.map((c) => c.life))
    : s.variants ? ctx[s.variants].map((v) => v.life)
    : [s.id];
  for (const l of lives) if (!ctx.ANIMALS[l]) fail(`${s.id}: 삶 "${l}"이 없음`);
  if (!ctx.SOURCES || !ctx.SOURCES[s.id]) fail(`${s.id}: data/sources.js에 출처가 없음`);
}

// 미니게임: 삶마다 정확히 하나, 그리고 실제로 나오는지 (살아서 그 시기까지 간 삶 기준)
for (const id of lifeIds) {
  const life = ctx.ANIMALS[id];
  const mgs = life.events.filter((e) => e.minigame);
  if (mgs.length !== 1) { fail(`${id}: 미니게임이 ${mgs.length}개 (1개여야 함)`); continue; }
  let reached = 0, played = 0;
  for (let i = 0; i < 2000; i++) {
    const s = ctx.Engine.startLife(life);
    while (!s.finished) {
      const { event } = ctx.Engine.nextEvent(s, Math.random);
      if (event.minigame) { played++; break; }
      ctx.Engine.choose(s, Math.floor(Math.random() * event.choices.length), Math.random);
    }
    if (s.turn >= Math.min(...mgs[0].turns)) reached++;
  }
  if (played === 0) fail(`${id}: 미니게임이 한 번도 나오지 않음`);
  else if (played < reached * 0.6) fail(`${id}: 미니게임 시기까지 산 삶 중 ${Math.round((played / reached) * 100)}%만 미니게임을 만남`);
}

// ---------- 2. 경로 ----------
for (const id of lifeIds) {
  try {
    ctx.Engine.simulateMany(ctx.ANIMALS[id], RUNS, Math.random);
  } catch (err) {
    fail(`${id}: ${err.message}`);
  }
}

// ---------- 3. 화면 ----------
const ui = load({ withUI: true });
const check = (where) => {
  const html = ui.app.innerHTML;
  const bad = html.match(/.{0,50}(undefined|NaN|\[object).{0,20}/s);
  if (bad) throw new Error(`${where}: ${bad[0].replace(/\s+/g, " ")}`);
};
ui.ctx.check = check;
try {
  require("vm").runInContext(`
    for (const m of ["real", "dex"]) {
      mode = m;
      renderDraw(); check("뽑기 화면 " + m);
      renderSources(); check("출처 화면 " + m);
      renderDex(); check("도감 화면 " + m);
      for (const sp of SPECIES) { renderBirth({ species: sp, probability: animalProbability(sp) }); check("탄생 " + sp.id); }
    }
    for (const id of Object.keys(ANIMALS)) {
      const base = SPECIES.find((s) => s.id === id.split(".")[0]) || SPECIES.find((s) => s.antSpecies);
      const antSpecies = ANT_SPECIES.find((s) => id.startsWith(s.id + "."));
      for (let k = 0; k < 200; k++) {
        startGame(id, { species: base, antSpecies }); check("시작 " + id);
        while (!state.finished) {
          renderTurn(); check("턴 " + id);
          const ev = state.current;
          Engine.choose(state, Math.floor(Math.random() * ev.choices.length), Math.random);
          renderOutcome(ev); check("결과 " + id);
        }
        if (k < 3) { renderEnd(); check("마지막 " + id); }
      }
    }`, ui.ctx);
} catch (err) {
  fail(err.message);
}

// ---------- 결과 ----------
console.log(`동물 ${ctx.SPECIES.length}종, 삶 ${lifeIds.length}개 (경로 검사 삶마다 ${RUNS.toLocaleString()}회)`);
if (problems.length) {
  console.log(`\n문제 ${problems.length}개:`);
  problems.forEach((p) => console.log(" - " + p));
  process.exit(1);
}
console.log("모든 검사 통과");
