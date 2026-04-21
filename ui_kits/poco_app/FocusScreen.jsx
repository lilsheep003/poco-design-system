// Focus — two-phase: setup -> running. Live timer, Mochi messages, summary.

function FocusScreen({ onDone, quickStart }) {
  const { logSession } = useStore();
  const [phase, setPhase] = React.useState(quickStart ? 'running' : 'setup');
  const [intention, setIntention] = React.useState('');
  const [env, setEnv] = React.useState('Rain');
  const [duration, setDuration] = React.useState(25 * 60);
  const [mode, setMode] = React.useState('Active');
  const [summary, setSummary] = React.useState(null);

  if (phase === 'setup') {
    return <FocusSetup
      intention={intention} setIntention={setIntention}
      env={env} setEnv={setEnv}
      duration={duration} setDuration={setDuration}
      mode={mode} setMode={setMode}
      onBack={onDone}
      onStart={() => setPhase('running')}
    />;
  }
  if (phase === 'running') {
    return <FocusRunning intention={intention} env={env} duration={duration} mode={mode}
      onEnd={(actualSec, completed) => {
        const s = { id: uid(), intention, env, durationSec: duration, actualSec, mode, completed, endedAt: Date.now() };
        logSession(s);
        setSummary(s);
        setPhase('summary');
      }} />;
  }
  return <FocusSummary sess={summary} onDone={onDone} />;
}

function FocusSetup({ intention, setIntention, env, setEnv, duration, setDuration, mode, setMode, onBack, onStart }) {
  const envs = ['Rain', 'Forest', 'Cafe', 'Silence', 'Lo-fi'];
  const mins = [15, 25, 45, 60];
  return (
    <PScreen>
      <PHeader
        title="Focus"
        sub="Set a small intention. That's enough to begin."
        right={<div onClick={onBack} style={{ cursor: 'pointer' }}><PIcon name="x" size={22} /></div>}
      />
      <PSection title="Intention">
        <PCard>
          <input value={intention} onChange={e => setIntention(e.target.value)}
            placeholder="One sentence — what are you working on?"
            style={{ width: '100%', border: 0, background: 'transparent', fontSize: 15, fontFamily: P_FONT, outline: 'none' }} />
        </PCard>
      </PSection>

      <PSection title="Environment">
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {envs.map(e => <PChip key={e} active={env === e} onClick={() => setEnv(e)}>{e}</PChip>)}
        </div>
      </PSection>

      <PSection title="Duration">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 8 }}>
          {mins.map(m => {
            const on = duration === m * 60;
            return (
              <div key={m} onClick={() => setDuration(m * 60)} style={{
                background: on ? P_COLORS.ink : P_COLORS.page, color: on ? '#fff' : P_COLORS.ink,
                border: `1px solid ${on ? P_COLORS.ink : P_COLORS.line}`, borderRadius: 14,
                padding: '16px 0', textAlign: 'center', cursor: 'pointer',
                fontSize: 18, fontWeight: 700,
              }}>{m}<span style={{ fontSize: 11, fontWeight: 500, opacity: 0.7, marginLeft: 3 }}>min</span></div>
            );
          })}
        </div>
      </PSection>

      <PSection title="Mode">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {[['Active', 'Deep work — one task, full attention.'], ['Passive', 'Light tasks, reading, review.']].map(([k, d]) => {
            const on = mode === k;
            return (
              <PCard key={k} onClick={() => setMode(k)} style={{ padding: 14, cursor: 'pointer', border: `${on ? 1.5 : 1}px solid ${on ? P_COLORS.ink : P_COLORS.line}` }}>
                <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>{k}</div>
                <div style={{ fontSize: 12, color: P_COLORS.ink3, lineHeight: 1.4 }}>{d}</div>
              </PCard>
            );
          })}
        </div>
      </PSection>

      <PSection>
        <PButton variant="primary" full onClick={onStart}>Start</PButton>
      </PSection>
    </PScreen>
  );
}

const MOCHI_LINES = [
  "You're doing great. One breath at a time.",
  "Stay with it — you're further along than you feel.",
  "Take a breath if you need one.",
  "Small progress still counts.",
  "No need to rush. You're here, that's enough.",
  "Almost there — just a little more.",
  "Notice what's working right now.",
  "Gentle and steady. Keep going.",
];

