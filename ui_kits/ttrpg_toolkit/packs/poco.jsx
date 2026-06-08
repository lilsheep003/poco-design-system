/* =============================================================
   packs/poco.jsx — RECS pack for Poco (ADHD productivity prototype).

   This pack uses Poco only as the real product under test. The
   RECS Toolkit remains the research instrument: it frames the session,
   injects perturbations, and helps the GM record situated feedback.

   Authoring notes:
   - Beats alternate narration (scene-setting read aloud) with
     challenge (perturbation injection).
   - Each challenge beat defines: attribute, difficulty, optional
     onCalm / onMild / onSignificant narrative overrides.
   - onCalm is what GM narrates when the roll comes up calm — usually
     "nothing unusual happens; carry on".
   - onMild / onSignificant can override the random library draw if
     the scenario author wants a specific narrative-fitting perturbation.
     Leave blank to rely on the library.
   ============================================================= */

window.RECS.Packs.register({
  id: 'poco',
  name: 'Poco — ADHD productivity prototype',
  description: 'Mobile productivity app used as a concrete test vehicle for three RECS walkthroughs: breaking down a large task, starting a focus session, and using Mind Drop to capture a loose thought and move one item into tasks.',
  productName: 'Poco',
  author: 'Boyang Wei & Yi Yang (Chalmers IxD, 2026)',
  notes: 'Participants should open Poco on a real phone or tablet and interact with it naturally throughout the session. The toolkit is the researcher\'s instrument; Poco is the product context used to make the session concrete.',

  complicationsExtra: [
    // Poco-specific flavour that the core library does not cover.
    { cat: 'Interface', severity: 2, line: 'The Break it down entry point is visible, but it competes with the general task capture controls.' },
    { cat: 'Cognitive', severity: 2, line: 'The friction options all feel partly true, so the character hesitates instead of choosing one.' },
    { cat: 'Interface', severity: 3, line: 'The generated breakdown shows several next steps at once. The character has to decide whether the first step is small enough.' },
    { cat: 'External', severity: 2, line: 'A message notification appears just as the character is about to start the focus timer.' },
    { cat: 'Emotional', severity: 2, line: 'Mochi feels encouraging to the character in theory, but slightly too cheerful for this exact moment.' },
    { cat: 'Cognitive', severity: 1, line: 'A new unrelated thought appears while the character is using Mind Drop, making capture feel messy but realistic.' },
    { cat: 'Emotional', severity: 2, line: 'After saving a Mind Drop item, the character is unsure whether to leave it, add it to tasks, or break it down.' },
  ],

  scenarios: [
    // ------------------------------ Scenario 1 ------------------------------
    {
      id: 'task-breakdown',
      title: 'Big Task Breakdown',
      icon: '🧩',
      duration: '15–20 min',
      productArea: 'Tasks · Break it down · Friction picker',
      premise: 'The character has a large work or study task that has been sitting around for days. It is important, but still too vague to start. Poco is open on the Tasks page.',
      goal: 'Use Poco to turn the large task into a smaller first step and a short set of follow-up steps.',

      beats: [
        {
          kind: 'narration',
          title: 'Scene — the task is too large',
          text: 'The task is not missing. It is known, visible, and still strangely hard to touch: write a 2000-word literature review for a course assignment.',
        },
        {
          kind: 'challenge',
          title: 'Finding the breakdown entry point',
          setup: 'The character needs to move from a vague task to the Break it down flow. The entry point has to be found before any support can happen.',
          taskPrompt: 'In Poco, open the Tasks page and find a way to break down the large task.',
          attribute: 'TLIT',
          difficulty: 'medium',
          onCalm:        'The screen hierarchy is kind today. The breakdown path is spotted without much searching.',
          onMild:        'The character notices the capture box first and pauses, unsure whether to type the task there or use another entry point.',
          onSignificant: 'The breakdown entry point is missed on the first pass. The character scrolls through tasks while the large task still feels untouched.',
        },
        {
          kind: 'challenge',
          title: 'Naming the hard task',
          setup: 'The Write screen asks what feels hard to start. Naming the task makes the problem more concrete, but also more exposed.',
          taskPrompt: 'Enter the large task into Poco: "Write a 2000-word literature review for a course assignment."',
          attribute: 'EREG',
          difficulty: 'easy',
          onCalm:        'The character writes the task plainly. The wording does not need to be perfect.',
          onMild:        'The character edits the wording twice, trying to make the task sound more manageable before continuing.',
          onSignificant: 'The task title feels too big once written down. The character hesitates before pressing Break Down.',
        },
        {
          kind: 'challenge',
          title: 'Choosing the friction',
          setup: 'Poco asks what feels hardest about this task right now. The character has to choose one reason, even though several feel true.',
          taskPrompt: 'Use the friction picker and choose the option that best matches why this task is hard to start.',
          attribute: 'PAT',
          difficulty: 'medium',
          onCalm:        'One option fits well enough. The character chooses it and continues.',
          onMild:        'Two options feel equally true. The character picks one but says the other one is still present.',
          onSignificant: 'The options start to feel like a diagnosis of the character rather than the task. The choice becomes emotionally loaded.',
        },
        {
          kind: 'challenge',
          title: 'Reading the first step',
          setup: 'Poco returns a smaller first step and several follow-up steps. The question is whether the first step actually feels startable.',
          taskPrompt: 'Review the generated breakdown. Identify the first step and decide whether it is small enough to begin.',
          attribute: 'WMEM',
          difficulty: 'medium',
          onCalm:        'The first step is easy to locate. It gives the character somewhere concrete to put their attention.',
          onMild:        'The follow-up steps pull attention away from the first step. The character has to re-read the screen.',
          onSignificant: 'The breakdown looks useful but too full. The character understands it intellectually while still not knowing what to do next.',
        },
        {
          kind: 'narration',
          title: 'Close — from task to first action',
          text: 'Debrief the toolkit: did the RECS beat structure help reveal why the character was stuck, or did it add another layer to manage?',
        },
      ],
    },

    // ------------------------------ Scenario 2 ------------------------------
    {
      id: 'focus-session',
      title: 'Focus Session',
      icon: '🎯',
      duration: '15–20 min',
      productArea: 'Focus setup · Timer · Companion',
      premise: 'The character has one first step available and wants to move into a short focus session. Poco offers quick start, custom setup, timer controls, and optional companion support.',
      goal: 'Set up and start a focus session, then observe whether the session framing and companion presence support or interrupt the transition into action.',

      beats: [
        {
          kind: 'challenge',
          title: 'Choosing quick start or custom setup',
          setup: 'Poco offers a fast path and a configurable path. The character has to decide how much setup they can tolerate before starting.',
          taskPrompt: 'Open the Focus area in Poco and choose either Quick Start or Custom Setup.',
          attribute: 'FOC',
          difficulty: 'easy',
          onCalm:        'The choice is clear. The character picks a path without spending much energy.',
          onMild:        'Custom setup looks useful, but the extra choices slow the character down.',
          onSignificant: 'The character starts comparing setup paths instead of entering focus. The transition into action stalls.',
        },
        {
          kind: 'challenge',
          title: 'Configuring the session',
          setup: 'If custom setup is used, the screen asks for intention, environment, duration, and companion mode. These settings can help, but they also require decisions.',
          taskPrompt: 'Set or accept an intention, environment, duration, and companion mode for the focus session.',
          attribute: 'WMEM',
          difficulty: 'medium',
          onCalm:        'The configuration feels light enough. The character can hold the settings in mind and continue.',
          onMild:        'One setting is unclear or unnecessary. The character chooses a default and moves on.',
          onSignificant: 'The settings create a small planning loop. The character forgets the original first step for a moment.',
        },
        {
          kind: 'narration',
          title: 'Scene — the timer starts',
          text: 'The focus screen changes from preparation to running state. Time is now visible. Poco offers a calm message and companion presence.',
        },
        {
          kind: 'challenge',
          title: 'Meeting the companion',
          setup: 'Mochi is present as gentle accountability. The character has to decide whether this feels supportive, decorative, or distracting.',
          taskPrompt: 'Let the focus session run briefly. Notice the companion message and decide whether it helps the character stay with the task.',
          attribute: 'SENS',
          difficulty: 'medium',
          onCalm:        'The companion feels quiet and non-judgmental. It gives the character a sense of not doing the task alone.',
          onMild:        'The companion is cute, but the character watches it for a moment instead of returning to the task.',
          onSignificant: 'The companion feels too cheerful for the character\'s state. Support starts to feel like pressure.',
        },
        {
          kind: 'challenge',
          title: 'Staying with the first step',
          setup: 'A few minutes into the session, the character notices an urge to check something else. The product keeps time; the toolkit watches what happens around that urge.',
          taskPrompt: 'Continue the focus session and observe whether the character stays with the first step or switches away.',
          attribute: 'FOC',
          difficulty: 'hard',
          onCalm:        'The urge passes. The character returns to the first step without needing a dramatic intervention.',
          onMild:        'The character checks something briefly and comes back. The interruption is small but visible.',
          onSignificant: 'The timer keeps running while attention moves elsewhere. The focus session records time, but the character has left the task.',
        },
        {
          kind: 'narration',
          title: 'Close — focus as transition',
          text: 'Debrief the toolkit: did the scenario make the transition into focus observable, and did perturbations reveal anything a normal task prompt might miss?',
        },
      ],
    },

    // ------------------------------ Scenario 3 ------------------------------
    {
      id: 'mind-drop',
      title: 'Mind Drop Inbox',
      icon: '💭',
      duration: '10–15 min',
      productArea: 'Tasks · Capture box · Mind Drop',
      premise: 'Late afternoon. The character has several loose thoughts: reminders, worries, maybe-tasks, and small obligations. One of them might become a real task if it can be captured first. Poco is open on the Tasks page.',
      goal: 'Use Mind Drop to capture loose thoughts, review the inbox, and move one item into tasks or toward breakdown.',

      beats: [
        {
          kind: 'narration',
          title: 'Scene — too many loose thoughts',
          text: 'The character is not ready to make a full plan, but keeping everything in working memory is not helping. The first move is to put a thought somewhere visible.',
        },
        {
          kind: 'challenge',
          title: 'Using the capture box',
          setup: 'The Tasks page has a capture field. The character needs to put one messy thought there without polishing it first.',
          taskPrompt: 'Type a loose thought into Poco\'s capture box and save it as a Mind Drop item.',
          attribute: 'EREG',
          difficulty: 'easy',
          onCalm:        'The thought lands in the box. It does not need perfect wording yet.',
          onMild:        'The character tries to make the thought sound more organized before saving it.',
          onSignificant: 'The character starts judging the thought as too vague to save and hesitates before capturing it.',
        },
        {
          kind: 'challenge',
          title: 'Finding the Mind Drop inbox',
          setup: 'After capture, the character has to find where the thought went. The feature has to feel like a safe holding place, not a disappearing drawer.',
          taskPrompt: 'Open Mind Drop and find the newly captured item alongside existing thoughts.',
          attribute: 'TLIT',
          difficulty: 'medium',
          onCalm:        'The inbox is found quickly. The captured thought is still there.',
          onMild:        'The character takes a wrong turn first and briefly wonders whether the thought was saved.',
          onSignificant: 'The item is not found immediately. The sense of relief from capturing it starts to fade.',
        },
        {
          kind: 'challenge',
          title: 'Moving one item forward',
          setup: 'Mind Drop offers actions such as Add to tasks and Break it down. The character needs to choose one captured thought that can move forward.',
          taskPrompt: 'Pick one Mind Drop item and use Add to tasks. If it feels too large, use Break it down instead.',
          attribute: 'PAT',
          difficulty: 'medium',
          onCalm:        'One item is clearly ready to become a task. The character moves it forward.',
          onMild:        'The character changes their mind once before choosing which item to add.',
          onSignificant: 'Several items compete for attention. The character is not sure which one deserves to become a task first.',
        },
        {
          kind: 'narration',
          title: 'Close — from thought to task',
          text: 'Debrief the toolkit: did the RECS session make the transition from loose thought to task visible, and what did the character say while choosing what to move forward?',
        },
      ],
    },
  ],
});
