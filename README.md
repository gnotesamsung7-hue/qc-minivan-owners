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

- **Invite with QR code** (Team tab, or the link on the first screen): shows a QR code another member scans with their phone camera to download the latest APK, plus the group code to join with. It always points to the newest build in Releases, so keep the repo Public.

- **Share my location** (Me tab): pause it anytime; the group stops seeing you. Leaving a group deletes your location.
- **Hands-free voice mode** (Me tab): for drivers with the phone mounted. The app transmits when it hears you and stops after about 1.5 seconds of quiet. Set sensitivity to Low if road noise triggers it.
- **invite-card.png**: post it in the group chat or print it; it has the download QR and install steps.

- **Me tab**: pixel avatar maker (16x16, with mirror mode and ready-made templates), 18 marker colours, battery saver (Off / Saver / Max, turns on automatically at 20%), dark map, and saved map tiles.
- **Callsign ideas** on the first screen: tap one, or "More ideas" for a new batch. If two people pick the same callsign in a group, the second gets a number added.

## How it works

- Locations, routes, pins and the talk channel are synced through Firebase Realtime Database, so it works on 4G, 5G and Wi-Fi without anyone being on the same network.
- Voice is recorded as Opus at 32 kbps with echo cancellation, noise suppression and auto gain, sent in 200 ms chunks and played on the other phones about half a second behind the speaker. Clips are deleted from the database 20 seconds after each transmission.
- The screen stays on while the app is open.

## Background sharing and nearby alerts

- **Keep sharing in background** (Me tab, on by default): your location keeps updating with the screen off or while you use Waze, Spotify or Messenger. Android shows a "QC Minivan Owners" notification while it runs; leaving the group stops it.
- On Samsung, Xiaomi, Oppo, Vivo and realme phones, set the app's battery use to **Unrestricted** (Me tab, "open app settings", then Battery), or the phone may freeze your dot after a while.
- **Nearby alerts** (Me tab): pick any of 100 m, 150 m, 300 m, 500 m, 1 km. Choose Sonar, Chime, Beep-beep, Horn, Bell or Silent, plus an optional spoken alert in English or Filipino ("Malapit na si Busina King, 150 metro."). With the screen off you get a notification and the spoken alert.
- **Happy sound**: when 3 or more members are within your closest distance, a jingle plays with confetti and "Convoy assembled!".

## Known limits

- Push-to-talk needs the app open on screen. Hearing others while the app is in the background usually works but is not guaranteed on every phone.
- Map areas you have viewed are saved on the phone for 30 days (up to about 6,000 tiles), so repeat trips use far less data. Areas you have never opened still need data. Pre-downloading whole regions is not offered, because the free OpenStreetMap servers do not allow bulk downloads.
- Data use is small: roughly 4 KB per second while someone talks, and a few hundred bytes per location update.
