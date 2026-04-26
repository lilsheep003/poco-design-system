/* =============================================================
   packs/bill-payment.jsx — Example generic pack.

   Demonstrates that the toolkit is product-agnostic. This pack is
   intentionally about a mundane task (paying a utility bill through
   an unnamed mobile banking app) — exactly the "prosaic aim"
   Sturdee et al. (2023, §5) advocate for as RECS adventures.

   Use this pack for:
   - Toolkit demos to people unfamiliar with Poco
   - Pilot tests where you do NOT want Poco contamination
   - Thesis appendix example showing the toolkit works on a
     different product context
   ============================================================= */

window.RECS.Packs.register({
  id: 'bill-payment',
  name: 'Bill payment — generic mobile banking',
  description: 'A participant attempts to pay an electricity bill through a generic mobile banking app under mildly adverse conditions. Portable across any real banking app the researcher has access to.',
  productName: '(any mobile banking app)',
  author: 'RECS Toolkit reference pack',
  notes: 'Bring any real mobile banking app (participant\'s own, with a throwaway test payee if possible). The toolkit does not care which — you are probing the banking paradigm, not a specific brand.',

  complicationsExtra: [
    { cat: 'Interface', severity: 2, line: 'A security re-auth prompt appears mid-flow. Face ID fails once.' },
    { cat: 'Cognitive', severity: 2, line: 'The account number field accepts spaces in some apps and not others. The character is unsure whether to include them.' },
    { cat: 'Emotional', severity: 3, line: 'A sense that transferring money always carries a tiny fear — "what if I send it to the wrong person".' },
    { cat: 'Interface', severity: 1, line: 'A promotional banner about investment products slides across the top mid-task.' },
  ],

  scenarios: [
    {
      id: 'pay-a-bill',
      title: 'Pay the electricity bill',
      icon: '💡',
      duration: '10–15 min',
      productArea: 'Banking app · transfer flow',
      premise: 'End of the month. An unpaid electricity bill notification came in yesterday. The character has the payee details in a screenshot on their phone. They want to handle it now, before they forget again.',
      goal: 'Make the payment and leave the app.',

      beats: [
        {
          kind: 'narration',
          title: 'Scene — the bill is overdue',
          text: 'The notification sits in the lock screen. "ELEC CO — amount due". You unlock. The banking app icon is on the second home screen.',
        },
        {
          kind: 'challenge',
          title: 'Finding the transfer flow',
          setup: 'Open the banking app. Find where transfers start.',
          taskPrompt: 'In a real banking app on the device, locate the transfer / payment entry point.',
          attribute: 'TLIT',
          difficulty: 'easy',
          onCalm:        'The transfer button is on the home. You tap it.',
          onMild:        'You tap two things before finding the right one. Slight friction.',
          onSignificant: 'Nothing on the home screen looks like "transfer". You open a menu and scan.',
        },
        {
          kind: 'challenge',
          title: 'Entering payee details',
          setup: 'The payee account needs an account number. You have a screenshot.',
          taskPrompt: 'Switch to the screenshot, memorise or paste the account number, return to the app, enter it.',
          attribute: 'WMEM',
          difficulty: 'medium',
          onCalm:        'You copy, switch back, paste. Done.',
          onMild:        'The app drops your session on switch-back; you re-enter. Minor annoyance.',
          onSignificant: 'You mis-type digits the first time. The app rejects. You re-check. You are not sure if the spaces matter.',
        },
        {
          kind: 'challenge',
          title: 'Confirming the amount',
          setup: 'The bill has an exact amount. You type it. The confirmation screen shows one more time.',
          taskPrompt: 'Enter the amount, advance to confirmation.',
          attribute: 'PAT',
          difficulty: 'medium',
          onCalm:        'The flow is clean. You confirm.',
          onMild:        'A tiny voice says "am I sure about the amount?" You squint at the screenshot again.',
          onSignificant: 'The confirmation dialog bundles three things (amount, payee, fees). You are suddenly unsure which number is "the total".',
        },
        {
          kind: 'challenge',
          title: 'Authorising the payment',
          setup: 'Face ID / fingerprint / PIN. One of these.',
          taskPrompt: 'Complete the authorisation step.',
          attribute: 'EREG',
          difficulty: 'medium',
          onCalm:        'Authorisation works on the first try.',
          onMild:        'Face ID fails once. You hold the phone slightly differently. It works.',
          onSignificant: 'Three failed biometric attempts. The app falls back to PIN. You strain to remember.',
        },
        {
          kind: 'narration',
          title: 'Close — was it paid?',
          text: 'A green tick, or a failed screen, or an ambiguous "processing". Debrief: at what point did you feel most uncertain? What did the app assume about you that was false?',
        },
      ],
    },
  ],
});
