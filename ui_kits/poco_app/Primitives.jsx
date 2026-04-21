// Poco UI — shared primitives. Plus Jakarta Sans. Matches LoFi wireframes.

const P_COLORS = {
  page: '#FFFFFF',
  surface1: '#F2F2F2',
  surface3: '#D9D9D9',
  surface4: '#8A8A8A',
  ink: '#0E0E10',
  ink2: '#3A3A3D',
  ink3: '#6B6B6B',
  ink4: '#9A9A9A',
  ink5: '#B8B8B8',
  line: '#E5E5E5',
  lineStrong: '#C9C9C9',
  priorityBg: '#F7C4C4', priorityInk: '#8C2A2A',
  easyBg: '#BCE5B9', easyInk: '#2C5A29',
  progress: '#6FA8DC',
  warmCream: '#FCEBD8',
};

const P_FONT = '"PingFang SC", "PingFang TC", -apple-system, BlinkMacSystemFont, "Helvetica Neue", "Hiragino Sans GB", "Microsoft YaHei", "Noto Sans SC", system-ui, sans-serif';

function PIcon({ name, size = 22, stroke = '#0E0E10', sw = 1.8, style = {} }) {
  // very small icon set rendered inline to avoid cdn dep inside iframe
  const common = {
    width: size, height: size, viewBox: '0 0 24 24', fill: 'none',
    stroke, strokeWidth: sw, strokeLinecap: 'round', strokeLinejoin: 'round',
    style,
  };
  switch (name) {
    case 'bell': return <svg {...common}><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>;
    case 'user': return <svg {...common}><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-7 8-7s8 3 8 7"/></svg>;
    case 'calendar': return <svg {...common}><rect x="3" y="4" width="18" height="17" rx="2"/><path d="M3 9h18M8 2v4M16 2v4"/></svg>;
    case 'settings': return <svg {...common}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>;
    case 'search': return <svg {...common}><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>;
    case 'filter': return <svg {...common}><polygon points="22 3 2 3 10 12.5 10 19 14 21 14 12.5 22 3"/></svg>;
    case 'chevron-left': return <svg {...common}><polyline points="15 18 9 12 15 6"/></svg>;
    case 'chevron-right': return <svg {...common}><polyline points="9 18 15 12 9 6"/></svg>;
    case 'arrow-right-circle': return <svg {...common}><circle cx="12" cy="12" r="10"/><polyline points="12 16 16 12 12 8"/><line x1="8" y1="12" x2="16" y2="12"/></svg>;
    case 'x-circle': return <svg {...common}><circle cx="12" cy="12" r="10"/><path d="M15 9l-6 6M9 9l6 6"/></svg>;
    case 'x': return <svg {...common}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
    case 'battery-low': return <svg {...common}><rect x="2" y="8" width="16" height="8" rx="1.5"/><line x1="22" y1="11" x2="22" y2="13"/><rect x="4" y="10" width="3" height="4" fill={stroke} stroke="none"/></svg>;
    case 'battery-medium': return <svg {...common}><rect x="2" y="8" width="16" height="8" rx="1.5"/><line x1="22" y1="11" x2="22" y2="13"/><rect x="4" y="10" width="7" height="4" fill={stroke} stroke="none"/></svg>;
    case 'battery-full': return <svg {...common}><rect x="2" y="8" width="16" height="8" rx="1.5"/><line x1="22" y1="11" x2="22" y2="13"/><rect x="4" y="10" width="12" height="4" fill={stroke} stroke="none"/></svg>;
    case 'smile': return <svg {...common}><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>;
    case 'sprout': return <svg {...common}><path d="M7 20h10"/><path d="M12 20V10"/><path d="M12 10C8 10 6 8 6 5c3 0 6 1.5 6 5Z"/><path d="M12 10c4 0 6-2 6-5-3 0-6 1.5-6 5Z"/></svg>;
    case 'check-circle': return <svg {...common}><circle cx="12" cy="12" r="10" fill={stroke} stroke="none"/><polyline points="8 12 11 15 16 9" stroke="#fff"/></svg>;
    case 'circle': return <svg {...common}><circle cx="12" cy="12" r="9"/></svg>;
    case 'trash': return <svg {...common}><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/></svg>;
    case 'home': return <svg {...common}><path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/></svg>;
    case 'list': return <svg {...common}><rect x="4" y="4" width="16" height="16" rx="2"/><line x1="8" y1="9" x2="16" y2="9"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="12" y2="17"/></svg>;
    case 'target': return <svg {...common}><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5" fill={stroke} stroke="none"/></svg>;
    default: return null;
  }
}

