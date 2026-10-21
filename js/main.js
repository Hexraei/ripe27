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

  // Dates scale: place deadlines on a real calendar axis, fill it to today, say what is closed or next.
  document.querySelectorAll(".scale-wrap").forEach(function (wrap) {
    var start = new Date("2026-07-01T00:00:00+05:30"), end = new Date("2027-02-10T00:00:00+05:30");
    var pct = function (d) { return Math.max(0, Math.min(100, ((d - start) / (end - start)) * 100)); };
    var months = wrap.querySelector(".months");
    var names = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    for (var d = new Date(start); d < end; d = new Date(d.getFullYear(), d.getMonth() + 1, 1)) {
      var mk = document.createElement("div");
      mk.className = "mk";
      mk.style.setProperty("--x", pct(d) + "%");
      mk.innerHTML = "<b>" + names[d.getMonth()] + (d.getMonth() === 6 || d.getMonth() === 0 ? " " + d.getFullYear() : "") + "</b>";
      months.appendChild(mk);
    }
    var next = null;
    wrap.querySelectorAll("li[data-date]").forEach(function (li) {
      var when = new Date(li.dataset.date + "T23:59:59+05:30");
      var left = Math.ceil((when - now) / DAY);
      li.style.setProperty("--x", pct(when) + "%");
      var s = li.querySelector(".s");
      if (li.classList.contains("is-event")) { s.textContent = left > 0 ? left + " days to go" : "Held"; return; }
      if (when < now) { li.classList.add("is-past"); s.textContent = "Closed"; }
      else if (!next) { next = li; li.classList.add("is-next"); s.textContent = "Next, in " + left + " days"; }
      else s.textContent = "Open";
    });
    if (wrap.dataset.today !== undefined && now > start && now < end) {
      wrap.style.setProperty("--p", pct(now) + "%");
      var m = document.createElement("div");
      m.className = "today";
      m.style.setProperty("--x", pct(now) + "%");
      m.innerHTML = "<span>Today, " + now.getDate() + " " + names[now.getMonth()] + "</span>";
      wrap.appendChild(m);
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

  // Entrances: one observer for tables, the dates scale, ruled headings, photos and staggered lists.
  document.querySelectorAll("[data-stagger]").forEach(function (box) {
    Array.prototype.forEach.call(box.children, function (c, i) { c.style.setProperty("--d", i * 70 + "ms"); });
  });
  document.querySelectorAll(".scale-wrap li").forEach(function (li, i) { li.style.setProperty("--d", 500 + i * 160 + "ms"); });

  var countUp = function (el) {
    var n = +el.dataset.count, t0 = null;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var step = function (ts) {
      t0 = t0 || ts;
      var k = Math.min((ts - t0) / 1100, 1);
      el.textContent = Math.round(n * (1 - Math.pow(1 - k, 3)));
      if (k < 1) requestAnimationFrame(step);
    };
    el.textContent = "0";
    requestAnimationFrame(step);
  };

  var items = document.querySelectorAll(".reveal, .ruled, .reveal-img, [data-stagger]");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add("in");
        e.target.querySelectorAll("[data-count]").forEach(countUp);
        io.unobserve(e.target);
      });
    }, { threshold: 0.15 });
    items.forEach(function (el) { io.observe(el); });
  } else items.forEach(function (el) { el.classList.add("in"); });

  // Hero photo drifts slower than the page.
  var heroImg = document.querySelector(".hero-img");
  if (heroImg && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    addEventListener("scroll", function () {
      if (scrollY < 900) heroImg.style.transform = "translateY(" + scrollY * 0.18 + "px)";
    }, { passive: true });
  }
})();
