import { title } from "@/components/primitives";
import TodosTable from "@/components/Table";
import { fetchAllTodos } from "@/data/firestore";

async function fetchTodosApi() {
  const response = await fetch(`${process.env.BASE_URL}/api/todos/`)
  return response.json()
}

export default async function TodosPage() {
  const todoLists = await fetchTodosApi()

  return (
    <div className="flex flex-col space-y-10">
      <h1 className={title()}>To Do List</h1>
      <TodosTable todos={todoLists.data ?? []} />
    </div>
  );
}
