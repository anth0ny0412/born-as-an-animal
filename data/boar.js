// 멧돼지: 전국 개체 수 공식 자료 없음 → 서식밀도(2015, 100ha당 5.0마리)에 산림 면적을 곱해 약 30만 마리로 추정
// 2019년 ASF 이후 대규모 포획 (2019년 한 해 약 10만 마리 포획 눈앞, 서울신문)
// 서울 북한산: 포획틀 184개, 차단 울타리 18.8km, 도심 출몰 출동 2024년 589건 → 2025년 494건
window.ANIMALS = window.ANIMALS || {};

(function () {
  const ALL = ["봄", "여름", "가을", "겨울", "한 해"];
  const GROWN = ["young", "adult"];

  window.ANIMALS.boar = {
    id: "boar",
    name: "멧돼지",
    emoji: "🐗",
    peerLabel: "새끼 멧돼지",
    successLabel: "여섯 살까지 산 멧돼지",
    intro: "봄, 도시 가까운 산자락 덤불 둥지에서 형제 다섯과 함께 태어났다. 등에 노란 줄무늬가 있다. 이 산에는 이제 호랑이도 늑대도 없다.",
    endText: "여섯 해를 살았다. 사냥꾼과 포획틀, 도로를 모두 피해 온 영리한 멧돼지다.",
    lifespan: {
      weeks: 520,
      label: "약 10년",
      note: "야생 멧돼지는 10년 안팎을 살 수 있는 것으로 알려져 있음 (확인 필요)",
      verified: false,
    },
    timeline: [
      { label: "봄, 덤불 둥지에서 태어남", season: "봄", weeks: 4 },
      { label: "줄무늬 새끼 시절", season: "여름", weeks: 13 },
      { label: "첫 가을", season: "가을", weeks: 13 },
      { label: "첫 겨울", season: "겨울", weeks: 13 },
      { label: "두 번째 봄", season: "봄", weeks: 13 },
      { label: "2살 → 3살", season: "한 해", weeks: 52 },
      { label: "3살 → 4살", season: "한 해", weeks: 52 },
      { label: "4살 → 5살", season: "한 해", weeks: 52 },
      { label: "5살 → 6살", season: "한 해", weeks: 52 },
    ],
    stages: [
      { id: "piglet", name: "새끼 멧돼지", fromTurn: 0, baseRisk: 0.05, desc: "어미 무리를 따라다닌다." },
      { id: "young", name: "어린 멧돼지", fromTurn: 2, baseRisk: 0.05, desc: "줄무늬가 사라지고 몸이 커졌다." },
      { id: "adult", name: "어른 멧돼지", fromTurn: 5, baseRisk: 0.15, desc: "한 해 한 해가 고비다." },
    ],
    backgroundDeaths: [
      { stages: ["piglet"], tag: "자연", text: "추위와 병을 이기지 못했다." },
      { stages: GROWN, tag: "사람", text: "유해야생동물 포획 중 엽사의 총에 맞았다." },
      { stages: GROWN, tag: "사람", text: "도로를 건너다 차에 치였다." },
      { stages: GROWN, tag: "자연", text: "병에 걸려 죽었다." },
    ],
    healthDeath: { tag: "자연", text: "먹이를 구하지 못해 쇠약해졌다." },
    events: [
      {
        id: "stripes", tag: "자연", turns: [0, 1], weight: 2,
        text: "어미를 따라 낙엽 밑을 코로 뒤진다. 지렁이와 나무뿌리를 찾는다.",
        choices: [
          { label: "어미 바로 뒤를 따른다", risk: 0.03, health: 10, contrib: 0, result: "어미가 땅을 파면 맛있는 게 나온다.", death: "무리에서 떨어져 길을 잃었다." },
          { label: "형제들과 장난치며 뒤처진다", risk: 0.06, health: 5, contrib: 0, result: "어미가 꿀꿀 불러 돌아왔다.", death: "무리에서 떨어져 길을 잃었다." },
        ],
      },
      {
        id: "acorns", tag: "자연", seasons: ["가을", "한 해"], weight: 2,
        text: "가을. 도토리가 떨어지는 계절이다. 그런데 올해는 사람들이 도토리를 많이 주워 갔다.",
        choices: [
          { label: "산 깊이 들어간다", risk: 0.02, health: 5, contrib: 0, result: "깊은 골짜기에서 도토리를 찾았다.", death: "다른 멧돼지 무리와 싸우다 다쳤다." },
          { label: "산 아래 마을 쪽으로 내려간다", risk: 0.06, health: 15, contrib: 0, result: "고구마밭을 찾았다. 2018~2022년 멧돼지 농작물 피해는 330억 원으로 야생동물 중 가장 컸다.", death: "밭 근처에서 엽사의 총에 맞았다." },
        ],
      },
      {
        id: "city", tag: "사람", seasons: ["봄", "가을", "한 해"], stages: GROWN, weight: 3,
        text: "밤, 산 아래 아파트 단지에서 음식물 쓰레기 냄새가 올라온다.",
        choices: [
          { label: "단지 안으로 내려간다", outcomes: [
            { p: 60, result: "쓰레기통을 뒤져 배를 채우고 산으로 돌아갔다. 서울에서는 멧돼지 출몰로 한 해 500건 가까이 소방이 출동한다." },
            { p: 25, death: "놀란 주민의 신고로 출동한 경찰과 엽사에게 사살되었다." },
            { p: 15, death: "도로로 뛰어들었다가 차에 치였다." },
          ] },
          { label: "산에 머문다", risk: 0.02, health: -10, contrib: 0, result: "산에서 나무뿌리를 캐 먹었다.", death: "굶주린 채 겨울을 맞았다." },
        ],
      },
      {
        id: "trap", tag: "사람", seasons: ALL, stages: GROWN, weight: 2,
        text: "산길 옆에 철망 상자가 놓여 있다. 안에서 옥수수 냄새가 난다.",
        choices: [
          { label: "안으로 들어간다", outcomes: [
            { p: 70, death: "문이 닫혔다. 포획틀에 잡혀 처리되었다. 북한산 일대에만 포획틀 184개가 설치돼 있다." },
            { p: 30, result: "문이 고장 나 있었다. 옥수수만 먹고 나왔다." },
          ] },
          { label: "예전에 동료가 잡힌 냄새가 나서 피한다", risk: 0, health: -5, contrib: 0, result: "멧돼지는 학습이 빨라, 한 번 포획이 있었던 곳은 피한다." },
        ],
      },
      {
        id: "asf", tag: "사람", tagNote: "아프리카돼지열병", seasons: ALL, stages: GROWN, weight: 1,
        text: "산속에 죽은 멧돼지가 있다. 무리 몇이 냄새를 맡으러 다가간다. 아프리카돼지열병일지도 모른다.",
        choices: [
          { label: "다가가 냄새를 맡는다", risk: 0.3, health: 0, contrib: 0, result: "운이 좋았다. 2019년 이후 멧돼지 ASF가 퍼지자 정부는 광역 울타리를 치고 대규모 포획에 나섰다.", death: "아프리카돼지열병에 감염되어 죽었다." },
          { label: "멀리 돌아간다", risk: 0.02, health: -5, contrib: 0, result: "무사했다.", death: "그래도 바이러스가 무리 안에 퍼졌다." },
        ],
      },
      {
        id: "fence", tag: "사람", seasons: ALL, stages: GROWN, weight: 1,
        text: "늘 다니던 길이 철망 울타리에 막혔다. 감염 확산을 막고 산 아래로 내려오지 못하게 친 울타리다.",
        choices: [
          { label: "울타리 밑을 판다", risk: 0.05, health: -5, contrib: 0, result: "흙을 파서 빠져나갔다.", death: "울타리 너머 도로에서 차에 치였다." },
          { label: "울타리를 따라 걷는다", risk: 0.02, health: -10, contrib: 0, result: "끝없이 이어진 울타리를 따라 새 길을 찾았다.", death: "울타리를 따라가다 포획틀에 들어갔다." },
        ],
      },
      {
        id: "winter", tag: "자연", seasons: ["겨울", "한 해"], weight: 2,
        text: "눈이 쌓였다. 땅이 얼어 코로 파기 힘들다.",
        choices: [
          { label: "무리와 낙엽 더미에 파고든다", risk: 0.03, health: -10, contrib: 0, result: "함께 붙어 체온을 지켰다.", death: "겨울을 넘기지 못했다." },
          { label: "얼지 않은 개울가를 판다", risk: 0.04, health: 0, contrib: 0, result: "칡뿌리를 캐냈다.", death: "개울가에서 미끄러져 다쳤다." },
        ],
      },
    ],
    action: "산에 음식물 쓰레기를 버리지 말고, 등산할 때 도토리와 밤은 산에 남겨 두세요. 도심에서 멧돼지를 만나면 등을 보이고 뛰지 말고, 우산 등으로 몸을 가린 채 천천히 피한 뒤 112나 119에 신고해 주세요.",
  };
})();
