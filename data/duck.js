// 오리(육용오리): 국내 945만 1천 마리 (2026년 2분기 가축동향)
// 조류인플루엔자 살처분의 중심이자, 겨울철 사육을 쉬는 '휴지기'가 운영됨 (확인 필요)
window.ANIMALS = window.ANIMALS || {};

(function () {
  window.ANIMALS.duck = {
    id: "duck",
    name: "육용오리",
    emoji: "🦆",
    unit: "일",
    peerLabel: "새끼 오리",
    successLabel: "자연 수명까지 산 오리",
    intro: "부화장에서 깨어났다. 노란 솜털, 넓적한 부리. 물을 본 적은 없다. 당신은 고기용 오리다.",
    endText: "",
    lifespan: {
      weeks: 3650,
      label: "약 10년",
      note: "오리의 자연 수명은 10년 안팎으로 알려져 있음 (확인 필요). 육용오리는 약 6주 만에 출하된다 (확인 필요)",
      verified: false,
    },
    timeline: [
      { label: "부화장, 태어난 날", season: "1일째", weeks: 1 },
      { label: "1~2주", season: "육추", weeks: 13 },
      { label: "3~4주", season: "성장", weeks: 14 },
      { label: "5~6주", season: "출하 직전", weeks: 14 },
      { label: "출하 날", season: "약 6주", weeks: 1 },
    ],
    stages: [
      { id: "duckling", name: "새끼 오리", fromTurn: 0, baseRisk: 0.01, desc: "솜털이 보송보송하다." },
      { id: "grower", name: "자라는 오리", fromTurn: 2, baseRisk: 0.01, desc: "깃털이 하얗게 돋는다." },
    ],
    backgroundDeaths: [
      { stages: ["duckling", "grower"], tag: "사람", text: "밀집된 축사에서 병이 퍼져 죽었다." },
      { stages: ["grower"], tag: "사람", text: "젖은 깔짚 위에서 다리에 염증이 생겨 일어나지 못했다." },
    ],
    healthDeath: { tag: "사람", text: "몸이 약해져 일어나지 못했다." },
    events: [
      {
        id: "brooding", tag: "사람", turns: [0, 1], weight: 1,
        text: "보온등 아래 수천 마리 새끼 오리가 모여 있다.",
        choices: [
          { label: "물통으로 달려가 부리를 담근다", risk: 0.01, health: 10, contrib: 0, result: "오리는 물로 부리와 눈을 씻는다. 물통의 물이 금세 더러워진다.", death: "밟혀서 다쳤다." },
          { label: "보온등 밑에서 잔다", risk: 0.01, health: 5, contrib: 0, result: "따뜻하다.", death: "밟혀서 다쳤다." },
        ],
      },
      {
        id: "no_water", tag: "사람", turns: [2, 3], weight: 2,
        text: "깃털에 기름을 바르고 물에 몸을 담그고 싶다. 오리는 물새다. 하지만 축사에는 마실 물 말고 물이 없다.",
        choices: [
          { label: "물통에 머리를 넣고 물을 끼얹는다", risk: 0.01, health: 5, contrib: 0, result: "깃털이 조금 깨끗해졌다. 물에서 헤엄쳐 본 적은 한 번도 없다.", death: "젖은 바닥에서 병에 걸렸다." },
          { label: "깔짚 위에서 부리로 깃털을 고른다", risk: 0.01, health: -5, contrib: 0, result: "깃털이 더러워졌다.", death: "젖은 바닥에서 병에 걸렸다." },
        ],
      },
      {
        id: "avian_flu", tag: "사람", tagNote: "조류인플루엔자", turns: [1, 2, 3], weight: 2,
        text: "철새가 날아드는 계절. 근처 하천 철새에게서 고병원성 조류인플루엔자가 나왔다는 소식이다. 오리는 감염돼도 증상이 약해 바이러스가 늦게 발견되기도 한다.",
        choices: [
          { label: "축사 구석에 웅크린다", outcomes: [
            { p: 95, result: "이번에는 이 농장까지 오지 않았다." },
            { p: 5, death: "농장에서 감염이 확인되어 농장 전체가 살처분되었다." },
          ] },
          { label: "평소처럼 사료를 먹는다", outcomes: [
            { p: 95, result: "방역차가 지나갔다." },
            { p: 5, death: "발생 농장 반경 안이라 예방적 살처분되었다." },
          ] },
        ],
      },
      {
        id: "heat", tag: "사람", tagNote: "폭염", turns: [2, 3], weight: 1,
        text: "폭염. 오리는 땀을 흘리지 못한다. 축사 안이 숨 막히게 덥다.",
        choices: [
          { label: "날개를 벌리고 헐떡인다", risk: 0.01, health: -10, contrib: 0, result: "해가 지고서야 숨이 돌아왔다.", death: "더위를 이기지 못했다." },
          { label: "물통 앞을 차지한다", risk: 0.01, health: -5, contrib: 0, result: "물로 몸을 식혔다.", death: "더위를 이기지 못했다." },
        ],
      },
      {
        id: "shipping", tag: "사람", turns: [4], weight: 1,
        text: "새벽, 축사 문이 열렸다. 태어난 지 약 6주다.",
        choices: [
          { label: "꽥꽥 울며 뒤로 물러선다", outcomes: [{ p: 1, death: "도축장으로 옮겨져 도축되었다. 물에 한 번도 떠 보지 못했다. 오리의 자연 수명은 10년 안팎이다." }] },
          { label: "무리를 따라 걷는다", outcomes: [{ p: 1, death: "도축장으로 옮겨져 도축되었다. 태어난 지 약 6주였다." }] },
        ],
      },
    ],
    action: "오리고기를 고를 때 동물복지 인증을 확인해 보세요. 겨울 철새 도래지에 함부로 들어가지 않는 것도 조류인플루엔자가 농장으로 퍼지는 것을 막는 방법이에요.",
  };
})();
