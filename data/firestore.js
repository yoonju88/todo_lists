import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
  setDoc,
  Timestamp,
  deleteDoc,
  updateDoc,
  query,
  orderBy,
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
  const todosRef = collection(db, "todos");
  const descQuery = query(todosRef, orderBy("created_at", "desc"));
  const querySnapshot = await getDocs(descQuery); // "todos" = name of collection from firestore Database

  if (querySnapshot.empty) {
    return [];
  }
  const fetchedTodos = [];

  querySnapshot.forEach((doc) => {
    const aTodo = {
      id: doc.id,
      title: doc.data()["title"],
      is_done: doc.data()["is_done"],
      created_at: doc.data()["created_at"].toDate(), // to display hour : add `.toLocaleTimeString('eu')` end of the code
    };

    fetchedTodos.push(aTodo);
  });

  return fetchedTodos;
}

export async function addATodo({ title }) {
  const newTodoRef = doc(collection(db, "todos"));
  const createdAtTimestamp = Timestamp.fromDate(new Date());
  const newTodoData = {
    id: newTodoRef.id,
    title: title,
    is_done: false,
    created_at: createdAtTimestamp,
  };

  await setDoc(newTodoRef, newTodoData);

  return {
    id: newTodoRef.id,
    title: title,
    is_done: false,
    created_at: createdAtTimestamp.toDate(),
  };
}
// fetch single data
export async function fetchATodo(id) {
  const todoDocRef = doc(db, "todos", id);
  const todoDocSnap = await getDoc(todoDocRef);

  if (!todoDocSnap.exists()) {
    return null;
  }
  const data = todoDocSnap.data();

  if (!data) {
    return null;
  }

  return {
    id: todoDocSnap.id,
    title: data["title"] || "Untitled", //
    is_done: data["is_done"] ?? false, //
    created_at: data["created_at"] ? data["created_at"].toDate() : null,
  };
}

// Delete a todo list
export async function deleteATodo(id) {
  const fetchedATodo = await fetchATodo(id);

  if (!fetchATodo) {
    return null;
  }
  await deleteDoc(doc(db, "todos", id));

  return fetchATodo;
}

// update a todo information
export async function updateATodo(id, { title, is_done }) {
  const fetchedTodo = await fetchATodo(id);

  if (!fetchedTodo) {
    return null;
  }
  const todoRef = doc(db, "todos", id);
  // 업데이트할 데이터 준비
  const updateData = {};

  // title과 is_done이 undefined가 아니면 업데이트 데이터에 추가
  if (title !== undefined) {
    updateData.title = title;
  }
  if (is_done !== undefined) {
    updateData.is_done = is_done;
  }
  // updateDoc 실행 (Firestore에 업데이트 적용)
  await updateDoc(todoRef, updateData);
  // 업데이트된 문서를 다시 가져와 최신 데이터를 반환합니다.
  const updatedTodoSnap = await getDoc(todoRef);
  const updatedTodo = updatedTodoSnap.data();

  // 업데이트된 데이터를 반환합니다. 없으면 기본값으로 기존 데이터를 사용합니다.
  return {
    id: id,
    title: updatedTodo?.title || fetchedTodo.title,
    is_done: updatedTodo?.is_done ?? fetchedTodo.is_done, // is_done이 업데이트되지 않으면 기존 값을 사용
    created_at: fetchedTodo.created_at,
  };
}

module.exports = {
  fetchAllTodos,
  addATodo,
  fetchATodo,
  deleteATodo,
  updateATodo,
};
