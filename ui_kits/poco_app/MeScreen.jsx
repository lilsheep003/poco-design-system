// Me — real streak & mood history

function MeScreen() {
  const { state } = useStore();
  const done = state.tasks.filter(t => t.done).length;
  const focusMins = Math.round(state.focusSessions.reduce((a, s) => a + s.actualSec, 0) / 60);

  return (
    <PScreen>
      <PHeader title="You" sub="A quiet look at your rhythm."
        right={<><PIcon name="bell" size={22} /><PIcon name="settings" size={22} /></>} />

      <PSection>
        <PCard style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 56, height: 56, borderRadius: 999, background: P_COLORS.surface3, display: 'grid', placeItems: 'center', fontSize: 22 }}>🐰</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 18, fontWeight: 700 }}>Friend of Mochi</div>
            <div style={{ fontSize: 13, color: P_COLORS.ink3 }}>Small progress, every day.</div>
          </div>
        </PCard>
      </PSection>

      <PSection>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
          <Stat label="Streak" value={`${state.streak}d`} />
          <Stat label="Done" value={done} />
          <Stat label="Focused" value={`${focusMins}m`} />
        </div>
      </PSection>

      <PSection title="Mood · last 14 days">
        <PCard><MoodChart history={state.moodHistory} /></PCard>
      </PSection>

      <PSection title="Settings">
        <PCard style={{ padding: 0 }}>
          {['Notifications', 'Appearance', 'Mochi companion', 'Data & privacy', 'About Poco'].map((l, i, a) => (
            <div key={l} style={{ display: 'flex', alignItems: 'center', padding: '14px 16px', borderBottom: i < a.length - 1 ? `1px solid ${P_COLORS.line}` : 'none' }}>
              <div style={{ flex: 1, fontSize: 14, fontWeight: 500 }}>{l}</div>
              <PIcon name="chevron-right" size={16} stroke={P_COLORS.ink4} />
            </div>
          ))}
        </PCard>
      </PSection>
    </PScreen>
  );
}

function Stat({ label, value }) {
  return (
    <div style={{ background: P_COLORS.surface1, borderRadius: 14, padding: '14px 10px', textAlign: 'center' }}>
      <div style={{ fontSize: 22, fontWeight: 700 }}>{value}</div>
      <div style={{ fontSize: 12, color: P_COLORS.ink3, marginTop: 2 }}>{label}</div>
    </div>
  );
}

Object.assign(window, { MeScreen });
