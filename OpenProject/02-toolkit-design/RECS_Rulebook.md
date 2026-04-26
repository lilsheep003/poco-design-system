# RECS Toolkit — Rulebook & GM Facilitator Guide

*Role-Play Driven UX · A TTRPG-Inspired Toolkit for User Needs Analysis*
Based on Sturdee, Heron & Gamboa (2023), *TTRPG UX: Requirements & Beyond*, CHI EA '23.

---

## 1. What this is

RECS — **Requirements Elicitation Campaign Setting** — is a research instrument for UX teams who want to surface how a product actually feels under the messy, emotional, interruption-riddled conditions of real use. It borrows three things from tabletop role-playing games:

1. **A persona character sheet** the participant inhabits for the session (not themselves).
2. **A dice mechanic** that injects environmental perturbations at narrative moments.
3. **A gamesmaster (GM)**, played by the researcher, who narrates, observes, and captures data.

The participant operates the **real product on their own device** throughout. The toolkit does not simulate the product. Its job is framing, perturbation injection, and data capture — everything happening on a second screen that the researcher controls.

One session is one participant × one scenario, ~60–90 minutes including Session Zero.

> **Important distinction.** The roll of the die does **not** judge whether the participant succeeded at their real-product task. It decides what the **environment injects** at that moment. The participant's observed behaviour on the real product is the data; the die is a pressure valve.

---

## 2. Session flow at a glance

```
[Setup]  →  [Session Zero / Character]  →  [Scenario]  →  [Summary / Export]
 ~5 min          ~15 min                      ~40–60 min          ~10 min
```

| Stage | What the toolkit shows | What you (GM) do | What the participant does |
|---|---|---|---|
| Setup | Participant code field, consent checklist | Get consent, start recording, explain the premise | Introduces themselves, asks questions |
| Character | Persona sheet with 6 attributes, UXP, traits, backstory | Guide without steering; explain the 18-point budget | Creates a persona (not themselves) |
| Scenario | Beat-by-beat scenario runner + GM Notebook | Read narration; call for rolls at challenge beats; draw complications; narrate | Operates the real product; responds in-character; talks aloud |
| Summary | Stats + Markdown/JSON export | Write debrief notes; export both files | Brief debrief interview |

---

## 3. Core concepts

### 3.1 Attributes (6)

A persona has six UX-facing attributes. Each ranges 1–5. The **modifier** is `value − 3`. The starting budget is 18 points across all six (so "flat 3 / +0 everywhere" is the neutral default, from which the participant shifts points).

| Key | Name | Represents | Example moments |
|---|---|---|---|
| PAT | Patience | Tolerance for friction, waiting, ambiguity | Long loading, unclear confirmations |
| FOC | Focus | Holding one goal across distractions | Notifications, side-UIs appearing |
| WMEM | Working Memory | Holding multi-step context across screens | Remembering a code, a value, a path back |
| EREG | Emotional Regulation | Recovering from frustration or dead-ends | Error messages, refusals, unexpected state |
| TLIT | Tech Literacy | Familiarity with digital conventions | Hamburger menus, gestures, modals |
| SENS | Sensory Tolerance | Reaction to busy visuals, motion, audio | Animations, dense layouts, alert sounds |

### 3.2 UXP — User Experience Points

A buffer against noisy moments. Characters start with **4 UXP**.

- Spend **1 UXP**: re-roll a d20 (character takes a breath, environment shifts).
- Spend **2 UXP**: cancel an injected perturbation entirely (character catches themselves).
- Gain **+1 UXP** on a natural 20 / calm-with-advantage.

UXP is a player-facing currency — the participant decides whether to spend. Their decisions are data: reluctance to "spend the last point" often mirrors real-world resource-conservation behaviour.

### 3.3 Stress clock

A 0–6 clock. Each injected perturbation adds 1 Stress. At 6, the character **trauma-exits** (closes the app, ends the session). This is a narrative probe for *design-induced emotional thresholds*: at what density of friction does a user give up?

### 3.4 Dice mechanic — perturbation injection

At a **challenge beat** in the scenario, the GM calls for a roll:

