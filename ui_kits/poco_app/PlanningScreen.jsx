// Planning — pick a few tasks to focus on today.

function PlanningScreen({ onDone }) {
  const { state, toggleToday } = useStore();
  const open = state.tasks.filter(t => !t.done);
  const todayTasks = open.filter(t => t.today);
  const otherTasks = open.filter(t => !t.today);

  return (
    <PScreen>
      <PHeader
        title="plan your day"
        sub="pick a few things you'd like to focus on — even one is enough."
        right={<div onClick={onDone} style={{ cursor: 'pointer' }}><PIcon name="x" size={22} /></div>}
      />

      {/* Today's focus */}
      <PSection title={`today's focus · ${todayTasks.length}`}>
        {todayTasks.length === 0 ? (
          <PCard>
            <div style={{ textAlign: 'center', padding: 12, color: P_COLORS.ink3, fontSize: 14, lineHeight: 1.5 }}>
              tap a task below to add it to your focus.
            </div>
          </PCard>
        ) : (
          <PCard style={{ padding: 6 }}>
            {todayTasks.map((t, i) => (
              <PlanRow key={t.id} task={t} index={i} total={todayTasks.length} focused onToggle={() => toggleToday(t.id)} />
            ))}
          </PCard>
        )}
      </PSection>

      {/* All open tasks */}
      {otherTasks.length > 0 && (
        <PSection title="all open tasks">
          <PCard style={{ padding: 6 }}>
            {otherTasks.map((t, i) => (
              <PlanRow key={t.id} task={t} index={i} total={otherTasks.length} focused={false} onToggle={() => toggleToday(t.id)} />
            ))}
          </PCard>
        </PSection>
      )}

      {open.length === 0 && (
        <PSection>
          <PCard>
            <div style={{ textAlign: 'center', padding: 20, color: P_COLORS.ink3, fontSize: 14 }}>
              no open tasks yet. add some on the Tasks page first.
            </div>
          </PCard>
        </PSection>
      )}

      <PSection>
        <PButton variant="primary" full onClick={onDone}>
          {todayTasks.length > 0 ? 'looks good — let\'s go' : 'done planning'}
        </PButton>
      </PSection>
    </PScreen>
  );
}

function PlanRow({ task, index, total, focused, onToggle }) {
  return (
    <div onClick={onToggle} style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '12px 14px',
      borderBottom: index < total - 1 ? `1px solid ${P_COLORS.line}` : 'none',
      cursor: 'pointer',
    }}>
      <div style={{
        width: 22, height: 22, borderRadius: 6, flexShrink: 0,
        border: `1.5px solid ${focused ? P_COLORS.ink : P_COLORS.ink4}`,
        background: focused ? P_COLORS.ink : 'transparent',
        display: 'grid', placeItems: 'center',
        transition: 'all 150ms ease-out',
      }}>
        {focused && <PIcon name="check-circle" size={14} stroke="#fff" sw={2.5} />}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 500, color: P_COLORS.ink }}>{task.title}</div>
        {task.subtasks.length > 0 && (
          <div style={{ fontSize: 12, color: P_COLORS.ink3, marginTop: 2 }}>
            {task.subtasks.filter(s => s.done).length}/{task.subtasks.length} steps
          </div>
        )}
      </div>
      {task.priority === 'high' && <PPill kind="priority">High</PPill>}
      {task.priority === 'easy' && <PPill kind="easy">Easy</PPill>}
    </div>
  );
}

Object.assign(window, { PlanningScreen });
