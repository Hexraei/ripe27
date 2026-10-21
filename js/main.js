(function () {
  var now = new Date();
  var DAY = 864e5;

  // Countdown to the opening session (22 Jan 2027, 09:00 IST).
  var cd = document.getElementById("countdown");
  if (cd) {
    var target = new Date("2027-01-22T09:00:00+05:30");
    var out = cd.querySelector(".cd");
    var tick = function () {
      var ms = target - new Date();
      if (ms <= 0) { out.outerHTML = '<p class="cd-done">The conference is under way.</p>'; clearInterval(t); return; }
      var v = [Math.floor(ms / DAY), Math.floor(ms / 36e5) % 24, Math.floor(ms / 6e4) % 60, Math.floor(ms / 1e3) % 60];
      out.querySelectorAll("b").forEach(function (el, i) { el.textContent = String(v[i]).padStart(i ? 2 : 1, "0"); });
    };
    var t = setInterval(tick, 1000);
    tick();
  }

  // Dates scale: position by date, mark what has closed and what is next.
  document.querySelectorAll(".scale").forEach(function (list) {
    var start = new Date("2026-07-01"), end = new Date("2027-02-10");
    var pct = function (d) { return ((d - start) / (end - start)) * 100; };
    var next = null;
    list.querySelectorAll("li[data-date]").forEach(function (li) {
      var d = new Date(li.dataset.date + "T23:59:59+05:30");
      li.style.setProperty("--x", pct(d) + "%");
      var s = li.querySelector(".s");
      if (li.classList.contains("is-event")) { s.textContent = d > now ? "Upcoming" : "Held"; return; }
      if (d < now) { li.classList.add("is-past"); s.textContent = "Closed"; }
      else if (!next) { next = li; li.classList.add("is-next"); s.textContent = "Next deadline"; }
      else s.textContent = "Open";
    });
    if (list.dataset.today !== undefined && now > start && now < end) {
      var m = document.createElement("div");
      m.className = "today";
      m.style.setProperty("--x", pct(now) + "%");
      m.innerHTML = "<span>Today</span>";
      list.appendChild(m);
    }
  });

  // Fee tables: the early-bird column closes on 15 Oct 2026.
  var early = now <= new Date("2026-10-15T23:59:59+05:30");
  document.querySelectorAll("[data-col]").forEach(function (el) {
    var isEarly = el.dataset.col === "early";
    el.classList.add(isEarly === early ? "col-now" : "col-past");
    if (el.tagName === "TH") el.classList.remove("col-past");
  });
  document.querySelectorAll("[data-fee-note]").forEach(function (el) {
    el.textContent = early ? "Early-bird fees apply until 15 October 2026." : "Early-bird registration closed on 15 October 2026. Late fees apply until 15 December 2026.";
  });

  // One gentle reveal for tables and the dates scale.
  var items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.15 });
    items.forEach(function (el) { io.observe(el); });
  } else items.forEach(function (el) { el.classList.add("in"); });
})();
