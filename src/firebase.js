import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyAQUuS1Kpn5pxXHsEWaVJGJYBbwfEQRk2U',
    authDomain: 'student-crud-8b49b.firebaseapp.com',
    projectId: 'student-crud-8b49b',
    storageBucket: 'student-crud-8b49b.appspot.com',
    messagingSenderId: '695339421607',
    appId: '1:695339421607:web:f0e0eec6b2e6a31bc37082',
    measurementId: 'G-BKW0STHWWS',
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
