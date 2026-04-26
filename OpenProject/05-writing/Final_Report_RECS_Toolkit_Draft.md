# Role-Play Driven UX

## A TTRPG-Inspired Toolkit for User Needs Analysis

**Authors:** Yi Yang, Boyang Wei  
**Programme:** Interaction Design, Chalmers University of Technology  
**Project context:** Master thesis design and research project  
**Primary test product:** Poco, a gentle productivity app prototype designed as part of the thesis work  

---

## Abstract

This report documents the design of a lightweight tabletop role-playing game (TTRPG)-inspired toolkit for user needs analysis. The project builds on the Requirements Elicitation Campaign Setting (RECS) proposed by Sturdee, Gamboa and Heron (2023), which frames UX research sessions as playable worlds where participants inhabit persona characters, researchers act as gamesmasters (GMs), and dice mechanics introduce scenario-based complications.

The aim of this project was to translate that conceptual approach into a practical research instrument that can be used during early-stage UX work. The resulting toolkit supports character creation, scenario selection, dice-based perturbation injection, GM note-taking, quote capture, and structured session export. Poco, the author's master thesis prototype for ADHD-oriented productivity support, was used as the main test vehicle for designing and evaluating the toolkit. The project shows how TTRPG structures can be adapted for UX research without turning the product test into a game in itself: the participant still uses the real product, while the toolkit creates narrative distance, introduces realistic disruptions, and captures richer contextual data.

---

## 1. Introduction

User needs analysis often depends on asking people to describe what they do, what they need, and what frustrates them. However, people do not always know how to explain their needs directly. Some needs only appear when a person is placed inside a situation, asked to make decisions, and allowed to respond naturally to tension, interruption or uncertainty. This is especially relevant for products that support emotional, cognitive or everyday self-management tasks, where the user's experience is not only about completing an interface flow but also about managing attention, confidence, energy and context.

This project explores whether ideas from tabletop role-playing games can support this kind of UX research. In a TTRPG, participants do not simply answer questions. They take on roles, act within a fictional situation, negotiate meaning with other participants, and respond to events introduced by rules or by a facilitator. Fine's sociological study of fantasy role-playing games describes these games as social worlds built through shared imagination, rules and group interaction (Fine, 1983). Bowman also argues that role-playing can support identity exploration, creativity, social connection and problem-solving (Bowman, 2010). These qualities make TTRPGs relevant to UX research because UX researchers also work with imagined users, scenarios, motivations and breakdowns.

The direct inspiration for this project is Sturdee, Gamboa and Heron's paper *TTRPG UX: Requirements & Beyond* (2023). Their work proposes that UX research can borrow from TTRPGs to create "playable UX worlds" where personas become characters, user journeys become adventures, and the researcher takes on a GM-like role. Rather than treating users as test subjects who only succeed or fail tasks, this approach invites participants to explore a situated experience from within a role.

The contribution of this project is a working toolkit that turns that idea into a practical research artefact. The toolkit is intended for early-stage user needs analysis, usability exploration and design reflection. It does not replace interviews or usability testing. Instead, it extends them by adding role-play, scenario framing and controlled perturbations. The primary product used to test the toolkit is Poco, a mobile-first productivity app prototype created as part of the author's master thesis. Poco was suitable as a test case because it deals with attention, task initiation, emotional state and cognitive friction, all of which benefit from richer contextual exploration.

---

## 2. Background and Literature

### 2.1 Tabletop role-playing games as structured imagination

TTRPGs combine rules, roles and collaborative storytelling. A typical session involves a facilitator, often called a GM, who presents the world and its situations, while players control characters within that world. The rules provide structure, but the exact course of events emerges through conversation, interpretation and decision-making.

