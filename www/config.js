// Paste the config from Firebase console > Project settings > Your apps > Web app.
// Every phone in the group must run an APK built with the SAME config.
window.FIREBASE_CONFIG = {
  apiKey: "AIzaSyCgE95BgRizE8sQ8OUqimlKf7yjUNZ2kOU",
  authDomain: "qc-minivan-owners.firebaseapp.com",
  databaseURL: "https://qc-minivan-owners-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "qc-minivan-owners",
  storageBucket: "qc-minivan-owners.firebasestorage.app",
  messagingSenderId: "732606210080",
  appId: "1:732606210080:web:a7ec29d97d2d3b0ee21c45"
};

// Where the QR code in the app sends new members to download the APK.
// "latest" always points to the newest build in your repo's Releases.
window.APP_DOWNLOAD_URL = "https://github.com/gnotesamsung7-hue/qc-minivan-owners/releases/latest/download/QC-Minivan-Owners.apk";
