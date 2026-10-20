// 닭: 한국에서 동물로 태어난다면, 개미 다음으로 가능성이 큰 삶
// 국내 사육 약 1.9억 마리 (2026년 2분기 가축동향: 산란계 7,898만, 육용계 1억 1,090만)
// 한 해 도축 약 10억 1천만 마리 (2023, 한국농촌경제연구원 통계 인용 YTN)
window.ANIMALS = window.ANIMALS || {};

(function () {
  // 육계와 산란계가 함께 겪는 사건
  const heatwave = {
    id: "heatwave", tag: "사람", tagNote: "폭염", weight: 2,
    text: "바깥은 35도가 넘는 폭염. 수만 마리가 모인 축사 안은 더 뜨겁다. 닭은 땀샘이 없어 입을 벌리고 헐떡인다.",
    choices: [
      { label: "환풍기 바람이 오는 쪽으로 비집고 간다", risk: 0.01, health: -10, contrib: 0,
        result: "겨우 버텼다. 2024년 7월 보름 동안 폭염으로 폐사한 가축 약 9만 6천 마리 중 8만 6천 마리가 닭·오리였다.",
        death: "더위를 이기지 못하고 쓰러졌다." },
      { label: "날개를 벌리고 가만히 있는다", risk: 0.01, health: -15, contrib: 0,
        result: "해가 지고 나서야 숨이 돌아왔다.", death: "더위를 이기지 못하고 쓰러졌다." },
    ],
  };
  const avianFlu = {
    id: "avian_flu", tag: "사람", tagNote: "조류인플루엔자", weight: 1,
    text: "겨울, 근처 농장에서 고병원성 조류인플루엔자가 나왔다는 소식. 방역복을 입은 사람들이 축사 앞에 모였다.",
    choices: [
      { label: "구석으로 몸을 숨긴다", outcomes: [
        { p: 97, result: "이번에는 이 농장까지 오지 않았다." },
        { p: 3, death: "발생 농장 반경 안이라 농장 전체가 예방적 살처분되었다. 2016~2017년 겨울에는 3천만 마리가 넘는 가금이 살처분됐다." },
      ] },
      { label: "평소처럼 모이를 쫀다", outcomes: [
        { p: 97, result: "방역차가 지나갔다. 농장은 무사했다." },
        { p: 3, death: "발생 농장 반경 안이라 농장 전체가 예방적 살처분되었다." },
      ] },
    ],
  };

  const action = "닭고기와 달걀을 고를 때 동물복지 인증 표시와 달걀 껍데기의 사육환경 번호(1번 방사, 2번 평사, 3·4번 케이지)를 확인해 보세요. 더 넓은 곳에서 산 닭의 달걀과 고기를 고르는 것이 닭의 삶을 바꾸는 가장 직접적인 방법이에요.";

  window.CHICKEN_ORIGINS = [
    {
      id: "broiler", name: "육계", weight: 11090, life: "chicken.broiler",
      desc: "고기를 얻기 위해 기르는 닭. 아주 빨리 자라도록 개량됐다.",
      popNote: "국내 닭 중 육용계 1억 1,090만 마리 (2026년 2분기 가축동향)",
    },
    {
      id: "layer", name: "산란계", weight: 7898, life: "chicken.layer",
      desc: "달걀을 얻기 위해 기르는 암탉. 대부분 철제 케이지에서 산다.",
      popNote: "국내 닭 중 산란계 7,898만 마리 (2026년 2분기 가축동향)",
    },
  ];

  window.ANIMALS["chicken.broiler"] = {
    id: "chicken.broiler",
    name: "육계",
    emoji: "🐔",
    unit: "일",
    peerLabel: "병아리",
    successLabel: "자연 수명까지 산 닭",
    intro: "부화장의 거대한 부화기에서 수만 개의 알과 함께 깨어났다. 어미 닭은 본 적이 없다. 당신은 고기용 닭, 육계다.",
    endText: "",
    lifespan: {
      weeks: 2555,
      label: "약 5~10년",
      note: "닭의 자연 수명은 흔히 5~10년으로 알려져 있음 (확인 필요). 육계는 약 한 달 만에 출하된다",
      verified: false,
    },
    timeline: [
      { label: "부화장, 태어난 날", season: "1일째", weeks: 1 },
      { label: "농장 도착, 첫 주", season: "1주차", weeks: 6 },
      { label: "둘째 주", season: "2주차", weeks: 7 },
      { label: "셋째 주", season: "3주차", weeks: 7 },
      { label: "넷째 주", season: "4주차", weeks: 7 },
      { label: "출하 날", season: "약 한 달", weeks: 2 },
    ],
    stages: [
      { id: "chick", name: "병아리", fromTurn: 0, baseRisk: 0.005, desc: "노란 솜털 병아리." },
      { id: "grower", name: "자라는 닭", fromTurn: 2, baseRisk: 0.005, desc: "하루가 다르게 몸이 커진다." },
    ],
    backgroundDeaths: [
      { stages: ["chick", "grower"], tag: "사람", text: "밀집된 축사에서 병이 퍼져 죽었다." },
      { stages: ["grower"], tag: "사람", text: "너무 빨리 불어난 몸을 심장이 감당하지 못했다." },
    ],
    healthDeath: { tag: "사람", text: "다리가 몸무게를 버티지 못해 일어나지 못했고, 물과 사료에 닿지 못했다." },
    events: [
      {
        id: "hatchery", tag: "사람", turns: [0], weight: 1,
        text: "컨베이어 벨트 위. 사람의 손이 병아리들을 빠르게 상자에 옮겨 담는다.",
        choices: [
          { label: "삐약삐약 운다", risk: 0.01, health: 0, contrib: 0, result: "트럭에 실려 농장으로 간다.", death: "옮겨지는 도중 다쳤다." },
          { label: "다른 병아리들 틈에 웅크린다", risk: 0.01, health: 0, contrib: 0, result: "트럭에 실려 농장으로 간다.", death: "옮겨지는 도중 깔렸다." },
        ],
      },
      {
        id: "brooder", tag: "사람", turns: [1], weight: 1,
        text: "넓은 축사 바닥에 수만 마리의 병아리가 깔려 있다. 하루 종일 불이 켜져 있다.",
        choices: [
          { label: "사료통에서 떠나지 않는다", risk: 0, health: 10, contrib: 0, result: "몸이 빠르게 자란다." },
          { label: "구석에서 잔다", risk: 0.02, health: -5, contrib: 0, result: "덜 먹었다.", death: "다른 병아리들에게 밟혔다." },
        ],
      },
      {
        id: "crowding", tag: "사람", turns: [2, 3], weight: 2,
        text: "몸이 커질수록 바닥이 좁아진다. 이제 옆 닭과 몸이 닿지 않는 곳이 없다.",
        choices: [
          { label: "물통까지 밀고 나간다", risk: 0.02, health: 5, contrib: 0, result: "물을 마셨다. 바닥 깔짚은 배설물로 축축하다.", death: "밀치다 넘어져 밟혔다." },
          { label: "제자리에 주저앉는다", risk: 0.01, health: -10, contrib: 0, result: "깔짚의 암모니아 냄새에 눈이 따갑다.", death: "축축한 바닥에서 피부병이 깊어졌다." },
        ],
      },
      {
        id: "legs", tag: "사람", turns: [3, 4], weight: 2,
        text: "태어난 지 3주. 몸무게가 하루가 다르게 늘었다. 다리가 몸을 버티기 버겁다.",
        choices: [
          { label: "억지로 일어나 사료통까지 걷는다", risk: 0.015, health: -10, contrib: 0,
            result: "몇 걸음 걷고 주저앉았다. 육계는 아주 빨리 자라도록 개량돼, 다리와 심장이 몸무게를 못 따라가는 경우가 많다.",
            death: "다리가 꺾여 일어나지 못했다." },
          { label: "앉은 채로 버틴다", risk: 0.01, health: -15, contrib: 0, result: "하루 대부분을 앉아서 보냈다.", death: "물에 닿지 못해 쇠약해졌다." },
        ],
      },
      Object.assign({ turns: [2, 3, 4] }, heatwave),
      Object.assign({ turns: [2, 3, 4] }, avianFlu),
      {
        id: "shipping", tag: "사람", turns: [5], weight: 1,
        text: "새벽, 축사 문이 열리고 사람들이 들어온다. 닭들이 상자에 담겨 트럭에 실린다. 태어난 지 약 한 달이다.",
        choices: [
          { label: "구석으로 도망친다", outcomes: [
            { p: 1, death: "도축장으로 옮겨져 도축되었다. 한국에서는 한 해 약 10억 마리의 닭이 도축된다. 닭의 자연 수명은 5~10년이다." },
          ] },
          { label: "가만히 있는다", outcomes: [
            { p: 1, death: "도축장으로 옮겨져 도축되었다. 한국에서는 한 해 약 10억 마리의 닭이 도축된다. 닭의 자연 수명은 5~10년이다." },
          ] },
        ],
      },
    ],
    action,
  };

  window.ANIMALS["chicken.layer"] = {
    id: "chicken.layer",
    name: "산란계",
    emoji: "🐔",
    peerLabel: "암평아리",
    successLabel: "자연 수명까지 산 닭",
    contribLabel: "낳은 달걀(개)",
    intro: "부화장에서 깨어났다. 사람의 손이 당신을 뒤집어 보더니 '암컷' 상자에 넣었다. 당신은 달걀을 낳기 위한 닭, 산란계다.",
    endText: "",
    lifespan: {
      weeks: 365,
      label: "약 5~10년",
      note: "닭의 자연 수명은 흔히 5~10년으로 알려져 있음 (확인 필요). 산란계는 산란율이 떨어지는 1년 반~2년 무렵 도태된다 (확인 필요)",
      verified: false,
    },
    timeline: [
      { label: "부화장, 태어난 날", season: "1일째", weeks: 1 },
      { label: "병아리 시절", season: "0~17주령", weeks: 17 },
      { label: "케이지로 옮겨진 날", season: "18주령", weeks: 2 },
      { label: "첫 알을 낳는 시기", season: "20~30주령", weeks: 10, contrib: 55 },
      { label: "산란 절정기", season: "30~50주령", weeks: 20, contrib: 130 },
      { label: "산란 후반기", season: "50~70주령", weeks: 20, contrib: 115 },
      { label: "노계", season: "70~80주령", weeks: 10 },
    ],
    stages: [
      { id: "chick", name: "병아리", fromTurn: 0, baseRisk: 0.01, desc: "아직 알을 낳지 않는다." },
      { id: "hen", name: "산란계", fromTurn: 2, baseRisk: 0.02, desc: "케이지 안에서 거의 매일 알을 낳는다." },
    ],
    backgroundDeaths: [
      { stages: ["chick"], tag: "사람", text: "육추장에서 병에 걸려 죽었다." },
      { stages: ["hen"], tag: "사람", text: "케이지 안에서 병에 걸려 죽었다." },
      { stages: ["hen"], tag: "사람", text: "알껍데기를 만드느라 칼슘이 빠져나간 뼈가 부러졌다." },
    ],
    healthDeath: { tag: "사람", text: "알을 낳느라 지친 몸이 버티지 못했다." },
    events: [
      {
        id: "sexing", tag: "사람", turns: [0], weight: 1,
        text: "옆 상자에는 '수컷'으로 분류된 병아리들이 담겼다. 수컷은 알을 낳지 못한다.",
        choices: [
          { label: "옆 상자를 바라본다", risk: 0, health: 0, contrib: 0,
            result: "그 병아리들이 어디로 갔는지는 모른다. 알을 낳지 못하는 수평아리는 부화 직후 폐기된다는 지적이 있다." },
          { label: "눈을 감는다", risk: 0, health: 0, contrib: 0, result: "트럭에 실려 육추장으로 간다." },
        ],
      },
      {
        id: "beak", tag: "사람", turns: [1], weight: 1,
        text: "사람이 당신을 붙잡고 부리 끝에 뜨거운 기계를 댄다. 좁은 곳에서 서로 쪼아 다치지 않게 하려는 '부리 자르기'다.",
        choices: [
          { label: "몸부림친다", risk: 0.01, health: -15, contrib: 0, result: "부리 끝이 뭉툭해졌다. 며칠 동안 모이를 쪼기 힘들었다.", death: "상처가 덧나 죽었다." },
          { label: "가만히 있는다", risk: 0.01, health: -10, contrib: 0, result: "부리 끝이 뭉툭해졌다.", death: "상처가 덧나 죽었다." },
        ],
      },
      {
        id: "cage", tag: "사람", turns: [2], weight: 1,
        text: "철제 케이지로 옮겨졌다. 한 칸에 여러 마리. 날개를 다 펼 수 없다. 케이지는 여러 층으로 쌓여 끝없이 이어진다.",
        choices: [
          { label: "철망 바닥에 적응해 본다", risk: 0, health: -5, contrib: 0,
            result: "법정 사육 면적은 2018년에 마리당 0.05㎡에서 0.075㎡로 넓어졌다. 가로세로 약 5cm씩이다. 기존 농장은 유예 기간을 받았다." },
          { label: "옆 닭과 자리를 다툰다", risk: 0.02, health: -10, contrib: 0, result: "자리를 조금 얻었다.", death: "다툼에서 다쳤다." },
        ],
      },
      {
        id: "laying", tag: "사람", turns: [3, 4, 5], weight: 2,
        text: "하루 종일 조명이 켜져 있다. 거의 매일 알을 하나씩 낳는다. 알은 경사진 바닥을 굴러 컨베이어 벨트로 사라진다.",
        choices: [
          { label: "둥지를 찾으려 철망을 긁는다", risk: 0.01, health: -10, contrib: 0,
            result: "둥지는 없다. 닭은 알을 낳기 전 숨을 곳을 찾는 본능이 있지만, 케이지에는 숨을 곳이 없다.",
            death: "지쳐 쓰러졌다." },
          { label: "그냥 철망 위에 낳는다", risk: 0.01, health: -5, contrib: 0,
            result: "알이 굴러갔다. 내일도, 모레도 그럴 것이다.", death: "지쳐 쓰러졌다." },
        ],
      },
      {
        id: "bones", tag: "사람", turns: [4, 5], weight: 1,
        text: "알껍데기를 만드느라 몸의 칼슘이 빠져나간다. 다리에 힘이 없다.",
        choices: [
          { label: "모이통으로 목을 길게 뺀다", risk: 0.02, health: 5, contrib: 0, result: "조금 먹었다.", death: "약해진 뼈가 부러졌다." },
          { label: "웅크리고 앉는다", risk: 0.03, health: -10, contrib: -20, result: "알 낳는 횟수가 줄었다.", death: "약해진 뼈가 부러져 일어나지 못했다." },
        ],
      },
      Object.assign({ turns: [3, 4, 5] }, heatwave),
      Object.assign({ turns: [3, 4, 5] }, avianFlu),
      {
        id: "spent_hen", tag: "사람", turns: [6], weight: 3,
        text: "알 낳는 횟수가 줄었다. 사람들이 케이지를 열고 닭들을 꺼내기 시작한다.",
        choices: [
          { label: "케이지 안쪽으로 물러선다", outcomes: [
            { p: 1, death: "산란율이 떨어져 '노계'로 도태되었다. 태어난 지 1년 반 남짓. 닭의 자연 수명은 5~10년이다." },
          ] },
          { label: "처음으로 케이지 밖 하늘을 본다", outcomes: [
            { p: 1, death: "트럭에 실려 도태되었다. 처음 본 하늘이 마지막이었다. 닭의 자연 수명은 5~10년이다." },
          ] },
        ],
      },
    ],
    action,
  };
})();