This balance between structure and openness is important for UX research. Traditional research scenarios can become too scripted: the participant is asked to do a task, the researcher observes whether the task succeeds, and the session moves on. TTRPGs suggest a different model. A scenario can still have structure, but the participant is allowed to interpret the situation through a role, express uncertainty aloud, and encounter unexpected events. Fine (1983) is useful here because he frames role-playing games not only as entertainment but as social systems with their own norms, frames and patterns of interaction. Bowman (2010) extends this by discussing role-playing as a way for participants to create community, solve problems and explore identity.

For this project, the value of TTRPG is not fantasy content. The useful parts are the facilitation structure, character framing, scenario-based action, and rule-supported uncertainty.

### 2.2 From gamification to role-play-driven UX

The project also sits near discussions of gamification, but it does not treat gamification as points, badges or rewards. Deterding et al. (2011) define gamification as the use of game design elements in non-game contexts. That definition is helpful as a broad starting point, but this project uses a narrower and more specific interpretation: TTRPG-inspired UX research is not mainly about motivation or entertainment. It is about using game structures to make situated user experiences observable.

In this sense, the toolkit is closer to role-play-driven research than to conventional gamification. The dice mechanic is not included to make the test more exciting. It is included to introduce realistic disruptions in a controlled way. The character sheet is not included to make the participant "level up." It is included to create a persona that can be inhabited, questioned and observed. The GM role is not included to dramatise the session. It is included to help the researcher guide the situation while capturing data.

### 2.3 RECS and TTRPG UX

Sturdee, Gamboa and Heron (2023) provide the central framework for this project. Their paper proposes a Requirements Elicitation Campaign Setting (RECS), where UX researchers can use TTRPG structures to support requirements elicitation and user experience work. The paper maps TTRPG elements to UX elements: characters relate to personas, adventures relate to user journeys, and the GM role relates to research facilitation.

The most important idea taken from RECS is that role-play can create psychological distance. When a participant speaks as a character, they may be able to describe frustration, hesitation, shame, confusion or resistance in a less personally exposed way. This is useful when researching products where the user's state matters. For example, in Poco, the user may be tired, overwhelmed, distracted or self-critical. These are not simple usability variables, but they strongly affect whether the product helps.

The RECS paper is conceptual. It proposes the potential of TTRPG UX but does not provide a complete working instrument. This project responds to that gap by designing a toolkit that a researcher can actually run in a session.

### 2.4 Human-centred and iterative design

The toolkit was developed through a human-centred and iterative design process. ISO 9241-210:2019 describes human-centred design as an approach that focuses on users, their needs and requirements throughout the lifecycle of interactive systems. This project follows that orientation by treating the toolkit as a research instrument that must be understandable to both researchers and participants, not only as a conceptual model.

The design process also borrows from playtesting practice. Fullerton's *Game Design Workshop* emphasises prototyping, playtesting and revising game systems through repeated use (Fullerton, 2018). This is relevant because the toolkit is partly a research method and partly a rule-based experience. Its quality cannot be judged only by reading the rules. It has to be tested in motion: whether the GM can explain it, whether participants understand the character sheet, whether dice results feel meaningful, and whether the session record supports later analysis.

---

## 3. Design Aim and Requirements

The aim of the project was to design a lightweight TTRPG-inspired UX research toolkit for user needs analysis. The toolkit should help researchers run sessions in which participants inhabit persona characters, move through product-related scenarios, and respond to controlled perturbations while using a real product.

The toolkit was designed around six requirements.

1. **Support persona-as-character creation.** The participant should be able to build or adjust a persona character with attributes, traits and a short backstory. This makes the session role-playable rather than only task-based.

2. **Use scenario-based research tasks.** The toolkit should present scenarios as sequences of beats. Each beat should either set context or introduce a challenge linked to a real product action.

3. **Separate product performance from dice outcomes.** The dice should not decide whether the participant succeeds in the product. Product behaviour remains observable on the real interface. The dice only decide whether the environment introduces a perturbation.

4. **Give the researcher a clear GM role.** The researcher should be able to guide narration, call for rolls, observe participant behaviour, record notes and capture quotes without losing track of the session.

