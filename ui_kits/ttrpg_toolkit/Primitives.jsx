/* =============================================================
   Primitives.jsx — Shared UI components for the RECS Toolkit.
   Kept small and composable. Leans on .btn, .card, .pill classes
   already defined in colors_and_type.css.
   ============================================================= */

function Btn({ children, onClick, variant = 'primary', disabled, full, size = 'md', style, type = 'button' }) {
  const pad = size === 'sm' ? '8px 14px'
             : size === 'lg' ? '16px 26px'
             : '12px 18px';
  const fs = size === 'sm' ? 13 : size === 'lg' ? 16 : 15;
  return (
    <button type={type} onClick={onClick} disabled={disabled}
      className={`btn btn--${variant}`}
      style={{
        padding: pad, fontSize: fs,
        width: full ? '100%' : 'auto',
        opacity: disabled ? 0.4 : 1,
        ...style
      }}>
      {children}
    </button>
  );
}

function Card({ children, flat, style }) {
  return (
    <div className={flat ? 'card--flat' : 'card'} style={{ ...style }}>
      {children}
    </div>
  );
}

function Pill({ children, kind = 'neutral' }) {
  return <span className={`pill pill--${kind}`}>{children}</span>;
}

function Modal({ open, onClose, title, sub, children, wide }) {
  if (!open) return null;
  return (
    <div className="modal-scrim" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}
           style={{ maxWidth: wide ? 720 : 520 }}>
        {title && <h2>{title}</h2>}
        {sub && <div className="modal-sub">{sub}</div>}
        {children}
      </div>
    </div>
  );
}

function SectionTitle({ children }) {
  return <div className="recs-section-title">{children}</div>;
}

function Field({ label, children, hint }) {
  return (
    <label style={{ display: 'block', marginBottom: 12 }}>
      <span style={{
        display: 'block',
        fontSize: 11, fontWeight: 700,
        textTransform: 'uppercase', letterSpacing: '0.12em',
        color: 'var(--poco-ink-3)', marginBottom: 6
      }}>{label}</span>
      {children}
      {hint && <div style={{ fontSize: 12, color: 'var(--poco-ink-4)', marginTop: 4 }}>{hint}</div>}
    </label>
  );
}

function TextInput({ value, onChange, placeholder, multiline, rows = 3, style }) {
  const shared = {
    width: '100%',
    font: 'inherit',
    fontSize: 14,
    color: 'var(--poco-ink)',
    background: 'var(--poco-page)',
    border: '1.5px solid var(--poco-line-strong)',
    borderRadius: 10,
    padding: '10px 12px',
    outline: 'none',
    transition: 'border-color 120ms var(--poco-ease)',
    resize: multiline ? 'vertical' : 'none',
    ...style,
  };
  if (multiline) {
    return <textarea value={value || ''} onChange={e => onChange(e.target.value)}
             placeholder={placeholder} rows={rows}
             onFocus={e => e.target.style.borderColor = 'var(--poco-ink)'}
             onBlur={e => e.target.style.borderColor = 'var(--poco-line-strong)'}
             style={shared} />;
  }
  return <input value={value || ''} onChange={e => onChange(e.target.value)}
           placeholder={placeholder}
           onFocus={e => e.target.style.borderColor = 'var(--poco-ink)'}
           onBlur={e => e.target.style.borderColor = 'var(--poco-line-strong)'}
           style={shared} />;
}

function Nav({ current, onChange, items, disabledKeys = [] }) {
  return (
    <div className="recs-nav">
      {items.map(it => (
        <button key={it.key}
          className={current === it.key ? 'on' : ''}
          disabled={disabledKeys.includes(it.key)}
          onClick={() => onChange(it.key)}>
          {it.label}
        </button>
      ))}
    </div>
  );
}

function Timer({ startedAt }) {
  const [now, setNow] = React.useState(Date.now());
  React.useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  if (!startedAt) return null;
  const elapsed = Math.max(0, now - new Date(startedAt).getTime());
  const s = Math.floor(elapsed / 1000);
  const mm = String(Math.floor(s / 60)).padStart(2, '0');
  const ss = String(s % 60).padStart(2, '0');
  return (
    <span className="timer-pill">
      <span className="dot" />
      <span>{mm}:{ss}</span>
    </span>
  );
}

function Stars({ value, max = 5 }) {
  const filled = '★'.repeat(value);
  const empty  = '☆'.repeat(max - value);
  return <span style={{ letterSpacing: '0.1em' }}>{filled}{empty}</span>;
}

window.RECS.UI = { Btn, Card, Pill, Modal, SectionTitle, Field, TextInput, Nav, Timer, Stars };
