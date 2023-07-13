import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(
    request: Request,
    { params }: { params: { slug: string } }
  ) {
    const username = params.slug;
    let json = await request.json();
  
    const updated_user = await prisma.user.update({
      where: {
        email: username,
      },
      data: {
        balance: {
            increment: json.balance
        }
      }
    });
  
    if (!updated_user) {
      return new NextResponse("No user with ID found", { status: 404 });
    }
  
    return NextResponse.json(updated_user);
}