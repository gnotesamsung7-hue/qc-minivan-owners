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

## Chat, fuel tracker and van photo

- **Group chat**: the round chat button above the tabs opens it; the – button minimizes it back to the bubble, which shows a red count of unread messages. Quick replies (Pa-ihi muna, Gas stop, Sunod lang...) send with one tap, and **Read aloud** speaks new messages for the driver. With the app in the background, new messages arrive as notifications.
- **Fuel tab**: log fill-ups (liters, price per liter, total, fuel type, station, full tank), other expenses (oil change, tolls, parking, repairs...), and see km/L, L/100 km, cost per km and 30-day spending. The gauge estimates what is left from your last fill-up and the distance the app has tracked since; tap E, ¼, ½, ¾ or F when you start the engine to correct it.
- **Low fuel reminder**: when the estimate drops below your reminder distance (60 km by default), you get a sound, a spoken alert and the nearest gas station. The ⛽ button on the map shows the 10 nearest stations from OpenStreetMap with Directions to Google Maps. Members who are low show ⛽ next to their callsign (you can turn that off).
- **Van photo**: upload a photo of your minivan (first screen or Me tab), crop it into the circle, and it becomes your marker. "Show me as" switches between Photo, Pixel avatar and Dot.
- Fuel data stays on your phone; only the "low fuel" flag is shared, and only if you allow it.

## Directions, windshield HUD, sounds and voice

- **🧭 Where to?** (map button): search a place, pick a spot on the map, or choose a pin, route end, member or the nearest gas station. The app draws the driving route with distance and arrival time, then gives turn-by-turn arrows and voice. **Google Maps** and **Waze** buttons hand the destination to those apps for traffic-aware navigation. **Share** sets it as the convoy destination, so everyone gets a Start / Google Maps / Waze card.
- **HUD** (map button or the route card): a black screen with large glowing arrows, distance to the next turn, speed, arrival time, members near you and who is talking. Lay the phone flat on the dashboard and use **Mirror** / **Flip** until the windshield reflection reads right. Colors: green, cyan, amber, white.
- **Me tab → Sound library**: about 24 built-in sounds (Alerts, Pinoy road, Retro game, Celebrations) assignable to nearby alerts, chat, low fuel, convoy assembled, talk start, roger beep and the chime before directions. Add up to 6 of your own sounds.
- **Me tab → Voice and directions**: Standard English, Filipino or Barkada Taglish ("Liko ka sa kaliwa, pre!"), any voice installed on the phone, speed, pitch, early warning at 300 m / 500 m / 1 km, and an optional chime.
- Routes come from the free OpenStreetMap routing service and do not include live traffic; ETAs in Metro Manila traffic will be optimistic.

## Voice styles, meme sounds and your own voice

- **Voice styles** (Me tab → Voice and directions): Standard English, Filipino, Barkada Taglish, Tita mode, Jeepney barker, Pinoy meme, Hype announcer, Airline captain, Teleserye drama, Movie trailer, Robot, Chipmunk. Each one changes the wording, pitch and speed, but always says the direction clearly. Some add a sound effect on arrival or rerouting (air horn, sad trombone, dun dun dunnn, bass boom).
- **My recorded voice**: record your own clips for left, right, straight, U-turn, roundabout, heads-up, arrived, start and rerouting. Anything you skip is read by the phone voice.
- **Meme sounds** in the Sound library: air horn, sad trombone, dun dun dunnn, bass boom, record scratch, ba dum tss, cartoon boing, slide whistle, awkward crickets, suspense sting, victory tune. All are generated by the app, not copied recordings.
- **Record a sound** in the Sound library: up to 6 seconds, then use it for any alert (up to 10 of your own sounds).
- Recordings and sound effects play while the app is open. With the screen off, the phone's voice (text-to-speech) still speaks directions and alerts.

## Known limits

- Push-to-talk needs the app open on screen. Hearing others while the app is in the background usually works but is not guaranteed on every phone.
- Map areas you have viewed are saved on the phone for 30 days (up to about 6,000 tiles), so repeat trips use far less data. Areas you have never opened still need data. Pre-downloading whole regions is not offered, because the free OpenStreetMap servers do not allow bulk downloads.
- Data use is small: roughly 4 KB per second while someone talks, and a few hundred bytes per location update.
