import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
};

class Firebase {
    constructor() {
        app.initializeApp(config).firestore();

        this.googleAuthProvider = new app.auth.GoogleAuthProvider();

        this.auth = app.auth();
        this.db = app.firestore();
    }

    doSignInWithGoogle = () =>
        this.auth.signInWithPopup(this.googleAuthProvider);

    doSignOut = () =>
        this.auth.signOut();

    getUserData = (uid) =>
        this.db.doc(`/users/${uid}`)
}

export default Firebase;