import { NextRequest, NextResponse } from "next/server";
import { fetchAllTodos } from '@/data/firestore'

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
    const newTodo = {
        id: "10",
        title,
        is_done: false
    }

    const response = {
        message: 'added to do list successfully',
        data: newTodo
    }

    return NextResponse.json(response, { status: 201 });
}