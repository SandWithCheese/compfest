import prisma from "@/lib/prisma"

interface RequestBody {
    username: string
    
}

export async function POST(request: Request){
    const body:RequestBody = await request.json()

    const user = await prisma.user.create({
        data:{
            name: body.username,
            email: body.email,
            password: await bcrypt.hash(body.password, 10)
        }
    })

    const {password, ...result} = user
    return new Response(JSON.stringify(result))
}