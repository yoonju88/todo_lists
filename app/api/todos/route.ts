import { NextRequest, NextResponse } from "next/server";
import { fetchAllTodos, addATodo } from '@/data/firestore'

//fetch all data lists
export async function GET(request: NextRequest) {
    const fetchedAllTodos = await fetchAllTodos()
    const response = {
        message: "request all data.",
        data: fetchedAllTodos,
    }
    return NextResponse.json(response, { status: 200 });
}

// Add to do list
export async function POST(request: NextRequest) {
    const { title } = await request.json()
    if (!title) {

        const errorMessage = { message: 'The title is not exist.' }
        return NextResponse.json(errorMessage, { status: 404 });
    }
    const addedTodo = await addATodo({ title })
    const response = {
        message: 'added to do list successfully',
        data: addedTodo
    }
    return NextResponse.json(response, { status: 200 });
}