5. **Produce analysable session records.** At the end of a session, the toolkit should produce a structured export containing the character sheet, scenario, rolls, perturbations, GM notes, participant quotes and debrief.

6. **Remain reusable across products.** Poco is the main test vehicle, but the toolkit should not be locked to Poco. Product-specific scenarios should live in separate packs so that other researchers can adapt the method.

---

## 4. Toolkit Design Process

### 4.1 Concept mapping

The first design step was to translate core TTRPG concepts into UX research concepts. This mapping helped define what the toolkit needed to contain.

| TTRPG concept | UX research translation | Toolkit implementation |
|---|---|---|
| Player character | Persona or situated user | Character sheet with attributes, traits and backstory |
| Attributes | User capacities and vulnerabilities | Six UX-facing attributes such as Focus, Patience and Working Memory |
| GM | UX researcher or facilitator | GM notebook, narration prompts and live observation tools |
| Adventure | User journey or research scenario | Scenario packs with beat-by-beat flows |
| Dice roll | Rule-based uncertainty | d20 roll plus attribute modifier |
| Complication | Realistic friction or interruption | Interface, cognitive, emotional and external perturbation library |
| Session log | Research data artefact | Markdown and JSON export |

This mapping was important because it prevented the toolkit from becoming only a themed usability test. Each TTRPG element had to serve a research function.

### 4.2 Character sheet design

The character sheet is the participant's entry point into role-play. Instead of asking participants to test only as themselves, the toolkit asks them to create a plausible user character. The character includes a name, role, age, short backstory, device context, app habits and six attributes:

- Patience
- Focus
- Working Memory
- Emotional Regulation
- Tech Literacy
- Sensory Tolerance

Each attribute is rated from 1 to 5. The point budget is 18 across all six attributes, which makes a neutral character possible but encourages deliberate trade-offs. A participant who gives a character high Focus may need to lower Sensory Tolerance or Emotional Regulation. This makes the persona more specific and gives the GM a better sense of how the character might experience friction.

The attributes were chosen because they describe capacities that often shape digital product use. For Poco in particular, attention, emotional regulation, working memory and sensory tolerance are important because the app is designed for users who may struggle with task initiation and cognitive overload.

### 4.3 Scenario and beat structure

Each session is built around a scenario. A scenario has a premise, a goal and a sequence of beats. Some beats are narration beats, used to set emotional and situational context. Other beats are challenge beats, where the participant attempts a concrete product action and the GM calls for a roll.

This structure keeps the session guided without making it rigid. The researcher knows where the session is going, but the participant's responses, comments and decisions can still shift the meaning of the situation.

The Poco pack contains three scenarios:

- **The Morning Standoff**, focused on morning task initiation, state check-in and choosing one task to begin.
- **Focus Under Siege**, focused on starting a focus session, reacting to Mochi the companion, and staying with a task under distraction.
- **The Overwhelmed Mind Drop**, focused on capturing scattered thoughts, converting one into a task, and beginning.

These scenarios were chosen because they match Poco's core thesis as a product: productivity support should not only optimise output, but should reduce the friction of starting.

### 4.4 The central design pivot: from success judgement to perturbation injection

The most important design decision was a shift in how the dice mechanic was understood.

In the first interpretation, the dice roll was treated as a success or failure judgement. This was an intuitive reading because many role-playing games use dice to decide whether a character succeeds at an action. However, this created a problem for UX research. If the die decides whether the participant succeeds, then the toolkit starts to replace the product as the object of evaluation. The participant might respond to the die rather than to the actual interface.

The final design uses a different logic: the dice do not judge product success. They inject perturbations into the environment. The participant still uses the real product, and their actual behaviour remains the research data. The roll only decides whether the surrounding situation is calm, mildly disrupted, significantly disrupted, or compounded by multiple disruptions.

This pivot made the toolkit more faithful to the purpose of UX research. A product is not being tested in a neutral vacuum. Users are often tired, distracted, interrupted, uncertain or emotionally affected. Perturbation injection gives the researcher a structured way to introduce those conditions without improvising randomly.

