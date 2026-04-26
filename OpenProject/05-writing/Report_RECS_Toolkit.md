# Role-Play Driven UX: A TTRPG-Inspired Toolkit for User Needs Analysis

**Authors:** Boyang Wei, Yi Yang
**Programme:** Interaction Design, Chalmers University of Technology
**Project context:** Master thesis open project
**Primary test product:** Poco — a gentle productivity app prototype

---

## Abstract

User needs analysis depends heavily on what participants are willing and able to say. When research concerns emotionally complex or cognitively demanding products, direct self-report often falls short. This project explores whether structures from tabletop role-playing games (TTRPGs) can extend the reach of UX needs research. Building on the Requirements Elicitation Campaign Setting (RECS) proposed by Sturdee, Gamboa, and Heron (2023), we designed a working research toolkit that translates TTRPG concepts — characters, scenarios, dice mechanics, and GM facilitation — into a practical instrument for early-stage UX work. The central design contribution is a conceptual reframing of the dice mechanic: rolls do not judge product success, they inject perturbations into the research environment, keeping the real product and the participant's actual behaviour at the centre of observation. Poco, the first author's master thesis prototype for ADHD-oriented productivity support, served as the primary test vehicle. The result is a session-complete toolkit that supports character creation, scenario selection, perturbation injection, GM note-taking, quote capture, and structured export.

---

## 1. Introduction

UX research often depends on asking people to describe what they do, what they need, and what frustrates them. But needs are not always accessible through direct reflection. Some only become visible when a person is placed inside a situation, asked to make decisions under pressure, and allowed to respond to tension, interruption, or uncertainty. This is especially relevant for products that support emotional, cognitive, or everyday self-management — where the user's experience is shaped not only by interface structure, but also by attention, energy, emotional state, and context.

This problem is particularly acute for products designed for users with ADHD or attention difficulties. Such users may find it hard to articulate what slows them down without being in the moment of slowdown itself. Abstract task completion metrics or retrospective interview questions often miss the texture of these experiences.

This project asks whether ideas from tabletop role-playing games can create that situated moment within a research session. In a TTRPG, participants do not simply answer questions — they take on roles, act within a fictional situation, and respond to events introduced by rules and by a facilitator. Fine's sociological study of fantasy role-playing games frames these sessions as social worlds built through shared imagination, rules, and group interaction (Fine, 1983). Bowman further argues that role-playing supports identity exploration, problem-solving, and community formation (Bowman, 2010). Both suggest that the role-playing frame creates a kind of productive distance: participants can speak and act from within a character, which may make it easier to express needs, hesitations, and reactions that feel too personal to state directly.

The direct inspiration for this project is Sturdee, Gamboa, and Heron's paper *TTRPG UX: Requirements & Beyond* (2023), which proposes that UX research can borrow TTRPG structures to create "playable UX worlds." Their proposal is conceptual; it does not provide a working instrument. This project responds to that gap. The contribution is a practical toolkit that turns those ideas into a runnable research session, demonstrated through Poco, a mobile-first productivity app designed to reduce the friction of starting tasks for users who experience attentional and emotional barriers.

---

## 2. Background

### 2.1 TTRPGs as structured imagination

Tabletop role-playing games combine rules, collaborative storytelling, and facilitated uncertainty. A GM presents the world and its situations; players control characters within that world. The rules provide structure, but the course of events emerges through conversation, interpretation, and decision-making.

This balance between structure and openness is relevant to UX research. Traditional research sessions can become over-scripted: the participant performs a task, the researcher observes whether it succeeds, and the session moves on. The TTRPG model suggests a different approach — the participant inhabits a role, encounters situations through that role, and responds to events that neither participant nor researcher can fully predict. Fine (1983) describes this as a shared social world with its own norms and interaction patterns. Bowman (2010) extends this by identifying how role-playing helps participants safely explore responses, emotions, and decisions they might otherwise avoid naming.

For UX research, the useful parts of TTRPG are not the fantasy content — they are the facilitation structure, character framing, scenario-based action, and rule-governed uncertainty.

### 2.2 RECS: TTRPG structures applied to UX

