import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCmOwuJ9fEHnPXZODMcotj4dr2qWszZta4",
  authDomain: "retro-rocket-db872.firebaseapp.com",
  projectId: "retro-rocket-db872",
  storageBucket: "retro-rocket-db872.firebasestorage.app",
  messagingSenderId: "694718555028",
  appId: "1:694718555028:web:04db9e7340bb3b4e81e581",
  measurementId: "G-LN4JGGV1JV"
  };  

export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);