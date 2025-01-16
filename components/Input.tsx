'use client'
import {
    Input,
    Button,
    Popover,
    PopoverTrigger,
    PopoverContent,
    Spinner,
} from "@nextui-org/react";
import { useState } from "react"
import { useRouter } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';

export default function AddInput() {
    const [isEnable, setIsEnable] = useState(false)
    const [newTodoInput, setNewTodoInput] = useState('')
    //  인풋에 글자를 넣으면 버튼의 색이 활성화 되로독 하는 코드
    const router = useRouter()
    const [isLoading, setIsLoading] = useState<Boolean>(false)

    const addAListHandler = async (newTodoInput: string) => {
        if (!isEnable) { return }
        setIsLoading(true)
        await new Promise(f => setTimeout(f, 1000))
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/todos`, {
            method: 'post',
            body: JSON.stringify({
                title: newTodoInput
            }),
            cache: 'no-store'
        })
        setNewTodoInput('')
        router.refresh()
        setIsLoading(false)
        setIsEnable(false)
        notify("To do list added successfully!👏🏼")
    }
    const notify = (msg: string) => toast.success(msg);

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
        </>
    );
}