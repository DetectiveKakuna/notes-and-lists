# Notes and Lists

[![CI](https://github.com/DetectiveKakuna/notes-and-lists/actions/workflows/ci.yml/badge.svg?branch=develop)](https://github.com/DetectiveKakuna/notes-and-lists/actions/workflows/ci.yml)

> **⚠️ Work in progress.** This is a personal project in its early stages. The
> app shell is in place: navigation, a light and dark theme, and the tooling
> around it. The first note screens are being built on sample data: a grid of
> note cards, and a checklist screen where items can be checked off, edited,
> added, and deleted. Notes are only kept in memory for now, so changes reset
> when the app restarts. None of the features below work end to end. Expect
> the code, data model, and everything else to change without warning.

A mobile-first notes and lists app built with [Expo](https://expo.dev) and
[Expo Router](https://docs.expo.dev/router/introduction). Android comes first; a
web version may follow once 1.0 is out.

## Why this exists

My wife and I use [Google Keep](https://keep.google.com) constantly, shared
grocery lists, house projects, random thoughts at 2am. It gets most things
right, but there are a handful of things we keep wishing it did differently.
So this is an attempt to build the app we actually want: the parts of Keep that
work, plus our own additions.

It's a public repo because there's no reason for it not to be, not because it's
ready for anyone else to use.

## The Google Keep baseline

The goal is to first cover the ground Keep already covers well:

**Notes and lists**

- Plain text notes with a title and body
- Checklists with checkable items, including nested/indented sub-items
- Items that move to the bottom (or hide) once checked
- Freehand drawing notes and handwritten annotation
- Photo and image attachments, with text extraction from images
- Voice notes that are transcribed to text and kept alongside the audio

**Organizing**

- Color-coded notes and background images
- Labels (tags), with multiple labels per note
- Pin notes to the top of the grid
- Archive notes to get them out of the main view without deleting
- Trash that holds deleted notes for a while before purging
- Grid and single-column list views
- Search across note text, labels, colors, and attachment types

**Sharing and sync**

- Real-time sync across devices and platforms
- Share a note with specific people as collaborators who can edit it live
- Per-note collaborator list rather than all-or-nothing account sharing

**Everything else**

- Offline-first: edit without a connection, sync when you're back

## Our custom features

This is the actual point of the project — the things we want that Keep doesn't
do. More will land here as we figure them out.

### Store categories on shopping lists

We shop at several stores, and a single grocery list is really several lists
wearing a trenchcoat. Keep makes you either keep one note per store or scan a
flat list trying to remember which items come from where.

So: any item on a list can be tagged with a store, and the list displays grouped
by store.

- Stores are user-defined — add, rename, reorder, and pick a color for each
- Assign a store when adding an item, or retag it later
- The list renders as store sections instead of one flat run of items
- Items with no store assigned collect in their own group rather than vanishing
- Collapse a section, or focus a single store so you only see what's in front of
  you while you're actually in the aisle
- An item remembers the store you last used for it, so recurring items come back
  pre-tagged

Still open: whether an item can belong to more than one store (for things you'll
grab wherever you end up first), and whether store tags are per-list or shared
across every list.

## Getting started

### Prerequisites

- Node.js 26 (pinned in [.nvmrc](.nvmrc))
- For native builds: Android Studio with the Android SDK and JDK 17, set up as in
  Expo's
  [Android Studio guide](https://docs.expo.dev/workflow/android-studio-emulator/)

### Run it

```bash
npm install
npx expo start
```

From there you can open the app in a
[development build](https://docs.expo.dev/develop/development-builds/introduction/),
an [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/),
or [Expo Go](https://expo.dev/go). Expo Go runs the app, but the custom fonts
and the splash screen are compiled into the native app, so they only appear in
development and release builds.

| Command                   | What it does                                                                                   |
| ------------------------- | ---------------------------------------------------------------------------------------------- |
| `npm start`               | Start the Metro dev server                                                                     |
| `npm run android`         | Build a development build and run it on a connected device or emulator                         |
| `npm run android:release` | Build and run a release variant, to check the splash, fonts, and performance as users see them |
| `npm run format`          | Format everything with Prettier                                                                |
| `npm run format:check`    | Check formatting without changing files                                                        |
| `npm run lint`            | Lint the project with ESLint                                                                   |
| `npm run typecheck`       | Type-check the project with TypeScript                                                         |
| `npm test`                | Run the unit tests once                                                                        |
| `npm run test:watch`      | Re-run the tests on every change while writing them                                            |
| `npm run prettyLint`      | Format everything, then lint: a one-step cleanup before committing                             |

CI runs `format:check`, `lint`, `typecheck`, and `test`, the check-only
scripts, so a local run of those four matches what CI will report.

The `android/` folder is generated from [app.config.ts](app.config.ts) and
isn't committed. After changing native settings there (fonts, splash screen,
icons, plugins), regenerate it with `npx expo prebuild --clean` before
building.

## Project structure

```
src/
  app/              Expo Router routes: screens and layouts
  components/       Shared components, such as AppText and Collapsible
  hooks/            Custom hooks, such as useColors
  notes/            Note types, sorting, and checklist logic
    components/     Note UI, such as NoteCard and ChecklistRow
    data/           Reading and saving notes and per-note settings
  theme/            Color roles, typography, and the navigation theme
  utils/            Small shared helpers, such as cn and toKebabCase
  global.css        Tailwind entry point
app.config.ts       Expo app configuration
tailwind.config.js  Tailwind theme, generated from src/theme/
```

Unit tests sit next to the file they test, such as `cn.test.ts` beside
`cn.ts`, so a test moves along with its file. The workspace settings in
[.vscode/settings.json](.vscode/settings.json) turn on VS Code's file nesting,
which folds each test under its file in the Explorer. Tests never go in
`src/app/`, because Expo Router treats every file there as a route.

## Design and theming

The color theme comes from the
[Material Theme Builder](https://material-foundation.github.io/material-theme-builder/),
generated from the source color `#6C6CAA`, the indigo in the app icon. It uses
Material 3's color roles (`surface`, `surfaceContainer`, `onSurface`, `primary`,
and so on), each with a light and a dark value.

Those values are defined once, in [src/theme/colors.ts](src/theme/colors.ts),
and everything else reads from that file:

- **Tailwind classes.** [tailwind.config.js](tailwind.config.js) turns each
  role into a CSS variable plus a matching class, such as `bg-surface` or
  `text-on-surface`. The variables switch with the system's light or dark
  setting, so components don't need any `dark:` variants.
- **Navigation.** The React Navigation theme uses the same roles for screen
  backgrounds, headers, and the drawer.
- **Color values in code.** For props that need an actual color rather than a
  class, such as an icon's `tintColor`, the `useColors()` hook returns the
  current light or dark set and updates when the system setting changes.
- **Splash screen.** [app.config.ts](app.config.ts) imports the `surface`
  colors for the light and dark splash backgrounds. Expo's config loader can't
  import other TypeScript files on its own, so `tsx` handles that import.

Adding or changing a color is a one-file edit. The choice between light and dark
is also made in one place, `getColorMode()` in the same file. Everything else
looks its values up by mode, and the two navigation themes are built once and
reused.

### Typography

Typography follows Material 3 and lives in
[src/theme/typography.ts](src/theme/typography.ts):

- **Two font roles.** `brand` is for large, expressive text (display and
  headline styles) and uses Space Grotesk. `plain` is for everything else and
  uses Google Sans Flex. They're available as the `font-brand` and
  `font-plain` classes, and because code refers to the roles rather than the
  fonts, swapping either font is a one-line change.
- **Embedded, not downloaded.** Both fonts are built into the app with the
  `expo-font` config plugin rather than loaded at startup. Material 3's display
  and headline styles only use weight 400, so Space Grotesk needs a single file
  (about 85 KB). Google Sans Flex ships weights 400 to 700 at about 130 KB each,
  compared with about 2 MB for each weight of the original Google Sans.
- **The type scale.** `TypeScale` defines Material 3's 15 text styles (display,
  headline, title, body, and label, each in large, medium, and small), with
  size, line height, weight, and font role. Tailwind generates a class for
  each, such as `text-body-large`, which sets size, line height, and weight
  together.

`AppText` takes a `variant` prop naming one of those styles, defaulting to
`bodyLarge`: `<AppText variant="titleMedium">Groceries</AppText>`. It applies
the style's font role and size along with the default text color.
`AppTextInput` takes the same `variant` prop and does the same for editable
text.

The type scale is the only list of text styles in the code. The Tailwind font
sizes, the list of classes Tailwind always generates (its `safelist`), and the
size names `cn()` recognizes are all derived from it, so adding or adjusting a
style is a one-line edit.

Styling goes through classes first. The classes passed to `AppText` are
combined with its defaults by a small `cn()` helper (`clsx` plus
`tailwind-merge`). When two classes conflict, the one passed in wins. For
example, `className="text-primary"` replaces the default text color,
`text-title-large` replaces the variant's size, and `font-bold` overrides only
its weight. `AppText` still accepts a `style` prop, kept for values only known
at runtime, such as a color that comes from a note's data.

### Spacing

Spacing follows Material 3's 4dp grid. By default NativeWind makes each
Tailwind spacing step 3.5dp on a phone, so [metro.config.js](metro.config.js)
sets `inlineRem: 16`. Each step is then 4dp, the same as Tailwind on the web:
`p-3` is 12dp, and `w-12` is 48dp, Android's minimum touch target.

## Tech stack

- Expo SDK 57 / React Native 0.86
- Expo Router for file-based, typed routing, with a drawer navigator
- TypeScript
- [@expo/ui](https://docs.expo.dev/versions/v57.0.0/sdk/ui/) for native Jetpack
  Compose controls, planned for things like reminder date pickers and bottom
  sheets
- [expo-symbols](https://docs.expo.dev/versions/v57.0.0/sdk/symbols/) for
  icons, drawn from Google's Material Symbols on Android
- [expo-sqlite](https://docs.expo.dev/versions/v57.0.0/sdk/sqlite/)'s
  `localStorage` for small settings kept on the device, such as whether a
  note's checked items are hidden. They stay on that phone rather than syncing
  with the note.
- [expo-crypto](https://docs.expo.dev/versions/v57.0.0/sdk/crypto/) for
  generating random IDs for new list items
- React Native Reanimated for animation
- [NativeWind](https://www.nativewind.dev/) v4 (Tailwind CSS v3) for styling,
  the stable release rather than the v5 release candidate
- Space Grotesk for headlines and Google Sans Flex for everything else, both
  embedded at build time with the `expo-font` config plugin

### Tooling and workflow

- ESLint (`eslint-config-expo`) and Prettier, with class sorting from
  `prettier-plugin-tailwindcss`, including classes passed to `cn()`
- `tailwind-merge` stays on v2 on purpose: v3 only supports Tailwind CSS v4,
  and this project uses Tailwind CSS v3 through NativeWind v4
- npm's install-script allowlist (`allowScripts` in `package.json`) approves
  only the packages that need them, `esbuild` and `unrs-resolver`, each at a
  specific version
- Jest (with the `jest-expo` preset) and React Native Testing Library for unit
  tests, covering the color roles, the light and dark fallback, the navigation
  theme, the `cn()` merge rules (including the type scale sizes), the text
  variants, the `AppText`, `AppTextInput`, and `Collapsible` components, note
  and item sorting, the in-memory notes store, the checklist's sections, rows,
  and editing (checking, editing, adding, and deleting items), and the per-note
  settings saved on the device
- GitHub Actions CI runs on every pull request and push to `develop`: Expo
  dependency check, formatting check, lint, type check, and tests
- `develop` is the integration branch. Work happens on `feature/*`, `hotfix/*`,
  or `release/*` branches, and a repository ruleset enforces those names.
- `main` holds releases. It only accepts pull requests from `develop`, merged
  with a merge commit, and the CI checks must pass first. Force pushes and
  deletions are blocked on both `main` and `develop`.

### Planned for 1.0

Not installed yet. These are the libraries chosen for the first release.

- **[React Native Firebase](https://rnfirebase.io/)** (`@react-native-firebase/app`,
  `/firestore`, `/auth`): Firestore stores notes and lists, and Firebase Auth
  handles accounts. Chosen over the Firebase JS SDK because it wraps the native
  Firebase SDKs, which cache notes on the device and queue edits made offline.
  The offline-first goal above depends on that.
- **[Nitro Google Sign-In](https://react-native-nitro-google-sign-in.github.io)**
  (`react-native-nitro-google-signin`, `react-native-nitro-modules`): signs in
  with Google and passes the ID token to Firebase Auth. It uses Android's
  Credential Manager, which replaces Google's deprecated legacy sign-in, and it's
  free and MIT licensed.
- **[Sentry](https://docs.sentry.io/platforms/react-native/)**
  (`@sentry/react-native`): crash and error reporting. Source maps are uploaded
  during EAS builds so stack traces point at the original TypeScript.

React Native Firebase and Nitro Google Sign-In include native code, so once
they're added the app will need a
[development build](https://docs.expo.dev/develop/development-builds/introduction/)
instead of Expo Go.

## License

MIT — see [LICENSE](LICENSE).
