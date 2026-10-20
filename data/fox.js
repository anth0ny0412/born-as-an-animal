// 여우 (붉은여우, 멸종위기 야생생물 1급): 사람이 없앴다가 사람이 되살리는 삶
// 1980년대 이후 야생에서 사실상 사라짐 → 2012년부터 소백산 복원. 2026년 8월 현재 야생 활동 약 110마리
// 방사 여우 259마리 중 1년 안에 35.9%가 엽구·교통사고·농약 중독으로 폐사하거나 회수됨 (2주 7.3%, 8주 18.1%)
// (국립공원공단, 경향신문 2026-08-06)
window.ANIMALS = window.ANIMALS || {};

(function () {
  const ALL = ["봄", "여름", "가을", "겨울", "한 해"];
  const WILD = ["released", "young", "adult", "established", "veteran"];

  // 방사 여우와 야생 출생 여우가 함께 겪는 사건
  const sharedEvents = [
    {
      id: "snare", tag: "사람", tagNote: "불법 엽구", seasons: ALL, stages: WILD, weight: 3,
      text: "덤불 사이 짐승길에서 쇠 냄새가 난다.",
      choices: [
        { label: "늘 다니던 짐승길로 간다", risk: 0.15, health: 0, contrib: 0,
          result: "무사히 지나갔다. 바로 옆에 철사 올무가 걸려 있었다. 2012년 첫 방사 때는 여우 절반 이상이 죽거나 불법 사냥도구에 다쳐 회수됐다.",
          death: "불법 올무에 다리가 걸렸다. GPS 신호를 따라온 직원들이 구조했지만 야생으로 돌아가지 못했다." },
        { label: "낯선 길로 돌아간다", risk: 0.03, health: -10, contrib: 0,
          result: "먼 길이었지만 아무 일도 없었다.", death: "낯선 길에도 덫이 있었다." },
      ],
    },
    {
      id: "road", tag: "사람", seasons: ALL, stages: WILD, weight: 3,
      text: "밤, 산자락을 가르는 국도. 건너편 논에서 들쥐 냄새가 난다.",
      choices: [
        { label: "곧장 건넌다", risk: 0.15, health: 5, contrib: 0,
          result: "건너편에서 들쥐를 잡았다.", death: "도로를 건너다 차에 치였다." },
        { label: "도로 밑 배수로 통로를 찾는다", risk: 0.03, health: -5, contrib: 0,
          result: "좁은 배수로를 지나 안전하게 건넜다.", death: "통로를 찾아 헤매다 다른 도로에서 차에 치였다." },
      ],
    },
    {
      id: "pesticide", tag: "사람", seasons: ["봄", "여름", "가을", "한 해"], stages: WILD, weight: 2,
      text: "논둑에 움직이지 않는 새 한 마리가 쓰러져 있다. 쉽게 얻은 먹이다.",
      choices: [
        { label: "물어 간다", risk: 0.2, health: 10, contrib: 0,
          result: "운 좋게 멀쩡한 먹이였다. 1960년대 쥐잡기 운동 때 쥐약 먹은 쥐를 먹은 것이 여우가 사라진 원인 중 하나로 꼽힌다.",
          death: "농약에 중독된 새를 먹고 중독되었다." },
        { label: "냄새가 이상해 지나친다", risk: 0, health: -5, contrib: 0, result: "산으로 돌아가 들쥐를 찾았다." },
      ],
    },
    {
      id: "mousing", tag: "자연", seasons: ["가을", "겨울", "한 해"], stages: WILD, weight: 2,
      text: "눈 덮인 풀밭. 눈 밑에서 들쥐가 바스락거리는 소리가 들린다.",
      choices: [
        { label: "높이 뛰어올라 머리부터 내리꽂는다", risk: 0.01, health: 15, contrib: 0,
          result: "잡았다. 여우는 소리만으로 눈 밑 먹이의 위치를 찾아 뛰어든다.", death: "얼음 밑으로 빠졌다." },
        { label: "더 쉬운 먹이를 찾아 마을 쪽으로 간다", risk: 0.08, health: 5, contrib: 0,
          result: "마을 밭에서 먹이를 찾았다.", death: "마을 근처 도로에서 차에 치였다." },
      ],
    },
    {
      id: "territory", tag: "자연", seasons: ALL, stages: WILD, weight: 2,
      text: "다른 여우의 영역 표시 냄새가 짙다.",
      choices: [
        { label: "밀고 들어가 영역을 다툰다", risk: 0.06, health: -10, contrib: 0,
          result: "새 영역을 얻었다.", death: "다툼에서 크게 다쳤다." },
        { label: "새 땅을 찾아 더 멀리 간다", risk: 0.06, health: -10, contrib: 0,
          result: "소백산을 벗어나 새 골짜기에 닿았다. 복원 목표 중 하나는 여러 곳에 작은 무리를 만드는 것이다.",
          death: "낯선 땅을 헤매다 도로에서 차에 치였다." },
      ],
    },
    {
      id: "hiker", tag: "사람", seasons: ["봄", "여름", "가을", "한 해"], stages: WILD, weight: 1,
      text: "등산객이 휴대폰을 들고 다가온다. 누군가 과자를 던진다.",
      choices: [
        { label: "과자를 주워 먹는다", risk: 0.05, health: 5, contrib: 0,
          result: "사람에게 익숙해지면 마을과 도로로 내려올 위험이 커진다.", death: "사람을 따라 내려왔다가 도로에서 차에 치였다." },
        { label: "숲으로 사라진다", risk: 0, health: 0, contrib: 0, result: "야생 여우는 사람을 피해야 오래 산다." },
      ],
    },
    {
      id: "mating", tag: "자연", seasons: ["겨울", "한 해"], stages: ["released", "adult", "established", "veteran"], weight: 2,
      text: "짝짓기 철. 겨울밤마다 여우 울음소리가 골짜기를 울린다.",
      choices: [
        { label: "짝을 찾아 밤새 돌아다닌다", risk: 0.08, health: -10, contrib: 1,
          result: "짝을 만났다. 봄이면 함께 굴을 팔 것이다.", death: "짝을 찾아 헤매다 도로에서 차에 치였다." },
        { label: "영역을 지키며 기다린다", risk: 0.02, health: 0, contrib: 0,
          result: "올겨울은 짝을 만나지 못했다.", death: "추운 겨울을 넘기지 못했다." },
      ],
    },
    {
      id: "cubs", tag: "자연", seasons: ["봄", "한 해"], stages: ["released", "adult", "established", "veteran"], weight: 3,
      text: "짝과 함께 판 굴에서 새끼 다섯 마리가 태어났다. 여우는 짝이 함께 먹이를 날라 새끼를 키운다.",
      choices: [
        { label: "멀리까지 사냥해 새끼들을 먹인다", risk: 0.08, health: -10, contrib: 4,
          result: "새끼 넷이 가을까지 살아남았다. 2016년, 복원 사업 이후 처음으로 야생 출산이 확인됐고 이제 그 자손들이 산에 산다.",
          death: "사냥을 나갔다가 돌아오지 못했다." },
        { label: "굴 근처에서만 사냥한다", risk: 0.03, health: 0, contrib: 2,
          result: "새끼 둘이 살아남았다.", death: "굴 근처에서 올무에 걸렸다." },
      ],
    },
  ];

  const backgroundDeaths = [
    { stages: ["cub"], tag: "자연", text: "굴 밖에 나왔다가 맹금류에게 채여 갔다." },
    { stages: ["cub"], tag: "자연", text: "병에 걸려 죽었다." },
    { stages: WILD, tag: "사람", text: "도로를 건너다 차에 치였다." },
    { stages: WILD, tag: "사람", text: "불법 올무에 걸렸다." },
    { stages: WILD, tag: "사람", text: "농약에 중독된 먹이를 먹었다." },
    { stages: WILD, tag: "자연", text: "병에 걸려 죽었다." },
    { stages: ["veteran"], tag: "자연", text: "나이 들어 사냥이 힘들어졌고, 겨울을 넘기지 못했다." },
  ];

  function makeFoxLife(opts) {
    return Object.assign({
      emoji: "🦊",
      peerLabel: "여우",
      successLabel: "여섯 살까지 산 여우",
      contribLabel: "복원에 보탠 새끼",
      endText: "여섯 해를 살았다. 야생 여우로서는 긴 삶이다. 당신의 새끼들이 이 산의 다음 세대가 된다.",
      lifespan: {
        weeks: 312,
        label: "야생 평균 약 3년, 길게는 8년",
        note: "사육 시 15년까지 (Maymont), 위스콘신 야생 여우 조사 평균 1.6세·최대 8세. 국내 복원 여우 자료는 없음",
        verified: false,
      },
      healthDeath: { tag: "자연", text: "먹이를 구하지 못해 쇠약해져 쓰러졌다." },
      backgroundDeaths,
      action: "산에서 올무나 덫을 보면 국립공원공단이나 지자체에 신고해 주세요. 논밭의 쥐약과 농약은 여우를 사라지게 한 원인 중 하나였어요. 국립공원 주변 도로에서는 속도를 줄이고, 야생동물에게 먹이를 주지 말아 주세요.",
    }, opts);
  }

  window.FOX_ORIGINS = [
    {
      id: "released", name: "방사된 여우", weight: 70, life: "fox.released",
      desc: "복원 시설에서 태어나 훈련을 받고 소백산에 방사되는 여우.",
      popNote: "야생 활동 여우 중 방사 개체 비율을 70%로 가정 (확인 필요)",
    },
    {
      id: "wild", name: "야생에서 태어난 여우", weight: 30, life: "fox.wild",
      desc: "방사된 여우들이 산에서 낳은 새끼. 복원의 진짜 성과다.",
      popNote: "야생 출생 비율을 30%로 가정 (2022년까지 자연 출생 22마리 보도, 확인 필요)",
    },
  ];

  window.ANIMALS["fox.released"] = makeFoxLife({
    name: "방사된 여우",
    intro: "경북 영주의 여우 복원 시설에서 태어났다. 부모도 이곳에서 태어났다. 이 땅의 야생 여우는 1980년대 이후 사실상 사라졌다. 당신은 그 빈자리를 채우러 산으로 갈 것이다.",
    timeline: [
      { label: "복원 시설에서 태어난 봄", season: "봄", weeks: 16 },
      { label: "자연적응장 훈련 8개월", season: "겨울", weeks: 35 },
      { label: "방사장에서 보낸 한 달", season: "여름", weeks: 4 },
      { label: "방사 후 2주", season: "여름", weeks: 2 },
      { label: "방사 후 2~8주", season: "여름", weeks: 6 },
      { label: "방사 후 첫 가을", season: "가을", weeks: 13 },
      { label: "방사 후 첫 겨울", season: "겨울", weeks: 13 },
      { label: "방사 후 첫 봄", season: "봄", weeks: 13 },
      { label: "방사 2년째", season: "한 해", weeks: 52 },
      { label: "방사 3년째", season: "한 해", weeks: 52 },
      { label: "방사 4년째", season: "한 해", weeks: 52 },
      { label: "방사 5년째", season: "한 해", weeks: 52 },
    ],
    stages: [
      { id: "captive", name: "복원 시설", fromTurn: 0, baseRisk: 0.005, desc: "사람이 돌보는 시설에서 자란다." },
      { id: "released", name: "갓 방사된 여우", fromTurn: 3, baseRisk: 0.01, desc: "목에 GPS를 달고 처음으로 산에 섰다. 방사 직후가 가장 위험하다." },
      { id: "established", name: "자리 잡은 여우", fromTurn: 8, baseRisk: 0.25, desc: "야생에서 한 해를 넘겼다." },
      { id: "veteran", name: "나이 든 여우", fromTurn: 10, baseRisk: 0.35, desc: "야생 여우로서는 이미 오래 살았다." },
    ],
    events: [
      {
        id: "facility", tag: "사람", turns: [0], weight: 1,
        text: "사육사가 철망 너머로 먹이를 넣어 준다. 형제들과 굴 모양 상자에서 잔다.",
        choices: [
          { label: "사육사가 오면 다가간다", risk: 0, health: 5, contrib: 0, result: "사람에게 익숙해지면 방사 대상에서 빠질 수도 있다. 방사 여우는 혼자 살 수 있는 개체만 고른다." },
          { label: "사람이 오면 상자에 숨는다", risk: 0, health: 0, contrib: 0, result: "사람을 경계하는 건 야생에서 좋은 습관이다." },
        ],
      },
      {
        id: "training", tag: "사람", turns: [1], weight: 1,
        text: "자연적응장. 넓은 울타리 안에서 살아 있는 먹이를 사냥하는 법을 배운다.",
        choices: [
          { label: "끈질기게 쫓아 사냥한다", risk: 0, health: 20, contrib: 0, result: "8개월 훈련 끝에 혼자 사냥할 수 있게 됐다." },
          { label: "던져 주는 먹이를 기다린다", risk: 0, health: -15, contrib: 0, result: "사냥이 서툴다. 산에서 버틸 수 있을까." },
        ],
      },
      {
        id: "gps", tag: "사람", turns: [2], weight: 1,
        text: "목에 GPS 목걸이가 채워졌다. 방사 뒤 2년 동안 위치가 기록된다.",
        choices: [
          { label: "목걸이를 긁어 본다", risk: 0, health: 0, contrib: 0, result: "곧 익숙해졌다. 직원들은 처음 몇 주 동안 24시간 위치를 지켜본다." },
          { label: "방사장 울타리 너머 냄새를 맡는다", risk: 0, health: 5, contrib: 0, result: "저 너머가 소백산이다." },
        ],
      },
      {
        id: "release", tag: "사람", turns: [3], weight: 1,
        text: "방사장 문이 열렸다. 사람이 밀어내지 않는다. 스스로 걸어 나가는 '연방사'다.",
        choices: [
          { label: "곧장 숲 깊이 달려간다", risk: 0.05, health: -5, contrib: 0,
            result: "첫날 밤을 산에서 보냈다. 방사 여우의 7.3%가 2주 안에 폐사하거나 회수됐다.",
            death: "방사 2주 만에 도로에서 차에 치였다." },
          { label: "방사장 근처에서 며칠 머문다", risk: 0.04, health: -10, contrib: 0,
            result: "주변을 천천히 익혔다.",
            death: "방사장 근처 마을로 내려왔다가 올무에 걸렸다." },
        ],
      },
      {
        id: "first_weeks", tag: "사람", turns: [4], weight: 1,
        text: "먹이를 찾아 점점 멀리 간다. 산 아래 논밭에는 들쥐가 많다.",
        choices: [
          { label: "논밭으로 내려간다", risk: 0.14, health: 10, contrib: 0,
            result: "들쥐를 실컷 잡았다. 방사 8주 안에 18.1%가 폐사하거나 회수됐다.",
            death: "농약 먹은 들쥐를 먹고 중독되었다." },
          { label: "산에서만 사냥한다", risk: 0.08, health: -10, contrib: 0,
            result: "배는 덜 차지만 사람이 없다.",
            death: "산에서 먹이를 구하지 못해 쇠약해졌고, 구조돼 회수되었다." },
        ],
      },
    ].concat(sharedEvents.map((e) => Object.assign({}, e, { turns: [5, 6, 7, 8, 9, 10, 11] }))),
  });

  window.ANIMALS["fox.wild"] = makeFoxLife({
    name: "야생에서 태어난 여우",
    intro: "소백산 비탈의 굴에서 형제 넷과 함께 태어났다. 부모는 복원 시설에서 와서 방사된 여우다. 당신은 이 산에서 태어난 야생 여우다.",
    timeline: [
      { label: "굴에서 태어난 봄 (3~4월)", season: "봄", weeks: 4 },
      { label: "굴 밖으로 나온 새끼 시절", season: "봄", weeks: 8 },
      { label: "첫 여름, 사냥 배우기", season: "여름", weeks: 12 },
      { label: "가을, 부모 곁을 떠나다", season: "가을", weeks: 13 },
      { label: "첫 겨울", season: "겨울", weeks: 13 },
      { label: "두 번째 봄", season: "봄", weeks: 13 },
      { label: "2살 → 3살", season: "한 해", weeks: 52 },
      { label: "3살 → 4살", season: "한 해", weeks: 52 },
      { label: "4살 → 5살", season: "한 해", weeks: 52 },
      { label: "5살 → 6살", season: "한 해", weeks: 52 },
    ],
    stages: [
      { id: "cub", name: "새끼", fromTurn: 0, baseRisk: 0.05, desc: "굴 근처에서 부모가 날라 주는 먹이를 먹는다." },
      { id: "young", name: "어린 여우", fromTurn: 3, baseRisk: 0.05, desc: "부모 곁을 떠나 자기 땅을 찾는다." },
      { id: "adult", name: "어른 여우", fromTurn: 4, baseRisk: 0.05, desc: "자기 영역에서 짝을 찾는다." },
      { id: "established", name: "자리 잡은 여우", fromTurn: 6, baseRisk: 0.25, desc: "야생에서 두 해를 넘겼다." },
      { id: "veteran", name: "나이 든 여우", fromTurn: 8, baseRisk: 0.35, desc: "야생 여우로서는 이미 오래 살았다." },
    ],
    events: [
      {
        id: "den_birth", tag: "자연", turns: [0], weight: 1,
        text: "어두운 굴 안. 부모가 번갈아 먹이를 물어 온다.",
        choices: [
          { label: "형제들보다 먼저 먹이로 달려든다", risk: 0.06, health: 15, contrib: 0, result: "가장 통통한 새끼가 됐다.", death: "타고난 몸이 약했다." },
          { label: "형제들 틈에서 기다린다", risk: 0.1, health: -5, contrib: 0, result: "남은 먹이를 먹었다.", death: "먹이를 충분히 먹지 못해 약해져 죽었다." },
        ],
      },
      {
        id: "den_play", tag: "자연", turns: [1], weight: 1,
        text: "굴 밖으로 나왔다. 형제들과 뒹굴며 노는 게 곧 사냥 연습이다.",
        choices: [
          { label: "굴에서 멀리까지 나가 본다", risk: 0.1, health: 5, contrib: 0, result: "새로운 냄새가 가득하다.", death: "굴 밖에서 맹금류에게 채여 갔다." },
          { label: "굴 입구 근처에서만 논다", risk: 0.04, health: 0, contrib: 0, result: "부모가 지켜보는 곳이 안전하다.", death: "병에 걸려 죽었다." },
        ],
      },
      {
        id: "learn_hunt", tag: "자연", turns: [2], weight: 1,
        text: "부모를 따라 들쥐 사냥을 배운다.",
        choices: [
          { label: "혼자 메뚜기를 쫓는다", risk: 0.03, health: 10, contrib: 0, result: "첫 사냥에 성공했다.", death: "사냥을 나갔다가 길을 잃었다." },
          { label: "부모가 잡은 먹이를 기다린다", risk: 0.02, health: 0, contrib: 0, result: "아직은 부모가 있다. 가을이 오기 전까지는.", death: "병에 걸려 죽었다." },
        ],
      },
      {
        id: "dispersal", tag: "자연", turns: [3], weight: 1,
        text: "가을, 부모 곁을 떠날 때다. 여우는 태어난 곳에서 10km, 멀게는 수백 km까지 떠나 자기 땅을 찾는다.",
        choices: [
          { label: "산맥을 따라 멀리 떠난다", risk: 0.15, health: -10, contrib: 0,
            result: "소백산을 벗어나 새 골짜기에 닿았다. 새로운 곳에 여우가 자리 잡는 건 복원의 큰 목표다.",
            death: "새 땅을 찾아 가다 도로에서 차에 치였다." },
          { label: "가까운 골짜기에 자리 잡는다", risk: 0.08, health: 0, contrib: 0,
            result: "부모의 영역 가까이에 자리를 잡았다.",
            death: "다른 여우와의 영역 다툼에서 다쳤다." },
        ],
      },
    ].concat(sharedEvents),
  });
})();