function PButton({ children, variant = 'primary', onClick, style = {}, full = false, disabled = false }) {
  const variants = {
    primary:   { background: P_COLORS.ink,      color: '#fff' },
    secondary: { background: P_COLORS.surface4, color: '#fff' },
    soft:      { background: P_COLORS.surface3, color: P_COLORS.ink },
    light:     { background: P_COLORS.page,     color: P_COLORS.ink, boxShadow: `inset 0 0 0 1px ${P_COLORS.line}` },
    ghost:     { background: 'transparent',     color: P_COLORS.ink },
  };
  return (
    <button onClick={disabled ? undefined : onClick} style={{
      border: 0, fontFamily: P_FONT, fontSize: 15, fontWeight: 600,
      padding: '14px 20px', borderRadius: 999, cursor: disabled ? 'default' : 'pointer',
      width: full ? '100%' : undefined,
      opacity: disabled ? 0.35 : 1,
      transition: 'transform 120ms, filter 120ms, opacity 150ms',
      ...variants[variant], ...style,
    }}
    onMouseDown={e => !disabled && (e.currentTarget.style.transform = 'scale(0.97)')}
    onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
    >{children}</button>
  );
}

function PCard({ children, style = {}, onClick, flat = false }) {
  return (
    <div onClick={onClick} style={{
      background: flat ? P_COLORS.page : P_COLORS.surface1,
      border: flat ? `1px solid ${P_COLORS.line}` : 'none',
      borderRadius: flat ? 16 : 20,
      padding: 18,
      cursor: onClick ? 'pointer' : 'default',
      ...style,
    }}>{children}</div>
  );
}

function PChip({ children, active = false, onClick, style = {} }) {
  return (
    <span onClick={onClick} style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '8px 14px', borderRadius: 999,
      background: active ? P_COLORS.ink : P_COLORS.page,
      color: active ? '#fff' : P_COLORS.ink,
      border: `1px solid ${active ? P_COLORS.ink : P_COLORS.lineStrong}`,
      fontSize: 14, fontWeight: 500,
      cursor: onClick ? 'pointer' : 'default',
      ...style,
    }}>{children}</span>
  );
}

function PPill({ kind = 'neutral', children }) {
  const kinds = {
    priority: { background: P_COLORS.priorityBg, color: P_COLORS.priorityInk },
    easy:     { background: P_COLORS.easyBg,     color: P_COLORS.easyInk },
    neutral:  { background: P_COLORS.surface3,   color: P_COLORS.ink },
  };
  return (
    <span style={{
      display: 'inline-flex', padding: '4px 11px', borderRadius: 999,
      fontSize: 12, fontWeight: 600, ...kinds[kind],
    }}>{children}</span>
  );
}

function PHeader({ title, sub, right }) {
  return (
    <div style={{ padding: '10px 20px 14px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.12, color: P_COLORS.ink }}>
            {title}
          </div>
          {sub && <div style={{ marginTop: 4, fontSize: 14, color: P_COLORS.ink2, lineHeight: 1.45 }}>{sub}</div>}
        </div>
        {right && <div style={{ display: 'flex', gap: 16, paddingTop: 6 }}>{right}</div>}
      </div>
    </div>
  );
}

function PTabBar({ active, onChange }) {
  const tabs = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'task', label: 'Task', icon: 'list' },
    { id: 'focus', label: 'Focus', icon: 'target' },
    { id: 'mood', label: 'Mood', icon: 'smile' },
    { id: 'me', label: 'Me', icon: 'user' },
  ];
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 20,
      padding: '8px 10px 30px',
      background: 'rgba(255,255,255,0.92)',
      backdropFilter: 'blur(12px)',
      borderTop: `1px solid ${P_COLORS.line}`,
      display: 'flex',
    }}>
      {tabs.map(t => {
        const on = t.id === active;
        return (
          <div key={t.id} onClick={() => onChange?.(t.id)} style={{
            flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
            fontSize: 11, fontWeight: 500, cursor: 'pointer',
            color: on ? P_COLORS.ink : P_COLORS.ink4,
            padding: '4px 0',
          }}>
            <PIcon name={t.icon} size={22} stroke={on ? P_COLORS.ink : P_COLORS.ink4} />
            {t.label}
          </div>
        );
      })}
    </div>
  );
}

function PScreen({ children, noTab = false }) {
  return (
    <div style={{
      position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
      overflowY: 'auto', WebkitOverflowScrolling: 'touch',
      paddingTop: 44,
      paddingBottom: noTab ? 34 : 120,
      fontFamily: P_FONT, color: P_COLORS.ink, background: P_COLORS.page,
    }}>{children}</div>
  );
}

function PSection({ title, right, children, pad = 20 }) {
  return (
    <div style={{ padding: `10px ${pad}px 0` }}>
      {title && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <div style={{ fontSize: 17, fontWeight: 700 }}>{title}</div>
          {right}
        </div>
      )}
      {children}
    </div>
  );
}

Object.assign(window, { P_COLORS, P_FONT, PIcon, PButton, PCard, PChip, PPill, PHeader, PTabBar, PScreen, PSection });
