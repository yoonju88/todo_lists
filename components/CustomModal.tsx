'use client'
import React, { useState, useEffect } from 'react'
import {
    Button,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Input,
    Switch,
    CircularProgress
} from "@nextui-org/react";
import { Todo, FocusedTodoType, CustomModalType } from "@/types"

interface CustomModalProps {
    focusedTodo: Todo,
    modalType: CustomModalType,
    onCloseAction: () => void,
    onEditAction: (id: string, title: string, isDone: boolean) => void
    onDeleteAction: (id: string) => void
}

export default function CustomModal({ focusedTodo, modalType, onCloseAction, onEditAction, onDeleteAction }: CustomModalProps) {
    const [isDone, setIsDone] = useState(focusedTodo.is_done)
    const [inputValue, setInputValue] = useState<string>(focusedTodo.title)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsDone(focusedTodo.is_done)
    }, [focusedTodo.is_done])

    const formatDate = focusedTodo.created_at.toLocaleString()

    const DetailModal = () => {
        return (
            <>
                <ModalHeader className="flex flex-col gap-1">TO DO LIST DETAIL</ModalHeader>
                <ModalBody>
                    <div className=' flex flex-col space-y-3'>
                        <p><span className="font-bold capitalize">id :</span> {focusedTodo.id}</p>
                        <p>
                            <span className="font-bold"> Status : </span>
                            {isDone ? ' Is done' : ' To do'}
                        </p>
                        <p className="flex items-center space-x-2">
                            <span className="font-bold"> Created at : </span>
                            {formatDate}
                        </p>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onPress={onCloseAction}>
                        Close
                    </Button>
                </ModalFooter>
            </>
        )
    }

    const EditModal = () => {
        return (
            <>
                <ModalHeader className="flex flex-col gap-1 uppercase">Edit to do list</ModalHeader>
                <ModalBody>
                    <p><span className="font-bold">id :</span> {focusedTodo.id}</p>
                    <Input
                        isRequired
                        label="To Do List"
                        placeholder="Enter the to do list."
                        defaultValue={focusedTodo.title}
                        variant="bordered"
                        value={inputValue}
                        onValueChange={setInputValue}
                    />
                    <div className="flex items-center space-x-2">
                        <p className="font-bold"> Status : </p>
                        <Switch
                            isSelected={isDone}
                            color="secondary"
                            onValueChange={setIsDone}
                            className='transition-all duration-300'
                        />
                        <p> {isDone ? 'Is done' : 'To do'} </p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <p className="font-bold"> Created at : </p>
                        <p>{formatDate}</p>
                    </div>
                </ModalBody >
                <ModalFooter>
                    <Button color="secondary" variant="flat" onPress={() => {
                        setIsLoading(true)
                        onEditAction(focusedTodo.id, inputValue, isDone)
                    }}>
                        {isLoading ?
                            <CircularProgress
                                size="sm"
                                color="secondary"
                                aria-label="Loading..."
                            /> : 'Edit'
                        }
                    </Button>
                    <Button color="secondary" onPress={onCloseAction}>
                        Close
                    </Button>
                </ModalFooter>
            </>
        )
    }

    const DeleteModal = () => {
        return (
            <>
                <ModalHeader className="flex flex-col gap-1 capitalize">Remove to do list.</ModalHeader>
                <ModalBody>
                    <div className=' flex flex-col space-y-3'>
                        <p><span className="font-bold capitalize">id :</span> {focusedTodo.id}</p>
                        <p>
                            <span className="font-bold"> Status : </span>
                            {isDone ? ' Is done' : ' To do'}
                        </p>
                        <p className="flex items-center space-x-2">
                            <span className="font-bold"> Created at : </span>
                            {formatDate}
                        </p>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" variant="light" onPress={() => {
                        setIsLoading(true)
                        onDeleteAction(focusedTodo.id)
                    }}>
                        {isLoading ?
                            <CircularProgress
                                size="sm"
                                color="danger"
                                aria-label="Loading..."
                            /> : 'Delete'
                        }
                    </Button>
                    <Button color="secondary" onPress={onCloseAction}>
                        Close
                    </Button>
                </ModalFooter>
            </>
        )
    }

    const getModal = (type: CustomModalType) => {
        switch (type) {
            case 'detail':
                return <DetailModal />
            case 'edit':
                return <EditModal />
            case 'delete':
                return <DeleteModal />
            default:
                return null;
        }
    }
    return <>{getModal(modalType)}</>
}
