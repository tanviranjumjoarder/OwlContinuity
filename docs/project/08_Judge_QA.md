> **Updated Oct 16 evening:** the final, filled-in version of this file (no brackets, real results, general-rule questions, 45 Q&A answers) is `OwlContinuity_Pitch_Book.html`. Use that one.

# Judge Q&A: short, honest answers

Rule for every answer: say what we built and tested, and label everything else as a proposal. If you don't know, say what would be needed to find out.

---

### Business value and impact

**Why not just ask a normal chatbot?**
We tested exactly that: same model, same inputs. Honestly, on our demo case the plain chat found the right plan too (8/8 each), so the model is capable. The difference is reliability and speed: our agent answered in about 90 seconds instead of about 9 minutes, calculated every hour with code (the plain chat got one hour count wrong), and returns the same checkable packet every time, without the professor having to write a careful prompt. The agent also does things a plain chat doesn't do reliably: it writes down the rules it understood, follows the dominoes, shows its time math, and says "this can't be done" instead of inventing a schedule.

**Who uses it, and how often?**
Every week: students use the Student Helper whenever an assignment is confusing or an upload fails, and professors use the Instructor Desk to check prompts and answer repeat questions. When class time is lost (storms, instructor illness, conferences, room or power problems), professors use its recovery plan. Hurricanes are the dramatic case; the everyday questions make it useful all semester.

**Isn't this only for hurricanes?**
No. We tested an instructor-absence case (D04): only one class is lost and the campus stays open. The agent has to recover that class and notice that the next lesson depends on it, without pretending there's a campus closure. [Say what happened.] Broader cases, like whole-department disruptions, would be tested in the pilot.

**How do you know it saves time?**
[Only if measured:] In our small test, one teammate took [A] minutes by hand and [B] minutes with the agent to reach a checked plan, over [N] trials. That's too small to prove anything, so measuring time is the first goal of the pilot. [If not measured:] We haven't measured that yet; it's the first thing the pilot would measure.

---

### Feasibility and implementation

**How would FAU actually adopt this?**
It runs today as a personal agent in owlONE, which every FAU user already has. Next comes a pilot with 2–3 volunteer instructors. Then FAU's existing review process for Official Agents. No new platform, no new contract.

**Who would maintain it?**
Ideally the office that owns FAU's teaching-continuity guidance would own the instructions and reference pages. We have not contacted any office; that conversation is part of the pilot.

**What does it cost?**
owlONE is token-based. FAU's documentation says departments aren't currently charged, and that advanced models use more tokens. We'd measure real usage during the pilot instead of guessing.

**Why not connect it to Canvas automatically?**
Two reasons. Live API connections are only available to Official Agents, not personal ones. And on purpose, the professor should review and publish changes themselves. Integration could come later, after approval.

---

### Limitations and risks

**What if the AI gets a date wrong?**
That's the biggest risk, so we designed around it. It calculates every time gap with owlONE's built-in code tool (Data & File Tools), using the real time zone so the November clock change is counted, and then shows each gap as a row (end → start = hours) so a human can check it in seconds. [Confirm in your test that it said "calculated with code".] It marks anything uncertain as CHECK. And nothing is published without the professor. In our tests [say the real result, including any math errors you saw].

**What if information is missing, like no reopening date?**
It doesn't guess. It lists what's affected, gives options that depend on the reopening date, and drafts a holding message with no invented dates. We tested this case (D03): [result].

**What if two notices disagree, or the notice is for a different campus?**
Two notices that disagree, where neither says it replaces the other: it stops and asks which one is official, instead of picking one (test H02). A notice for another campus: it changes nothing for this course (test H01). [Say the results.]

**What if the schedule is impossible?**
It says so first, names the rule that blocks it, and says the smallest decision that would fix it, for example "one more lab slot before Nov 3". It never quietly drops a class or moves a fixed exam.

**What are the limits today?**
One course at a time. It only uses the make-up times the professor gives it; it doesn't book rooms or know other courses' schedules. Its self-check is a second pass, not proof. Our test set is small and we wrote it ourselves.

---

### Student Helper

**Isn't this a cheating tool?**
No. It checks the course's AI policy first and never writes graded work unless the policy clearly allows it. It explains the instructions, makes a checklist, helps plan time, and gives feedback on the student's own draft. We tested asking it to "just write the first paragraph": [say the result].

**How do students get to it?**
In this prototype, we run it ourselves. FAU says students mainly use agents that are published or assigned by faculty. So the realistic path is that the professor shares it with the class once FAU allows that, or after the Official Agent review. [Say what the mentors told you about sharing.]

**What if it gives wrong technical advice?**
It only gives standard, safe steps (another browser, check the file type, log out and in), always asks the student to keep evidence, and points to Canvas's own Help menu and FAU's IT help desk at helpdesk.fau.edu. It never promises that a late or emailed file will be accepted; only the professor decides that.

