/* Lightweight story navigation and interactions for the InternBoot homepage */
(function () {
  "use strict";

  function initInternBootStory() {
    var home = document.querySelector(".hero-section");
    if (!home) return;

    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var heroCopy = home.querySelector(".hero-text-content");
    var actionRow = document.createElement("div");
    actionRow.className = "ib-hero-actions";
    actionRow.innerHTML =
      '<a class="ib-apply-cta" href="#apply-chatbot" data-open-chatbot>Find my internship <i class="fas fa-arrow-right" aria-hidden="true"></i></a>' +
      '<a class="ib-discover-cta" href="#categories">Explore learning paths <i class="fas fa-arrow-down" aria-hidden="true"></i></a>';
    var stats = heroCopy && heroCopy.querySelector(".key-stats-row");
    if (heroCopy && stats) heroCopy.insertBefore(actionRow, stats);

    var sections = [
      { selector: ".hero-section", id: "intro", label: "Start here", icon: "fa-sparkles" },
      { selector: ".stats-section", id: "proof", label: "Our impact", icon: "fa-chart-line" },
      { selector: "#categories", id: "categories", label: "Choose a path", icon: "fa-compass" },
      { selector: "#about", id: "about", label: "Build your skills", icon: "fa-graduation-cap" },
      { selector: ".process-bg", id: "journey", label: "Your journey", icon: "fa-route" },
      { selector: "#certificates", id: "certificates", label: "Show your work", icon: "fa-award" },
      { selector: "#testimonials", id: "testimonials", label: "Learner stories", icon: "fa-comment-dots" }
    ];
    var available = sections.map(function (item) {
      var element = document.querySelector(item.selector);
      if (!element) return null;
      element.id = item.id;
      return { item: item, element: element };
    }).filter(Boolean);

    var progress = document.createElement("div");
    progress.className = "ib-progress-track";
    progress.setAttribute("aria-hidden", "true");
    progress.innerHTML = '<span class="ib-progress-fill"></span>';
    document.body.appendChild(progress);
    var progressFill = progress.firstElementChild;

    var rail = document.createElement("nav");
    rail.className = "ib-story-rail";
    rail.setAttribute("aria-label", "Homepage story chapters");
    rail.innerHTML = available.map(function (entry, index) {
      return '<a href="#' + entry.item.id + '" aria-label="' + entry.item.label + '"' +
        (index === 0 ? ' class="is-active" aria-current="location"' : '') +
        '><i class="fas ' + entry.item.icon + '" aria-hidden="true"></i><span>' + entry.item.label + '</span></a>';
    }).join("");
    document.body.appendChild(rail);

    var railLinks = Array.prototype.slice.call(rail.querySelectorAll("a"));
    function setActive(id) {
      railLinks.forEach(function (link) {
        var active = link.getAttribute("href") === "#" + id;
        link.classList.toggle("is-active", active);
        if (active) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    }

    if ("IntersectionObserver" in window && !reduceMotion) {
      var revealObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

      document.querySelectorAll(
        ".stats-section .section-title,.unified-stat-card,.partners-carousel-title,.partners-logo-grid > *,#categories .section-title,#categories .category-card,#about .section-title,#about .stats-bar,.student-benefit-card,.process-bg .sec-inner,#certificates .section-title,.certificate-card,#testimonials .section-title,.intern-video-card,.testimonial-card"
      ).forEach(function (element, index) {
        if (element.matches(".category-card,.student-benefit-card,.certificate-card,.intern-video-card,.testimonial-card")) {
          element.style.transitionDelay = (Math.min(index % 4, 3) * 70) + "ms";
        }
        element.classList.add("ib-reveal");
        revealObserver.observe(element);
      });

      var sectionObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      }, { threshold: 0.25, rootMargin: "-18% 0px -55% 0px" });
      available.forEach(function (entry) { sectionObserver.observe(entry.element); });
    } else {
      document.querySelectorAll(".ib-reveal").forEach(function (element) { element.classList.add("is-visible"); });
    }

    function updateProgress() {
      var scrollable = document.documentElement.scrollHeight - window.innerHeight;
      var amount = scrollable > 0 ? window.scrollY / scrollable : 0;
      progressFill.style.transform = "scaleX(" + Math.max(0, Math.min(amount, 1)) + ")";
    }
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    updateProgress();

    var categorySection = document.querySelector("#categories");
    var categoryRow = categorySection && categorySection.querySelector(".row.g-4");
    if (categoryRow) {
      var filter = document.createElement("div");
      filter.className = "ib-filter-row";
      filter.setAttribute("role", "group");
      filter.setAttribute("aria-label", "Filter internship categories");
      filter.innerHTML =
        '<span class="ib-filter-label">Choose your kind of work</span>' +
        '<button class="ib-filter-button" type="button" data-filter="all" aria-pressed="true">All paths</button>' +
        '<button class="ib-filter-button" type="button" data-filter="build" aria-pressed="false">Build</button>' +
        '<button class="ib-filter-button" type="button" data-filter="analyze" aria-pressed="false">Analyze</button>' +
        '<button class="ib-filter-button" type="button" data-filter="protect" aria-pressed="false">Protect</button>';
      categoryRow.parentNode.insertBefore(filter, categoryRow);
      filter.addEventListener("click", function (event) {
        var button = event.target.closest("[data-filter]");
        if (!button) return;
        var value = button.getAttribute("data-filter");
        filter.querySelectorAll(".ib-filter-button").forEach(function (item) {
          item.setAttribute("aria-pressed", String(item === button));
        });
        categoryRow.querySelectorAll(".category-card").forEach(function (card) {
          var column = card.parentElement;
          var category = card.getAttribute("data-category");
          var matches = value === "all" ||
            (value === "build" && category === "web-development") ||
            (value === "analyze" && category === "data-science") ||
            (value === "protect" && category === "cyber-security");
          column.classList.toggle("ib-filter-out", !matches);
        });
      });
    }

    var illustration = home.querySelector(".main-illustration");
    var finePointer = window.matchMedia("(hover:hover) and (pointer:fine)").matches;
    if (illustration && finePointer && !reduceMotion) {
      home.addEventListener("pointermove", function (event) {
        var bounds = home.getBoundingClientRect();
        var x = (event.clientX - bounds.left) / bounds.width - 0.5;
        var y = (event.clientY - bounds.top) / bounds.height - 0.5;
        illustration.style.setProperty("--ib-tilt-x", (-y * 4).toFixed(2) + "deg");
        illustration.style.setProperty("--ib-tilt-y", (x * 5).toFixed(2) + "deg");
        document.body.classList.add("pointer-ready");
        document.body.style.setProperty("--pointer-x", event.clientX + "px");
        document.body.style.setProperty("--pointer-y", event.clientY + "px");
      });
      home.addEventListener("pointerleave", function () {
        illustration.style.setProperty("--ib-tilt-x", "0deg");
        illustration.style.setProperty("--ib-tilt-y", "0deg");
      });
      document.addEventListener("pointermove", function (event) {
        document.body.style.setProperty("--pointer-x", event.clientX + "px");
        document.body.style.setProperty("--pointer-y", event.clientY + "px");
        document.body.classList.add("pointer-ready");
      }, { passive: true });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initInternBootStory, { once: true });
  } else {
    initInternBootStory();
  }
})();
