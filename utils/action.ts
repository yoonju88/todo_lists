export const addListAction = async (input: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/todos`, {
        method: 'post',
        body: JSON.stringify({
            title: input,
        }),
        cache: 'no-store',
    })
}

export const editListAction = async (
    id: string,
    editedTitle: string,
    editedIsDone: boolean
) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/todos/${id}`, {
        method: 'post',
        body: JSON.stringify({
            title: editedTitle,
            is_done: editedIsDone
        }),
        cache: 'no-store',
    })
}

export const deleteListAction = async (
    id: string,
) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/todos/${id}`, {
        method: 'delete',
        cache: 'no-store',
    })
}