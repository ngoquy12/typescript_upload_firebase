import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB2OwQDxKshyUVde5QYSXLJo_5Urar7Vbw",
  authDomain: "js-230214.firebaseapp.com",
  projectId: "js-230214",
  storageBucket: "js-230214.appspot.com",
  messagingSenderId: "766795966889",
  appId: "1:766795966889:web:d87d62cba1a96274883cb8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const store = getStorage(app);

export { store };
