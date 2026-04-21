// Simulated AI breakdown engine — keyword + friction matching with template library.

const KEYWORD_TEMPLATES = {
  writing: {
    keywords: ['write', 'report', 'essay', 'paper', 'email', 'document', 'thesis', 'blog', 'letter', 'draft', 'article', 'seminar'],
    steps: [
      'Open the document or platform where you\'ll write',
      'Re-read the prompt or requirements one more time',
      'Jot down 3 rough ideas or section headings',
      'Write just the first sentence — it doesn\'t need to be perfect',
      'Save what you have and take a breath',
    ],
  },
  reading: {
    keywords: ['read', 'review', 'study', 'research', 'article', 'book', 'chapter', 'literature'],
    steps: [
      'Find the material and open it on your screen',
      'Skim the headings or table of contents first',
      'Read just the first page or section slowly',
      'Highlight or note one thing that stood out',
      'Decide if you want to keep going or take a break',
    ],
  },
  organizing: {
    keywords: ['organize', 'clean', 'sort', 'file', 'tax', 'tidy', 'arrange', 'declutter', 'folder', 'move'],
    steps: [
      'Pick one small area to focus on — just one shelf, drawer, or folder',
      'Gather everything from that area into one spot',
      'Sort into three groups: keep, toss, unsure',
      'Put the keep items back neatly',
      'Done with that spot — take a moment to appreciate it',
    ],
  },
  creative: {
    keywords: ['design', 'draw', 'create', 'make', 'build', 'code', 'program', 'develop', 'prototype', 'sketch'],
    steps: [
      'Open your tool or workspace and look at what you have so far',
      'Pick the smallest piece you could work on right now',
      'Spend 5 minutes just exploring or sketching — no pressure for quality',
      'Refine one small part until it feels right',
      'Save your progress and notice what you made',
    ],
  },
  communication: {
    keywords: ['call', 'reply', 'message', 'meet', 'present', 'talk', 'discuss', 'contact', 'reach', 'respond'],
    steps: [
      'Open the message or find the contact info',
      'Write down 2–3 key points you want to say',
      'Draft the message or talking points — keep it short',
      'Read it once, then send or make the call',
      'Mark it done — that took courage',
    ],
  },
  admin: {
    keywords: ['apply', 'submit', 'register', 'form', 'appointment', 'schedule', 'book', 'renew', 'pay', 'invoice'],
    steps: [
      'Find the website, form, or portal you need',
      'Gather the info you\'ll need (ID, dates, documents)',
      'Fill in the first section of the form',
      'Review what you\'ve filled in so far',
      'Submit or save your progress',
    ],
  },
  generic: {
    keywords: [],
    steps: [
      'Write down exactly what the finished task looks like',
      'Identify the very first physical action you\'d take',
      'Do just that one action — nothing more',
      'Check in: what\'s the next tiny step after that?',
      'Keep going one step at a time, or pause here',
    ],
  },
};

const FRICTION_TEMPLATES = {
  'Too big': [
    'Pick just one corner of this task — the smallest slice',
    'Set a 5-minute timer and only work on that slice',
    'When the timer rings, decide: keep going or stop here',
    'If you kept going, do one more tiny piece',
    'You\'ve started — that\'s the hardest part done',
  ],
  "Don't know where to start": [
    'Look up or re-read any instructions related to this task',
    'Write down 3 things you already know about it',
    'Pick the easiest of those 3 things as your starting point',
    'Do just that one easy thing now',
    'After that, the next step usually becomes clearer',
  ],
  'Boring': [
    'Put on some music or a podcast you enjoy',
    'Set a timer for just 10 minutes — you only need to last that long',
    'Start with the least boring part of the task',
    'After 10 minutes, reward yourself with something small',
    'Decide: do another 10-minute round, or call it a win',
  ],
  'Overwhelming': [
    'Close your eyes and take three slow breaths',
    'Write down just ONE thing you could do in the next 2 minutes',
    'Do that one thing',
    'That\'s enough for now if you need it to be',
  ],
  'Afraid of failing': [
    'Remind yourself: this is a rough draft, not a final version',
    'Lower the bar — aim for "good enough," not perfect',
    'Do the easiest part first to build momentum',
    'Try for just 5 minutes — you can always fix things later',
    'Notice: you tried, and that\'s what matters',
  ],
  'Low energy': [
    'Sit somewhere comfortable — no need to stand or rush',
    'Pick the part of this task you can do while seated and relaxed',
    'Work on it for just 5 minutes, nice and slow',
    'If you have a bit more energy, do 5 more minutes',
    'Rest when you need to — you still made progress',
  ],
  'Unclear what to do': [
    'Write down what you think the task is asking in your own words',
    'List any questions you have about it',
    'Look for answers: check instructions, ask someone, or search online',
    'Once you have a clearer picture, pick the first obvious action',
    'Do that action — clarity often comes from doing',
  ],
};

