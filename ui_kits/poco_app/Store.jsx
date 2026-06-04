// Global app state — single React context. Everything reads/writes via useStore().

const StoreCtx = React.createContext(null);

const uid = () => Math.random().toString(36).slice(2, 9);
const todayKey = () => new Date().toISOString().slice(0, 10);

const FRICTION_TAGS = [
  'Too big',
  "Don't know where to start",
  'Boring',
  'Overwhelming',
  'Afraid of failing',
  'Low energy',
  'Unclear what to do',
];

const EFFORT_LEVELS = [
  { id: 'easy', label: 'Easy', rank: 0, pill: 'easy' },
  { id: 'medium', label: 'Medium', rank: 1, pill: 'medium' },
  { id: 'hard', label: 'Hard', rank: 2, pill: 'hard' },
];

function normalizeEffort(value) {
  if (value === 'easy') return 'easy';
  if (value === 'hard' || value === 'high') return 'hard';
  return 'medium';
}

function effortLabel(value) {
  return EFFORT_LEVELS.find(x => x.id === normalizeEffort(value))?.label || 'Medium';
}

function effortPillKind(value) {
  return EFFORT_LEVELS.find(x => x.id === normalizeEffort(value))?.pill || 'medium';
}

function effortRank(value) {
  return EFFORT_LEVELS.find(x => x.id === normalizeEffort(value))?.rank ?? 1;
}

function sortTasksForEnergy(tasks, energy) {
  const list = [...tasks];
  if (energy !== 'Low') return list;
  return list
    .map((task, index) => ({ task, index }))
    .sort((a, b) => effortRank(a.task.priority) - effortRank(b.task.priority) || a.index - b.index)
    .map(x => x.task);
}

function makeInitialStore() {
  return {
    tasks: [
      { id: uid(), title: 'Review paper', done: true,  priority: 'hard', done_ts: Date.now() - 3600_000, subtasks: [], friction: null, today: false },
      { id: uid(), title: 'Read two papers', done: false, priority: 'hard', subtasks: [], friction: null, today: true },
      { id: uid(), title: 'Reply to email', done: true,  priority: 'easy', done_ts: Date.now() - 7200_000, subtasks: [], friction: null, today: false },
      { id: uid(), title: 'Organize tax document', done: false, priority: 'medium', subtasks: [], friction: null, today: false },
      { id: uid(), title: 'Write planning report', done: false, priority: 'hard', today: true,
        friction: "Don't know where to start",
        subtasks: [
          { id: uid(), text: 'Open the course page and read the assignment instructions', done: false },
          { id: uid(), text: 'Copy the key requirements into a note', done: false },
          { id: uid(), text: 'List 3 possible sections', done: false },
        ] },
    ],
    mindDrops: [
      { id: uid(), text: 'Maybe I should start journaling again', createdAt: Date.now() - 86400_000 },
      { id: uid(), text: 'Check if library book is due this week', createdAt: Date.now() - 7200_000 },
      { id: uid(), text: 'Look into that focus app Sara mentioned', createdAt: Date.now() - 1800_000 },
    ],
    mood: { mood: 'Calm', energy: 'Medium', focus: 'Maybe' },
    // mood history: { date: 'YYYY-MM-DD', mood, energy, focus }
    moodHistory: (() => {
      const moods = ['Calm', 'Okay', 'Tired', 'Anxious', 'Motivate', 'Overwhelmed'];
      const energies = ['Low', 'Medium', 'High'];
      const out = [];
      for (let i = 13; i >= 0; i--) {
        const d = new Date(); d.setDate(d.getDate() - i);
        out.push({
          date: d.toISOString().slice(0, 10),
          mood: moods[Math.floor(Math.random() * 4)],
          energy: energies[Math.floor(Math.random() * 3)],
          focus: 'Maybe',
        });
      }
      return out;
    })(),
    streak: 7,
    focusSessions: [], // { id, intention, env, durationSec, mode, startedAt, endedAt, completed }
  };
}

const STORE_KEY = 'poco_store_v1';

function loadStore() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (_) {}
  return null;
}

function saveStore(state) {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (_) {}
}

function withTaskCompletionFromSubtasks(task) {
  const subtasks = Array.isArray(task.subtasks) ? task.subtasks : [];
  if (subtasks.length === 0) return { ...task, subtasks };
  const allDone = subtasks.every(s => s.done);
  return { ...task, subtasks, done: allDone, done_ts: allDone ? (task.done_ts || Date.now()) : null };
}

