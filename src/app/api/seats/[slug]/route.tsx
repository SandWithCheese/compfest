import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: { slug: string } }){
    const title = params.slug

    const seats = await prisma.ticket.findMany({
        where: {
            title: title
        },
    })

    let occupied: number[] = []
    seats.forEach(seat => {
        seat.seat.forEach(s => {
            occupied.push(s)
        })
    })

    return NextResponse.json(occupied);
}

