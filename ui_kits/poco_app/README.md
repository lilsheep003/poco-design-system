# Poco Mobile App — UI Kit

Interactive click-through prototype of the Poco mobile app, recreated from the LoFi wireframes.

## Run

Open `index.html` in the preview pane — a 390×780 iPhone-framed simulator renders there.

## Files

- `index.html` — app shell: phone frame, React mount, routing
- `Primitives.jsx` — `P_COLORS`, `PIcon`, `PButton`, `PCard`, `PChip`, `PPill`, `PHeader`, `PTabBar`, `PScreen`, `PSection`
- `HomeScreen.jsx` — Home
- `TaskScreen.jsx` — Tasks
- `MoodScreen.jsx` — Mood check-in + Gentle Reflection
- `FocusScreens.jsx` — Focus intro, setup, live session, reflection
- `BreakdownScreens.jsx` — Write → Friction → Break-down flow

## Covered screens

- ✅ Home (greeting, state triad, suggested start, today list, reflection nudge)
- ✅ Tasks (capture, feeling-stuck CTA, priorities / low-energy / in-progress)
- ✅ Mood (mood chips, energy triad, focus chips, gentle reflection)
- ✅ Focus intro + custom setup + live session + reflection (with Mochi placeholder)
- ✅ Breakdown: Write → Friction picker → We made it smaller
- ✅ Me (sketch — profile + settings rows)

## Interactions wired up

- Bottom tab bar switches between Home / Task / Focus / Mood / Me
- Home → Start Focus launches the full focus flow
- Home / Task "Break Down" launches Write → Friction → Breakdown
- Mood chips + Energy triad + Focus chips are selectable; "That's me today !" returns to Home and updates the state triad
- Focus session timer counts down live; Stop ends into the reflection screen
- Back chevrons work through each modal flow
