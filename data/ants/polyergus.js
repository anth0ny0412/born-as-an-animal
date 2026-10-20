// 사무라이개미 (Polyergus samurai): 다른 종의 번데기를 훔쳐 와 일을 시키는 삶
// 일개미는 스스로 먹이를 먹거나 애벌레를 돌보지 못함 (근연종 연구 기준, P. samurai 직접 자료는 확인 필요)
window.ANT_SPECIES.push({
  id: "polyergus",
  name: "사무라이개미",
  sciName: "Polyergus samurai",
  desc: "곰개미 집을 습격해 번데기를 훔쳐 오고, 그 번데기에서 나온 곰개미들이 집안일을 대신한다.",
  koreaPopulation: 2e11,
  popNote: "국내 개미의 약 2%로 가정 (곰개미 집에 기대어 사는 종이라 곰개미보다 훨씬 적다고 봄)",
  worldNote: "사무라이개미는 한국, 일본 등 동아시아에 살아요. 유럽과 북미에는 같은 방식으로 사는 친척 종들이 있어요.",
  castes: [
    { id: "worker", name: "일개미", weight: 99, life: "polyergus.worker" },
    { id: "queen", name: "여왕 후보", weight: 1, life: "polyergus.queen" },
  ],
});

window.ANIMALS["polyergus.worker"] = ANT.makeWorkerLife({
  name: "사무라이개미 일개미",
  intro: "번데기에서 나오자 검은 곰개미들이 다가와 몸을 닦아 준다. 당신은 붉은 사무라이개미. 이 집의 집안일은 전부 다른 종의 개미들이 한다.",
  stages: [
    { id: "nurse", name: "집 안에서 지냄", fromTurn: 0, baseRisk: 0.01,
      desc: "곰개미 일꾼들이 먹이를 먹여 주고 씻겨 준다. 당신의 턱은 먹이를 씹기보다 찌르기에 알맞다." },
    { id: "forager", name: "습격조", fromTurn: 4, baseRisk: 0.04,
      desc: "여름 오후마다 대열을 지어 곰개미 집을 습격한다." },
  ],
  backgroundDeaths: [
    { stages: ["nurse"], tag: "자연", text: "병에 걸려 죽었다." },
    { stages: ["forager"], tag: "자연", text: "습격 대열에서 떨어져 길을 잃었다." },
    { stages: ["forager"], tag: "자연", text: "참새에게 잡아먹혔다." },
    { stages: ["forager"], tag: "사람", text: "습격 대열이 지나던 산책로에서 밟혔다." },
  ],
  events: ANT.pick(["fungus", "rain_flood", "pavement", "asphalt", "antlion", "spider", "fogging", "hibernation", "warm_winter"]).concat([
    {
      id: "fed_by_slaves",
      tag: "자연",
      seasons: ["봄", "여름", "가을"],
      stages: ["nurse"],
      weight: 3,
      text: "곰개미 일꾼이 입으로 먹이를 건넨다. 바로 옆에 먹이 조각이 놓여 있다.",
      choices: [
        { label: "곰개미가 주는 먹이를 받아먹는다", risk: 0, health: 15, contrib: 0,
          result: "배가 부르다. 이 집에서는 이게 당연한 일이다." },
        { label: "옆의 먹이를 직접 먹어 본다", risk: 0.03, health: -15, contrib: 0,
          result: "먹이 앞에서 턱이 헛돈다. 실험실에서 일꾼이 없는 사무라이개미류 무리는 먹이가 있어도 굶어 죽는다.",
          death: "끝내 먹이를 먹지 못하고 굶어 죽었다." },
      ],
    },
    {
      id: "raid_run",
      tag: "자연",
      seasons: ["여름"],
      stages: ["forager"],
      weight: 4,
      text: "늦은 오후, 정찰병이 곰개미 집을 찾았다는 신호를 남기며 돌아왔다. 수백 마리가 한 줄로 달려 나간다.",
      choices: [
        { label: "대열 맨 앞에서 달린다", risk: 0.15, health: -10, contrib: 6,
          result: "가장 먼저 곰개미 집에 뛰어들어 번데기를 물고 나왔다.",
          death: "곰개미들의 반격에 쓰러졌다." },
        { label: "대열 뒤를 따른다", risk: 0.05, health: -5, contrib: 3,
          result: "앞선 동료들이 길을 연 덕에 번데기 하나를 챙겼다.",
          death: "돌아오는 길에 곰개미들에게 붙잡혔다." },
      ],
    },
    {
      id: "raid_return",
      tag: "자연",
      seasons: ["여름"],
      stages: ["forager"],
      weight: 2,
      text: "번데기를 물고 돌아가는 길, 곰개미들이 뒤쫓아 온다.",
      choices: [
        { label: "번데기를 놓지 않고 달린다", risk: 0.12, health: -10, contrib: 4,
          result: "집에 도착했다. 이 번데기에서 나올 곰개미는 평생 이 집을 위해 일하게 된다.",
          death: "곰개미 여럿에게 붙잡혀 죽었다." },
        { label: "번데기를 버리고 도망친다", risk: 0.03, health: 0, contrib: 0,
          result: "빈 턱으로 돌아왔다.",
          death: "도망치다 길을 잃었다." },
      ],
    },
    {
      id: "slave_shortage",
      tag: "자연",
      seasons: ["가을", "봄"],
      stages: ["nurse", "forager"],
      weight: 3,
      text: "집 안의 곰개미 일꾼이 눈에 띄게 줄었다. 아무도 애벌레를 돌보지 않는다.",
      choices: [
        { label: "애벌레를 직접 돌보려 해 본다", risk: 0.02, health: -10, contrib: 0,
          result: "어떻게 해야 하는지 모른다. 사무라이개미는 집안일 하는 능력을 잃어버렸다.",
          death: "아무것도 하지 못한 채 굶주렸다." },
        { label: "곰개미들이 다시 일할 때까지 기다린다", risk: 0.04, health: -10, contrib: 0,
          result: "남은 곰개미들이 다시 움직이기 시작했다.",
          death: "돌봐 줄 일꾼이 없어 굶어 죽었다." },
      ],
    },
  ]),
  action: "사무라이개미는 곰개미가 있어야만 살 수 있어요. 한 종을 지키려면 그 종이 기대어 사는 다른 생물과 서식지까지 함께 지켜야 해요.",
});

