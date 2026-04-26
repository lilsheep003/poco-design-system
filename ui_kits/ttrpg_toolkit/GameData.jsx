/* =============================================================
   GameData.jsx — CORE rules only. Product-agnostic.
   Scenarios live in packs/*.jsx and register via RECS.Packs.
   =============================================================

   Concepts implemented here (all from Sturdee, Heron, Gamboa 2023):
   - Attributes (generic UX capacities; adapt D&D 6-stat structure)
   - Dice mechanic (d20 + mod vs DC, 5-band outcome)
   - UXP (User Experience Points — Fig. 3)
   - Stress clock (Blades-in-the-Dark inspired, §4.1)
   - Complication library (Interface / Cognitive / Emotional / External)

   ============ Perturbation-injection semantics (v2) ============

   Dice do NOT judge whether the participant's action on the real
   product succeeded. They decide what the **environment injects**
   at this moment. The participant continues operating the real
   product while carrying the injected perturbation.

   crit / ok     → calm moment, no perturbation
   mix           → mild perturbation (sev 1–2)
   fail / crit-fail → significant / compound perturbation (sev 2–3)

   Higher attribute = more resilient to the moment's noise (more
   likely to roll into the 'calm' bands). Lower attribute = more
   vulnerable. The participant's task performance is observed on
   the real device, not scored by the toolkit.
   ============================================================= */

/* ------------------------------ Attributes ------------------------------ */
// Generic UX capacities. 1–5 stars. Modifier = value − 3.
// These are the UX equivalents of D&D's 6 base stats — universal
// across packs. Individual packs may later extend with product-
// specific proficiencies (future enhancement).
const ATTRIBUTES = [
  { key: 'PAT',  name: 'Patience',
    gloss: 'Tolerance for friction, waiting, ambiguity',
    example: 'Long loading screens, unclear confirmations' },
  { key: 'FOC',  name: 'Focus',
    gloss: 'Holding one goal across distractions',
    example: 'Staying on task when notifications or side-UIs appear' },
  { key: 'WMEM', name: 'Working Memory',
    gloss: 'Holding multi-step context across screens',
    example: 'Remembering a code, a field value, or a path back' },
  { key: 'EREG', name: 'Emotional Regulation',
    gloss: 'Recovering from frustration, self-blame, dead-ends',
    example: 'Handling an error, a refusal, or unexpected state' },
  { key: 'TLIT', name: 'Tech Literacy',
    gloss: 'Familiarity with digital conventions and metaphors',
    example: 'Recognising a hamburger menu, gesture, or modal' },
  { key: 'SENS', name: 'Sensory Tolerance',
    gloss: 'Reaction to busy visuals, motion, audio',
    example: 'Animations, dense layouts, surprise sounds' },
];

const POINT_BUDGET = 18;   // points to distribute among the 6 attrs
const START_UXP    = 4;
const START_STRESS = 0;

/* ------------------------------ Dice ------------------------------ */
const DIFFICULTY = {
  easy:   { label: 'Easy',   dc: 10 },
  medium: { label: 'Medium', dc: 14 },
  hard:   { label: 'Hard',   dc: 18 },
};

function classifyRoll(d20, total, dc) {
  if (d20 === 1)  return 'crit-fail';
  if (d20 === 20) return 'crit';
  if (total >= dc + 10) return 'crit';
  if (total >= dc)      return 'ok';
  if (total >= dc - 4)  return 'mix';
  return 'fail';
}

// Perturbation-injection semantics. The "verdict" describes what
// happened in the *environment*, not what the participant did.
const OUTCOME_META = {
  'crit':      { verdict: 'Calm + small advantage', tone: 'crit',
                 perturbation: 'none',
                 hint: 'The environment is unusually kind. Optionally grant the character +1 UXP. Participant continues undisturbed.' },
  'ok':        { verdict: 'Calm',                   tone: 'ok',
                 perturbation: 'none',
                 hint: 'Nothing interrupts. Participant proceeds naturally. Observe their unperturbed behaviour.' },
  'mix':       { verdict: 'Mild perturbation',      tone: 'mix',
                 perturbation: 'mild',
                 hint: 'A low-severity complication fires. Narrate it briefly; participant carries it while continuing the task. +1 Stress.' },
  'fail':      { verdict: 'Significant perturbation', tone: 'fail',
                 perturbation: 'significant',
                 hint: 'A moderate-to-high severity complication. Participant must absorb more. +1 Stress.' },
  'crit-fail': { verdict: 'Compound perturbation',  tone: 'fail',
                 perturbation: 'compound',
                 hint: 'A severe complication, possibly two stacked. +1 Stress, consider +1 more if narratively fitting.' },
};

