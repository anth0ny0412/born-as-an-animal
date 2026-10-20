// 사람 곁의 새 둘과 멸종위기 새 하나
// 참새: 국내 개체 수 자료 없음. 1997년보다 서식밀도가 줄었다는 조사(2005, 수렵동물 7종 2.4~79% 감소)
// 제비: 1980년대보다 크게 줄었고 국립생물자원관 조사로 해마다 약 6.4% 감소 (칼럼 인용), 기후변화 생물지표종
// 저어새: 전 세계 1995년 약 430마리 → 2025년 7,081마리, 그중 약 54%(3,800여 마리)가 인천. 남동유수지는 세계 최대 번식지
window.ANIMALS = window.ANIMALS || {};

(function () {
  const ALL = ["봄", "여름", "가을", "겨울", "한 해"];
  const yearly = (from, to) => Array.from({ length: to - from }, (_, i) => ({ label: `${from + i}살 → ${from + i + 1}살`, season: "한 해", weeks: 52 }));

  // ---------- 참새 ----------
  window.ANIMALS.sparrow = {
    id: "sparrow",
    name: "참새",
    emoji: "🐦",
    peerLabel: "새끼 참새",
    successLabel: "다섯 살까지 산 참새",
    intro: "오래된 주택 기와지붕 틈, 지푸라기 둥지에서 깨어났다. 당신은 사람 곁에서만 사는 새, 참새다.",
    endText: "다섯 해를 살았다. 참새로서는 아주 오래 산 것이다.",
    lifespan: { weeks: 520, label: "야생 몇 년, 길게는 10년 이상", note: "참새의 야생 수명은 대부분 몇 년 이내로 알려져 있음 (확인 필요)", verified: false },
    timeline: [
      { label: "둥지에서 깨어난 날", season: "봄", weeks: 1 },
      { label: "둥지 시절", season: "봄", weeks: 2 },
      { label: "둥지를 떠난 여름", season: "여름", weeks: 13 },
      { label: "첫 가을", season: "가을", weeks: 13 },
      { label: "첫 겨울", season: "겨울", weeks: 13 },
    ].concat(yearly(1, 5)),
    stages: [
      { id: "nestling", name: "새끼 참새", fromTurn: 0, baseRisk: 0.08, desc: "부모가 벌레를 물어 온다." },
      { id: "young", name: "어린 참새", fromTurn: 2, baseRisk: 0.08, desc: "무리를 따라다닌다." },
      { id: "adult", name: "어른 참새", fromTurn: 5, baseRisk: 0.2, desc: "한 해 한 해가 고비다." },
    ],
    backgroundDeaths: [
      { stages: ["nestling"], tag: "자연", text: "둥지에서 떨어졌다." },
      { stages: ["young", "adult"], tag: "자연", text: "길고양이에게 잡혔다." },
      { stages: ["young", "adult"], tag: "자연", text: "겨울 추위를 넘기지 못했다." },
      { stages: ["young", "adult"], tag: "사람", text: "유리창에 부딪혔다." },
    ],
    healthDeath: { tag: "자연", text: "먹이를 찾지 못해 쇠약해졌다." },
    events: [
      {
        id: "nest", tag: "자연", turns: [0, 1], weight: 1,
        text: "부모가 번갈아 애벌레를 물어 온다. 새끼일 때 참새는 곡식보다 벌레를 먹는다.",
        choices: [
          { label: "부리를 가장 크게 벌린다", risk: 0.03, health: 15, contrib: 0, result: "통통하게 자랐다.", death: "둥지에서 떨어졌다." },
          { label: "형제 뒤에 숨는다", risk: 0.06, health: 0, contrib: 0, result: "덜 먹었다.", death: "먹이를 충분히 먹지 못했다." },
        ],
      },
      {
        id: "no_gaps", tag: "사람", turns: [2, 3], weight: 1,
        text: "무리가 둥지 자리를 찾는다. 오래된 기와집은 헐리고, 새 아파트와 빌딩에는 틈이 하나도 없다.",
        choices: [
          { label: "간판 뒤 좁은 틈을 찾는다", risk: 0.03, health: -5, contrib: 0, result: "겨우 자리를 찾았다. 사람 곁에 사는 참새에게 매끈한 새 건물은 살 곳이 없는 곳이다.", death: "간판 틈에 끼어 빠져나오지 못했다." },
          { label: "공원 덤불로 간다", risk: 0.05, health: 0, contrib: 0, result: "덤불 속에 자리를 잡았다.", death: "덤불에서 고양이에게 잡혔다." },
        ],
      },
      {
        id: "rice", tag: "사람", seasons: ["가을", "한 해"], weight: 2,
        text: "논에 벼가 익었다. 무리가 논으로 내려앉는다. 참새는 농작물에 피해를 준다는 이유로 유해야생동물로 지정돼 있다.",
        choices: [
          { label: "벼 이삭을 쪼아 먹는다", risk: 0.08, health: 15, contrib: 0, result: "배가 찼다. 허수아비와 반짝이 줄이 펄럭인다.", death: "논 위에 쳐 둔 그물에 걸렸다." },
          { label: "논둑의 풀씨를 먹는다", risk: 0.02, health: 5, contrib: 0, result: "조금 먹었다.", death: "농약이 묻은 씨앗을 먹었다." },
        ],
      },
      {
        id: "glass", tag: "사람", seasons: ALL, stages: ["young", "adult"], weight: 2,
        text: "도로 옆 투명 방음벽 너머로 나무가 보인다.",
        choices: [
          { label: "곧장 날아간다", risk: 0.25, health: -10, contrib: 0, result: "마지막 순간 방향을 틀었다. 국내에서는 해마다 수백만 마리의 새가 건물 유리창과 투명 방음벽에 부딪혀 죽는 것으로 추정된다.", death: "투명 방음벽에 부딪혔다." },
          { label: "방음벽 위로 넘어간다", risk: 0.03, health: -5, contrib: 0, result: "넘어갔다. 점무늬 스티커가 붙은 방음벽은 새들이 알아본다.", death: "방음벽에 부딪혔다." },
        ],
      },
      {
        id: "winter_food", tag: "자연", seasons: ["겨울", "한 해"], weight: 2,
        text: "한겨울. 눈 덮인 땅에서 먹이를 찾기 어렵다. 깃털을 부풀려 동그랗게 웅크린다.",
        choices: [
          { label: "누군가 뿌려 둔 곡식을 찾아간다", risk: 0.04, health: 10, contrib: 0, result: "배를 채웠다.", death: "먹이 근처에서 고양이에게 잡혔다." },
          { label: "무리와 덤불 속에 붙어 있는다", risk: 0.06, health: -10, contrib: 0, result: "서로의 체온으로 버텼다.", death: "추위를 넘기지 못했다." },
        ],
      },
      {
        id: "breeding", tag: "자연", seasons: ["봄", "한 해"], stages: ["adult"], weight: 2,
        text: "짝과 함께 둥지를 짓고 새끼를 키운다.",
        choices: [
          { label: "벌레를 부지런히 물어 나른다", risk: 0.03, health: -10, contrib: 0, result: "새끼 넷이 둥지를 떠났다.", death: "먹이를 찾다 고양이에게 잡혔다." },
          { label: "가까운 곳에서만 먹이를 찾는다", risk: 0.01, health: 0, contrib: 0, result: "새끼 둘이 자랐다.", death: "둥지 근처에서 고양이에게 잡혔다." },
        ],
      },
    ],
    action: "유리창과 투명 방음벽에 5×10cm 간격의 점무늬 스티커를 붙이면 새의 충돌을 막을 수 있어요. 오래된 집의 틈이 사라지는 도시에는 새집을 달아 주는 것도 도움이 돼요.",
  };

  // ---------- 제비 ----------
  window.ANIMALS.swallow = {
    id: "swallow",
    name: "제비",
    emoji: "🐦",
    peerLabel: "새끼 제비",
    successLabel: "다섯 해를 오간 제비",
    intro: "시골집 처마 밑, 진흙으로 빚은 둥지에서 깨어났다. 가을이면 수천 km 떨어진 동남아시아로 날아가고, 봄이면 다시 이 처마로 돌아올 것이다.",
    endText: "다섯 해 동안 바다를 건너 같은 처마로 돌아왔다. 그 처마가 아직 남아 있는 것이 행운이었다.",
    lifespan: { weeks: 520, label: "몇 년, 길게는 10년 이상", note: "제비의 야생 수명은 대부분 몇 년 이내로 알려져 있음 (확인 필요)", verified: false },
    timeline: [
      { label: "처마 둥지에서 깨어난 날", season: "여름", weeks: 1 },
      { label: "둥지 시절", season: "여름", weeks: 3 },
      { label: "첫 비행과 여름", season: "여름", weeks: 8 },
      { label: "첫 가을, 남쪽으로", season: "가을", weeks: 8 },
      { label: "동남아시아에서 보낸 겨울", season: "겨울", weeks: 20 },
      { label: "첫 봄, 다시 북쪽으로", season: "봄", weeks: 12 },
    ].concat(yearly(1, 5)),
    stages: [
      { id: "nestling", name: "새끼 제비", fromTurn: 0, baseRisk: 0.05, desc: "부모가 날벌레를 물어 온다." },
      { id: "young", name: "어린 제비", fromTurn: 2, baseRisk: 0.05, desc: "날면서 벌레를 잡는다." },
      { id: "adult", name: "어른 제비", fromTurn: 6, baseRisk: 0.2, desc: "해마다 바다를 건넌다." },
    ],
    backgroundDeaths: [
      { stages: ["nestling"], tag: "자연", text: "둥지에서 떨어졌다." },
      { stages: ["young", "adult"], tag: "자연", text: "먼 바다를 건너다 폭풍을 만났다." },
      { stages: ["young", "adult"], tag: "자연", text: "매에게 잡혔다." },
    ],
    healthDeath: { tag: "자연", text: "날벌레를 찾지 못해 쇠약해졌다." },
    events: [
      {
        id: "nest_removed", tag: "사람", turns: [0, 1], weight: 1,
        text: "집주인이 처마 밑 제비 똥을 보고 얼굴을 찌푸린다. 막대기를 들고 온다.",
        choices: [
          { label: "둥지 안에 웅크린다", outcomes: [
            { p: 90, result: "집주인이 둥지 밑에 똥받이 판을 달아 주었다. 제비가 집에 오면 복이 온다는 옛말도 있다." },
            { p: 10, death: "둥지가 떨어졌다." },
          ] },
          { label: "입을 크게 벌리고 운다", outcomes: [
            { p: 92, result: "집주인이 막대기를 내려놓았다." },
            { p: 8, death: "둥지가 떨어졌다." },
          ] },
        ],
      },
      {
        id: "insects", tag: "자연", turns: [1, 2], weight: 1,
        text: "부모가 날벌레를 물어 오는 횟수가 줄었다. 논밭에 벌레가 예전 같지 않다.",
        choices: [
          { label: "부리를 크게 벌린다", risk: 0.05, health: 5, contrib: 0, result: "조금 먹었다. 제비가 줄어든 가장 큰 원인으로 먹이인 곤충의 감소가 꼽힌다.", death: "먹이가 모자라 자라지 못했다." },
          { label: "형제에게 양보한다", risk: 0.08, health: -10, contrib: 0, result: "형제가 먼저 날았다.", death: "먹이가 모자라 자라지 못했다." },
        ],
      },
      {
        id: "migration", tag: "자연", turns: [3, 5], weight: 1,
        text: "바다를 건너야 한다. 수천 km의 여정이다.",
        choices: [
          { label: "무리와 함께 바다 위를 난다", risk: 0.1, health: -15, contrib: 0, result: "건넜다. 제비는 해마다 같은 곳으로 돌아오는 것으로 알려져 있다.", death: "바다 위에서 폭풍을 만나 지쳐 떨어졌다." },
          { label: "섬에서 쉬어 가며 난다", risk: 0.07, health: -10, contrib: 0, result: "섬에서 쉬고 다시 날았다.", death: "섬에서 고양이에게 잡혔다." },
        ],
      },
      {
        id: "winter_south", tag: "사람", turns: [4], weight: 1,
        text: "남쪽 나라의 겨울 들판. 숲이 농장으로 바뀌고 있다.",
        choices: [
          { label: "농장 위를 날며 벌레를 잡는다", risk: 0.05, health: 5, contrib: 0, result: "겨울을 났다.", death: "농약 뿌린 들판에서 중독되었다." },
          { label: "남은 숲을 찾는다", risk: 0.04, health: 0, contrib: 0, result: "겨울을 났다.", death: "먹이를 찾지 못했다." },
        ],
      },
      {
        id: "return", tag: "사람", seasons: ["봄", "한 해"], stages: ["young", "adult"], weight: 2,
        text: "봄, 태어난 마을로 돌아왔다. 그런데 그 시골집 자리에 새 빌라가 섰다. 처마가 없다.",
        choices: [
          { label: "다른 집 처마를 찾는다", risk: 0.04, health: -10, contrib: 0, result: "옆 마을 낡은 창고 처마에 진흙을 물어 둥지를 지었다. 제비는 이제 1980년대보다 훨씬 드물다.", death: "둥지 자리를 찾지 못한 채 지쳤다." },
          { label: "다리 밑을 찾는다", risk: 0.05, health: -5, contrib: 0, result: "다리 밑 콘크리트에 둥지를 붙였다.", death: "둥지를 짓다 지쳤다." },
        ],
      },
      {
        id: "breeding", tag: "자연", seasons: ["여름", "한 해"], stages: ["adult"], weight: 2,
        text: "짝과 함께 날벌레를 물어 날라 새끼 다섯을 키운다.",
        choices: [
          { label: "하루 수백 번 먹이를 나른다", risk: 0.03, health: -15, contrib: 0, result: "새끼 넷이 날았다.", death: "먹이를 나르다 지쳐 떨어졌다." },
          { label: "가까운 논에서만 먹이를 잡는다", risk: 0.01, health: -5, contrib: 0, result: "새끼 둘이 날았다.", death: "논 위에서 매에게 잡혔다." },
        ],
      },
      {
        id: "glass", tag: "사람", seasons: ["여름", "한 해"], stages: ["young", "adult"], weight: 1,
        text: "낮게 날아 벌레를 쫓다 보니 앞에 투명한 버스 정류장 유리벽이 있다.",
        choices: [
          { label: "몸을 비틀어 피한다", risk: 0.1, health: -5, contrib: 0, result: "아슬아슬하게 피했다.", death: "유리벽에 부딪혔다." },
          { label: "높이 솟구친다", risk: 0.03, health: 0, contrib: 0, result: "넘어갔다.", death: "유리벽에 부딪혔다." },
        ],
      },
    ],
    action: "처마 밑 제비 둥지는 떼어 내지 말고, 둥지 아래에 똥받이 판을 달아 주세요. 농약을 줄이고 논밭의 곤충을 지키는 것이 제비의 먹이를 지키는 일이에요.",
  };

  // ---------- 저어새 ----------
  window.ANIMALS.spoonbill = {
    id: "spoonbill",
    name: "저어새",
    emoji: "🦢",
    peerLabel: "새끼 저어새",
    successLabel: "여섯 해를 오간 저어새",
    intro: "인천 도심 한가운데 남동유수지의 작은 인공섬에서 깨어났다. 주걱 같은 부리를 가진 새, 저어새다. 1995년 전 세계에 430마리밖에 남지 않았던 새다.",
    endText: "여섯 해 동안 인천과 남쪽 나라를 오갔다. 저어새는 2025년 7,081마리까지 늘었다. 사람이 지켜 낸 숫자다.",
    lifespan: { weeks: 780, label: "15년 이상", note: "저어새는 10년 넘게 사는 것으로 알려져 있음 (확인 필요)", verified: false },
    timeline: [
      { label: "인공섬 둥지에서 깨어난 날", season: "봄", weeks: 1 },
      { label: "둥지 시절", season: "여름", weeks: 6 },
      { label: "첫 비행, 송도 갯벌로", season: "여름", weeks: 8 },
      { label: "첫 가을, 남쪽으로", season: "가을", weeks: 8 },
      { label: "남쪽 나라의 겨울", season: "겨울", weeks: 20 },
      { label: "첫 봄, 다시 인천으로", season: "봄", weeks: 9 },
    ].concat(yearly(1, 6)),
    stages: [
      { id: "chick", name: "새끼 저어새", fromTurn: 0, baseRisk: 0.05, desc: "부모가 먹이를 토해 먹인다." },
      { id: "young", name: "어린 저어새", fromTurn: 2, baseRisk: 0.04, desc: "갯벌에서 부리를 저으며 먹이를 찾는다." },
      { id: "adult", name: "어른 저어새", fromTurn: 6, baseRisk: 0.08, desc: "해마다 인천으로 돌아와 번식한다." },
    ],
    backgroundDeaths: [
      { stages: ["chick"], tag: "자연", text: "둥지에서 떨어졌다." },
      { stages: ["young", "adult"], tag: "자연", text: "먼 길을 날다 지쳐 떨어졌다." },
      { stages: ["young", "adult"], tag: "자연", text: "병에 걸려 죽었다." },
    ],
    healthDeath: { tag: "자연", text: "먹이를 찾지 못해 쇠약해졌다." },
    events: [
      {
        id: "island", tag: "사람", turns: [0, 1], weight: 1,
        text: "둥지가 있는 섬은 사람이 만든 작은 섬이다. 바로 옆으로 차가 쌩쌩 달린다. 2009년 처음 번식이 확인된 뒤, 이곳은 세계에서 가장 큰 저어새 번식지가 됐다.",
        choices: [
          { label: "부모가 토해 주는 먹이를 받아먹는다", risk: 0.03, health: 15, contrib: 0, result: "무럭무럭 자랐다.", death: "둥지에서 떨어졌다." },
          { label: "형제와 자리를 다툰다", risk: 0.05, health: 5, contrib: 0, result: "자리를 지켰다.", death: "다툼 끝에 둥지 밖으로 밀려났다." },
        ],
      },
      {
        id: "mudflat", tag: "사람", turns: [2], weight: 1,
        text: "송도 갯벌로 날아갔다. 주걱 같은 부리를 물속에 넣고 좌우로 저으며 작은 물고기와 새우를 찾는다. 그런데 갯벌 한쪽이 매립되고 있다.",
        choices: [
          { label: "남은 갯벌에서 먹이를 찾는다", risk: 0.03, health: 5, contrib: 0, result: "배를 채웠다. 송도 갯벌의 저어새는 2019년 5,885마리에서 2021년 3,351마리로 줄었다는 모니터링 결과가 있다.", death: "먹이가 모자라 쇠약해졌다." },
          { label: "더 먼 갯벌로 날아간다", risk: 0.04, health: -5, contrib: 0, result: "먼 갯벌을 찾았다.", death: "먼 길에 지쳤다." },
        ],
      },
      {
        id: "botulism", tag: "자연", turns: [2], seasons: ["여름"], weight: 1,
        text: "한여름, 유수지 물이 따뜻해지고 썩은 냄새가 난다. 보툴리눔 독소가 생기는 계절이다.",
        choices: [
          { label: "유수지 물가에서 먹이를 찾는다", risk: 0.15, health: 5, contrib: 0, result: "무사했다. 여름마다 보툴리눔 중독으로 죽는 저어새가 나온다.", death: "보툴리눔 독소에 중독되었다." },
          { label: "바다 쪽 갯벌로 나간다", risk: 0.03, health: -5, contrib: 0, result: "무사했다.", death: "갯벌로 가다 지쳤다." },
        ],
      },
      {
        id: "migration", tag: "자연", turns: [3, 5], weight: 1,
        text: "남쪽으로 먼 길을 떠난다. 대만, 홍콩, 일본 남부의 겨울 갯벌로.",
        choices: [
          { label: "무리와 함께 난다", risk: 0.06, health: -15, contrib: 0, result: "도착했다.", death: "먼 길을 날다 지쳐 떨어졌다." },
          { label: "중간 갯벌에서 쉬어 간다", risk: 0.04, health: -10, contrib: 0, result: "쉬어 가며 도착했다.", death: "쉬어 가던 갯벌이 매립돼 있었다." },
        ],
      },
      {
        id: "winter", tag: "자연", turns: [4], weight: 1,
        text: "남쪽 나라의 겨울 습지. 전 세계 저어새들이 모여 겨울을 난다.",
        choices: [
          { label: "무리 한가운데서 쉰다", risk: 0.02, health: 10, contrib: 0, result: "따뜻한 겨울을 보냈다.", death: "병에 걸렸다." },
          { label: "혼자 먹이를 찾아다닌다", risk: 0.04, health: 10, contrib: 0, result: "배를 채웠다.", death: "병에 걸렸다." },
        ],
      },
      {
        id: "bridge", tag: "사람", seasons: ["봄", "한 해"], stages: ["young", "adult"], weight: 2,
        text: "돌아와 보니 남동유수지와 갯벌 사이에 커다란 다리 공사가 시작됐다. 먹이터로 가는 하늘길 한가운데다.",
        choices: [
          { label: "다리 위로 높이 날아간다", risk: 0.03, health: -10, contrib: 0, result: "먹이터에 닿았다. 다리가 저어새의 먹이 활동을 방해할 수 있다는 우려가 나온다.", death: "공사 구조물에 부딪혔다." },
          { label: "다른 먹이터를 찾는다", risk: 0.03, health: -15, contrib: 0, result: "먼 갯벌을 찾았다.", death: "먹이가 모자라 쇠약해졌다." },
        ],
      },
      {
        id: "photographers", tag: "사람", seasons: ["봄", "여름", "한 해"], stages: ["adult"], weight: 1,
        text: "유수지 둘레에 망원 렌즈를 든 사람들이 늘어섰다. 둥지 쪽으로 드론 한 대가 날아온다.",
        choices: [
          { label: "둥지를 지킨다", risk: 0.01, health: -10, contrib: 0, result: "드론이 돌아갔다. 시민들은 둥지 근처 드론 비행을 막자는 캠페인을 벌인다.", death: "놀라 날아오르다 다쳤다." },
          { label: "놀라 날아오른다", risk: 0.02, health: -5, contrib: 0, result: "잠시 둥지를 비운 사이 알이 식었다.", death: "놀라 날아오르다 다쳤다." },
        ],
      },
      {
        id: "breeding", tag: "자연", seasons: ["봄", "한 해"], stages: ["adult"], weight: 2,
        text: "인공섬에 짝과 함께 둥지를 틀고 새끼를 키운다.",
        choices: [
          { label: "갯벌까지 먹이를 부지런히 나른다", risk: 0.03, health: -15, contrib: 0, result: "새끼 둘이 날았다. 인천은 전 세계 저어새의 절반이 넘는 3,800여 마리가 사는 곳이 됐다.", death: "먹이를 나르다 지쳤다." },
          { label: "가까운 유수지에서만 먹이를 찾는다", risk: 0.05, health: -5, contrib: 0, result: "새끼 하나가 날았다.", death: "유수지 물가에서 보툴리눔에 중독되었다." },
        ],
      },
    ],
    action: "갯벌은 저어새의 식탁이에요. 갯벌 매립에 관심을 갖고, 번식지 근처에서는 드론을 날리거나 가까이 다가가지 말아 주세요.",
  };
})();
