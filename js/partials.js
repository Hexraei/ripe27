// Shared header and footer, so every page stays in sync without a build step.
(function () {
  var page = document.body.dataset.page || "";
  var authorPages = ["call-for-papers", "submission", "dates"];

  var gear =
    '<svg class="brand-mark" viewBox="0 0 100 100" aria-hidden="true">' +
    '<circle cx="50" cy="50" r="42" fill="none" stroke="#a87a1f" stroke-width="9" stroke-dasharray="8.2 8.2"/>' +
    '<circle cx="50" cy="50" r="36" fill="#12263f"/>' +
    '<text x="50" y="62" text-anchor="middle" font-family="Archivo,Arial,sans-serif" font-weight="800" font-size="34" fill="#fff">50</text></svg>';

  function a(href, label, id, cls) {
    var cur = id && id === page ? ' aria-current="page"' : "";
    return '<a href="' + href + '"' + cur + (cls ? ' class="' + cls + '"' : "") + ">" + label + "</a>";
  }

  var header =
    '<a class="skip" href="#main">Skip to content</a>' +
    '<div class="topline"><div class="wrap"><span>Golden Jubilee year, Department of Production Technology, 1977 to 2027</span>' +
    '<span>Write to <a href="mailto:ripe2027@mitindia.edu">ripe2027@mitindia.edu</a></span></div></div>' +
    '<header class="site-header"><div class="wrap bar">' +
    '<a class="brand" href="index.html">' + gear +
    '<span><b>RIPE 2027</b><small>Recent Innovations in Production Engineering</small></span></a>' +
    '<button class="menu-btn" aria-expanded="false" aria-controls="nav">Menu</button>' +
    '<nav class="nav" id="nav" aria-label="Main">' +
    a("index.html", "Home", "home") +
    a("about.html", "About", "about") +
    '<div class="dd' + (authorPages.indexOf(page) > -1 ? " current" : "") + '"><button type="button" aria-haspopup="true">For authors</button>' +
    '<div class="dd-menu">' + a("call-for-papers.html", "Call for papers", "call-for-papers") +
    a("submission.html", "Submission guidelines", "submission") +
    a("dates.html", "Important dates", "dates") + "</div></div>" +
    a("committees.html", "Committees", "committees") +
    a("program.html", "Programme", "program") +
    a("venue.html", "Venue", "venue") +
    a("sponsorship.html", "Sponsorship", "sponsorship") +
    a("contact.html", "Contact", "contact") +
    a("registration.html", "Register", "registration", "cta") +
    "</nav></div></header>";

  var footer =
    '<footer class="site-footer"><div class="wrap foot">' +
    "<div><h3>RIPE 2027</h3><p>3rd International Conference on Recent Innovations in Production Engineering. 22 and 23 January 2027, Chennai.</p>" +
    '<p><a href="assets/docs/RIPE2027-brochure.pdf">Download the brochure (PDF)</a></p></div>' +
    '<div><h3>Authors</h3><ul><li><a href="call-for-papers.html">Call for papers</a></li><li><a href="submission.html">Submission guidelines</a></li><li><a href="dates.html">Important dates</a></li><li><a href="registration.html">Registration</a></li></ul></div>' +
    '<div><h3>Conference</h3><ul><li><a href="about.html">About</a></li><li><a href="committees.html">Committees</a></li><li><a href="program.html">Programme</a></li><li><a href="venue.html">Venue and travel</a></li><li><a href="sponsorship.html">Sponsorship</a></li></ul></div>' +
    "<div><h3>Contact</h3><p>RIPE 2027 Secretary, Department of Production Technology, Madras Institute of Technology Campus, Anna University, Chennai 600 044, Tamil Nadu, India.</p>" +
    '<p><a href="mailto:ripe2027@mitindia.edu">ripe2027@mitindia.edu</a><br><a href="tel:+919842735311">+91 98427 35311</a><br><a href="tel:+919444430644">+91 94444 30644</a></p></div>' +
    '</div><div class="wrap legal"><span>Organised by the Department of Production Technology, MIT Campus, Anna University.</span>' +
    '<span>Photos: Wikimedia Commons, see <a href="assets/img/CREDITS.md">credits</a>.</span></div></footer>';

  document.body.insertAdjacentHTML("afterbegin", header);
  document.body.insertAdjacentHTML("beforeend", footer);

  var btn = document.querySelector(".menu-btn");
  var nav = document.getElementById("nav");
  btn.addEventListener("click", function () {
    var open = nav.classList.toggle("open");
    btn.setAttribute("aria-expanded", open);
    btn.textContent = open ? "Close" : "Menu";
  });
  var hdr = document.querySelector(".site-header");
  addEventListener("scroll", function () { hdr.classList.toggle("is-stuck", scrollY > 8); }, { passive: true });
})();
