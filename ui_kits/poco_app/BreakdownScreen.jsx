// AI-assisted task breakdown — 4-step wizard: Write → Friction → Generating → Result

const miniBtn = { border: 0, background: 'transparent', color: '#9A9A9A', width: 22, height: 22, borderRadius: 6, cursor: 'pointer', fontSize: 14 };

function BreakdownScreen({ initialTitle, initialPriority='medium', onDone, onStartFocus }) {
  const { addTaskFull } = useStore();
  const [step, setStep] = React.useState(1);
  const [title, setTitle] = React.useState(initialTitle || '');
  const [friction, setFriction] = React.useState(null);
  const [generatedSteps, setGeneratedSteps] = React.useState([]);
  const [editingId, setEditingId] = React.useState(null);
  const [editText, setEditText] = React.useState('');
  const [makingSmaller, setMakingSmaller] = React.useState(false);

  const goNext = () => setStep(s => s + 1);
  const goBack = () => setStep(s => s - 1);

  const save = () => {
    const clean = generatedSteps.filter(s => s.text.trim());
    addTaskFull({
      title: title.trim() || 'Untitled',
      priority: normalizeEffort(initialPriority),
      friction,
      source: 'ai-assisted',
      subtasks: clean.map(s => ({ id: uid(), text: s.text.trim(), done: false })),
    });
  };

  const handleSave = () => { save(); onDone(); };
  const handleStartFocus = () => {
    save();
    if (onStartFocus) onStartFocus();
    else onDone();
  };

  if (step === 1) return <WriteStep title={title} setTitle={setTitle} onNext={goNext} onClose={onDone} />;
  if (step === 2) return <FrictionStep friction={friction} setFriction={setFriction} onNext={goNext} onBack={goBack} onClose={onDone} />;
  if (step === 3) return <GeneratingStep friction={friction} onDone={(steps) => { setGeneratedSteps(steps); goNext(); }} title={title} />;
  return <ResultStep
    title={title} friction={friction}
    steps={generatedSteps} setSteps={setGeneratedSteps}
    editingId={editingId} setEditingId={setEditingId}
    editText={editText} setEditText={setEditText}
    makingSmaller={makingSmaller} setMakingSmaller={setMakingSmaller}
    onSave={handleSave} onStartFocus={handleStartFocus} onBack={() => setStep(2)} onClose={onDone}
  />;
}

