"use client"
import React, { useState } from "react";
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
  Pagination,
} from "@nextui-org/react";
import { Todo, FocusedTodoType, CustomModalType } from "@/types"
import { VerticalDotsIcon } from './icons'
import CustomModal from "./CustomModal";
import { useRouter } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';
import { addListAction, editListAction, deleteListAction } from '@/utils/action'

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
  const [page, setPage] = React.useState(1)

  const rowsPerPage = 6;
  const pages = Math.ceil(todos.length / rowsPerPage)
  const todoList = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return todos.slice(start, end)
  }, [page, todos])


  const notify = (msg: string) => toast.success(msg);
  const promise = new Promise((resolve) => setTimeout(() => resolve("done"), 1300))

  const addAListHandler = async (newTodoInput: string) => {
    if (!isEnable) return
    setIsLoading(true)
    try {
      await promise;
      await addListAction(newTodoInput)
      notify("To do list added successfully!👏🏼")
    } catch (error) {
      notify("Failed add a to do list.")
    }
    setIsLoading(false)
    router.refresh()
    setNewTodoInput('')
    setIsEnable(false)
  }

  const EditTodoHandler = async (
    id: string,
    editedTitle: string,
    editedIsDone: boolean,
  ) => {
    setIsLoading(true)
    try {
      await promise;
      await editListAction(id, editedTitle, editedIsDone)
      notify("To do list edited successfully!👏🏼")
    } catch (error) {
      notify("Failed edit a to do list.")
    }
    setIsLoading(false)
    router.refresh()
  }

  const DeleteTodoHandler = async (id: string) => {
    setIsLoading(true)
    try {
      await promise;
      await deleteListAction(id);
      notify("To do list deleted successfully!👏🏼")
    } catch (error) {
      notify("Failed delete a to do list.")
    }
    setIsLoading(false)
    router.refresh()
  }

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
                onEditAction={async (id, title, isDone) => {
                  // console.log(id, title, isDone)
                  await EditTodoHandler(id, title, isDone)
                  onClose()
                }}
                onDeleteAction={(id) => {
                  DeleteTodoHandler(id)
                  onClose()
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
      <Table
        aria-label="Example static collection table"
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="secondary"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        }
        classNames={{ wrapper: "min-h-[220px]", }}
      >
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>TITLE</TableColumn>
          <TableColumn>STATUS</TableColumn>
          <TableColumn>CREATED AT</TableColumn>
          <TableColumn>ACTION</TableColumn>
        </TableHeader>
        <TableBody
          emptyContent={"No rows to display"}
          items={todoList}
        >
          {todoList && todoList.map((todo: Todo) => {
            const textDeco = `${todo.is_done ? "line-through text-slate-400" : ""}`
            return (
              <TableRow key={todo.id}>
                <TableCell className={textDeco}>{todo.id.slice(0, 3)}</TableCell>
                <TableCell className={textDeco}>{todo.title}</TableCell>
                <TableCell>{todo.is_done ? "✅" : "☑️"}</TableCell>
                <TableCell className={textDeco}>{`${todo.created_at}`}</TableCell>
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
            )
          })}
        </TableBody>
      </Table>
    </>
  );
}
