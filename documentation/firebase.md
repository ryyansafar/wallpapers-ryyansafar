# Firebase Setup

This guide covers everything about the Firebase integration — from creating the project to Firestore security rules to what must never touch version control.

---

## What Firebase is used for

Only **Cloud Firestore** is used. Specifically:

- One collection: `likes`
- One document per wallpaper: `likes/{wallpaperId}`
- One field per document: `{ count: number }`
- Real-time subscription via `onSnapshot` so all visitors see the same live count

Firebase Authentication, Storage, Hosting, Analytics, and all other Firebase products are **not used**.

---

## Creating the project

1. Go to [console.firebase.google.com](https://console.firebase.google.com)
2. Click **Add project**
3. Name it (e.g. `wallpapers-ryyansafar`)
4. You can disable Google Analytics if you don't need it
5. Click **Create project**

---

## Adding the web app

1. In your project dashboard, click the **`</>`** (Web) icon to add a web app
2. Give it a nickname (e.g. `wallpapers.ryyansafar`)
3. **Do not** check "Firebase Hosting" (you're using Vercel)
4. Click **Register app**
5. Firebase shows you the config object:

```js
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project",
  storageBucket: "your-project.firebasestorage.app",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123",
  measurementId: "G-XXXXXXXX"   // optional, only if Analytics enabled
};
```

Copy these values. You'll paste them into `app/lib/firebase.ts`.

---

## Enabling Firestore

1. In the Firebase console sidebar, go to **Build → Firestore Database**
2. Click **Create database**
3. Choose your region (pick the one closest to your primary audience — e.g. `europe-west1` for Europe, `us-central1` for US)
4. For **security rules**, choose **Start in test mode** initially. You'll tighten this in the next step.
5. Click **Enable**

---

## Security rules

Firestore's default "test mode" rules expire after 30 days and allow all reads/writes. You need to set proper rules.

Go to **Firestore Database → Rules** and replace the content with:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Only the likes collection is used
    match /likes/{wallpaperId} {
      // Anyone can read like counts
      allow read: if true;

      // Anyone can write — but only the count field
      // and only increment/decrement by 1 at a time
      allow write: if request.resource.data.keys().hasOnly(['count'])
                   && request.resource.data.count is int
                   && (request.resource.data.count == resource.data.count + 1
                       || request.resource.data.count == resource.data.count - 1
                       || !resource.exists());
    }

    // Deny everything else
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

Click **Publish**.

**What these rules do:**
- Allow anyone to read like counts (public gallery — this is intentional)
- Allow anyone to write, but only to the `count` field, and only by ±1 (prevents someone setting the count to any arbitrary number)
- The `!resource.exists()` clause allows creating a new document (first like on a wallpaper)
- Everything else in Firestore is fully locked down

---

## Wiring the config into the app

Open `app/lib/firebase.ts` and replace the config values:

```ts
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.firebasestorage.app",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);
```

The `getApps().length === 0` check prevents "Firebase App named '[DEFAULT]' already exists" errors during Next.js hot module replacement in development.

---

## Firestore document structure

Documents are created automatically on the first like for each wallpaper. There is no pre-population needed.

```
likes/                          (collection)
├── w-locked/                   (document)
│   └── count: 42
├── w-unlocked/
│   └── count: 17
├── w-yo/
│   └── count: 88
├── w-mainwallpaper/
│   └── count: 5
└── w-screensaver/
    └── count: 31
```

The wallpaper IDs used as document names must exactly match the `wallpaperId` prop passed to `<WallpaperActions>`.

---

## The Admin SDK — what NOT to commit

When you download a **service account key** from Firebase (`.json` file with `firebase-adminsdk` in the name), it contains a **private RSA key**. This is a server-side credential that grants full admin access to your Firebase project — bypassing all security rules.

**This file must never be committed to git.**

This project's `.gitignore` already covers it:

```
*firebase-adminsdk*.json
```

If you accidentally committed it:
1. Immediately go to Firebase Console → Project Settings → Service accounts → delete the key
2. Generate a new one if needed
3. Remove it from git history (BFG Repo Cleaner or `git filter-repo`)
4. Force-push

The admin SDK is not needed for this project at all. The client SDK (the `firebase` npm package) is sufficient. The admin SDK is only needed for server-side operations like seeding data from a script or a Cloud Function.

---

## Deploying Firebase config to Vercel

The Firebase client config values (`apiKey`, `projectId`, etc.) are safe to commit directly in `app/lib/firebase.ts` — they are not secrets. However, if you prefer to use environment variables (e.g. if you're open-sourcing and don't want your specific project IDs in the repo):

1. Create a `.env.local` file (gitignored automatically via `.env*` rule):

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIza...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123
```

2. Update `app/lib/firebase.ts`:

```ts
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
};
```

3. In Vercel → your project → Settings → **Environment Variables**, add all six variables with the same names and values.

> The `NEXT_PUBLIC_` prefix is required for any environment variable that needs to be accessible in client-side code (browser). Without it, Next.js strips the variable from the client bundle.

---

## Monitoring usage

In the Firebase console:

- **Firestore Database → Usage tab** — shows reads, writes, deletes per day
- The free Spark plan allows 50,000 reads and 20,000 writes per day — more than enough for a personal gallery
- If you ever get close to limits, `onSnapshot` listeners are the main read source (one per wallpaper per page load). With 5 wallpapers, each page load opens 5 listeners. Firestore charges for the initial read + each real-time update.
