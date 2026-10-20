// 밸런스 확인: node tests/balance.js [삶 id 일부]
// 선택을 무작위로 하는 플레이어 기준으로 삶마다 수명, 끝까지 산 비율, 사람 원인 사망 비율, 사망 원인 1위를 보여줌
// 예) node tests/balance.js dog   → 강아지 삶만
const { load } = require("./load");

const N = Number(process.env.RUNS || 20000);
const filter = process.argv[2] || "";
const { ctx } = load();

// 현실 모드 순위
const counted = ctx.SPECIES.filter((s) => s.population);
const total = counted.reduce((a, s) => a + s.population, 0);
if (!filter) {
  console.log("현실 모드 확률");
  counted.sort((a, b) => b.population - a.population).forEach((s) => {
    const p = s.population / total;
    console.log(`  ${s.name.padEnd(8)} ${p > 0.5 ? (p * 100).toFixed(2) + "%" : "1/" + Math.round(1 / p).toLocaleString()}`);
  });
  const off = ctx.SPECIES.filter((s) => !s.population).map((s) => s.name);
  if (off.length) console.log(`  (자료 없음, 도감 모드 전용: ${off.join(", ")})`);
  console.log("");
}

for (const [id, life] of Object.entries(ctx.ANIMALS)) {
  if (filter && !id.includes(filter)) continue;
  const runs = ctx.Engine.simulateMany(life, N, Math.random);
  const weeks = runs.map((r) => r.weeks).sort((a, b) => a - b);
  const dead = runs.filter((r) => !r.alive);
  const causes = {};
  dead.forEach((r) => (causes[r.death.text] = (causes[r.death.text] || 0) + 1));
  const top = Object.entries(causes).sort((a, b) => b[1] - a[1])[0];
  const human = dead.length ? (dead.filter((r) => r.death.tag === "사람").length / dead.length) * 100 : 0;
  console.log(
    `${id.padEnd(18)} 중간 ${String(weeks[N >> 1]).padStart(4)}${life.unit || "주"}` +
    ` | 끝까지 ${((1 - dead.length / N) * 100).toFixed(1).padStart(5)}%` +
    ` | 사람 원인 ${human.toFixed(0).padStart(3)}%` +
    (top ? ` | 1위 ${(top[1] / N * 100).toFixed(1)}% ${top[0].slice(0, 30)}` : "")
  );
}
