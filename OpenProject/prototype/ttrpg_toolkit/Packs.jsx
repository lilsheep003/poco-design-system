/* =============================================================
   Packs.jsx — Scenario pack registry.

   A pack is a product-specific RECS (Requirements Elicitation
   Campaign Setting) — contains the product's scenarios and any
   product-specific complications. Packs self-register on load.

   To add a pack: create `packs/<myPack>.jsx` that calls
   `window.RECS.Packs.register({ id, name, ... })`, then add a
   script tag for it in index.html.

   Pack schema:
   {
     id:          string,   // unique
     name:        string,   // human display name
     description: string,   // one-line
     productName: string,   // the app / product under study
     author:      string,   // attribution
     notes:       string,   // optional GM-facing notes
     complicationsExtra: [  // optional extras merged with core library
       { cat: 'Interface'|'Cognitive'|'Emotional'|'External',
         severity: 1|2|3, line: string }
     ],
     scenarios: [
       {
         id:       string,
         title:    string,
         icon:     string,   // emoji
         duration: string,   // e.g. '15–20 min'
         premise:  string,   // opening narration read to participant
         goal:     string,   // one-line goal
         productArea: string,// what part of the product this probes
         beats: [
           // narration beat
           { kind: 'narration', title, text },
           // challenge (perturbation injection) beat
           { kind: 'challenge',
             title:      string,
             setup:      string,   // what GM says to frame the moment
             taskPrompt: string,   // what participant is attempting on real product
             attribute:  'PAT'|'FOC'|'WMEM'|'EREG'|'TLIT'|'SENS',
             difficulty: 'easy'|'medium'|'hard',
             // Optional narrative overrides for what the perturbation
             // looks like. If omitted, GM improvises + complication lib
             // provides the text.
             onCalm:        string,  // shown on ok / crit — e.g. 'nothing interrupts'
             onMild:        string,  // shown on mix
             onSignificant: string,  // shown on fail / crit-fail
           }
         ]
       }
     ]
   }
   ============================================================= */

const _registry = new Map();

const Packs = {
  register(pack) {
    if (!pack || !pack.id) {
      console.warn('[RECS.Packs] Rejected pack without id');
      return;
    }
    if (_registry.has(pack.id)) {
      console.warn(`[RECS.Packs] Pack '${pack.id}' already registered — overwriting`);
    }
    _registry.set(pack.id, pack);
  },
  get(id) {
    return _registry.get(id) || null;
  },
  list() {
    return Array.from(_registry.values());
  },
  has(id) {
    return _registry.has(id);
  },
  scenario(packId, scenarioId) {
    const p = _registry.get(packId);
    if (!p) return null;
    return p.scenarios.find(s => s.id === scenarioId) || null;
  },
};

window.RECS = window.RECS || {};
window.RECS.Packs = Packs;
