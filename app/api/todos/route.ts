import { NextRequest, NextResponse } from "next/server";
import dummyTodos from '@/data/dummy.json';

//fetch all data lists
export async function GET(request: NextRequest) {
    const response = {
        message: "request all data.",
        data: dummyTodos,
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

export async function GET(request: NextRequest) {
    const response = {
        message: "request dummy data.",
        data: dummyTodos,
    }
    return NextResponse.json(response, { status: 200 });
}