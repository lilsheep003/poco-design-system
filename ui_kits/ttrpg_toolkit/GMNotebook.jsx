/* =============================================================
   GMNotebook.jsx — v2.
   Side panel visible during character + scenario stages.
   Content:
   - Session metadata (participant, pack, elapsed)
   - GM hints for current beat (perturbation-injection phrasing)
   - Live notes
   - Participant quote capture
   - Roll + perturbation log
   ============================================================= */

function GMNotebook() {
  const { useStore, timeShort } = window.RECS.Store;
  const { DIFFICULTY, ATTRIBUTES, OUTCOME_META } = window.RECS;
  const { Timer } = window.RECS.UI;

  const { session, setGMNotes, addQuote, removeQuote } = useStore();

  const pack = window.RECS.Packs.get(session.packId);
  const scenario = pack?.scenarios.find(s => s.id === session.scenarioId);
  const beat = scenario?.beats[session.currentBeat];

  const [quoteDraft, setQuoteDraft] = React.useState('');

  function saveQuote() {
    if (!quoteDraft.trim()) return;
    addQuote(quoteDraft.trim());
    setQuoteDraft('');
  }

  return (
    <div className="gm-panel">
      <h3>Session</h3>
      <div className="hint-block">
        <div><strong>{session.participantCode || 'No code'}</strong></div>
        {pack && <div style={{ fontSize: 12, marginTop: 2, opacity: 0.85 }}>Pack: {pack.name}</div>}
        {scenario && <div style={{ fontSize: 12, marginTop: 2, opacity: 0.85 }}>Scenario: {scenario.title}</div>}
        <div style={{ marginTop: 4, fontSize: 12, opacity: 0.65 }}>
          Started {new Date(session.startedAt).toLocaleTimeString()}
        </div>
        <div style={{ marginTop: 6 }}><Timer startedAt={session.startedAt} /></div>
      </div>

      {beat && (
        <>
          <h3>Current beat · GM hints</h3>
          <div className="hint-block" style={{ marginBottom: 8 }}>
            <div style={{ fontWeight: 600, marginBottom: 4 }}>
              {beat.kind === 'challenge' ? '⚔ ' : '— '}{beat.title}
            </div>
            {beat.kind === 'challenge' ? (
              <>
                <div style={{ fontSize: 12, opacity: 0.8, marginBottom: 6 }}>
                  Call for a <strong>{ATTRIBUTES.find(a => a.key === beat.attribute)?.name}</strong> check,
                  DC <strong>{DIFFICULTY[beat.difficulty].dc}</strong>.
                  Remind participant: the roll decides what the environment does, not whether they succeed.
                </div>
                {beat.onCalm && (
                  <div style={{ fontSize: 12, marginTop: 6 }}>
                    <strong style={{ color: 'var(--recs-ok-bg)' }}>On calm:</strong> {beat.onCalm}
                  </div>
                )}
                {beat.onMild && (
                  <div style={{ fontSize: 12, marginTop: 4 }}>
                    <strong style={{ color: 'var(--recs-mix-bg)' }}>On mild:</strong> {beat.onMild}
                  </div>
                )}
                {beat.onSignificant && (
                  <div style={{ fontSize: 12, marginTop: 4 }}>
                    <strong style={{ color: 'var(--recs-fail-bg)' }}>On significant:</strong> {beat.onSignificant}
                  </div>
                )}
                {!beat.onCalm && !beat.onMild && !beat.onSignificant && (
                  <div style={{ fontSize: 12, opacity: 0.65, fontStyle: 'italic' }}>
                    No scenario-specific overrides — rely on the complication library draw.
                  </div>
                )}
              </>
            ) : (
              <div style={{ fontSize: 12, opacity: 0.85, fontStyle: 'italic' }}>
                Read the narration slowly. Pause afterwards. Let the participant react before advancing.
              </div>
            )}
          </div>
        </>
      )}

      <h3>Live notes</h3>
      <textarea
        placeholder="What is the participant doing on the real product? Body language, hesitation, verbatim reactions, moments of confusion…"
        value={session.gmNotes || ''}
        onChange={e => setGMNotes(e.target.value)}
      />

      <h3>Capture a quote</h3>
      <div style={{ display: 'flex', gap: 6 }}>
        <input
          value={quoteDraft}
          onChange={e => setQuoteDraft(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') saveQuote(); }}
          placeholder={`Type and press Enter…`}
          style={{
            flex: 1,
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 8,
            padding: '8px 10px',
            color: 'var(--recs-gm-ink)',
            fontFamily: 'inherit', fontSize: 13,
            outline: 'none',
          }}
        />
      </div>
      {session.participantQuotes.length > 0 && (
        <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 4 }}>
          {session.participantQuotes.map((q, i) => (
            <div key={i} style={{
              fontSize: 12, padding: '6px 10px',
              background: 'rgba(255,255,255,0.05)',
              borderRadius: 6, borderLeft: '2px solid rgba(255,255,255,0.3)',
              display: 'flex', justifyContent: 'space-between', gap: 6,
            }}>
              <span style={{ flex: 1 }}>"{q.text}"</span>
              <button onClick={() => removeQuote(i)}
                      title="Remove"
                      style={{ background: 'none', border: 0,
                               color: 'rgba(255,255,255,0.5)',
                               cursor: 'pointer', padding: 0 }}>×</button>
            </div>
          ))}
        </div>
      )}

      <h3>Roll & perturbation log</h3>
      <div className="gm-log">
        {session.rolls.length === 0 && session.complications.length === 0 && (
          <div style={{ opacity: 0.4, fontStyle: 'italic', fontSize: 12 }}>
            No rolls yet.
          </div>
        )}
        {session.rolls.map((r, i) => {
          const meta = OUTCOME_META[r.outcome];
          const toneKey = meta.tone === 'crit' ? 'crit'
                       : meta.tone === 'ok'   ? 'ok'
                       : meta.tone === 'mix'  ? 'mix'
                       : 'fail';
          return (
            <div key={'r' + i} className={`gm-log-entry ${toneKey}`}>
              <span className="t">{timeShort(r.at)}</span>
              {r.attr} · d20 {r.d20} {r.mod >= 0 ? `+${r.mod}` : r.mod} = {r.total}
              {' · '}{meta.verdict}
            </div>
          );
        })}
        {session.complications.map((c, i) => (
          <div key={'c' + i} className="gm-log-entry mix"
               style={{ opacity: 0.9, fontStyle: 'italic' }}>
            <span className="t">{timeShort(c.at)}</span>
            🎭 {c.category} (sev {c.severity}): {c.line.slice(0, 80)}{c.line.length > 80 ? '…' : ''}
          </div>
        ))}
      </div>
    </div>
  );
}

window.RECS.GMNotebook = GMNotebook;
