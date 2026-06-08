/* =============================================================
   App.jsx — v2 root shell + stage router.
   Stages: setup → character → picker → run → summary
   ============================================================= */

function App() {
  const { StoreProvider } = window.RECS.Store;
  const [stage, setStage] = React.useState('setup');

  return (
    <StoreProvider>
      <Shell stage={stage} setStage={setStage} />
    </StoreProvider>
  );
}

function Shell({ stage, setStage }) {
  const { useStore, modOf } = window.RECS.Store;
  const { POINT_BUDGET } = window.RECS;
  const { Nav, Modal, Btn } = window.RECS.UI;
  const { session } = useStore();

  const [rulesOpen, setRulesOpen] = React.useState(false);

  // Gate nav items by the data they need
  const hasCode = session.participantCode.trim().length > 0;
  const charReady = !!session.character.name && (
    Object.values(session.character.attributes).reduce((a, b) => a + b, 0) === POINT_BUDGET
  );
  const hasScenario = !!session.packId && !!session.scenarioId;

  const navItems = [
    { key: 'setup',     label: '1 · Setup' },
    { key: 'character', label: '2 · Character' },
    { key: 'picker',    label: '3 · Scenario' },
    { key: 'run',       label: '4 · Run' },
    { key: 'summary',   label: '5 · Summary' },
  ];
  const disabledKeys = [];
  if (!hasCode) disabledKeys.push('character', 'picker', 'run', 'summary');
  if (!charReady) disabledKeys.push('picker', 'run', 'summary');
  if (!hasScenario) disabledKeys.push('run', 'summary');

  // GM panel visible once we are into picker / run — the picker phase is
  // also handy for GM to pre-read; summary has its own full-width layout
  const showGM = stage === 'run' || stage === 'picker';

  return (
    <div className={`recs-app ${showGM ? 'has-gm' : ''}`}>
      <div>
        <div className="recs-header">
          <div className="recs-brand">
            <div className="glyph">RECS</div>
            <div>
              <h1>TTRPG UX Toolkit</h1>
              <div className="sub">
                Role-play driven user needs analysis · based on Sturdee, Heron &amp; Gamboa (CHI EA 2023)
              </div>
            </div>
          </div>
          <div className="actions">
            <Nav current={stage} onChange={setStage}
                 items={navItems} disabledKeys={disabledKeys} />
            <Btn variant="ghost" size="sm" onClick={() => setRulesOpen(true)}>Rules</Btn>
          </div>
        </div>

        <div className="recs-main">
          <Stage stage={stage} setStage={setStage} />
        </div>
      </div>

      {showGM && <window.RECS.GMNotebook />}

      <Modal open={rulesOpen} onClose={() => setRulesOpen(false)}
             title="RECS — Rules reference" wide>
        <RulesReference />
        <div style={{ marginTop: 20, textAlign: 'right' }}>
          <Btn variant="primary" onClick={() => setRulesOpen(false)}>Got it</Btn>
        </div>
      </Modal>
    </div>
  );
}

function Stage({ stage, setStage }) {
  if (stage === 'setup')     return <window.RECS.SetupScreen onReady={() => setStage('character')} />;
  if (stage === 'character') return <window.RECS.CharacterScreen onDone={() => setStage('picker')} />;
  if (stage === 'picker')    return <window.RECS.ScenarioPickerScreen onReady={() => setStage('run')} />;
  if (stage === 'run')       return <window.RECS.ScenarioScreen
                                      onFinish={() => setStage('summary')}
                                      onOpenCharacter={() => setStage('character')} />;
  if (stage === 'summary')   return <window.RECS.SummaryScreen onRestart={() => setStage('setup')} />;
  return null;
}

/* ---------- Rules modal content ---------- */
function RulesReference() {
  const { RULES_TEXT, ATTRIBUTES, DIFFICULTY } = window.RECS;
  return (
    <div style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--poco-ink-2)', maxHeight: '60vh', overflowY: 'auto', paddingRight: 8 }}>
      <h3 style={{ color: 'var(--poco-ink)', fontSize: 15, marginBottom: 4, marginTop: 0 }}>Session in one paragraph</h3>
      <p style={{ margin: 0 }}>{RULES_TEXT.session}</p>

      <h3 style={{ color: 'var(--poco-ink)', fontSize: 15, marginBottom: 4, marginTop: 16 }}>Dice mechanic</h3>
      <p style={{ margin: 0 }}>{RULES_TEXT.dice}</p>

      <h3 style={{ color: 'var(--poco-ink)', fontSize: 15, marginBottom: 4, marginTop: 16 }}>Attributes</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        {ATTRIBUTES.map(a => (
          <div key={a.key} style={{ padding: '8px 12px',
               background: 'var(--poco-surface-1)',
               borderRadius: 8, fontSize: 13 }}>
            <strong>{a.name}</strong> <span style={{ color: 'var(--poco-ink-4)' }}>({a.key})</span>
            <div style={{ color: 'var(--poco-ink-3)', fontSize: 12, marginTop: 2 }}>{a.gloss}</div>
          </div>
        ))}
      </div>

      <h3 style={{ color: 'var(--poco-ink)', fontSize: 15, marginBottom: 4, marginTop: 16 }}>Difficulty classes</h3>
      <div style={{ display: 'flex', gap: 8 }}>
        {Object.entries(DIFFICULTY).map(([k, d]) => (
          <div key={k} style={{
            padding: '6px 12px', background: 'var(--poco-surface-1)',
            borderRadius: 8, fontSize: 13,
          }}>
            <strong>{d.label}</strong> · DC {d.dc}
          </div>
        ))}
      </div>

      <h3 style={{ color: 'var(--poco-ink)', fontSize: 15, marginBottom: 4, marginTop: 16 }}>UXP</h3>
      <p style={{ margin: 0 }}>{RULES_TEXT.uxp}</p>

      <h3 style={{ color: 'var(--poco-ink)', fontSize: 15, marginBottom: 4, marginTop: 16 }}>Perturbations (complications)</h3>
      <p style={{ margin: 0 }}>{RULES_TEXT.complications}</p>

      <h3 style={{ color: 'var(--poco-ink)', fontSize: 15, marginBottom: 4, marginTop: 16 }}>Stress</h3>
      <p style={{ margin: 0 }}>{RULES_TEXT.stress}</p>

      <h3 style={{ color: 'var(--poco-ink)', fontSize: 15, marginBottom: 4, marginTop: 16 }}>The GM's role</h3>
      <p style={{ margin: 0 }}>{RULES_TEXT.gm}</p>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('recs-root')).render(<App />);