/* ------------------------------ Complications ------------------------------ */
// Four categories × three severity levels. The GM draws from this
// library (or from pack-supplied extras) when a roll produces a
// perturbation. The complication is narrated and observed; the
// participant responds while continuing the real task.
const CORE_COMPLICATIONS = [
  // Interface — the system does something unexpected
  { cat: 'Interface', severity: 1, line: 'A modal pops up asking about notifications. The character has to dismiss it before continuing.' },
  { cat: 'Interface', severity: 1, line: 'The target button is just below a newly-loaded banner. Easy to mis-tap.' },
  { cat: 'Interface', severity: 2, line: 'The screen scrolls unexpectedly; the prior selection is now off-screen.' },
  { cat: 'Interface', severity: 2, line: 'An icon the character does not recognise appears in a critical spot.' },
  { cat: 'Interface', severity: 3, line: 'A loading spinner runs for an uncomfortably long time with no progress indicator.' },
  { cat: 'Interface', severity: 3, line: 'The flow branches unexpectedly and the character loses track of which path they chose.' },
  // Cognitive — internal model breaks
  { cat: 'Cognitive', severity: 1, line: 'The character forgets the exact phrasing they used in a previous step and has to re-derive it.' },
  { cat: 'Cognitive', severity: 2, line: 'Two options look equally valid. Hesitation, unsure which matches intent.' },
  { cat: 'Cognitive', severity: 2, line: 'The character loses track of why they opened this app in the first place.' },
  { cat: 'Cognitive', severity: 3, line: 'Decision paralysis — the options multiply and none feels definitively right.' },
  // Emotional — affective disruption
  { cat: 'Emotional', severity: 1, line: 'A small surge of "I am bad at this" arrives uninvited.' },
  { cat: 'Emotional', severity: 2, line: 'The character feels watched — the task becomes performative rather than their own.' },
  { cat: 'Emotional', severity: 2, line: 'Frustration leaks in. Considers closing the app for something easier.' },
  { cat: 'Emotional', severity: 3, line: 'Shame spike: the task reminds the character of something they have been avoiding.' },
  // External — outside the device
  { cat: 'External',  severity: 1, line: 'A message notification arrives on the device. Glance.' },
  { cat: 'External',  severity: 2, line: 'Someone in the room speaks to them briefly.' },
  { cat: 'External',  severity: 2, line: 'A battery warning appears in the corner of vision.' },
  { cat: 'External',  severity: 3, line: 'An unrelated but urgent-feeling thought intrudes ("did I lock the door?").' },
];

/**
 * Pick a complication matching the outcome. Packs can contribute
 * extras via their 'complicationsExtra' field; this function
 * consults both the core library and any registered pack's extras.
 *
 * @param {'mild'|'significant'|'compound'} perturbation
 * @param {string|null} packId - active pack id to pull extras from
 */
function drawComplication(perturbation, packId) {
  const extras = (window.RECS.Packs?.get(packId)?.complicationsExtra) || [];
  const all = CORE_COMPLICATIONS.concat(extras);
  const caps = { mild: 2, significant: 3, compound: 3 };
  const minSev = perturbation === 'mild' ? 1
               : perturbation === 'significant' ? 2
               : 2;
  const maxSev = caps[perturbation] || 3;
  const pool = all.filter(c => c.severity >= minSev && c.severity <= maxSev);
  if (pool.length === 0) return null;
  return pool[Math.floor(Math.random() * pool.length)];
}

/* ------------------------------ Rules text (for docs) ------------------------------ */
const RULES_TEXT = {
  dice: 'Roll 1d20 and add the chosen attribute\'s modifier (value − 3). Compare the total to the Difficulty Class (DC). The roll does not judge whether the participant\'s action succeeded — it decides what perturbation the environment injects at this moment. Meet or beat the DC for a calm moment. Fall short by 1–4 for a mild perturbation. Fall short by 5+ for a significant perturbation. Natural 20 / roll ≥ DC+10 is calm with a small advantage. Natural 1 is a compound perturbation regardless of DC.',
  uxp: 'User Experience Points (UXP) are a buffer against noisy moments. Spend 1 UXP to re-roll a d20 (character takes a breath, environment shifts). Spend 2 UXP to cancel an injected perturbation entirely. Starting UXP is 4.',
  complications: 'When a roll injects a perturbation (mild / significant / compound), the GM draws from the complication library. Four categories: Interface, Cognitive, Emotional, External. Severity matches the perturbation tier. Complications are narrated briefly; the participant absorbs them and continues operating the real product. Their verbal and behavioural response is the data.',
  stress: 'Each injected perturbation adds 1 Stress. At 6 Stress, the character "trauma-exits" (closes the app / ends the session). Useful for probing design-induced emotional thresholds.',
  gm: 'The Gamesmaster is the researcher. You set the scene, call for rolls at narrative decision points, draw complications, narrate them briefly, and observe how the participant handles them while they operate the real product. You do not play a character; you play the environment.',
  session: 'A session is one participant × one scenario. The participant operates the real product throughout; the toolkit provides framing, perturbation injection, and data capture. Export the Markdown / JSON at the end — that is your raw analysis record.',
};

/* ------------------------------ Exports ------------------------------ */
window.RECS = window.RECS || {};
Object.assign(window.RECS, {
  ATTRIBUTES,
  POINT_BUDGET,
  START_UXP,
  START_STRESS,
  DIFFICULTY,
  OUTCOME_META,
  CORE_COMPLICATIONS,
  RULES_TEXT,
  classifyRoll,
  drawComplication,
});
