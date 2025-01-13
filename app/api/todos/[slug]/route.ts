import { NextRequest, NextResponse } from "next/server";

// fetching single data 
export async function GET(request: NextRequest,
    { params }: { params: { slug: string } }) {
    const searchParams = request.nextUrl.searchParams

    const search = searchParams.get('search')
    const response = {
        message: "recive api data successfully",
        data: {
            id: params.slug,
            title: "today ",
            is_done: false,
            query: search,
        },
    }
    return NextResponse.json(response, { status: 200 });
}
// delete single data
export async function DELETE(request: NextRequest,
    { params }: { params: { slug: string } }) {

    const response = {
        message: "Single data  removed successfully",
        data: {
            id: params.slug,
            title: "today to do list",
            is_done: false,
        }
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