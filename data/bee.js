// 꿀벌(양봉 꿀벌): 국내 봉군 약 270만 군 × 봉군당 약 2만 마리 ≈ 540억 마리 (추정)
// 2022년 겨울 39만 봉군, 약 78억 마리 실종·폐사. 원인으로 꿀벌응애, 약제 내성, 말벌류, 이상기후가 꼽힘
// 일벌은 나이에 따라 일이 바뀜 (청소 → 육아 → 집 짓기·저장·경비 → 바깥 채집)
window.ANIMALS = window.ANIMALS || {};

(function () {
  window.ANIMALS.bee = {
    id: "bee",
    name: "꿀벌 일벌",
    emoji: "🐝",
    unit: "일",
    peerLabel: "자매",
    successLabel: "날개가 닳을 때까지 산 일벌",
    contribLabel: "꽃 방문(번)",
    intro: "육각형 방의 밀랍 뚜껑을 갉아 내고 나왔다. 당신은 벌통 안 2만 마리 중 하나인 일벌이다. 여름 일벌의 삶은 몇 주다.",
    endText: "날개 끝이 너덜너덜해졌다. 어느 오후, 꽃밭에서 돌아오지 않았다. 여름 일벌의 삶은 원래 이만큼이다. 당신이 나른 꽃가루로 수많은 동생이 자랐다.",
    lifespan: {
      weeks: 42,
      label: "여름 일벌 약 6주",
      note: "여름 일벌은 몇 주, 겨울을 나는 일벌은 몇 달을 산다고 알려져 있음 (확인 필요)",
      verified: false,
    },
    timeline: [
      { label: "방에서 나온 날", season: "1일째", weeks: 1 },
      { label: "청소 담당", season: "1~3일", weeks: 2 },
      { label: "육아 담당", season: "3~10일", weeks: 7 },
      { label: "집 짓기·저장·경비", season: "10~20일", weeks: 10 },
      { label: "첫 바깥 비행", season: "20~30일", weeks: 10, contrib: 300 },
      { label: "꽃가루와 꿀 모으기", season: "30~40일", weeks: 10, contrib: 400 },
    ],
    stages: [
      { id: "house", name: "집안일 담당", fromTurn: 0, baseRisk: 0.01, desc: "벌통 안에서 일한다." },
      { id: "forager", name: "채집벌", fromTurn: 4, baseRisk: 0.05, desc: "가장 나이 든 일벌의 일. 벌통 밖으로 날아간다." },
    ],
    backgroundDeaths: [
      { stages: ["house"], tag: "자연", text: "벌통 안에 퍼진 병에 걸려 죽었다." },
      { stages: ["forager"], tag: "자연", text: "꽃밭에서 거미에게 잡혔다." },
      { stages: ["forager"], tag: "자연", text: "소나기를 만나 벌통으로 돌아오지 못했다." },
      { stages: ["forager"], tag: "사람", text: "도로 위를 날다 차 앞유리에 부딪혔다." },
    ],
    healthDeath: { tag: "자연", text: "힘이 다해 날지 못하게 되었다." },
    events: [
      {
        id: "cleaning", tag: "자연", turns: [0, 1], weight: 1,
        text: "갓 나온 일벌의 첫 일은 방 청소다. 동생이 들어갈 방을 깨끗이 닦는다.",
        choices: [
          { label: "구석구석 닦는다", risk: 0, health: -5, contrib: 0, result: "여왕벌이 깨끗한 방에 알을 낳았다." },
          { label: "꿀을 조금 핥아 먹는다", risk: 0, health: 10, contrib: 0, result: "힘이 난다." },
        ],
      },
      {
        id: "varroa", tag: "사람", tagNote: "꿀벌응애", turns: [1, 2, 3], weight: 2,
        text: "애벌레 방 안에서 붉은 진드기가 보인다. 꿀벌응애다. 애벌레와 일벌의 몸에 붙어 양분을 빨고 병을 옮긴다.",
        choices: [
          { label: "몸을 비벼 서로 떼어 준다", risk: 0.05, health: -10, contrib: 0,
            result: "몇 마리를 떨어냈다. 2022년 겨울 꿀벌 집단 폐사 농가 모두에서 응애가 확인됐고, 방제약에 내성이 생긴 응애가 문제로 꼽혔다.",
            death: "응애가 옮긴 바이러스로 날개가 쭈글쭈글해져 죽었다." },
          { label: "육아 일을 계속한다", risk: 0.08, health: -5, contrib: 0, result: "응애는 그대로다.", death: "응애가 옮긴 병에 걸려 죽었다." },
        ],
      },
      {
        id: "nursing", tag: "자연", turns: [2], weight: 2,
        text: "머리의 샘에서 로열젤리를 만들어 애벌레들에게 먹인다. 하루에도 수천 번 방을 들여다본다.",
        choices: [
          { label: "쉬지 않고 먹인다", risk: 0, health: -10, contrib: 0, result: "애벌레가 무럭무럭 자란다." },
          { label: "중간중간 쉰다", risk: 0, health: 5, contrib: 0, result: "다른 자매들이 일을 나눴다." },
        ],
      },
      {
        id: "guard", tag: "사람", tagNote: "외래종", turns: [3, 4, 5], weight: 2,
        text: "벌통 입구 앞 허공에 등이 검은 말벌이 떠 있다. 등검은말벌이다. 드나드는 꿀벌을 공중에서 낚아챈다.",
        choices: [
          { label: "자매들과 공 모양으로 말벌을 감싼다", risk: 0.1, health: -15, contrib: 0,
            result: "날갯짓 열로 말벌을 쪄 죽였다. 등검은말벌은 외국에서 들어온 침입종으로, 이 말벌이 많은 지역일수록 양봉 피해가 크다.",
            death: "말벌에게 물려 죽었다." },
          { label: "벌통 안으로 숨는다", risk: 0.03, health: 0, contrib: 0, result: "말벌은 입구 앞을 계속 맴돈다.", death: "입구로 나가다 낚아채였다." },
        ],
      },
      {
        id: "acacia", tag: "자연", turns: [4, 5], weight: 2,
        text: "아까시나무 꽃이 피었다. 동료가 춤으로 꽃밭의 방향과 거리를 알려 준다.",
        choices: [
          { label: "춤을 따라 멀리 날아간다", risk: 0.04, health: -10, contrib: 300, result: "꿀주머니가 가득 찼다. 꿀벌은 '8자 춤'으로 꽃밭의 위치를 알려 준다.", death: "멀리 날아갔다가 돌아오지 못했다." },
          { label: "벌통 가까운 꽃만 들른다", risk: 0.02, health: -5, contrib: 100, result: "조금 모았다.", death: "꽃밭에서 거미에게 잡혔다." },
        ],
      },
      {
        id: "pesticide", tag: "사람", turns: [4, 5], weight: 2,
        text: "논밭 옆 꽃에서 낯선 냄새가 난다. 오늘 아침 농약을 뿌린 밭이다.",
        choices: [
          { label: "꿀이 많으니 그냥 들른다", risk: 0.2, health: -10, contrib: 100, result: "운 좋게 괜찮았다.", death: "농약에 중독되어 벌통으로 돌아오는 길을 잃었다." },
          { label: "먼 산 쪽 꽃으로 간다", risk: 0.03, health: -10, contrib: 50, result: "먼 길이었지만 무사했다.", death: "먼 길에서 힘이 다했다." },
        ],
      },
      {
        id: "giant_hornet", tag: "자연", turns: [4, 5], weight: 1,
        text: "커다란 장수말벌 무리가 벌통을 습격해 온다.",
        choices: [
          { label: "입구에서 막아선다", risk: 0.25, health: -15, contrib: 0, result: "자매 수백 마리가 함께 막아 냈다.", death: "장수말벌의 턱에 물려 죽었다." },
          { label: "꽃밭에 남아 있는다", risk: 0.05, health: 0, contrib: 50, result: "돌아와 보니 양봉가가 말벌 포획기를 달아 놓았다.", death: "돌아온 벌통 앞에서 말벌에게 잡혔다." },
        ],
      },
      {
        id: "weather", tag: "사람", tagNote: "이상기후", turns: [3, 4, 5], weight: 1,
        text: "꽃이 필 때인데 갑자기 추워지고 비가 이어진다. 꽃에 꿀이 없다.",
        choices: [
          { label: "비가 그친 틈에 날아간다", risk: 0.08, health: -10, contrib: 50, result: "꿀을 조금 모았다. 극심한 기온 변화가 꿀벌 집단 폐사의 한 원인으로 분석됐다.", death: "다시 내린 비에 날개가 젖어 떨어졌다." },
          { label: "벌통 안에서 기다린다", risk: 0, health: -10, contrib: 0, result: "저장해 둔 꿀이 줄어든다." },
        ],
      },
    ],
    action: "꽃이 피어 있을 때는 농약 뿌리기를 피하고, 집과 동네에 꿀벌이 좋아하는 꽃과 나무를 심어 주세요. 꿀벌은 우리가 먹는 많은 과일과 채소의 꽃가루받이를 해요.",
  };
})();
