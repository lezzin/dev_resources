const firebaseConfig = {
    apiKey: "AIzaSyCAVN9xNa-bBNqxay8F5Hnbp4MIbk6eI7I",
    authDomain: "ferramentas-ve.firebaseapp.com",
    projectId: "ferramentas-ve",
    storageBucket: "ferramentas-ve.appspot.com",
    messagingSenderId: "180825406497",
    appId: "1:180825406497:web:df580c19a3b2262324b760",
    measurementId: "G-D0485WHLXT"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebaseApp.auth();
const db = firebaseApp.firestore();
const analytics = firebaseApp.analytics();

export {
    auth,
    db,
};