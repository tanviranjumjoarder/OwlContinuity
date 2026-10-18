/* OwlContinuity web demo: the rule checks behind the two owlONE agents, written as plain JavaScript.
   This file does not call any AI model. It replays the agents' workflows with fixed rules so anyone can try them.
   Course data: fictional DEMO-101 (demo_inputs/02, agents/13, agents/13b). */
(function (root) {
  "use strict";

  // ---------- time: America/New_York -> UTC, so the Nov 1 clock change counts ----------
  const TZ = "America/New_York";
  const fmtParts = new Intl.DateTimeFormat("en-US", {
    timeZone: TZ, hourCycle: "h23", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit",
  });
  function offsetMin(ms) {                       // New York local time minus UTC, in minutes
    const p = {};
    for (const x of fmtParts.formatToParts(new Date(ms))) p[x.type] = x.value;
    return (Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour % 24, +p.minute) - ms) / 60000;
  }
  function ny(mo, d, h = 0, mi = 0, y = 2026) {  // New York wall clock -> UTC milliseconds
    const wall = Date.UTC(y, mo - 1, d, h, mi);
    let t = wall;
    for (let i = 0; i < 3; i++) t = wall - offsetMin(t) * 60000;
    return t;
  }
  const HOUR = 3600000;
  const slot = (mo, d, h, mi, minutes) => ({ start: ny(mo, d, h, mi), end: ny(mo, d, h, mi) + minutes * 60000 });
  const point = (mo, d, h, mi) => ({ start: ny(mo, d, h, mi), end: ny(mo, d, h, mi), point: true });

  const dayFmt = new Intl.DateTimeFormat("en-US", { timeZone: TZ, weekday: "short", month: "short", day: "numeric" });
  const timeFmt = new Intl.DateTimeFormat("en-US", { timeZone: TZ, hour: "numeric", minute: "2-digit" });
  const ymdFmt = new Intl.DateTimeFormat("en-CA", { timeZone: TZ, year: "numeric", month: "2-digit", day: "2-digit" });
  const t12 = (ms) => timeFmt.format(new Date(ms)).replace(" AM", " am").replace(" PM", " pm");
  function when(s) {
    const day = dayFmt.format(new Date(s.start)).replace(",", "");
    if (s.point) return `${day}, ${t12(s.start)}`;
    return `${day}, ${t12(s.start).replace(/ [ap]m$/, "")}–${t12(s.end)}`;
  }
  const ymd = (ms) => ymdFmt.format(new Date(ms));
  function gap(ms) {
    const m = Math.round(ms / 60000), neg = m < 0, a = Math.abs(m);
    const h = Math.floor(a / 60), r = a % 60;
    return (neg ? "−" : "") + (r ? `${h} h ${r} m` : `${h} h`);
  }

  // ---------- DEMO-101 syllabus, rules and allowed options (demo_inputs/02_DEMO_Syllabus_Case.txt) ----------
  const MAKEUPS = [slot(10, 22, 10, 0, 50), slot(10, 23, 10, 0, 50), slot(10, 26, 15, 0, 50), slot(10, 27, 10, 0, 50), slot(10, 29, 10, 0, 50)];
  const EVENTS = [
    { key: "evidence", name: "Evidence methods lesson", orig: slot(10, 19, 10, 0, 50), options: MAKEUPS, makeup: true },
    { key: "comparing", name: "Comparing options lesson", orig: slot(10, 21, 10, 0, 50), options: MAKEUPS, makeup: true },
    { key: "lab", name: "Lab (campus equipment room)", orig: slot(10, 23, 13, 0, 110), options: [slot(10, 29, 13, 0, 110)] },
    { key: "quiz", name: "Quiz 1", orig: slot(10, 26, 10, 0, 30), options: [slot(10, 27, 15, 0, 30), slot(10, 29, 15, 0, 30), slot(11, 2, 15, 0, 30)] },
    { key: "memoLesson", name: "Memo lesson", orig: slot(10, 28, 10, 0, 50), options: [], fixed: true },
    { key: "memo", name: "Decision memo due", orig: point(10, 30, 17, 0), options: [point(11, 3, 17, 0)] },
    { key: "workshop", name: "Optional practice workshop", orig: slot(11, 2, 10, 0, 50), options: [], optional: true },
    { key: "review", name: "Review session", orig: slot(11, 4, 10, 0, 50), options: [slot(11, 5, 9, 0, 50)] },
    { key: "final", name: "Final assessment", orig: slot(11, 6, 10, 0, 60), options: [], fixed: true },
  ];
  const LIVE = ["evidence", "comparing", "lab", "quiz", "memoLesson", "workshop", "review", "final"];

  const NOTICES = {
    D0: { label: "Notice D0: closed Mon Oct 19 – Wed Oct 21", from: ny(10, 19), to: ny(10, 22) },
    D1: { label: "Notice D1: closure extended through Fri Oct 23 (the live demo)", from: ny(10, 19), to: ny(10, 24) },
    absent: { label: "Instructor absent Thu Oct 29 (nothing scheduled that day)", from: ny(10, 29), to: ny(10, 30) },
    long: { label: "Stress test: closed Mon Oct 19 – Tue Oct 27", from: ny(10, 19), to: ny(10, 28) },
  };

  const overlaps = (a, b) => a.start < b.end && b.start < a.end;
  const inside = (s, c) => s.start < c.to && (s.point ? s.start >= c.from : s.end > c.from);

  function check(plan, closure) {
    const v = [], P = plan;
    const add = (rule, text) => v.push({ rule, text });
    for (const e of EVENTS) {
      if (e.optional) continue;
      if (inside(P[e.key], closure)) add(8, `${e.name} falls inside the closure.`);
    }
    if (P.evidence.start === P.comparing.start && P.evidence.start !== EVENTS[0].orig.start) add(6, "One make-up time is used twice.");
    if (P.comparing.start < P.evidence.end) add(3, "Comparing lesson must come after the evidence lesson ends.");
    if (P.lab.start - P.evidence.end < 24 * HOUR) add(3, "Lab needs 24 h after the evidence lesson ends.");
    if (P.quiz.start - Math.max(P.evidence.end, P.comparing.end) < 48 * HOUR) add(3, "Quiz 1 needs 48 h after both lessons end.");
    if (P.memo.start - Math.max(P.lab.end, P.memoLesson.end) < 48 * HOUR) add(3, "Memo is due 48 h after the lab and the memo lesson end.");
    if (P.review.start < P.quiz.end || P.review.start < P.memo.start) add(3, "Review comes after Quiz 1 and the memo deadline.");
    if (P.final.start - P.review.end < 24 * HOUR) add(3, "Final needs 24 h after the review ends.");
    const spaced = [["quiz", P.quiz.start], ["memo", P.memo.start], ["final", P.final.start]];
    for (let i = 0; i < 3; i++) for (let j = i + 1; j < 3; j++) {
      const a = spaced[i][1], b = spaced[j][1];
      if (Math.abs(a - b) < 48 * HOUR || ymd(a) === ymd(b)) add(4, `${spaced[i][0]} and ${spaced[j][0]} must be 48 h apart, on different days.`);
    }
    for (let i = 0; i < LIVE.length; i++) for (let j = i + 1; j < LIVE.length; j++) {
      if (overlaps(P[LIVE[i]], P[LIVE[j]])) add(8, `Two live sessions overlap (${LIVE[i]}, ${LIVE[j]}).`);
    }
    return v;
  }

  // Try every allowed combination; keep the valid plan with the fewest changes, then the earliest times.
  // If none is valid, prefer the draft that gets everything out of the closure, so the real blocking rule shows.
  function plan(closure) {
    const choices = EVENTS.map((e) => [e.orig, ...e.options]);
    let best = null;
    const pick = new Array(EVENTS.length);
    (function walk(i) {
      if (i === EVENTS.length) {
        const P = {};
        EVENTS.forEach((e, k) => (P[e.key] = pick[k]));
        const v = check(P, closure);
        const changes = EVENTS.filter((e) => P[e.key] !== e.orig).length;
        const times = EVENTS.map((e) => P[e.key].start);
        const inClosure = v.filter((x) => /inside the closure/.test(x.text)).length;
        const score = [inClosure, v.length - inClosure, changes, ...times];
        if (!best || lexLess(score, best.score)) best = { P, v, changes, score };
        return;
      }
      for (const c of choices[i]) { pick[i] = c; walk(i + 1); }
    })(0);
    const P = best.P;
    const rows = EVENTS.map((e) => {
      const moved = P[e.key] !== e.orig;
      const hit = inside(e.orig, closure);
      let status = "Unchanged";
      if (!e.optional && inside(P[e.key], closure)) {
        const why = e.fixed ? "The professor's rules say this can't move, but it falls inside the closure. The professor decides."
          : "Every allowed time is inside the closure. The professor decides.";
        return { key: e.key, name: e.name, before: when(e.orig), after: "No allowed time", status: "Blocked", why };
      }
      if (e.fixed) status = "Fixed";
      else if (moved) status = hit ? "Moved: direct hit" : "Domino";
      else if (hit && e.optional) status = "Optional: ask the professor";
      return { key: e.key, name: e.name, before: when(e.orig), after: moved ? when(P[e.key]) : "Unchanged", status, why: reason(e, P, closure, hit, moved) };
    });
    return { status: best.v.length ? "NEEDS DECISION" : "DRAFT", plan: P, rows, problems: best.v, checks: timeChecks(P), changes: best.changes };
  }
  const lexLess = (a, b) => { for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return a[i] < b[i]; return false; };

  function reason(e, P, closure, hit, moved) {
    if (e.fixed) return "Professor's rule: cannot move.";
    if (!moved) return hit && e.optional ? "Optional; the professor decides." : "Still meets every rule.";
    if (hit) return "Original time is inside the closure; earliest allowed time that meets the rules.";
    const why = {
      lab: "Lab needs 24 h after the moved evidence lesson.",
      quiz: "Quiz 1 needs 48 h after both moved lessons end.",
      memo: "The original deadline would leave too little time after the lab.",
      review: "Review must come after the quiz and the memo.",
      comparing: "Must come after the moved evidence lesson.",
    };
    return why[e.key] || "Moved to keep the rules.";
  }

  function timeChecks(P) {
    const memoOrig = EVENTS.find((e) => e.key === "memo").orig;
    const rows = [];
    const row = (label, a, b, min, note) => rows.push({ label, from: a, to: b, gap: gap(b - a), min: min === null ? "after" : `${min} h`, pass: min === null ? b >= a : b - a >= min * HOUR, note });
    if (P.memo !== memoOrig) row("Lab end → original memo deadline", P.lab.end, memoOrig.start, 48, "why the memo moved");
    row("Lab end → memo deadline", P.lab.end, P.memo.start, 48);
    row("Memo lesson end → memo deadline", P.memoLesson.end, P.memo.start, 48);
    row("Evidence lesson end → lab start", P.evidence.end, P.lab.start, 24);
    row("Evidence lesson end → comparing lesson start", P.evidence.end, P.comparing.start, null);
    row("Later lesson end → Quiz 1 start", Math.max(P.evidence.end, P.comparing.end), P.quiz.start, 48);
    row("Quiz 1 start → memo deadline", Math.min(P.quiz.start, P.memo.start), Math.max(P.quiz.start, P.memo.start), 48);
    row("Memo deadline → final start", P.memo.start, P.final.start, 48);
    row("Review end → final start", P.review.end, P.final.start, 24);
    return rows;
  }

  function announcement(result) {
    const lines = result.rows.filter((r) => r.after !== "Unchanged").map((r) => `- ${r.name}: ${r.after}`);
    const keep = result.rows.filter((r) => r.after === "Unchanged").map((r) => `- ${r.name}: ${r.before} (unchanged)`);
    if (!lines.length) return "No changes are needed. Every class and deadline stays as posted in the syllabus.";
    return ["DRAFT for the professor to review. Schedule update for DEMO-101:", ...lines, ...keep,
      "This replaces the dates in the syllabus. Please check Canvas Announcements for any later change."].join("\n");
  }

  // ---------- Student Helper: approved answers first, never guess ----------
  const BANK_13B = [
    ["A1", "Can we do the lab online or from home?", "No. The lab needs the equipment in our campus lab room, so it is always in person. If it has to move, I will post the new time in Canvas Announcements.", /\blab\b/, /(online|home|remote|zoom|virtual)/],
    ["A2", "Where do I find the latest schedule?", "Always check Announcements in our Canvas course. I post every schedule change there. Campus open or closed status comes from the university's official announcements, not from me.", /(schedule|announcement|calendar)/, /(where|latest|find|check|see)/],
    ["A3", "Do I have to submit anything while campus is closed?", "No. Nothing is due while classes are suspended. Anything that falls inside the closure will move, and I will post the new dates.", /(closed|closure|suspend|hurricane)/, /(submit|due|turn in|homework|assignment|work)/],
    ["A4", "Is the final exam moving?", "No. The final stays on Friday, November 6 at 10:00 am.", /\bfinal\b/, /(mov|chang|postpon|resched|still|date|when|day|time)/],
    ["A5", "When is the lab?", "The lab is on Thursday, October 29, 1:00-2:50 pm, in the campus equipment room.", /\blab\b/, /(when|time|date|day|moved|where)/],
    ["A6", "Is the Monday workshop required?", "No, it is optional practice. It is a good way to prepare for the final.", /workshop/, /./],
    ["A7", "Is Quiz 1 open-book?", "Quiz 1 stays closed-book, but you may bring one handwritten page of notes.", /quiz/, /(open.?book|notes|closed.?book|cheat sheet)/],
    ["A8", "Can we work in pairs on the memo?", "No. The memo is individual work. You may discuss the lab data with classmates, but write your own memo.", /(pair|partner|together|roommate|group|team|friend|classmate|individual|alone|by myself)/, /(memo|paper)/],
    ["A9", "Is the textbook required?", "No. All readings are posted in Canvas.", /(textbook|text book|\bbook\b)/, /./],
    ["A10", "Can I use AI tools like ChatGPT or Grammarly?", "You may use AI tools to brainstorm ideas and to check grammar. You may not use AI to write any part of the decision memo or to answer quiz questions. If you used AI, add one sentence at the end of your memo saying how.", /(chatgpt|grammarly|\bai\b|artificial intelligence|copilot|gemini)/, /./],
    ["G17", "Do appendices count toward the length limit?", "No. Figures, tables and code in an appendix don't count, but put your key points in the main text, because that's what is graded first.", /appendi/, /(count|length|limit|word|page)/],
    ["G6", "Can I submit a photo of handwritten work?", "No, unless the assignment says handwritten work is allowed. Type it and export it to PDF.", /(handwrit|hand.written|handwriting)/, /./],
    ["G5", "Should I include code or spreadsheets?", "Only if the assignment involves analysis you did with code or a spreadsheet. Put short excerpts or the key output in an appendix of the PDF, not in the main text. If the assignment asks for the files themselves, upload them as extra attachments in the same Canvas submission.", /(code|python|spreadsheet|excel|\br script|script|notebook)/, /./],
    ["G4", "Can I include pictures, charts or screenshots?", "Yes, if they support your point. Put them inside the PDF, give each one a short caption and say where it came from. They don't count toward the word limit, but they can't replace required writing.", /(picture|chart|screenshot|image|graph|figure|diagram|photo)/, /./],
    ["G8", "What if Canvas won't accept my file?", "Screenshot the error, send me the PDF through Canvas Inbox or FAU email before the deadline, then submit in Canvas as soon as it works. Keep the screenshot.", /canvas/, /(won.?t|fail|error|not working|down|crash|accept|broken|upload)/],
    ["G10", "Can I resubmit after I submit?", "Yes, until the deadline. I grade the last submission made before the deadline.", /(resubmit|re-submit|submit again|another version|typo)/, /./],
    ["G9", "How do I know my submission went through?", "Canvas shows a confirmation with the submission time. Open the uploaded file to check it's the right one, and keep a screenshot.", /(went through|go(ne)? through|confirmation|did it (submit|go through)|was it submitted|submission work)/, /./],
    ["G3", "How should I name my file?", "Lastname_AssignmentName.pdf (for example Lee_Memo.pdf), unless the assignment gives a different name.", /(name|call|title)/, /(file|pdf)/],
    ["G2", "What file type should I submit?", "One PDF, unless the assignment says otherwise. Word or Pages files and photos of paper are not accepted as the final submission.", /(file type|format|pdf|\bword\b|docx|pages file|google doc)/, /./],
    ["G1", "How do I submit an assignment?", "Submit in Canvas, in that assignment's submission box, before the due time shown there. Email is only a backup if Canvas fails (see G8).", /^(?!.*\b(late|resubmit|again|anything)\b).*(submit|turn in|hand in|upload|email (you )?(my|the) (assignment|memo|paper|work))/, /(how|where|can i|may i|could i)/],
    ["G11", "Which citation style should I use?", "APA 7 for all written work. Cite every source, including data and images you didn't make yourself.", /(citation|cite|apa|mla|reference|sources)/, /./],
    ["G12", "Do I need a title page?", "No. Put your name, the course, the assignment name and the date at the top of the first page.", /(title page|cover page|cover sheet)/, /./],
    ["G13", "Can I work with classmates?", "You may discuss ideas and course material, but unless an assignment says it is group work, write and submit your own work.", /(classmate|together|group|partner|collaborat)/, /./],
    ["G15", "What if I need to submit late?", "Contact me before the deadline. The late-work rule is in the syllabus, and extensions can't be approved after the deadline without a documented reason.", /(\blate\b|extension|miss(ed)? the deadline|after the deadline)/, /./],
    ["G16", "Where do I find the rubric?", "It is attached to each assignment in Canvas. Read it before you start; it's what I grade with.", /(rubric|how (is|will) .*\bgraded\b|grading criteria|graded on)/, /./],
    ["G18", "How fast will you reply to my messages?", "Within one business day. Message me through Canvas Inbox and put the course and the assignment name in the subject line. A new question for the course FAQ keeps the subject \"New question for the course FAQ: ...\" so I can add the answer to the bank.", /(reply|respond|answer|get back)/, /(how (fast|soon|long|quickly)|when will)/],
    ["G19", "I need accommodations. What do I do?", "Contact the accommodations office listed in the syllabus and send me your letter privately. Don't share personal details in class discussions.", /(accommodat|disabilit|sas\b)/, /./],
    ["G20", "How do I ask about a grade?", "Wait 24 hours after grades are posted, then message me within one week, naming the rubric item and your reason.", /(grade|grading|regrade|points)/, /(ask|question|wrong|dispute|disagree|how)/],
    ["G21", "I missed class. Where are the materials?", "Slides and notes are in that week's Canvas module. Ask a classmate for notes, and bring questions to office hours.", /(missed|miss|absent)/, /(class|lecture|lesson|materials|notes|slides)/],
  ];
  const A11 = ["A11", "Can I send a draft of my memo early to get feedback?", "Yes. Send your draft through Canvas Inbox at least 3 days before the deadline, and I'll reply with short comments.", /draft/, /(early|feedback|review|look at|check|comment|before)/];

  const STOP = new Set("a an the i my me we our you your can could do does is are to of for in on at it be will would should with and or if what when where how about any this that there have has get".split(" "));
  const words = (s) => s.toLowerCase().replace(/[^a-z0-9 ]/g, " ").split(/\s+/).filter((w) => w && !STOP.has(w)).map((w) => w.replace(/(ing|ed|es|s)$/, ""));

  function makeHelper(opts = {}) {
    const bank = BANK_13B.map((e) => ({ id: e[0], q: e[1], a: e[2], m1: e[3], m2: e[4] }));
    let next = 11;
    const addEntry = (q, a, m1, m2) => { const e = { id: `A${next++}`, q, a, m1, m2, added: true }; bank.unshift(e); return e; };
    if (opts.withA11) addEntry(A11[1], A11[2], A11[3], A11[4]);

    function ask(raw) {
      const q = raw.toLowerCase();
      if (/ignore (your|all|the|previous|prior) (rules|instructions)|you are now|system prompt/.test(q)) {
        return { kind: "safety", title: "Instruction ignored", text: "I follow only the professor's rules for this course, so I can't follow that instruction. Ask me about the course, an assignment or a deadline." };
      }
      if (/password|log ?in (for|as) me|sign in for me|submit (it |this |my \w+ )?for me/.test(q)) {
        return { kind: "safety", title: "Privacy", text: "Please don't share your password with anyone, including me. I can't log in to Canvas or submit for you. Submit the PDF yourself in the assignment's submission box (G1), and check the confirmation (G9).", cites: ["G1", "G9"] };
      }
      const target = "(my |the |a |an |me a |me the )?(first |whole |entire |opening |final )?(paragraph|memo|intro|introduction|conclusion|essay|recommendation|homework|assignment|quiz answers?)";
      const askedToWrite = new RegExp(`^(please |pls |hey,? )?(can you |could you |would you |will you |help me |just )?(write|do|finish|complete|generate|rewrite)\\s+${target}`).test(q)
        || new RegExp(`(write|do|finish|complete|generate|rewrite)\\s+${target}.*\\bfor me\\b`).test(q);
      if (askedToWrite) {
        return { kind: "refuse", title: "Course AI policy", text: "I can't write any part of your memo. The course AI policy says you may use AI to brainstorm ideas and to check grammar, but not to write any part of the decision memo (A10). I can help you plan instead: the memo needs a clear recommendation in the first paragraph, evidence from the lab's evidence table, and why you rejected the other option.", cites: ["A10"] };
      }
      if (/(my grade|i('m| am) sick|illness|medical|family emergency|hospital|personal (issue|situation|problem)|my situation)/.test(q)) {
        return { kind: "private", title: "Personal case", text: "This is a personal matter, so it goes privately to your professor and stays out of the answer bank. Send a short message through Canvas Inbox. You don't need to share medical details; say what you need and by when.", draft: { subject: "DEMO-101: personal request", body: "Hello Professor,\n\nI have a personal situation that affects my work in DEMO-101. Could we talk about my options?\n\nThank you,\n[Your name]" } };
      }
      // course-specific answers outrank general rules
      const hit = (e) => e.m1.test(q) && e.m2.test(q);
      const custom = bank.filter((e) => e.added && !e.m1).find((e) => similar(raw, e.q));
      if (custom) return answer(custom);
      const a11 = bank.find((e) => e.added && e.m1 && hit(e));
      if (a11) return answer(a11);
      if (/\b(memo|assignment|paper)\b/.test(q) && /(due|deadline|when)/.test(q) && !/(early|draft)/.test(q)) {
        return { kind: "answer", title: "Course pack: Oct 20 announcement", text: "The decision memo is now due Tuesday, November 3 at 5:00 pm in Canvas. The October 20 announcement replaces the original Friday, October 30 date in the syllabus and the assignment.", cites: ["Announcement, Oct 20"] };
      }
      if (/(how long|length|how many (pages|words)|word (limit|count)|page (limit|count)|pages long)/.test(q) && !/appendi/.test(q)) {
        return { kind: "conflict", title: "Two instructions disagree", text: "Follow the length in the prompt and rubric (G7), but here they disagree: the prompt says \"2-3 pages\" and the rubric says \"maximum 600 words\". I won't pick one for you. Ask the professor before you start.", cites: ["G7"], draft: { subject: "DEMO-101 - Decision Memo length", body: "Hello Professor,\n\nThe prompt says the memo should be 2-3 pages, while the rubric says a maximum of 600 words. Which length should I follow?\n\nThank you,\n[Your name]" } };
      }
      if (/(reading|article|where.*read|what.*read)/.test(q)) {
        return { kind: "answer", title: "Course pack: readings", text: "Reading 1 is OpenStax, Principles of Management, section 2.1 \"Overview of Managerial Decision-Making\". Canvas: Modules → Week 1 → Readings → Reading 1. Link, exactly as the instructor posted it: https://openstax.org/books/principles-management/pages/2-1-overview-of-managerial-decision-making\n\nReading 2 says \"find one article about business decision-making\" but gives no source, location or link. Search FAU Libraries (library.fau.edu) and cite it in APA 7 (G22, G11). If you're unsure what counts, ask the professor.", cites: ["G22", "G11"] };
      }
      for (const e of bank) if (e.m1 && !e.added && hit(e)) return answer(e);
      return newQuestion(raw);
    }
    function newQuestion(raw) {                     // never guess: draft a tagged message for the professor
      const subject = "New question for the course FAQ: " + raw.trim().replace(/\?*$/, "?");
      return { kind: "new", title: "That's a new question", text: "Your instructor hasn't answered this yet, so I can't confirm it. Once they reply, the answer can be added to the answer bank, and the next student will get it right away. Until then, wait for their reply or a Canvas announcement.", question: raw.trim(), draft: { subject, body: `Hello Professor,\n\n${raw.trim()}\n\nThank you,\n[Your name]\n[Course + section]` } };
    }
    function answer(e) {
      return { kind: "answer", title: `From your instructor's answers (${e.id})`, text: e.a, cites: [e.id], entry: e };
    }
    function similar(a, b) {
      const A = new Set(words(a)), B = new Set(words(b));
      let shared = 0; for (const w of B) if (A.has(w)) shared++;
      return B.size && (shared / B.size >= 0.6 || shared >= 3);
    }
    function approve(question, answerText) {        // Instructor Desk: professor answers once -> next ID
      return addEntry(question, answerText);
    }
    return { ask, approve, asNew: newQuestion, bank: () => bank.slice().sort((x, y) => order(x.id) - order(y.id)) };
  }
  const order = (id) => (id[0] === "A" ? 0 : 1000) + parseInt(id.slice(1), 10);

  const api = { ny, gap, when, NOTICES, EVENTS, plan, announcement, makeHelper, HOUR };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.OwlContinuity = api;
})(typeof window !== "undefined" ? window : globalThis);
