import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

//fetch all data list of todolists from firestore
export async function fetchAllTodos() {
    const querySnapshot = await getDocs(collection(db, "todos")); // "todos" = name of collection from firestore Database
    if (querySnapshot.empty) { return [] }
    const fetchedTodos = [];

    querySnapshot.forEach((doc) => {
        const aTodo = {
            id: doc.id,
            title: doc.data()["title"],
            is_done: doc.data()["is_done"],
            created_at: doc.data()["created_at"].toDate()// to display hour : add `.toLocaleTimeString('eu')` end of the code
        }
        fetchedTodos.push(aTodo)
    });
    return fetchedTodos;
}
module.exports = { fetchAllTodos };
