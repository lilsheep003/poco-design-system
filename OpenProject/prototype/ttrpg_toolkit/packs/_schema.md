# RECS Pack schema

A **pack** is a product-specific RECS (Requirements Elicitation Campaign Setting) that plugs into the RECS Toolkit. Core rules, attributes, dice mechanic, complication library, UXP, stress, and data export are supplied by the toolkit — a pack only supplies product framing and scenarios.

## File layout

Each pack is a standalone `.jsx` file placed in `packs/`. It self-registers on load by calling `window.RECS.Packs.register({...})`. After adding a new pack file, add one line to `index.html`:

```html
<script type="text/babel" src="packs/<yourPack>.jsx"></script>
```

No build step. No JSON fetch (works over `file://` as well as HTTP).

## Pack shape

```js
window.RECS.Packs.register({
  id:          'my-pack',              // required, unique, kebab-case
  name:        'Human display name',   // required
  description: 'One-line description', // required
  productName: 'Product under study',  // required, shown to GM
  author:      'Author / team',        // optional but encouraged
  notes:       'GM-facing operational notes', // optional

  // Optional: product-specific complications merged with the core library.
  // Each entry: { cat, severity, line }
  //   cat:      'Interface' | 'Cognitive' | 'Emotional' | 'External'
  //   severity: 1 (mild) | 2 (moderate) | 3 (significant)
  //   line:     narrative string the GM can read verbatim
  complicationsExtra: [ /* ... */ ],

  scenarios: [ /* see below */ ],
});
```

## Scenario shape

```js
{
  id:          'scenario-slug',        // required, unique within pack
  title:       'Scenario title',       // required
  icon:        '🌅',                    // emoji shown in picker
  duration:    '15–20 min',            // expected session length
  productArea: 'Area or flow probed',  // e.g. 'Onboarding · Settings'
  premise:     'Opening narration read to participant',
  goal:        'One-line goal for the scenario',

  beats: [ /* see below */ ],
}
```

## Beat shape

Two beat kinds: `narration` (GM reads a scene; no dice) and `challenge` (GM calls for a dice roll that determines what the environment injects).

### Narration beat

```js
{
  kind:  'narration',
  title: 'Scene title',
  text:  'The narration text. GM reads this aloud. Keep it 1–3 sentences; leave room for the participant to react.',
}
```

### Challenge beat

```js
{
  kind:       'challenge',
  title:      'Challenge title',
  setup:      'What the GM says to frame the moment',
  taskPrompt: 'What the participant is attempting on the real product at this moment',
  attribute:  'PAT' | 'FOC' | 'WMEM' | 'EREG' | 'TLIT' | 'SENS',
  difficulty: 'easy' | 'medium' | 'hard',   // mapped to DC 10 / 14 / 18

  // Optional narrative overrides for what the perturbation looks like.
  // If a field is omitted, the GM improvises and/or draws a line from
  // the complication library. onCalm is shown on Calm / Crit; onMild on
  // Mild perturbation; onSignificant on Significant or Compound.
  onCalm:        'Nothing interrupts — participant proceeds naturally.',
  onMild:        'Narrative-fitting mild perturbation.',
  onSignificant: 'Narrative-fitting significant perturbation.',
}
```

## Authoring tips

- **Aim for 4–7 beats per scenario.** Longer sessions fatigue participants.
- **Alternate narration and challenge.** A scenario that is all challenges feels like a quiz.
- **Challenge beats should probe things traditional usability tests miss** — edge cases, stress states, emotional thresholds. Do not use them to check "can the user complete this task" (the researcher observes that on the real device).
- **Attributes should match the probe.** A flow that tests decision-paralysis uses `PAT` or `EREG`. A flow that tests recall uses `WMEM`. A flow that tests sensory load uses `SENS`.
- **Difficulty should reflect research intent, not product quality.** `medium` (DC 14) is a good default. `hard` (DC 18) when you want to force frequent perturbations. `easy` (DC 10) for moments you expect to be uneventful.
- **The premise sets the magic circle.** Participants enter the fictional frame through it; it should feel lived-in and familiar, not abstract.

## Reference packs in this repo

- [poco.jsx](poco.jsx) — the default pack used in the master thesis user study. Three scenarios.
- [bill-payment.jsx](bill-payment.jsx) — a generic pack showing that the toolkit works on products other than Poco. One scenario.

Use either as a template when authoring your own.
