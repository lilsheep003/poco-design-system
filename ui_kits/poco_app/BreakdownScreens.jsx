// Breakdown flow — matches Write + Friction + break1 + break2

function WriteScreen({ onBack, onContinue }) {
  return (
    <PScreen noTab>
      <div style={{ padding: '44px 20px 0' }}>
        <div onClick={onBack} style={{ cursor: 'pointer' }}><PIcon name="chevron-left" size={22} /></div>
      </div>
      <PHeader title={<>What feel hard to<br/>start today?</>} sub="Write it down and we'll help you break it into smaller steps." />
      <PSection>
        <div style={{
          background: P_COLORS.surface1, borderRadius: 16, padding: '18px 16px',
          minHeight: 120, fontSize: 15, color: P_COLORS.ink4,
        }}>e.g. Write my seminar report..</div>
        <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
          {['Tag1', 'Tag2', 'Tag3'].map(t => (
            <span key={t} style={{
              background: P_COLORS.surface3, padding: '6px 16px', borderRadius: 999,
              fontSize: 13, fontWeight: 500,
            }}>{t}</span>
          ))}
        </div>
        <div style={{ marginTop: 32 }}>
          <PButton variant="soft" full onClick={onContinue} style={{ fontWeight: 700 }}>Break Down</PButton>
        </div>
      </PSection>
    </PScreen>
  );
}

function FrictionScreen({ onBack, onContinue }) {
  const [picked, setPicked] = React.useState(null);
  const options = [
    'I do not know where to start',
    'It feels too big',
    'It feels overwhelming',
    'I cannot decide the first step',
    'I do not have the energy right now',
  ];
  return (
    <PScreen noTab>
      <div style={{ padding: '44px 20px 0' }}>
        <div onClick={onBack} style={{ cursor: 'pointer' }}><PIcon name="chevron-left" size={22} /></div>
      </div>
      <PHeader title={<>What feels hardest<br/>about this task right<br/>now?</>} sub="Choose the option that feels closest to your current experience." />
      <PSection>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {options.map(o => {
            const on = picked === o;
            return (
              <div key={o} onClick={() => setPicked(o)} style={{
                background: P_COLORS.surface1, borderRadius: 14,
                padding: '16px 18px', fontSize: 15, fontWeight: 500,
                cursor: 'pointer',
                border: `${on ? 1.5 : 1}px solid ${on ? P_COLORS.ink : 'transparent'}`,
              }}>{o}</div>
            );
          })}
        </div>
        <div style={{ marginTop: 32 }}>
          <PButton variant="soft" full onClick={onContinue} style={{ fontWeight: 700, opacity: picked ? 1 : 0.6 }}>Continue</PButton>
        </div>
      </PSection>
    </PScreen>
  );
}

function BreakdownScreen({ onBack, onSmaller, onStartFocus }) {
  return (
    <PScreen noTab>
      <div style={{ padding: '44px 20px 0' }}>
        <div onClick={onBack} style={{ cursor: 'pointer' }}><PIcon name="chevron-left" size={22} /></div>
      </div>
      <PHeader title={<>We made it a little<br/>smaller</>} sub="You do not need to do it all now. Just start with the first step." />
      <PSection>
        <div style={{ background: P_COLORS.surface1, borderRadius: 14, padding: 16, marginBottom: 20 }}>
          <div style={{ display: 'flex', padding: '8px 0', borderBottom: `1px solid ${P_COLORS.line}` }}>
            <div style={{ width: 80, fontSize: 13, fontWeight: 700 }}>Task</div>
            <div style={{ flex: 1, fontSize: 13 }}>Write seminar report</div>
          </div>
          <div style={{ display: 'flex', padding: '8px 0' }}>
            <div style={{ width: 80, fontSize: 13, fontWeight: 700 }}>Friction</div>
            <div style={{ flex: 1, fontSize: 13 }}>I do not have the energy right now</div>
          </div>
        </div>

        <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 8 }}>Start with this</div>
        <div style={{ background: P_COLORS.surface1, borderRadius: 16, padding: 16, marginBottom: 20 }}>
          <div style={{ fontSize: 13, color: P_COLORS.ink3, marginBottom: 6 }}>First step</div>
          <div style={{ fontSize: 15, fontWeight: 700, lineHeight: 1.35 }}>
            Open the course platform and find the assignment instructions
          </div>
        </div>

        <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 8 }}>Next steps</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
          {[
            'Copy the key requirements into a note or document',
            'List 3 possible sections for the report',
            'Find 2 relevant references',
            'Write one heading or opening sentence',
          ].map((s, i) => (
            <div key={i} style={{
              background: P_COLORS.surface1, borderRadius: 12,
              padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <div style={{
                width: 26, height: 26, borderRadius: 999, background: P_COLORS.surface3,
                display: 'grid', placeItems: 'center', fontSize: 12, fontWeight: 700,
                color: P_COLORS.ink3,
              }}>{i + 2}</div>
              <div style={{ fontSize: 13, color: P_COLORS.ink2 }}>{s}</div>
            </div>
          ))}
        </div>

        <PButton variant="soft" full onClick={onSmaller} style={{ fontWeight: 700, marginBottom: 10 }}>Make it smaller</PButton>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <PButton variant="light">Save to Today</PButton>
          <PButton variant="light" onClick={onStartFocus}>Start Focus</PButton>
        </div>
      </PSection>
    </PScreen>
  );
}

Object.assign(window, { WriteScreen, FrictionScreen, BreakdownScreen });