> Roll `1d20 + attribute modifier`, compared to the beat's **Difficulty Class (DC)**.

**DCs:** Easy = 10, Medium = 14, Hard = 18.

**Outcome bands** (the *environment's* behaviour, not the participant's):

| Total vs DC | Tone | Perturbation | What fires |
|---|---|---|---|
| natural 20 or total ≥ DC + 10 | **Calm + advantage** | none | Narrate a helpful moment; +1 UXP optional |
| total ≥ DC | **Calm** | none | Nothing interrupts; observe unperturbed behaviour |
| DC − 4 ≤ total < DC | **Mild perturbation** | sev 1–2 | Draw a mild complication; +1 Stress |
| total < DC − 4 | **Significant perturbation** | sev 2–3 | Draw a significant complication; +1 Stress |
| natural 1 | **Compound perturbation** | sev 2–3 (stack) | Draw twice, narrate together; +1 Stress (optionally +1 more) |

Higher attribute → higher total → more likely to land in "calm" bands → fewer perturbations. The attribute is thus the persona's *resilience signature* for that kind of friction.

### 3.5 Complication library

Four categories × three severity levels. The library is shared across all packs (product-agnostic) and packs may extend it with product-specific entries.

| Category | What it probes |
|---|---|
| **Interface** | Unexpected system behaviour: modal pops up, scrolling jumps, unfamiliar icon in critical spot |
| **Cognitive** | Internal-model breakdowns: forgetting phrasing, decision paralysis, losing purpose |
| **Emotional** | Affective disruption: "I am bad at this", self-consciousness, shame spikes |
| **External** | Off-device interruption: a message notification, someone speaks, intrusive thought |

Severity 1 is a nuisance that interrupts pacing; severity 2 demands a recovery action; severity 3 threatens to derail the flow entirely.

The toolkit draws a complication automatically when a roll lands in a perturbation band. The GM reads it verbatim, or paraphrases to fit the persona. The participant continues operating the real product while absorbing it.

---

## 4. Before the session

