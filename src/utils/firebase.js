import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCAVN9xNa-bBNqxay8F5Hnbp4MIbk6eI7I",
    authDomain: "ferramentas-ve.firebaseapp.com",
    projectId: "ferramentas-ve",
    storageBucket: "ferramentas-ve.appspot.com",
    messagingSenderId: "180825406497",
    appId: "1:180825406497:web:df580c19a3b2262324b760",
    measurementId: "G-D0485WHLXT"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

getAnalytics(app);

export {
    auth, 
    db
};