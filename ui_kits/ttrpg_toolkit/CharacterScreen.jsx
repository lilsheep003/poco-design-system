/* =============================================================
   CharacterScreen.jsx — Persona Character Sheet.
   Interactive, fillable. Mirrors Sturdee et al. (2023) Fig. 3
   structurally: Face+Name+Role, UXP, Attributes, Proficiencies,
   Traits, Backstory. Participant fills it at Session Zero.
   ============================================================= */

const PORTRAIT_CHOICES = ['🙂','😌','😐','🫠','😊','🧑','👩','👨','🧓','👧','🧑‍🎓','🧑‍💻','👩‍🎨','🧑‍🍳','🧑‍🔬'];

const TRAIT_CHOICES = [
  'Gets distracted easily', 'Perfectionist', 'Easily overwhelmed',
  'Impatient with loading', 'Reads every tooltip', 'Skips onboarding',
  'Hates modal popups', 'Loves dark mode', 'Notifications muted',
  'Uses voice input', 'Power user', 'Prefers minimal UI',
];

const DEVICE_CHOICES = ['iPhone','Android phone','iPad','MacBook','Windows PC','Smart watch','Kindle'];

const APP_FAMILIARITY = [
  'Notion','Todoist','Apple Notes','WeChat','Xiaohongshu',
  'Headspace','Calm','Forest','Instagram','TikTok','Figma','VS Code',
];

