/* =============================================================
   ScenarioPickerScreen.jsx — v2.
   Two-step picker: choose a pack, then a scenario within it.
   Once both chosen, reveal a "Start session" button that advances
   to the Scenario Runner.
   ============================================================= */

function ScenarioPickerScreen({ onReady }) {
  const { useStore } = window.RECS.Store;
  const { Btn, SectionTitle } = window.RECS.UI;

  const { session, setPack, setScenario } = useStore();

  const packs = window.RECS.Packs.list();
  const activePack = session.packId ? window.RECS.Packs.get(session.packId) : null;
  const activeScenario = activePack && session.scenarioId
    ? activePack.scenarios.find(s => s.id === session.scenarioId)
    : null;

  if (packs.length === 0) {
    return (
      <div style={{ padding: 20 }}>
        <SectionTitle>No packs loaded</SectionTitle>
        <p style={{ color: 'var(--poco-ink-2)' }}>
          Add at least one pack script to <code>index.html</code> (see <code>packs/_schema.md</code>).
        </p>
      </div>
    );
  }

  return (
    <div className="stack-lg">
      <div>
        <SectionTitle>Scenario pack</SectionTitle>
        <h1 style={{ margin: '4px 0 0', fontSize: 22, fontWeight: 800, letterSpacing: '-0.01em' }}>
          Choose a pack, then a scenario within it.
        </h1>
        <p style={{ color: 'var(--poco-ink-2)', marginTop: 6, maxWidth: 640 }}>
          A pack is a product-specific RECS — the adventures and product context a researcher wants to probe.
          Packs are swappable. The core toolkit (attributes, dice, complications, export) stays the same.
        </p>
      </div>

      {/* Pack picker */}
      <div>
        <SectionTitle>Packs loaded</SectionTitle>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 12, marginTop: 10 }}>
          {packs.map(p => (
            <button key={p.id}
                    onClick={() => setPack(p.id)}
                    className={`scenario-card ${session.packId === p.id ? 'on' : ''}`}>
              <div className="icon" style={{ fontSize: 22 }}>📦</div>
              <div>
                <h3>{p.name}</h3>
                <p>{p.description}</p>
                <div className="meta">
                  <span className="tag-static">{p.scenarios.length} scenarios</span>
                  {p.author && <span className="tag-static">{p.author.split(' ')[0]}</span>}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Scenario picker inside chosen pack */}
      {activePack && (
        <div>
          <SectionTitle>Scenarios in {activePack.name}</SectionTitle>
          {activePack.notes && (
            <p style={{
              marginTop: 6, maxWidth: 780,
              color: 'var(--poco-ink-3)', fontSize: 13, fontStyle: 'italic',
            }}>
              Note: {activePack.notes}
            </p>
          )}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 12, marginTop: 10 }}>
            {activePack.scenarios.map(sc => (
              <button key={sc.id}
                      onClick={() => setScenario(sc.id)}
                      className={`scenario-card ${session.scenarioId === sc.id ? 'on' : ''}`}>
                <div className="icon">{sc.icon || '🎬'}</div>
                <div>
                  <h3>{sc.title}</h3>
                  <p>{sc.premise.slice(0, 110)}{sc.premise.length > 110 ? '…' : ''}</p>
                  <div className="meta">
                    {sc.duration && <span className="tag-static">{sc.duration}</span>}
                    {sc.productArea && <span className="tag-static">{sc.productArea}</span>}
                    <span className="tag-static">{sc.beats.length} beats</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Preview of chosen scenario beats */}
      {activeScenario && (
        <div style={{
          background: 'var(--recs-parchment)',
          border: '1px solid var(--recs-rule)',
          borderRadius: 14, padding: 18,
        }}>
          <SectionTitle>Scenario overview · GM pre-read</SectionTitle>
          <div style={{ marginTop: 8, fontSize: 14, color: 'var(--recs-ink-rune)', lineHeight: 1.55 }}>
            <strong>Premise:</strong> {activeScenario.premise}
          </div>
          <div style={{ marginTop: 8, fontSize: 14, color: 'var(--recs-ink-rune)' }}>
            <strong>Goal:</strong> {activeScenario.goal}
          </div>
          <div style={{ marginTop: 12 }}>
            <strong style={{ fontSize: 11, textTransform: 'uppercase',
                             letterSpacing: '0.14em', color: '#7A6B48' }}>
              Beats
            </strong>
            <ol style={{ marginTop: 4, paddingLeft: 20, color: 'var(--recs-ink-rune)', fontSize: 13, lineHeight: 1.6 }}>
              {activeScenario.beats.map((b, i) => (
                <li key={i}>
                  <span style={{ opacity: 0.7 }}>{b.kind === 'challenge' ? '⚔' : '—'}</span>
                  {' '}<strong>{b.title}</strong>
                  {b.kind === 'challenge' && (
                    <span style={{ fontSize: 11, marginLeft: 8, color: '#7A6B48' }}>
                      ({window.RECS.ATTRIBUTES.find(a => a.key === b.attribute)?.name}, {b.difficulty})
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}

      <div className="row-between" style={{ paddingTop: 10 }}>
        <div style={{ fontSize: 13, color: 'var(--poco-ink-3)' }}>
          Next: begin the scenario. The GM Notebook will open on the right.
        </div>
        <Btn variant="primary"
             disabled={!session.scenarioId}
             onClick={onReady}>
          Start session →
        </Btn>
      </div>
    </div>
  );
}

window.RECS.ScenarioPickerScreen = ScenarioPickerScreen;
