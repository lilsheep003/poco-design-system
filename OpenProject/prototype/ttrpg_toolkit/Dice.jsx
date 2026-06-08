/* =============================================================
   Dice.jsx — D20 roller.
   Shows an SVG icosahedron with the current face value.
   Exposes <DiceRoller /> as an interactive roll surface AND
   <DiceFace n /> as a static display.
   ============================================================= */

// Simple SVG that evokes an icosahedron with a big central number.
// Not a true 3D projection — it is a flat hex grid that works as
// an iconic stand-in. The point is recognisability, not geometry.
function DiceFace({ n }) {
  return (
    <svg viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="d20-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#F1EEE5" />
        </linearGradient>
      </defs>
      {/* Outer icosahedron silhouette (hexagon shell) */}
      <polygon className="face"
               points="70,6 128,38 128,102 70,134 12,102 12,38"
               fill="url(#d20-grad)" />
      {/* Inner triangle division lines — evoke d20 triangular faces */}
      <g className="face-inner">
        <line x1="70" y1="6"   x2="70"  y2="134" />
        <line x1="12" y1="38"  x2="128" y2="102" />
        <line x1="12" y1="102" x2="128" y2="38"  />
        <line x1="70" y1="6"   x2="70"  y2="70"  />
        <polygon points="42,54 98,54 70,96" fill="none" />
      </g>
      {/* Central face number */}
      <text className="num" x="70" y="72">{n}</text>
    </svg>
  );
}

/**
 * DiceRoller
 * props:
 *   attribute: { key, name }
 *   attrValue: 1..5
 *   dc:        number
 *   onResult:  ({ d20, mod, total, outcome }) => void
 *   autoRoll:  bool (triggers roll on mount)
 */
function DiceRoller({ attribute, attrValue, dc, onResult, autoRoll }) {
  const { OUTCOME_META, classifyRoll } = window.RECS;
  const { modOf } = window.RECS.Store;

  const [phase, setPhase] = React.useState('idle'); // 'idle' | 'rolling' | 'settled'
  const [display, setDisplay] = React.useState(20);
  const [result, setResult] = React.useState(null);

  const mod = modOf(attrValue || 3);

  const spin = React.useCallback(() => {
    setPhase('rolling');
    setResult(null);

    // rapid face-flip during tumble for visual life
    let ticks = 0;
    const flipId = setInterval(() => {
      setDisplay(1 + Math.floor(Math.random() * 20));
      ticks += 1;
      if (ticks > 12) clearInterval(flipId);
    }, 60);

    setTimeout(() => {
      clearInterval(flipId);
      const d20 = 1 + Math.floor(Math.random() * 20);
      const total = d20 + mod;
      const outcome = classifyRoll(d20, total, dc);
      setDisplay(d20);
      setResult({ d20, mod, total, outcome });
      setPhase('settled');
      if (onResult) onResult({ d20, mod, total, outcome });
    }, 900);
  }, [mod, dc, onResult]);

  // Optional auto-roll on mount
  React.useEffect(() => {
    if (autoRoll && phase === 'idle') spin();
    // eslint-disable-next-line
  }, [autoRoll]);

  const meta = result ? OUTCOME_META[result.outcome] : null;

  return (
    <div className="dice-stage">
      <div className={`d20 ${phase === 'rolling' ? 'rolling' : ''}`}>
        <DiceFace n={display} />
      </div>

      <div style={{ textAlign: 'center', fontSize: 13, color: 'var(--poco-ink-3)' }}>
        Rolling <strong style={{ color: 'var(--poco-ink)' }}>{attribute?.name || 'Attribute'}</strong>
        {' '}({attrValue} ★, mod {mod >= 0 ? `+${mod}` : mod})
        {' '}vs DC <strong style={{ color: 'var(--poco-ink)' }}>{dc}</strong>
      </div>

      {result && meta && (
        <div className={`roll-summary ${meta.tone}`}>
          <div className="verdict">{meta.verdict}</div>
          <div className="math">
            {result.d20} {result.mod >= 0 ? '+' : '−'} {Math.abs(result.mod)} = {result.total}
            {' '}<span style={{ opacity: 0.6, fontWeight: 500 }}>vs {dc}</span>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', gap: 8 }}>
        {phase === 'idle' && (
          <window.RECS.UI.Btn variant="primary" onClick={spin}>Roll d20</window.RECS.UI.Btn>
        )}
        {phase === 'settled' && (
          <window.RECS.UI.Btn variant="light" size="sm" onClick={spin}>Re-roll</window.RECS.UI.Btn>
        )}
      </div>

      {phase === 'settled' && meta && (
        <div style={{
          fontSize: 12, color: 'var(--poco-ink-3)',
          textAlign: 'center', maxWidth: 320,
          lineHeight: 1.5, fontStyle: 'italic',
        }}>
          {meta.hint}
        </div>
      )}
    </div>
  );
}

window.RECS.UI.DiceFace = DiceFace;
window.RECS.UI.DiceRoller = DiceRoller;
