// Mind Drop — a low-pressure inbox for captured thoughts.

function MindDropScreen({ onDone, onOpenBreakdown }) {
  const { state, deleteMindDrop, convertDropToTask, updateMindDrop } = useStore();
  const drops = state.mindDrops;

  const timeAgo = (ts) => {
    const diff = Math.floor((Date.now() - ts) / 1000);
    if (diff < 60) return 'just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  return (
    <PScreen>
      <PHeader
        title="mind drop"
        sub="thoughts you've captured — no pressure to act on them."
        right={<div onClick={onDone} style={{ cursor: 'pointer' }}><PIcon name="x" size={22} /></div>}
      />

      {drops.length === 0 && (
        <PSection>
          <PCard>
            <div style={{ textAlign: 'center', padding: 20, color: P_COLORS.ink3, fontSize: 14, lineHeight: 1.5 }}>
              nothing here yet.<br />use the capture box on Tasks to drop a thought.
            </div>
          </PCard>
        </PSection>
      )}

      {drops.map(drop => (
        <PSection key={drop.id}>
          <PCard>
            <div style={{ fontSize: 15, fontWeight: 500, lineHeight: 1.5, color: P_COLORS.ink, marginBottom: 10 }}>
              {drop.text}
            </div>
            <div style={{ fontSize: 12, color: P_COLORS.ink4, marginBottom: 14 }}>
              {timeAgo(drop.createdAt)}
            </div>
            <EffortTagPicker
              value={normalizeEffort(drop.priority)}
              onChange={(priority) => updateMindDrop(drop.id, { priority })}
            />
            <div style={{ display: 'flex', gap: 8 }}>
              <PButton variant="light" style={{ padding: '8px 12px', fontSize: 13, flex: 1 }}
                onClick={() => convertDropToTask(drop.id)}>
                Add to tasks
              </PButton>
              <PButton variant="soft" style={{ padding: '8px 12px', fontSize: 13, flex: 1 }}
                onClick={() => { onOpenBreakdown({ title: drop.text, priority: normalizeEffort(drop.priority) }); deleteMindDrop(drop.id); }}>
                Break it down
              </PButton>
              <button onClick={() => deleteMindDrop(drop.id)}
                style={{ border: 0, background: 'transparent', color: P_COLORS.ink4, cursor: 'pointer', padding: '8px 6px', fontSize: 16 }}>
                ×
              </button>
            </div>
          </PCard>
        </PSection>
      ))}

      <PSection>
        <div style={{ textAlign: 'center', fontSize: 13, color: P_COLORS.ink4, lineHeight: 1.5, padding: '10px 0' }}>
          {drops.length > 0 ? `${drops.length} thought${drops.length > 1 ? 's' : ''} captured` : ''}
        </div>
      </PSection>
    </PScreen>
  );
}

function EffortTagPicker({ value, onChange }) {
  return (
    <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
      {EFFORT_LEVELS.map(level => {
        const active = normalizeEffort(value) === level.id;
        return (
          <button
            key={level.id}
            onClick={() => onChange(level.id)}
            style={{
              border: `1px solid ${active ? P_COLORS.ink : P_COLORS.lineStrong}`,
              background: active ? P_COLORS[`${level.pill}Bg`] : P_COLORS.page,
              color: active ? P_COLORS[`${level.pill}Ink`] : P_COLORS.ink3,
              borderRadius: 999,
              padding: '6px 10px',
              fontFamily: P_FONT,
              fontSize: 12,
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            {level.label}
          </button>
        );
      })}
    </div>
  );
}

Object.assign(window, { MindDropScreen });
