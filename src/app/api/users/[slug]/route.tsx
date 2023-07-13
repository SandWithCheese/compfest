import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: { slug: string } }){
    const username = params.slug;
    const user = await prisma.user.findUnique({
        where: {
            email: username,
        },
    });

    if (!user) {
        return new NextResponse("No user found", { status: 404 });
    }


    const {password, ...userWithoutPass} = user
    return NextResponse.json(userWithoutPass);
}