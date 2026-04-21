// Tasks — capture thoughts, breakdown, mind drop & planning entries, filter, list.

function TaskScreen({ onOpenBreakdown, onOpenFocus, onOpenMindDrop, onOpenPlanning }) {
  const { state, addMindDrop, toggleTask, deleteTask, updateTask, moveTask } = useStore();
  const [filter, setFilter] = React.useState('all');
  const [text, setText] = React.useState('');
  const [editingId, setEditingId] = React.useState(null);
  const [editText, setEditText] = React.useState('');

  const filtered = state.tasks.filter(t => {
    if (filter === 'all') return true;
    if (filter === 'open') return !t.done;
    if (filter === 'done') return t.done;
    if (filter === 'high') return t.priority === 'high';
    if (filter === 'easy') return t.priority === 'easy';
    if (filter === 'today') return t.today && !t.done;
    return true;
  });

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
          {[['all','All'],['today','Today'],['open','Open'],['done','Done'],['high','High'],['easy','Easy']].map(([k, l]) => (
            <PChip key={k} active={filter === k} onClick={() => setFilter(k)}>{l}</PChip>
          ))}
        </div>
      </PSection>

      <PSection title={`${filtered.length} ${filter === 'all' ? 'tasks' : filter}`}>
        <PCard style={{ padding: 6 }}>
          {filtered.length === 0 && (
            <div style={{ padding: 20, textAlign: 'center', color: P_COLORS.ink3, fontSize: 14 }}>Nothing here yet.</div>
          )}
          {filtered.map((t, i) => (
            <div key={t.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderBottom: i < filtered.length - 1 ? `1px solid ${P_COLORS.line}` : 'none' }}>
              <CheckDot done={t.done} onClick={() => toggleTask(t.id)} />
              {editingId === t.id ? (
                <input autoFocus value={editText} onChange={e => setEditText(e.target.value)}
                  onBlur={() => { updateTask(t.id, { title: editText.trim() || t.title }); setEditingId(null); }}
                  onKeyDown={e => { if (e.key === 'Enter') { updateTask(t.id, { title: editText.trim() || t.title }); setEditingId(null); } }}
                  style={{ flex: 1, border: 0, borderBottom: `1px solid ${P_COLORS.ink}`, background: 'transparent', fontSize: 14, fontFamily: P_FONT, outline: 'none' }} />
              ) : (
                <div onClick={() => { setEditingId(t.id); setEditText(t.title); }}
                  style={{ flex: 1, fontSize: 14, fontWeight: 500, textDecoration: t.done ? 'line-through' : 'none', color: t.done ? P_COLORS.ink4 : P_COLORS.ink, cursor: 'text' }}>
                  {t.title}
                  {t.subtasks.length > 0 && <span style={{ fontSize: 11, color: P_COLORS.ink3, marginLeft: 8 }}>{t.subtasks.filter(s=>s.done).length}/{t.subtasks.length}</span>}
                  {t.today && !t.done && <span style={{ fontSize: 11, color: P_COLORS.progress, marginLeft: 6 }}>· today</span>}
                </div>
              )}
              {t.priority === 'high' && <PPill kind="priority">High</PPill>}
              {t.priority === 'easy' && <PPill kind="easy">Easy</PPill>}
              <div style={{ display: 'flex', gap: 2 }}>
                <button onClick={() => moveTask(t.id, -1)} style={miniBtn}>↑</button>
                <button onClick={() => moveTask(t.id, 1)} style={miniBtn}>↓</button>
                <button onClick={() => deleteTask(t.id)} style={miniBtn}>×</button>
              </div>
            </div>
          ))}
        </PCard>
      </PSection>
    </PScreen>
  );
}

const miniBtn = { border: 0, background: 'transparent', color: '#9A9A9A', width: 22, height: 22, borderRadius: 6, cursor: 'pointer', fontSize: 14 };

Object.assign(window, { TaskScreen });
