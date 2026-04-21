// Focus flow — matches iPhone-7, iPhone-8, iPhone-16, iPhone-17

function FocusIntroScreen({ onStart, onCustom, onBack }) {
  return (
    <PScreen>
      <div style={{ padding: '44px 20px 10px' }}>
        <div onClick={onBack} style={{ cursor: 'pointer' }}><PIcon name="chevron-left" size={22} /></div>
      </div>
      <PHeader title={<>Ready for a calm<br/>stretch?</>} sub="Let's find your flow at your own pace." />
      <PSection>
        <PCard style={{ marginBottom: 14 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 999, border: `1.5px solid ${P_COLORS.ink4}`,
            display: 'grid', placeItems: 'center', marginBottom: 14,
          }}>
            <PIcon name="chevron-right" size={16} stroke={P_COLORS.ink4} />
          </div>
          <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Quick Start</div>
          <div style={{ fontSize: 13, color: P_COLORS.ink2, lineHeight: 1.45, marginBottom: 14 }}>
            Continue your suggested task:<br/>
            "Open the course page and read the assignment instructions"
          </div>
          <PButton variant="soft" onClick={onStart} style={{ padding: '10px 18px' }}>Start Now</PButton>
        </PCard>
        <PCard>
          <div style={{
            width: 32, height: 32, borderRadius: 999, border: `1.5px solid ${P_COLORS.ink4}`,
            display: 'grid', placeItems: 'center', marginBottom: 14,
          }}>
            <PIcon name="chevron-right" size={16} stroke={P_COLORS.ink4} />
          </div>
          <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Custom Setup</div>
          <div style={{ fontSize: 13, color: P_COLORS.ink2, lineHeight: 1.45, marginBottom: 14 }}>
            Tailor your timer and sensory preferences.
          </div>
          <PButton variant="soft" onClick={onCustom} style={{ padding: '10px 18px' }}>Configure</PButton>
        </PCard>
      </PSection>
    </PScreen>
  );
}

