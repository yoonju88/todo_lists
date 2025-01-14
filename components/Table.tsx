"use client"
import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import { Todo } from "@/types"
// 한줄 복사 :  shift + option + 화살표 아래 
export default function TodosTable({ todos }: { todos: Todo[] }) {
  return (
    <Table aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>ID</TableColumn>
        <TableColumn>TITLE</TableColumn>
        <TableColumn>IS DONE</TableColumn>
        <TableColumn>CREATED AT</TableColumn>
      </TableHeader>
      <TableBody emptyContent={"No rows to display"}>
        {todos && todos.map((todo: Todo) => (
          <TableRow key={todo.id}>
            <TableCell>{todo.id.slice(0, 3)}</TableCell>
            <TableCell>{todo.title}</TableCell>
            <TableCell>{todo.is_done ? "✅" : "☑️"}</TableCell>
            <TableCell>{`${todo.created_at}`}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
