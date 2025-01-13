import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const response = {
        message: "hoho",
        data: 'hello',
    }
    return NextResponse.json(response, { status: 200 });
}