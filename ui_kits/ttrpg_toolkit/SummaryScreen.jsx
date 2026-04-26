/* =============================================================
   SummaryScreen.jsx — v2.
   End-of-session: stats, debrief notes, Markdown/JSON export.
   No 'condition' field. Pack and scenario metadata included.
   ============================================================= */

function SummaryScreen({ onRestart }) {
  const { useStore } = window.RECS.Store;
  const { ATTRIBUTES, DIFFICULTY, OUTCOME_META } = window.RECS;
  const { Btn, SectionTitle } = window.RECS.UI;

  const { session, setPostNotes, finish, reset } = useStore();
  const pack = window.RECS.Packs.get(session.packId);
  const scenario = pack?.scenarios.find(s => s.id === session.scenarioId);

  React.useEffect(() => {
    if (!session.finishedAt) finish();
    // eslint-disable-next-line
  }, []);

  const md = React.useMemo(
    () => buildMarkdown(session, pack, scenario, ATTRIBUTES, DIFFICULTY, OUTCOME_META),
    [session, pack, scenario]
  );

  function copyMarkdown() {
    navigator.clipboard?.writeText(md).then(
      () => alert('Session Markdown copied to clipboard.'),
      () => alert('Copy failed. Select and copy manually from the panel below.')
    );
  }
  function downloadMarkdown() {
    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
    const url  = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `RECS_${session.participantCode || 'session'}_${(pack?.id || 'pack')}_${(scenario?.id || 'scenario')}.md`;
    a.click();
    URL.revokeObjectURL(url);
  }
  function downloadJSON() {
    const blob = new Blob([JSON.stringify(session, null, 2)], { type: 'application/json' });
    const url  = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `RECS_${session.participantCode || 'session'}_${(pack?.id || 'pack')}_${(scenario?.id || 'scenario')}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const outcomeCounts = countBy(session.rolls.map(r => r.outcome));

  return (
    <div className="stack-lg">
      <div>
        <SectionTitle>Session complete</SectionTitle>
        <h1 style={{ margin: '6px 0 0', fontSize: 26, fontWeight: 800, letterSpacing: '-0.01em' }}>
          {scenario?.title || 'Session'} — {session.participantCode || 'No code'}
        </h1>
        <div style={{ color: 'var(--poco-ink-3)', fontSize: 13, marginTop: 4 }}>
          {pack && <>Pack: {pack.name} · </>}
          Started {new Date(session.startedAt).toLocaleString()}
          {session.finishedAt && ` · Finished ${new Date(session.finishedAt).toLocaleString()}`}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12 }}>
        <Stat label="Rolls" value={session.rolls.length} />
        <Stat label="Calm moments" value={(outcomeCounts.ok || 0) + (outcomeCounts.crit || 0)} tone="ok" />
        <Stat label="Mild"         value={outcomeCounts.mix || 0} tone="mix" />
        <Stat label="Significant+" value={(outcomeCounts.fail || 0) + (outcomeCounts['crit-fail'] || 0)} tone="fail" />
        <Stat label="Perturbations" value={session.complications.length} />
        <Stat label="Quotes captured" value={session.participantQuotes.length} />
      </div>

      <div>
        <SectionTitle>Post-session debrief</SectionTitle>
        <textarea
          placeholder="What surfaced that a traditional usability test would have missed? Emotional threads? Perturbations that exposed assumptions? Surprises? Things to iterate for next participant?"
          value={session.postNotes || ''}
          onChange={e => setPostNotes(e.target.value)}
          rows={6}
          style={{
            width: '100%',
            fontFamily: 'inherit', fontSize: 14, lineHeight: 1.55,
            padding: '12px 14px',
            background: 'var(--poco-page)',
            border: '1.5px solid var(--poco-line-strong)',
            borderRadius: 12,
            color: 'var(--poco-ink)',
            outline: 'none', resize: 'vertical',
            marginTop: 8,
          }}
        />
      </div>

      <div>
        <div className="row-between" style={{ marginBottom: 8 }}>
          <SectionTitle>Export — Markdown record</SectionTitle>
          <div style={{ display: 'flex', gap: 6 }}>
            <Btn variant="light" size="sm" onClick={copyMarkdown}>Copy</Btn>
            <Btn variant="light" size="sm" onClick={downloadMarkdown}>Download .md</Btn>
            <Btn variant="light" size="sm" onClick={downloadJSON}>Download .json</Btn>
          </div>
        </div>
        <pre className="export-block">{md}</pre>
      </div>

      <div className="row-between" style={{ paddingTop: 10, borderTop: '1px solid var(--poco-line)' }}>
        <div style={{ fontSize: 13, color: 'var(--poco-ink-3)' }}>
          Starting a new session will clear the current one from local storage. Export first if you haven\'t.
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Btn variant="light" onClick={() => {
            if (confirm('Clear current session and start fresh? Make sure you have exported.')) {
              reset();
              onRestart();
            }
          }}>New session</Btn>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, tone }) {
  const bg = tone === 'ok' ? 'var(--recs-ok-bg)'
           : tone === 'mix' ? 'var(--recs-mix-bg)'
           : tone === 'fail' ? 'var(--recs-fail-bg)'
           : 'var(--poco-surface-1)';
  const ink = tone === 'ok' ? 'var(--recs-ok)'
            : tone === 'mix' ? 'var(--recs-mix)'
            : tone === 'fail' ? 'var(--recs-fail)'
            : 'var(--poco-ink)';
  return (
    <div style={{ background: bg, color: ink, borderRadius: 12, padding: '14px 16px' }}>
      <div style={{ fontSize: 11, fontWeight: 700,
                    textTransform: 'uppercase', letterSpacing: '0.12em',
                    opacity: 0.75 }}>{label}</div>
      <div style={{ fontSize: 26, fontWeight: 800, marginTop: 2 }}>{value}</div>
    </div>
  );
}

function countBy(arr) {
  const out = {};
  arr.forEach(k => { out[k] = (out[k] || 0) + 1; });
  return out;
}

function buildMarkdown(s, pack, sc, ATTRS, DIFF, OM) {
  const lines = [];
  lines.push(`# RECS Session — ${s.participantCode || 'unknown'}`);
  lines.push(``);
  lines.push(`- **Pack**: ${pack ? `${pack.name} (${pack.id})` : '(none)'}`);
  lines.push(`- **Product under study**: ${pack?.productName || '—'}`);
  lines.push(`- **Scenario**: ${sc ? `${sc.title} (${sc.id})` : '(none)'}`);
  lines.push(`- **Started**: ${s.startedAt}`);
  if (s.finishedAt) lines.push(`- **Finished**: ${s.finishedAt}`);
  lines.push(``);

  lines.push(`## Character sheet`);
  const c = s.character;
  lines.push(`- **Name**: ${c.name || '—'}`);
  lines.push(`- **Role / Age**: ${c.role || '—'} / ${c.age || '—'}`);
  lines.push(`- **Portrait**: ${c.portrait}`);
  lines.push(`- **UXP remaining**: ${c.uxp}`);
  lines.push(`- **Stress**: ${c.stress} / 6`);
  lines.push(`- **Devices**: ${c.devices.join(', ') || '—'}`);
  lines.push(`- **Apps**: ${c.apps.join(', ') || '—'}`);
  lines.push(`- **Traits**: ${c.traits.join(', ') || '—'}`);
  lines.push(`- **Back story**: ${c.background || '—'}`);
  lines.push(``);
  lines.push(`### Attributes`);
  ATTRS.forEach(a => {
    const v = c.attributes[a.key];
    const m = v - 3;
    lines.push(`- **${a.name}** (${a.key}): ${v} / 5  (mod ${m >= 0 ? '+' : ''}${m})`);
  });
  lines.push(``);

  lines.push(`## Scenario beats`);
  if (sc) {
    sc.beats.forEach((b, i) => {
      lines.push(`### Beat ${i + 1}: ${b.title}  ${b.kind === 'challenge' ? '⚔' : '—'}`);
      if (b.kind === 'narration') {
        lines.push(`> ${b.text}`);
      } else {
        lines.push(`> **Setup**: ${b.setup}`);
        if (b.taskPrompt) lines.push(`> **Task on real product**: ${b.taskPrompt}`);
        lines.push(`- Attribute: ${ATTRS.find(a => a.key === b.attribute)?.name} · DC ${DIFF[b.difficulty].dc} (${b.difficulty})`);
      }
      const rolls = s.rolls.filter(r => r.beatIdx === i);
      rolls.forEach(r => {
        lines.push(`- **Roll**: d20=${r.d20}, mod ${r.mod >= 0 ? '+' + r.mod : r.mod}, total ${r.total}  →  **${OM[r.outcome].verdict}**`);
      });
      const comps = s.complications.filter(c => c.beatIdx === i);
      comps.forEach(c => {
        lines.push(`- **Perturbation** (${c.category}, severity ${c.severity}): ${c.line}`);
      });
      lines.push(``);
    });
  }

  if (s.gmNotes && s.gmNotes.trim()) {
    lines.push(`## GM live notes`);
    lines.push(s.gmNotes.trim());
    lines.push(``);
  }

  if (s.participantQuotes.length) {
    lines.push(`## Participant quotes`);
    s.participantQuotes.forEach(q => {
      lines.push(`- *"${q.text}"*  — beat ${q.beat + 1}`);
    });
    lines.push(``);
  }

  if (s.postNotes && s.postNotes.trim()) {
    lines.push(`## Post-session debrief`);
    lines.push(s.postNotes.trim());
    lines.push(``);
  }

  lines.push(`---`);
  lines.push(`_Exported by RECS Toolkit. Method based on Sturdee, Heron, Gamboa (2023), "TTRPG UX: Requirements & Beyond", CHI EA '23._`);

  return lines.join('\n');
}

window.RECS.SummaryScreen = SummaryScreen;