### 4.5 GM-facing design

The toolkit is mainly researcher-facing. The participant uses the real product, while the GM uses the toolkit to guide the session. This decision keeps the participant's attention on the product being studied.

The GM-facing parts include:

- narration prompts for each beat;
- task prompts that identify what the participant should attempt in the real product;
- dice roll controls;
- perturbation outcomes;
- a GM notebook for live observations;
- quote capture with timestamps;
- a roll and perturbation log;
- a summary and export screen.

This makes the toolkit not only a game-like layer but also a research capture tool.

---

## 5. Final Design Outcome

### 5.1 Session flow

The final toolkit follows a five-stage session flow.

| Stage | Purpose | Main output |
|---|---|---|
| Setup | Prepare the session and participant code | Session identity and checklist |
| Character | Build the persona character | Character sheet and attribute profile |
| Scenario Picker | Choose product pack and scenario | Active research scenario |
| Scenario Run | Move through narration and challenge beats | Rolls, perturbations, notes and quotes |
| Summary | Review and export the session | Markdown and JSON session record |

The flow is designed so a researcher can run one participant through one scenario in a single sitting. The toolkit does not try to automate analysis. Instead, it produces a clean record that can later be used for thematic analysis or comparison with traditional usability testing data.

### 5.2 Dice and perturbation system

The dice system uses a d20 roll plus an attribute modifier. The modifier is calculated from the character's attribute value. Difficulty classes are set at three levels: Easy, Medium and Hard. The result is classified into one of five bands:

| Outcome | Meaning in the toolkit |
|---|---|
| Calm + small advantage | The environment is especially kind; no perturbation |
| Calm | The participant continues naturally |
| Mild perturbation | A small disruption is introduced |
| Significant perturbation | A stronger disruption is introduced |
| Compound perturbation | Multiple or severe disruptions are introduced |

The key point is that these outcomes describe the environment, not the participant's competence. For example, if a character fails a Focus check during a Poco focus session, this does not mean the participant failed to use Poco. It means the environment now introduces a distraction, such as a notification, intrusive thought or companion event. The participant's response to that disruption is then observed.

### 5.3 Complication library

The toolkit includes a product-agnostic complication library with four categories:

- **Interface:** unexpected system behaviour, unclear controls or layout changes.
- **Cognitive:** memory lapses, decision paralysis or losing track of intent.
- **Emotional:** self-blame, shame, frustration or feeling watched.
- **External:** off-device interruptions such as notifications or someone speaking.

Each complication has a severity level. Mild perturbations draw low-severity complications, while significant or compound perturbations can draw higher-severity ones. Product packs can also add product-specific complications. The Poco pack, for example, includes complications related to Mochi, status tags, Mood/Energy/Focus check-ins and the break-down flow.

### 5.4 Poco as the primary test vehicle

Poco is not an arbitrary example. It is the author's master thesis design work: a gentle productivity app prototype for people who experience friction around starting tasks, managing state and sustaining focus. Its core interactions include state check-in, task breakdown, Mind Drop, focus sessions and Mochi, a small companion character.

Poco was a strong test vehicle for the toolkit for three reasons. First, the product deals with subjective states such as energy, focus, overwhelm and emotional resistance. Second, its value depends on how it behaves under messy everyday conditions, not only under clean task completion. Third, its design already contains scenario-rich moments: choosing a task in the morning, entering focus mode, reacting to companion feedback, or dumping thoughts into an inbox.

Using Poco allowed the toolkit to be tested against a real thesis artefact while still preserving the toolkit's general purpose. The toolkit can run other product packs, but Poco provided the main design context and pilot scenario set.

### 5.5 Research output

The final output of a toolkit session is a structured record. The Markdown export is intended for human reading and qualitative analysis. The JSON export preserves the full session object for possible aggregation.

The export includes:

- participant code;
- selected product pack and scenario;
- complete character sheet;
- attribute values;
- each beat encountered;
- all dice rolls and outcomes;
- complications injected;
- stress and UXP changes;
- GM live notes;
- participant quotes;
- post-session debrief.

This output is important because the value of the method depends not only on making sessions more engaging, but on producing data that can be analysed after the session.

---

## 6. Testing and Evaluation Process

### 6.1 Automated smoke testing

The first layer of testing was an internal smoke test using Playwright. The test starts with an empty browser storage state, opens the toolkit, enters a participant code, creates a persona name, selects a scenario pack, chooses a Poco scenario and starts the session. It checks that the main interface renders, expected controls appear at each stage, and no JavaScript console or page errors are produced.

This test does not prove that the research method is effective, but it does verify that the tool can be run end-to-end without basic functional failure. For a research instrument, this matters because a broken session flow can damage the quality of participant data.

### 6.2 Internal dry run

The second layer is an internal dry run between the thesis authors. In this test, one author acts as GM and the other acts as participant. The goal is to check the method in use, not only the interface.

The dry run should focus on:

- whether Session Zero is understandable;
- whether the participant can create and inhabit a character;
- whether the attribute explanations are clear;
- whether scenario beats are paced appropriately;
- whether dice results feel meaningful rather than arbitrary;
- whether perturbations create useful observations;
- whether the GM can capture notes and quotes while facilitating;
- whether the exported record is readable after the session.

This stage is closest to playtesting. It checks the flow, timing and feel of the method.

### 6.3 Pilot testing

The third layer is a pilot test with one or two Interaction Design peers before any larger study. These participants do not need to be the final target users of Poco. Their role is to surface problems in the toolkit itself: unclear instructions, confusing terminology, awkward GM scripts, overlong beats, weak perturbations or missing export data.

Pilot feedback should be collected through observation and a short debrief. Useful questions include:

- Did the participant understand the difference between themselves and the character?
- Did role-play make it easier or harder to speak about the product experience?
- Did the dice mechanic feel useful, distracting or unfair?
- Did the perturbations feel realistic?
- Did the GM role feel manageable?
- Did the session produce findings that a normal usability test might miss?

The pilot should lead to a revised version of the toolkit before the main evaluation.

### 6.4 Main study direction

The larger evaluation can compare a RECS-style session with a more traditional usability testing session using Poco. The comparison does not need to prove that one method is universally better. A more realistic goal is to identify what kinds of insights each method produces.

As a baseline, the traditional session can follow usability engineering practice by focusing on task success, time on task, usability issues and think-aloud comments (Nielsen, 1993). The RECS session can focus on situated needs, emotional responses, role-play reflections, perturbation responses and GM observations. Comparing the two can show whether the TTRPG-inspired method reveals different kinds of data.

### 6.5 Data to collect

The study can combine qualitative and quantitative data.

Qualitative data:

- participant comments during the session;
- GM notes;
- post-session debrief responses;
- observed hesitation, confusion or emotional reaction;
- reflections on the character and scenario.

Quantitative or structured data:

- task completion;
- time on task;
- roll outcomes;
- number and type of perturbations;
- stress count;
- UXP use;
- participant ratings of clarity, engagement, comfort and perceived realism.

The main analysis should focus on insight quality: what did the method reveal, how specific were the findings, and whether those findings could inform design decisions for Poco or similar products.

---

## 7. Discussion

The toolkit's main value is that it makes user needs more situated. Instead of asking a participant to state needs abstractly, it places a character inside a moment: waking up late, trying to start work, losing focus, receiving a notification, feeling judged by a priority tag, or deciding whether a companion character is comforting or annoying. These moments can surface needs that are difficult to access through direct questioning.

For Poco, this is especially relevant. The app's design challenge is not only whether a button is visible or a screen is understandable. It is whether the product can help when the user is tired, scattered, ashamed, indecisive or overloaded. The TTRPG-inspired toolkit gives the researcher a way to explore these states without forcing the participant to speak only from personal vulnerability. The character creates distance, while the scenario keeps the session concrete.

