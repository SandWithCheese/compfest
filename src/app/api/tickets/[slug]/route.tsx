import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: { slug: string } }){
    const username = params.slug;
    const user = await prisma.user.findUnique({
        where: {
            email: username,
        },
        include: {
            tickets: true
        }
    })

    if (!user) {
        return new NextResponse("No user found", { status: 404 });
    }


    const {password, ...userWithoutPass} = user
    return NextResponse.json(userWithoutPass);
}

export async function POST(request: Request, { params }: { params: { slug: string } }){
    const body = await request.json()

    body.seat.sort((a: number, b: number) => a - b)

    const ticket = await prisma.ticket.create({
        data:{
            title: params.slug,
            seat: body.seat,
            price: body.price,
            bookerId: body.bookerId
        }
    })

    return new Response(JSON.stringify(ticket))
}

export async function DELETE(request: Request, { params }: { params: { slug: string } }){
    const body = await request.json()

    await prisma.ticket.delete({
        where: {
            id: body.id
        }
    })

    return new NextResponse(null)
}