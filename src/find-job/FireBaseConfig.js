import {initializeApp} from "firebase/app";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyANMiV00MfuVTJ1tkmm3nT3Je6qGlAVLEY",
    authDomain: "kob-findjob.firebaseapp.com",
    projectId: "kob-findjob",
    storageBucket: "kob-findjob.appspot.com",
    messagingSenderId: "401351368278",
    appId: "1:401351368278:web:7d21facd9dd90a3689e5f7",
    measurementId: "G-GG9H3WNX9F"
};

initializeApp(firebaseConfig);

const storage = getStorage()
export default storage;