function FocusSetupScreen({ onStart, onBack }) {
  const [env, setEnv] = React.useState('Study');
  const [companion, setCompanion] = React.useState('Active');
  return (
    <PScreen>
      <div style={{ padding: '44px 20px 10px' }}>
        <div onClick={onBack} style={{ cursor: 'pointer' }}><PIcon name="chevron-left" size={22} /></div>
      </div>
      <PHeader title={<>Design your quiet<br/>space</>} sub="Configure your session to match your current energy level. No pressure, just presence." />
      <PSection>
        <div style={{ fontSize: 14, color: P_COLORS.ink3, marginBottom: 8 }}>Intent</div>
        <div style={{
          background: P_COLORS.surface1, borderRadius: 14, padding: '14px 16px',
          fontSize: 14, color: P_COLORS.ink4, marginBottom: 20,
        }}>What's on your mind today?</div>

        <div style={{ fontSize: 14, color: P_COLORS.ink3, marginBottom: 8 }}>Environment</div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
          {['Study', 'Work', 'Creative'].map(e => (
            <PChip key={e} active={env === e} onClick={() => setEnv(e)}>{e}</PChip>
          ))}
        </div>

        <div style={{ fontSize: 14, color: P_COLORS.ink3, marginBottom: 8 }}>Duration</div>
        <div style={{
          background: P_COLORS.surface1, borderRadius: 14, padding: '14px 0',
          display: 'flex', justifyContent: 'space-around', marginBottom: 20,
        }}>
          <div style={{ fontSize: 14, color: P_COLORS.ink3 }}>0 <b style={{ color: P_COLORS.ink }}>h</b></div>
          <div style={{ fontSize: 14, color: P_COLORS.ink }}>20 <b>min</b></div>
          <div style={{ fontSize: 14, color: P_COLORS.ink3 }}>0 <b style={{ color: P_COLORS.ink }}>s</b></div>
        </div>

        <div style={{ fontSize: 14, color: P_COLORS.ink3, marginBottom: 8 }}>Companion Mode</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
          {[
            { k: 'Active', d: 'Animal friends will interact with you more actively, and random events may occur during your time together.' },
            { k: 'Passive', d: 'Just a soft reminder that you are not alone in your focus.' },
          ].map(o => {
            const on = companion === o.k;
            return (
              <div key={o.k} onClick={() => setCompanion(o.k)} style={{
                borderRadius: 16, padding: 16, cursor: 'pointer',
                background: P_COLORS.surface1,
                border: `${on ? 1.5 : 1}px solid ${on ? P_COLORS.ink : 'transparent'}`,
                display: 'flex', gap: 12,
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>{o.k}</div>
                  <div style={{ fontSize: 12, color: P_COLORS.ink2, lineHeight: 1.45 }}>{o.d}</div>
                </div>
                <div style={{
                  width: 20, height: 20, borderRadius: 999,
                  border: `1.5px solid ${on ? P_COLORS.ink : P_COLORS.ink4}`,
                  display: 'grid', placeItems: 'center', flexShrink: 0,
                }}>{on && <div style={{ width: 10, height: 10, borderRadius: 999, background: P_COLORS.ink }} />}</div>
              </div>
            );
          })}
        </div>

        <PButton variant="soft" full onClick={onStart} style={{ fontWeight: 700 }}>Start now</PButton>
      </PSection>
    </PScreen>
  );
}

function FocusSessionScreen({ onStop }) {
  const [sec, setSec] = React.useState(25 * 60 + 13);
  React.useEffect(() => {
    const t = setInterval(() => setSec(s => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, []);
  const mm = String(Math.floor(sec / 60)).padStart(2, '0');
  const ss = String(sec % 60).padStart(2, '0');
  return (
    <PScreen noTab>
      <div style={{ padding: '44px 20px 10px' }}>
        <div onClick={onStop} style={{ cursor: 'pointer' }}>
          <div style={{ width: 32, height: 32, borderRadius: 999, background: P_COLORS.ink, display: 'grid', placeItems: 'center' }}>
            <PIcon name="x-circle" size={18} stroke="#fff" sw={2} />
          </div>
        </div>
      </div>
      <div style={{ textAlign: 'center', padding: '10px 20px' }}>
        <div style={{ fontSize: 14, color: P_COLORS.ink3 }}>Current Session</div>
        <div style={{ fontSize: 22, fontWeight: 700, marginTop: 4 }}>Read the instructions</div>
        <div style={{
          background: P_COLORS.surface1, borderRadius: 14, padding: '12px 16px',
          fontSize: 14, color: P_COLORS.ink2, marginTop: 16,
        }}>You are doing great today!</div>
      </div>
      <div style={{ textAlign: 'center', marginTop: 64 }}>
        <div style={{ fontSize: 54, fontWeight: 700, letterSpacing: '-0.02em' }}>{mm} : {ss}</div>
        <div style={{ fontSize: 16, color: P_COLORS.ink2, marginTop: 2 }}>Time Remaining</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, padding: '28px 20px 0' }}>
        <PButton variant="soft">Pause</PButton>
        <PButton variant="soft" onClick={onStop}>Stop</PButton>
      </div>
      <div style={{ padding: '28px 20px 0' }}>
        <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>Your Journey Today</div>
        {[
          { t: '10:00 AM', e: 'Session Started' },
          { t: '10:15 AM', e: 'Milestone: 15 mins reached' },
          { t: '10:20 AM', e: 'Mochi found a lucky clover' },
        ].map((j, i, arr) => (
          <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'stretch' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 16 }}>
              <div style={{ width: 10, height: 10, borderRadius: 999, background: P_COLORS.ink5, marginTop: 22 }} />
              {i < arr.length - 1 && <div style={{ flex: 1, width: 1, background: P_COLORS.line }} />}
            </div>
            <div style={{
              flex: 1, background: P_COLORS.surface1, borderRadius: 12,
              padding: '10px 14px', marginBottom: 8,
            }}>
              <div style={{ fontSize: 12, color: P_COLORS.ink3 }}>{j.t}</div>
              <div style={{ fontSize: 14, fontWeight: 700 }}>{j.e}</div>
            </div>
          </div>
        ))}
      </div>
    </PScreen>
  );
}

function FocusReflectionScreen({ onHome }) {
  return (
    <PScreen noTab>
      <div style={{ padding: '44px 20px 0', display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'center', position: 'relative' }}>
        <div style={{ fontSize: 15, fontWeight: 600 }}>Session Reflection</div>
        <div style={{ position: 'absolute', left: 20, top: 44, cursor: 'pointer' }} onClick={onHome}>
          <PIcon name="chevron-left" size={22} />
        </div>
      </div>
      <div style={{ textAlign: 'center', padding: '24px 20px 0' }}>
        <img src="../../assets/mochi-placeholder.svg" width="96" height="96" style={{ borderRadius: 18 }} alt="Mochi"/>
        <div style={{ fontSize: 28, fontWeight: 700, marginTop: 14, letterSpacing: '-0.01em' }}>Beautifully Focused!</div>
      </div>
      <div style={{ padding: '24px 20px 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <PCard style={{ padding: 18 }}>
          <div style={{ fontSize: 14, color: P_COLORS.ink2 }}>Total Focus</div>
          <div style={{ fontSize: 28, fontWeight: 700, marginTop: 14 }}>25m20s</div>
        </PCard>
        <PCard style={{ padding: 18 }}>
          <div style={{ fontSize: 14, color: P_COLORS.ink2 }}>Points Earned</div>
          <div style={{ fontSize: 28, fontWeight: 700, marginTop: 14 }}>+15<br/><span style={{ fontSize: 20 }}>Points</span></div>
        </PCard>
      </div>
      <div style={{ padding: '24px 20px 0' }}>
        <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>Memorable Moments</div>
        {[
          { t: 'Hit 30-minute milestone', d: 'Deep focus achieved' },
          { t: 'Mochi read a book', d: 'Had great time together' },
          { t: 'Stayed calm', d: 'Handled 2 distractions with Mochi' },
        ].map((m, i) => (
          <PCard key={i} style={{ padding: 12, marginBottom: 8, display: 'flex', gap: 12, alignItems: 'center' }}>
            <div style={{ width: 36, height: 36, borderRadius: 999, background: P_COLORS.surface3, flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: 14, fontWeight: 700 }}>{m.t}</div>
              <div style={{ fontSize: 12, color: P_COLORS.ink3 }}>{m.d}</div>
            </div>
          </PCard>
        ))}
      </div>
      <div style={{ padding: '20px 20px 0' }}>
        <PButton variant="soft" full onClick={onHome} style={{ fontWeight: 700 }}>Back to home</PButton>
      </div>
    </PScreen>
  );
}

Object.assign(window, { FocusIntroScreen, FocusSetupScreen, FocusSessionScreen, FocusReflectionScreen });
