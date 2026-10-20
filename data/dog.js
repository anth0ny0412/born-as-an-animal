// 강아지의 삶: 어디서 태어났는지(출신)를 먼저 뽑고, 가족·보호소·떠돌이 상태를 오가며 산다
// 보호소에 들어가면 그 뒤는 선택과 상관없이 실제 통계 비율로 정해진다
// (동물자유연대 2023 유실·유기동물 분석, 국가동물보호정보시스템 자료 기반)
window.ANIMALS = window.ANIMALS || {};

(function () {
  const HOME = { shelter: false, stray: false };
  const HOME_HOUSE = { shelter: false, stray: false, yard: false };
  const HOME_YARD = { shelter: false, stray: false, yard: true };
  const GROWN = ["adult", "senior", "old"];

  // 보호소 처리 결과 (2023, 동물자유연대 분석). 네 결과를 뺀 나머지는 '계속 보호 중'
  // 1살 미만은 자연사 42.4%(개·고양이 합산)를 쓰고 나머지 결과를 같은 비율로 줄임
  // noOwner: 들개처럼 찾으러 올 주인이 없으면 '반환'을 빼고 나머지 비율로 나눔
  function shelterOutcomes(purebred, puppy, noOwner) {
    const s = purebred
      ? { ret: 45.0, adopt: 33.7, nat: 6.6, euth: 7.1 }
      : { ret: 8.9, adopt: 23.1, nat: 23.6, euth: 34.6 };
    s.stay = 100 - s.ret - s.adopt - s.nat - s.euth;
    if (noOwner) s.ret = 0;
    if (puppy) {
      const k = (100 - 42.4) / (100 - s.nat);
      for (const key of ["ret", "adopt", "euth", "stay"]) s[key] *= k;
      s.nat = 42.4;
    }
    const kind = purebred ? "품종견" : "믹스견";
    const note = ` (보호소에 들어온 ${kind}${puppy ? ", 1살 미만" : ""}의 실제 통계로 정해진 결과예요)`;
    // 확률이 0인 결과(들개의 '반환')는 목록에서 뺌
    return [
      { p: s.ret, result: "주인이 공고를 보고 찾아왔다. 집으로 돌아간다." + note, setFlags: { shelter: false } },
      { p: s.adopt, result: "낯선 가족이 당신 앞에 멈춰 섰다. 입양이다. 새 이름이 생겼다." + note,
        setFlags: { shelter: false, stray: false, yard: false, adopted: true } },
      { p: s.nat, death: "보호소에서 병이 들어 숨을 거뒀다." + note },
      { p: s.euth, death: "공고 기간이 지나도 찾아오는 사람이 없었다. 인도적 처리(안락사)되었다." + note },
      { p: s.stay, result: "아직 아무도 오지 않았다. 보호소에서 계속 기다린다." + note, health: -15 },
    ].filter((o) => o.p > 0);
  }

  function shelterEvents(purebred, noOwner) {
    const text = "보호소 철장 안. 유실·유기동물은 공고 후 10일이 지나도 주인이 나타나지 않으면 지자체가 소유권을 갖는다.";
    const choices = (puppy) => [
      { label: "철장 앞으로 나와 꼬리를 흔든다", outcomes: shelterOutcomes(purebred, puppy, noOwner) },
      { label: "구석에 웅크린다", outcomes: shelterOutcomes(purebred, puppy, noOwner) },
    ];
    return [
      { id: "shelter_puppy", tag: "사람", when: { shelter: true }, stages: ["puppy"], weight: 1, text, choices: choices(true) },
      { id: "shelter", tag: "사람", when: { shelter: true }, stages: GROWN, weight: 1, text, choices: choices(false) },
    ];
  }

  // 떠돌이 생활 (출신과 상관없이 공통)
  const strayEvents = [
    {
      id: "stray_food", tag: "사람", when: { stray: true }, weight: 2,
      text: "배가 고프다. 골목 음식물 쓰레기통에서 냄새가 난다.",
      choices: [
        { label: "쓰레기통을 뒤진다", risk: 0.05, health: 5, contrib: 0,
          result: "상한 음식 몇 조각으로 버텼다.", death: "상한 음식을 먹고 탈이 나 죽었다." },
        { label: "사람을 따라가 먹이를 기다린다", risk: 0.08, health: 10, contrib: 0,
          result: "한 사람이 사료를 놓고 갔다.", death: "사람을 따라가다 도로에서 차에 치였다." },
      ],
    },
    {
      id: "stray_trap", tag: "사람", when: { stray: true }, weight: 3,
      text: "공터에 철로 된 상자가 놓여 있다. 안에서 고기 냄새가 난다. 포획틀이다.",
      choices: [
        { label: "안으로 들어간다", outcomes: [
          { p: 1, result: "문이 철컥 닫혔다. 보호소로 옮겨진다.", setFlags: { stray: false, shelter: true } },
        ] },
        { label: "냄새만 맡고 돌아선다", risk: 0.12, health: -10, contrib: 0,
          result: "다시 길 위의 삶이다.", death: "굶주린 채 도로를 건너다 차에 치였다." },
      ],
    },
    {
      id: "stray_pack", tag: "사람", tagNote: "버려진 개", when: { stray: true }, weight: 1,
      text: "재개발로 비어 버린 동네에서 떠돌이 개 무리를 만났다. 다들 누군가의 개였다.",
      choices: [
        { label: "무리에 섞인다", risk: 0.1, health: 10, contrib: 0,
          result: "함께 있으면 덜 춥다.", death: "무리끼리의 싸움에서 크게 다쳤다." },
        { label: "혼자 다닌다", risk: 0.1, health: -10, contrib: 0,
          result: "혼자서 겨울을 버텼다.", death: "혼자 겨울을 넘기지 못했다." },
      ],
    },
  ];

  // 첫 해(생후 3~12개월) 공통
  const puppyYearEvents = [
    {
      id: "chew", tag: "사람", when: HOME_HOUSE, turns: [3], weight: 2,
      text: "혼자 남겨진 오후. 이가 간지럽다. 소파 다리가 눈에 들어온다.",
      choices: [
        { label: "물어뜯는다", outcomes: [
          { p: 97, result: "가족이 소파를 보고 크게 화를 냈다. 파양을 고민하는 이유 1위는 물건 훼손·짖음 같은 행동 문제다(29.4%)." },
          { p: 3, result: "며칠 뒤, 가족이 당신을 보호소에 맡겼다. '감당이 안 된다'고 했다.", setFlags: { shelter: true } },
        ] },
        { label: "장난감을 찾아 문다", risk: 0, health: 5, contrib: 0, result: "가족이 칭찬하며 간식을 주었다." },
      ],
    },
    {
      id: "vaccine", tag: "사람", when: HOME_HOUSE, turns: [3], weight: 1,
      text: "동물병원에 가는 날. 예방접종 주사를 맞는다.",
      choices: [
        { label: "얌전히 맞는다", risk: 0, health: 10, contrib: 0, result: "전염병을 막는 접종을 마쳤다. 동물등록도 했다." },
        { label: "몸부림친다", risk: 0, health: 5, contrib: 0, result: "간호사 셋이 붙잡고서야 맞았다." },
      ],
    },
    {
      id: "yard_life", tag: "사람", when: HOME_YARD, turns: [2, 3], weight: 1,
      text: "마당 개집 앞에 짧은 목줄이 매어졌다. 줄의 길이가 당신의 세상이다.",
      choices: [
        { label: "줄 끝까지 나가 지나가는 사람을 반긴다", risk: 0.02, health: 0, contrib: 0,
          result: "몇몇은 머리를 쓰다듬고 갔다.", death: "목줄에 엉켜 다쳤다가 낫지 못했다." },
        { label: "개집 안에 웅크린다", risk: 0.04, health: -5, contrib: 0,
          result: "비가 들이치는 밤이 길었다.", death: "추운 밤을 개집에서 넘기지 못했다." },
      ],
    },
  ];

  // 다 자란 뒤 공통 (집 안에서 사는 개)
  const houseEvents = [
    {
      id: "barking", tag: "사람", when: HOME_HOUSE, stages: GROWN, weight: 2,
      text: "혼자 있는 낮, 문밖 발소리마다 짖게 된다. 현관문에 이웃의 항의 쪽지가 붙었다.",
      choices: [
        { label: "불안해서 더 크게 짖는다", outcomes: [
          { p: 98, result: "가족이 훈련사를 알아보기 시작했다." },
          { p: 2, result: "가족이 지쳐 당신을 보호소에 맡겼다.", setFlags: { shelter: true } },
        ] },
        { label: "현관 앞에 엎드려 참는다", risk: 0, health: -5, contrib: 0, result: "긴 하루였다. 가족이 돌아오자 꼬리가 멈추지 않는다." },
      ],
    },
    {
      id: "moving", tag: "사람", when: HOME, stages: GROWN, weight: 2,
      text: "가족이 이사를 간다. 새 집은 반려동물을 키울 수 없는 곳이라고 한다.",
      choices: [
        { label: "짐 상자 사이를 졸졸 따라다닌다", outcomes: [
          { p: 92, result: "가족이 반려동물과 살 수 있는 집을 다시 구했다." },
          { p: 6, result: "새 집에 데려갈 수 없다며 보호소에 맡겨졌다. 이사·취업 같은 여건 변화는 파양 고민 이유 2위다(20.5%).", setFlags: { shelter: true } },
          { p: 2, result: "이삿날, 빈 집에 혼자 남겨졌다.", setFlags: { stray: true, yard: false } },
        ] },
        { label: "현관 앞에서 기다린다", outcomes: [
          { p: 92, result: "가족이 당신을 차에 태웠다. 새 집으로 함께 간다." },
          { p: 6, result: "보호소에 맡겨졌다. 가족은 돌아오지 않았다.", setFlags: { shelter: true } },
          { p: 2, result: "가족의 차가 떠났다. 당신은 타지 못했다.", setFlags: { stray: true, yard: false } },
        ] },
      ],
    },
    {
      id: "vet_bill", tag: "사람", when: HOME, stages: GROWN, weight: 2,
      text: "다리를 절기 시작했다. 수술비가 수백만 원이라고 한다.",
      choices: [
        { label: "아파도 꼬리를 흔든다", outcomes: [
          { p: 82, result: "가족이 적금을 깨서 수술을 시켜 주었다.", health: -10 },
          { p: 15, result: "수술 대신 진통제를 먹으며 지낸다.", health: -30 },
          { p: 3, result: "가족은 결국 당신을 포기했다. '예상보다 많은 지출'은 파양 고민 이유 3위다(18.9%).", setFlags: { shelter: true } },
        ] },
        { label: "구석에서 끙끙 앓는다", outcomes: [
          { p: 82, result: "가족이 당신을 안고 병원으로 달려갔다. 수술은 잘 끝났다.", health: -10 },
          { p: 15, result: "수술은 미뤄졌다. 다리가 계속 아프다.", health: -30 },
          { p: 3, result: "얼마 뒤, 가족이 당신을 보호소에 데려다 놓았다.", setFlags: { shelter: true } },
        ] },
      ],
    },
    {
      id: "walk_lost", tag: "사람", when: HOME_HOUSE, stages: GROWN, weight: 1,
      text: "산책길, 목줄 고리가 풀렸다. 저 앞에 고양이가 뛰어간다!",
      choices: [
        { label: "쫓아간다", outcomes: [
          { p: 88, result: "한참 뒤 가족이 숨을 헐떡이며 찾아왔다." },
          { p: 4, death: "고양이를 쫓아 도로로 뛰어들었다가 차에 치였다." },
          { p: 8, result: "길을 잃었다. 누군가 신고해 보호소로 옮겨졌다. 2024년 유실·유기동물로 신고·구조된 개는 7만 7천 마리가 넘는다.", setFlags: { shelter: true } },
        ] },
        { label: "그 자리에 멈춰 선다", risk: 0, health: 0, contrib: 0, result: "가족이 달려와 목줄을 다시 채웠다." },
      ],
    },
    {
      id: "trip", tag: "사람", when: HOME_HOUSE, stages: ["adult", "senior"], weight: 2,
      text: "가족이 당신을 데리고 처음으로 바다에 갔다.",
      choices: [
        { label: "파도를 쫓아 달린다", risk: 0, health: 10, contrib: 0, result: "온몸이 모래투성이가 됐다. 최고의 하루." },
        { label: "모래를 판다", risk: 0, health: 10, contrib: 0, result: "아무것도 나오지 않았지만 즐거웠다." },
      ],
    },
    {
      id: "heat", tag: "자연", when: HOME, stages: GROWN, weight: 1,
      text: "기록적인 폭염. 한낮의 공기가 뜨겁다.",
      choices: [
        { label: "시원한 바닥에 배를 깔고 눕는다", risk: 0.01, health: 0, contrib: 0, result: "더위를 버텼다.", death: "열사병으로 쓰러졌다." },
        { label: "그래도 산책을 조른다", risk: 0.04, health: -10, contrib: 0, result: "뜨거운 아스팔트에 발바닥이 데었다.", death: "산책 중 열사병으로 쓰러졌다." },
      ],
    },
  ];

  // 마당개로 사는 동안
  const yardEvents = [
    {
      id: "yard_winter", tag: "사람", when: HOME_YARD, stages: GROWN, weight: 2,
      text: "한겨울 마당. 물그릇이 얼었다. 개집 바닥에 깔린 건 낡은 담요 한 장이다.",
      choices: [
        { label: "개집 안에서 몸을 만다", risk: 0.04, health: -10, contrib: 0, result: "긴 겨울밤을 버텼다.", death: "한파에 개집에서 얼어 죽었다." },
        { label: "주인이 나올 때까지 낑낑 운다", risk: 0.02, health: -5, contrib: 0, result: "주인이 짚을 더 깔아 주었다.", death: "추위를 이기지 못했다." },
      ],
    },
    {
      id: "yard_escape", tag: "사람", when: HOME_YARD, stages: GROWN, weight: 2,
      text: "낡은 목줄이 끊어졌다. 대문이 열려 있다.",
      choices: [
        { label: "마을 밖까지 달려 나간다", outcomes: [
          { p: 65, result: "실컷 달린 뒤 저녁에 마당으로 돌아왔다." },
          { p: 20, result: "돌아갈 길을 잃었다. 아무도 찾으러 오지 않았다.", setFlags: { stray: true, yard: false } },
          { p: 15, death: "국도를 건너다 차에 치였다." },
        ] },
        { label: "개집 앞에 그대로 있는다", risk: 0, health: 0, contrib: 0, result: "주인이 새 목줄을 매었다." },
      ],
    },
    {
      id: "yard_puppies", tag: "사람", when: HOME_YARD, stages: GROWN, weight: 1,
      text: "마당의 다른 개가 또 새끼를 낳았다. 마당개는 중성화되지 않은 경우가 많다. 주인은 새끼들을 어떻게 할지 고민한다.",
      choices: [
        { label: "새끼들 곁을 지킨다", risk: 0, health: 0, contrib: 0, result: "새끼들 중 몇은 이웃에게, 몇은 어디론가 보내졌다. 보호소에 들어오는 동물의 절반 이상이 1살 미만이다." },
        { label: "모른 척한다", risk: 0, health: 0, contrib: 0, result: "몇 주 뒤, 새끼들이 사라졌다." },
      ],
    },
  ];

  // 노령기 공통
  const seniorEvents = [
    {
      id: "senior_body", tag: "자연", when: HOME, stages: ["senior", "old"], weight: 2,
      text: "계단을 오르기가 힘들다. 눈이 조금씩 뿌옇게 흐려진다.",
      choices: [
        { label: "그래도 산책길에 나선다", risk: 0.03, health: -5, contrib: 0, result: "천천히, 익숙한 길을 걸었다.", death: "산책 중 쓰러져 일어나지 못했다." },
        { label: "따뜻한 방석에서 쉰다", risk: 0.02, health: -10, contrib: 0, result: "하루 대부분을 잔다.", death: "잠든 채 깨어나지 못했다." },
      ],
    },
    {
      id: "senior_care", tag: "사람", when: HOME, stages: ["senior", "old"], weight: 2,
      text: "병원비가 늘었다. 매일 먹어야 하는 약이 생겼다.",
      choices: [
        { label: "가족 곁에 기대어 눕는다", outcomes: [
          { p: 92, result: "가족이 매일 약을 챙겨 준다.", health: 5 },
          { p: 5, result: "약값이 부담된다는 이야기가 오갔다.", health: -15 },
          { p: 3, result: "늙고 아픈 당신을 가족이 보호소에 맡겼다. 사람들이 유기동물 입양을 꺼리는 이유 1위는 '나이'다.", setFlags: { shelter: true } },
        ] },
        { label: "약을 뱉어 낸다", outcomes: [
          { p: 90, result: "가족이 약을 간식에 숨겨 주었다.", health: 0 },
          { p: 10, result: "약을 제대로 먹지 못했다.", health: -20 },
        ] },
      ],
    },
  ];

  function makeDogLife(opts) {
    return Object.assign({
      emoji: "🐕",
      peerLabel: "강아지",
      successLabel: "13살까지 산 강아지",
      endText: (state) => state.flags.shelter
        ? "열세 살. 보호소 철장 안에서 생을 마쳤다."
        : state.flags.stray
          ? "열세 살. 길 위에서 조용히 눈을 감았다."
          : "열세 해를 살았다. 가족 곁에서 무지개다리를 건넜다.",
      flagLabels: { feral: "산에서 자람", shelter: "보호소", stray: "떠돌이", yard: "마당개", adopted: "입양됨" },
      lifespan: {
        weeks: 676,
        label: "약 12.5~12.7년",
        note: "미국 반려견 1,300만 마리(2023)·영국 58만 마리 연구의 평균. 국내 전국 자료는 없음. 소형견이 대형견보다 오래 산다",
        verified: false,
      },
      timeline: [
        { label: "태어난 날", season: "0살", weeks: 1 },
        { label: "생후 1~2개월", season: "0살", weeks: 7 },
        { label: "생후 2~3개월", season: "0살", weeks: 4 },
        { label: "생후 3~12개월", season: "0살", weeks: 40 },
      ].concat(Array.from({ length: 12 }, (_, i) => ({ label: `${i + 1}살 → ${i + 2}살`, season: `${i + 1}살`, weeks: 52 }))),
      stages: [
        { id: "puppy", name: "강아지", fromTurn: 0, baseRisk: 0.01, desc: "모든 것이 처음이다." },
        { id: "adult", name: "어른 개", fromTurn: 4, baseRisk: 0.01, desc: "몸도 성격도 다 자랐다." },
        { id: "senior", name: "노령견", fromTurn: 10, baseRisk: 0.03, desc: "일곱 살이 넘었다. 몸이 조금씩 느려진다." },
        { id: "old", name: "나이 든 노령견", fromTurn: 13, baseRisk: 0.1, desc: "열 살이 넘었다. 하루하루가 소중하다." },
      ],
      backgroundDeaths: [
        { stages: ["puppy"], tag: "자연", text: "전염병에 걸려 죽었다." },
        { stages: ["adult"], tag: "자연", text: "갑작스러운 병으로 죽었다." },
        { stages: ["adult"], tag: "사람", text: "열린 대문으로 나갔다가 차에 치였다.", when: HOME },
        { stages: ["senior", "old"], tag: "자연", text: "나이 들어 생긴 병으로 무지개다리를 건넜다." },
        { stages: ["senior", "old"], tag: "자연", text: "심장병이 악화되어 숨을 거뒀다." },
        { stages: ["puppy", "adult", "senior", "old"], tag: "사람", text: "길을 건너다 차에 치였다.", when: { stray: true } },
      ],
      healthDeath: { tag: "자연", text: "몸이 너무 약해져 숨을 거뒀다." },
      action: "강아지를 맞을 땐 펫숍보다 보호소 입양을 먼저 생각해 주세요. 보호소에 들어온 개의 약 80%가 믹스견이고, 믹스견의 절반 넘게(58%)가 보호소에서 생을 마칩니다. 동물등록과 마당개 중성화도 버려지는 개를 줄이는 방법이에요.",
    }, opts);
  }

  window.DOG_ORIGINS = [
    {
      id: "petshop", name: "펫숍 출신 품종견", weight: 28.4, life: "dog.petshop",
      desc: "번식장에서 태어나 경매장을 거쳐 펫숍 진열장으로 가는 강아지.",
      popNote: "반려견을 맞은 경로 중 펫숍 구입 28.4% (2024 동물복지 국민의식조사)",
    },
    {
      id: "home", name: "가정에서 태어난 강아지", weight: 35.5, life: "dog.home",
      desc: "어느 집 거실에서 태어나 아는 사람에게 분양되는 강아지.",
      popNote: "지인에게 무료로 받은 경우 35.5% (2024, 반려동물 전체 기준)",
    },
    {
      id: "yard", name: "마당개의 새끼", weight: 36.1, life: "dog.yard",
      desc: "시골집 마당, 목줄에 묶인 어미에게서 태어난 믹스견.",
      popNote: "나머지 경로를 마당개 출신으로 가정 (직접 자료 없음, 확인 필요)",
    },
  ];

  window.ANIMALS["dog.petshop"] = makeDogLife({
    name: "펫숍 출신 강아지",
    purebred: true,
    startFlags: { yard: false },
    intro: "번식장의 좁은 철장 안에서 태어났다. 어미 개는 평생 이 철장에서 새끼를 낳는다. 당신은 몸값이 매겨질 품종견이다.",
    events: [
      {
        id: "breeding_cage", tag: "사람", turns: [0], when: HOME, weight: 1,
        text: "철장 바닥이 차갑다. 형제들이 서로 몸을 포갠다.",
        choices: [
          { label: "어미 품을 파고든다", risk: 0.03, health: 5, contrib: 0,
            result: "어미는 지쳐 보였다. 이번이 몇 번째 출산인지 아무도 모른다.", death: "태어난 지 며칠 만에 병으로 죽었다." },
          { label: "형제들 사이에 끼어 잔다", risk: 0.04, health: 0, contrib: 0,
            result: "따뜻했다.", death: "태어난 지 며칠 만에 기운을 잃었다." },
        ],
      },
      {
        id: "auction", tag: "사람", turns: [1], when: HOME, weight: 1,
        text: "생후 40일 무렵, 어미에게서 떼어져 상자에 담겼다. 경매장으로 간다.",
        choices: [
          { label: "낑낑 울며 어미를 부른다", risk: 0.05, health: -10, contrib: 0,
            result: "경매장에서 당신의 값이 매겨졌다. 번식장에서 10만~20만 원에 나간 강아지가 펫숍에서는 100만 원 넘게 팔리기도 한다.",
            death: "경매장을 오가다 전염병에 걸려 죽었다." },
          { label: "상자 구석에 웅크린다", risk: 0.05, health: -5, contrib: 0,
            result: "트럭이 몇 시간을 달렸다.", death: "이동 중에 병이 퍼져 죽었다." },
        ],
      },
      {
        id: "showcase", tag: "사람", turns: [2], when: HOME, weight: 1,
        text: "펫숍 유리 진열장. 사람들이 유리를 톡톡 두드린다.",
        choices: [
          { label: "꼬리를 흔들며 유리에 붙는다", risk: 0.02, health: 0, contrib: 0,
            result: "한 가족이 당신을 골랐다. 카드 결제가 끝나자 당신은 그 집의 막내가 됐다.", death: "진열장에서 병이 들었다." },
          { label: "구석에서 잠만 잔다", risk: 0.05, health: -5, contrib: 0,
            result: "며칠 뒤, 한 가족이 당신을 데려갔다.", death: "팔리기 전에 진열장에서 병이 들었다." },
        ],
      },
    ].concat(puppyYearEvents, houseEvents, seniorEvents, shelterEvents(true), strayEvents),
  });

  window.ANIMALS["dog.home"] = makeDogLife({
    name: "가정에서 태어난 강아지",
    purebred: true,
    startFlags: { yard: false },
    intro: "어느 집 거실 한쪽, 담요 위에서 태어났다. 어미 개가 따뜻한 혀로 당신을 핥는다.",
    events: [
      {
        id: "home_birth", tag: "자연", turns: [0], when: HOME, weight: 1,
        text: "눈도 뜨지 못했지만 어미의 젖 냄새는 안다.",
        choices: [
          { label: "젖을 힘껏 빤다", risk: 0.02, health: 10, contrib: 0, result: "배가 부르다.", death: "태어날 때부터 몸이 약했다." },
          { label: "형제들 틈에서 잠든다", risk: 0.02, health: 0, contrib: 0, result: "따뜻하다.", death: "태어날 때부터 몸이 약했다." },
        ],
      },
      {
        id: "litter_play", tag: "자연", turns: [1], when: HOME, weight: 1,
        text: "형제들과 뒹굴며 무는 힘을 조절하는 법을 배운다.",
        choices: [
          { label: "형제들과 실컷 논다", risk: 0, health: 10, contrib: 0, result: "어미와 형제에게서 개로 사는 법을 배웠다." },
          { label: "어미 곁에 꼭 붙어 있는다", risk: 0, health: 5, contrib: 0, result: "어미의 냄새를 오래 기억할 것이다." },
        ],
      },
      {
        id: "given_away", tag: "사람", turns: [2], when: HOME, weight: 1,
        text: "주인의 친구가 당신을 데려가기로 했다. 아는 사람에게 받는 '지인 분양'은 반려동물을 맞는 가장 흔한 방법이다.",
        choices: [
          { label: "새 주인 품에 안긴다", risk: 0, health: 0, contrib: 0, result: "낯선 집, 낯선 냄새. 하지만 손길이 다정하다." },
          { label: "어미 쪽을 돌아본다", risk: 0, health: -5, contrib: 0, result: "첫날 밤은 내내 낑낑 울었다." },
        ],
      },
    ].concat(puppyYearEvents, houseEvents, seniorEvents, shelterEvents(true), strayEvents),
  });

  window.ANIMALS["dog.yard"] = makeDogLife({
    name: "마당개의 새끼",
    purebred: false,
    startFlags: { yard: true },
    intro: "시골집 마당, 짧은 목줄에 묶인 어미 개의 개집 뒤에서 태어났다. 어미는 중성화되지 않았고, 해마다 새끼를 낳는다.",
    events: [
      {
        id: "yard_birth", tag: "사람", turns: [0], when: HOME, weight: 1,
        text: "개집 뒤 흙바닥. 밤이 되자 바람이 차다.",
        choices: [
          { label: "어미 품으로 파고든다", risk: 0.06, health: 0, contrib: 0, result: "어미의 체온으로 밤을 넘겼다.", death: "추운 밤을 넘기지 못했다." },
          { label: "형제들과 몸을 붙인다", risk: 0.05, health: 0, contrib: 0, result: "형제들 틈은 따뜻했다.", death: "추운 밤을 넘기지 못했다." },
        ],
      },
      {
        id: "yard_litter", tag: "사람", turns: [1], when: HOME, weight: 1,
        text: "형제가 여섯이다. 주인이 \"이걸 다 어떻게 키우냐\"고 한숨을 쉰다.",
        choices: [
          { label: "주인 발치에서 꼬리를 흔든다", outcomes: [
            { p: 40, result: "주인이 당신만은 남기기로 했다." },
            { p: 30, result: "이웃집에서 당신을 데려가기로 했다. 집 안에서 사는 개가 된다.", setFlags: { yard: false } },
            { p: 20, result: "상자에 담겨 보호소로 보내졌다.", setFlags: { shelter: true } },
            { p: 10, result: "마을 어귀에 버려졌다.", setFlags: { stray: true, yard: false } },
          ] },
          { label: "어미 뒤로 숨는다", outcomes: [
            { p: 40, result: "주인이 당신만은 남기기로 했다." },
            { p: 30, result: "이웃집에서 당신을 데려가기로 했다. 집 안에서 사는 개가 된다.", setFlags: { yard: false } },
            { p: 20, result: "상자에 담겨 보호소로 보내졌다.", setFlags: { shelter: true } },
            { p: 10, result: "마을 어귀에 버려졌다.", setFlags: { stray: true, yard: false } },
          ] },
        ],
      },
      {
        id: "new_home", tag: "사람", turns: [2], when: HOME_HOUSE, weight: 1,
        text: "새 집에 왔다. 마당이 아니라 방 안에 내 자리가 생겼다.",
        choices: [
          { label: "방 안 구석구석 냄새를 맡는다", risk: 0, health: 5, contrib: 0, result: "여기가 이제 내 집이다." },
          { label: "이불 속에 숨는다", risk: 0, health: 0, contrib: 0, result: "가족이 이불째 안아 주었다." },
        ],
      },
    ].concat(puppyYearEvents, houseEvents, yardEvents, seniorEvents, shelterEvents(false), strayEvents),
  });

  // 들개: 버려진 개가 산에서 낳은 새끼. 법적으로는 유기견이라 잡히면 보호소로 간다
  // (서울시 관악산·북한산 들개 마취 포획, 헤럴드경제 2026)
  const FERAL = { stray: true, feral: true };
  // 떠돌이 공통 사건(포획틀 등)은 생후 2개월부터만 나오게 함
  const LATER = Array.from({ length: 14 }, (_, i) => i + 2);
  const feralStrayEvents = strayEvents.map((e) => Object.assign({}, e, { turns: LATER }));
  window.ANIMALS["dog.feral"] = makeDogLife({
    name: "들개의 새끼",
    purebred: false,
    startFlags: { stray: true, feral: true, yard: false },
    intro: "도시 가까운 산 중턱, 바위 틈에서 태어났다. 어미도 이 산에서 태어났다. 어미의 어미는 누군가의 반려견이었다고 한다. 당신은 사람의 손을 한 번도 타 보지 않았다.",
    events: [
      {
        id: "feral_birth", tag: "사람", tagNote: "버려진 개", turns: [0], when: FERAL, weight: 1,
        text: "바위 틈 굴 안. 밖에서 등산객들의 말소리가 들린다.",
        choices: [
          { label: "어미 품으로 파고든다", risk: 0.06, health: 0, contrib: 0, result: "어미의 체온으로 밤을 넘겼다.", death: "산의 추운 밤을 넘기지 못했다." },
          { label: "형제들과 몸을 붙인다", risk: 0.06, health: 0, contrib: 0, result: "형제들 틈은 따뜻했다.", death: "산의 추운 밤을 넘기지 못했다." },
        ],
      },
      {
        id: "feral_den", tag: "사람", turns: [1], when: FERAL, weight: 1,
        text: "어미가 등산로 쓰레기통에서 먹다 남은 김밥을 물어 온다.",
        choices: [
          { label: "허겁지겁 먹는다", risk: 0.04, health: 10, contrib: 0, result: "배가 부르다. 사람 냄새가 나는 먹이다.", death: "상한 음식을 먹고 탈이 났다." },
          { label: "어미를 따라 굴 밖으로 나가 본다", risk: 0.06, health: 5, contrib: 0, result: "산이 넓다. 저 아래로 아파트 불빛이 보인다.", death: "굴 밖에서 길을 잃었다." },
        ],
      },
      {
        id: "feral_hiker", tag: "사람", turns: [2, 3], when: FERAL, weight: 1,
        text: "등산객이 쪼그려 앉아 손을 내민다. \"이리 와, 괜찮아.\"",
        choices: [
          { label: "조심조심 다가간다", outcomes: [
            { p: 60, result: "손에서 소시지를 받아먹고 달아났다." },
            { p: 40, result: "등산객이 신고했다. 구조대가 와서 당신을 상자에 담았다. 보호소로 간다.", setFlags: { stray: false, shelter: true } },
          ] },
          { label: "바위 뒤로 숨는다", risk: 0.02, health: -5, contrib: 0, result: "사람은 한참 기다리다 떠났다.", death: "숨어 있다가 굶주림에 지쳤다." },
        ],
      },
      {
        id: "feral_capture", tag: "사람", when: FERAL, stages: GROWN, weight: 2,
        text: "등산로 옆 덤불에 사람들이 숨어 있다. 한 사람이 마취총을 들고 있다. 서울시는 2022년부터 수의사가 동행하는 마취 포획으로 들개를 잡는다.",
        choices: [
          { label: "산 위로 달아난다", outcomes: [
            { p: 65, result: "능선 너머로 따돌렸다." },
            { p: 35, result: "등에 따끔한 것이 꽂혔다. 눈을 떠 보니 보호소 철장이다.", setFlags: { stray: false, shelter: true } },
          ] },
          { label: "그 자리에 얼어붙는다", outcomes: [
            { p: 20, result: "사람들이 다른 개를 쫓아갔다." },
            { p: 80, result: "마취총에 맞았다. 들개는 법적으로 유기견이라, 잡히면 보호소에서 공고를 거쳐 입양을 기다린다.", setFlags: { stray: false, shelter: true } },
          ] },
        ],
      },
      {
        id: "feral_smart_trap", tag: "사람", when: FERAL, stages: GROWN, weight: 1,
        text: "늘 피해 다니던 철망 상자 옆에 새 상자가 생겼다. 위에 카메라가 달려 있다. 원격으로 문을 닫는 '스마트 포획틀'이다.",
        choices: [
          { label: "안의 고기를 노린다", outcomes: [
            { p: 85, result: "문이 소리 없이 닫혔다. 보호소로 옮겨진다.", setFlags: { stray: false, shelter: true } },
            { p: 15, result: "문이 닫히기 직전에 빠져나왔다." },
          ] },
          { label: "멀리 돌아간다", risk: 0.03, health: -10, contrib: 0, result: "배는 고프지만 자유롭다.", death: "굶주린 채 겨울을 맞았다." },
        ],
      },
      {
        id: "feral_deer", tag: "사람", tagNote: "버려진 개", when: FERAL, stages: GROWN, weight: 2,
        text: "무리가 어린 고라니 한 마리를 골짜기로 몰고 있다.",
        choices: [
          { label: "함께 쫓는다", risk: 0.06, health: 15, contrib: 0,
            result: "오랜만에 배를 채웠다. 산에서 고라니를 쫓는 개 무리는 사람이 버린 개들의 후손이다.",
            death: "고라니를 쫓다 바위에서 떨어졌다." },
          { label: "멀리서 지켜본다", risk: 0.02, health: -10, contrib: 0, result: "무리가 남긴 것을 조금 얻었다.", death: "굶주림에 지쳐 쓰러졌다." },
        ],
      },
      {
        id: "feral_winter", tag: "자연", when: FERAL, stages: GROWN, weight: 2,
        text: "산의 겨울. 등산객이 줄어 쓰레기통도 비었다.",
        choices: [
          { label: "무리와 굴에서 몸을 붙인다", risk: 0.05, health: -10, contrib: 0, result: "함께라서 버텼다.", death: "겨울을 넘기지 못했다." },
          { label: "아파트 단지까지 내려간다", risk: 0.1, health: 5, contrib: 0, result: "음식물 쓰레기를 찾았다.", death: "단지 앞 도로에서 차에 치였다." },
        ],
      },
      {
        id: "feral_first_home", tag: "사람", turns: [2, 3], when: HOME_HOUSE, weight: 1,
        text: "처음으로 집 안에서 잔다. 바닥이 미끄럽고, 사람 손이 아직 무섭다.",
        choices: [
          { label: "가족이 내민 손 냄새를 맡아 본다", risk: 0, health: 5, contrib: 0, result: "며칠이 지나자 이름을 부르면 고개를 돌리게 됐다." },
          { label: "식탁 밑에 숨는다", risk: 0, health: 0, contrib: 0, result: "가족은 서두르지 않고 기다려 주었다." },
        ],
      },
    ].concat(puppyYearEvents, houseEvents, seniorEvents, shelterEvents(false, true), feralStrayEvents),
  });

  window.DOG_ORIGINS.push({
    id: "feral", name: "들개의 새끼", weight: 1, life: "dog.feral",
    desc: "버려진 개들이 산에서 낳은 새끼. 사람의 손을 타 본 적이 없다.",
    popNote: "들개 수는 서울시도 정확히 모름. 반려견 출신 대비 약 1%로 가정 (확인 필요)",
  });
})();
