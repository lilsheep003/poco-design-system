/* =============================================================
   ScenarioScreen.jsx — v2.
   Adventure runner reframed as perturbation injection.
   Challenge beats: GM calls for a roll → d20 decides what the
   ENVIRONMENT injects (calm / mild / significant / compound);
   participant continues operating the real product while absorbing
   the perturbation.
   ============================================================= */

function ScenarioScreen({ onFinish, onOpenCharacter }) {
  const { useStore } = window.RECS.Store;
  const { DIFFICULTY, ATTRIBUTES, OUTCOME_META, drawComplication } = window.RECS;
  const { Btn, Modal, SectionTitle } = window.RECS.UI;
  const { DiceRoller } = window.RECS.UI;

  const {
    session, advanceBeat, jumpToBeat,
    recordRoll, recordComplication,
    spendUXP, gainUXP, addStress,
  } = useStore();

  const pack = window.RECS.Packs.get(session.packId);
  const scenario = pack?.scenarios.find(s => s.id === session.scenarioId);

  const [challengeOpen, setChallengeOpen] = React.useState(false);
  const [lastRoll, setLastRoll] = React.useState(null);
  const [pickedComp, setPickedComp] = React.useState(null);

  if (!scenario) {
    return (
      <div style={{ padding: 20 }}>
        <SectionTitle>No scenario loaded</SectionTitle>
        <p style={{ color: 'var(--poco-ink-3)' }}>
          Go back to the Scenario step and choose a pack + scenario.
        </p>
      </div>
    );
  }

  const beat = scenario.beats[session.currentBeat];
  const isLast = session.currentBeat === scenario.beats.length - 1;

  function openChallenge() {
    setLastRoll(null);
    setPickedComp(null);
    setChallengeOpen(true);
  }

  function handleRoll(r) {
    setLastRoll(r);
    recordRoll({
      beatIdx: session.currentBeat,
      beatTitle: beat.title,
      attr: beat.attribute,
      dc: DIFFICULTY[beat.difficulty].dc,
      d20: r.d20, mod: r.mod, total: r.total,
      outcome: r.outcome,
    });
    const meta = OUTCOME_META[r.outcome];
    // Perturbation semantics: only mix / fail / crit-fail draw a complication.
    if (meta.perturbation !== 'none') {
      const c = drawComplication(meta.perturbation, session.packId);
      setPickedComp(c);
    } else if (r.outcome === 'crit') {
      gainUXP(1);
    }
  }

  function confirmAndAdvance() {
    if (pickedComp) {
      recordComplication({
        beatIdx: session.currentBeat,
        beatTitle: beat.title,
        category: pickedComp.cat,
        line: pickedComp.line,
        severity: pickedComp.severity,
      });
      addStress(1);
    }
    setChallengeOpen(false);
    setPickedComp(null);
    setLastRoll(null);
    advanceBeat();
  }

  function skipAndAdvance() {
    setChallengeOpen(false);
    setPickedComp(null);
    setLastRoll(null);
    advanceBeat();
  }

  // Narrative override for this specific outcome, if the pack author supplied one.
  function outcomeNarration(b, outcome) {
    if (!b) return null;
    if (outcome === 'ok' || outcome === 'crit') return b.onCalm;
    if (outcome === 'mix') return b.onMild;
    return b.onSignificant;       // fail / crit-fail
  }

  return (
    <div>
      <div className="scenario-head">
        <div className="icon">{scenario.icon || '🎬'}</div>
        <div style={{ flex: 1 }}>
          <h2>{scenario.title}</h2>
          <div className="sub">{scenario.premise}</div>
          <div style={{ marginTop: 8, fontSize: 12, opacity: 0.85 }}>
            <strong>Goal:</strong> {scenario.goal}
            {pack && <span style={{ marginLeft: 14, opacity: 0.6 }}>· Pack: {pack.name}</span>}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'flex-end' }}>
          <Btn variant="ghost" size="sm" onClick={onOpenCharacter}
               style={{ color: 'var(--recs-parchment)' }}>
            Character sheet
          </Btn>
          <div style={{ fontSize: 11, opacity: 0.7 }}>
            Beat {session.currentBeat + 1} / {scenario.beats.length}
          </div>
        </div>
      </div>

      <div className="beat-list">
        {scenario.beats.map((b, i) => {
          const isCurrent = i === session.currentBeat;
          const isDone    = session.completedBeats.includes(i);
          const isFuture  = i > session.currentBeat;

          return (
            <div key={i}
                 className={`beat ${b.kind === 'challenge' ? 'challenge' : ''} ${isCurrent ? 'current' : ''} ${isDone ? 'done' : ''}`}
                 onClick={() => (isDone || isFuture) && !isCurrent ? jumpToBeat(i) : null}
                 style={{ cursor: (isDone || isFuture) && !isCurrent ? 'pointer' : 'default' }}>
              <div className="beat-meta">
                <span className="beat-num">{i + 1}</span>
                <span className="beat-kind">
                  {b.kind === 'challenge' ? '⚔ Challenge · Perturbation check' : '— Narration'}
                </span>
                {b.kind === 'challenge' && (
                  <span className="dc-badge" style={{ padding: '2px 10px', fontSize: 11 }}>
                    {ATTRIBUTES.find(a => a.key === b.attribute)?.name} ·
                    DC <span className="dc-num" style={{ fontSize: 13 }}>{DIFFICULTY[b.difficulty].dc}</span>
                  </span>
                )}
              </div>
              <h3>{b.title}</h3>

              {b.kind === 'challenge' ? (
                <>
                  <p className="narration">{b.setup}</p>
                  {b.taskPrompt && (
                    <div style={{
                      marginTop: 8, padding: '8px 12px',
                      background: 'var(--poco-surface-1)', borderRadius: 8,
                      fontSize: 13, color: 'var(--poco-ink-2)',
                    }}>
                      <strong style={{ fontSize: 11, textTransform: 'uppercase',
                                       letterSpacing: '0.12em', color: 'var(--poco-ink-3)' }}>
                        On the real product →
                      </strong>
                      <div style={{ marginTop: 2 }}>{b.taskPrompt}</div>
                    </div>
                  )}
                </>
              ) : (
                <p className="narration">{b.text}</p>
              )}

              {/* Inline rolls for this beat */}
              {session.rolls.filter(r => r.beatIdx === i).map((r, ri) => {
                const meta = OUTCOME_META[r.outcome];
                const toneKey = meta.tone === 'crit' ? 'crit'
                             : meta.tone === 'ok'   ? 'ok'
                             : meta.tone === 'mix'  ? 'mix'
                             : 'fail';
                return (
                  <div key={ri} style={{
                    marginTop: 10, padding: '8px 12px',
                    background: `var(--recs-${toneKey}-bg)`,
                    borderRadius: 8, display: 'flex', justifyContent: 'space-between',
                    fontSize: 13,
                    color: `var(--recs-${toneKey})`,
                  }}>
                    <span><strong>{meta.verdict}</strong> · d20={r.d20}, mod {r.mod >= 0 ? `+${r.mod}` : r.mod}, total {r.total}</span>
                  </div>
                );
              })}

              {/* Inline complications for this beat */}
              {session.complications.filter(c => c.beatIdx === i).map((c, ci) => (
                <div key={ci} className={`complication ${c.severity >= 3 ? 'fail' : ''}`}>
                  <span className="label">Perturbation · {c.category}</span>
                  {c.line}
                </div>
              ))}

              {isCurrent && (
                <div className="action-row">
                  {b.kind === 'challenge' ? (
                    <Btn variant="primary" onClick={openChallenge}>
                      Roll for {ATTRIBUTES.find(a => a.key === b.attribute)?.name}
                    </Btn>
                  ) : (
                    <Btn variant="primary" onClick={() => isLast ? onFinish() : advanceBeat()}>
                      {isLast ? 'Finish session →' : 'Next →'}
                    </Btn>
                  )}
                  {b.kind === 'challenge' && (
                    <Btn variant="ghost" size="sm" onClick={advanceBeat}>
                      Skip (no perturbation)
                    </Btn>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Challenge modal */}
      <Modal open={challengeOpen}
             onClose={() => { if (lastRoll) return; setChallengeOpen(false); }}
             title={beat?.kind === 'challenge' ? beat.title : ''}
             sub={beat?.setup}
             wide>

        {beat?.kind === 'challenge' && (
          <>
            <DiceRoller
              attribute={ATTRIBUTES.find(a => a.key === beat.attribute)}
              attrValue={session.character.attributes[beat.attribute]}
              dc={DIFFICULTY[beat.difficulty].dc}
              onResult={handleRoll}
            />

            {lastRoll && (() => {
              const meta = OUTCOME_META[lastRoll.outcome];
              const narrativeOverride = outcomeNarration(beat, lastRoll.outcome);

              return (
                <>
                  {/* Narrative hint */}
                  <div style={{ marginTop: 14, padding: '12px 14px',
                                background: 'var(--poco-surface-1)', borderRadius: 10,
                                fontSize: 13, lineHeight: 1.5, color: 'var(--poco-ink-2)' }}>
                    <SectionTitle>GM narration for this outcome</SectionTitle>
                    <div style={{ marginTop: 4, fontStyle: 'italic' }}>
                      {narrativeOverride || meta.hint}
                    </div>
                  </div>

                  {/* Complication (only for perturbation outcomes) */}
                  {pickedComp && (
                    <div className={`complication ${pickedComp.severity >= 3 ? 'fail' : ''}`}
                         style={{ marginTop: 14 }}>
                      <span className="label">Drawn perturbation · {pickedComp.cat} · sev {pickedComp.severity}</span>
                      {pickedComp.line}
                      <div style={{ marginTop: 8, display: 'flex', gap: 6 }}>
                        <Btn variant="light" size="sm" onClick={() => {
                          const c = drawComplication(meta.perturbation, session.packId);
                          setPickedComp(c);
                        }}>Re-draw</Btn>
                        {session.character.uxp >= 2 && (
                          <Btn variant="light" size="sm" onClick={() => {
                            spendUXP(2);
                            setPickedComp(null);
                          }}>Cancel with 2 UXP</Btn>
                        )}
                      </div>
                    </div>
                  )}

                  {lastRoll.outcome === 'crit' && (
                    <div style={{
                      marginTop: 14, padding: '10px 14px',
                      background: 'var(--recs-crit-bg)', color: 'var(--recs-crit)',
                      borderRadius: 10, fontSize: 13, fontWeight: 600,
                    }}>
                      ✨ Calm + small advantage — character gains +1 UXP.
                    </div>
                  )}

                  {/* Re-roll with UXP (only when a perturbation occurred) */}
                  {meta.perturbation !== 'none' && session.character.uxp >= 1 && (
                    <div style={{
                      marginTop: 14, padding: '10px 14px',
                      background: 'var(--poco-surface-1)', borderRadius: 10,
                      fontSize: 13, display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    }}>
                      <span>Spend 1 UXP to re-roll the environment?</span>
                      <Btn variant="light" size="sm" onClick={() => {
                        spendUXP(1);
                        setLastRoll(null);
                        setPickedComp(null);
                      }}>Spend 1 UXP</Btn>
                    </div>
                  )}

                  <div style={{ marginTop: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontSize: 12, color: 'var(--poco-ink-3)', maxWidth: 380 }}>
                      Now let the participant continue on the real product while carrying this moment.
                      Observe. Capture quotes. Advance when ready.
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      {pickedComp ? (
                        <Btn variant="primary" onClick={confirmAndAdvance}>
                          Apply perturbation · continue →
                        </Btn>
                      ) : (
                        <Btn variant="primary" onClick={skipAndAdvance}>
                          Continue →
                        </Btn>
                      )}
                    </div>
                  </div>
                </>
              );
            })()}
          </>
        )}
      </Modal>
    </div>
  );
}

window.RECS.ScenarioScreen = ScenarioScreen;
