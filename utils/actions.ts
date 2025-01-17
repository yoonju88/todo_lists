export const addListAction = async (input: string) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/todos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Content-Type 추가
            },
            body: JSON.stringify({
                title: input,
            }),
            cache: 'no-store',
        })
        if (!response.ok) {
            throw new Error(`Failed to add todo: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error adding todo:', error);
        throw error; // 에러 처리
    }
}

export const editListAction = async (
    id: string,
    editedTitle: string,
    editedIsDone: boolean
) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/todos/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Content-Type 추가
            },
            body: JSON.stringify({
                title: editedTitle,
                is_done: editedIsDone
            }),
            cache: 'no-store',
        })
        if (!response.ok) {
            throw new Error(`Failed to edit todo: ${response.statusText}`);
        }
        return await response.json(); // 응답 결과를 반환
    } catch (error) {
        console.error('Error editing todo:', error);
        throw error; // 에러 처리
    }
}

export const deleteListAction = async (
    id: string
) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/todos/${id}`, {
            method: 'DELETE',
            cache: 'no-store',
        })
        if (!response.ok) {
            throw new Error(`Failed to delete todo: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error deleting todo:', error);
        throw error; // 에러 처리
    }
}
