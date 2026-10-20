// 일본왕개미 (Camponotus japonicus): 몸집에 따라 역할이 갈리는 삶 (소형 일개미 / 대형 일개미)
window.ANT_SPECIES.push({
  id: "camponotus",
  name: "일본왕개미",
  sciName: "Camponotus japonicus",
  desc: "국내에서 볼 수 있는 큰 개미. 같은 일개미라도 몸집이 여러 가지이고, 머리가 큰 대형 일개미는 흔히 병정개미라고 불린다.",
  koreaPopulation: 2e12,
  popNote: "국내 개미의 약 20%로 가정 (흔한 종, 비율 자료 없음)",
  worldNote: "일본왕개미는 한국, 일본, 중국 등 동아시아에 널리 살아요.",
  // 계급 비율은 가정값 (확인 필요)
  castes: [
    { id: "minor", name: "소형 일개미", weight: 84, life: "camponotus.minor" },
    { id: "major", name: "대형 일개미(병정)", weight: 15, life: "camponotus.major" },
    { id: "queen", name: "여왕 후보", weight: 1, life: "camponotus.queen" },
  ],
});

window.ANIMALS["camponotus.minor"] = ANT.makeWorkerLife({
  name: "일본왕개미 소형 일개미",
  intro: "5월의 어느 날, 나무 밑동 아래 일본왕개미 집에서 태어났다. 당신은 몸집이 작은 소형 일개미. 집안일과 먹이 모으기의 대부분이 당신 같은 소형 일개미의 몫이다.",
  events: ANT.pick(ANT.ALL_COMMON),
});

window.ANIMALS["camponotus.major"] = ANT.makeWorkerLife({
  name: "일본왕개미 대형 일개미",
  emoji: "🐜",
  intro: "5월의 어느 날, 커다란 머리와 턱을 가진 대형 일개미로 태어났다. 소형 일개미 자매들이 할 수 없는 일이 당신에게 맡겨진다.",
  stages: [
    { id: "nurse", name: "집 안 대기", fromTurn: 0, baseRisk: 0.01, desc: "아직 몸이 단단해지지 않았다. 집 안에서 지낸다." },
    { id: "builder", name: "입구 경비", fromTurn: 3, baseRisk: 0.02, desc: "큰 머리와 턱으로 집 입구를 지킨다." },
    { id: "forager", name: "먹이 수집 호위", fromTurn: 8, baseRisk: 0.04, desc: "먹이를 모으러 나가는 소형 일개미들을 지킨다." },
  ],
  events: ANT.pick(["fungus", "rain_flood", "pavement", "bait", "ant_war", "asphalt", "spider", "fogging", "winter_prep", "hibernation", "warm_winter"]).concat([
    {
      id: "gate_guard",
      tag: "자연",
      seasons: ["봄", "여름", "가을"],
      stages: ["builder"],
      weight: 3,
      text: "입구 근처에서 낯선 냄새가 난다. 다른 군체의 정찰병이다.",
      choices: [
        { label: "큰 턱을 벌리고 입구를 막아선다", risk: 0.08, health: -10, contrib: 4,
          result: "정찰병이 물러갔다. 대형 일개미는 싸움과 방어를 주로 맡는다.",
          death: "정찰병을 따라온 무리와 싸우다 쓰러졌다." },
        { label: "개미산을 뿌리고 동료를 부른다", risk: 0.03, health: 0, contrib: 2,
          result: "소형 일개미들이 몰려와 함께 쫓아냈다.",
          death: "동료가 오기 전에 붙잡혔다." },
      ],
    },
    {
      id: "hard_food",
      tag: "자연",
      seasons: ["봄", "여름", "가을"],
      stages: ["builder", "forager"],
      weight: 2,
      text: "자매들이 큰 딱정벌레를 끌고 왔다. 껍질이 너무 단단해 소형 일개미들이 자르지 못한다.",
      choices: [
        { label: "큰 턱으로 껍질을 부순다", risk: 0, health: -5, contrib: 4,
          result: "껍질이 갈라졌다. 자매들이 먹이를 나눠 나른다." },
        { label: "부드러운 부분만 골라 준다", risk: 0, health: 0, contrib: 1,
          result: "먹이 절반은 버려졌다." },
      ],
    },
    {
      id: "food_store",
      tag: "자연",
      seasons: ["여름", "가을"],
      stages: ["nurse", "builder"],
      weight: 2,
      text: "자매들이 단물을 잔뜩 모아 왔다. 저장할 곳이 모자라다.",
      choices: [
        { label: "배 속에 가득 담아 둔다", risk: 0, health: 10, contrib: 3,
          result: "필요할 때 입으로 꺼내 나눠 줄 수 있다. 어떤 왕개미 종의 대형 일개미는 이렇게 먹이 저장고 역할도 한다." },
        { label: "조금만 담는다", risk: 0, health: 5, contrib: 1,
          result: "남은 단물은 다른 자매들이 나눠 가졌다." },
      ],
    },
    {
      id: "escort",
      tag: "자연",
      seasons: ["봄", "여름", "가을"],
      stages: ["forager"],
      weight: 3,
      text: "먹이를 나르는 소형 일개미 행렬 옆으로 거미가 다가온다.",
      choices: [
        { label: "행렬 앞을 막아선다", risk: 0.15, health: -10, contrib: 5,
          result: "거미가 물러갔다. 행렬은 무사히 집에 도착했다.",
          death: "자매들을 지키다 거미에게 잡혔다." },
        { label: "행렬을 다른 길로 돌린다", risk: 0.04, health: 0, contrib: 2,
          result: "먼 길로 돌아갔다. 다 같이 살았다.",
          death: "돌아가는 길에 다른 거미를 만났다." },
      ],
    },
  ]),
});

window.ANIMALS["camponotus.queen"] = ANT.makeQueenLife({
  name: "일본왕개미 여왕 후보",
  intro: "일본왕개미 집에서 날개 달린 공주개미로 태어났다. 언젠가 혼자 땅속 방에 들어가, 아무것도 먹지 않고 첫 일개미들을 키워야 한다.",
  events: ANT.pickQueen(ANT.QUEEN_DEFAULT),
});
