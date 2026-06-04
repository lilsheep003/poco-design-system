// Tasks — capture thoughts, breakdown, mind drop & planning entries, filter, list.

function TaskScreen({ onOpenBreakdown, onOpenFocus, onOpenMindDrop, onOpenPlanning }) {
  const { state, addMindDrop, toggleTask, deleteTask, updateTask, moveTask, updateSubtask } = useStore();
  const [filter, setFilter] = React.useState('all');
  const [text, setText] = React.useState('');
  const [editingId, setEditingId] = React.useState(null);
  const [editText, setEditText] = React.useState('');
  const [expandedId, setExpandedId] = React.useState(null);

  const filtered = state.tasks.filter(t => {
    if (filter === 'all') return true;
    if (filter === 'open') return !t.done;
    if (filter === 'done') return t.done;
    if (filter === 'easy') return normalizeEffort(t.priority) === 'easy';
    if (filter === 'medium') return normalizeEffort(t.priority) === 'medium';
    if (filter === 'hard') return normalizeEffort(t.priority) === 'hard';
    if (filter === 'today') return t.today && !t.done;
    return true;
  });
  const visibleTasks = sortTasksForEnergy(filtered, state.mood.energy);

  const saveDrop = () => {
    const v = text.trim();
    if (v) { addMindDrop(v); setText(''); }
  };

  return (
    <PScreen>
      <PHeader
        title="Tasks"
        sub="Let's find one easy place to start today"
        right={<>
          <PIcon name="search" size={22} />
          <PIcon name="filter" size={22} />
        </>}
      />

      {/* Capture */}
      <PSection>
        <PCard>
          <input value={text} onChange={e => setText(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && saveDrop()}
            placeholder="Add what's on your mind..."
            style={{ width: '100%', border: 0, background: 'transparent', fontSize: 15, fontFamily: P_FONT, color: P_COLORS.ink, outline: 'none', marginBottom: 12 }} />
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <PButton variant="light" style={{ padding: '8px 14px', fontSize: 13 }} onClick={saveDrop}>Save</PButton>
            <PButton variant="secondary" style={{ padding: '8px 14px', fontSize: 13 }} onClick={() => { const seed = text.trim() || null; setText(''); onOpenBreakdown(seed); }}>Break it down</PButton>
          </div>
        </PCard>
      </PSection>

      {/* Mind Drop & Planning entries */}
      <PSection>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <PCard onClick={onOpenMindDrop} style={{ cursor: 'pointer', padding: 16 }}>
            <div style={{ fontSize: 22, marginBottom: 8 }}>💭</div>
            <div style={{ fontSize: 15, fontWeight: 700 }}>Mind Drop</div>
            <div style={{ fontSize: 12, color: P_COLORS.ink3, marginTop: 3 }}>
              {state.mindDrops.length} thought{state.mindDrops.length !== 1 ? 's' : ''}
            </div>
          </PCard>
          <PCard onClick={onOpenPlanning} style={{ cursor: 'pointer', padding: 16 }}>
            <div style={{ fontSize: 22, marginBottom: 8 }}>📋</div>
            <div style={{ fontSize: 15, fontWeight: 700 }}>Planning</div>
            <div style={{ fontSize: 12, color: P_COLORS.ink3, marginTop: 3 }}>
              {state.tasks.filter(t => t.today && !t.done).length} for today
            </div>
          </PCard>
        </div>
      </PSection>

      {/* Feeling stuck */}
      <PSection>
        <PCard onClick={() => onOpenBreakdown(null)} style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 16, fontWeight: 700 }}>Feeling stuck?</div>
            <div style={{ fontSize: 13, color: P_COLORS.ink2, marginTop: 2 }}>Break a big task into smaller steps.</div>
          </div>
          <div style={{ width: 36, height: 36, borderRadius: 999, background: P_COLORS.page, border: `1px solid ${P_COLORS.line}`, display: 'grid', placeItems: 'center' }}>
            <PIcon name="chevron-right" size={18} stroke={P_COLORS.ink3} />
          </div>
        </PCard>
      </PSection>

      {/* Filter */}
      <PSection>
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
          {[['all','All'],['today','Today'],['open','Open'],['done','Done'],['easy','Easy'],['medium','Medium'],['hard','Hard']].map(([k, l]) => (
            <PChip key={k} active={filter === k} onClick={() => setFilter(k)}>{l}</PChip>
          ))}
        </div>
      </PSection>

      <PSection title={`${visibleTasks.length} ${filter === 'all' ? 'tasks' : filter}`}>
        <PCard style={{ padding: 6 }}>
          {visibleTasks.length === 0 && (
            <div style={{ padding: 20, textAlign: 'center', color: P_COLORS.ink3, fontSize: 14 }}>Nothing here yet.</div>
          )}
          {visibleTasks.map((t, i) => (
            <TaskRow
              key={t.id}
              task={t}
              isLast={i === visibleTasks.length - 1}
              expanded={expandedId === t.id}
              editing={editingId === t.id}
              editText={editText}
              setEditText={setEditText}
              onStartEdit={() => { setEditingId(t.id); setEditText(t.title); }}
              onFinishEdit={() => { updateTask(t.id, { title: editText.trim() || t.title }); setEditingId(null); }}
              onToggleDone={() => toggleTask(t.id)}
              onToggleExpanded={() => setExpandedId(expandedId === t.id ? null : t.id)}
              onMove={(dir) => moveTask(t.id, dir)}
              onDelete={() => { deleteTask(t.id); if (expandedId === t.id) setExpandedId(null); }}
              onToggleSubtask={(subtask) => updateSubtask(t.id, subtask.id, { done: !subtask.done })}
            />
          ))}
        </PCard>
      </PSection>
    </PScreen>
  );
}

