import { NextRequest, NextResponse } from "next/server";
import { fetchATodo, deleteATodo } from "@/data/firestore";

// Fetching single data 
export async function GET(request: NextRequest,
    { params }: { params: { slug: string } }) {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('query')
    const fetchedTodo = await fetchATodo(params.slug)
    if (!fetchedTodo) {
        return NextResponse.json(null, { status: 204 })
    }
    const response = {
        message: "recived a todo data successfully",
        data: fetchedTodo
    }
    return NextResponse.json(response, { status: 200 });
}

// Delete single data
export async function DELETE(request: NextRequest,
    { params }: { params: { slug: string } }) {
    const deletedATodo = await deleteATodo(params.slug)
    if (!deletedATodo) {
        return NextResponse.json(null, { status: 204 })
    }
    const response = {
        message: "Single data removed successfully",
        data: deletedATodo
    }
    return NextResponse.json(response, { status: 200 });
}

// update single data
export async function POST(request: NextRequest,
    { params }: { params: { slug: string } }) {
    const { title, is_done } = await request.json()

    const updatedTodo = {
        id: params.slug,
        title,
        is_done
    }

    const response = {
        message: "Updated single data successfully",
        data: updatedTodo
    }
    return NextResponse.json(response, { status: 200 });
}