
import { title } from "@/components/primitives";
import TodosTable from "@/components/Table";

async function fetchTodosApi() {
  const response = await fetch(`${process.env.BASE_URL}/api/todos/`, { cache: 'no-store' })
  const contentTypeHeaderValue = response.headers.get('Content-Type')
  if (contentTypeHeaderValue?.includes("text/html")) return null;
  return response.json()
}

export default async function TodosPage() {
  const response = await fetchTodosApi()
  const todoLists = response?.data ?? []

  return (
    <div className="flex flex-col space-y-10">
      <h1 className={title()}>To Do List</h1>
      <TodosTable todos={todoLists} />
    </div>
  );
}
