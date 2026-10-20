// 비둘기(집비둘기): 사람이 길러 온 새의 후손이 도시의 '유해야생동물'이 됨
// 2009년 6월 유해야생동물 지정. 2024년 12월부터 유해야생동물 먹이 주기 금지 (야생생물법 개정)
// 서울: 2025년 7월부터 공원·한강공원 등 38곳 먹이 주기 과태료 20만~100만 원
window.ANIMALS = window.ANIMALS || {};

(function () {
  const ALL = ["봄", "여름", "가을", "겨울", "한 해"];
  const GROWN = ["young", "adult"];

  window.ANIMALS.pigeon = {
    id: "pigeon",
    name: "비둘기",
    emoji: "🐦",
    peerLabel: "새끼 비둘기",
    successLabel: "여섯 살까지 산 비둘기",
    contribLabel: "키워 낸 새끼",
    flagLabels: { stringfoot: "발가락을 잃음" },
    intro: "고가도로 아래 철골 틈, 나뭇가지 몇 개로 엮은 둥지에서 깨어났다. 당신은 도시의 비둘기다. 당신의 먼 조상은 사람이 수천 년 동안 길러 온 새였다.",
    endText: "여섯 해를 살았다. 광장의 사람들은 바뀌었지만, 당신은 여전히 같은 다리 밑으로 돌아온다.",
    lifespan: {
      weeks: 780,
      label: "사육 시 15년 이상",
      note: "도시 비둘기의 평균 수명은 몇 년 정도로 알려져 있으나 공식 자료는 없음 (확인 필요)",
      verified: false,
    },
    timeline: [
      { label: "둥지에서 깨어난 날", season: "봄", weeks: 1 },
      { label: "둥지 시절", season: "봄", weeks: 4 },
      { label: "첫 비행", season: "봄", weeks: 8 },
      { label: "첫 여름", season: "여름", weeks: 13 },
      { label: "첫 가을", season: "가을", weeks: 13 },
      { label: "첫 겨울", season: "겨울", weeks: 13 },
      { label: "2살 → 3살", season: "한 해", weeks: 52 },
      { label: "3살 → 4살", season: "한 해", weeks: 52 },
      { label: "4살 → 5살", season: "한 해", weeks: 52 },
      { label: "5살 → 6살", season: "한 해", weeks: 52 },
    ],
    stages: [
      { id: "squab", name: "새끼 비둘기", fromTurn: 0, baseRisk: 0.06, desc: "둥지에서 부모가 먹이를 넣어 준다." },
      { id: "young", name: "어린 비둘기", fromTurn: 2, baseRisk: 0.05, desc: "처음으로 광장에 내려앉았다." },
      { id: "adult", name: "어른 비둘기", fromTurn: 6, baseRisk: 0.15, desc: "도시에서 한 해를 넘기는 것이 고비다." },
    ],
    backgroundDeaths: [
      { stages: ["squab"], tag: "자연", text: "둥지에서 떨어졌다." },
      { stages: ["squab"], tag: "자연", text: "병에 걸려 죽었다." },
      { stages: GROWN, tag: "자연", text: "길고양이에게 잡혔다." },
      { stages: GROWN, tag: "사람", text: "도로에서 차를 피하지 못했다." },
      { stages: GROWN, tag: "자연", text: "병에 걸려 죽었다." },
    ],
    healthDeath: { tag: "자연", text: "굶주림에 기운을 잃었다." },
    events: [
      {
        id: "crop_milk", tag: "자연", turns: [0, 1], weight: 4,
        text: "부모가 번갈아 입속에 '비둘기 젖'을 넣어 준다. 비둘기는 엄마 아빠 모두 목 안의 주머니에서 젖 같은 먹이를 만들어 새끼를 먹인다.",
        choices: [
          { label: "부리를 크게 벌린다", risk: 0.03, health: 15, contrib: 0, result: "하루가 다르게 깃털이 돋는다.", death: "둥지에서 떨어졌다." },
          { label: "형제 밑에 웅크린다", risk: 0.05, health: 0, contrib: 0, result: "형제가 먼저 먹었다.", death: "먹이를 충분히 먹지 못했다." },
        ],
      },
      {
        id: "nest_removal", tag: "사람", turns: [1], weight: 1,
        text: "다리 밑에 사람들이 사다리를 대고 올라온다. 배설물 민원 때문에 둥지를 치우고 그물(방조망)을 치려 한다.",
        choices: [
          { label: "둥지 안쪽으로 몸을 숨긴다", outcomes: [
            { p: 70, result: "사람들이 다른 기둥부터 치웠다. 며칠 뒤 날 수 있게 되었다." },
            { p: 30, death: "둥지가 통째로 치워졌다. 아직 날 수 없었다." },
          ] },
          { label: "날개를 퍼덕여 본다", outcomes: [
            { p: 50, result: "철골 위로 겨우 올라갔다. 부모가 그곳까지 먹이를 날라 주었다." },
            { p: 50, death: "둥지 밖으로 떨어졌다." },
          ] },
        ],
      },
      {
        id: "first_flight", tag: "자연", turns: [2], weight: 1,
        text: "처음으로 날아 광장에 내려앉았다. 사람들 발 사이에 과자 부스러기가 흩어져 있다.",
        choices: [
          { label: "사람들 사이로 걸어 들어간다", risk: 0.04, health: 10, contrib: 0, result: "배가 찼다. 사람은 무섭지 않은 존재가 되었다.", death: "자전거 바퀴에 치였다." },
          { label: "무리 가장자리에서 눈치를 본다", risk: 0.02, health: 0, contrib: 0, result: "무리가 움직이는 대로 따라다니는 법을 배웠다.", death: "길고양이에게 잡혔다." },
        ],
      },
      {
        id: "feeding_ban", tag: "사람", seasons: ALL, stages: GROWN, weight: 3,
        text: "늘 모이를 뿌려 주던 할머니가 오늘은 빈손이다. 공원 입구에 '비둘기 먹이 주기 금지, 과태료 최대 100만 원' 현수막이 붙었다.",
        choices: [
          { label: "다른 공원으로 날아간다", risk: 0.03, health: -10, contrib: 0,
            result: "그곳도 금지구역이었다. 2024년 12월부터 유해야생동물 먹이 주기가 금지됐고, 서울은 2025년 7월부터 38곳에서 과태료를 매긴다.",
            death: "먹이를 찾아 헤매다 도로에서 차를 피하지 못했다." },
          { label: "음식물 쓰레기봉투를 쫀다", risk: 0.05, health: 5, contrib: 0,
            result: "배를 채웠다. 먹이 주기를 금지해도 음식물 쓰레기가 있는 한 비둘기는 남는다.",
            death: "상한 음식을 먹고 탈이 났다." },
        ],
      },
      {
        id: "stringfoot", tag: "사람", seasons: ALL, stages: GROWN, when: { stringfoot: false }, weight: 2,
        text: "보도 위를 걷다가 발가락에 머리카락과 실이 감겼다. 걸을 때마다 조금씩 더 조여 온다.",
        choices: [
          { label: "부리로 풀어 보려 한다", outcomes: [
            { p: 40, result: "겨우 풀어냈다." },
            { p: 60, result: "피가 통하지 않던 발가락 하나가 결국 떨어져 나갔다. 미용실이 많은 거리일수록 발가락을 잃은 비둘기가 많다는 연구가 있다.", setFlags: { stringfoot: true }, health: -15 },
          ] },
          { label: "참고 걷는다", outcomes: [
            { p: 15, result: "실이 저절로 풀렸다." },
            { p: 85, result: "발가락 두 개를 잃었다. 절뚝이며 걷는다.", setFlags: { stringfoot: true }, health: -20 },
          ] },
        ],
      },
      {
        id: "glass", tag: "사람", seasons: ALL, stages: GROWN, weight: 1,
        text: "빌딩 사이를 날아가는데, 앞에 하늘이 비쳐 보인다. 유리창이다.",
        choices: [
          { label: "그대로 날아간다", risk: 0.25, health: -10, contrib: 0,
            result: "마지막 순간 방향을 틀었다. 국내에서는 해마다 약 800만 마리의 새가 건물 유리창과 투명 방음벽에 부딪혀 죽는다는 추정이 있다.",
            death: "유리창에 부딪혔다." },
          { label: "속도를 줄이고 위로 솟구친다", risk: 0.05, health: -5, contrib: 0, result: "유리창을 넘어갔다.", death: "유리창에 부딪혔다." },
        ],
      },
      {
        id: "breeding", tag: "자연", seasons: ALL, stages: GROWN, weight: 2,
        text: "짝과 함께 에어컨 실외기 뒤에 둥지를 틀었다. 비둘기는 짝이 번갈아 알을 품고 새끼를 키운다. 1년 내내 번식할 수 있다.",
        choices: [
          { label: "새끼에게 먹이를 날라 준다", outcomes: [
            { p: 60, result: "새끼 둘이 둥지를 떠났다.", contrib: 2, health: -10 },
            { p: 40, result: "집주인이 둥지를 치웠다. 실외기 둥지는 흔한 민원이다.", health: -5 },
          ] },
          { label: "알만 품고 먹이는 짝에게 맡긴다", outcomes: [
            { p: 50, result: "새끼 하나가 자랐다.", contrib: 1, health: -5 },
            { p: 50, result: "알이 깨어나지 못했다." },
          ] },
        ],
      },
      {
        id: "capture", tag: "사람", seasons: ALL, stages: GROWN, weight: 1,
        text: "광장 한쪽에 그물이 설치됐다. 유해야생동물은 지자체 허가를 받으면 포획할 수 있다.",
        choices: [
          { label: "그물 아래 모이로 다가간다", outcomes: [
            { p: 70, result: "그물이 떨어지기 직전 날아올랐다." },
            { p: 30, death: "그물에 잡혀 포획되었다." },
          ] },
          { label: "지붕 위로 피한다", risk: 0, health: -5, contrib: 0, result: "무리 절반이 사라졌다." },
        ],
      },
      {
        id: "winter", tag: "자연", seasons: ["겨울", "한 해"], stages: GROWN, weight: 2,
        text: "한파. 깃털을 부풀려도 바람이 파고든다.",
        choices: [
          { label: "지하철 환풍구 위에 모여 앉는다", risk: 0.03, health: -5, contrib: 0, result: "따뜻한 바람이 올라온다.", death: "추위를 이기지 못했다." },
          { label: "다리 밑 둥지로 돌아간다", risk: 0.04, health: -10, contrib: 0, result: "짝과 몸을 붙이고 버텼다.", death: "추위를 이기지 못했다." },
        ],
      },
      {
        id: "kid", tag: "사람", seasons: ["봄", "여름", "가을", "한 해"], stages: GROWN, weight: 1,
        text: "아이가 소리를 지르며 무리 한가운데로 달려온다.",
        choices: [
          { label: "다 같이 날아오른다", risk: 0.01, health: -5, contrib: 0, result: "광장 위를 한 바퀴 돌고 다시 내려앉았다.", death: "날아오르다 전깃줄에 부딪혔다." },
          { label: "몇 걸음 종종걸음으로 피한다", risk: 0, health: 0, contrib: 0, result: "아이는 금방 지나갔다." },
        ],
      },
    ],
    action: "비둘기에게 직접 먹이를 주기보다, 음식물 쓰레기를 잘 닫아 버려 주세요. 머리카락과 실은 바닥에 버리지 말아 주세요. 유리창에는 5×10cm 간격의 점무늬 스티커를 붙이면 새들의 충돌을 막을 수 있어요.",
  };
})();
