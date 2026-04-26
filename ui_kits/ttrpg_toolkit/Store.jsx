/* =============================================================
   Store.jsx — Session state + localStorage persistence.
   v2: TTRPG-only, pack-based. No 'condition' field.
   ============================================================= */

const LS_KEY = 'recs_session_v2';

function newCharacter() {
  const attrs = {};
  window.RECS.ATTRIBUTES.forEach(a => { attrs[a.key] = 3; });
  return {
    name: '',
    role: '',
    age: '',
    portrait: '🙂',
    background: '',
    attributes: attrs,          // 1..5 per key
    uxp: window.RECS.START_UXP,
    stress: window.RECS.START_STRESS,
    devices: [],
    apps: [],
    traits: [],
  };
}

function newSession() {
  return {
    id: 's_' + Math.random().toString(36).slice(2, 9),
    startedAt: new Date().toISOString(),
    participantCode: '',
    packId: null,               // e.g. 'poco'
    scenarioId: null,           // scenario within the pack
    character: newCharacter(),
    currentBeat: 0,
    completedBeats: [],
    rolls: [],                  // { beatIdx, beatTitle, attr, dc, d20, mod, total, outcome, at }
    complications: [],          // { beatIdx, beatTitle, category, line, severity, at }
    gmNotes: '',
    participantQuotes: [],      // { text, at, beat }
    finishedAt: null,
    postNotes: '',
  };
}

function loadSession() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return newSession();
    const parsed = JSON.parse(raw);
    if (!parsed || !parsed.character || !parsed.character.attributes) return newSession();
    // Migrate older stored sessions lacking packId
    if (parsed.packId === undefined) parsed.packId = null;
    return parsed;
  } catch (_) {
    return newSession();
  }
}

function saveSession(s) {
  try { localStorage.setItem(LS_KEY, JSON.stringify(s)); }
  catch (_) { /* ignore quota or privacy-mode errors */ }
}

const StoreContext = React.createContext(null);

function StoreProvider({ children }) {
  const [session, setSession] = React.useState(() => loadSession());

  React.useEffect(() => { saveSession(session); }, [session]);

  const api = React.useMemo(() => ({
    session,
    reset() { setSession(newSession()); },
    restart() { setSession(s => ({ ...newSession(), participantCode: s.participantCode })); },

    setParticipantCode(code) {
      setSession(s => ({ ...s, participantCode: code }));
    },
    setPack(packId) {
      setSession(s => ({ ...s, packId, scenarioId: null, currentBeat: 0, completedBeats: [] }));
    },
    setScenario(scenarioId) {
      setSession(s => ({ ...s, scenarioId, currentBeat: 0, completedBeats: [] }));
    },

    updateCharacter(patch) {
      setSession(s => ({ ...s, character: { ...s.character, ...patch } }));
    },
    setAttribute(key, value) {
      setSession(s => ({
        ...s,
        character: { ...s.character, attributes: { ...s.character.attributes, [key]: value } }
      }));
    },
    toggleTrait(trait) {
      setSession(s => {
        const has = s.character.traits.includes(trait);
        return {
          ...s,
          character: {
            ...s.character,
            traits: has ? s.character.traits.filter(t => t !== trait) : [...s.character.traits, trait]
          }
        };
      });
    },
    spendUXP(n = 1) {
      setSession(s => ({ ...s, character: { ...s.character, uxp: Math.max(0, s.character.uxp - n) } }));
    },
    gainUXP(n = 1) {
      setSession(s => ({ ...s, character: { ...s.character, uxp: s.character.uxp + n } }));
    },
    addStress(n = 1) {
      setSession(s => ({ ...s, character: { ...s.character, stress: Math.min(6, s.character.stress + n) } }));
    },

    advanceBeat() {
      setSession(s => {
        const scenario = window.RECS.Packs.scenario(s.packId, s.scenarioId);
        const max = (scenario?.beats.length || 1) - 1;
        const next = Math.min(s.currentBeat + 1, max);
        const completed = s.completedBeats.includes(s.currentBeat)
          ? s.completedBeats
          : [...s.completedBeats, s.currentBeat];
        return { ...s, currentBeat: next, completedBeats: completed };
      });
    },
    jumpToBeat(idx) {
      setSession(s => ({ ...s, currentBeat: idx }));
    },
    recordRoll(entry) {
      setSession(s => ({
        ...s,
        rolls: [...s.rolls, { ...entry, at: new Date().toISOString() }]
      }));
    },
    recordComplication(entry) {
      setSession(s => ({
        ...s,
        complications: [...s.complications, { ...entry, at: new Date().toISOString() }]
      }));
    },
    setGMNotes(text) {
      setSession(s => ({ ...s, gmNotes: text }));
    },
    addQuote(quote) {
      setSession(s => ({
        ...s,
        participantQuotes: [...s.participantQuotes, { text: quote, at: new Date().toISOString(), beat: s.currentBeat }]
      }));
    },
    removeQuote(idx) {
      setSession(s => ({
        ...s,
        participantQuotes: s.participantQuotes.filter((_, i) => i !== idx),
      }));
    },
    setPostNotes(text) {
      setSession(s => ({ ...s, postNotes: text }));
    },
    finish() {
      setSession(s => ({ ...s, finishedAt: new Date().toISOString() }));
    },
  }), [session]);

  return <StoreContext.Provider value={api}>{children}</StoreContext.Provider>;
}

function useStore() {
  const ctx = React.useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be inside StoreProvider');
  return ctx;
}

function modOf(value) { return value - 3; }

function timeShort(iso) {
  try { return new Date(iso).toTimeString().slice(0, 8); }
  catch (_) { return ''; }
}

window.RECS.Store = { StoreProvider, useStore, StoreContext, modOf, timeShort, newSession, newCharacter };