const ENCOURAGING_MESSAGES = {
  'Too big': 'let\'s make this feel a little smaller...',
  "Don't know where to start": 'finding a gentle starting point for you...',
  'Boring': 'making this a bit more manageable...',
  'Overwhelming': 'taking a breath and simplifying...',
  'Afraid of failing': 'finding a safe way to begin...',
  'Low energy': 'keeping it light and easy...',
  'Unclear what to do': 'figuring out a clear first step...',
};

const SMALLER_STEPS = {
  'open': [
    'Find the app or website you need',
    'Click to open it and wait for it to load',
    'Navigate to the right page or section',
  ],
  'write': [
    'Open a blank document or note',
    'Type just the first few words that come to mind',
    'Don\'t edit — just let the words flow for 2 minutes',
  ],
  'read': [
    'Open the material to the right page',
    'Read just the first paragraph',
    'Pause and think about what it said',
  ],
  'find': [
    'Think about where it might be',
    'Check the most likely spot first',
    'If not there, try one more place',
  ],
  'gather': [
    'Make a list of what you need',
    'Collect the first item on the list',
    'Set it in one designated spot',
  ],
  'default': [
    'Sit down and get comfortable',
    'Take one small action toward this step',
    'Check: did that move you forward? If yes, you\'re done with this piece',
  ],
};

function matchKeywordCategory(title) {
  const lower = title.toLowerCase();
  let bestMatch = null;
  let bestScore = 0;
  for (const [category, data] of Object.entries(KEYWORD_TEMPLATES)) {
    if (category === 'generic') continue;
    for (const kw of data.keywords) {
      if (lower.includes(kw) && kw.length > bestScore) {
        bestMatch = category;
        bestScore = kw.length;
      }
    }
  }
  return bestMatch;
}

function generateBreakdown(title, frictionTag) {
  const category = matchKeywordCategory(title);
  let steps;
  if (category) {
    steps = [...KEYWORD_TEMPLATES[category].steps];
  } else if (frictionTag && FRICTION_TEMPLATES[frictionTag]) {
    steps = [...FRICTION_TEMPLATES[frictionTag]];
  } else {
    steps = [...KEYWORD_TEMPLATES.generic.steps];
  }
  return steps.map(text => ({ id: uid(), text, done: false }));
}

function makeSmallerStep(stepText) {
  const lower = stepText.toLowerCase();
  for (const [keyword, subs] of Object.entries(SMALLER_STEPS)) {
    if (keyword === 'default') continue;
    if (lower.includes(keyword)) {
      return subs.map(text => ({ id: uid(), text, done: false }));
    }
  }
  return SMALLER_STEPS.default.map(text => ({ id: uid(), text, done: false }));
}

function getEncouragingMessage(frictionTag) {
  return ENCOURAGING_MESSAGES[frictionTag] || 'breaking this down into something gentler...';
}

Object.assign(window, { generateBreakdown, makeSmallerStep, getEncouragingMessage });
