import { initializeApp } from "firebase/app";
import {
    getFirestore,
    collection,
    getDocs,
    getDoc,
    doc,
    setDoc,
    Timestamp,
    deleteDoc
} from "firebase/firestore";

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

//Fetch all data list of todolists from firestore
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

export async function addATodo({ title }) {
    const newTodoRef = doc(collection(db, "todos"))
    const createdAtTimestamp = Timestamp.fromDate(new Date())
    const newTodoData = {
        id: newTodoRef.id,
        title: title,
        is_done: false,
        created_at: createdAtTimestamp
    }
    await setDoc(newTodoRef, newTodoData)
    return {
        id: newTodoRef.id,
        title: title,
        is_done: false,
        created_at: createdAtTimestamp.toDate(),
    }
}
// fetch single data
export async function fetchATodo(id) {
    const todoDocRef = doc(db, "todos", id);
    const todoDocSnap = await getDoc(todoDocRef);
    if (!id) { return null }
    if (todoDocSnap.exists()) {
        const fetchedTodo = {
            id: todoDocSnap.id,
            title: todoDocSnap.data()["title"],
            is_done: todoDocSnap.data()["is_done"],
            created_at: todoDocSnap.data()["created_at"].toDate()
        }
        return fetchedTodo;
    } else {
        return null;
    }
}

export async function deleteATodo(id) {
    const fetchedATodo = await fetchATodo(id)
    if (!fetchATodo) {
        return null;
    }
    await deleteDoc(doc(db, "todos", id));
    return fetchATodo
}

module.exports = { fetchAllTodos, addATodo, fetchATodo, deleteATodo };
