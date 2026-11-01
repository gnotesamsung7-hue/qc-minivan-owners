# QC Minivan Owners: group route planner, live map and walkie-talkie

Plan routes together (draw or import GPX), see every member live on the map, and talk to the whole group with a hold-to-talk button. Nobody signs up and nobody gives a real name: each person picks a callsign, and the phone signs in anonymously.

## 1. Firebase (once, about 10 minutes)

1. Go to console.firebase.google.com and create a new project called `qc-minivan-owners` (Analytics off is fine).
2. **Build, Authentication, Get started, Sign-in method**: turn on **Anonymous**. Leave everything else off; the app never asks for email, phone or name.
3. **Build, Realtime Database, Create database**: pick **Singapore (asia-southeast1)**, start in locked mode.
4. In the database's **Rules** tab, paste the contents of `database.rules.json` and click **Publish**.
5. **Project settings (gear icon), Your apps, Web (`</>`)**: register an app called `qc-minivan-owners`. Copy the `firebaseConfig` values into `www/config.js`. Make sure `databaseURL` is there; if it is missing, copy it from the top of the Realtime Database page.

## 2. GitHub (builds the APK for you)

1. Create a new repository called `qc-minivan-owners`.
2. **Add file, Upload files**: drag in `www`, `icons`, `package.json`, `capacitor.config.json`, `database.rules.json`, `.gitignore` and this README. Commit to `main`.
3. **Add file, Create new file**: type the name `.github/workflows/build.yml`, paste the contents of that file from this package, and commit. (Typing the path is more reliable than uploading a dot-folder.)
4. Open the **Actions** tab and watch **Build APK** (about 5 to 7 minutes).
5. When it is green, open **Releases** on the repo page from your phone and download `QC-Minivan-Owners.apk`. Every push makes a new build.

Every phone in the group must install an APK built with the same `config.js`.

The launcher icon is built from `icons/` (generated from the club logo). To change it later, replace those PNGs and push.

## 3. Using it

- One person taps **Start a new group** and reads out the 6-letter code (tap the code chip to copy it). Everyone else enters the code and taps **Join**.
- **Hold to talk**: press and hold the orange button, wait for the double chirp, speak, release. Only one person can talk at a time; the button turns grey and says "Channel busy" while someone else is on air. Each transmission is capped at 60 seconds.
- **Team** tab: who is online, how far away they are, their speed, and **Find** to jump to them.
- **Routes** tab: **Draw a route** (tap points on the map, Undo, Save), **Import GPX** (Strava, Wikiloc, AllTrails, Garmin exports), **Edit** to add points to anyone's route, ✕ to delete. Long-press the map to drop a pin for everyone.
- **Topo** switches to a contour map, useful for hikes and rides.

## How it works

- Locations, routes, pins and the talk channel are synced through Firebase Realtime Database, so it works on 4G, 5G and Wi-Fi without anyone being on the same network.
- Voice is recorded as Opus at 32 kbps with echo cancellation, noise suppression and auto gain, sent in 200 ms chunks and played on the other phones about half a second behind the speaker. Clips are deleted from the database 20 seconds after each transmission.
- The screen stays on while the app is open.

## Known limits

- Location sharing and listening pause when the screen is locked or the app is in the background (Android pauses web apps). Keep the app open on screen during the trip, ideally on a phone mount. A background service can be added later as a native plugin.
- Map tiles need data; there is no offline map caching yet.
- Data use is small: roughly 4 KB per second while someone talks, and a few hundred bytes per location update.