Sturdee, Gamboa, and Heron (2023) provide the central theoretical anchor for this project. Their paper proposes a Requirements Elicitation Campaign Setting (RECS), in which UX research sessions are reimagined as playable worlds. Characters relate to personas; adventures relate to user journeys; the GM role relates to research facilitation; dice mechanics introduce rule-governed disruption.

The most important idea borrowed from RECS is psychological distance. When a participant speaks as a character, they may be able to describe frustration, shame, confusion, or resistance in a less personally exposed way. For products like Poco — where the user's internal state is part of the design problem — this distance can surface data that direct questioning cannot.

The RECS paper is deliberately speculative. It proposes a direction but does not specify how to run a session, what rules to use, or what data to collect. This project treats that openness as a design brief.

### 2.3 Distinction from gamification

This project is often misread as gamification, so the distinction is worth stating directly. Deterding et al. (2011) define gamification as the use of game design elements in non-game contexts to influence motivation and behaviour. Gamification is typically about incentives — points, badges, leaderboards, progress bars.

This toolkit is not designed to motivate participants or reward them. The dice mechanic is not entertainment. The character sheet is not a levelling system. The GM role is not dramatic performance. These elements exist because they create the structural conditions under which situated behaviour becomes observable and recordable. The toolkit's game-like surface is in service of a research function, not a motivational one.

---

## 3. Design Process

### 3.1 Design goals

The toolkit was designed around six requirements, derived from the needs of a practical research instrument and from the gaps in the RECS proposal:

1. **Support persona-as-character creation.** The participant should be able to build or adjust a character with attributes, traits, and a short backstory, making the session inhabitable rather than only task-based.
2. **Use scenario-based research tasks.** Sessions should unfold through a sequence of beats — alternating between contextual narration and product-directed challenges.
3. **Separate product performance from dice outcomes.** The dice should not decide whether the participant succeeds in the product. Product behaviour on the real interface remains observable. The dice only determine whether the environment introduces a disruption.
4. **Give the researcher a clear GM role.** The researcher must be able to guide narration, call for rolls, observe participant behaviour, capture notes, and record quotes without losing track of the session.
5. **Produce analysable session records.** The session should conclude with a structured export containing the character sheet, rolls, perturbations, GM notes, quotes, and debrief.
6. **Remain reusable across products.** Poco is the main test vehicle, but the toolkit should not be locked to it. Product-specific scenarios live in separate packs so that other researchers can adapt the method.

### 3.2 Character sheet and attribute system

The character sheet is the participant's entry point into role-play. Rather than testing as themselves, participants create a plausible user character with a name, role, age, backstory, device context, and six attributes:

- **Patience (PAT)** — tolerance for friction and repetition
- **Focus (FOC)** — ability to sustain directed attention
- **Working Memory (WMEM)** — capacity to hold multiple things in mind
- **Emotional Regulation (EREG)** — management of frustration, shame, and discomfort
- **Tech Literacy (TLIT)** — fluency with digital interfaces
- **Sensory Tolerance (SENS)** — sensitivity to visual and auditory overload

Each attribute is rated from 1 to 5, with a total point budget of 18. A budget of 18 enables a neutral character (all attributes at 3) but encourages deliberate trade-offs — a high-Focus character may have low Emotional Regulation, or high Tech Literacy may come with low Patience. These trade-offs make the persona more specific and give the GM a clearer model of how the character would respond to friction.

The attributes were chosen because they describe the user capacities that most strongly shape interaction with products like Poco. Task initiation, attentional sustain, cognitive overload, and emotional self-management are not peripheral to the design problem — they are central to it. A character sheet built around these dimensions enables the research session to address them structurally rather than only incidentally.

### 3.3 Scenario and beat structure

Each session is built around a scenario. A scenario has a premise, a goal, and a sequence of beats. Narration beats set emotional and situational context through text the GM reads aloud. Challenge beats identify a concrete product action, assign an attribute and difficulty, and trigger a roll.

This structure keeps the session guided without making it rigid. The researcher knows where the session is heading; the participant's responses and decisions can still shift the texture of the situation. Difficulty classes are calibrated at three levels — Easy (DC 10), Medium (DC 14), and Hard (DC 18) — reflecting the complexity of the underlying product interaction. An easy challenge is a routine task with a single clear path; a hard challenge involves ambiguous choices, multiple fields, or emotionally demanding decisions.