/* ---- Step 1: Write ---- */
function WriteStep({ title, setTitle, onNext, onClose }) {
  return (
    <PScreen>
      <PHeader
        title="what feels hard to start?"
        sub="write it down and we'll help you break it into smaller steps."
        right={<div onClick={onClose} style={{ cursor: 'pointer' }}><PIcon name="x" size={22} /></div>}
      />
      <PSection>
        <PCard>
          <input
            autoFocus
            value={title}
            onChange={e => setTitle(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && title.trim() && onNext()}
            placeholder="e.g. write my thesis introduction…"
            style={{ width: '100%', border: 0, background: 'transparent', fontSize: 16, fontFamily: P_FONT, fontWeight: 600, outline: 'none', color: P_COLORS.ink }}
          />
        </PCard>
      </PSection>
      <PSection>
        <PButton variant="primary" full disabled={!title.trim()} onClick={onNext}>Continue</PButton>
      </PSection>
    </PScreen>
  );
}

/* ---- Step 2: Friction picker ---- */
function FrictionStep({ friction, setFriction, onNext, onBack, onClose }) {
  return (
    <PScreen>
      <PHeader
        title="what feels hardest about this?"
        sub="choose what feels closest — it helps us suggest better steps."
        right={<div onClick={onClose} style={{ cursor: 'pointer' }}><PIcon name="x" size={22} /></div>}
      />
      <PSection>
        {FRICTION_TAGS.map(tag => (
          <div
            key={tag}
            onClick={() => setFriction(tag === friction ? null : tag)}
            style={{
              padding: '16px 18px',
              marginBottom: 8,
              borderRadius: 14,
              border: `1.5px solid ${friction === tag ? P_COLORS.ink : P_COLORS.line}`,
              background: friction === tag ? P_COLORS.surface1 : P_COLORS.page,
              cursor: 'pointer',
              fontSize: 15,
              fontWeight: friction === tag ? 600 : 400,
              fontFamily: P_FONT,
              color: P_COLORS.ink,
              transition: 'all 150ms ease-out',
            }}
          >
            {tag}
          </div>
        ))}
      </PSection>
      <PSection>
        <div style={{ display: 'flex', gap: 8 }}>
          <PButton variant="light" onClick={onBack}>Back</PButton>
          <PButton variant="primary" full onClick={onNext}>
            {friction ? 'Continue' : 'Skip'}
          </PButton>
        </div>
      </PSection>
    </PScreen>
  );
}

/* ---- Step 3: Generating animation ---- */
function GeneratingStep({ title, friction, onDone }) {
  const [dotPhase, setDotPhase] = React.useState(0);

  React.useEffect(() => {
    const dotTimer = setInterval(() => setDotPhase(d => (d + 1) % 4), 500);
    const advanceTimer = setTimeout(() => {
      const steps = generateBreakdown(title, friction);
      onDone(steps);
    }, 2500);
    return () => { clearInterval(dotTimer); clearTimeout(advanceTimer); };
  }, []);

  const dotStyle = (i) => ({
    width: 10, height: 10, borderRadius: 999,
    background: P_COLORS.ink3,
    opacity: ((dotPhase + i) % 3 === 0) ? 1 : 0.3,
    transition: 'opacity 400ms ease',
  });

  return (
    <div style={{
      height: '100%', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      background: '#FCEBD8', padding: 40,
    }}>
      <div style={{ fontSize: 18, fontWeight: 600, fontFamily: P_FONT, color: P_COLORS.ink, textAlign: 'center', marginBottom: 32, lineHeight: 1.5 }}>
        {getEncouragingMessage(friction)}
      </div>
      <div style={{ display: 'flex', gap: 12 }}>
        <div style={dotStyle(0)} />
        <div style={dotStyle(1)} />
        <div style={dotStyle(2)} />
      </div>
    </div>
  );
}

/* ---- Step 4: Result ---- */
function ResultStep({ title, friction, steps, setSteps, editingId, setEditingId, editText, setEditText, makingSmaller, setMakingSmaller, onSave, onStartFocus, onBack, onClose }) {
  const updateStep = (id, text) => setSteps(s => s.map(x => x.id === id ? { ...x, text } : x));
  const deleteStep = (id) => setSteps(s => s.filter(x => x.id !== id));
  const moveStep = (id, dir) => {
    setSteps(prev => {
      const i = prev.findIndex(x => x.id === id);
      const j = i + dir;
      if (j < 0 || j >= prev.length) return prev;
      const next = [...prev];
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
  };
  const addStep = () => setSteps(s => [...s, { id: uid(), text: '', done: false }]);

  const handleMakeSmaller = () => {
    if (steps.length === 0) return;
    setMakingSmaller(true);
    setTimeout(() => {
      const first = steps[0];
      const smaller = makeSmallerStep(first.text);
      setSteps(prev => [...smaller, ...prev.slice(1)]);
      setMakingSmaller(false);
    }, 1000);
  };

  const startEdit = (s) => { setEditingId(s.id); setEditText(s.text); };
  const finishEdit = (id, original) => {
    updateStep(id, editText.trim() || original);
    setEditingId(null);
  };

  if (makingSmaller) {
    return (
      <div style={{
        height: '100%', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        background: '#FCEBD8', padding: 40,
      }}>
        <div style={{ fontSize: 16, fontWeight: 600, fontFamily: P_FONT, color: P_COLORS.ink, textAlign: 'center', marginBottom: 24 }}>
          making it even smaller...
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          {[0,1,2].map(i => (
            <div key={i} style={{ width: 8, height: 8, borderRadius: 999, background: P_COLORS.ink3, opacity: 0.5 }} />
          ))}
        </div>
      </div>
    );
  }

  const firstStep = steps[0];
  const restSteps = steps.slice(1);

  return (
    <PScreen>
      <PHeader
        title="we made it a little smaller"
        sub="you don't need to do it all now. just start with the first step."
        right={<div onClick={onClose} style={{ cursor: 'pointer' }}><PIcon name="x" size={22} /></div>}
      />

      {/* Summary card */}
      <PSection>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
          <PPill kind="neutral">{title}</PPill>
          {friction && <PPill kind="priority">{friction}</PPill>}
        </div>
      </PSection>

      {/* First step highlight */}
      {firstStep && (
        <PSection title="start with this">
          <PCard style={{ border: `1.5px solid ${P_COLORS.ink}`, background: P_COLORS.page }}>
            {editingId === firstStep.id ? (
              <input autoFocus value={editText} onChange={e => setEditText(e.target.value)}
                onBlur={() => finishEdit(firstStep.id, firstStep.text)}
                onKeyDown={e => e.key === 'Enter' && finishEdit(firstStep.id, firstStep.text)}
                style={{ width: '100%', border: 0, background: 'transparent', fontSize: 15, fontFamily: P_FONT, fontWeight: 600, outline: 'none', color: P_COLORS.ink }} />
            ) : (
              <div onClick={() => startEdit(firstStep)}
                style={{ fontSize: 15, fontWeight: 600, lineHeight: 1.5, cursor: 'text', color: P_COLORS.ink }}>
                {firstStep.text}
              </div>
            )}
          </PCard>
        </PSection>
      )}

      {/* Rest of steps */}
      {restSteps.length > 0 && (
        <PSection title="next steps">
          <PCard style={{ padding: 6 }}>
            {restSteps.map((s, i) => (
              <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderBottom: i < restSteps.length - 1 ? `1px solid ${P_COLORS.line}` : 'none' }}>
                <div style={{ width: 22, height: 22, borderRadius: 999, background: P_COLORS.surface1, display: 'grid', placeItems: 'center', fontSize: 12, fontWeight: 600, flexShrink: 0 }}>{i + 2}</div>
                {editingId === s.id ? (
                  <input autoFocus value={editText} onChange={e => setEditText(e.target.value)}
                    onBlur={() => finishEdit(s.id, s.text)}
                    onKeyDown={e => e.key === 'Enter' && finishEdit(s.id, s.text)}
                    style={{ flex: 1, border: 0, background: 'transparent', fontSize: 14, fontFamily: P_FONT, outline: 'none', color: P_COLORS.ink }} />
                ) : (
                  <div onClick={() => startEdit(s)}
                    style={{ flex: 1, fontSize: 14, fontWeight: 500, lineHeight: 1.45, cursor: 'text', color: P_COLORS.ink }}>
                    {s.text}
                  </div>
                )}
                <div style={{ display: 'flex', gap: 2, flexShrink: 0 }}>
                  <button onClick={() => moveStep(s.id, -1)} style={miniBtn}>↑</button>
                  <button onClick={() => moveStep(s.id, 1)} style={miniBtn}>↓</button>
                  {steps.length > 1 && <button onClick={() => deleteStep(s.id)} style={miniBtn}>×</button>}
                </div>
              </div>
            ))}
          </PCard>
        </PSection>
      )}

      {/* Actions under steps */}
      <PSection>
        <div style={{ display: 'flex', gap: 8 }}>
          <PButton variant="light" onClick={addStep}>+ Add a step</PButton>
          <PButton variant="soft" onClick={handleMakeSmaller}>Make it smaller</PButton>
        </div>
      </PSection>

      {/* Bottom actions */}
      <PSection>
        <PButton variant="primary" full onClick={onSave}>Save & see my list</PButton>
        <div style={{ height: 8 }} />
        <PButton variant="secondary" full onClick={onStartFocus}>Start Focus</PButton>
        <div style={{ height: 8 }} />
        <div style={{ textAlign: 'center' }}>
          <span onClick={onBack} style={{ fontSize: 13, color: P_COLORS.ink3, cursor: 'pointer', textDecoration: 'underline' }}>go back and change answers</span>
        </div>
      </PSection>
    </PScreen>
  );
}

Object.assign(window, { BreakdownScreen });
