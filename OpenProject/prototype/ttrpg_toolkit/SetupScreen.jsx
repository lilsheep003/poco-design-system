/* =============================================================
   SetupScreen.jsx — v2.
   Minimal: participant code only. Explains what the tool does,
   what the participant will do, and reminds the researcher to have
   the real product open on a second device.
   ============================================================= */

function SetupScreen({ onReady }) {
  const { useStore } = window.RECS.Store;
  const { Btn, Field, TextInput, SectionTitle } = window.RECS.UI;

  const { session, setParticipantCode, reset } = useStore();

  const canStart = session.participantCode.trim().length > 0;

  return (
    <div className="stack-lg">
      <div>
        <SectionTitle>New session · Setup</SectionTitle>
        <h1 style={{ margin: '4px 0 0', fontSize: 26, fontWeight: 800, letterSpacing: '-0.01em' }}>
          Begin a TTRPG-style UX research session.
        </h1>
        <p style={{ color: 'var(--poco-ink-2)', marginTop: 6, maxWidth: 640 }}>
          The participant will operate the real product on their own device throughout.
          This toolkit is your instrument: it provides narrative framing, perturbation injection,
          and data capture. One session per browser. Export at the end.
        </p>
      </div>

      <div style={{ maxWidth: 460 }}>
        <Field label="Participant code"
               hint="Anonymised — e.g. P01, P02. Keep the code↔identity mapping in a separate file.">
          <TextInput value={session.participantCode}
                     onChange={setParticipantCode}
                     placeholder="P01" />
        </Field>
      </div>

      <div style={{
        background: 'var(--poco-surface-1)',
        borderRadius: 14, padding: 18,
        borderLeft: '3px solid var(--poco-ink)',
        maxWidth: 820,
      }}>
        <SectionTitle>Before you continue</SectionTitle>
        <ul style={{ margin: '8px 0 0', paddingLeft: 22, lineHeight: 1.7, color: 'var(--poco-ink-2)' }}>
          <li>Get informed consent and start recording (per your ethics protocol).</li>
          <li>Have the real product open and ready on a second device (phone / tablet) next to you.</li>
          <li>Explain to the participant that they will adopt a persona — not play themselves.</li>
          <li>Briefly explain the dice: they do not judge task success; they decide what the
              environment throws at the character.</li>
        </ul>
      </div>

      <div className="row-between" style={{ paddingTop: 10 }}>
        <button
          onClick={() => {
            if (confirm('Clear any prior session data and start fresh? (Make sure you have exported first if needed.)')) {
              reset();
            }
          }}
          style={{
            background: 'none', border: 0, color: 'var(--poco-ink-4)',
            fontSize: 12, cursor: 'pointer', textDecoration: 'underline',
            fontFamily: 'inherit',
          }}>
          Clear stored session
        </button>
        <Btn variant="primary" disabled={!canStart} onClick={onReady}>
          Continue to Character Sheet →
        </Btn>
      </div>
    </div>
  );
}

window.RECS.SetupScreen = SetupScreen;
