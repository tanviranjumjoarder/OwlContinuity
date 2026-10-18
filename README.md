<div align="center">

# OwlContinuity

### When a class moves, which deadlines must move too?

AI agents I built inside **owlONE**, FAU's generative AI platform, on the **gpt-6-luna** model. One rebuilds a disrupted course schedule and checks every linked deadline with code. One answers students only from what the professor has approved. A third runs the same workflow on a real FAU syllabus.

![FAU owlONE Promptathon](https://img.shields.io/badge/FAU%20owlONE-Promptathon%202026-003366)
![Track 4](https://img.shields.io/badge/Track%204-AI%20to%20improve%20FAU-1E7B45)
![Model](https://img.shields.io/badge/model-gpt--6--luna-555)
![Main tests](https://img.shields.io/badge/main%20tests-31%20pass%20%C2%B7%202%20partial%20%C2%B7%200%20fail-1E7B45)
![Real syllabus](https://img.shields.io/badge/real%20FAU%20syllabus-17%2F17-1E7B45)
![Status](https://img.shields.io/badge/status-prototype-B07A1E)
![License](https://img.shields.io/badge/license-MIT%20%2B%20CC%20BY%204.0-555)

### [▶ Try the live demo](https://tanviranjumjoarder.github.io/OwlContinuity/) · [▶ Watch the video](https://tanviranjumjoarder.github.io/OwlContinuity/#video) · [▶ Interactive walkthrough](https://tanviranjumjoarder.github.io/OwlContinuity/how-it-works.html)

[**Slides (22)**](deck/OwlContinuity_Presentation.pdf) · [**Detailed deck (49)**](deck/OwlContinuity_Detailed_Deck.pdf) · [**How it works**](#how-it-works) · [**Results**](#test-results) · [**Try it yourself**](#try-it-yourself) · [**Limits**](#limits-and-what-i-do-not-claim)

<img src="docs/images/01_title.png" alt="OwlContinuity title slide" width="820">

</div>

> [!NOTE]
> All course data in the demo (DEMO-101) is fictional, and the closure notices are simulated; FAU did not issue them. One test set uses a real, public FAU graduate syllabus. I call that course **DEMO-202** here and do not name the real course. For that course, the exact class days, rules and approved answers are values I set for testing, not the instructor's decisions. Nothing here is FAU policy or an FAU-approved product.

---

## The whole process in 24 seconds

<a href="https://tanviranjumjoarder.github.io/OwlContinuity/how-it-works.html"><img src="docs/images/owlcontinuity_process.svg" alt="Animation: a closure notice reaches Instructor Desk, the lab moves, the memo deadline fails the 48-hour rule, code moves it to Tue Nov 3 as a draft, a student asks a new question, the professor answers once, and the next student gets answer A11." width="100%"></a>

<sub>The animation plays on its own. **[Open the interactive version](https://tanviranjumjoarder.github.io/OwlContinuity/how-it-works.html)** to pause it, drag the timeline, jump to any step, change the speed, or switch on *Explain like I'm 5*.</sub>

<details>
<summary><b>Explain it like I'm 5</b></summary>
<br>

| | |
|---|---|
| 📄 **1. Notice** | A storm closes school for a week. The teacher gives the helper robot three papers: the calendar, the rules, and the storm news. |
| 🔍 **2. Find the hits** | The robot circles every class that lands on a closed day. |
| 💥 **3. Domino** | Moving one class is like pushing the first domino. The lab moves to Thursday, and now the homework is due too soon after it. |
| 🧮 **4. Check + draft** | The robot counts the hours with a calculator instead of guessing. It moves the homework to Tuesday, keeps the big test where it is, and asks the teacher: "Is this OK?" |
| 🙋 **5. Student asks** | A student asks something the teacher never answered. The robot says "I don't know yet" instead of making something up, and writes a note to the teacher. |
| 📚 **6. Answer once** | The teacher answers once. The answer goes into the big book of answers, so the next student who asks gets it right away. |

</details>

## Two ways to see OwlContinuity

| | **In owlONE** (what I built and presented) | **On GitHub** (for anyone) |
|---|---|---|
| What it is | Three personal owlONE agents working as one system: Instructor Desk, Student Helper, and a real-syllabus agent | A [live demo](https://tanviranjumjoarder.github.io/OwlContinuity/) and an [interactive walkthrough](https://tanviranjumjoarder.github.io/OwlContinuity/how-it-works.html) |
| AI | **Yes:** gpt-6-luna reads syllabi, notices and questions in everyday words | **No AI model:** the same rules replayed in JavaScript |
| Time math | The agent runs code (Data & File Tools) | The page runs the same calculation in the browser |
| Who can use it | Only the owner's FAU account today (personal agents) | Anyone with a browser |
| Evidence | Live runs on Oct 16–17, 2026, saved word for word in [`results/`](results) | Reproduces the DEMO-101 plan from those runs |
| Rebuild it | [How I built the agents in owlONE](#how-i-built-the-agents-in-owlone) | [`docs/`](docs) (MIT license) |

## At a glance

| | |
|---|---|
| **Problem** | A cancelled class moves more than one date. A lab feeds an assignment, and the assignment must leave time before an exam. The professor rechecks every link by hand while students ask the same questions again and again. |
| **What I built** | **Instructor Desk** for the professor, which contains the **Domino Effect Agent**. **Student Helper** for students. A third agent runs the same workflow on a real FAU syllabus. All three are personal owlONE agents working as one system. |
| **What makes it different** | Every time gap is calculated with code in `America/New_York` and converted to UTC, so the Nov 1 clock change counts. The agent returns a **draft**, or stops and asks when a fact is missing. |
| **Evidence** | 31 pass, 2 partial, 0 fail on 33 checks · 7/7 assignment-rule questions · 3/3 reading tests · 17/17 on a real FAU syllabus. All are tests I wrote, saved word for word in [`results/`](results). |
| **Next step** | A supervised pilot with 2–3 volunteer professors. |

## Try it in your browser

The [**live demo**](https://tanviranjumjoarder.github.io/OwlContinuity/) runs both agents' workflows on the fictional DEMO-101 course:

- **Domino Effect Agent:** pick a closure notice, or set your own dates. The page rebuilds the schedule from the professor's make-up slots, rechecks every gap in `America/New_York` time with the Nov 1 clock change, and returns a **DRAFT**. When no plan fits every rule, it says **NEEDS DECISION** and names the blocking rule.
- **Student Helper:** ask a question. It answers from the approved bank with the source ID (A4, G5), shows both instructions when they conflict, declines to write graded work, and turns an unanswered question into a tagged message. You can then play the professor, approve an answer, and watch it become **A11** for the next student.

> [!IMPORTANT]
> The demo runs **no AI model**. The real agents run inside owlONE, which only FAU accounts can reach. The page replays the same rules in plain JavaScript ([`docs/owlcontinuity.js`](docs/owlcontinuity.js)), so it answers the same way every time. Its DEMO-101 plan matches the live owlONE run: the lab moves to Thu Oct 29, the memo moves from 26 h 10 m (FAIL) to 123 h 10 m (PASS) on Tue Nov 3, and the final stays fixed.

<table>
<tr>
<td width="50%"><a href="https://tanviranjumjoarder.github.io/OwlContinuity/"><img src="docs/images/demo_domino.jpg" alt="Demo: the Domino Effect Agent's revised schedule"></a></td>
<td width="50%"><a href="https://tanviranjumjoarder.github.io/OwlContinuity/"><img src="docs/images/demo_helper.jpg" alt="Demo: the Student Helper answers with A11 after the professor approves it"></a></td>
</tr>
<tr>
<td align="center"><sub>Domino Effect Agent: closure extended to Fri Oct 23</sub></td>
<td align="center"><sub>Student Helper: a new question becomes A11</sub></td>
</tr>
</table>

### Watch the 27-second video

<table>
<tr>
<td width="42%"><a href="https://tanviranjumjoarder.github.io/OwlContinuity/#video"><img src="docs/media/owlcontinuity_video_cover.jpg" alt="Video cover: the lab moves to Thursday and the memo is due only 26 h 10 m later. Click to play."></a></td>
<td>

**[▶ Play the video](https://tanviranjumjoarder.github.io/OwlContinuity/#video)** (opens the demo page)

The whole process in six steps, with captions and no sound:

1. The closure notice reaches Instructor Desk.
2. It finds the cancelled classes.
3. The lab moves, and the memo deadline breaks: **26 h 10 m**.
4. Code moves the memo to Tuesday: **123 h 10 m, PASS**.
5. A student asks something new, and Student Helper won't guess.
6. The professor answers once, and it becomes **A11**.

The QR code at the end opens the live demo. [Download the MP4](docs/media/owlcontinuity_video.mp4) (1.5 MB, 1080×1350).

</td>
</tr>
</table>

## The problem

A cancelled class looks like one change on a calendar, but other events depend on it.

```mermaid
flowchart LR
    C["Closure, absence<br/>or outage"] --> L["Lesson cancelled"]
    L --> LAB["Lab must move"]
    LAB --> MEMO["Memo deadline<br/>now too soon"]
    MEMO --> Q["Students ask<br/>'when is it due?'"]
    Q --> P["Professor answers<br/>the same question again and again"]
    style C fill:#003366,color:#fff
    style MEMO fill:#FCECEA,stroke:#B3261E,color:#B3261E
```

<img src="docs/images/03_problem.png" alt="A cancelled class changes more than one date" width="820">

## How it works

<img src="docs/images/02_two_agents.png" alt="Two personal agents inside owlONE" width="820">

```mermaid
flowchart TB
    subgraph PROF["Professor"]
        ID["<b>Instructor Desk</b><br/>Domino Effect Agent (RECOVER)<br/>Student questions · Carry over<br/>Prompt + readings check · Plan ahead · Load summary"]
    end
    subgraph STU["Student"]
        SH["<b>Student Helper</b><br/>Approved answers first · Never guesses<br/>Assignment checklist · Canvas help<br/>Find the reading · AI policy"]
    end
    CF[("Course file<br/>syllabus, rules, notices")] --> ID
    CP[("Course pack<br/>+ answer bank")] --> SH
    SH -- "student sends<br/>'New question for the course FAQ'" --> ID
    ID -- "professor uploads<br/>updated answer bank (manual)" --> CP
    ID --> D["DRAFT plan + announcement<br/>professor approves"]
    style D fill:#E8F3EC,stroke:#1E7B45
```

| | Instructor Desk | Student Helper |
|---|---|---|
| User | Professor | Student |
| Model | gpt-6-luna (owlONE) | gpt-6-luna (owlONE) |
| Tools | Data & File Tools (code for time math), Add Files | Add Files only |
| Internet search | Off | Off |
| Knowledge | Course file(s), FAU reference notes | Course pack, answer bank |
| Instructions | [`01a_Instructor_Desk_Instructions_FULL.txt`](agents/01a_Instructor_Desk_Instructions_FULL.txt) | [`12a_Student_Helper_Instructions_FULL.txt`](agents/12a_Student_Helper_Instructions_FULL.txt) |

<img src="docs/images/04_how_it_works.png" alt="How the Domino Effect Agent checks the schedule" width="820">

## How I built the agents in owlONE

Both agents are **personal agents** in owlONE (FAU's generative AI platform), built during the Promptathon by writing instructions, choosing the tools, and uploading knowledge files. Everything they do comes from the instructions and files below.

| Setting in owlONE | Instructor Desk (professor) | Student Helper (student) |
|---|---|---|
| Model | **gpt-6-luna** | **gpt-6-luna** |
| Name and description | [`01c` profile](agents/01c_Instructor_Desk_Profile.txt) | [`12c` profile](agents/12c_Student_Helper_Profile.txt) |
| Instructions | [`01a`](agents/01a_Instructor_Desk_Instructions_FULL.txt) (about 20,000 characters) · compact [`01b`](agents/01b_Instructor_Desk_Instructions_COMPACT.txt) | [`12a`](agents/12a_Student_Helper_Instructions_FULL.txt) (about 12,000 characters) · compact [`12b`](agents/12b_Student_Helper_Instructions_COMPACT.txt) |
| Data & File Tools (code) | **On:** every time gap is calculated with code | Off |
| Add Files | On | On |
| Internet search | Off | Off |
| Knowledge files | [`FAU_Reference_Notes.txt`](agents/FAU_Reference_Notes.txt), plus a course file such as [`40`](agents/40_DEMO-101_Instructor_Course_File.txt) or [`41`](agents/41_DEMO202_Instructor_Course_File.txt) | Course pack [`13`](agents/13_DEMO_Course_Pack_for_Student_Helper.txt) + answer bank [`13b`](agents/13b_DEMO_Answer_Bank_for_Student_Helper.txt) |
| Modes / workflows | RECOVER (the Domino Effect Agent), PLAN AHEAD, STUDENT QUESTIONS, CARRY OVER, PROMPT CHECK (with a readings check), LOAD SUMMARY | Answer from the bank first, explain a prompt as a checklist, Canvas upload help, message to the professor, finish-and-submit check, find the reading |
| Output | Always a **DRAFT**, or NEEDS INFORMATION / NEEDS DECISION | Cited answers (A4, G5); a tagged message for anything new |

**How the two agents connect:** the Student Helper drafts "New question for the course FAQ: …". The professor answers it once in Instructor Desk, which adds the next ID (A11) and prints the updated bank. The professor then replaces the bank file in Student Helper (Edit Files → remove the old file → upload the new one → Update). This upload is manual today, on purpose: the professor approves every answer before students see it.

### Recorded in owlONE (October 16, 2026)

Real screenshots from the live agents on the fictional DEMO-101 course:

<table>
<tr>
<td width="50%"><img src="docs/images/owlone/real_domino_recovery_table.jpg" alt="owlONE Instructor Desk: the revised schedule table"></td>
<td width="50%"><img src="docs/images/owlone/real_domino_math_123h10m.jpg" alt="owlONE Instructor Desk: the calculation table with 123 h 10 m"></td>
</tr>
<tr>
<td align="center"><sub><b>Instructor Desk:</b> the revised schedule, with the reason and the rule for each move</sub></td>
<td align="center"><sub><b>Instructor Desk:</b> the code-checked gaps (lab → memo: 123 h 10 m, PASS)</sub></td>
</tr>
<tr>
<td width="50%"><img src="docs/images/owlone/real_S7_new_question_tagged.jpg" alt="owlONE Student Helper: a new question becomes a tagged message"></td>
<td width="50%"><img src="docs/images/owlone/real_S7_answered_A11.jpg" alt="owlONE Student Helper: the next student receives answer A11"></td>
</tr>
<tr>
<td align="center"><sub><b>Student Helper:</b> "That's a new question", with the tagged subject line</sub></td>
<td align="center"><sub><b>Student Helper:</b> after the bank update, the same question gets A11</sub></td>
</tr>
</table>

## The domino effect, step by step

Practice course DEMO-101. A first notice closes campus Oct 19–21. A second notice extends the closure through **Fri Oct 23**, which knocks out the Friday lab.

```mermaid
flowchart LR
    A["Extended closure<br/>cancels Fri Oct 23 lab"] --> B["Lab can only use backup:<br/>Thu Oct 29, 1:00–2:50 pm"]
    B --> C{"Memo due Fri Oct 30, 5 pm<br/>26 h 10 m after lab<br/>rule: ≥ 48 h"}
    C -- FAIL --> D["Memo moves to Tue Nov 3, 5 pm<br/>123 h 10 m (incl. Nov 1 clock change)"]
    D --> E["PASS · Final stays fixed · DRAFT for professor"]
    style C fill:#FCECEA,stroke:#B3261E
    style E fill:#E8F3EC,stroke:#1E7B45
```

<img src="docs/images/06_lab_moves_memo_moves.png" alt="The lab moves, so the memo deadline must move too" width="820">

<details>
<summary><b>The full revised schedule and every time check</b></summary>
<br>

```mermaid
gantt
    title DEMO-101: before and after the extended closure
    dateFormat  YYYY-MM-DD HH:mm
    axisFormat  %b %d
    section Closure
    Campus closed (simulated)        :crit, 2026-10-19 00:00, 2026-10-24 00:00
    section Before
    Lab (Fri Oct 23)                 :done, 2026-10-23 13:00, 2h
    Memo due (Fri Oct 30, 5 pm)      :done, 2026-10-30 17:00, 1h
    section After (draft)
    Lab moves to Thu Oct 29          :active, 2026-10-29 13:00, 2h
    Quiz 1 moves to Thu Oct 29, 3 pm :active, 2026-10-29 15:00, 1h
    Memo moves to Tue Nov 3, 5 pm    :active, 2026-11-03 17:00, 1h
    Final stays Fri Nov 6 (fixed)    :milestone, 2026-11-06 10:00, 0h
```

<img src="docs/images/07_revised_schedule.png" alt="The full revised schedule" width="820">

Local times in `America/New_York` are converted to UTC before subtracting, so the November 1 clock change adds the hour it should.

<img src="docs/images/08_time_checks_with_code.png" alt="Every time gap is checked with code" width="820">

</details>

### The professor's rules

The professor writes rules in plain words. The agent turns each one into a check it can measure.

| Rule (DEMO-101) | Check |
|---|---|
| Memo due ≥ 48 h after the lab and the memo lesson end | **The domino rule** |
| Quiz 1 ≥ 48 h after both lessons end | Study time |
| Lab ≥ 24 h after the evidence lesson ends | Prep time |
| Quiz, memo and final ≥ 48 h apart, never the same day | Spacing |
| Final ≥ 24 h after the review | Prep time |
| Final (Fri Nov 6) and memo lesson (Wed Oct 28) are fixed; lab is in person only | Can't move |
| Use only supplied make-up times; drop nothing; output is a draft | Always |

Full text: [`02_DEMO_Syllabus_Case.txt`](demo_inputs/02_DEMO_Syllabus_Case.txt).

<img src="docs/images/05_scheduling_rules.png" alt="The professor's scheduling rules" width="820">

## The Student Helper

The Student Helper answers only from the professor's course pack and approved answer bank, and it names the source (A4, A8, G5). It never guesses: a question the professor hasn't answered becomes a tagged message for the professor. It follows the course AI policy and never writes graded work.

<img src="docs/images/10_student_helper_rules.png" alt="Rules the Student Helper follows" width="820">

<details>
<summary><b>Assignment help, approved sources and finding the reading</b></summary>
<br>

<img src="docs/images/09_assignment_help.png" alt="Assignment help for professors and students" width="820">
<img src="docs/images/13_approved_sources.png" alt="Approved sources guide every answer" width="820">
<img src="docs/images/11_finding_the_reading.png" alt="When students can't find the reading" width="820">

</details>

### Asked once, answered for everyone

```mermaid
sequenceDiagram
    participant S as Student
    participant SH as Student Helper
    participant P as Professor
    participant ID as Instructor Desk
    S->>SH: "Can I send a draft of my memo early?"
    SH-->>S: "That's a new question." Drafts message:<br/>"New question for the course FAQ: ..."
    S->>P: Sends it through Canvas Inbox
    P->>ID: Pastes the question
    ID-->>P: NEW, waits for the professor's answer
    P->>ID: "Yes, at least 3 days before the deadline."
    ID-->>P: Added as A11 + updated answer bank
    P->>SH: Uploads the updated bank file (manual today)
    S->>SH: Next student asks the same question
    SH-->>S: "Yes ... (A11)" in seconds
```

The handoff is manual on purpose: the professor approves every answer before students see it. Automatic sync would need a shared answer bank through FAU's official agent route, and it is listed as a pilot next step.

<img src="docs/images/12_answer_once_loop.png" alt="How approved answers reach the next student" width="820">

## Test results

My tests were run live in owlONE on October 16–17, 2026. The word-for-word outputs are in [`results/`](results) and [`real_syllabus_tests/results/`](real_syllabus_tests/results).

| Test set | Result |
|---|---|
| Main test report (Oct 16) | **31 pass · 2 partial · 0 fail** (33 checks) |
| Assignment-rule questions | **7 / 7** |
| Reading-material feature (Oct 17) | **3 / 3** |
| Real FAU syllabus, DEMO-202 (Oct 17) | **17 / 17** (two with a noted difference) |
| Question-only runs before the pitch (Oct 17) | all four demo tests pass |

The two partials:
- The semester carry-over review asked for unnecessary decisions.
- An impossible date ("Oct 32") was flagged, but a conditional plan was still proposed.

In one of two domino reruns, the agent also moved the review when it didn't need to. That is why every plan stays a draft.

<img src="docs/images/15_test_results.png" alt="What the prototype tests show" width="820">

### When facts are missing, it stops and asks

<img src="docs/images/18_stops_and_asks.png" alt="When facts are missing, the agent stops and asks" width="820">

### Tested on a real FAU syllabus (DEMO-202)

I gave the agents the public syllabus of a real FAU graduate course (Fall 2026). Here it is called **DEMO-202 Graduate Data Analytics**; the real course name, number, section and room are withheld, and the instructor's contact details were removed. The syllabus lists weeks, not days, so the exact class days, the simulated closures and the approved answers are test values.

```mermaid
flowchart LR
    A["Hurricane watch closes campus<br/>Thu Nov 5 (simulated)"] --> B["Lecture #17 and the Project Part III<br/>announcement move to Mon Nov 9"]
    B --> C{"Part 3 due Thu Nov 19?<br/>250 h 9 m after announcement<br/>rule: ≥ 336 h (14 days)"}
    C -- FAIL --> D["Part 3 moves to Mon Nov 23<br/>346 h 9 m · 107 h 29 m after Quiz 4"]
    D --> E["PASS · Quiz 4 stays · DRAFT"]
    style C fill:#FCECEA,stroke:#B3261E
    style E fill:#E8F3EC,stroke:#1E7B45
```

On the real course, the Student Helper:
- followed the course's stricter AI policy and refused even brainstorming;
- gave the textbook link exactly as the syllabus posts it;
- read the late-work table correctly (30 hours late → 20% penalty).

<img src="docs/images/16_real_fau_syllabus.png" alt="Tested on a real FAU syllabus" width="820">

<details>
<summary><b>The DEMO-202 rules I tested</b></summary>
<br>
<img src="docs/images/17_real_course_rules.png" alt="The rules I tested on DEMO-202" width="820">
</details>

## Try it yourself

1. Create two personal agents in owlONE, or on any chat platform that supports custom instructions and file knowledge.
2. **Instructor Desk:**
   - Paste [`01a_Instructor_Desk_Instructions_FULL.txt`](agents/01a_Instructor_Desk_Instructions_FULL.txt) as the instructions.
   - Turn on code (Data & File Tools).
   - Upload [`40_DEMO-101_Instructor_Course_File.txt`](agents/40_DEMO-101_Instructor_Course_File.txt), [`41_DEMO202_Instructor_Course_File.txt`](agents/41_DEMO202_Instructor_Course_File.txt) and [`FAU_Reference_Notes.txt`](agents/FAU_Reference_Notes.txt).
3. **Student Helper:**
   - Paste [`12a_Student_Helper_Instructions_FULL.txt`](agents/12a_Student_Helper_Instructions_FULL.txt) as the instructions.
   - Upload [`13_DEMO_Course_Pack_for_Student_Helper.txt`](agents/13_DEMO_Course_Pack_for_Student_Helper.txt) and [`13b_DEMO_Answer_Bank_for_Student_Helper.txt`](agents/13b_DEMO_Answer_Bank_for_Student_Helper.txt).
4. Ask the questions in the [demo guide](docs/project/OwlContinuity_Demo_Guide.docx), or try the [demo inputs](demo_inputs). Open a new chat for each question.

> [!WARNING]
> Never upload [`06_Answer_Check_DO_NOT_UPLOAD.txt`](demo_inputs/06_Answer_Check_DO_NOT_UPLOAD.txt) to an agent. It holds the expected answers, and it is there so you can check the agents' replies yourself.

Example domino question for the Instructor Desk:

```text
A hurricane watch closes the FAU Boca Raton campus on Thursday Nov 5, so my DEMO-202 class that day is cancelled.
Using my course file, start with a short plain answer: 1) what the closure cancels directly, 2) what else has to
change because of it (the domino effect) and why, with the hours, 3) what stays the same. Then show the new
schedule and the math check.
```

<img src="docs/images/22_four_live_tests.png" alt="Four live tests" width="820">

## Limits and what I do not claim

- This is a prototype tested with small test sets I wrote myself. It is not an independent evaluation.
- No FAU approval, no committed pilot and no measured time savings.
- No automatic sync and no Canvas integration. The answer-bank handoff is manual.
- The agent cannot open links, so the professor clicks each reading link once.
- No FERPA or legal certification. The demo uses no grades or student records.
- Every schedule is a draft. The professor reviews, decides and publishes.

<img src="docs/images/19_risks_and_limits.png" alt="Risks and limits a pilot must address" width="820">

## Next step: a supervised pilot

The pilot would run one semester with 2–3 volunteer professors, subject to the required review. It would measure:
- the time to a verified recovery plan;
- the deadline conflicts left after review;
- how long a student waits for an approved answer;
- wrong or unsupported replies.

<img src="docs/images/20_pilot.png" alt="A small pilot can test value in real courses" width="820">

## Repository guide

| Start here | |
|---|---|
| [Live demo](https://tanviranjumjoarder.github.io/OwlContinuity/) | Both agents' workflows in the browser (source in [`docs/`](docs)) |
| [`deck/OwlContinuity_Presentation.pdf`](deck/OwlContinuity_Presentation.pdf) · [`.pptx`](deck/OwlContinuity_Presentation.pptx) | The 22-slide deck I presented |
| [`deck/OwlContinuity_Detailed_Deck.pdf`](deck/OwlContinuity_Detailed_Deck.pdf) · [`.pptx`](deck/OwlContinuity_Detailed_Deck.pptx) | 49 slides: the presentation plus a linked appendix (schedule and rule tables, agent design, G1–G22, test details, judge Q&A, recorded runs, DEMO-202 results) |
| [`agents/`](agents) | Instructions, profiles, course files and answer banks for both agents |
| [`results/`](results) | Every live owlONE test run, word for word |
| [`docs/project/OwlContinuity_Demo_Guide.docx`](docs/project/OwlContinuity_Demo_Guide.docx) | Step-by-step demo guide with every text to paste and the expected answers |

<details>
<summary><b>Full folder map</b></summary>

```text
README.md                          this page
LICENSE, LICENSE-DOCS.md           MIT for code, CC BY 4.0 for everything else
deck/                              final presentation (22 slides) and detailed deck (49 slides), .pptx and .pdf
docs/                              live demo (index.html), walkthrough (how-it-works.html), owlcontinuity.js
docs/images/                       slide images, the process animation, and real owlONE screenshots (owlone/)
docs/media/                        the 27-second video (MP4), its cover and captions
docs/project/                      demo guide (steps, texts to paste, expected answers)
agents/
  01a/01b/01c_*                    Instructor Desk instructions (full, compact) and profile
  12a/12b/12c_*                    Student Helper instructions (full, compact) and profile
  13_* / 13b_* / 13c_*             DEMO-101 course pack, answer bank, bank after A11
  40_*, 41_*                       course files: DEMO-101, and DEMO-202 (test values)
  FAU_Reference_Notes.txt          summaries of public FAU continuity guidance
demo_inputs/                       02–22: syllabus case, notices, student questions, prompt checks ...
  06_Answer_Check_DO_NOT_UPLOAD.txt  expected answers (never give this to an agent)
results/                           word-for-word owlONE test runs (Oct 16–17)
real_syllabus_tests/               real-syllabus (DEMO-202) inputs 30–37 and their results
```

</details>

## License

- **Code** (the web demo and the walkthrough): [MIT](LICENSE).
- **Everything else** (slides, agent instructions, course files, test results, documents): [CC BY 4.0](LICENSE-DOCS.md). Credit: "OwlContinuity by Tanvir Anjum Joarder, FAU owlONE Promptathon 2026".

FAU, Florida Atlantic University and owlONE are named only to describe where the project was built. This is not an FAU product, and FAU has not endorsed it.

## Author

**Tanvir Anjum Joarder**, Florida Atlantic University.
Built for the **FAU owlONE Promptathon**, October 16–17, 2026, Track 4: AI to Improve FAU.
