"use client"

import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface userData {
    id: string
    email: string
    name: string
    balance: number
    tickets: [ticketData]
}

interface ticketData {
    id: string,
    title: string,
    seat: [],
    price: number,
    bookerId: string
}

const History = () => {
    const {data: session} = useSession()
    const [user, setUser] = useState<userData>({
        id: "",
        email: "",
        name: "",
        balance: 0,
        tickets: [{
            id: "",
            title: "",
            seat: [],
            price: 0,
            bookerId: ""
        }]
    })

    const router = useRouter()

    useEffect(() => {
        if (session && session.user){
            fetch(`/api/tickets/${session.user.email}`)
            .then(response => response.json())
            .then(data => setUser(() => data))
        }
    }, [session])


    const cancel = async (ticket: any) => {
        await fetch(`/api/tickets/${ticket.title}`, {
            method: "DELETE",
            body: JSON.stringify({
                id: ticket.id
            })
        })

        await fetch(`/api/balance/topup/${session?.user?.email}`, {
            method: "PATCH",
            body: JSON.stringify({balance: ticket.price}),
            headers: {
                "accept": "application/json"
            }
        })

        window.location.reload()
    }

    return (
        <div>
            <div>
                <h2>Histori Pembelian</h2>
                {user.tickets.length > 0 ? (
                    <div>
                        {user.tickets.map((ticket, index) => (
                            <div key={index}>
                                <hr className="my-4 bg-foreground h-1" />
                                <div className="flex justify-between">
                                    <div className="flex flex-col gap-2">
                                        <p>{ticket.title}</p>
                                        <p>Kursi: {ticket.seat.map(num => num+1).join(", ")}</p>
                                        <p>Harga: {new Intl.NumberFormat("id-ID", {style: "currency", currency: "IDR"}).format(ticket.price)}</p>
                                    </div>
                                    <Button className="self-center" onClick={() => cancel(ticket)}>Cancel</Button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : <p className="my-4">No Data</p>}
            </div>
            <Footer/>
        </div>
    )
}

export default History