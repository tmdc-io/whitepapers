/* Data Modeling Patterns: shared book script.
   One contents list drives the sidebar, Previous and Next, the landing cards,
   and the Strengths and limits strips. A page declares itself with
   <body data-root="../" data-chapter="07">. */
(function () {
  "use strict";

  var BOOK = {
    title: "Data Modeling Patterns",
    parts: [
      { name: "Front matter", items: [
        { id: "front", n: "", title: "How to read this book", path: "front/how-to-read.html", ready: true, blurb: "Who the book is for, and how the chapters work." }
      ]},
      { name: "Part I · Foundations", items: [
        { id: "01", n: "1", title: "Why a warehouse needs a model", path: "part-1/01-why-a-model.html", ready: true, blurb: "Operational and analytical data, and what a model decides." },
        { id: "02", n: "2", title: "Lantern Pet Supply", path: "part-1/02-lantern-pet-supply.html", ready: true, blurb: "The case study: one retailer, seven source systems." },
        { id: "03", n: "3", title: "Core concepts", path: "part-1/03-core-concepts.html", ready: true, blurb: "Facts, dimensions, grain, keys, and normal forms." },
        { id: "04", n: "4", title: "Time and history", path: "part-1/04-time-and-history.html", ready: true, blurb: "Business time, record time, and bitemporal data." },
        { id: "05", n: "5", title: "The twelve stress tests", path: "part-1/05-stress-tests.html", ready: true, blurb: "The events every pattern must survive, and how they are scored." }
      ]},
      { name: "Part II · The patterns", items: [
        { id: "06", n: "6", title: "The normalized warehouse", path: "part-2/06-normalized.html", ready: true, blurb: "Inmon, third normal form, and dependent marts.", pattern: "normalized" },
        { id: "07", n: "7", title: "Dimensional modeling: the star schema", path: "part-2/07-dimensional-modeling.html", ready: true, blurb: "Kimball, facts and dimensions, the bus matrix, and galaxies.", pattern: "star" },
        { id: "08", n: "8", title: "Advanced dimensional techniques", path: "part-2/08-advanced-dimensional.html", ready: true, blurb: "SCD types, bridges, mini-dimensions, and bitemporal type 2." },
        { id: "09", n: "9", title: "The snowflake schema", path: "part-2/09-snowflake.html", ready: true, blurb: "Normalized dimensions and their join chains.", pattern: "snowflake" },
        { id: "10", n: "10", title: "One big table", path: "part-2/10-one-big-table.html", ready: true, blurb: "Every attribute on every row.", pattern: "obt" },
        { id: "11", n: "11", title: "Data Vault: the core", path: "part-2/11-data-vault-core.html", ready: true, blurb: "Hubs, links, satellites, hashing, and loading.", pattern: "vault" },
        { id: "12", n: "12", title: "Data Vault: advanced", path: "part-2/12-data-vault-advanced.html", ready: true, blurb: "Special satellites and links, PIT tables, and the business vault." },
        { id: "13", n: "13", title: "Anchor modeling", path: "part-2/13-anchor.html", ready: true, blurb: "Sixth normal form: one table per attribute.", pattern: "anchor" },
        { id: "14", n: "14", title: "Activity schema", path: "part-2/14-activity-schema.html", ready: true, blurb: "One narrow table of customer events.", pattern: "activity" },
        { id: "15", n: "15", title: "Unified star schema", path: "part-2/15-unified-star-schema.html", ready: true, blurb: "One central bridge that links every fact.", pattern: "uss" }
      ]},
      { name: "Part III · Compare and choose", items: [
        { id: "16", n: "16", title: "All patterns side by side", path: "part-3/16-side-by-side.html", ready: true, blurb: "The full scorecard, with the reasoning for every result." },
        { id: "17", n: "17", title: "Hybrid architectures", path: "part-3/17-hybrid.html", ready: true, blurb: "Combining patterns in layers." },
        { id: "18", n: "18", title: "Choosing a pattern", path: "part-3/18-choosing.html", ready: true, blurb: "A decision guide by situation." }
      ]},
      { name: "Appendices", items: [
        { id: "A", n: "A", title: "Glossary", path: "appendix/glossary.html", ready: true },
        { id: "B", n: "B", title: "SQL notes", path: "appendix/sql-notes.html", ready: true },
        { id: "C", n: "C", title: "Sources", path: "appendix/sources.html", ready: true }
      ]}
    ]
  };

  var TESTS = ["New source", "Key conflict", "Attribute history", "Relationship change", "Schema change", "Late data", "Audit", "Rule change", "Recall trace", "Multi-active data", "Fast simple query", "Delete versus retain"];

  /* Strengths and limits: 2 = Good, 1 = Costly, 0 = Fails. Chapter 16 holds the full reasoning. */
  var SCORES = {
    anchor: [
      [1, "Happy Tails customers must be matched to existing anchors, or given new ones, while they load. Identity is decided at load time."],
      [1, "One anchor per customer. Source keys become attribute values, and a wrong match means moving attribute rows to another anchor."],
      [2, "Every historized attribute keeps its own history, and a change to one attribute copies nothing else."],
      [2, "Ties are many-to-many and can be historized. A second owner is a new tie row."],
      [2, "A new column is a new attribute table. No existing table ever changes."],
      [2, "Rows insert with their own changing time. A correction is a new row."],
      [2, "The bitemporal and concurrent-reliance-temporal variants keep when each value was recorded, and by which source."],
      [1, "There is no separate layer for rules. Derived values become new attributes, and both versions must be kept by hand."],
      [1, "Ties connect lot, sale, and customer, but Happy Tails history must be matched to anchors first."],
      [2, "An attribute table holds several rows per anchor, such as several phones."],
      [1, "The generated views make queries short, and join elimination keeps them fast. A query that needs many attributes still joins many tables."],
      [1, "Personal attributes sit in their own tables, so deletion is targeted, but it breaks the insert-only rule."]
    ],
    activity: [
      [1, "New activities from Happy Tails add rows, not tables, but each row needs the global customer ID, so identity work happens first."],
      [1, "The stream keeps one global customer column. The anonymous ID links source keys, but only after someone decides the match."],
      [2, "A change is an activity, such as updated_address. A last-before join gives the value on any date."],
      [1, "Each stream models one entity. A pet with two owners needs pet activities in a second stream, or the pet in the features of each owner."],
      [2, "A new source field goes into feature_json. No table changes."],
      [2, "Activities are immutable rows with their own time. Late rows and corrections are new activities."],
      [1, "The stream records when each activity happened, not when it was loaded, unless a load-time column is added. Payroll needs its own stream."],
      [2, "Rules are queries over immutable activities. Old and new definitions of an active customer run side by side."],
      [1, "Works if the lot number is a feature of each purchase activity. Happy Tails history needs its customers stitched first."],
      [1, "Several phones are several activities or a list in the features. Reading the current set needs a temporal join per value."],
      [2, "Revenue by store and month reads one table, with the store in the features and revenue_impact as the measure."],
      [2, "Every row for a customer sits in one table under one key, so deletion is one statement. Employee data lives in another stream."]
    ],
    uss: [
      [1, "Same as the star: the shared customer dimension absorbs the new keys, and the bridge gains new stages."],
      [1, "Same as the star. A wrong match splits sales across keys and needs a reload."],
      [2, "Type 2 dimensions keep every version, as in chapter 8."],
      [1, "A second owner needs a new stage or key in the bridge, and a change to the grooming fact."],
      [1, "A new dimension column. The renamed column breaks the load, and the bridge may need a rebuild."],
      [1, "Late facts need the right dimension version, and the bridge rebuilds the affected stages."],
      [1, "Bitemporal type 2, as in chapter 8, at the same cost."],
      [1, "Recalculate, or keep both definitions as two columns."],
      [1, "Works if the lot is on the sales fact. Happy Tails history needs a backfill."],
      [1, "A bridge table or a separate dimension, as in the star."],
      [2, "One bridge, joins of one hop each, and multi-fact questions in one query without double counting."],
      [1, "Type 2 copies the customer into many rows, as in the star."]
    ],
    vault_raw: [
      [2, "Happy Tails keys land in the customer hub with their own record source. New satellites hold their attributes. No existing table changes."],
      [1, "All of Maria's keys sit in the hub, but nothing says which keys are one person until same-as links arrive (chapter 12)."],
      [2, "Satellites insert a row per change, with the load time and the business dates."],
      [2, "Links are many-to-many from the start. A second owner is one new link row."],
      [2, "The new column goes into a new satellite. The rename changes one stage mapping."],
      [2, "Late rows insert with today's load time and keep their business date. A correction is a new row next to the original."],
      [2, "Every row carries its load time and record source. Filter on load time to see what was on record on any date."],
      [1, "The raw data never changes, but the rules live in reports until the business vault exists (chapter 12)."],
      [2, "The sale-line link connects lot, order, and store, and Happy Tails history loads raw. The trace finds every buyer by source key."],
      [1, "A plain satellite keeps one value per key per load. Several phones need a multi-active satellite (chapter 12)."],
      [0, "Revenue by store and month needs hubs, links, satellites, and newest-row logic. Analysts need PIT tables and marts (chapter 12)."],
      [1, "Insert-only storage conflicts with deletion. Personal data in its own satellites makes deletion targeted (chapter 12)."]
    ],
    vault: [
      [2, "New keys land in existing hubs with their own record source, and new satellites hold their attributes. No existing table changes."],
      [2, "All keys stay in the hub. A same-as link records which keys are one person, and a wrong match is ended with new rows."],
      [2, "Satellites insert a row per change. Fast-changing values get their own satellite."],
      [2, "Links are many-to-many, and an effectivity satellite records when each ownership starts and ends."],
      [2, "New columns go into new satellites. Old rows and old queries stay as they are."],
      [2, "Late rows and corrections are new rows, with their load time and business dates."],
      [2, "Load time and record source on every row show what was on record on any date, and where it came from."],
      [2, "Rule versions live side by side in the business vault, so old reports reproduce exactly."],
      [2, "The sale-line link and same-as links connect a lot to every buyer, across all channels and years."],
      [2, "Multi-active satellites hold several current values per key."],
      [2, "Analysts query information marts and PIT tables built on the vault. The raw vault alone fails this test."],
      [1, "Insert-only storage bends for deletion: personal-data satellites are deleted or crypto-shredded on request, and pay data stays."]
    ],
    normalized: [
      [1, "Happy Tails customers and product codes must be matched into the integrated tables before they load. The core changes little, but the load waits."],
      [1, "The core holds one integrated customer. Source keys survive in a key cross-reference table. A wrong match is hard to undo."],
      [1, "History exists only where the design added effective-dated child tables. Other columns keep the current value."],
      [1, "An owner column on the pet table becomes an associative table. Rows migrate and queries change."],
      [1, "An existing table gets a new column. The renamed column breaks the load until the mapping is fixed."],
      [1, "Late rows insert. A corrected timesheet updates the row in place, so the original hours are lost unless an audit table keeps them."],
      [0, "The core holds today's integrated view. It cannot show what it had on record on a past date."],
      [1, "Derived values are recalculated. The old meaning survives only if someone saved the old results."],
      [1, "Lantern sales carry the lot. Happy Tails history from before the acquisition was never integrated."],
      [2, "Child tables hold many phones or pets per customer. This is what normalization does well."],
      [2, "Analysts query the dependent marts, which are stars. The core alone needs many joins."],
      [1, "Personal data lives once in the core, but the marts copy it. Delete in the core, keep pay rows, and rebuild the marts."]
    ],
    star_basic: [
      [1, "The conformed customer dimension must absorb the new keys, and every fact load needs new key lookups."],
      [1, "One dimension row per matched person. A wrong match splits sales across keys and needs a fact reload."],
      [0, "With only this chapter's techniques, a changed attribute overwrites the old value (type 1). Chapter 8 adds type 2."],
      [0, "Grooming facts carry one owner key. A second owner has nowhere to go without a bridge table (chapter 8)."],
      [1, "A new dimension column. The renamed column breaks the load mapping."],
      [1, "Inferred members handle facts that arrive before their dimension. Late facts load normally."],
      [0, "Rows are overwritten. Nothing shows what the star held on a past date."],
      [1, "Recalculate the flag on every row, or keep both definitions as two columns."],
      [1, "Works because the lot number is on the sales fact. Happy Tails history needs a backfill."],
      [0, "Several phones or pets per customer do not fit one dimension row without a bridge (chapter 8)."],
      [2, "One fact, a few joins of one hop each."],
      [1, "Mask the customer row in place. Fewer copies than type 2, but the history is gone anyway."]
    ],
    snowflake: [
      [1, "Same as the star: the customer dimension absorbs new keys, and there are more chained tables to map."],
      [1, "Same as the star. A wrong match splits sales across keys and needs a fact reload."],
      [2, "Type 2 history on each table in the chain. A category change versions one row, not every product."],
      [1, "A bridge table, as in the star, and a change to the grooming fact."],
      [1, "The new column goes into one table of the chain. The rename breaks the load."],
      [1, "Late facts need the right version of every table in the chain."],
      [1, "Bitemporal type 2 on each table of the chain, at more cost than in a star."],
      [1, "Recalculate, or keep both definitions as two columns."],
      [1, "Works if the lot is on the fact. Happy Tails history needs a backfill."],
      [1, "A bridge table, as in the star."],
      [1, "Each label sits at the end of a join chain. Queries are longer than on a star."],
      [1, "Shared values live once, so there are fewer copies than in a star, but versioned customer rows still need masking."]
    ],
    obt: [
      [1, "New columns and new matching logic, then a full rebuild of the table."],
      [1, "The chosen identity is copied into every row. A wrong match is fixed upstream, then the table is rebuilt."],
      [1, "Each row freezes values at build time. History needs dated lookups in the build, or snapshot tables."],
      [1, "Two owners per grooming row need an array column or allocation columns, and a rebuild."],
      [1, "Add a column and rebuild. The rename breaks the build until it is fixed."],
      [1, "Rebuild the date partitions that the late rows touch."],
      [0, "No record of what the table held before each rebuild."],
      [1, "Rebuild every row with the new rule. The old meaning is gone unless a second column keeps it."],
      [1, "Works if the lot column exists and Happy Tails rows were built into it."],
      [1, "Several phones or pets per customer need array columns. Without them, rows multiply and sums break."],
      [2, "No joins at all."],
      [1, "Customer data is copied into every sales row. Deletion rewrites a large part of the table."]
    ],
    star: [
      [1, "The conformed customer dimension must absorb Happy Tails keys, and every fact load needs new key lookups."],
      [1, "One dimension row per matched person. A wrong match splits sales across keys and needs a fact reload."],
      [2, "SCD type 2 keeps every version, and each fact points to the version valid at the time (chapter 8)."],
      [1, "Two owners per pet need a bridge table and a change to the grooming fact's grain (chapter 8)."],
      [1, "A new dimension column needs an SCD decision. The renamed column breaks the load mapping."],
      [1, "Late facts need the dimension version valid on their date. Unknown customers get inferred members."],
      [1, "Bitemporal type 2 keeps record time, at the cost of a second pair of dates on every row (chapter 8)."],
      [1, "Recalculate the flag on every row, or keep the old and new definitions as two columns."],
      [1, "Works if the lot number is on the sales fact. Happy Tails history needs a backfill."],
      [1, "Several phones or pets per customer need a bridge table or a separate dimension."],
      [2, "One fact, a few joins of one hop each. This is what the star is for."],
      [1, "Type 2 copies the customer into many rows, and every version must be masked."]
    ]
  };

  var body = document.body;
  var root = body.getAttribute("data-root") || "";
  var current = body.getAttribute("data-chapter") || "";
  var flat = [];
  BOOK.parts.forEach(function (p) { p.items.forEach(function (it) { it.part = p.name; flat.push(it); }); });
  function byId(id) { for (var i = 0; i < flat.length; i++) if (flat[i].id === id) return flat[i]; return null; }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function label(it) { return (it.n ? it.n + " · " : "") + it.title; }

  /* ---------- toast for chapters that do not exist yet ---------- */
  var toastTimer;
  function toast(msg) {
    var t = document.querySelector(".toast");
    if (!t) { t = document.createElement("div"); t.className = "toast"; t.setAttribute("role", "status"); document.body.appendChild(t); }
    t.textContent = msg; t.hidden = false;
    clearTimeout(toastTimer); toastTimer = setTimeout(function () { t.hidden = true; }, 2600);
  }
  function markSoonLinks(scope) {
    [].slice.call((scope || document).querySelectorAll("a[href]")).forEach(function (a) {
      var href = a.getAttribute("href");
      if (a.hasAttribute("data-soon-done") || /^(https?:|#|mailto:)/.test(href)) return;
      a.setAttribute("data-soon-done", "");
      var clean = href.split("#")[0].replace(/^(\.\.\/)+/, "").replace(/^\.\//, "");
      var it = null;
      for (var i = 0; i < flat.length; i++) if (flat[i].path === clean || clean.slice(-flat[i].path.length) === flat[i].path) it = flat[i];
      if (it && !it.ready) {
        a.classList.add("soon");
        a.setAttribute("title", "Coming soon");
        a.addEventListener("click", function (e) { e.preventDefault(); toast("Chapter " + (it.n || "") + " " + it.title + " is coming soon."); });
      }
    });
  }

  /* ---------- sidebar ---------- */
  function buildToc() {
    var toc = document.getElementById("bookToc");
    if (!toc) return;
    var html = '<a class="book-title" href="' + root + 'index.html">' + esc(BOOK.title) + '</a><div class="book-sub">Field guide · Animesh</div>';
    BOOK.parts.forEach(function (p) {
      html += '<div class="toc-part">' + esc(p.name) + "</div>";
      p.items.forEach(function (it) {
        var here = it.id === current;
        html += '<a href="' + root + it.path + '"' + (here ? ' class="here" aria-current="page"' : "") + ">" + esc(label(it)) + "</a>";
      });
    });
    toc.innerHTML = html;
    markSoonLinks(toc);
  }

  function currentLabel() {
    var cur = document.getElementById("tocCurrent"), it = byId(current);
    if (cur && it) cur.textContent = label(it);
  }

  function mobileMenu() {
    var nav = document.querySelector(".book-nav"), btn = nav && nav.querySelector(".toc-toggle");
    if (!btn) return;
    function set(o) { nav.classList.toggle("open", o); btn.setAttribute("aria-expanded", o ? "true" : "false"); }
    btn.addEventListener("click", function () { set(!nav.classList.contains("open")); });
    nav.addEventListener("click", function (e) { if (e.target.closest(".book-toc a")) set(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && nav.classList.contains("open")) { set(false); btn.focus(); } });
  }

  /* ---------- previous and next ---------- */
  function buildChapterNav() {
    var el = document.getElementById("chNav");
    if (!el) return;
    var i = -1; for (var k = 0; k < flat.length; k++) if (flat[k].id === current) i = k;
    if (i < 0) return;
    function cell(it, dir, cls) {
      if (!it) return "";
      var inner = '<span class="dir">' + dir + (it.ready ? "" : " · coming soon") + "</span>" + esc(label(it));
      return '<a class="' + cls + '" href="' + root + it.path + '">' + inner + "</a>";
    }
    el.innerHTML = cell(flat[i - 1], "Previous", "prev") + cell(flat[i + 1], "Next", "next");
    markSoonLinks(el);
  }

  /* ---------- strengths and limits strip ---------- */
  var CHIP = [["c-fail", "Fails"], ["c-cost", "Costly"], ["c-good", "Good"]];
  function buildStrips() {
    [].slice.call(document.querySelectorAll(".strip-wrap[data-pattern]")).forEach(function (wrap) {
      var key = wrap.getAttribute("data-pattern"), s = SCORES[key];
      if (!s) return;
      var ch16 = byId("16");
      var g = s.filter(function (x) { return x[0] === 2; }).length, c = s.filter(function (x) { return x[0] === 1; }).length, f = s.filter(function (x) { return x[0] === 0; }).length;
      wrap.innerHTML =
        '<div class="strip-head">The twelve stress tests · ' + g + " good, " + c + " costly, " + f + " fail</div>" +
        '<div class="strip" role="group" aria-label="Stress test results">' + s.map(function (x, i) {
          return '<button type="button" aria-pressed="false" data-i="' + i + '"><span><span class="n">' + (i + 1) + "</span>" + esc(TESTS[i]) + '</span><span class="chip ' + CHIP[x[0]][0] + '">' + CHIP[x[0]][1] + "</span></button>";
        }).join("") + "</div>" +
        '<div class="strip-out" aria-live="polite">Select a test to see the short reason. The full reasoning is in <a href="' + root + ch16.path + "#" + key + '">chapter 16</a>.</div>' +
        '<div class="legend"><span><span class="chip c-good">Good</span> new rows or tables only</span><span><span class="chip c-cost">Costly</span> changes to existing tables, or a reload</span><span><span class="chip c-fail">Fails</span> loses information or needs a redesign</span></div>';
      var out = wrap.querySelector(".strip-out");
      [].slice.call(wrap.querySelectorAll(".strip button")).forEach(function (b) {
        b.addEventListener("click", function () {
          var i = +b.getAttribute("data-i");
          [].slice.call(wrap.querySelectorAll(".strip button")).forEach(function (o) { o.setAttribute("aria-pressed", o === b ? "true" : "false"); });
          out.innerHTML = "<strong>Test " + (i + 1) + " · " + esc(TESTS[i]) + ":</strong> " + esc(s[i][1]) + ' <a href="' + root + "part-1/05-stress-tests.html#t" + (i + 1) + '">Test definition</a> · <a href="' + root + ch16.path + "#" + key + "-t" + (i + 1) + '">Full reasoning in chapter 16</a>';
          markSoonLinks(out);
        });
      });
      markSoonLinks(wrap);
    });
  }

  /* ---------- landing cards ---------- */
  function buildCards() {
    [].slice.call(document.querySelectorAll("[data-cards]")).forEach(function (box) {
      var want = box.getAttribute("data-cards");
      var p = BOOK.parts.filter(function (x) { return x.name.indexOf(want) === 0; })[0];
      if (!p) return;
      box.innerHTML = p.items.map(function (it) {
        var inner = '<span class="cn">' + (it.n ? "Chapter " + it.n : "Front matter") + '</span><span class="ct">' + esc(it.title) + "</span>" + (it.blurb ? '<span class="cd">' + esc(it.blurb) + "</span>" : "") + '<span class="st">' + (it.ready ? "Ready to read" : "Coming soon") + "</span>";
        return '<a class="card' + (it.ready ? "" : " soon") + '" href="' + root + it.path + '">' + inner + "</a>";
      }).join("");
      markSoonLinks(box);
    });
  }

  buildToc();
  buildChapterNav();
  buildStrips();
  buildCards();
  markSoonLinks(document.querySelector("main"));
  mobileMenu();
  currentLabel();

  window.Book = { data: BOOK, tests: TESTS, scores: SCORES, esc: esc };
})();
