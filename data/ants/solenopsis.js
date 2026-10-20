// 붉은불개미 (Solenopsis invicta): 사람의 화물을 타고 온 침입종의 삶
// 국내: 2017년 부산항 감만부두 첫 발견, 2018년 부산항·평택항에서 군체 확인 (뉴시스 2018)
window.ANT_SPECIES.push({
  id: "solenopsis",
  name: "붉은불개미",
  sciName: "Solenopsis invicta",
  desc: "남아메리카가 고향인 개미. 화물 컨테이너를 타고 세계 곳곳으로 퍼졌고, 2017년 부산항에서 국내 처음 발견되었다.",
  // 국내에 정착하지 않음. 2018년 부산항(일개미 약 3,000마리)·평택항(약 700마리) 발견 수를 그대로 씀
  koreaPopulation: 3700,
  popNote: "국내 정착 안 됨. 2018년 부산항·평택항에서 발견된 약 3,700마리 기준",
  worldNote: "남미가 고향이지만 미국 남부, 중국, 호주 등 여러 나라에 퍼져 정착했어요. 한국은 아직 정착을 막고 있는 나라예요.",
  castes: [
    { id: "worker", name: "일개미", weight: 99, life: "solenopsis.worker" },
    { id: "queen", name: "여왕 후보", weight: 1, life: "solenopsis.queen" },
  ],
});

const FIRE_ACTION = "항만이나 수입 화물 근처에서 붉은빛 개미 무더기를 보면 손으로 건드리지 말고 관계 기관에 신고하세요. 외래종은 대부분 사람의 물건을 타고 옵니다. 들여오지 않는 것이 가장 좋은 방제예요.";

