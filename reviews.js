/* =========================================================
   Felix Oketch — Client reviews / testimonials
   ========================================================= */

(() => {
  "use strict";

  /* ---------- Reviews ----------
     HOW TO ADD A REAL REVIEW
     1. When a client submits the "Leave a Review" form you'll get an email.
     2. Copy their details into a new { ... } entry below (newest first).
     3. Delete the three `sample: true` entries once you have real ones.
        Sample entries show a "Sample" tag and are NOT counted in the
        star-rating summary, so visitors are never misled.

     Fields: name, location, service, rating (1–5), text, date ("Mon YYYY"),
             photo (optional, e.g. "images/clients/jane.jpg") */
  const REVIEWS = [
    {
      sample: true,
      name: "Sample Homeowner",
      location: "Kasarani, Nairobi",
      service: "Solar panels & battery backup",
      rating: 5,
      text: "Replace this with a real client review. Example: Felix assessed our home, explained the options clearly and installed a system that keeps our lights, TV and fridge running during outages.",
      date: "Sample",
    },
    {
      sample: true,
      name: "Sample Business Owner",
      location: "Ruiru, Kiambu",
      service: "Hybrid inverter system",
      rating: 5,
      text: "Replace this with a real client review. Example: Our shop no longer closes during blackouts and our monthly power bill has dropped noticeably.",
      date: "Sample",
    },
    {
      sample: true,
      name: "Sample Institution",
      location: "Nairobi County",
      service: "300L solar water heater",
      rating: 5,
      text: "Replace this with a real client review. Example: The solar water heater gives us hot water every day and the installation was neat and professional.",
      date: "Sample",
    },
  ];

  const { showToast, sendForm, escapeHTML } = window.FelixSite;
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  const track = $("#reviewTrack");
  if (!track) return;

  const stars = (n) => "★★★★★".slice(0, n) + "☆☆☆☆☆".slice(0, 5 - n);
  const initials = (name) =>
    name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0].toUpperCase())
      .join("");

  /* ---------- Render cards ---------- */
  track.innerHTML = REVIEWS.map(
    (r) => `
    <figure class="review-card${r.sample ? " is-sample" : ""}">
      ${r.sample ? '<span class="sample-tag" title="Placeholder — replace with a real client review">Sample</span>' : ""}
      <div class="review-stars" aria-label="${r.rating} out of 5 stars">${stars(r.rating)}</div>
      <blockquote>“${escapeHTML(r.text)}”</blockquote>
      <figcaption>
        ${
          r.photo
            ? `<img class="review-avatar" src="${escapeHTML(r.photo)}" alt="" loading="lazy" />`
            : `<span class="review-avatar" aria-hidden="true">${escapeHTML(initials(r.name))}</span>`
        }
        <span class="review-who">
          <strong>${escapeHTML(r.name)}</strong>
          <small>${escapeHTML(r.location)}${r.date && !r.sample ? ` · ${escapeHTML(r.date)}` : ""}</small>
        </span>
      </figcaption>
      ${r.service ? `<span class="review-service">☀️ ${escapeHTML(r.service)}</span>` : ""}
    </figure>`
  ).join("");

  /* ---------- Rating summary (real reviews only) ---------- */
  const real = REVIEWS.filter((r) => !r.sample);
  if (real.length) {
    const avg = real.reduce((s, r) => s + r.rating, 0) / real.length;
    $("#rsScore").textContent = avg.toFixed(1);
    $("#rsStars").textContent = stars(Math.round(avg));
    $("#rsCount").textContent = `from ${real.length} client review${real.length === 1 ? "" : "s"}`;
    $("#ratingSummary").hidden = false;
  }

  /* ---------- Carousel arrows ---------- */
  const prev = $("#reviewPrev");
  const next = $("#reviewNext");
  const step = () => {
    const card = $(".review-card", track);
    return card ? card.getBoundingClientRect().width + 20 : track.clientWidth;
  };
  const updateArrows = () => {
    const max = track.scrollWidth - track.clientWidth - 2;
    const scrollable = max > 0;
    prev.hidden = next.hidden = !scrollable;
    prev.disabled = track.scrollLeft <= 2;
    next.disabled = track.scrollLeft >= max;
  };
  prev.addEventListener("click", () => track.scrollBy({ left: -step(), behavior: "smooth" }));
  next.addEventListener("click", () => track.scrollBy({ left: step(), behavior: "smooth" }));
  track.addEventListener("scroll", updateArrows, { passive: true });
  window.addEventListener("resize", updateArrows);
  updateArrows();

  /* ---------- Leave-a-review modal ---------- */
  const modal = $("#reviewModal");
  const form = $("#reviewForm");
  const done = $("#reviewDone");
  const errorEl = $("#reviewError");
  const submitBtn = $("#reviewSubmit");
  let lastFocus = null;

  function openModal() {
    lastFocus = document.activeElement;
    form.hidden = false;
    done.hidden = true;
    modal.hidden = false;
    document.body.classList.add("no-scroll");
    requestAnimationFrame(() => $("#star5").focus());
  }

  function closeModal() {
    if (modal.hidden) return;
    modal.hidden = true;
    document.body.classList.remove("no-scroll");
    if (lastFocus) lastFocus.focus();
  }

  $("#openReview").addEventListener("click", openModal);
  modal.addEventListener("click", (e) => {
    if (e.target.closest("[data-close-review]")) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (modal.hidden) return;
    if (e.key === "Escape") closeModal();
    if (e.key === "Tab") {
      const f = $$("a[href], button:not([disabled]), input:not(.hp), select, textarea", modal).filter((el) => el.offsetParent !== null);
      if (!f.length) return;
      if (e.shiftKey && document.activeElement === f[0]) {
        e.preventDefault();
        f[f.length - 1].focus();
      } else if (!e.shiftKey && document.activeElement === f[f.length - 1]) {
        e.preventDefault();
        f[0].focus();
      }
    }
  });

  function showError(msg, el) {
    errorEl.textContent = msg;
    errorEl.classList.add("show");
    if (el) {
      el.setAttribute("aria-invalid", "true");
      el.focus();
    }
  }

  // Clear the error highlight as soon as the visitor fixes a field
  form.addEventListener("input", (e) => {
    const target = e.target.name === "Rating" ? $("#star5") : e.target;
    target.removeAttribute("aria-invalid");
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    errorEl.classList.remove("show");
    $$("[aria-invalid]", form).forEach((el) => el.removeAttribute("aria-invalid"));
    if (form.elements._honey.value) return;

    const rating = $("input[name=Rating]:checked", form);
    if (!rating) return showError("Please choose a star rating.", $("#star5"));
    for (const id of ["r-name", "r-location", "r-text"]) {
      const el = $(`#${id}`);
      if (!el.value.trim()) return showError(`Please fill in: ${$(`label[for=${id}]`).textContent.replace("*", "").trim()}.`, el);
    }
    if (!$("#r-consent").checked) return showError("Please tick the box to allow your review to be shown.", $("#r-consent"));

    const data = {};
    $$("input[name], select[name], textarea[name]", form).forEach((el) => {
      if (el.name.startsWith("_") || ((el.type === "radio" || el.type === "checkbox") && !el.checked)) return;
      if (el.value.trim()) data[el.name] = el.value.trim();
    });
    data.Rating = `${data.Rating} / 5 ${stars(Number(data.Rating))}`;

    submitBtn.disabled = true;
    submitBtn.textContent = "Sending…";
    try {
      await sendForm({ ...data, _subject: `New website review: ${data.Name} (${data.Rating})` });
      form.reset();
      form.hidden = true;
      done.hidden = false;
      done.focus();
      showToast("Review sent — thank you!");
    } catch (err) {
      showError(err.message);
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Submit Review";
    }
  });
})();
