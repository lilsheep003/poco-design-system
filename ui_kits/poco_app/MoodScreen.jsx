// Mood — logs into store, shows recent history

function MoodScreen({ onSubmit }) {
  const { state, setMood } = useStore();
  const [picked, setPicked] = React.useState(state.mood);
  const [reflection, setReflection] = React.useState(null);

  const moods = ['Calm', 'Okay', 'Tired', 'Anxious', 'Motivate', 'Overwhelmed'];
  const energies = [{ k: 'Low', icon: 'battery-low' }, { k: 'Medium', icon: 'battery-medium' }, { k: 'High', icon: 'battery-full' }];
  const focus = ['Not yet', 'Maybe', 'Yes'];
  const reflections = ['Too many tasks', 'Feeling rushed', 'Poor sleep', 'Distracted', 'Unclear instructions', 'Just feeling stuck'];

  const submit = () => { setMood({ ...picked }); onSubmit(); };

  return (
    <PScreen>
      <PHeader title="Mood" sub={<>How are you feeling today? A small check-in can help you notice your rhythm.</>}
        right={<><PIcon name="calendar" size={22} /><PIcon name="settings" size={22} /></>} />

      <PSection>
        <PCard>
          <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>1. Your mood right now</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
            {moods.map(m => <PChip key={m} active={picked.mood === m} onClick={() => setPicked({ ...picked, mood: m })}>{m}</PChip>)}
          </div>

          <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>2. Energy level</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 20 }}>
            {energies.map(e => {
              const on = picked.energy === e.k;
              return (
                <div key={e.k} onClick={() => setPicked({ ...picked, energy: e.k })} style={{
                  background: P_COLORS.page, borderRadius: 14,
                  border: `${on ? 1.5 : 1}px solid ${on ? P_COLORS.ink : P_COLORS.line}`,
                  padding: '14px 10px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, cursor: 'pointer',
                }}>
                  <PIcon name={e.icon} size={22} />
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{e.k}</div>
                </div>
              );
            })}
          </div>

          <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>3. Ready to focus?</div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
            {focus.map(f => <PChip key={f} active={picked.focus === f} onClick={() => setPicked({ ...picked, focus: f })}>{f}</PChip>)}
          </div>

          <PButton variant="primary" full onClick={submit}>That's me today</PButton>
        </PCard>
      </PSection>

      <PSection title="Gentle reflection">
        <PCard>
          <div style={{ fontSize: 14, color: P_COLORS.ink2, lineHeight: 1.45, marginBottom: 14 }}>
            What feels heaviest or is making it hard to start right now?
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {reflections.map(r => <PChip key={r} active={reflection === r} onClick={() => setReflection(r === reflection ? null : r)}>{r}</PChip>)}
          </div>
        </PCard>
      </PSection>

      <PSection title="Recent history">
        <PCard>
          <MoodChart history={state.moodHistory} />
        </PCard>
      </PSection>
    </PScreen>
  );
}

function MoodChart({ history }) {
  const lvl = (m) => ({ 'Calm': 3, 'Motivate': 3, 'Okay': 2, 'Anxious': 1, 'Overwhelmed': 1, 'Tired': 0 }[m] ?? 2);
  const color = (v) => [P_COLORS.ink5, P_COLORS.priorityBg, P_COLORS.surface3, P_COLORS.easyBg][v];
  return (
    <>
      <div style={{ display: 'flex', gap: 5, alignItems: 'flex-end', height: 64 }}>
        {history.map((h, i) => {
          const v = lvl(h.mood);
          return <div key={i} title={`${h.date}: ${h.mood}`} style={{ flex: 1, height: 24 + v * 12, borderRadius: 6, background: color(v) }} />;
        })}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: P_COLORS.ink3, marginTop: 8 }}>
        <span>2 weeks ago</span><span>Today</span>
      </div>
    </>
  );
}

Object.assign(window, { MoodScreen, MoodChart });
