// Home — reads real data from store

function HomeScreen({ onOpenFocus, onOpenTask, onOpenMood, onOpenBreakdown, onOpenMe }) {
  const { state } = useStore();
  const orderedTasks = sortTasksForEnergy(state.tasks, state.mood.energy);
  const todayTasks = orderedTasks.slice(0, 4);
  const suggested = orderedTasks.find(t => !t.done && t.subtasks.length > 0) || orderedTasks.find(t => !t.done);
  const smallestStep = suggested?.subtasks?.find(s => !s.done);

  return (
    <PScreen>
      <PHeader
        title="Good morning!"
        sub="Let's find one doable next step today."
        right={<>
          <div style={{ cursor: 'pointer' }}><PIcon name="bell" size={22} /></div>
          <div style={{ cursor: 'pointer' }} onClick={onOpenMe}><PIcon name="user" size={22} /></div>
        </>}
      />

      <PSection>
        <PCard>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div style={{ fontSize: 16, fontWeight: 700 }}>How are you starting?</div>
            <span style={{ padding: '5px 12px', borderRadius: 999, background: P_COLORS.surface3, fontSize: 13, fontWeight: 500, cursor: 'pointer' }} onClick={onOpenMood}>Update</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
            <StateTile icon="smile" label="Mood" value={state.mood.mood} />
            <StateTile icon="battery-medium" label="Energy" value={state.mood.energy} />
            <StateTile icon="sprout" label="Focus" value={state.mood.focus} />
          </div>
        </PCard>
      </PSection>

      {suggested && (
        <PSection title="Suggested start">
          <PCard>
            <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>{suggested.title}</div>
            {smallestStep && (
              <div style={{ background: P_COLORS.page, border: `1px solid ${P_COLORS.line}`, borderRadius: 14, padding: '14px 16px', marginBottom: 14 }}>
                <div style={{ fontSize: 13, color: P_COLORS.ink3, marginBottom: 4 }}>Smallest next step</div>
                <div style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.4 }}>{smallestStep.text}</div>
              </div>
            )}
            <PButton variant="primary" full onClick={onOpenFocus} style={{ marginBottom: 10 }}>Start Focus</PButton>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              <PButton variant="light" onClick={onOpenBreakdown}>Break down</PButton>
              <PButton variant="light" onClick={onOpenTask}>View task</PButton>
            </div>
          </PCard>
        </PSection>
      )}

      <PSection title="Today" right={<span style={{ fontSize: 13, color: P_COLORS.ink3, fontWeight: 500, cursor: 'pointer' }} onClick={onOpenTask}>See all</span>}>
        <PCard style={{ padding: 6 }}>
          {todayTasks.map((t, i) => (
            <div key={t.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', borderBottom: i < todayTasks.length - 1 ? `1px solid ${P_COLORS.line}` : 'none' }}>
              <CheckDot done={t.done} />
              <div style={{ flex: 1, fontSize: 14, fontWeight: 500, textDecoration: t.done ? 'line-through' : 'none', color: t.done ? P_COLORS.ink4 : P_COLORS.ink }}>{t.title}</div>
              <PPill kind={effortPillKind(t.priority)}>{effortLabel(t.priority)}</PPill>
            </div>
          ))}
        </PCard>
      </PSection>

      <PSection>
        <PCard>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <PIcon name="smile" size={24} />
            <div style={{ fontSize: 16, fontWeight: 700 }}>How are things feeling?</div>
          </div>
          <div style={{ fontSize: 13, color: P_COLORS.ink2, lineHeight: 1.45, marginBottom: 14 }}>
            A small reflection can help you notice what made today easier or harder.
          </div>
          <PButton variant="soft" full onClick={onOpenMood}>Open reflection</PButton>
        </PCard>
      </PSection>
    </PScreen>
  );
}

function StateTile({ icon, label, value }) {
  return (
    <div style={{ background: P_COLORS.page, border: `1px solid ${P_COLORS.line}`, borderRadius: 14, padding: '12px 10px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
      <PIcon name={icon} size={22} />
      <div style={{ fontSize: 13, fontWeight: 700 }}>{label}</div>
      <div style={{ fontSize: 12, color: P_COLORS.ink3 }}>{value}</div>
    </div>
  );
}

function CheckDot({ done, onClick }) {
  return (
    <div onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default', flexShrink: 0 }}>
      {done
        ? <PIcon name="check-circle" size={20} stroke={P_COLORS.ink} />
        : <div style={{ width: 18, height: 18, borderRadius: 999, border: `1.5px solid ${P_COLORS.ink4}` }} />}
    </div>
  );
}

Object.assign(window, { HomeScreen, CheckDot });
