// 멸종위기종 확장: 따오기(복원·방사), 장수하늘소(광릉숲), 붉은박쥐(동굴·폐광), 수원청개구리(논)
// 개체 수가 아주 적어 현실 모드에서는 드물게 나옴
window.ANIMALS = window.ANIMALS || {};

(function () {
  const yearly = (from, to) => Array.from({ length: to - from }, (_, i) => ({ label: `${from + i}살 → ${from + i + 1}살`, season: "한 해", weeks: 52 }));

  // ---------- 따오기 ----------
  // 1979년 판문점 인근 관찰을 마지막으로 국내에서 사라짐 → 2008년 중국에서 한 쌍을 들여와 우포에서 복원
  // 2019년부터 방사, 2025년 5월까지 누적 355마리 방사. 2022년 누적 160마리 중 103마리 생존(64.3%)
  // 2026년 우포늪 인근에서 야생 2세대 부부의 새끼 부화 보도
  window.ANIMALS.ibis = {
    id: "ibis",
    name: "따오기",
    emoji: "🦩",
    peerLabel: "같은 해 태어난 따오기",
    successLabel: "다섯 살까지 산 따오기",
    intro: "경남 창녕 우포따오기복원센터의 부화기에서 깨어났다. 따오기는 1979년 이후 한국 하늘에서 사라졌다가, 2008년 중국에서 온 한 쌍으로 다시 시작됐다. 당신은 그 한 쌍의 자손이다.",
    endText: "다섯 해를 살았다. 방사된 따오기가 야생에서 짝을 짓고, 그 새끼가 다시 짝을 지어 새끼를 낳기 시작했다. 당신도 그 숫자 중 하나다.",
    lifespan: { weeks: 1040, label: "약 20년", note: "따오기는 사육 환경에서 20년 가까이 사는 것으로 알려짐 (확인 필요)", verified: false },
    timeline: [
      { label: "봄, 복원센터 부화기에서 깨어남", season: "봄", weeks: 8 },
      { label: "여름, 야생 적응 훈련장", season: "여름", weeks: 13 },
      { label: "가을~겨울, 센터에서 나는 첫 겨울", season: "겨울", weeks: 31 },
      { label: "봄, 우포늪으로 방사되는 날", season: "봄", weeks: 13 },
      { label: "첫 야생 여름", season: "여름", weeks: 13 },
      { label: "첫 야생 겨울", season: "겨울", weeks: 26 },
    ].concat(yearly(2, 5)),
    stages: [
      { id: "chick", name: "새끼 따오기", fromTurn: 0, baseRisk: 0.02, desc: "사육사가 핀셋으로 먹이를 준다." },
      { id: "center", name: "어린 따오기", fromTurn: 1, baseRisk: 0.01, desc: "넓은 훈련장에서 미꾸라지 잡는 법을 배운다." },
      { id: "wild", name: "야생 따오기", fromTurn: 3, baseRisk: 0.06, desc: "등에 위치추적기를 메고 우포늪과 논을 날아다닌다." },
    ],
    backgroundDeaths: [
      { stages: ["chick", "center"], tag: "자연", text: "병에 걸려 죽었다." },
      { stages: ["wild"], tag: "자연", text: "밤에 삵에게 잡혔다." },
      { stages: ["wild"], tag: "자연", text: "수리부엉이에게 잡혔다." },
      { stages: ["wild"], tag: "사람", text: "날다가 전깃줄에 부딪혔다." },
    ],
    healthDeath: { tag: "자연", text: "먹이를 찾지 못해 쇠약해졌다." },
    events: [
      {
        id: "keeper", tag: "사람", turns: [0], weight: 1,
        text: "사육사가 따오기 탈을 쓴 손으로 먹이를 준다. 사람 얼굴에 익숙해지면 야생에서 살기 어렵기 때문이다.",
        choices: [
          { label: "부리를 벌리고 먹이를 받아먹는다", risk: 0.01, health: 10, contrib: 0, result: "무럭무럭 자란다.", death: "먹이를 잘못 삼켜 숨이 막혔다." },
          { label: "형제와 먹이를 다툰다", risk: 0.02, health: 5, contrib: 0, result: "몸집이 형제보다 커졌다.", death: "다툼 끝에 둥지에서 떨어졌다." },
        ],
      },
      {
        id: "training", tag: "사람", turns: [1, 2], weight: 1,
        text: "논을 꼭 닮게 만든 훈련장. 물속에 미꾸라지가 숨어 있다. 사람 소리가 나면 숨는 훈련도 한다.",
        choices: [
          { label: "미꾸라지 사냥을 연습한다", risk: 0.01, health: 10, contrib: 0, result: "부리 끝으로 진흙 속 미꾸라지를 찾아냈다.", death: "훈련장 그물에 걸려 다쳤다." },
          { label: "날기 연습을 한다", risk: 0.01, health: 5, contrib: 0, result: "높은 횃대까지 날아올랐다.", death: "그물벽에 부딪혔다." },
        ],
      },
      {
        id: "release", tag: "사람", turns: [3], weight: 1,
        text: "방사장 문이 열렸다. 사람들이 멀리서 숨죽이고 지켜본다. 등에는 위치추적기가 달려 있다.",
        choices: [
          { label: "곧장 우포늪 쪽으로 날아간다", risk: 0.04, health: 0, contrib: 0, result: "갈대숲에 내려앉았다. 처음 보는 넓은 하늘이다.", death: "처음 날아 본 바깥에서 길을 잃고 쓰러졌다." },
          { label: "방사장 근처에 며칠 머문다", risk: 0.01, health: -5, contrib: 0, result: "센터가 놓아 준 먹이터에서 조금씩 멀어지는 법을 배웠다.", death: "방사장 근처에서 삵에게 잡혔다." },
        ],
      },
      {
        id: "paddy", tag: "사람", stages: ["wild"], seasons: ["봄", "여름", "한 해"], weight: 3,
        text: "논에 내려앉아 먹이를 찾는다. 따오기는 논과 습지에 사는 새라, 논이 살아 있어야 살 수 있다.",
        choices: [
          { label: "농약을 덜 쓰는 논으로 간다", risk: 0.01, health: 15, contrib: 0, result: "우렁이와 미꾸라지가 가득하다. 창녕에서는 따오기를 위해 친환경 농사를 짓는 논이 늘고 있다.", death: "논두렁에서 들개에게 쫓겼다." },
          { label: "가까운 일반 논에 간다", risk: 0.05, health: 5, contrib: 0, result: "먹이가 적었다.", death: "농약이 묻은 먹이를 먹고 중독되었다." },
        ],
      },
      {
        id: "winter", tag: "자연", stages: ["wild"], seasons: ["겨울", "한 해"], weight: 2,
        text: "논물이 얼었다. 먹이가 줄었다.",
        choices: [
          { label: "우포늪 가장자리 얼지 않은 물을 찾는다", risk: 0.03, health: -5, contrib: 0, result: "겨울을 버텼다.", death: "추위와 굶주림에 쓰러졌다." },
          { label: "멀리 남쪽 논까지 날아간다", outcomes: [
            { p: 75, result: "남쪽에서 먹이를 찾았다. 위치추적기 덕분에 사람들이 따오기가 어디까지 가는지 알게 됐다.", health: 5 },
            { p: 25, death: "먼 길에서 돌아오지 못했다." },
          ] },
        ],
      },
      {
        id: "camera", tag: "사람", stages: ["wild"], weight: 1,
        text: "희귀한 새라는 소문에 사진가들이 몰려왔다. 커다란 렌즈가 가까이 다가온다.",
        choices: [
          { label: "날아올라 멀리 피한다", risk: 0.02, health: -10, contrib: 0, result: "먹이터를 잃었다.", death: "급히 날다 전깃줄에 부딪혔다." },
          { label: "갈대 뒤에 숨는다", risk: 0.01, health: -5, contrib: 0, result: "사람들이 물러날 때까지 기다렸다.", death: "숨어 있던 갈대숲에서 삵에게 잡혔다." },
        ],
      },
      {
        id: "breeding", tag: "자연", stages: ["wild"], seasons: ["한 해"], weight: 2,
        text: "봄, 짝과 함께 높은 나무 위에 둥지를 틀었다. 야생에서 태어난 따오기와 방사된 따오기가 짝을 이루기 시작했다.",
        choices: [
          { label: "번갈아 알을 품는다", risk: 0.01, health: -10, contrib: 0, result: "새끼가 깨어났다. 사람 손이 아닌 야생에서 태어난 따오기다.", death: "둥지를 지키다 수리부엉이에게 잡혔다." },
          { label: "먹이를 멀리서 구해 온다", risk: 0.04, health: -5, contrib: 0, result: "새끼가 배불리 먹었다.", death: "먹이를 구하다 전깃줄에 부딪혔다." },
        ],
      },
    ],
    action: "따오기는 논과 습지가 살아 있어야 살아요. 농약을 덜 쓴 쌀을 고르고, 따오기를 보면 멀리서 조용히 지켜봐 주세요.",
  };

  // ---------- 장수하늘소 ----------
  // 천연기념물, 멸종위기 1급. 국내에서는 광릉숲에서만 서식 확인
  // 2006년 암컷 1마리 이후 8년 만인 2014년 수컷 1마리 발견, 2017년까지 해마다 1마리씩 발견
  // 국립수목원이 인공 사육(약 500마리), 2018년부터 광릉숲에 방사 (2025년 15마리)
  // 알에서 어른벌레까지 5~6년, 어른벌레는 한 달쯤 삶
  window.ANIMALS.longhorn = {
    id: "longhorn",
    name: "장수하늘소",
    emoji: "🪲",
    peerLabel: "같은 해 깨어난 애벌레",
    successLabel: "어른벌레가 되어 짝을 만난 장수하늘소",
    intro: "경기 포천 광릉숲, 늙은 서어나무 껍질 틈에 낳은 알에서 깨어났다. 장수하늘소는 2006년 이후 8년 동안 한 마리도 보이지 않았던 곤충이다. 이제 나무 속에서 5년을 보내야 한다.",
    endText: (s) => (s.flags.mated
      ? "나무 속에서 5년, 숲 위에서 한 달을 살았다. 짝을 만나 알을 남겼다. 광릉숲에서 장수하늘소를 다시 볼 수 있을지는 늙은 나무가 남아 있느냐에 달렸다."
      : "나무 속에서 5년, 숲 위에서 한 달을 살았다. 넓은 숲에서 끝내 짝을 만나지 못했다. 개체 수가 너무 적으면 짝을 찾는 것부터 어렵다."),
    lifespan: { weeks: 290, label: "5~6년", note: "알에서 어른벌레까지 5~6년, 어른벌레는 약 한 달 (국립수목원 보도)", verified: true },
    timeline: [
      { label: "여름, 나무껍질 틈의 알에서 깨어남", season: "여름", weeks: 8 },
      { label: "나무 속 1년째", season: "한 해", weeks: 52 },
      { label: "나무 속 2년째", season: "한 해", weeks: 52 },
      { label: "나무 속 3년째", season: "한 해", weeks: 52 },
      { label: "나무 속 4년째", season: "한 해", weeks: 52 },
      { label: "봄, 번데기 방", season: "봄", weeks: 6 },
      { label: "여름, 어른벌레가 되어 숲 위로", season: "여름", weeks: 2 },
      { label: "어른벌레의 남은 2주", season: "여름", weeks: 2 },
    ],
    stages: [
      { id: "larva", name: "애벌레", fromTurn: 0, baseRisk: 0.04, desc: "나무 속을 갉아 먹으며 굴을 판다." },
      { id: "pupa", name: "번데기", fromTurn: 5, baseRisk: 0.04, desc: "나무 속 방에서 몸을 바꾼다." },
      { id: "adult", name: "장수하늘소", fromTurn: 6, baseRisk: 0.03, desc: "몸길이 10cm가 넘는, 한국에서 가장 큰 딱정벌레다." },
    ],
    backgroundDeaths: [
      { stages: ["larva", "pupa"], tag: "자연", text: "딱따구리가 나무를 쪼아 꺼내 먹었다." },
      { stages: ["larva", "pupa"], tag: "자연", text: "나무 속에 곰팡이가 퍼졌다." },
      { stages: ["adult"], tag: "자연", text: "새에게 잡혔다." },
    ],
    healthDeath: { tag: "자연", text: "나무가 말라 먹을 것이 없어 굶었다." },
    events: [
      {
        id: "bark", tag: "자연", turns: [0], weight: 1,
        text: "알에서 깨어났다. 쌀알만 한 애벌레다. 나무 속으로 들어가야 한다.",
        choices: [
          { label: "껍질 틈으로 곧장 파고든다", risk: 0.05, health: 5, contrib: 0, result: "나무 속으로 들어갔다.", death: "파고들기 전에 개미에게 잡혔다." },
          { label: "더 부드러운 곳을 찾아 기어간다", risk: 0.08, health: 10, contrib: 0, result: "썩어 가는 부분을 찾았다. 갉기 쉽다.", death: "기어가다 새에게 잡혔다." },
        ],
      },
      {
        id: "chew", tag: "자연", stages: ["larva"], seasons: ["한 해"], weight: 3,
        text: "어둠 속에서 나무를 갉는다. 몸이 해마다 커진다. 다 자란 애벌레는 어른 손가락보다 굵다.",
        choices: [
          { label: "깊은 곳으로 굴을 판다", risk: 0.02, health: 5, contrib: 0, result: "딱따구리 부리가 닿지 않는 깊이까지 들어갔다.", death: "굴이 무너졌다." },
          { label: "껍질 가까이에서 부드러운 부분을 먹는다", risk: 0.06, health: 15, contrib: 0, result: "배불리 먹었다.", death: "딱따구리가 껍질을 쪼아 꺼내 먹었다." },
        ],
      },
      {
        id: "forestry", tag: "사람", stages: ["larva", "pupa"], weight: 1,
        text: "숲에 사람들이 들어왔다. 쓰러지거나 병든 나무를 베어 숲을 정리한다고 한다. 내가 사는 나무도 늙고 속이 비었다.",
        choices: [
          { label: "더 깊이 숨는다", outcomes: [
            { p: 70, result: "광릉숲은 보호구역이라 늙은 나무를 그대로 둔다. 장수하늘소에게는 늙고 죽어 가는 큰 나무가 집이다." },
            { p: 30, death: "살던 나무가 베어져 땔감으로 쪼개졌다. 늙은 큰 나무가 사라지면 장수하늘소도 사라진다." },
          ] },
          { label: "옆 나무로 굴을 이어 판다", risk: 0.1, health: -15, contrib: 0, result: "옆 나무로 옮겨 갔다.", death: "굴을 파다 힘이 다했다." },
        ],
      },
      {
        id: "pupa", tag: "자연", turns: [5], weight: 1,
        text: "나무 속에 둥근 방을 만들고 번데기가 되었다. 몸이 통째로 바뀐다.",
        choices: [
          { label: "방 입구를 톱밥으로 단단히 막는다", risk: 0.03, health: 5, contrib: 0, result: "안전하게 몸을 바꾸었다.", death: "방이 무너져 몸이 뒤틀렸다." },
          { label: "빨리 나갈 수 있게 입구를 얇게 둔다", risk: 0.07, health: 0, contrib: 0, result: "몸을 바꾸었다.", death: "얇은 입구로 개미가 들어왔다." },
        ],
      },
      {
        id: "collector", tag: "사람", turns: [6], weight: 1,
        text: "나무에서 나와 숲 위를 날았다. 그런데 숲길에 채집통을 든 사람이 있다. 희귀한 표본은 비싼 값에 팔린다.",
        choices: [
          { label: "높은 나무 꼭대기로 날아간다", risk: 0.05, health: -5, contrib: 0, result: "사람 손이 닿지 않는 곳으로 피했다. 천연기념물을 잡으면 처벌받는다.", death: "날다 지쳐 숲길에 떨어졌고, 채집통에 담겼다." },
          { label: "나무껍질에 붙어 가만히 있는다", outcomes: [
            { p: 60, result: "껍질 색과 비슷해 들키지 않았다." },
            { p: 40, death: "들켰다. 채집통에 담겨 숲을 떠났다." },
          ] },
        ],
      },
      {
        id: "mate", tag: "자연", turns: [7], weight: 2,
        text: "한 달뿐인 어른벌레의 시간. 넓은 광릉숲 어딘가에 짝이 있을까?",
        choices: [
          { label: "냄새를 따라 멀리 날아 본다", outcomes: [
            { p: 35, result: "늙은 서어나무 위에서 짝을 만났다. 알을 남겼다.", setFlags: { mated: true } },
            { p: 55, result: "아무리 날아도 짝이 없다. 숲이 너무 넓고 우리는 너무 적다.", health: -20 },
            { p: 10, death: "멀리 날다 새에게 잡혔다." },
          ] },
          { label: "태어난 나무 근처에서 기다린다", outcomes: [
            { p: 20, result: "근처에서 짝이 나타났다. 알을 남겼다.", setFlags: { mated: true } },
            { p: 80, result: "기다려도 아무도 오지 않았다.", health: -10 },
          ] },
        ],
      },
    ],
    action: "장수하늘소는 늙고 큰 나무에 기대어 살아요. 숲의 고목과 쓰러진 나무를 남겨 두는 일이 곤충을 지키는 일이에요. 희귀 곤충을 잡거나 사고팔지 마세요.",
  };

  // ---------- 붉은박쥐(황금박쥐) ----------
  // 멸종위기 1급, 천연기념물. 국내 개체 수 450~500마리 (2017 보도). 1999년 함평에서 162마리 발견
  // 동굴과 폐광에서 겨울잠. 겨울잠 중에 깨면 저장한 지방을 크게 씀
  window.ANIMALS.redbat = {
    id: "redbat",
    name: "붉은박쥐",
    emoji: "🦇",
    peerLabel: "같은 해 태어난 붉은박쥐",
    successLabel: "다섯 살까지 산 붉은박쥐",
    intro: "6월, 전남 함평의 한 동굴 천장에 거꾸로 매달린 어미 품에서 태어났다. 털이 황금빛이라 '황금박쥐'라고도 불린다. 국내에 500마리도 남지 않은 박쥐다.",
    endText: "다섯 해를 살았다. 겨울마다 동굴과 폐광에서 잠들고, 여름밤마다 모기와 나방을 잡았다. 한 마리가 하룻밤에 잡는 벌레는 수백 마리에 이른다고 한다.",
    lifespan: { weeks: 780, label: "10년 이상", note: "작은 박쥐류는 몸 크기에 비해 오래 사는 편 (확인 필요)", verified: false },
    timeline: [
      { label: "6월, 동굴에서 태어남", season: "여름", weeks: 4 },
      { label: "7~9월, 첫 비행과 첫 사냥", season: "여름", weeks: 13 },
      { label: "가을, 겨울잠 준비", season: "가을", weeks: 8 },
      { label: "첫 겨울잠 (10월~4월)", season: "겨울", weeks: 27 },
    ].concat(yearly(1, 5)),
    stages: [
      { id: "pup", name: "새끼 박쥐", fromTurn: 0, baseRisk: 0.04, desc: "어미 배에 매달려 젖을 먹는다." },
      { id: "young", name: "어린 붉은박쥐", fromTurn: 1, baseRisk: 0.04, desc: "밤마다 날며 사냥을 익힌다." },
      { id: "adult", name: "붉은박쥐", fromTurn: 4, baseRisk: 0.05, desc: "여름엔 숲에서, 겨울엔 동굴에서 산다." },
    ],
    backgroundDeaths: [
      { stages: ["pup"], tag: "자연", text: "어미 품에서 떨어졌다." },
      { stages: ["young", "adult"], tag: "자연", text: "올빼미에게 잡혔다." },
      { stages: ["young", "adult"], tag: "자연", text: "겨울잠 중에 지방이 바닥나 깨어나지 못했다." },
    ],
    healthDeath: { tag: "자연", text: "겨울잠 중에 지방이 바닥나 깨어나지 못했다." },
    events: [
      {
        id: "nursery", tag: "자연", turns: [0], weight: 1,
        text: "어미 배에 꼭 매달려 있다. 어미는 밤마다 나가 사냥하고 돌아온다.",
        choices: [
          { label: "어미에게 꼭 매달린다", risk: 0.02, health: 10, contrib: 0, result: "무럭무럭 자란다.", death: "어미가 날다 떨어뜨렸다." },
          { label: "동굴 벽에 혼자 매달려 기다린다", risk: 0.04, health: 5, contrib: 0, result: "어미가 돌아와 젖을 먹였다.", death: "벽에서 미끄러져 떨어졌다." },
        ],
      },
      {
        id: "hunt", tag: "사람", stages: ["young", "adult"], seasons: ["여름", "한 해"], weight: 3,
        text: "여름밤. 숲 가장자리와 논 위를 날며 벌레를 잡는다.",
        choices: [
          { label: "숲과 개울 위를 난다", risk: 0.02, health: 15, contrib: 0, result: "모기와 나방을 잔뜩 잡았다.", death: "올빼미에게 잡혔다." },
          { label: "벌레가 몰리는 가로등 근처로 간다", risk: 0.05, health: 10, contrib: 0, result: "배는 불렀지만 밝은 곳은 위험하다.", death: "밝은 불빛 아래에서 새에게 들켜 잡혔다." },
        ],
      },
      {
        id: "fatten", tag: "사람", stages: ["young", "adult"], seasons: ["가을", "한 해"], weight: 2,
        text: "겨울잠 전에 살을 찌워야 한다. 그런데 요즘 논에 벌레가 줄었다.",
        choices: [
          { label: "멀리 숲까지 날아가 사냥한다", risk: 0.03, health: 10, contrib: 0, result: "지방을 넉넉히 모았다.", death: "먼 길에서 돌아오지 못했다." },
          { label: "가까운 곳에서 조금씩 먹는다", risk: 0.01, health: -10, contrib: 0, result: "살이 덜 쪘다. 농약으로 벌레가 줄면 박쥐도 굶는다.", death: "먹이를 찾다 쓰러졌다." },
        ],
      },
      {
        id: "visitors", tag: "사람", stages: ["young", "adult"], seasons: ["겨울", "한 해"], weight: 3,
        text: "겨울잠 중이다. 그런데 동굴 안에 손전등 불빛과 사람 목소리가 들린다. 동굴 탐험객이다.",
        choices: [
          { label: "깨지 않고 버틴다", outcomes: [
            { p: 70, result: "사람들이 지나갔다. 겨울잠 중인 박쥐는 한 번 깰 때마다 며칠 치 지방을 쓴다.", health: -10 },
            { p: 30, result: "불빛에 깨어 버렸다. 아껴 둔 지방을 많이 썼다.", health: -30 },
          ] },
          { label: "더 깊은 틈으로 날아간다", risk: 0.03, health: -25, contrib: 0, result: "깊은 곳으로 옮겼지만 지방을 많이 썼다.", death: "한겨울 동굴 밖으로 잘못 날아 나가 얼어 죽었다." },
        ],
      },
      {
        id: "mine", tag: "사람", stages: ["adult"], seasons: ["한 해"], weight: 1,
        text: "겨울마다 잠들던 폐광 입구에 공사 차량이 왔다. 사고를 막으려고 폐광 입구를 막는다고 한다.",
        choices: [
          { label: "다른 동굴을 찾아 나선다", outcomes: [
            { p: 60, result: "멀리서 새 동굴을 찾았다. 폐광을 막을 때 박쥐가 드나들 틈을 남겨 두는 곳도 있다.", health: -15 },
            { p: 40, death: "겨울잠 잘 곳을 찾지 못한 채 추위가 왔다." },
          ] },
          { label: "남은 틈으로 드나든다", risk: 0.03, health: -5, contrib: 0, result: "박쥐 출입구가 남아 있었다.", death: "틈이 막혀 갇혔다." },
        ],
      },
    ],
    action: "겨울에는 동굴과 폐광에 들어가지 말아 주세요. 겨울잠 중인 박쥐는 한 번 깨면 목숨이 위험해요. 박쥐를 맨손으로 만지지 말고, 다친 박쥐는 야생동물구조센터에 알려 주세요.",
  };

  // ---------- 수원청개구리 ----------
  // 한국 고유종, 멸종위기 1급(2012). 2013년 국립생물자원관 전국 조사에서 265마리 확인 (파주·평택·음성 등)
  // 이름의 고향 수원에서는 거의 사라짐. 논이 줄어든 것이 주된 원인
  // 수컷은 모내기한 벼를 붙잡고 저음의 금속성 소리로 욺. 청개구리 합창이 클수록 논둑에서 먼 곳으로 밀려남
  window.ANIMALS.suwonfrog = {
    id: "suwonfrog",
    name: "수원청개구리",
    emoji: "🐸",
    peerLabel: "같은 논에서 깨어난 올챙이",
    successLabel: "세 살까지 산 수원청개구리",
    intro: "6월, 경기 평택의 모내기한 논에서 깨어났다. 이름은 수원에서 처음 발견돼 붙었지만, 수원에서는 거의 사라졌다. 세상에서 한국에만 사는 개구리다.",
    endText: "세 해를 살았다. 논이 남아 있는 한, 해마다 6월이면 벼 사이에서 낮고 쇳소리 같은 울음이 들릴 것이다.",
    lifespan: { weeks: 260, label: "약 5년", note: "청개구리류는 야생에서 몇 년을 사는 것으로 알려짐 (확인 필요)", verified: false },
    timeline: [
      { label: "6월, 논물 속 올챙이", season: "여름", weeks: 5 },
      { label: "7~9월, 논둑으로 올라온 새끼 개구리", season: "여름", weeks: 12 },
      { label: "첫 겨울잠", season: "겨울", weeks: 26 },
      { label: "첫 번식기, 모내기한 논", season: "봄", weeks: 9 },
    ].concat(yearly(1, 3)),
    stages: [
      { id: "tadpole", name: "올챙이", fromTurn: 0, baseRisk: 0.05, desc: "논물 속에서 물풀과 이끼를 먹는다." },
      { id: "froglet", name: "새끼 개구리", fromTurn: 1, baseRisk: 0.04, desc: "손톱보다 작다. 벼 잎 위에 붙어 지낸다." },
      { id: "adult", name: "수원청개구리", fromTurn: 3, baseRisk: 0.06, desc: "수컷은 벼를 붙잡고 노래한다." },
    ],
    backgroundDeaths: [
      { stages: ["tadpole"], tag: "자연", text: "물방개 애벌레에게 잡혔다." },
      { stages: ["tadpole"], tag: "사람", text: "논물을 빼는 날, 물이 말라 버렸다." },
      { stages: ["froglet", "adult"], tag: "자연", text: "백로에게 잡혔다." },
      { stages: ["froglet", "adult"], tag: "자연", text: "뱀에게 잡혔다." },
    ],
    healthDeath: { tag: "자연", text: "몸이 말라 쇠약해졌다." },
    events: [
      {
        id: "paddywater", tag: "사람", turns: [0], weight: 1,
        text: "모내기를 마친 논. 물이 따뜻하다. 그런데 논 주인이 곧 물을 뺄 거라고 한다. 벼 뿌리를 튼튼하게 하려는 '중간 물떼기'다.",
        choices: [
          { label: "논 가장자리 깊은 도랑으로 간다", risk: 0.04, health: 5, contrib: 0, result: "물이 남은 도랑에서 다리가 나왔다.", death: "도랑에서 미꾸라지에게 잡혔다." },
          { label: "벼 포기 사이에 남는다", outcomes: [
            { p: 60, result: "다리가 나오자마자 물이 빠졌다. 아슬아슬했다.", health: -10 },
            { p: 40, death: "다리가 나오기 전에 물이 빠져 말라 버렸다." },
          ] },
        ],
      },
      {
        id: "pesticide", tag: "사람", stages: ["froglet", "adult"], seasons: ["여름", "봄", "한 해"], weight: 2,
        text: "드론이 논 위를 날며 농약을 뿌린다.",
        choices: [
          { label: "논둑 풀숲으로 피한다", risk: 0.03, health: -5, contrib: 0, result: "풀숲에서 기다렸다.", death: "풀숲에서 뱀에게 잡혔다." },
          { label: "벼 잎 밑에 붙어 버틴다", risk: 0.08, health: -15, contrib: 0, result: "피부가 따끔거린다. 개구리는 피부로 숨을 쉬어 농약에 약하다.", death: "농약을 뒤집어쓰고 숨이 막혔다." },
        ],
      },
      {
        id: "hibernate", tag: "자연", stages: ["froglet", "adult"], seasons: ["겨울", "한 해"], weight: 2,
        text: "날이 추워진다. 겨울잠 잘 곳을 찾아야 한다.",
        choices: [
          { label: "논둑 흙 속으로 들어간다", risk: 0.04, health: 0, contrib: 0, result: "겨울을 났다.", death: "논둑을 시멘트로 다지는 공사에 묻혔다." },
          { label: "근처 숲 가장자리 낙엽 밑으로 간다", risk: 0.06, health: 5, contrib: 0, result: "포근한 낙엽 밑에서 겨울을 났다.", death: "숲으로 가다 농로에서 차에 치였다." },
        ],
      },
      {
        id: "development", tag: "사람", stages: ["froglet", "adult"], weight: 1,
        text: "논 옆에 측량 깃발이 꽂혔다. 이 논에 물류창고가 들어선다고 한다.",
        choices: [
          { label: "멀리 다른 논을 찾아 떠난다", outcomes: [
            { p: 55, result: "몇 날을 걸어 다른 논에 닿았다. 논이 줄면서 수원청개구리도 줄었다.", health: -20 },
            { p: 45, death: "다른 논을 찾다 말라 버렸다." },
          ] },
          { label: "남은 논 귀퉁이에 머문다", risk: 0.08, health: -5, contrib: 0, result: "아직 한 해는 버틸 수 있다.", death: "흙을 메우는 날 묻혔다." },
        ],
      },
      {
        id: "chorus", tag: "자연", stages: ["adult"], seasons: ["봄", "한 해"], weight: 2,
        text: "번식기의 밤. 수천 마리 청개구리의 합창이 논을 채운다. 비슷하게 생긴 청개구리가 훨씬 많다.",
        choices: [
          { label: "논 한가운데 벼를 붙잡고 운다", risk: 0.03, health: -5, contrib: 0, result: "청개구리 합창이 커질수록 수원청개구리는 논둑에서 먼 곳으로 밀려난다. 그래도 낮은 울음을 냈다.", death: "울다가 백로에게 들켰다." },
          { label: "합창이 잦아들 때까지 기다린다", risk: 0.01, health: 0, contrib: 0, result: "새벽녘 조용할 때 울었다.", death: "기다리다 뱀에게 잡혔다." },
        ],
      },
    ],
    action: "논은 쌀만 나는 곳이 아니라 개구리와 새의 집이에요. 우리 쌀을 먹고, 친환경 논을 응원하는 것이 수원청개구리를 지키는 일이에요.",
  };
})();