window.ANIMALS["polyergus.queen"] = ANT.makeQueenLife({
  name: "사무라이개미 여왕 후보",
  intro: "사무라이개미 집에서 날개 달린 공주개미로 태어났다. 혼자서는 애벌레를 키울 수 없는 당신은, 곰개미 집을 빼앗아야 한다.",
  endText: "봄이 왔다. 곰개미 일꾼들이 당신의 알을 돌본다. 그 알에서 나올 붉은 일개미들은 여름이 되면 습격을 시작할 것이다.",
  events: ANT.pickQueen(["wait", "flight", "flight_light", "landing", "landing_paved", "queen_winter", "queen_warm_winter"]).concat([
    {
      id: "find_host", turns: [3], tag: "자연", weight: 1,
      seasons: ["여름"], stages: ["founder"],
      text: "곰개미 집을 찾아야 한다. 냄새를 따라 풀밭을 헤맨다.",
      choices: [
        { label: "큰 곰개미 집을 노린다", risk: 0.3, health: -10, contrib: 2,
          result: "일꾼이 많은 큰 집을 찾았다.",
          death: "곰개미 집을 찾기 전에 지쳐 쓰러졌다." },
        { label: "작은 곰개미 집을 노린다", risk: 0.25, health: -5, contrib: 1,
          result: "지키는 개미가 적은 작은 집을 찾았다.",
          death: "곰개미 집을 찾지 못했다." },
      ],
    },
    {
      id: "invade", turns: [4], tag: "자연", weight: 1,
      seasons: ["여름"], stages: ["founder"],
      text: "곰개미 집 입구에 다다랐다. 들키면 끝이다.",
      choices: [
        { label: "단숨에 뚫고 들어간다", risk: 0.4, health: -15, contrib: 2,
          result: "곰개미들을 뿌리치고 깊은 방까지 들어갔다.",
          death: "곰개미 일꾼들에게 둘러싸여 물려 죽었다." },
        { label: "기회를 보며 조금씩 들어간다", risk: 0.35, health: -10, contrib: 1,
          result: "들키지 않고 안쪽까지 들어갔다.",
          death: "곰개미 일꾼들에게 들켜 물려 죽었다." },
      ],
    },
    {
      id: "kill_queen", turns: [5], tag: "자연", weight: 1,
      seasons: ["여름"], stages: ["founder"],
      text: "곰개미 여왕을 찾아냈다.",
      choices: [
        { label: "여왕에게 덤벼든다", risk: 0.35, health: -15, contrib: 4,
          result: "곰개미 여왕을 죽이고 그 냄새를 몸에 묻혔다. 곰개미 일꾼들이 당신을 여왕으로 받아들인다. (이 과정은 연구가 더 필요하다)",
          death: "곰개미 여왕과의 싸움에서 졌다." },
        { label: "여왕 냄새가 몸에 밸 때까지 숨어 지낸다", risk: 0.4, health: -10, contrib: 2,
          result: "시간이 지나자 곰개미들이 당신을 공격하지 않는다.",
          death: "곰개미들에게 정체를 들켰다." },
      ],
    },
    {
      id: "adopted", turns: [6], tag: "자연", weight: 1,
      seasons: ["가을"], stages: ["founder"],
      text: "곰개미 일꾼들이 당신의 알을 돌보기 시작했다. 하지만 곰개미 일꾼은 시간이 지나면 하나둘 죽어 간다.",
      choices: [
        { label: "알을 많이 낳아 둔다", risk: 0.25, health: -10, contrib: 4,
          result: "내년 여름이면 습격에 나설 일개미들이 생긴다.",
          death: "곰개미 일꾼이 너무 빨리 줄어 군체가 무너졌다." },
        { label: "몸을 아낀다", risk: 0.3, health: 5, contrib: 1,
          result: "천천히 알을 낳았다.",
          death: "알이 너무 적어 군체가 이어지지 못했다." },
      ],
    },
  ]),
  action: "사무라이개미는 곰개미가 있어야만 살 수 있어요. 한 종을 지키려면 그 종이 기대어 사는 다른 생물과 서식지까지 함께 지켜야 해요.",
});