function CharacterScreen({ onDone }) {
  const { useStore, modOf } = window.RECS.Store;
  const { ATTRIBUTES, POINT_BUDGET } = window.RECS;
  const { Btn, Card, Field, TextInput, SectionTitle } = window.RECS.UI;

  const { session, updateCharacter, setAttribute, toggleTrait } = useStore();
  const c = session.character;

  const spent = React.useMemo(
    () => ATTRIBUTES.reduce((sum, a) => sum + (c.attributes[a.key] || 0), 0),
    [c.attributes]
  );
  const remaining = POINT_BUDGET - spent;

  function bump(key, delta) {
    const cur = c.attributes[key] || 3;
    const next = cur + delta;
    if (next < 1 || next > 5) return;
    if (delta > 0 && remaining <= 0) return;
    setAttribute(key, next);
  }

  function toggleItem(field, item) {
    const cur = c[field] || [];
    const has = cur.includes(item);
    updateCharacter({ [field]: has ? cur.filter(x => x !== item) : [...cur, item] });
  }

  const readyEnough = c.name.trim().length > 0 && spent === POINT_BUDGET;

  return (
    <div className="stack-lg">
      <div className="row-between" style={{ marginBottom: 6 }}>
        <div>
          <SectionTitle>Session Zero — Persona Character Sheet</SectionTitle>
          <p style={{ margin: '4px 0 0', color: 'var(--poco-ink-2)', maxWidth: 640 }}>
            Build the character you will play during the session. You are not playing yourself.
            You are playing a plausible user — exaggerated in one direction or two — for the duration of this study.
          </p>
        </div>
        <div className="points-left" style={{
          fontSize: 13, padding: '8px 14px',
          background: remaining === 0 ? 'var(--recs-ok-bg)' : remaining < 0 ? 'var(--recs-fail-bg)' : 'var(--poco-surface-1)',
          color: remaining === 0 ? 'var(--recs-ok)' : remaining < 0 ? 'var(--recs-fail)' : 'var(--poco-ink-2)',
          border: 'none',
        }}>
          {remaining === 0 ? '✓ All points allocated' :
           remaining > 0 ? `${remaining} attribute points left` :
                           `${-remaining} points over budget`}
        </div>
      </div>

      {/* The sheet itself — parchment-ish */}
      <div className="sheet">

        {/* Top strip: portrait / name-role / UXP */}
        <div className="sheet-grid">
          <div>
            <div className="portrait" style={{ fontSize: 52 }}>{c.portrait}</div>
            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginTop: 8 }}>
              {PORTRAIT_CHOICES.map(p => (
                <button key={p}
                  onClick={() => updateCharacter({ portrait: p })}
                  style={{
                    width: 28, height: 28, border: 0,
                    borderRadius: 6, cursor: 'pointer',
                    background: c.portrait === p ? 'var(--recs-ink-rune)' : 'transparent',
                    fontSize: 16, padding: 0,
                  }}>{p}</button>
              ))}
            </div>
          </div>

          <div>
            <label className="field-label">Persona Name</label>
            <input className="sheet-input persona-name"
                   placeholder="e.g. Alex, 28"
                   value={c.name}
                   onChange={e => updateCharacter({ name: e.target.value })} />

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 12, marginTop: 14 }}>
              <div>
                <label className="field-label">Role / Occupation</label>
                <input className="sheet-input"
                       placeholder="e.g. Design student, new parent"
                       value={c.role}
                       onChange={e => updateCharacter({ role: e.target.value })} />
              </div>
              <div>
                <label className="field-label">Age</label>
                <input className="sheet-input"
                       placeholder="e.g. 27"
                       value={c.age}
                       onChange={e => updateCharacter({ age: e.target.value })} />
              </div>
            </div>
          </div>

          <div className="uxp-block">
            <div className="row">
              <div className="big">{c.uxp}</div>
              <div className="sub">UXP</div>
            </div>
            <div style={{ fontSize: 11, color: '#7A6B48', lineHeight: 1.4, marginTop: 4 }}>
              User Experience Points.
              Spend 1 to re-roll.
              Spend 2 to cancel a complication.
            </div>
            <div style={{ marginTop: 10, paddingTop: 10, borderTop: '1px dashed var(--recs-rule)' }}>
              <div className="row">
                <div style={{ fontSize: 18, fontWeight: 800 }}>{c.stress} / 6</div>
                <div className="sub">Stress</div>
              </div>
              <div style={{ fontSize: 11, color: '#7A6B48', lineHeight: 1.4, marginTop: 2 }}>
                Rises with complications. At 6, character trauma-exits.
              </div>
            </div>
          </div>
        </div>

        {/* Attributes */}
        <label className="field-label" style={{ marginBottom: 6 }}>
          Attributes — allocate {POINT_BUDGET} points, 1 min / 5 max per attribute
        </label>
        <div className="attr-grid">
          {ATTRIBUTES.map(a => {
            const v = c.attributes[a.key] || 3;
            const m = modOf(v);
            return (
              <div className="attr" key={a.key} title={a.gloss + '\n\ne.g. ' + a.example}>
                <div className="name">{a.name}</div>
                <div className="value">{v}</div>
                <div className="mod">{m >= 0 ? `+${m}` : m}</div>
                <div className="stepper">
                  <button onClick={() => bump(a.key, -1)} disabled={v <= 1}>−</button>
                  <button onClick={() => bump(a.key, 1)}  disabled={v >= 5 || remaining <= 0}>+</button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Two-column: Proficiencies + Traits */}
        <div className="two-col">
          <div className="panel">
            <h4>Devices used regularly</h4>
            <div className="tag-row">
              {DEVICE_CHOICES.map(d => (
                <span key={d}
                  className={`tag ${c.devices.includes(d) ? 'on' : ''}`}
                  onClick={() => toggleItem('devices', d)}>{d}</span>
              ))}
            </div>

            <h4 style={{ marginTop: 14 }}>Apps this persona knows well</h4>
            <div className="tag-row">
              {APP_FAMILIARITY.map(a => (
                <span key={a}
                  className={`tag ${c.apps.includes(a) ? 'on' : ''}`}
                  onClick={() => toggleItem('apps', a)}>{a}</span>
              ))}
            </div>
          </div>

          <div className="panel">
            <h4>Traits</h4>
            <div className="tag-row">
              {TRAIT_CHOICES.map(t => (
                <span key={t}
                  className={`tag ${c.traits.includes(t) ? 'on' : ''}`}
                  onClick={() => toggleTrait(t)}>{t}</span>
              ))}
            </div>

            <h4 style={{ marginTop: 14 }}>Back story — one sentence</h4>
            <textarea className="sheet-input"
                      style={{ minHeight: 66, resize: 'vertical' }}
                      placeholder="e.g. Was told to try this app by a friend. Has started and quit three productivity apps in the past year."
                      value={c.background}
                      onChange={e => updateCharacter({ background: e.target.value })} />
          </div>
        </div>
      </div>

      <div className="row-between">
        <div style={{ fontSize: 13, color: 'var(--poco-ink-3)', maxWidth: 560 }}>
          When the sheet is ready, the researcher (GM) takes over and runs the scenario.
          The participant can refer back to this sheet at any time during the session.
        </div>
        <Btn variant="primary" disabled={!readyEnough} onClick={onDone}>
          {readyEnough ? 'Sheet ready →' : (c.name.trim() ? 'Allocate all points' : 'Name the persona')}
        </Btn>
      </div>
    </div>
  );
}

window.RECS.CharacterScreen = CharacterScreen;
