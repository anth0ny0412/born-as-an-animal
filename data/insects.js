// 곤충 3차 확장: 식용 귀뚜라미(곤충 농장), 반딧불이(빛 공해), 말매미(도시 열섬)
window.ANIMALS = window.ANIMALS || {};

(function () {
  // ---------- 식용 귀뚜라미 ----------
  // 식용곤충(흰점박이꽃무지·갈색거저리·귀뚜라미) 생산 농가·법인 1,343곳, 판로 문제로 휴·폐업 많음 (서울신문 2025)
  window.ANIMALS.cricket = {
    id: "cricket",
    name: "식용 귀뚜라미",
    emoji: "🦗",
    unit: "일",
    peerLabel: "형제",
    successLabel: "자연 수명까지 산 귀뚜라미",
    intro: "곤충 농장의 플라스틱 사육 상자 안, 축축한 흙 속 알에서 깨어났다. 당신은 '미래 식량'으로 길러지는 쌍별귀뚜라미다. 한 상자에 수천 마리가 산다.",
    endText: "",
    lifespan: { weeks: 90, label: "약 2~3달", note: "쌍별귀뚜라미의 자연 수명과 농장 출하 시기는 확인 필요", verified: false },
    timeline: [
      { label: "알에서 깨어난 날", season: "1일째", weeks: 1 },
      { label: "약충 시절, 첫 탈피들", season: "~2주", weeks: 14 },
      { label: "더 자라는 약충", season: "~4주", weeks: 14 },
      { label: "마지막 탈피, 날개가 돋음", season: "~6주", weeks: 12 },
      { label: "출하 날", season: "약 6주", weeks: 1 },
    ],
    stages: [
      { id: "nymph", name: "약충", fromTurn: 0, baseRisk: 0.03, desc: "허물을 벗을 때마다 커진다." },
      { id: "adult", name: "성충", fromTurn: 3, baseRisk: 0.02, desc: "날개를 비벼 운다." },
    ],
    backgroundDeaths: [
      { stages: ["nymph"], tag: "사람", text: "밀집된 상자 안에서 병이 돌아 죽었다." },
      { stages: ["nymph"], tag: "자연", text: "허물을 벗다가 끼어 죽었다." },
      { stages: ["adult"], tag: "사람", text: "상자 안 습도가 맞지 않아 죽었다." },
    ],
    healthDeath: { tag: "사람", text: "먹이를 얻지 못해 기운을 잃었다." },
    events: [
      {
        id: "crowd", tag: "사람", turns: [0, 1], weight: 1,
        text: "달걀판을 쌓아 만든 은신처에 형제들이 빽빽하다. 허물을 벗는 동안은 몸이 물러서 다른 귀뚜라미에게 뜯기기 쉽다.",
        choices: [
          { label: "달걀판 깊숙이 숨어 허물을 벗는다", risk: 0.04, health: 5, contrib: 0, result: "무사히 한 단계 컸다.", death: "허물을 벗는 사이 다른 귀뚜라미에게 뜯겼다." },
          { label: "사료 그릇 옆에서 버틴다", risk: 0.06, health: 10, contrib: 0, result: "많이 먹었다.", death: "밀치다 깔렸다." },
        ],
      },
      {
        id: "temperature", tag: "사람", turns: [1, 2], weight: 1,
        text: "사육실 난방기가 고장 났다. 귀뚜라미는 따뜻해야 빨리 자란다.",
        choices: [
          { label: "형제들과 몸을 붙인다", risk: 0.05, health: -10, contrib: 0, result: "다음 날 난방이 돌아왔다.", death: "추위에 움직이지 않게 되었다." },
          { label: "흙 속으로 파고든다", risk: 0.04, health: -5, contrib: 0, result: "흙 속은 조금 따뜻했다.", death: "흙 속에서 깨어나지 못했다." },
        ],
      },
      {
        id: "farm_closing", tag: "사람", turns: [2, 3], weight: 1,
        text: "농장 주인의 한숨 소리가 들린다. '귀뚜라미가 안 팔린다'고 한다. 식용곤충 농가는 판로가 없어 문을 닫는 곳이 많다.",
        choices: [
          { label: "사료 그릇으로 간다", outcomes: [
            { p: 80, result: "그래도 사료는 계속 들어왔다." },
            { p: 20, death: "농장이 문을 닫으며 상자째 처분되었다. 한 지역에선 곤충 농가의 37.8%가 휴·폐업했다는 보도가 있다." },
          ] },
          { label: "상자 구석에서 운다", outcomes: [
            { p: 80, result: "아무도 듣지 않았다." },
            { p: 20, death: "농장이 문을 닫으며 상자째 처분되었다." },
          ] },
        ],
      },
      {
        id: "singing", tag: "자연", turns: [3], weight: 2,
        text: "마지막 허물을 벗자 날개가 생겼다. 날개를 비비면 소리가 난다.",
        choices: [
          { label: "밤새 날개를 비벼 운다", risk: 0.01, health: -5, contrib: 0, result: "상자 안이 귀뚜라미 소리로 가득하다. 귀뚜라미는 날개를 비벼 짝을 부른다.", death: "다른 수컷과 싸우다 다쳤다." },
          { label: "조용히 먹는다", risk: 0, health: 10, contrib: 0, result: "몸이 통통해졌다. 출하 무게다." },
        ],
      },
      {
        id: "harvest", tag: "사람", turns: [4], weight: 1,
        text: "상자가 통째로 들려 나간다. 차가운 곳으로 옮겨진다.",
        choices: [
          { label: "흙 속으로 숨는다", outcomes: [{ p: 1, death: "냉동 처리되어 말려진 뒤 가루가 되었다. 태어난 지 약 6주. 곤충이 고통을 느끼는지는 아직 연구가 진행 중이다." }] },
          { label: "더듬이를 흔든다", outcomes: [{ p: 1, death: "냉동 처리되어 식품 원료가 되었다. 한 상자에 수천 마리였다." }] },
        ],
      },
    ],
    action: "곤충은 적은 사료로 단백질을 얻을 수 있는 미래 식량으로 주목받아요. 동시에 곤충도 고통을 느낄 수 있다는 연구가 나오면서, 곤충 농장의 복지를 고민해야 한다는 목소리도 커지고 있어요.",
  };

  // ---------- 반딧불이 ----------
  // 빛으로 짝을 찾는데 가로등·차량 불빛이 위협. 서식지 수 감소, 남양주 대규모 서식지 골프장 개발 위기 보도
  window.ANIMALS.firefly = {
    id: "firefly",
    name: "애반딧불이",
    emoji: "✨",
    peerLabel: "애벌레",
    successLabel: "빛을 내며 짝을 만난 반딧불이",
    intro: "여름, 논두렁 옆 개울가 이끼 위 알에서 깨어났다. 애반딧불이의 애벌레는 물속에 살며 다슬기를 먹고 자란다. 빛을 내며 날 날은 열 달 뒤다.",
    endText: "어두운 밤, 짝을 만났다. 빛을 내며 나는 날은 고작 두 주 남짓이다. 개울가에 알을 낳았다.",
    lifespan: { weeks: 52, label: "약 1년 (성충은 2주 남짓)", note: "애반딧불이는 애벌레로 열 달 가까이 물속에서 지내고 성충은 짧게 산다고 알려져 있음 (확인 필요)", verified: false },
    timeline: [
      { label: "여름, 알에서 깨어남", season: "여름", weeks: 2 },
      { label: "물속 애벌레, 가을", season: "가을", weeks: 14 },
      { label: "물속 애벌레, 겨울", season: "겨울", weeks: 14 },
      { label: "봄, 뭍으로 올라 번데기", season: "봄", weeks: 18 },
      { label: "6월, 빛을 내며 날다", season: "여름", weeks: 2 },
    ],
    stages: [
      { id: "larva", name: "애벌레", fromTurn: 0, baseRisk: 0.08, desc: "물속에서 다슬기를 먹는다." },
      { id: "pupa", name: "번데기", fromTurn: 3, baseRisk: 0.05, desc: "흙 속에서 몸을 바꾼다." },
      { id: "adult", name: "반딧불이", fromTurn: 4, baseRisk: 0.03, desc: "배 끝에서 빛을 낸다." },
    ],
    backgroundDeaths: [
      { stages: ["larva"], tag: "자연", text: "물고기에게 잡아먹혔다." },
      { stages: ["pupa"], tag: "자연", text: "번데기 방에서 깨어나지 못했다." },
      { stages: ["adult"], tag: "자연", text: "거미줄에 걸렸다." },
    ],
    healthDeath: { tag: "자연", text: "먹이를 찾지 못해 기운을 잃었다." },
    events: [
      {
        id: "snails", tag: "사람", turns: [0, 1], weight: 1,
        text: "개울 바닥을 기어 다니며 다슬기를 찾는다. 그런데 상류 논에서 흘러든 물에서 낯선 냄새가 난다.",
        choices: [
          { label: "맑은 웅덩이를 찾아 옮겨 간다", risk: 0.06, health: 5, contrib: 0, result: "다슬기가 많은 곳을 찾았다. 반딧불이는 깨끗한 물에서만 살 수 있는 환경지표곤충이다.", death: "옮겨 가다 물고기에게 잡아먹혔다." },
          { label: "그 자리에서 다슬기를 먹는다", risk: 0.12, health: 10, contrib: 0, result: "배를 채웠다.", death: "농약이 섞인 물에 중독되었다." },
        ],
      },
      {
        id: "concrete", tag: "사람", turns: [1, 2], weight: 1,
        text: "개울 정비 공사가 시작됐다. 굽이진 흙 개울이 곧은 콘크리트 수로로 바뀐다.",
        choices: [
          { label: "공사 안 한 상류로 거슬러 올라간다", risk: 0.08, health: -10, contrib: 0, result: "아직 흙 개울이 남은 곳을 찾았다.", death: "거슬러 오르다 기운이 다했다." },
          { label: "돌 밑에 붙어 버틴다", outcomes: [
            { p: 80, result: "공사가 비켜 갔다." },
            { p: 20, death: "개울 바닥과 함께 퍼내졌다." },
          ] },
        ],
      },
      {
        id: "winter_water", tag: "자연", turns: [2], weight: 2,
        text: "겨울. 개울물이 차갑다. 돌 밑에서 거의 움직이지 않고 봄을 기다린다.",
        choices: [
          { label: "깊은 물웅덩이 돌 밑에 머문다", risk: 0.05, health: -5, contrib: 0, result: "얼지 않은 물속에서 겨울을 났다.", death: "물웅덩이가 얼어붙었다." },
          { label: "얕은 여울에 있는다", risk: 0.08, health: 0, contrib: 0, result: "다슬기를 조금씩 먹으며 버텼다.", death: "얕은 물이 얼어붙었다." },
        ],
      },
      {
        id: "landing", tag: "자연", turns: [3], weight: 1,
        text: "봄비 내리는 밤, 물 밖으로 기어 나와 흙 속에 번데기 방을 만든다. 애벌레도 희미하게 빛난다.",
        choices: [
          { label: "부드러운 흙둑을 찾는다", risk: 0.05, health: 0, contrib: 0, result: "번데기가 되었다.", death: "개구리에게 잡아먹혔다." },
          { label: "가까운 곳에 서둘러 판다", risk: 0.08, health: 5, contrib: 0, result: "번데기가 되었다.", death: "흙이 무너져 깔렸다." },
        ],
      },
      {
        id: "light_pollution", tag: "사람", tagNote: "빛 공해", turns: [4], weight: 2,
        text: "드디어 빛을 내며 난다. 짝도 빛으로 대답해야 하는데, 개울 건너 새로 생긴 가로등과 펜션 불빛이 너무 밝다.",
        choices: [
          { label: "어두운 숲 쪽으로 날아간다", outcomes: [
            { p: 70, result: "어둠 속에서 짝의 빛을 찾았다." },
            { p: 30, death: "짝을 찾지 못한 채 짧은 날들이 끝났다. 빛으로 대화하는 반딧불이에게 인공 불빛은 치명적이다." },
          ] },
          { label: "가로등 근처에서 빛을 낸다", outcomes: [
            { p: 25, result: "가로등 그늘에서 겨우 짝을 만났다." },
            { p: 75, death: "가로등 불빛에 신호가 묻혀 짝을 찾지 못했다." },
          ] },
        ],
      },
      {
        id: "festival", tag: "사람", turns: [4], weight: 1,
        text: "사람들이 손전등과 휴대폰을 들고 숲길에 몰려왔다. 반딧불이를 보러 온 사람들이다.",
        choices: [
          { label: "높은 나뭇가지로 피한다", outcomes: [
            { p: 70, result: "사람들이 불빛을 끄자 다시 빛을 냈다. 짝을 만났다." },
            { p: 30, death: "불빛 속에서 짝을 찾지 못했다." },
          ] },
          { label: "풀숲 낮은 곳에서 빛을 낸다", outcomes: [
            { p: 50, result: "누군가 손으로 잡았다가 놓아주었다. 짝을 만났다." },
            { p: 50, death: "아이가 병에 담아 집으로 가져갔다." },
          ] },
        ],
      },
    ],
    action: "반딧불이를 보러 갈 때는 손전등과 휴대폰 불빛을 끄고, 잡지 말고 눈으로만 봐 주세요. 밤에 불필요한 조명을 줄이는 것, 개울을 콘크리트로 덮지 않는 것이 반딧불이의 집을 지키는 일이에요.",
  };

  // ---------- 말매미 ----------
  // 서울 도심 말매미 밀도는 농촌의 약 10배 (국립생물자원관 인용 보도), 도시 열섬과 양의 상관 (이화여대 논문)
  // 땅속 유충 기간은 5년 안팎으로 보도됨 (종·자료마다 다름)
  window.ANIMALS.cicada = {
    id: "cicada",
    name: "말매미",
    emoji: "🪲",
    peerLabel: "형제",
    successLabel: "땅 위에서 울어 본 매미",
    intro: "아파트 단지 벚나무 가지 속 알에서 깨어났다. 땅으로 떨어져 흙을 파고 들어간다. 다음에 햇빛을 볼 날은 몇 년 뒤다.",
    endText: "다섯 해를 땅속에서 보내고, 몇 주 동안 땅 위에서 울었다. 도시의 여름을 가득 채운 소리 중 하나였다.",
    lifespan: { weeks: 265, label: "약 5년 (땅 위에선 몇 주)", note: "말매미는 땅속에서 5년 안팎을 지낸다고 보도됨 (종·자료마다 다름, 확인 필요)", verified: false },
    timeline: [
      { label: "알에서 깨어나 땅으로", season: "여름", weeks: 2 },
      { label: "땅속 1년째", season: "땅속", weeks: 52 },
      { label: "땅속 2년째", season: "땅속", weeks: 52 },
      { label: "땅속 3년째", season: "땅속", weeks: 52 },
      { label: "땅속 4년째", season: "땅속", weeks: 52 },
      { label: "여름밤, 땅 위로", season: "여름", weeks: 1 },
      { label: "울음의 몇 주", season: "여름", weeks: 3 },
    ],
    stages: [
      { id: "nymph", name: "땅속 유충", fromTurn: 0, baseRisk: 0.08, desc: "나무뿌리의 즙을 빨며 천천히 자란다." },
      { id: "adult", name: "말매미", fromTurn: 5, baseRisk: 0.05, desc: "나무에 붙어 운다." },
    ],
    backgroundDeaths: [
      { stages: ["nymph"], tag: "자연", text: "땅속에서 두더지에게 잡아먹혔다." },
      { stages: ["nymph"], tag: "자연", text: "곰팡이에 감염되었다." },
      { stages: ["adult"], tag: "자연", text: "까치에게 잡혔다." },
    ],
    healthDeath: { tag: "자연", text: "기운을 잃었다." },
    events: [
      {
        id: "into_soil", tag: "사람", turns: [0], weight: 1,
        text: "나무 아래로 떨어졌다. 땅을 파고 들어가야 한다. 그런데 나무 둘레가 보도블록으로 덮여 있다.",
        choices: [
          { label: "블록 틈 흙을 찾는다", risk: 0.15, health: -5, contrib: 0, result: "틈을 비집고 들어갔다.", death: "흙을 찾지 못한 채 개미에게 잡혔다." },
          { label: "화단 쪽으로 기어간다", risk: 0.1, health: -10, contrib: 0, result: "부드러운 화단 흙에 들어갔다.", death: "가는 길에 개미에게 잡혔다." },
        ],
      },
      {
        id: "roots", tag: "자연", turns: [1, 2, 3, 4], weight: 2,
        text: "깜깜한 땅속. 나무뿌리에 빨대 같은 입을 꽂고 즙을 빤다. 한 해가 지나간다.",
        choices: [
          { label: "굵은 뿌리 옆에 자리 잡는다", risk: 0.02, health: 10, contrib: 0, result: "천천히 자랐다.", death: "땅속에서 곰팡이에 감염되었다." },
          { label: "더 깊이 내려간다", risk: 0.01, health: 0, contrib: 0, result: "깊은 곳은 조용하다.", death: "땅속에서 기운을 잃었다." },
        ],
      },
      {
        id: "construction", tag: "사람", turns: [2, 3, 4], weight: 0.5,
        text: "땅이 울린다. 위에서 재개발 공사로 나무를 뽑고 땅을 파낸다.",
        choices: [
          { label: "더 깊이 파고든다", outcomes: [
            { p: 75, result: "공사가 비켜 갔다." },
            { p: 25, death: "나무와 함께 흙째 파헤쳐졌다." },
          ] },
          { label: "옆 나무 뿌리로 옮겨 간다", risk: 0.1, health: -10, contrib: 0, result: "옆 나무 뿌리를 찾았다.", death: "땅속에서 길을 잃었다." },
        ],
      },
      {
        id: "emerge", tag: "자연", turns: [5], weight: 1,
        text: "어느 여름밤, 땅 위로 나와 나무를 기어오른다. 등이 갈라지며 날개가 돋는다.",
        choices: [
          { label: "나무 높이 올라가 허물을 벗는다", risk: 0.05, health: 0, contrib: 0, result: "날개가 펴졌다.", death: "허물을 벗다 끼었다." },
          { label: "가까운 풀줄기에서 허물을 벗는다", risk: 0.12, health: 0, contrib: 0, result: "날개가 펴졌다.", death: "날개가 다 펴지기 전에 개미 떼에게 잡혔다." },
        ],
      },
      {
        id: "city_heat", tag: "사람", tagNote: "도시 열섬", turns: [6], weight: 2,
        text: "아파트 단지의 열대야. 밤에도 덥고 가로등이 환하다. 말매미들이 밤까지 운다. 도심의 말매미 밀도는 농촌의 약 10배다.",
        choices: [
          { label: "밤까지 힘차게 운다", outcomes: [
            { p: 60, result: "짝을 만났다. 말매미 울음은 70~90데시벨로, 주민들의 잠을 깨우기도 한다. 도시의 더위와 불빛이 매미를 더 많이, 더 오래 울게 한다." },
            { p: 40, death: "밤새 울다 기운이 다했다." },
          ] },
          { label: "낮에만 운다", risk: 0.05, health: -5, contrib: 0, result: "짝을 만났다. 나뭇가지에 알을 낳았다.", death: "까치에게 잡혔다." },
        ],
      },
    ],
    action: "매미 소리가 시끄러운 건 도시가 더워졌다는 신호이기도 해요. 나무 그늘과 녹지를 늘려 도시 열섬을 줄이면 사람도 매미도 덜 지쳐요. 밤에 필요 없는 조명을 줄이는 것도 도움이 돼요.",
  };
})();
