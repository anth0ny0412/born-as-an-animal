// 길고양이: 사람 곁에서 사는 도시 동물
// 7대 광역시 약 68만 마리 추정 (정부 추정, 비건뉴스). 서울 2013년 25만 → 2022년 11.6만 (서울시)
// 평균 수명 약 3년(반려묘 약 15년), 새끼의 50%가 생후 30일을 넘기지 못한다는 보도 (SBS 스페셜)
window.ANIMALS = window.ANIMALS || {};

(function () {
  const STREET = { adopted: false };
  const HOME = { adopted: true };
  const ALL = ["봄", "여름", "가을", "겨울", "한 해"];
  const GROWN = ["young", "adult"];

  window.ANIMALS.cat = {
    id: "cat",
    name: "길고양이",
    emoji: "🐈",
    peerLabel: "새끼 고양이",
    successLabel: "여덟 살까지 산 고양이",
    flagLabels: { neutered: "중성화(귀 끝 표시)", fed: "급식소 단골", adopted: "입양됨" },
    intro: "봄, 아파트 주차장 구석의 종이 상자 안에서 형제 여섯과 함께 태어났다. 어미는 이 골목에서 태어난 길고양이다.",
    endText: (state) => state.flags.adopted
      ? "여덟 해를 살았다. 창가 햇볕 아래, 가족 곁에서 늙어 간다. 반려묘는 15년 넘게 살기도 한다."
      : "여덟 해를 살았다. 평균 3년이라는 길 위의 삶에서 아주 드문 일이다.",
    lifespan: {
      weeks: 780,
      label: "반려묘 약 15년",
      note: "같은 고양이라도 길고양이의 평균 수명은 약 3년이라는 보도가 있음 (SBS 스페셜, 공식 조사 아님)",
      verified: false,
    },
    // 길 위의 위험은 입양되면 크게 줄어듦
    baseRiskFactor: (state) => (state.flags.adopted ? 0.2 : 1),
    timeline: [
      { label: "태어난 날 (봄)", season: "봄", weeks: 1 },
      { label: "생후 한 달", season: "봄", weeks: 4 },
      { label: "생후 2~3개월, 어미를 따라다니는 때", season: "봄", weeks: 8 },
      { label: "첫 여름", season: "여름", weeks: 13 },
      { label: "첫 가을", season: "가을", weeks: 13 },
      { label: "첫 겨울", season: "겨울", weeks: 13 },
      { label: "두 번째 봄", season: "봄", weeks: 13 },
      { label: "2살 → 3살", season: "한 해", weeks: 52 },
      { label: "3살 → 4살", season: "한 해", weeks: 52 },
      { label: "4살 → 5살", season: "한 해", weeks: 52 },
      { label: "5살 → 6살", season: "한 해", weeks: 52 },
      { label: "6살 → 7살", season: "한 해", weeks: 52 },
      { label: "7살 → 8살", season: "한 해", weeks: 52 },
    ],
    stages: [
      { id: "kitten", name: "새끼 고양이", fromTurn: 0, baseRisk: 0.1, desc: "어미 품과 상자 안이 세상의 전부다." },
      { id: "young", name: "어린 고양이", fromTurn: 3, baseRisk: 0.06, desc: "어미 곁을 떠나 혼자 골목을 익힌다." },
      { id: "adult", name: "어른 고양이", fromTurn: 7, baseRisk: 0.18, desc: "골목에서 한 해를 넘기는 것 자체가 고비다." },
    ],
    backgroundDeaths: [
      { stages: ["kitten"], tag: "자연", text: "고양이 감기(허피스)가 심해져 죽었다." },
      { stages: ["kitten"], tag: "자연", text: "어미가 먹이를 구하러 간 사이 굶주림과 추위에 기운을 잃었다." },
      { stages: GROWN, tag: "사람", text: "골목길을 건너다 차에 치였다.", when: STREET },
      { stages: GROWN, tag: "자연", text: "영역 다툼에서 생긴 상처가 덧났다.", when: STREET },
      { stages: GROWN, tag: "자연", text: "병에 걸려 죽었다." },
    ],
    healthDeath: { tag: "자연", text: "굶주림에 몸이 약해져 쓰러졌다." },
    events: [
      // ---------- 새끼 ----------
      {
        id: "box_birth", tag: "자연", turns: [0], weight: 1,
        text: "주차장 구석 상자 안. 형제 여섯이 어미 젖을 두고 꼬물거린다.",
        choices: [
          { label: "젖꼭지를 먼저 차지한다", risk: 0.2, health: 10, contrib: 0,
            result: "배가 부르다. 길에서 태어난 새끼 고양이의 절반이 생후 30일을 넘기지 못한다는 보도가 있다.",
            death: "태어난 지 며칠 만에 기운을 잃었다." },
          { label: "형제들 틈에서 잔다", risk: 0.25, health: -5, contrib: 0,
            result: "형제 둘이 다음 날 움직이지 않았다.", death: "젖을 충분히 먹지 못해 약해져 죽었다." },
        ],
      },
      {
        id: "kitten_kidnap", tag: "사람", turns: [1, 2], when: STREET, weight: 1,
        text: "어미가 먹이를 구하러 간 사이, 지나가던 사람이 상자를 들여다본다. \"어미가 버렸나 봐.\"",
        choices: [
          { label: "작게 야옹 운다", outcomes: [
            { p: 50, result: "사람이 망설이다 떠났다. 어미는 근처에 있었다. 새끼 고양이를 봤다면 몇 시간 떨어져서 어미가 오는지 지켜보는 게 먼저다." },
            { p: 30, result: "사람이 상자째 데려갔다. 몇 주 뒤 한 가족이 당신을 입양했다.", setFlags: { adopted: true } },
            { p: 20, death: "사람이 데려갔지만 어미 젖을 잃은 새끼는 버티지 못했다." },
          ] },
          { label: "상자 구석에 숨는다", outcomes: [
            { p: 80, result: "사람이 떠났다. 저녁에 어미가 돌아왔다." },
            { p: 20, result: "사람이 데려갔다. 임시 보호를 거쳐 입양되었다.", setFlags: { adopted: true } },
          ] },
        ],
      },
      {
        id: "follow_mother", tag: "자연", turns: [1, 2], when: STREET, weight: 2,
        text: "어미를 따라 처음 상자 밖으로 나왔다. 골목은 넓고 시끄럽다.",
        choices: [
          { label: "어미 꼬리만 보고 따라간다", risk: 0.06, health: 5, contrib: 0, result: "어미가 숨을 곳과 먹이 있는 곳을 알려 준다.", death: "어미를 놓쳐 길을 잃었다." },
          { label: "혼자 나비를 쫓는다", risk: 0.12, health: 5, contrib: 0, result: "처음으로 사냥 흉내를 냈다.", death: "골목길에 뛰어들었다가 차에 치였다." },
        ],
      },

      // ---------- 길 위의 삶 ----------
      {
        id: "road", tag: "사람", seasons: ALL, stages: GROWN, when: STREET, weight: 3,
        text: "골목 건너편에서 생선 냄새가 난다. 차가 쉴 새 없이 지나간다.",
        choices: [
          { label: "틈을 보고 뛰어서 건넌다", risk: 0.12, health: 5, contrib: 0,
            result: "건넜다. 로드킬을 가장 많이 당하는 동물은 고양이다(2021년 로드킬 집계 1위).",
            death: "차에 치였다." },
          { label: "차 밑으로 기어서 건넌다", risk: 0.06, health: 0, contrib: 0, result: "주차된 차들 밑으로 건넜다.", death: "차가 갑자기 출발했다." },
        ],
      },
      {
        id: "engine_room", tag: "사람", seasons: ["겨울", "한 해"], stages: GROWN, when: STREET, weight: 3,
        text: "영하의 밤. 방금 주차한 자동차 엔진룸에서 따뜻한 기운이 올라온다.",
        choices: [
          { label: "엔진룸 안으로 들어간다", outcomes: [
            { p: 75, result: "아침에 누군가 보닛을 탕탕 두드렸다. 놀라서 뛰쳐나왔다. 시동 전 보닛 두드리기('모닝 노크')가 고양이를 살린다." },
            { p: 25, death: "아침에 시동이 걸렸다." },
          ] },
          { label: "스티로폼 상자 집을 찾는다", risk: 0.05, health: -10, contrib: 0,
            result: "누군가 만들어 둔 겨울 집이었다.", death: "추위를 이기지 못했다." },
        ],
      },
      {
        id: "feeding_station", tag: "사람", seasons: ALL, stages: GROWN, when: STREET, weight: 2,
        text: "아파트 화단 구석에 사료 그릇과 물그릇이 놓여 있다. 누군가 매일 채워 둔다.",
        choices: [
          { label: "매일 찾아간다", outcomes: [
            { p: 75, result: "배고픈 날이 줄었다. 이곳의 단골이 되었다.", health: 20, setFlags: { fed: true } },
            { p: 25, result: "며칠 뒤 '고양이 밥 주지 마세요' 쪽지와 함께 그릇이 치워졌다. 급식소를 둘러싼 주민 갈등은 흔하다.", health: -5 },
          ] },
          { label: "사람 냄새가 나서 피한다", risk: 0.02, health: -10, contrib: 0, result: "쓰레기봉투를 뜯어 배를 채웠다.", death: "상한 음식을 먹고 탈이 났다." },
        ],
      },
      {
        id: "tnr", tag: "사람", seasons: ALL, stages: GROWN, when: { adopted: false, neutered: false }, weight: 3,
        text: "급식소 옆에 철망 상자가 놓였다. 안에서 참치 냄새가 난다. 중성화 수술을 위한 포획틀이다.",
        choices: [
          { label: "안으로 들어간다", outcomes: [
            { p: 93, result: "수술을 받고 며칠 뒤 같은 골목에 다시 풀려났다. 왼쪽 귀 끝이 살짝 잘려 있다. 중성화했다는 표시다. 2018~2022년 길고양이 약 35만 8천 마리가 중성화됐다.",
              setFlags: { neutered: true }, health: -10 },
            { p: 7, result: "사람에게 몸을 비비는 순한 고양이라, 수술 뒤 입양처를 찾아 주었다.", setFlags: { neutered: true, adopted: true } },
          ] },
          { label: "멀찍이 돌아간다", risk: 0, health: -5, contrib: 0,
            result: "중성화로 개체 수를 줄이려면 한 지역 고양이의 75% 이상을 중성화해야 하는데, 광역시는 13% 이하라는 지적이 있다." },
        ],
      },
      {
        id: "mating_season", tag: "자연", seasons: ["봄", "한 해"], stages: GROWN, when: { adopted: false, neutered: false }, weight: 2,
        text: "봄, 짝을 찾는 울음소리로 골목이 시끄럽다. 다른 고양이들이 영역으로 몰려든다.",
        choices: [
          { label: "울음소리에 끼어든다", risk: 0.08, health: -10, contrib: 0,
            result: "밤새 울고 싸웠다. 창문이 열리고 \"시끄러워!\" 소리가 났다. 길고양이는 한 번에 새끼를 여럿 낳는다.",
            death: "영역 다툼에서 크게 다쳤다." },
          { label: "조용히 숨어 지낸다", risk: 0.02, health: -5, contrib: 0, result: "봄이 지나갔다.", death: "숨어 지내다 굶주렸다." },
        ],
      },
      {
        id: "stranger", tag: "사람", seasons: ALL, stages: GROWN, when: STREET, weight: 1,
        text: "낯선 사람이 쪼그려 앉아 손을 내민다.",
        choices: [
          { label: "다가가 냄새를 맡는다", outcomes: [
            { p: 85, result: "츄르를 받아먹었다. 사람 손이 생각보다 따뜻하다.", health: 10 },
            { p: 10, result: "그 사람이 매일 오더니, 결국 당신을 집으로 데려갔다. 입양이다.", setFlags: { adopted: true } },
            { p: 5, death: "사람에게 해코지를 당해 크게 다쳤고, 회복하지 못했다. 길고양이 학대는 동물보호법 위반이다." },
          ] },
          { label: "담장 위로 달아난다", risk: 0, health: 0, contrib: 0, result: "담장 위에서 사람을 내려다봤다." },
        ],
      },
      {
        id: "redevelopment", tag: "사람", seasons: ["봄", "여름", "가을", "한 해"], stages: GROWN, when: STREET, weight: 1,
        text: "동네에 재개발 펜스가 둘러졌다. 사람들이 이사를 가고, 밥을 주던 집도 비었다.",
        choices: [
          { label: "빈 동네에 남는다", risk: 0.15, health: -20, contrib: 0, result: "포클레인 소리 사이로 버텼다. 봉사자들이 남은 고양이들을 옮겨 주었다.", death: "철거 현장에서 빠져나오지 못했다." },
          { label: "옆 동네로 옮겨 간다", risk: 0.1, health: -10, contrib: 0, result: "새 골목엔 이미 주인이 있었다. 한참을 쫓겨 다녔다.", death: "낯선 동네 고양이와 싸우다 다쳤다." },
        ],
      },
      {
        id: "cold", tag: "자연", seasons: ["겨울", "한 해"], stages: GROWN, when: STREET, weight: 2,
        text: "한파. 물그릇이 꽁꽁 얼었다.",
        choices: [
          { label: "지하 주차장으로 숨어든다", risk: 0.05, health: -5, contrib: 0, result: "바람은 피했다.", death: "주차장에서 차에 치였다." },
          { label: "얼음을 핥으며 버틴다", risk: 0.06, health: -15, contrib: 0, result: "봄을 기다린다.", death: "추위와 갈증을 이기지 못했다." },
        ],
      },
      {
        id: "rain", tag: "자연", seasons: ["여름", "한 해"], stages: GROWN, when: STREET, weight: 1,
        text: "장맛비가 며칠째 내린다. 늘 자던 자리가 물에 잠겼다.",
        choices: [
          { label: "빌라 계단 밑으로 들어간다", risk: 0.02, health: -5, contrib: 0, result: "주민이 박스를 깔아 주었다.", death: "젖은 몸으로 감기가 심해졌다." },
          { label: "젖은 채로 버틴다", risk: 0.05, health: -15, contrib: 0, result: "비가 그쳤다.", death: "젖은 몸으로 감기가 심해졌다." },
        ],
      },

      // ---------- 입양된 뒤 ----------
      {
        id: "home_window", tag: "사람", seasons: ALL, stages: ["kitten"].concat(GROWN), when: HOME, weight: 2,
        text: "창가에 앉아 바깥 골목을 내려다본다. 저 아래에서 예전 동네 고양이가 지나간다.",
        choices: [
          { label: "꼬리를 흔들며 바라본다", risk: 0, health: 5, contrib: 0, result: "밥그릇은 늘 차 있고, 겨울엔 따뜻하다." },
          { label: "방충망을 긁는다", risk: 0.02, health: 0, contrib: 0, result: "가족이 방묘창을 달았다.", death: "열린 창으로 떨어졌다." },
        ],
      },
      {
        id: "home_vet", tag: "사람", seasons: ALL, stages: GROWN, when: HOME, weight: 1,
        text: "동물병원 가는 날. 이동장에 들어가기 싫다.",
        choices: [
          { label: "침대 밑으로 숨는다", risk: 0, health: 5, contrib: 0, result: "결국 잡혀서 예방접종을 맞았다." },
          { label: "얌전히 들어간다", risk: 0, health: 10, contrib: 0, result: "건강검진 결과가 좋았다." },
        ],
      },
    ],
    action: "겨울엔 시동 걸기 전에 보닛을 두드려 주세요. 골목에서 새끼 고양이를 보면 바로 데려가지 말고 어미가 오는지 먼저 지켜봐 주세요. 길고양이를 돌본다면 급식소를 깨끗이 관리하고 중성화(TNR)에 함께해 주세요.",
  };
})();