function FocusRunning({ intention, env, duration, mode, onEnd }) {
  const [remaining, setRemaining] = React.useState(duration);
  const [paused, setPaused] = React.useState(false);
  const [msg, setMsg] = React.useState(MOCHI_LINES[0]);
  const started = React.useRef(Date.now());

  React.useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      setRemaining(r => {
        if (r <= 1) { clearInterval(t); onEnd(duration, true); return 0; }
        return r - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [paused]);

  React.useEffect(() => {
    const t = setInterval(() => setMsg(MOCHI_LINES[Math.floor(Math.random() * MOCHI_LINES.length)]), 18000);
    return () => clearInterval(t);
  }, []);

  const mm = String(Math.floor(remaining / 60)).padStart(2, '0');
  const ss = String(remaining % 60).padStart(2, '0');
  const pct = 1 - remaining / duration;

  return (
    <PScreen style={{ background: P_COLORS.warmCream }}>
      <PHeader title="In focus" sub={intention || 'No intention set'}
        right={<div onClick={() => onEnd(duration - remaining, false)} style={{ cursor: 'pointer' }}><PIcon name="x" size={22} /></div>} />

      <div style={{ display: 'flex', justifyContent: 'center', padding: '28px 0 8px' }}>
        <div style={{ position: 'relative', width: 240, height: 240 }}>
          <svg width={240} height={240} viewBox="0 0 240 240">
            <circle cx={120} cy={120} r={108} fill="none" stroke="#EFE1CF" strokeWidth={10} />
            <circle cx={120} cy={120} r={108} fill="none" stroke={P_COLORS.ink} strokeWidth={10}
              strokeLinecap="round" strokeDasharray={2 * Math.PI * 108}
              strokeDashoffset={2 * Math.PI * 108 * (1 - pct)}
              transform="rotate(-90 120 120)" style={{ transition: 'stroke-dashoffset 1s linear' }} />
          </svg>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ fontSize: 44, fontWeight: 700, letterSpacing: '-0.02em' }}>{mm}:{ss}</div>
            <div style={{ fontSize: 12, color: P_COLORS.ink3, marginTop: 4 }}>{mode} · {env}</div>
          </div>
        </div>
      </div>

      <div style={{ padding: '8px 20px 20px' }}>
        <PCard style={{ background: '#fff', textAlign: 'center' }}>
          <div style={{ fontSize: 28, marginBottom: 8 }}>🐰</div>
          <div style={{ fontSize: 14, color: P_COLORS.ink2, lineHeight: 1.5 }}>{msg}</div>
        </PCard>
      </div>

      <div style={{ padding: '0 20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <PButton variant="light" onClick={() => setPaused(p => !p)}>{paused ? 'Resume' : 'Pause'}</PButton>
        <PButton variant="primary" onClick={() => onEnd(duration - remaining, false)}>Stop</PButton>
      </div>
    </PScreen>
  );
}

function FocusSummary({ sess, onDone }) {
  const mins = Math.round(sess.actualSec / 60);
  return (
    <PScreen>
      <PHeader title="Nice work" sub="A gentle session, complete." right={<div onClick={onDone} style={{ cursor: 'pointer' }}><PIcon name="x" size={22} /></div>} />
      <PSection>
        <PCard style={{ textAlign: 'center', padding: 28 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🌱</div>
          <div style={{ fontSize: 34, fontWeight: 700, letterSpacing: '-0.02em' }}>{mins} min</div>
          <div style={{ fontSize: 13, color: P_COLORS.ink3, marginTop: 4 }}>
            {sess.completed ? 'Timer finished' : 'Ended early — that still counts'}
          </div>
          {sess.intention && <div style={{ fontSize: 14, marginTop: 18, padding: '12px 14px', background: P_COLORS.surface1, borderRadius: 12, textAlign: 'left' }}>
            <span style={{ color: P_COLORS.ink3 }}>Intention: </span>{sess.intention}
          </div>}
        </PCard>
      </PSection>
      <PSection>
        <PButton variant="primary" full onClick={onDone}>Done</PButton>
      </PSection>
    </PScreen>
  );
}

Object.assign(window, { FocusScreen });
