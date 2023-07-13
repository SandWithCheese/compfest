"use client"

import { Button } from "@/components/ui/button"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

import { useEffect, useRef, useState } from "react"
import { useSession } from 'next-auth/react'
import { error } from "console"

interface userData {
    id: string
    email: string
    name: string
    balance: number
}


const Balance = () => {    
    const {data: session} = useSession()
    const [user, setUser] = useState<userData>({
        id: "",
        email: "",
        name: "",
        balance: 0
    })
    const topup = useRef(0)
    const withdraw = useRef(0)

    useEffect(() => {
        if (session && session.user){
            fetch(`/api/users/${session.user.email}`)
            .then(response => response.json())
            .then(data => setUser(() => data))
        }
    }, [session]);

    const topupHandler = async (e: any) => {
        e.preventDefault()
        const formURL = e.target.action
        await fetch(formURL, {
            method: "PATCH",
            body: JSON.stringify({balance: topup.current}),
            headers: {
                "accept": "application/json"
            }
        })
        
        window.location.reload()
    }
    
    const withdrawHandler = async (e: any) => {
        e.preventDefault()
        const formURL = e.target.action
        if (user.balance >= withdraw.current && withdraw.current <= 500_000){
            await fetch(formURL, {
                method: "PATCH",
                body: JSON.stringify({balance: withdraw.current}),
                headers: {
                    "accept": "application/json"
                }
            })
            window.location.reload()
        }else{
            alert("Saldo Kurang")
        }
    }

    return (
        <div>
            <Tabs defaultValue="topup" className="min-[480px]:w-[400px] mx-auto">
            <TabsList className="grid w-full grid-cols-2 bg-secondary">
                <TabsTrigger value="topup">Top Up</TabsTrigger>
                <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
            </TabsList>
            <TabsContent value="topup">
                <Card>
                <CardHeader>
                    <CardTitle className='text-center'>Saldo</CardTitle>
                </CardHeader>
                <form action={`/api/balance/topup/${user.email}`} method="patch" onSubmit={topupHandler}>
                    <CardContent className="space-y- text-center">
                            <div className="space-y-1">
                                <h3>{new Intl.NumberFormat("id-ID", {style: "currency", currency: "IDR"}).format(user.balance)}</h3>
                            </div>
                            <div className="space-y-1 mt-8">
                                <Input type="number" id="topup" placeholder="Top Up" className="bg-foreground text-background" onChange={(e) => topup.current = parseInt(e.target.value)}/>
                            </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" className='mx-auto'>Top Up</Button>
                    </CardFooter>
                </form>
                </Card>
            </TabsContent>
            <TabsContent value="withdraw">
                <Card>
                <CardHeader>
                    <CardTitle className='text-center'>Saldo</CardTitle>
                </CardHeader>
                <form action={`/api/balance/withdraw/${user.email}`} method="patch" onSubmit={withdrawHandler}>
                    <CardContent className="space-y-2 text-center">
                            <div className='space-y-1 mb-8'>
                                <h3>{new Intl.NumberFormat("id-ID", {style: "currency", currency: "IDR"}).format(user.balance)}</h3>
                            </div>
                            <div className="space-y-1">
                                <Input id="withdraw" type="number" placeholder="Withdraw" className="bg-foreground text-background" onChange={(e) => withdraw.current = parseInt(e.target.value)}/>
                            </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" className='mx-auto'>Withdraw</Button>
                    </CardFooter>
                </form>
                </Card>
            </TabsContent>
            </Tabs>
        </div>
    )
}

export default Balance