The perturbation mechanic is also useful because it introduces controlled messiness. Traditional usability tests often happen in quiet, artificial conditions. Real use does not. A user may receive a message, forget why they opened the app, feel self-critical, or be interrupted by someone nearby. The toolkit does not simulate every real-world condition, but it lets the researcher introduce some of them consistently.

There are also limitations. The method depends on facilitation skill. A GM who over-performs the fiction may distract from the product, while a GM who under-explains the rules may leave the participant confused. Some participants may find role-play unfamiliar or uncomfortable. The session may also take longer than a standard usability test because character creation and scenario framing require time.

Ethically, the method needs care. Because perturbations can include emotional pressure, the researcher must avoid making the participant feel judged or trapped. The character frame should protect the participant, not manipulate them. Participants should be able to pause, step out of character or stop the session.

The method is therefore most appropriate when the research question concerns situated behaviour, emotional response, complex context or early requirements exploration. It is less appropriate when the goal is only to find simple interface bugs or measure a narrow task completion rate.

---

## 8. Conclusion

This project designed a TTRPG-inspired UX research toolkit for user needs analysis. Building on RECS and related work on role-playing, gamification and iterative design, the project translated TTRPG concepts into a practical research instrument. The final toolkit includes persona character creation, scenario-based task flow, dice-driven perturbation injection, GM note-taking and structured session export.

The most important design decision was to treat dice rolls as environmental perturbations rather than success judgements. This keeps the real product at the centre of the research session while allowing the researcher to introduce realistic disruptions. The participant's behaviour, comments and recovery strategies remain the actual data.

Poco, the author's master thesis prototype, served as the primary test vehicle. Its focus on task initiation, emotional state and attention made it a strong context for exploring the toolkit. At the same time, the toolkit was designed to remain product-agnostic through scenario packs, so future researchers can adapt it to other products.

The next step is to complete pilot testing and then compare RECS-style sessions with traditional usability testing. The expected contribution is not a claim that TTRPG methods should replace existing UX methods, but a clearer understanding of when role-play-driven research can reveal needs, tensions and contextual behaviours that standard methods may miss.

---

## References

Bowman, S. L. (2010). *The functions of role-playing games: How participants create community, solve problems and explore identity*. McFarland.

Deterding, S., Dixon, D., Khaled, R., & Nacke, L. (2011). From game design elements to gamefulness: Defining gamification. *Proceedings of the 15th International Academic MindTrek Conference: Envisioning Future Media Environments*, 9-15. ACM. https://doi.org/10.1145/2181037.2181040

Fine, G. A. (1983). *Shared fantasy: Role playing games as social worlds*. University of Chicago Press.

Fullerton, T. (2018). *Game design workshop: A playcentric approach to creating innovative games* (4th ed.). A K Peters/CRC Press.

International Organization for Standardization. (2019). *ISO 9241-210:2019 Ergonomics of human-system interaction - Part 210: Human-centred design for interactive systems*. https://www.iso.org/standard/77520.html

Nielsen, J. (1993). *Usability engineering*. Morgan Kaufmann.

Sturdee, M., Gamboa, M., & Heron, M. (2023). TTRPG UX: Requirements & beyond. In A. Schmidt, K. Vaananen, T. Goyal, P. O. Kristensson, & A. Peters (Eds.), *Extended Abstracts of the 2023 CHI Conference on Human Factors in Computing Systems (CHI EA '23)*, Article 426, 1-9. ACM. https://doi.org/10.1145/3544549.3582737

---

## Suggested Appendices

The following appendices are recommended for the final submission, but they do not need to be part of the main report body:

- Appendix A: RECS Toolkit rulebook and GM facilitator guide
- Appendix B: Scenario pack schema
- Appendix C: Poco scenario examples
- Appendix D: Pilot testing protocol
- Appendix E: Screenshots of the final toolkit
