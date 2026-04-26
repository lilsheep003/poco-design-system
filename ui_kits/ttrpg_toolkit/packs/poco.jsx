/* =============================================================
   packs/poco.jsx — RECS pack for Poco (ADHD productivity prototype).

   This is the default pack used in Boyang's master thesis user study.
   It demonstrates how a product-specific RECS is authored against the
   toolkit's generic core.

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
  description: 'Mobile productivity app that optimises for starting (not outputting). Focus companion named Mochi. Three scenarios probe launch friction, focus distractions, and overwhelmed inbox handling.',
  productName: 'Poco',
  author: 'Boyang Wei & Yi Yang (Chalmers IxD, 2026)',
  notes: 'Participants should open Poco on a real phone or tablet and interact with it naturally throughout the session. The toolkit is the researcher\'s instrument; the real product is the research target.',

  complicationsExtra: [
    // Poco-specific flavour that the core library does not cover.
    { cat: 'Interface', severity: 2, line: 'Mochi the bunny says something encouraging at the exact moment the character was about to focus.' },
    { cat: 'Emotional', severity: 2, line: 'The status-pill tags (priority / easy) feel judgemental. The character hesitates to pick anything.' },
    { cat: 'Cognitive', severity: 1, line: 'The Mood / Energy / Focus triad looks arbitrary. The character freezes on what "Focus 3" even means.' },
    { cat: 'Interface', severity: 3, line: 'A break-down flow opens with too many sub-prompts visible at once. The character scrolls, lost.' },
  ],

  scenarios: [
    // ------------------------------ Scenario 1 ------------------------------
    {
      id: 'morning-launch',
      title: 'The Morning Standoff',
      icon: '🌅',
      duration: '15–20 min',
      productArea: 'Home · Tasks · Breakdown',
      premise: 'It is a weekday morning. The character woke up later than they meant to. Their phone is on the pillow. There is one small thing they could do to feel like today has started. Poco is open.',
      goal: 'Pick one task and actually begin it.',

      beats: [
        {
          kind: 'narration',
          title: 'Scene — hand finds the phone',
          text: 'The home screen greets you. Something about mood, energy, focus. You have not decided any of those yet.',
        },
        {
          kind: 'challenge',
          title: 'Approaching the state check-in',
          setup: 'The app wants you to mark how you feel. You have to pick, even though nothing feels quite right.',
          taskPrompt: 'Open Poco on your phone and attempt the state check-in (mood / energy / focus).',
          attribute: 'EREG',
          difficulty: 'medium',
          onCalm:        'The room is quiet. Nothing interrupts. You approach the check-in at your own pace.',
          onMild:        'A message notification lights up the lock screen edge as you reach for the check-in. You pause.',
          onSignificant: 'Before you can tap anything, a surge of "I should not be this late" arrives. Your finger hovers.',
        },
        {
          kind: 'narration',
          title: 'Scene — today\'s tasks',
          text: 'A list. Some tasks have coral pills ("priority"). Some have sage pills ("easy"). A few have both. Scroll is available.',
        },
        {
          kind: 'challenge',
          title: 'Choosing a task from the list',
          setup: 'You need to pick. Priority ones feel heavy. Easy ones feel pointless.',
          taskPrompt: 'In Poco, scroll the task list and select one task you would realistically start right now.',
          attribute: 'PAT',
          difficulty: 'medium',
          onCalm:        'The tasks stay still. You have time. No interruption.',
          onMild:        'As you scroll, Mochi the bunny nudges into view with an encouraging line. Your eyes drift off the list.',
          onSignificant: 'The priority tags start to feel like accusations. Your shoulders tighten. The list scrolls past the easy ones too fast.',
        },
        {
          kind: 'challenge',
          title: 'Deciding to break it down',
          setup: 'Your chosen task still feels vague. There is a "Break it down" button somewhere.',
          taskPrompt: 'Try to find and use the Break-it-down feature on the task you picked.',
          attribute: 'TLIT',
          difficulty: 'easy',
          onCalm:        'Nothing distracts you as you look for the button.',
          onMild:        'The button you think is Break-it-down is just below a loading banner that appears and disappears. Mis-tap risk.',
          onSignificant: 'The break-down flow opens with too many sub-prompts at once. You scroll, overwhelmed.',
        },
        {
          kind: 'narration',
          title: 'Close — a small beginning',
          text: 'The session ends. Before we debrief: on a scale of not-at-all to completely, did the app ask anything of you that matched what you wanted to do with your morning?',
        },
      ],
    },

    // ------------------------------ Scenario 2 ------------------------------
    {
      id: 'focus-siege',
      title: 'Focus Under Siege',
      icon: '🎯',
      duration: '20–25 min',
      productArea: 'Focus session · Mochi companion',
      premise: 'Mid-morning. The character has decided to do a focus session. Poco has a rabbit named Mochi who appears during focus time and sometimes talks. The character has mixed feelings about cute companions in productivity apps.',
      goal: 'Start a focus session, survive the first ten minutes, form a verdict on whether Mochi helps.',

      beats: [
        {
          kind: 'challenge',
          title: 'Setting up the focus session',
          setup: 'The setup screen asks for an intention, an environment tag, a duration, and a mode. Four fields. You have to commit.',
          taskPrompt: 'In Poco, open the Focus screen and fill in all four setup fields honestly.',
          attribute: 'WMEM',
          difficulty: 'medium',
          onCalm:        'You fill all four fields in under thirty seconds. They feel honest.',
          onMild:        'One field (probably intention) is surprisingly hard to name. You stare at it and consider faking it.',
          onSignificant: 'You lose track halfway and cannot remember whether you already filled the environment field. You scroll back up.',
        },
        {
          kind: 'narration',
          title: 'Scene — Mochi arrives',
          text: 'The timer starts. A warm-cream tile slides in at the bottom. Mochi the rabbit. A small, high voice says something encouraging.',
        },
        {
          kind: 'challenge',
          title: 'Reacting to Mochi',
          setup: 'Is this delightful? Patronising? The app assumes you will enjoy this.',
          taskPrompt: 'Let Mochi play for a moment. Decide whether to mute, keep on, or adjust.',
          attribute: 'SENS',
          difficulty: 'easy',
          onCalm:        'The voice is gentle. You find it quietly charming.',
          onMild:        'The voice is slightly too cheerful for your current mood. You fumble for the mute toggle.',
          onSignificant: 'The voice irritates you immediately and you feel faintly ashamed that such a small thing bothers you.',
        },
        {
          kind: 'challenge',
          title: 'Staying with the task',
          setup: 'Three minutes in. The urge to check something else rises.',
          taskPrompt: 'Work on your chosen task. Notice urges to switch away.',
          attribute: 'FOC',
          difficulty: 'hard',
          onCalm:        'The urges are faint. You notice and return to the task without switching.',
          onMild:        'You switch apps briefly, notice, and come back. Some time is lost.',
          onSignificant: 'You are elsewhere for a while. The timer keeps running without you.',
        },
        {
          kind: 'challenge',
          title: 'A Mochi event fires',
          setup: 'Mochi has found a lucky clover. A small notification. Does reading it break your concentration or reinforce it?',
          taskPrompt: 'Decide in real time: glance and return, or fully open the event.',
          attribute: 'SENS',
          difficulty: 'medium',
          onCalm:        'You glance, smile, return to work. The interruption cost nothing.',
          onMild:        'You read the whole thing. You lose the thread of what you were doing for about fifteen seconds.',
          onSignificant: 'You tap it, scroll, watch the animation. Two minutes pass before you notice.',
        },
        {
          kind: 'narration',
          title: 'Close — the summary',
          text: 'The session ends. Poco shows points, event log, reflection. Before we debrief: did Mochi help, hinder, or just decorate?',
        },
      ],
    },

    // ------------------------------ Scenario 3 ------------------------------
    {
      id: 'overwhelm-mindmap',
      title: 'The Overwhelmed Mind Drop',
      icon: '🧠',
      duration: '15 min',
      productArea: 'Mind Drop · Task triage',
      premise: 'Late afternoon. The character\'s head holds about twelve half-thoughts, most of which are things they should do or might have forgotten. Poco has a Mind Drop feature for this.',
      goal: 'Dump everything, pick one to actually do, begin it.',

      beats: [
        {
          kind: 'challenge',
          title: 'Finding Mind Drop',
          setup: 'You recall someone mentioning this feature. Maybe it is in Tasks. Maybe Home.',
          taskPrompt: 'In Poco, try to locate the Mind Drop feature.',
          attribute: 'TLIT',
          difficulty: 'medium',
          onCalm:        'You find it in two taps. The screen opens with a blank field.',
          onMild:        'You find it after a wrong turn. Slight annoyance but you arrive.',
          onSignificant: 'You cannot find it. You end up on the wrong screen and consider giving up.',
        },
        {
          kind: 'challenge',
          title: 'Dumping everything',
          setup: 'The field accepts short lines. You have to type without editing.',
          taskPrompt: 'Type out the thoughts in your head as short lines. Resist editing.',
          attribute: 'EREG',
          difficulty: 'easy',
          onCalm:        'You get eight lines down. Shoulders drop a fraction.',
          onMild:        'You get four lines, then start editing. Momentum slows.',
          onSignificant: 'You type two lines and start deleting. Self-editing kicks in. Nothing gets captured.',
        },
        {
          kind: 'challenge',
          title: 'Converting one to a task',
          setup: 'The drops sit in an inbox. You need to promote one to a task.',
          taskPrompt: 'Pick one Mind Drop item and convert it into a Task.',
          attribute: 'PAT',
          difficulty: 'medium',
          onCalm:        'You pick the smallest. Done.',
          onMild:        'You pick, un-pick, pick again. It takes longer than it should.',
          onSignificant: 'You cannot decide. The inbox stays full.',
        },
        {
          kind: 'challenge',
          title: 'Starting now',
          setup: 'The chosen task is now on your today list. There is a Start button. The room is quiet.',
          taskPrompt: 'Tap Start. Begin.',
          attribute: 'FOC',
          difficulty: 'hard',
          onCalm:        'You tap start. You begin.',
          onMild:        'You tap start, tab away, return two minutes later.',
          onSignificant: 'You look at the task. You do not tap start. The phone goes face down.',
        },
        {
          kind: 'narration',
          title: 'Close — what remained',
          text: 'Debrief: of the twelve thoughts you had, how many are still in your head? Did the app hold them for you, or just show them back?',
        },
      ],
    },
  ],
});
