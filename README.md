# Notes and Lists

> **⚠️ Work in progress.** This is a personal project in its earliest stage. The
> repo currently contains little more than a blank starter app, none of the
> features below are implemented yet. Expect the code, data model, and
> everything else to change without warning.

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

```bash
npm install
npx expo start
```

From there you can open the app in a
[development build](https://docs.expo.dev/develop/development-builds/introduction/),
an [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/), or
[Expo Go](https://expo.dev/go).

Other useful scripts:

| Command           | What it does              |
| ----------------- | ------------------------- |
| `npm run android` | Start and open on Android |
| `npm run lint`    | Lint the project          |

Application code lives in [src/](src/), with file-based routes under
[src/app/](src/app/).

## Tech stack

- Expo SDK 57 / React Native 0.86
- Expo Router for file-based, typed routing
- TypeScript
- [@expo/ui](https://docs.expo.dev/versions/v57.0.0/sdk/ui/) for native SwiftUI and Jetpack Compose components
- React Native Reanimated for animation

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
- **[NativeWind](https://www.nativewind.dev/)** (`nativewind`, `tailwindcss` v3):
  Tailwind CSS utility classes for styling React Native components, using the
  stable v4 release.
- **[Sentry](https://docs.sentry.io/platforms/react-native/)**
  (`@sentry/react-native`): crash and error reporting. Source maps are uploaded
  during EAS builds so stack traces point at the original TypeScript.

React Native Firebase and Nitro Google Sign-In include native code, so once
they're added the app will need a
[development build](https://docs.expo.dev/develop/development-builds/introduction/)
instead of Expo Go.

## License

MIT — see [LICENSE](LICENSE).
