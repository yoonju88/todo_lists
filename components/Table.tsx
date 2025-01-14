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
      <TableBody>
        {todos && todos.map((todo: Todo) => {
          return (
            <TableRow key="1">
              <TableCell>1</TableCell>
              <TableCell>CEO</TableCell>
              <TableCell>Active</TableCell>
              <TableCell>HOHO</TableCell>
            </TableRow>
          )
        })
        }
      </TableBody>
    </Table>
  );
}
