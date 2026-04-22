// Focus — setup -> running (with Mochi events & voice) -> summary (points + event log)

// ─── Mochi Event System ───

const MOCHI_EVENTS = [
  { emoji: '☕', text: 'Mochi brewed a tiny cup of coffee', sound: 'sip sip... ahh!' },
  { emoji: '🍪', text: 'Mochi found a cookie behind the bookshelf', sound: 'crunch crunch!' },
  { emoji: '📖', text: 'Mochi started reading alongside you', sound: 'flip flip...' },
  { emoji: '🧶', text: 'Mochi is playing with a ball of yarn', sound: 'roll roll roll...' },
  { emoji: '🎨', text: 'Mochi is doodling a little picture', sound: 'scribble scribble...' },
  { emoji: '🍵', text: 'Mochi is brewing tea for you', sound: 'pour... here you go!' },
  { emoji: '🌸', text: 'Mochi picked a tiny flower from the windowsill', sound: 'sniff... pretty!' },
  { emoji: '🧘', text: 'Mochi did a little stretch', sound: 'streeetch... ahh!' },
  { emoji: '💤', text: 'Mochi took a quick power nap', sound: 'zzz... zzz... oh! I\'m back!' },
  { emoji: '🎵', text: 'Mochi is humming a little tune', sound: 'la la la~' },
  { emoji: '✨', text: 'Mochi polished your desk while you weren\'t looking', sound: 'sparkle sparkle!' },
  { emoji: '🧁', text: 'Mochi baked a tiny cupcake', sound: 'ding! fresh from the oven!' },
  { emoji: '🌙', text: 'Mochi lit a small candle for cozy vibes', sound: 'flicker... so warm!' },
  { emoji: '📝', text: 'Mochi is writing you a little note', sound: 'scribble... "you\'re doing great!"' },
  { emoji: '🫧', text: 'Mochi is blowing bubbles nearby', sound: 'pop pop pop!' },
  { emoji: '🎋', text: 'Mochi is watering a little plant', sound: 'drip drip... grow, little one!' },
];

const MOCHI_MILESTONES = [
  { at: 3,  line: "3 minutes in! Mochi believes in you." },
  { at: 5,  line: "5 minutes focused — you're warmed up!" },
  { at: 10, line: "10 minutes! Mochi is so proud of you." },
  { at: 15, line: "15 minutes — you're in the zone now!" },
  { at: 20, line: "20 minutes of focus! That's amazing." },
  { at: 25, line: "25 minutes — a full pomodoro! Incredible." },
  { at: 30, line: "30 minutes! You're on fire today." },
  { at: 45, line: "45 minutes — Mochi is in awe of you!" },
  { at: 60, line: "A whole hour! You're unstoppable!" },
];

function mochiSpeak(text) {
  try {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 0.92;
    u.pitch = 1.3;
    u.volume = 0.7;
    const voices = window.speechSynthesis.getVoices();
    const preferred = voices.find(v => v.lang.startsWith('en') && v.name.includes('Female'))
      || voices.find(v => v.lang.startsWith('en') && /samantha|karen|victoria|zira/i.test(v.name))
      || voices.find(v => v.lang.startsWith('en'));
    if (preferred) u.voice = preferred;
    window.speechSynthesis.speak(u);
  } catch (_) {}
}

function calcPoints(actualSec, completed, eventCount) {
  const mins = Math.floor(actualSec / 60);
  let pts = mins * 2;
  if (completed) pts += 20;
  if (mins >= 25) pts += 10;
  if (mins >= 45) pts += 15;
  pts += eventCount * 3;
  return pts;
}

