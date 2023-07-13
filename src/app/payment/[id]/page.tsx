"use client"

import { useEffect, useState } from "react"
import { usePathname, useRouter } from 'next/navigation'
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { spawn } from "child_process"


interface MovieObject {
  id: number,
  title: string,
  description: string,
  release_date: string,
  poster_url: string,
  age_rating: number,
  ticket_price: number,
}

interface userData {
  id: string
  email: string
  name: string
  balance: number
}

const seats = Array.from({ length: 8 * 8 }, (_, i) => i)


function Cinema({ occupiedSeats, selectedSeats, onSelectedSeatsChange } : any) {
  function handleSelectedState(seat: any) {
    const isSelected = selectedSeats.includes(seat)
    if (isSelected) {
      onSelectedSeatsChange(
        selectedSeats.filter((selectedSeat:any) => selectedSeat !== seat),
      )
    } else {
      onSelectedSeatsChange([...selectedSeats, seat])
    }
  }

  return (
    <div className="Cinema">
      <div className="screen" />

      <div className="grid grid-cols-[repeat(16,_1fr)] gap-8 overflow-y-hidden overflow-x-auto">
        {seats.map(seat => {
          const isSelected = selectedSeats.includes(seat)
          const isOccupied = occupiedSeats.includes(seat)
          return (
            <span
              tabIndex={0}
              key={seat}
              className={`h-8 w-8 flex justify-center ${isOccupied && 'bg-secondary'} ${isSelected ? 'bg-accent' : 'bg-primary'}`}
              onClick={isOccupied ? undefined : () => handleSelectedState(seat)}><p className="self-center text-background">{seat+1}</p></span>
          )
        })}
      </div>
    </div>
  )
}


const Payment = () => {
  const {data: session} = useSession()

  const [movies, setMovies] = useState<MovieObject[]>([])
  const pathname = usePathname()
  const [title, setTitle] = useState("")
  const [selectedSeats, setSelectedSeats] = useState([])
  const [occupiedSeats, setOccupiedSeats] = useState([])

  const router = useRouter()
  const [user, setUser] = useState<userData>({
    id: "",
    email: "",
    name: "",
    balance: 0
  })
  useEffect(() => {
      if (session && session.user){
          fetch(`/api/users/${session.user.email}`)
          .then(response => response.json())
          .then(data => setUser(() => data))
      }
  }, [session]);


  useEffect(() => {
      fetch("https://seleksi-sea-2023.vercel.app/api/movies")
      .then(response => response.json())
      .then(data => setMovies(data))
  }, [])

  useEffect(() => {
    setTitle(() => `${pathname}`)
  }, [pathname])

  useEffect(() => {
      fetch(`/api/seats/${pathname.split("/")[2]}`)
      .then(response => response.json())
      .then(data => setOccupiedSeats(() => data))
  }, [pathname])

  const movie = movies.find((obj: MovieObject) => {
    return obj.title === decodeURIComponent(title.split("/")[2])
  })

  
  const pesanTiket = () => {
    const title = movie?.title
    const seat = selectedSeats
    const price = movie?.ticket_price! * selectedSeats.length
    const bookerId = user.id

    if (seat.length === 0){
      alert("Silakan pilih tempat duduk")
    }
    else if (price <= user.balance) {
      fetch(`/api/tickets/${title}`, {
        method: "POST",
        body: JSON.stringify({
          title: title,
          seat: seat,
          price: price,
          bookerId: bookerId
        }),
        headers: {
            "accept": "application/json"
        }
      })
      fetch(`/api/balance/withdraw/${user.email}`, {
        method: "PATCH",
        body: JSON.stringify({balance: price}),
        headers: {
            "accept": "application/json"
        }
    })
    
    router.push("/")
    }else{
      alert("Saldo Anda tidak cukup, silakan top up terlebih dahulu")
    }
  }
  


  if (movie && session && session.user){
    return(
      <div className="flex flex-col">
        <h2 className="mb-8">{movie.title}</h2>
        <Cinema occupiedSeats={occupiedSeats} selectedSeats={selectedSeats} onSelectedSeatsChange={(selectedSeats:any) => setSelectedSeats(selectedSeats)}></Cinema>
        <p className="mt-4">Harga: {new Intl.NumberFormat("id-ID", {style: "currency", currency: "IDR"}).format(movie.ticket_price*selectedSeats.length)}</p>
        <h2 className="my-8 text-center">Layar</h2>
        <Button className="mx-auto px-8 mt-4" onClick={pesanTiket}>Pesan Tiket</Button>
      </div>
    )
  }
  else{
    return (
      <div>Error</div>
    )
  }
}

export default Payment