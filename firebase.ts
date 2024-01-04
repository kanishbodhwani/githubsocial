import { initializeApp } from 'firebase/app';
import { getAuth , GoogleAuthProvider, initializeAuth, getReactNativePersistence} from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDe8oC8fSBqZ8cHakhc-cD5AlxHtaIELtQ",
  authDomain: "githubsocial-ae400.firebaseapp.com",
  projectId: "githubsocial-ae400",
  storageBucket: "githubsocial-ae400.appspot.com",
  messagingSenderId: "799730912381",
  appId: "1:799730912381:web:5bdcaa880eb5549c3bf514"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const provider = new GoogleAuthProvider();
export const auth = getAuth(app);