A pre-session checklist (the toolkit's Setup screen mirrors this):

- [ ] Informed consent signed; recording consent explicit.
- [ ] Second-device setup: toolkit on your laptop, real product on participant's phone/tablet.
- [ ] Audio + screen recording running on both devices. Verify levels.
- [ ] A quiet room; water; a 10-minute buffer before and after.
- [ ] Participant code assigned (P01, P02, …) — keep the code ↔ identity mapping in a separate file.
- [ ] Scenario chosen (you have pre-read the beats, the task prompts, and any `onMild` / `onSignificant` narration hints).

---

## 5. Session Zero — character creation

Session Zero is 10–20 minutes. Its purpose is twofold: to warm the participant into the fiction, and to elicit their implicit model of "users like me / users unlike me" through the act of building a character.

**Script you can adapt:**

> *"In a moment we're going to start the session. But first — we're not going to test you on your own behaviour. We're going to build a character together — a plausible user of this product, perhaps a little exaggerated in one or two ways. You're going to play that character for the rest of the session. You operate the real app on your phone, but when you talk, you talk as them. I'll be the world around you — I'll narrate moments, sometimes the environment will throw a small thing at you. A die decides that. The die never decides whether what you do on the app works — that's up to you and the app. It decides what happens around you."*

Then, on the Persona Character Sheet screen:

1. Portrait + persona name + role/age. Encourage *plausible fiction*, not self-insertion. (*"Someone you could easily imagine, not necessarily you."*)
2. Attribute allocation: 18 points across six attributes, each 1–5. Explain each attribute briefly. Note that "low" is not "bad" — it is *interesting*.
3. Devices, apps, traits: tag selections. This builds a sense of "what does this person know" — it informs your calls during the scenario.
4. Backstory: one sentence. *"Why is this person in this product today?"*

A sheet is **ready** when the name is set and all 18 points are allocated.

---

## 6. Running a scenario

A scenario is a sequence of **beats**. Each beat is either **narration** (you read it aloud; no dice) or a **challenge** (perturbation injection).

### 6.1 Narration beats

Read the narration slowly. Pause. Let the participant react or continue before advancing. Narration beats are where the *fiction* of the scenario breathes — they exist to set emotional context and to create psychologically safe distance from the participant's own identity.

### 6.2 Challenge beats

A challenge beat has:
- **Setup**: what the GM says to frame the moment (1–2 sentences).
- **Task prompt**: what the participant is attempting on the real product (one concrete action).
- **Attribute**: which of the six is being tested.
- **Difficulty** (easy / medium / hard → DC 10 / 14 / 18).
- Optional narration overrides (`onCalm`, `onMild`, `onSignificant`) — pack-specific phrasing for each outcome.

**How to run one:**

1. Read the setup. Invite the participant to attempt the task on the real product.
2. Call for a roll: *"Give me a [Attribute] check. DC is hidden."*
3. Click **Roll** on the dice modal. The toolkit shows `d20 + mod` vs DC and the outcome.
4. The toolkit also shows narration for that outcome (pack-specific override if present, generic hint otherwise) and draws a complication if the outcome is a perturbation.
5. **Read the narration aloud.** Then, if a complication was drawn, narrate it briefly — one sentence, concrete, in the character's present.
6. The participant continues on the real product while carrying what you just narrated. **Observe.** Do not coach. Note what they say aloud, where their hands go, where they pause.
7. When you have what you need, click **Apply perturbation · continue →** (or **Continue →** if no complication fired).

### 6.3 UXP spends during challenges

If the participant wants to resist the environment:
- Re-rolling (1 UXP) is a reasonable instinct when a mild roll feels unfair.
- Cancelling a complication (2 UXP) is a *costly* decision — and whether they spend it is often the most interesting data from that beat.

Do not nudge. If they ask *"can I do anything?"*, point at the UXP panel. If they don't ask, don't volunteer.

### 6.4 Quote capture

The GM Notebook has a quote box. Whenever the participant says something pithy — reactions, self-talk, a frustration, a small delight — type it in and press Enter. Quotes are timestamped to the current beat. In thematic analysis later, these are anchor points.

### 6.5 When to skip a challenge

A "skip" button advances without injecting a perturbation. Use it when: time is short, a prior beat already covered similar ground, or the participant is visibly fatigued. Document the skip in live notes.

---

## 7. Closing the session

1. Advance through the last beat. The "Finish session →" button opens the Summary screen.
2. **Debrief interview (10–15 min).** Sample questions:
   - *"Step out of character for a moment. What did it feel like to play [persona name]?"*
   - *"Was there a moment that felt like you — not the character?"*
   - *"The die threw a few things at you. Were any of those things realistic for how you normally use this product?"*
   - *"What would you want the product to do differently for [persona name]? For you?"*
3. Fill the post-session debrief textarea with your own reflections while memory is warm.
4. **Export** both Markdown and JSON. The Markdown is a readable session record for thematic analysis; the JSON is a structured dump for any quantitative cross-session analysis.
5. Stop recording. Save both recordings with the participant code in the filename. Back up immediately.
6. Thank the participant. Pay them (if applicable). Send the consent-verified post-session email.

---

## 8. GM best practices

Brief, scannable:

- **You play the environment, not a character.** Resist the urge to voice NPCs with dramatic flourish — it pulls the participant out of the fiction and into an audience posture.
- **Narrate in the present tense, in short sentences.** *"Your phone vibrates. It's a text from your mum."* Not *"So then your phone would vibrate and it would be a text..."*.
- **Do not coach on the real product.** If the participant asks how to do X, say *"the character tries something — what do they do?"*. Your silence is part of the data.
- **Do not rescue from stress.** If Stress is rising, that is the point. The trauma-exit at 6 is a legitimate, loggable finding.
- **Keep the die hidden when useful.** The modal exposes the total and DC, but in sensitive moments you can describe the outcome without reading the number aloud.
- **Take notes in the Notebook, not on paper.** Timestamps and beat context auto-attach.
- **Capture quotes as they happen.** You will not remember them five minutes later.
- **When in doubt, call a roll.** Even a "calm" outcome gives you an observation window — the participant's *unperturbed* behaviour on the real product is useful data too.

---

## 9. Analysis handoff

What the export gives you, per session:

- **Markdown record** — human-readable, copy-pasteable into a research wiki or analysis tool. Contains: participant code, pack + scenario metadata, full character sheet, every beat (with rolls + complications inline), GM live notes, participant quotes, post-session debrief.
- **JSON dump** — the full session object. Use this when you want to aggregate across sessions (e.g., count Interface complications across all participants, or plot Stress curves).

Recommended analysis flow for a study of *N* participants:

1. One pass per session within 24 h: re-read the Markdown, listen to the recording, add anything missing to the debrief section.
2. Transcribe all quotes and notable verbal reactions from recordings (tool-assisted, human-verified).
3. Thematic analysis across sessions: open coding → axial coding → themes.
4. Cross-reference: which perturbations tended to fire under which attribute profiles? Which beats most reliably produced quotable moments?

---

## Appendix A · Outcome narration cheatsheet

Phrasings you can keep under the table and reach for when an outcome lands. Replace brackets with the beat's content.

| Outcome | Phrasing pattern |
|---|---|
| Calm + advantage | *"[Task thing] feels smooth. In fact, [small gift — a shortcut appears, someone is kind, the app remembered]."* |
| Calm | *"You [do the thing]. It works the way you expected. Nothing interrupts."* |
| Mild | *"Just as you're [doing the thing], [small complication]. You have to [small recovery]."* |
| Significant | *"[Complication hits]. [The character's instinctive reaction]. You can still get through it, but it takes work."* |
| Compound | *"Two things at once. [First]. [Second]. You're behind on both."* |

---

## Appendix B · Complete core complication library

### Interface (system does something unexpected)
- **sev 1** — A modal pops up asking about notifications. The character has to dismiss it before continuing.
- **sev 1** — The target button is just below a newly-loaded banner. Easy to mis-tap.
- **sev 2** — The screen scrolls unexpectedly; the prior selection is now off-screen.
- **sev 2** — An icon the character does not recognise appears in a critical spot.
- **sev 3** — A loading spinner runs for an uncomfortably long time with no progress indicator.
- **sev 3** — The flow branches unexpectedly and the character loses track of which path they chose.

### Cognitive (internal model breaks)
- **sev 1** — The character forgets the exact phrasing they used in a previous step and has to re-derive it.
- **sev 2** — Two options look equally valid. Hesitation, unsure which matches intent.
- **sev 2** — The character loses track of why they opened this app in the first place.
- **sev 3** — Decision paralysis — the options multiply and none feels definitively right.

### Emotional (affective disruption)
- **sev 1** — A small surge of "I am bad at this" arrives uninvited.
- **sev 2** — The character feels watched — the task becomes performative rather than their own.
- **sev 2** — Frustration leaks in. Considers closing the app for something easier.
- **sev 3** — Shame spike: the task reminds the character of something they have been avoiding.

### External (outside the device)
- **sev 1** — A message notification arrives on the device. Glance.
- **sev 2** — Someone in the room speaks to them briefly.
- **sev 2** — A battery warning appears in the corner of vision.
- **sev 3** — An unrelated but urgent-feeling thought intrudes ("did I lock the door?").

---

## Appendix C · Pack authoring primer

A pack is one `.jsx` file in `ui_kits/ttrpg_toolkit/packs/` that calls `window.RECS.Packs.register({ ... })`. A minimal pack has one scenario with a mix of narration and challenge beats. See `packs/_schema.md` for the complete shape. See `packs/poco.jsx` and `packs/bill-payment.jsx` for working examples.

A pack is well-designed when:
- Its scenarios each have 4–8 beats, mixing narration and challenge.
- Challenge beats have concrete `taskPrompt` fields — one real-product action each.
- At least some challenge beats carry `onMild` / `onSignificant` overrides, so the toolkit's automatic narration feels like *this product*, not generic.
- The `productArea` field on each scenario names which slice of the product the scenario probes — useful when the research question targets a specific flow.

---

*Document version 1.0 · Generated for Master's thesis by Boyang Wei & Yi Yang, Chalmers IxD.*