The Poco pack contains three scenarios:

- **The Morning Standoff** — morning task initiation, state check-in, and choosing one task to begin; probing how the app supports (or impedes) first contact with the task list.
- **Focus Under Siege** — setting up a focus session, responding to the Mochi companion, and sustaining attention under simulated distraction; probing how the app behaves when focus is already fragile.
- **The Overwhelmed Mind Drop** — capturing scattered thoughts into the inbox, converting one into a task, and beginning; probing how well the app accommodates an overloaded state.

These scenarios were selected because they map to Poco's core thesis: that productivity support should reduce the friction of starting, not only optimise output.

### 3.4 The central design pivot: from success judgement to perturbation injection

The most consequential design decision was a reframing of the dice mechanic — one that emerged only after identifying a conceptual error in the first version of the toolkit.

In the initial interpretation, the dice roll was treated as a success or failure judgement: a high roll meant the character succeeded at the product interaction; a low roll meant failure. This reading was intuitive because nearly all TTRPG systems use dice this way. But applied to UX research, it produced a serious problem.

If the die decides whether the participant succeeds at a product task, then the die — not the product — becomes the evaluative agent. The participant may respond to the roll result rather than to the actual interface. A participant who fails a roll might avoid exploring the interface because the fiction tells them they failed. A participant who succeeds might move on without expressing genuine difficulty. In either case, the researcher is no longer observing the participant's real interaction with the real product. The toolkit has inserted itself between the participant and the product, and in doing so, it undermines the research goal.

This is a departure from how the RECS framework describes the dice mechanic. Sturdee et al. (2023) frame rolls as part of the rules-governed session structure but do not specify what dice results should govern. The paper's conceptual framing maps dice broadly to "rule-based uncertainty" without defining whether that uncertainty applies to participant actions or to the research environment. This ambiguity, interpreted naively, leads to the v1 error described above.

The corrected design treats rolls as environmental perturbation signals, not success judgements. A roll does not determine what the participant did with the product. It determines what the surrounding world injects into the situation. The participant still uses the real product, and their actual behaviour — navigation decisions, verbal hesitations, moments of confusion, emotional reactions — remains the research data. The roll only modulates the environment:

| Roll band | Environment signal |
|---|---|
| Critical success | Exceptionally calm; no perturbation, small advantage |
| Success | Calm continuation; no perturbation |
| Mixed | Mild perturbation injected |
| Failure | Significant perturbation injected |
| Critical failure | Compound perturbation (multiple or severe) |

Under this logic, a low roll on a Focus check during a Poco session does not mean the participant failed to use the app. It means the environment now introduces a distraction — a notification, an intrusive thought, a companion event, or a moment of self-doubt. The participant continues using the real product, and the GM observes how they respond to the combined pressure of the product and the disruption.

This reframing keeps the product at the centre of observation while allowing the researcher to introduce realistic, controlled friction. It also changes the relationship between dice outcomes and scenario design: every beat outcome now has a plausible research function, rather than acting as a pass/fail gate that short-circuits product interaction.

This shift was guided by the design iteration principle described by Fullerton (2018): game-like systems require playtesting and revision to surface assumptions that look correct in theory but fail in use. The v1 error was not obvious until the mechanic was traced end-to-end against the research goal.

### 3.5 GM role design

The toolkit is primarily researcher-facing. The participant uses the real product on their own device; the GM uses the toolkit to guide the session, introduce perturbations, and capture data. This split keeps the participant's attention on the product rather than on the research instrument.

The GM-facing layer includes narration prompts for each beat, task prompts specifying what the participant should attempt in the real product, dice roll controls, perturbation outcome descriptions, a live GM notebook, quote capture with timestamps, a roll and perturbation log, and a summary and export screen. This makes the toolkit not only a game-like framing layer, but also a research capture tool — the session record is built incrementally during the session rather than reconstructed afterwards.

---

## 4. Design Outcome

### 4.1 Session flow

The final toolkit follows a five-stage session flow:

