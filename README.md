# Artist Platform — Mobile App

React Native (Expo) app built with an **atomic design system**, so design and
code stay in sync as the app grows.

## Stack

- **Expo SDK 57** + **React Native 0.86** + **React 19**
- **TypeScript** (strict mode)
- **React Navigation** (native-stack + bottom-tabs)
- **Zustand** — client/UI state
- **TanStack React Query** — server state, caching, data fetching
- **axios** — API client

## Getting started

```bash
npm install
npx expo start
```

Scan the QR code with Expo Go (iOS/Android), or press `i` / `a` for a
simulator, or `w` for web.

## The design system, in one sentence

**Every raw design value (color, font size, spacing, radius, shadow) lives in
`src/theme/`. Nothing else should hardcode a value.** Change a token once,
every component using it updates everywhere automatically.

## Folder structure

```
src/
├── theme/            ← 🔑 design tokens (colors, typography, spacing, radii, shadows)
├── components/
│   ├── atoms/          Smallest building blocks: Button, Text, Input...
│   ├── molecules/       2+ atoms combined: FormField, SearchBar, ArtworkCard...
│   ├── organisms/        Complex sections: Header, ArtworkGrid...
│   └── templates/         Page skeletons/layouts (structure only, no real data)
├── screens/            Actual app screens (Home, Profile, ArtworkDetail...)
├── navigation/         React Navigation stacks/tabs + typed param lists
├── hooks/              Custom hooks, especially React Query hooks
├── services/           API functions (one file per resource)
├── store/              Zustand stores (client/UI state only)
├── utils/              Pure helper functions
├── types/              Shared TypeScript types
└── config/             App-level config/constants
```

## Component conventions (READ BEFORE ADDING A COMPONENT)

Every component folder follows this shape:

```
ComponentName/
├── ComponentName.tsx         ← the component itself
├── ComponentName.styles.ts   ← StyleSheet, built ONLY from theme tokens
├── ComponentName.types.ts    ← props interface
└── index.ts                  ← barrel export
```

**Which atomic tier does my new component belong in?**
- **Atom** — can't be broken down further and serves one purpose (Button, Text, Input, Avatar, Icon, Badge)
- **Molecule** — a small, reusable combination of atoms for one job (FormField = Text + Input + error Text)
- **Organism** — a distinct, complex section of a screen, often with its own data (Header, ArtworkGrid, CommentList)
- **Template** — page layout/skeleton with placeholder content, no real data wiring
- **Screen** — a template + organisms wired to real data/navigation

**Golden rule:** if you're about to write `color: '#7C3AED'` or `padding: 16`
directly in a component, stop — pull it from `theme` instead
(`theme.colors.primary`, `theme.spacing.md`). This is what makes future design
changes a one-file edit instead of a hunt across the whole app.

## Data fetching pattern

1. Add a function to `src/services/xxxService.ts` (plain async function, calls `apiClient`)
2. Wrap it in a React Query hook in `src/hooks/useXxx.ts`
3. Call the hook from a screen/organism — you get `{ data, isLoading, error }` for free

## Path aliases

Use `@/` instead of long relative imports:

```ts
import { theme } from '@/theme';
import { Button } from '@/components/atoms/Button';
```

(Configured in both `tsconfig.json` and `babel.config.js` — keep them in sync
if you add a new alias.)

## What's next

- Replace placeholder values in `src/theme/*.ts` with the real design tokens
  from Figma (exact colors, font scale, spacing, radii)
- Build out `organisms/` and `templates/` once real screen designs are shared
- Point `EXPO_PUBLIC_API_URL` (in a `.env` file) at your real backend
- Add real auth flow wiring in `services/` + `authStore.ts`
