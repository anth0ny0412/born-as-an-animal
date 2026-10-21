// 자동 진행 (발표·전시용)
// 켜 두면 태어나기 → 선택 → 결과 → 결과 화면 훑기 → 다시 태어나기를 스스로 반복한다
// 화면 코드(main.js)는 화면을 그린 뒤 Auto.plan(종류, 정보)로 "이 화면에서 다음에 할 일"만 알려 준다
// 주소에 ?auto=1 (속도는 &speed=slow|normal|fast)을 붙이면 처음부터 자동 진행
(function (root) {
  const SPEEDS = { slow: 1.6, normal: 1, fast: 0.5 };
  const LABELS = { slow: "느리게", normal: "보통", fast: "빠르게" };
  const KEY = "born-as-an-animal.auto.v1";

  let on = false;
  let speed = "normal";
  let timers = [];
  let current = { kind: "none", info: {} };

  // 저장된 속도와 주소 설정 읽기 (저장이 막힌 환경에서도 동작)
  try {
    const saved = JSON.parse(localStorage.getItem(KEY));
    if (saved && SPEEDS[saved.speed]) speed = saved.speed;
  } catch (e) { /* 저장 불가 환경 */ }
  try {
    const q = new URLSearchParams(location.search);
    if (q.get("auto") === "1") on = true;
    if (SPEEDS[q.get("speed")]) speed = q.get("speed");
  } catch (e) { /* 주소 없음 */ }

  function save() {
    try { localStorage.setItem(KEY, JSON.stringify({ speed })); } catch (e) { /* 저장 불가 환경 */ }
  }

  // 글이 길수록 오래 보여줌
  const readTime = (text, base) => (base + (text || "").length * 55) * SPEEDS[speed];
  const later = (fn, ms) => timers.push(setTimeout(fn, ms));
  const byId = (id) => document.getElementById(id);

  function clear() {
    timers.forEach(clearTimeout);
    timers = [];
  }

  // 다음으로 넘어가기까지 남은 시간을 막대로 보여줌
  function countdown(el, ms) {
    if (!el || !el.classList) return;
    el.style.setProperty("--dur", ms + "ms");
    el.classList.remove("counting");
    void el.offsetWidth; // 애니메이션 다시 시작
    el.classList.add("counting");
  }

  function press(id, ms) {
    countdown(byId(id), ms);
    later(() => { const b = byId(id); if (b) b.click(); }, ms);
  }

  function run() {
    clear();
    if (!on) return;
    const { kind, info } = current;
    if (kind === "draw") press("draw", 3500 * SPEEDS[speed]);
    else if (kind === "birth") press("start", readTime(info.text, 5000));
    else if (kind === "intro") press("go", readTime(info.text, 2500));
    else if (kind === "outcome") press("next", readTime(info.text, 3000));
    else if (kind === "minigame") press("mg-skip", readTime(info.text, 3000));
    else if (kind === "turn") {
      const ms = readTime(info.text, 3000);
      countdown(document.querySelector(".event"), ms);
      later(() => {
        const choices = document.querySelectorAll("[data-i]");
        if (!choices.length) return;
        const pick = choices[Math.floor(Math.random() * choices.length)];
        pick.classList.add("auto-pick");
        later(() => pick.click(), 900 * SPEEDS[speed]);
      }, ms);
    } else if (kind === "end") {
      // 결과 화면을 위에서부터 카드 하나씩 천천히 훑은 뒤 다시 태어나기
      const parts = [...document.querySelectorAll("#app > section, #app > .tiles")];
      const step = 2800 * SPEEDS[speed];
      parts.forEach((el, i) => later(() => el.scrollIntoView({ behavior: "smooth", block: "center" }), 2500 * SPEEDS[speed] + i * step));
      const total = 2500 * SPEEDS[speed] + parts.length * step;
      later(() => press("again", 3000 * SPEEDS[speed]), total);
    }
  }

  // ---------- 조작 버튼 ----------
  let ctl = null;
  function renderControl() {
    if (!ctl) return;
    ctl.classList.toggle("on", on);
    ctl.innerHTML = on
      ? `<button class="auto-toggle" title="자동 진행 끄기 (A 또는 Esc)">⏸ 자동 진행 중</button>
         <button class="auto-speed" title="속도 바꾸기">${LABELS[speed]}</button>`
      : `<button class="auto-toggle" title="자동 진행 켜기 (A)">▶ 자동 진행</button>`;
    ctl.querySelector(".auto-toggle").addEventListener("click", toggle);
    const sp = ctl.querySelector(".auto-speed");
    if (sp) sp.addEventListener("click", cycleSpeed);
  }

  function toggle() {
    on = !on;
    renderControl();
    if (on) run();
    else {
      clear();
      document.querySelectorAll(".counting").forEach((el) => el.classList.remove("counting"));
    }
  }

  function cycleSpeed() {
    const order = ["slow", "normal", "fast"];
    speed = order[(order.indexOf(speed) + 1) % order.length];
    save();
    renderControl();
    run();
  }

  if (document.createElement && document.body && document.body.appendChild) {
    ctl = document.createElement("div");
    ctl.className = "auto-ctl";
    document.body.appendChild(ctl);
    renderControl();
    document.addEventListener("keydown", (e) => {
      if (e.altKey || e.ctrlKey || e.metaKey) return;
      if (e.key === "a" || e.key === "A" || e.key === "ㅁ") toggle();
      else if (e.key === "Escape" && on) toggle();
    });
  }

  root.Auto = {
    // 화면이 그려질 때마다 호출: 그 화면에서 자동으로 할 일을 정함
    plan(kind, info = {}) {
      current = { kind, info };
      run();
    },
    isOn: () => on,
  };
})(window);