// ─── Components ───

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
      onEnd={(actualSec, completed, events) => {
        const pts = calcPoints(actualSec, completed, events.length);
        const s = { id: uid(), intention, env, durationSec: duration, actualSec, mode, completed, endedAt: Date.now(), events, points: pts };
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

function FocusRunning({ intention, env, duration, mode, onEnd }) {
  const [remaining, setRemaining] = React.useState(duration);
  const [paused, setPaused] = React.useState(false);
  const [currentEvent, setCurrentEvent] = React.useState(null);
  const [eventLog, setEventLog] = React.useState([]);
  const [fadeIn, setFadeIn] = React.useState(false);
  const [milestoneMsg, setMilestoneMsg] = React.useState(null);
  const usedEvents = React.useRef(new Set());
  const firedMilestones = React.useRef(new Set());
  const started = React.useRef(Date.now());
  const eventLogRef = React.useRef(eventLog);

  // warm up speech synthesis
  React.useEffect(() => {
    if ('speechSynthesis' in window) window.speechSynthesis.getVoices();
  }, []);

  // countdown timer
  React.useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      setRemaining(r => {
        if (r <= 1) { clearInterval(t); return 0; }
        return r - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [paused]);

  React.useEffect(() => { eventLogRef.current = eventLog; }, [eventLog]);

  // detect timer end
  React.useEffect(() => {
    if (remaining === 0) {
      mochiSpeak("Time's up! Great job focusing. Mochi is so proud of you!");
      setTimeout(() => onEnd(duration, true, eventLogRef.current), 1200);
    }
  }, [remaining]);

  // milestone checker — runs every second via remaining change
  const elapsed = duration - remaining;
  const elapsedMin = Math.floor(elapsed / 60);

  React.useEffect(() => {
    if (paused) return;
    const milestone = MOCHI_MILESTONES.find(m => m.at === elapsedMin);
    if (milestone && !firedMilestones.current.has(milestone.at)) {
      firedMilestones.current.add(milestone.at);
      setMilestoneMsg(milestone.line);
      mochiSpeak(milestone.line);
      setTimeout(() => setMilestoneMsg(null), 6000);
    }
  }, [elapsedMin, paused]);

  // random Mochi events — first at ~2min, then every ~3-5 min
  React.useEffect(() => {
    if (paused) return;
    const firstDelay = 90000 + Math.random() * 30000;
    let timeout = setTimeout(fireEvent, firstDelay);

    function fireEvent() {
      const available = MOCHI_EVENTS.filter((_, i) => !usedEvents.current.has(i));
      const pool = available.length > 0 ? available : MOCHI_EVENTS;
      const idx = MOCHI_EVENTS.indexOf(pool[Math.floor(Math.random() * pool.length)]);
      usedEvents.current.add(idx);
      const ev = MOCHI_EVENTS[idx];

      const logEntry = { ...ev, minute: Math.round((Date.now() - started.current) / 60000) };
      setEventLog(prev => [...prev, logEntry]);
      setCurrentEvent(ev);
      setFadeIn(true);

      setTimeout(() => mochiSpeak(ev.text + '. ' + ev.sound), 400);
      setTimeout(() => { setFadeIn(false); }, 7000);
      setTimeout(() => { setCurrentEvent(null); }, 7800);

      const next = 180000 + Math.random() * 120000;
      timeout = setTimeout(fireEvent, next);
    }

    return () => clearTimeout(timeout);
  }, [paused]);

  const mm = String(Math.floor(remaining / 60)).padStart(2, '0');
  const ss = String(remaining % 60).padStart(2, '0');
  const pct = 1 - remaining / duration;

  const handleStop = () => {
    try { window.speechSynthesis.cancel(); } catch (_) {}
    onEnd(duration - remaining, false, eventLogRef.current);
  };

  return (
    <PScreen style={{ background: P_COLORS.warmCream }}>
      <PHeader title="In focus" sub={intention || 'No intention set'}
        right={<div onClick={handleStop} style={{ cursor: 'pointer' }}><PIcon name="x" size={22} /></div>} />

      {/* timer ring */}
      <div style={{ display: 'flex', justifyContent: 'center', padding: '20px 0 4px' }}>
        <div style={{ position: 'relative', width: 220, height: 220 }}>
          <svg width={220} height={220} viewBox="0 0 220 220">
            <circle cx={110} cy={110} r={98} fill="none" stroke="#EFE1CF" strokeWidth={9} />
            <circle cx={110} cy={110} r={98} fill="none" stroke={P_COLORS.ink} strokeWidth={9}
              strokeLinecap="round" strokeDasharray={2 * Math.PI * 98}
              strokeDashoffset={2 * Math.PI * 98 * (1 - pct)}
              transform="rotate(-90 110 110)" style={{ transition: 'stroke-dashoffset 1s linear' }} />
          </svg>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ fontSize: 42, fontWeight: 700, letterSpacing: '-0.02em' }}>{mm}:{ss}</div>
            <div style={{ fontSize: 12, color: P_COLORS.ink3, marginTop: 4 }}>{mode} · {env}</div>
          </div>
        </div>
      </div>

      {/* mochi card — shows event or milestone or idle */}
      <div style={{ padding: '6px 20px 14px', minHeight: 110 }}>
        <div style={{
          background: '#fff', borderRadius: 20, padding: '16px 18px',
          textAlign: 'center', boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
          transition: 'transform 300ms ease, opacity 300ms ease',
          transform: fadeIn ? 'scale(1.03)' : 'scale(1)',
        }}>
          {currentEvent ? (
            <>
              <div style={{
                fontSize: 36, marginBottom: 6,
                animation: 'mochi-bounce 600ms ease',
              }}>{currentEvent.emoji}</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: P_COLORS.ink, marginBottom: 4 }}>{currentEvent.text}</div>
              <div style={{ fontSize: 12, color: P_COLORS.ink3, fontStyle: 'italic' }}>"{currentEvent.sound}"</div>
            </>
          ) : milestoneMsg ? (
            <>
              <div style={{ fontSize: 32, marginBottom: 6 }}>🐰</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#0077b6', lineHeight: 1.5 }}>{milestoneMsg}</div>
            </>
          ) : (
            <>
              <div style={{ fontSize: 28, marginBottom: 6 }}>🐰</div>
              <div style={{ fontSize: 13, color: P_COLORS.ink2, lineHeight: 1.5 }}>
                {elapsedMin < 1 ? "Let's begin... Mochi is right here with you." :
                 "Mochi is keeping you company. Stay with it."}
              </div>
            </>
          )}
        </div>
      </div>

      {/* event ticker — subtle pill showing recent event */}
      {eventLog.length > 0 && !currentEvent && (
        <div style={{ padding: '0 20px 8px', textAlign: 'center' }}>
          <span style={{ display: 'inline-block', padding: '4px 12px', borderRadius: 999, background: 'rgba(255,255,255,0.7)', fontSize: 11, color: P_COLORS.ink3 }}>
            {eventLog[eventLog.length - 1].emoji} {eventLog.length} Mochi moment{eventLog.length > 1 ? 's' : ''} so far
          </span>
        </div>
      )}

      {/* controls */}
      <div style={{ padding: '0 20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <PButton variant="light" onClick={() => setPaused(p => !p)}>{paused ? 'Resume' : 'Pause'}</PButton>
        <PButton variant="primary" onClick={handleStop}>Stop</PButton>
      </div>

      {/* inline keyframes for bounce animation */}
      <style>{`
        @keyframes mochi-bounce {
          0% { transform: scale(0.5) translateY(8px); opacity: 0; }
          50% { transform: scale(1.15) translateY(-4px); opacity: 1; }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }
      `}</style>
    </PScreen>
  );
}

function FocusSummary({ sess, onDone }) {
  const mins = Math.round(sess.actualSec / 60);
  const events = sess.events || [];
  const points = sess.points || 0;
  const [showEvents, setShowEvents] = React.useState(false);

  React.useEffect(() => {
    const t = setTimeout(() => setShowEvents(true), 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <PScreen>
      <PHeader title="Nice work!" sub="Here's what happened during your session."
        right={<div onClick={onDone} style={{ cursor: 'pointer' }}><PIcon name="x" size={22} /></div>} />

      {/* main stats */}
      <PSection>
        <PCard style={{ textAlign: 'center', padding: 28 }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>🌱</div>
          <div style={{ fontSize: 38, fontWeight: 700, letterSpacing: '-0.02em' }}>{mins} min</div>
          <div style={{ fontSize: 13, color: P_COLORS.ink3, marginTop: 4 }}>
            {sess.completed ? 'Full session completed!' : 'Ended early — that still counts.'}
          </div>
          {sess.intention && (
            <div style={{ fontSize: 13, marginTop: 16, padding: '10px 14px', background: P_COLORS.surface1, borderRadius: 12, textAlign: 'left' }}>
              <span style={{ color: P_COLORS.ink3 }}>Intention: </span>{sess.intention}
            </div>
          )}
        </PCard>
      </PSection>

      {/* points earned */}
      <PSection>
        <PCard style={{
          background: 'linear-gradient(135deg, #FFF8E1 0%, #FCEBD8 100%)',
          padding: 20, display: 'flex', alignItems: 'center', gap: 16,
        }}>
          <div style={{
            width: 56, height: 56, borderRadius: '50%',
            background: '#FFD54F', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 26, fontWeight: 900, color: '#5D4037', flexShrink: 0,
            boxShadow: '0 2px 8px rgba(255,213,79,0.4)',
          }}>⭐</div>
          <div>
            <div style={{ fontSize: 28, fontWeight: 800, color: '#5D4037' }}>+{points}</div>
            <div style={{ fontSize: 13, color: '#8D6E63' }}>Points earned this session</div>
          </div>
        </PCard>
      </PSection>

      {/* points breakdown */}
      <PSection>
        <PCard style={{ padding: 16 }}>
          <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 10 }}>Points breakdown</div>
          <PointRow label={`${mins} minutes focused`} value={`+${mins * 2}`} />
          {sess.completed && <PointRow label="Completed full session" value="+20" />}
          {mins >= 25 && <PointRow label="25+ minute bonus" value="+10" />}
          {mins >= 45 && <PointRow label="45+ minute bonus" value="+15" />}
          {events.length > 0 && <PointRow label={`${events.length} Mochi moment${events.length > 1 ? 's' : ''}`} value={`+${events.length * 3}`} />}
        </PCard>
      </PSection>

      {/* mochi events log */}
      {events.length > 0 && (
        <PSection title="Mochi's moments" right={
          <span style={{ fontSize: 12, color: P_COLORS.ink3 }}>{events.length} event{events.length > 1 ? 's' : ''}</span>
        }>
          <div style={{
            opacity: showEvents ? 1 : 0,
            transform: showEvents ? 'translateY(0)' : 'translateY(12px)',
            transition: 'all 500ms ease',
          }}>
            {events.map((ev, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '12px 0',
                borderBottom: i < events.length - 1 ? `1px solid ${P_COLORS.line}` : 'none',
              }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 12, background: P_COLORS.surface1,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0,
                }}>{ev.emoji}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 2 }}>{ev.text}</div>
                  <div style={{ fontSize: 12, color: P_COLORS.ink3 }}>at ~{ev.minute} min</div>
                </div>
              </div>
            ))}
          </div>
        </PSection>
      )}

      <PSection>
        <PButton variant="primary" full onClick={onDone}>Done</PButton>
      </PSection>
    </PScreen>
  );
}

function PointRow({ label, value }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', fontSize: 13 }}>
      <span style={{ color: P_COLORS.ink2 }}>{label}</span>
      <span style={{ fontWeight: 700, color: '#5D4037' }}>{value}</span>
    </div>
  );
}

Object.assign(window, { FocusScreen });