window.ANIMALS["solenopsis.worker"] = ANT.makeWorkerLife({
  name: "붉은불개미 일개미",
  intro: "항구의 컨테이너 야적장, 콘크리트 바닥 틈에서 태어났다. 당신의 군체는 바다 건너에서 화물을 타고 왔다. 이곳은 고향보다 훨씬 춥다.",
  backgroundDeaths: [
    { stages: ["nurse", "builder"], tag: "자연", text: "병에 걸려 죽었다." },
    { stages: ["forager"], tag: "사람", text: "야적장을 오가는 지게차 바퀴에 깔렸다." },
    { stages: ["forager"], tag: "사람", text: "작업자 발에 밟혔다." },
    { stages: ["forager"], tag: "자연", text: "먹이를 찾다 새에게 잡아먹혔다." },
  ],
  events: ANT.pick(["nurse_feed", "fungus", "bait", "spider", "asphalt", "warm_winter"]).concat([
    {
      id: "concrete_nest",
      tag: "자연",
      seasons: ["봄", "여름", "가을"],
      stages: ["builder"],
      weight: 3,
      text: "콘크리트 바닥의 갈라진 틈을 따라 집을 넓힌다.",
      choices: [
        { label: "틈을 따라 멀리까지 판다", risk: 0.02, health: -15, contrib: 4,
          result: "새 방이 여러 개 생겼다. 2018년 부산항에서도 시멘트 균열을 따라 개미집 11개가 발견되었다.",
          death: "좁은 틈이 무너져 깔렸다." },
        { label: "지금 있는 방을 다진다", risk: 0, health: 5, contrib: 1,
          result: "집이 단단해졌다." },
      ],
    },
    {
      id: "raft",
      tag: "자연",
      seasons: ["여름"],
      stages: ["nurse", "builder", "forager"],
      weight: 3,
      text: "장맛비에 야적장 바닥이 물에 잠긴다.",
      choices: [
        { label: "동료들과 몸을 엮어 뗏목을 만든다", risk: 0.03, health: -5, contrib: 4,
          result: "수천 마리가 서로 다리를 붙잡아 물에 뜨는 뗏목이 되었다. 여왕과 알은 뗏목 한가운데에 실렸다. 붉은불개미는 이렇게 홍수를 견딘다.",
          death: "뗏목 가장자리에서 물에 휩쓸렸다." },
        { label: "혼자 높은 곳을 찾는다", risk: 0.2, health: -10, contrib: 0,
          result: "컨테이너 모서리에 매달려 살아남았다.",
          death: "혼자 헤엄치다 물에 휩쓸렸다." },
      ],
    },
    {
      id: "container_move",
      tag: "사람",
      seasons: ["봄", "여름", "가을"],
      stages: ["builder", "forager"],
      weight: 2,
      text: "동료 여럿이 들어가 있는 컨테이너가 크레인에 들려 트럭에 실린다.",
      choices: [
        { label: "컨테이너 틈에 같이 올라탄다", risk: 0.15, health: -10, contrib: 3,
          result: "트럭이 항구를 떠났다. 어디에 내리게 될지 모른다. 붉은불개미가 바다를 건너온 것도 이런 방식이다.",
          death: "낯선 창고에 내렸지만 먹이도 동료도 찾지 못했다." },
        { label: "바닥 틈으로 돌아간다", risk: 0.02, health: 0, contrib: 1,
          result: "집으로 돌아왔다.",
          death: "돌아오다 지게차에 깔렸다." },
      ],
    },
    {
      id: "monitor_trap",
      tag: "사람",
      seasons: ["봄", "여름", "가을"],
      stages: ["forager"],
      weight: 3,
      text: "바닥에 달콤한 냄새가 나는 작은 통이 놓였다. 검역 당국이 놓은 예찰 트랩이다.",
      choices: [
        { label: "통 안으로 들어간다", risk: 0.5, health: 0, contrib: -2,
          result: "먹이만 먹고 빠져나왔다. 운이 좋았다.",
          death: "예찰 트랩에 잡혀 붉은불개미로 확인되었다. 곧 주변 일대에 방제가 시작된다." },
        { label: "그냥 지나친다", risk: 0.03, health: 0, contrib: 0,
          result: "아무 일도 없었다. 아직은.",
          death: "다른 트랩에 걸렸다." },
      ],
    },
    {
      id: "eradication",
      tag: "사람",
      seasons: ["봄", "여름", "가을"],
      stages: ["nurse", "builder", "forager"],
      weight: 2,
      text: "방제복을 입은 사람들이 왔다. 바닥 틈마다 약제를 뿌리고 있다.",
      choices: [
        { label: "가장 깊은 틈으로 피한다", risk: 0.25, health: -10, contrib: 0,
          result: "약제가 닿지 않는 곳까지 숨었다. 2018년 부산항 방제 때도 여왕개미는 끝내 발견되지 않았다.",
          death: "방제 약제에 죽었다." },
        { label: "여왕과 알을 옮긴다", risk: 0.35, health: -10, contrib: 5,
          result: "여왕을 깊은 곳으로 옮겼다. 군체가 살아남았다.",
          death: "알을 옮기다 방제 약제에 죽었다." },
      ],
    },
    {
      id: "sting",
      tag: "사람",
      seasons: ["봄", "여름", "가을"],
      stages: ["forager"],
      weight: 2,
      text: "작업자가 모르고 개미집 위를 밟았다.",
      choices: [
        { label: "몰려가 독침으로 쏜다", risk: 0.3, health: 0, contrib: 2,
          result: "작업자가 비명을 지르며 물러났다. 붉은불개미의 독침은 사람에게도 아프고, 드물게 심한 알레르기를 일으킨다. 곧 신고가 들어갈 것이다.",
          death: "작업자가 털어 내다 짓눌려 죽었다." },
        { label: "흩어져 숨는다", risk: 0.1, health: 0, contrib: 0,
          result: "작업자는 아무것도 모른 채 지나갔다.",
          death: "숨기 전에 밟혔다." },
      ],
    },
    {
      id: "cold_winter",
      tag: "자연",
      seasons: ["겨울"],
      stages: ["nurse", "builder", "forager"],
      weight: 3,
      text: "고향보다 훨씬 추운 겨울이다. 콘크리트 바닥이 얼어붙는다.",
      choices: [
        { label: "동료들과 가장 깊은 틈에 모인다", risk: 0.2, health: -10, contrib: 0,
          result: "겨우 겨울을 넘겼다.",
          death: "추위를 견디지 못했다." },
        { label: "따뜻한 건물 쪽으로 옮겨 간다", risk: 0.3, health: -10, contrib: 2,
          result: "건물 벽 근처에서 겨울을 났다.",
          death: "옮겨 가던 중 얼어 죽었다." },
      ],
    },
  ]),
  action: FIRE_ACTION,
});

window.ANIMALS["solenopsis.queen"] = ANT.makeQueenLife({
  name: "붉은불개미 여왕 후보",
  intro: "항구 야적장의 붉은불개미 군체에서 날개 달린 공주개미로 태어났다. 결혼비행에 성공하면, 이 개미는 항구 밖으로 퍼져 나가게 된다.",
  endText: "봄이 왔다. 항구 밖 공터에 새 붉은불개미 군체가 자리를 잡았다. 침입종이 한 걸음 더 퍼졌다.",
  events: ANT.pickQueen(["wait", "flight", "flight_light", "landing", "dig_cell", "claustral", "cell_mold", "first_workers", "queen_winter"]).concat([
    {
      id: "port_landing", turns: [2], tag: "사람", weight: 3,
      seasons: ["여름"], stages: ["founder"],
      text: "내려앉은 곳은 콘크리트로 덮인 항만이다. 주변에 검역 트랩이 깔려 있다.",
      choices: [
        { label: "항만 밖 공터까지 걸어간다", risk: 0.5, health: -20, contrib: 2,
          result: "철조망 너머 풀밭에 닿았다.",
          death: "가는 길에 예찰 트랩에 걸렸다." },
        { label: "바닥 균열에 바로 자리 잡는다", risk: 0.55, health: -5, contrib: 1,
          result: "균열 속에 몸을 숨겼다.",
          death: "곧 이어진 방제 작업에 죽었다." },
      ],
    },
  ]),
  action: FIRE_ACTION,
});