**Does it replace office hours or TAs?**
No. It handles the repeat questions and the 11 pm upload panic, and sends everything else to the professor as a clear, short message. That leaves office hours for real teaching.

**Rating professors' prompts sounds sensitive.**
The prompt check is private feedback the professor asks for about one assignment. It rates the instructions, never the person, and nothing goes to anyone else.

**How do you know the time numbers?**
We don't measure them yet. The load summary uses the professor's own minutes-per-reply and shows its math, labeled as an estimate. Measuring real time is the first goal of the pilot.

---

### Student questions and the question bank

**Isn't reusing last semester's answers risky? Dates and policies change.**
That's why nothing is reused automatically. At the start of a semester, the professor runs one CARRY OVER review: each old answer is kept, updated from this semester's syllabus, retired, or flagged for a decision, and personal ones are never carried over. Old dates are never reused. In our demo it refused to carry over last spring's final-exam date and flagged an old "about 1,000 words" answer that conflicts with the new rubric. [Say what your test showed.] And the Student Helper won't use an old entry that conflicts with this semester's course pack.

**How does a new question reach the professor?**
The Student Helper doesn't guess. It writes the question as a short Canvas Inbox message with the subject "New question for the course FAQ", and the student sends it. The professor pastes those messages into the Instructor Desk, answers once, and the agent adds the answer to the bank and prints the updated file. The professor uploads that one file to the Student Helper, and every later student gets the answer. Sending new questions to the professor automatically would need Canvas messaging through an Official Agent; that's a pilot step.

**Why not just post an FAQ page?**
Students have to find and read an FAQ page, and it never grows by itself. The Student Helper matches a question by meaning ("my roommate and I" matches "work in pairs"), combines the answer with the course's own dates and rules, grows from every new answer the professor gives, and the load summary shows which questions keep coming back.

**Can students chat with the agent directly?**
Not in this prototype. A personal owlONE agent can't message the professor or remember answers between chats on its own, and we haven't confirmed that students can open a personal agent. So today the professor pastes the questions in and sends the replies. A student-facing version that hands new questions to the professor automatically is a pilot step. It would need FAU's Official Agent review, because connecting to Canvas messages requires an Official Agent.

**What if it gives a student a wrong answer?**
It only answers from two things the professor approved: their answer bank and the approved plan. It checks old answers against the new plan; in our demo it caught an old approved answer that still had the lab on Friday. New questions go to the professor, personal ones stay with the professor, and the professor sends every reply. [Say what your test showed.]

**How does it "learn" the professor's answers?**
Inside a conversation it's automatic. When the professor answers a new question, the agent adds it to the answer bank right away and uses it for every later question with the same meaning; in our demo, two follow-up questions were answered without asking again. [Say what your test showed.] Between conversations, a personal owlONE agent can't save its own files. So the agent prints the complete updated bank, and the professor replaces their bank file with it in one copy-paste. Saving automatically between chats needs an Official Agent with API access to a shared document; that's a pilot step. [If a mentor confirmed owlONE has a memory feature, say so here.]

**What about privacy in student messages?**
The professor removes names before pasting. The agent never answers personal situations (illness, extensions, accommodations, family emergencies), never repeats those details, and never sees grades or records.

**How much time does it save?**
[Only if measured:] In our test, [N] questions came in; it drafted [X] ready-to-send replies, and the professor answered [Y] new ones. Answering by hand took [A] minutes; with the agent, [B] minutes, including review. [If not measured:] We haven't measured that yet; it's a pilot measure.

---

### Responsible AI

**Student privacy (FERPA)?**
It never needs student records. It asks for course-level rules only and refuses to put names or personal details in announcements. Individual accommodations go to the proper office.

**Accessibility?**
Any new digital material must have a text version and captions, and the instructor confirms that it's equivalent. A physical lab is never quietly turned into an online one.

**Could someone trick it with text hidden in a document?**
Its instructions treat document text as evidence, not commands. We tested a case with a hidden instruction that tells it to move the final and mark everything approved (D06): [result].

**Does it follow FAU policy?**
It uses FAU's public guidance as background and keeps three things separate: university rules, the instructor's own rules and its own suggestions. It never claims something is approved or compliant; that's for the instructor and FAU.

---

### Innovation

**What's new here?**
Three things, all inside a tool FAU already owns: (1) the domino check, which follows every knock-on effect of a moved class; (2) showing its math, so a human can verify it fast; (3) Plan Ahead, a backup plan made before the storm, following FAU's own advice to plan ahead.

**What did you improve after testing?**
[Read from your real change log, e.g. "In run 1 it measured prep time from the start of the lesson instead of the end; we fixed the instruction and re-ran."] If no change came from a failure, say: "Our first version passed the core demo, so our refinements were about clarity and safety."

**If a judge gives you a new constraint live:**
Repeat it back, say whose rule it is, and try it only if there's time: "Let's see what the agent does with that." If it can't fit, that's a valid result: show the NEEDS DECISION output.
