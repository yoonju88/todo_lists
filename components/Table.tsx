"use client"
import React, { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalContent,
  useDisclosure,
  Input,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Spinner,
} from "@nextui-org/react";
import { Todo, FocusedTodoType, CustomModalType } from "@/types"
import { VerticalDotsIcon } from './icons'
import CustomModal from "./CustomModal";
import { useRouter } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';

// 한줄 복사 :  shift + option + 화살표 아래 
export default function TodosTable({ todos }: { todos: Todo[] }) {
  const router = useRouter()
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isEnable, setIsEnable] = useState(false)
  const [newTodoInput, setNewTodoInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [currentModal, setCurrentModal] = useState<FocusedTodoType>({
    focusedTodo: null,
    modalType: "detail" as CustomModalType,
  })
  const notify = (msg: string) => toast.success(msg);

  const hadleTodoRequest = async (url: string, method: string, body: object) => {
    setIsLoading(true)
    await new Promise(f => setTimeout(f, 500))
    const response = await fetch(url, {
      method,
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store'
    })
    setIsLoading(false)
    router.refresh()
  }

  const addAListHandler = async (newTodoInput: string) => {
    if (!isEnable) return
    await hadleTodoRequest(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/todos`,
      'POST',
      { title: newTodoInput }
    )
    setNewTodoInput('')
    setIsEnable(false)
    notify("To do list added successfully!👏🏼")
  }

  const EditTodoHandler = async (id: string, editedTitle: string,
    editedIsDone: boolean) => {
    await hadleTodoRequest(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/todos/${id}`,
      'POST',
      { title: editedTitle, is_done: editedIsDone }
    )
    notify("To do list edited successfully!👏🏼")
  }

  const DeleteTodoHandler = async (id: string) => {
    setIsLoading(true)
    await new Promise(f => setTimeout(f, 500))
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/todos/${id}`, {
      method: 'delete',
      cache: 'no-store'
    })
    router.refresh()
    setIsLoading(false)
    notify("To do list deleted successfully!👏🏼")
  }

  useEffect(() => {
    if (currentModal.focusedTodo) {
      onOpen(); // 모달이 열려야 할 때 onOpen 호출
    }
  }, [currentModal.focusedTodo]);

  const ModalView = () => {
    return (
      < Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange} >
        <ModalContent>
          {(onClose) => (
            (currentModal.focusedTodo &&
              <CustomModal
                focusedTodo={currentModal.focusedTodo}
                modalType={currentModal.modalType}
                onCloseAction={onClose}
                onEditAction={(id, title, isDone) => {
                  // console.log(id, title, isDone)
                  EditTodoHandler(id, title, isDone)
                  onClose()
                }}
                onDeleteAction={(id) => {
                  DeleteTodoHandler(id)
                }}
              />
            )
          )}
        </ModalContent>
      </Modal >
    )
  }
  return (
    <>
      <span>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </span>
      <div className="flex w-full md:flex-nowrap gap-4">
        <Input
          label="New to do list"
          type="text"
          value={newTodoInput}
          onValueChange={(e) => {
            setNewTodoInput(e)
            setIsEnable(e.length > 0)
          }
          }
        />
        {isEnable ? (
          <Button
            color="secondary"
            className="h-14"
            onPress={async () => { await addAListHandler(newTodoInput) }}
          >
            {isLoading ? (<Spinner color="warning" size="sm" />) : 'Add'}
          </Button>
        ) : (
          < Popover placement="bottom-start" >
            <PopoverTrigger>
              <Button color="default" className="h-14">
                Add
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <div className="px-1 py-2">
                <div className="text-small font-normal">Please note the to do list.</div>
              </div>
            </PopoverContent>
          </Popover >
        )}
      </div >
      <ModalView />
      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>TITLE</TableColumn>
          <TableColumn>STATUS</TableColumn>
          <TableColumn>CREATED AT</TableColumn>
          <TableColumn>ACTION</TableColumn>
        </TableHeader>
        <TableBody emptyContent={"No rows to display"}>
          {todos && todos.map((todo: Todo) => (
            <TableRow key={todo.id}>
              <TableCell>{todo.id.slice(0, 3)}</TableCell>
              <TableCell>{todo.title}</TableCell>
              <TableCell>{todo.is_done ? "✅" : "☑️"}</TableCell>
              <TableCell>{`${todo.created_at}`}</TableCell>
              <TableCell>
                <div className="relative flex justify-end items-center gap-2">
                  <Dropdown>
                    <DropdownTrigger>
                      <Button isIconOnly size="sm" variant="light">
                        <VerticalDotsIcon className="text-default-300" />
                      </Button>
                    </DropdownTrigger >
                    <DropdownMenu
                      onAction={(key) => {
                        // console.log(`todo.id: ', ${todo.id} / key : , ${key}`)
                        setCurrentModal({
                          focusedTodo: todo,
                          modalType: key as CustomModalType,
                        });
                        onOpen();
                      }}
                    >
                      <DropdownItem key="detail">Detail</DropdownItem>
                      <DropdownItem key="edit">Edit</DropdownItem>
                      <DropdownItem key="delete">Delete</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