function StoreProvider({ children }) {
  const [s, setS] = React.useState(() => loadStore() || makeInitialStore());

  React.useEffect(() => { saveStore(s); }, [s]);

  const api = React.useMemo(() => ({
    state: s,

    // TASKS
    addTask: (title, priority='medium') => setS(p => ({ ...p, tasks: [{ id: uid(), title, done: false, priority: normalizeEffort(priority), subtasks: [], friction: null, today: false }, ...p.tasks] })),
    addTaskFull: (task) => setS(p => ({ ...p, tasks: [{ id: uid(), done: false, priority: 'medium', subtasks: [], friction: null, today: false, source: 'manual', ...task, priority: normalizeEffort(task.priority) }, ...p.tasks] })),
    toggleToday: (id) => setS(p => ({ ...p, tasks: p.tasks.map(t => t.id === id ? { ...t, today: !t.today } : t) })),
    updateTask: (id, patch) => setS(p => ({ ...p, tasks: p.tasks.map(t => t.id === id ? { ...t, ...patch } : t) })),
    toggleTask: (id) => setS(p => ({ ...p, tasks: p.tasks.map(t => {
      if (t.id !== id) return t;
      const nextDone = !t.done;
      const subtasks = Array.isArray(t.subtasks) ? t.subtasks.map(s => ({ ...s, done: nextDone })) : [];
      return { ...t, done: nextDone, done_ts: nextDone ? Date.now() : null, subtasks };
    }) })),
    deleteTask: (id) => setS(p => ({ ...p, tasks: p.tasks.filter(t => t.id !== id) })),
    moveTask: (id, dir) => setS(p => {
      const i = p.tasks.findIndex(t => t.id === id);
      if (i < 0) return p;
      const j = i + dir;
      if (j < 0 || j >= p.tasks.length) return p;
      const tasks = [...p.tasks];
      [tasks[i], tasks[j]] = [tasks[j], tasks[i]];
      return { ...p, tasks };
    }),
    addSubtask: (taskId, text) => setS(p => ({ ...p, tasks: p.tasks.map(t => {
      if (t.id !== taskId) return t;
      const subtasks = Array.isArray(t.subtasks) ? t.subtasks : [];
      return { ...t, done: false, done_ts: null, subtasks: [...subtasks, { id: uid(), text, done: false }] };
    }) })),
    updateSubtask: (taskId, subId, patch) => setS(p => ({ ...p, tasks: p.tasks.map(t => {
      if (t.id !== taskId) return t;
      const subtasks = (Array.isArray(t.subtasks) ? t.subtasks : []).map(x => x.id === subId ? { ...x, ...patch } : x);
      return withTaskCompletionFromSubtasks({ ...t, subtasks });
    }) })),
    deleteSubtask: (taskId, subId) => setS(p => ({ ...p, tasks: p.tasks.map(t => {
      if (t.id !== taskId) return t;
      const subtasks = (Array.isArray(t.subtasks) ? t.subtasks : []).filter(x => x.id !== subId);
      return subtasks.length > 0 ? withTaskCompletionFromSubtasks({ ...t, subtasks }) : { ...t, subtasks };
    }) })),

    // MIND DROPS
    addMindDrop: (text) => setS(p => ({ ...p, mindDrops: [{ id: uid(), text, createdAt: Date.now() }, ...p.mindDrops] })),
    deleteMindDrop: (id) => setS(p => ({ ...p, mindDrops: p.mindDrops.filter(d => d.id !== id) })),
    convertDropToTask: (id) => setS(p => {
      const drop = p.mindDrops.find(d => d.id === id);
      if (!drop) return p;
      return {
        ...p,
        mindDrops: p.mindDrops.filter(d => d.id !== id),
        tasks: [{ id: uid(), title: drop.text, done: false, priority: 'medium', subtasks: [], friction: null, today: false }, ...p.tasks],
      };
    }),

    // MOOD
    setMood: (m) => setS(p => {
      const today = todayKey();
      const existing = p.moodHistory.find(x => x.date === today);
      const hist = existing
        ? p.moodHistory.map(x => x.date === today ? { ...x, ...m } : x)
        : [...p.moodHistory.slice(-13), { date: today, ...m }];
      return { ...p, mood: { ...p.mood, ...m }, moodHistory: hist };
    }),

    // FOCUS
    logSession: (sess) => setS(p => ({ ...p, focusSessions: [sess, ...p.focusSessions] })),
  }), [s]);

  return <StoreCtx.Provider value={api}>{children}</StoreCtx.Provider>;
}

const useStore = () => React.useContext(StoreCtx);

Object.assign(window, { StoreProvider, useStore, FRICTION_TAGS, EFFORT_LEVELS, normalizeEffort, effortLabel, effortPillKind, sortTasksForEnergy, uid });