function TaskRow({
  task,
  isLast,
  expanded,
  editing,
  editText,
  setEditText,
  onStartEdit,
  onFinishEdit,
  onToggleDone,
  onToggleExpanded,
  onMove,
  onDelete,
  onToggleSubtask,
}) {
  const subtasks = Array.isArray(task.subtasks) ? task.subtasks : [];
  const hasSubtasks = subtasks.length > 0;
  const doneCount = subtasks.filter(s => s.done).length;

  return (
    <div style={{ borderBottom: isLast ? 'none' : `1px solid ${P_COLORS.line}` }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px' }}>
        <CheckDot done={task.done} onClick={onToggleDone} />
        <div style={{ flex: 1, minWidth: 0 }}>
          {editing ? (
            <input autoFocus value={editText} onChange={e => setEditText(e.target.value)}
              onBlur={onFinishEdit}
              onKeyDown={e => { if (e.key === 'Enter') onFinishEdit(); if (e.key === 'Escape') onFinishEdit(); }}
              style={{ width: '100%', border: 0, borderBottom: `1px solid ${P_COLORS.ink}`, background: 'transparent', fontSize: 14, fontFamily: P_FONT, outline: 'none' }} />
          ) : (
            <div onClick={onStartEdit}
              style={{ fontSize: 14, fontWeight: 500, textDecoration: task.done ? 'line-through' : 'none', color: task.done ? P_COLORS.ink4 : P_COLORS.ink, cursor: 'text', lineHeight: 1.35 }}>
              {task.title}
            </div>
          )}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6, flexWrap: 'wrap' }}>
            <PPill kind={effortPillKind(task.priority)}>{effortLabel(task.priority)}</PPill>
            {task.today && !task.done && <span style={{ fontSize: 11, color: P_COLORS.progress }}>today</span>}
          </div>
        </div>
        {hasSubtasks && (
          <button
            onClick={onToggleExpanded}
            aria-label={expanded ? 'Hide steps' : 'Show steps'}
            style={{
              border: `1px solid ${expanded ? P_COLORS.ink : P_COLORS.lineStrong}`,
              background: expanded ? P_COLORS.ink : P_COLORS.page,
              color: expanded ? '#fff' : P_COLORS.ink3,
              borderRadius: 999,
              padding: '5px 8px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              fontFamily: P_FONT,
              fontSize: 11,
              fontWeight: 700,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            {doneCount}/{subtasks.length}
            <PIcon name={expanded ? 'chevron-left' : 'chevron-right'} size={13} stroke={expanded ? '#fff' : P_COLORS.ink3} sw={2} />
          </button>
        )}
        <div style={{ display: 'flex', gap: 2 }}>
          <button onClick={() => onMove(-1)} style={taskMiniBtn}>↑</button>
          <button onClick={() => onMove(1)} style={taskMiniBtn}>↓</button>
          <button onClick={onDelete} style={taskMiniBtn}>×</button>
        </div>
      </div>

      {expanded && hasSubtasks && (
        <div style={{ margin: '0 12px 12px 44px', border: `1px solid ${P_COLORS.line}`, borderRadius: 16, background: P_COLORS.page, overflow: 'hidden' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, padding: '10px 12px', background: P_COLORS.surface1, borderBottom: `1px solid ${P_COLORS.line}` }}>
            <div style={{ fontSize: 12, color: P_COLORS.ink3, fontWeight: 700 }}>small steps</div>
            <div style={{ fontSize: 12, color: P_COLORS.ink3, fontWeight: 700 }}>{doneCount} of {subtasks.length} done</div>
          </div>
          {subtasks.map((subtask, index) => (
            <button
              key={subtask.id}
              onClick={() => onToggleSubtask(subtask)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'flex-start',
                gap: 10,
                padding: '11px 12px',
                border: 0,
                borderBottom: index < subtasks.length - 1 ? `1px solid ${P_COLORS.line}` : 'none',
                background: 'transparent',
                color: P_COLORS.ink,
                fontFamily: P_FONT,
                textAlign: 'left',
                cursor: 'pointer',
              }}
            >
              <StepDot done={subtask.done} />
              <span style={{
                flex: 1,
                fontSize: 13,
                lineHeight: 1.45,
                color: subtask.done ? P_COLORS.ink4 : P_COLORS.ink,
                textDecoration: subtask.done ? 'line-through' : 'none',
              }}>
                {subtask.text}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function StepDot({ done }) {
  return (
    <span style={{
      width: 18,
      height: 18,
      borderRadius: 999,
      border: `1.5px solid ${done ? P_COLORS.ink : P_COLORS.ink4}`,
      background: done ? P_COLORS.ink : P_COLORS.page,
      color: '#fff',
      display: 'grid',
      placeItems: 'center',
      flexShrink: 0,
      marginTop: 1,
      fontSize: 12,
      lineHeight: 1,
    }}>
      {done ? '✓' : ''}
    </span>
  );
}

const taskMiniBtn = { border: 0, background: 'transparent', color: '#9A9A9A', width: 22, height: 22, borderRadius: 6, cursor: 'pointer', fontSize: 14 };

Object.assign(window, { TaskScreen });