| Stage | Purpose | Main output |
|---|---|---|
| Setup | Participant code entry and session preparation | Session identity |
| Character | Persona creation and attribute allocation | Character sheet |
| Scenario Picker | Product pack and scenario selection | Active scenario |
| Scenario Run | Beat-by-beat narration, rolls, and perturbation injection | Roll log, GM notes, quotes |
| Summary | Session review and structured export | Markdown and JSON record |

The flow is designed so a researcher can run one participant through one scenario in a single sitting of 60–90 minutes. Each stage gates the next on data readiness — a character sheet must be complete before a scenario can be selected; a scenario must be active before the run screen opens — preventing incomplete records.

### 4.2 Dice mechanic and outcome bands

Rolls use a d20 plus an attribute modifier. The modifier is derived from the character's attribute rating at the relevant beat (for example, an Emotional Regulation check uses the EREG value). The roll total is compared to the scenario's difficulty class to determine the perturbation band described in §3.4.

Because the modifier range is constrained by the 18-point budget, the system avoids runaway characters who never encounter friction. Even a high-attribute character will occasionally draw perturbations, reflecting the reality that no user is entirely resistant to the conditions these attributes describe.

### 4.3 Complication library

When a roll calls for a perturbation, the GM draws from a complication library organised into four categories:

- **Interface** — unexpected system behaviour, unclear controls, layout surprises. Example: *"A loading banner briefly obscures the button you were about to tap."*
- **Cognitive** — memory lapses, decision paralysis, losing track of intent. Example: *"You scroll back to the top of the list, unsure if you already chose something."*
- **Emotional** — self-blame, shame, frustration, or feeling observed. Example: *"The priority tags start to feel like accusations. Your shoulders tighten."*
- **External** — off-device interruptions such as notifications, sounds, or social pressure. Example: *"A message notification lights up the lock screen edge as you reach for the check-in."*

Each complication has a severity rating. Mild perturbations draw low-severity items; compound perturbations draw multiple or high-severity items. The Poco pack adds product-specific complications — for example, complications tied to the Mochi companion, status-pill tags, and the mood/energy/focus check-in.

The four-category structure matters because it reflects the actual distribution of friction in digital product use. Users are not slowed only by interface bugs or by their own cognitive limitations — they are affected by the interaction of all four domains simultaneously. The library gives the researcher a systematic way to introduce any of these dimensions without improvisation.

### 4.4 Poco as the test vehicle

Poco is a mobile-first productivity app prototype designed as the first author's master thesis design work. Its core interactions include a mood/energy/focus state check-in, a task list with breakdown support, a Mind Drop inbox for offloading scattered thoughts, focus sessions with a companion character named Mochi, and a break-down flow for decomposing large tasks.

Poco was a strong test vehicle for the RECS toolkit for three reasons. First, it deals with subjective states — energy, focus, overwhelm, and emotional resistance to starting — that are difficult to probe through task completion metrics alone. Second, its value depends on how it behaves under messy everyday conditions, not only under clean laboratory use. Third, it contains several scenario-rich moments: approaching the task list in the morning, entering focus mode, reacting to Mochi's feedback, or dumping thoughts into an inbox. These moments naturally support the scenario-and-beat structure of the toolkit.

Using Poco also allowed the toolkit to be stress-tested against a real design artefact with known design intentions, rather than a hypothetical product or a commercially available system with no accessible design rationale.

### 4.5 Research output structure

The session export includes: participant code; selected pack and scenario; complete character sheet and attribute profile; each beat encountered; all roll outcomes; complications injected; stress and UXP changes; GM live notes; participant quotes with timestamps; and post-session debrief.

The Markdown export is structured for human reading and qualitative analysis. The JSON export preserves the full session object for possible aggregation or cross-session comparison. The export design reflects the view that the toolkit's value depends not only on making sessions more engaging, but on producing records that support analytical work after the session ends.

---

## 5. Testing and Evaluation

*[Testing & Evaluation — to be completed]*

---

## 6. Discussion

The toolkit's main value is that it makes user needs more situated. Rather than asking a participant to describe needs in the abstract, it places a character inside a moment: waking up late, trying to start work, losing focus, receiving a notification, or feeling judged by a priority tag. These moments can surface needs that are difficult to access through direct questioning or standard task observation.

