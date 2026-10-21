// 새 3차 확장: 황새(복원), 까치(유해조수)
window.ANIMALS = window.ANIMALS || {};

(function () {
  const ALL = ["봄", "여름", "가을", "겨울", "한 해"];
  const yearly = (from, to) => Array.from({ length: to - from }, (_, i) => ({ label: `${from + i}살 → ${from + i + 1}살`, season: "한 해", weeks: 52 }));

  // ---------- 황새 ----------
  // 1971년 마지막 텃새 황새 부부 중 수컷이 밀렵당한 뒤 사라짐 → 복원, 2015년부터 예산 방사
  // 전신주 감전사로 한때 방사 중단(2016). 야생 황새 2019년 40마리 → 최대 230여 마리, 2024년 번식쌍 21쌍 (예산군)
  window.ANIMALS.stork = {
    id: "stork",
    name: "황새",
    emoji: "🪶",
    peerLabel: "새끼 황새",
    successLabel: "여섯 살까지 산 황새",
    intro: "충남 예산, 논 한가운데 높이 세운 인공 둥지탑에서 깨어났다. 1971년 이 땅의 마지막 텃새 황새가 사라진 뒤, 사람이 다시 데려와 복원한 황새의 자손이다.",
    endText: "여섯 해를 살았다. 야생 황새는 2019년 40마리에서 230마리 가까이로 늘었다. 당신도 그 숫자 중 하나다.",
    lifespan: { weeks: 1560, label: "20년 이상", note: "황새는 수십 년을 사는 것으로 알려져 있음 (확인 필요)", verified: false },
    timeline: [
      { label: "봄, 둥지탑에서 깨어남", season: "봄", weeks: 8 },
      { label: "첫 비행", season: "여름", weeks: 8 },
      { label: "첫 가을", season: "가을", weeks: 13 },
      { label: "첫 겨울", season: "겨울", weeks: 23 },
    ].concat(yearly(1, 6)),
    stages: [
      { id: "chick", name: "새끼 황새", fromTurn: 0, baseRisk: 0.04, desc: "부모가 미꾸라지를 토해 먹인다." },
      { id: "young", name: "어린 황새", fromTurn: 1, baseRisk: 0.05, desc: "논과 하천을 날아다닌다." },
      { id: "adult", name: "황새", fromTurn: 4, baseRisk: 0.06, desc: "짝을 찾아 둥지를 튼다." },
    ],
    backgroundDeaths: [
      { stages: ["chick"], tag: "자연", text: "둥지에서 떨어졌다." },
      { stages: ["young", "adult"], tag: "자연", text: "병에 걸려 죽었다." },
      { stages: ["young", "adult"], tag: "사람", text: "전신주에 내려앉다 감전되었다." },
    ],
    healthDeath: { tag: "자연", text: "먹이를 찾지 못해 쇠약해졌다." },
    events: [
      {
        id: "nest", tag: "사람", turns: [0], weight: 1,
        text: "둥지탑 위. 부모가 논에서 잡아 온 미꾸라지를 토해 준다. 둥지탑 아래 사람들이 망원경으로 지켜본다.",
        choices: [
          { label: "부리를 벌리고 먹이를 조른다", risk: 0.03, health: 10, contrib: 0, result: "무럭무럭 자란다. 황새는 큰 나무 대신 사람이 세운 둥지탑에 둥지를 튼다.", death: "둥지에서 떨어졌다." },
          { label: "날개를 퍼덕이며 연습한다", risk: 0.04, health: 5, contrib: 0, result: "날개가 튼튼해졌다.", death: "날갯짓 연습 중 떨어졌다." },
        ],
      },
      {
        id: "pole", tag: "사람", seasons: ALL, stages: ["young", "adult"], weight: 3,
        text: "논 위를 날다 쉬고 싶다. 근처에 높은 것은 전신주뿐이다.",
        choices: [
          { label: "전신주 꼭대기에 내려앉는다", outcomes: [
            { p: 85, result: "무사히 쉬었다. 날개가 긴 황새는 전선 두 개를 동시에 건드리기 쉽다. 2016년엔 감전사가 잇따라 방사가 중단되기도 했다." },
            { p: 15, death: "전신주에 내려앉다 날개가 전선에 닿아 감전되었다." },
          ] },
          { label: "인공 둥지탑까지 날아간다", risk: 0.01, health: -5, contrib: 0, result: "멀었지만 안전했다.", death: "먼 길에 지쳐 떨어졌다." },
        ],
      },
      {
        id: "paddy", tag: "사람", seasons: ["봄", "여름", "가을", "한 해"], stages: ["young", "adult"], weight: 2,
        text: "논에 내려앉아 미꾸라지와 개구리를 찾는다.",
        choices: [
          { label: "농약을 쓰지 않는 친환경 논으로 간다", risk: 0.01, health: 15, contrib: 0, result: "먹이가 가득하다. 황새가 돌아오려면 생물이 사는 논이 필요하다.", death: "논에서 들개에게 쫓겼다." },
          { label: "가까운 일반 논에 내려앉는다", risk: 0.06, health: 5, contrib: 0, result: "먹이가 적었다.", death: "농약 묻은 먹이를 먹고 중독되었다." },
        ],
      },
      {
        id: "wander", tag: "자연", seasons: ["가을", "겨울", "한 해"], stages: ["young", "adult"], weight: 1,
        text: "날이 추워지자 멀리 날아가고 싶다. 방사된 황새 중에는 일본이나 러시아까지 날아간 황새도 있다.",
        choices: [
          { label: "바다 건너 멀리 날아간다", risk: 0.1, health: -10, contrib: 0, result: "새로운 습지를 찾았다. 봄에 다시 돌아왔다.", death: "먼 길에서 돌아오지 못했다." },
          { label: "예산 근처 습지에 머문다", risk: 0.02, health: 0, contrib: 0, result: "겨울을 났다.", death: "추위에 쓰러졌다." },
        ],
      },
      {
        id: "photographers", tag: "사람", seasons: ["봄", "여름", "한 해"], stages: ["adult"], weight: 1,
        text: "둥지 근처에 사진가들이 몰려들었다. 더 가까이 찍으려고 둥지탑 아래까지 들어온다.",
        choices: [
          { label: "알을 지킨다", risk: 0, health: -10, contrib: 0, result: "사람들이 물러났다." },
          { label: "날아올라 피한다", risk: 0.01, health: -5, contrib: 0, result: "잠시 둥지를 비운 사이 알이 식었다.", death: "급히 날다 전선에 부딪혔다." },
        ],
      },
      {
        id: "breeding", tag: "자연", seasons: ["봄", "한 해"], stages: ["adult"], weight: 2,
        text: "짝과 함께 둥지를 고치고 알을 낳았다.",
        choices: [
          { label: "번갈아 알을 품는다", risk: 0.01, health: -10, contrib: 0, result: "새끼 셋이 깨어났다. 2024년 국내 황새 번식쌍은 21쌍이었다.", death: "먹이를 나르다 지쳤다." },
          { label: "먹이를 더 멀리서 구해 온다", risk: 0.04, health: -5, contrib: 0, result: "새끼 둘이 자랐다.", death: "먹이를 구하다 전신주에서 감전되었다." },
        ],
      },
    ],
    action: "논에 농약을 줄이면 황새가 먹을 미꾸라지와 개구리가 돌아와요. 황새 둥지와 쉬는 곳에 가까이 다가가지 말고, 멀리서 지켜봐 주세요.",
  };

  // ---------- 까치 ----------
  // 유해야생동물. 2018~2020년 야생조류 정전 133건 중 까치 93건(69.9%) (한전). 해마다 전신주 둥지 4천 개 넘게 철거 (YTN)
  window.ANIMALS.magpie = {
    id: "magpie",
    name: "까치",
    emoji: "🐦",
    peerLabel: "새끼 까치",
    successLabel: "다섯 살까지 산 까치",
    intro: "아파트 단지 옆 전봇대 꼭대기, 나뭇가지와 철사 옷걸이로 엮은 둥지에서 깨어났다. 반가운 손님을 알린다던 새, 그리고 지금은 '유해야생동물'이다.",
    endText: "다섯 해를 살았다. 사람 곁에서 가장 영리하게 살아남는 새 중 하나다.",
    lifespan: { weeks: 520, label: "몇 년~10년", note: "까치의 야생 수명은 대개 몇 년으로 알려져 있음 (확인 필요)", verified: false },
    timeline: [
      { label: "봄, 전봇대 둥지에서 깨어남", season: "봄", weeks: 4 },
      { label: "둥지를 떠난 여름", season: "여름", weeks: 13 },
      { label: "첫 가을", season: "가을", weeks: 13 },
      { label: "첫 겨울", season: "겨울", weeks: 22 },
    ].concat(yearly(1, 5)),
    stages: [
      { id: "chick", name: "새끼 까치", fromTurn: 0, baseRisk: 0.05, desc: "부모가 벌레를 물어 온다." },
      { id: "adult", name: "까치", fromTurn: 1, baseRisk: 0.12, desc: "영역을 지키며 산다." },
    ],
    backgroundDeaths: [
      { stages: ["chick"], tag: "자연", text: "둥지에서 떨어졌다." },
      { stages: ["adult"], tag: "자연", text: "병에 걸려 죽었다." },
      { stages: ["adult"], tag: "자연", text: "매에게 잡혔다." },
    ],
    healthDeath: { tag: "자연", text: "먹이를 찾지 못해 쇠약해졌다." },
    events: [
      {
        id: "nest_removed", tag: "사람", turns: [0], weight: 1,
        text: "전봇대 아래 한전 작업차가 섰다. 사람이 둥지를 향해 올라온다. 둥지에 섞인 철사가 비 오는 날 전선에 닿으면 정전이 난다.",
        choices: [
          { label: "둥지 안에 웅크린다", outcomes: [
            { p: 90, result: "작업자가 다른 전봇대부터 갔다. 한 주 뒤 날 수 있게 됐다." },
            { p: 10, death: "둥지가 통째로 철거되었다. 한전은 해마다 전봇대 새 둥지를 4천 개 넘게 철거한다." },
          ] },
          { label: "날개를 퍼덕여 옆 나무로 간다", outcomes: [
            { p: 85, result: "옆 나무 가지에 겨우 내려앉았다. 부모가 그곳까지 먹이를 날라 주었다." },
            { p: 15, death: "날기엔 아직 일렀다. 땅에 떨어졌다." },
          ] },
        ],
      },
      {
        id: "orchard", tag: "사람", seasons: ["여름", "가을", "한 해"], stages: ["adult"], weight: 2,
        text: "과수원에 사과가 빨갛게 익었다. 과수원 위로 반짝이 줄과 그물이 펄럭인다.",
        choices: [
          { label: "사과를 쪼아 먹는다", outcomes: [
            { p: 75, result: "배를 채웠다. 까치는 과일 피해 때문에 유해야생동물로 지정돼 해마다 많이 포획된다." },
            { p: 25, death: "피해방지단의 총에 맞았다." },
          ] },
          { label: "떨어진 사과만 줍는다", risk: 0.03, health: 5, contrib: 0, result: "조금 먹었다.", death: "과수원 그물에 걸렸다." },
        ],
      },
      {
        id: "build_nest", tag: "사람", seasons: ["겨울", "봄", "한 해"], stages: ["adult"], weight: 3,
        text: "12월, 둥지를 지을 때다. 짝과 함께 나뭇가지와 철사 조각을 모은다.",
        choices: [
          { label: "높고 넓은 전봇대에 짓는다", outcomes: [
            { p: 60, result: "둥지를 완성했다. 2018~2020년 새 때문에 생긴 정전의 약 70%가 까치 둥지 탓이었다." },
            { p: 40, result: "다 지은 둥지가 철거되었다. 같은 자리에 다시 짓는다.", health: -15 },
          ] },
          { label: "아파트 단지 큰 나무에 짓는다", risk: 0.01, health: -5, contrib: 0, result: "나무 위 둥지는 아무도 치우지 않았다.", death: "둥지를 짓다 고양이에게 잡혔다." },
        ],
      },
      {
        id: "territory", tag: "자연", seasons: ALL, stages: ["adult"], weight: 2,
        text: "다른 까치 무리와 고양이가 영역에 들어왔다.",
        choices: [
          { label: "깍깍 울며 무리를 불러 쫓아낸다", risk: 0.02, health: -5, contrib: 0, result: "까치는 무리 지어 침입자를 쫓아낸다. 사람 얼굴을 알아보고 기억한다는 연구도 있다.", death: "고양이에게 잡혔다." },
          { label: "물러선다", risk: 0.01, health: -10, contrib: 0, result: "영역 일부를 잃었다.", death: "쫓겨나다 다쳤다." },
        ],
      },
      {
        id: "trash", tag: "사람", seasons: ALL, stages: ["adult"], weight: 1,
        text: "음식물 쓰레기통 뚜껑이 열려 있다.",
        choices: [
          { label: "뒤져서 먹는다", risk: 0.03, health: 15, contrib: 0, result: "배를 채웠다.", death: "상한 음식을 먹고 탈이 났다." },
          { label: "공원 잔디밭에서 벌레를 찾는다", risk: 0.01, health: 5, contrib: 0, result: "벌레를 잡았다.", death: "잔디밭 농약에 중독되었다." },
        ],
      },
    ],
    action: "전봇대 위 둥지를 보면 직접 건드리지 말고 한국전력(123)에 알려 주세요. 철사 옷걸이와 쓰레기를 아무 데나 버리지 않으면 까치가 그것으로 둥지를 짓는 일도 줄어요.",
  };
})();