For Poco specifically, this situatedness matters because the app's design challenge is not only whether controls are visible or flows are understandable. It is whether the product can help when the user is tired, scattered, ashamed, indecisive, or overloaded. The TTRPG-inspired toolkit gives the researcher a way to explore these states without forcing the participant to speak from personal vulnerability. The character creates distance; the scenario keeps the session concrete.

The perturbation mechanic adds controlled messiness. Traditional usability sessions often occur in quiet, artificial conditions. The toolkit lets the researcher introduce realistic disruptions — a notification, a cognitive stutter, a moment of emotional resistance — consistently and at calibrated severity levels. This does not simulate every real-world condition, but it provides a structured way to observe behaviour under stress.

There are real limitations. The method depends on facilitation skill: a GM who over-performs the fiction may distract from the product; one who under-explains the rules may leave the participant confused about whether they are performing, testing, or both. Some participants will find role-play unfamiliar or uncomfortable. Sessions take longer than standard usability tests because character creation and scenario framing require time that direct task observation does not.

Ethically, the method requires care. Perturbations can introduce emotional pressure, and the researcher must avoid making the participant feel trapped or judged. The character frame should protect the participant by providing narrative distance, not be used to extract responses participants would otherwise withhold. Participants should be able to pause, step out of character, or end the session at any point, and this must be made explicit before and during Session Zero.

This method is therefore most appropriate when the research question concerns situated behaviour, emotional response, complex context, or early requirements exploration. It is less appropriate when the goal is only to identify simple interface bugs, measure narrow task completion rates, or compare performance across many participants under standardised conditions.

---

## 7. Conclusion

This project designed and implemented a TTRPG-inspired UX research toolkit for user needs analysis. Building on the RECS framework proposed by Sturdee et al. (2023) and on related work on role-playing games, gamification, and iterative design, the project translated TTRPG structures into a practical research instrument that can be run in a single session.

The most important contribution is the reframing of the dice mechanic as perturbation injection rather than success judgement. This change is not cosmetic. It repositions the real product as the primary object of observation and the participant's actual behaviour as the data — rather than allowing the dice to displace or overshadow the product interaction. It also makes the method more honest to the RECS vision, which asks how TTRPG structures can make UX research richer, not how they can replace direct product observation.

Poco served as the primary test vehicle, and its fit was strong: the app's focus on task initiation, emotional friction, and attentional management created exactly the kind of design problem this toolkit is equipped to explore. At the same time, the toolkit was built to remain product-agnostic through a pack-based architecture, so future researchers can apply the method to other products without rebuilding the core session structure.

The next step is to run a comparative evaluation between RECS-style sessions and traditional usability testing on Poco, using the within-subjects design planned for the main thesis study. The expected contribution is not a claim that TTRPG methods should replace existing UX methods, but a clearer account of when and why role-play-driven research can surface needs, tensions, and contextual behaviours that standard methods are structurally unable to reach.

---

## References

Bowman, S. L. (2010). *The functions of role-playing games: How participants create community, solve problems and explore identity*. McFarland.

Deterding, S., Dixon, D., Khaled, R., & Nacke, L. (2011). From game design elements to gamefulness: Defining gamification. *Proceedings of the 15th International Academic MindTrek Conference: Envisioning Future Media Environments* (pp. 9–15). ACM. https://doi.org/10.1145/2181037.2181040

Fine, G. A. (1983). *Shared fantasy: Role playing games as social worlds*. University of Chicago Press.

Fullerton, T. (2018). *Game design workshop: A playcentric approach to creating innovative games* (4th ed.). A K Peters/CRC Press.

International Organization for Standardization. (2019). *ISO 9241-210:2019 Ergonomics of human-system interaction — Part 210: Human-centred design for interactive systems*. https://www.iso.org/standard/77520.html

Nielsen, J. (1993). *Usability engineering*. Morgan Kaufmann.

Sturdee, M., Gamboa, M., & Heron, M. (2023). TTRPG UX: Requirements & beyond. In *Extended Abstracts of the 2023 CHI Conference on Human Factors in Computing Systems (CHI EA '23)*, Article 426, 1–9. ACM. https://doi.org/10.1145/3544549.3582737
