"use client"

import React, { useEffect, useState } from 'react'
import Image from "next/image"
import Footer from '@/components/Footer'
import Link from 'next/link'

interface MovieObject {
    id: number,
    title: string,
    description: string,
    release_date: string,
    poster_url: string,
    age_rating: number,
    ticket_price: number,
  }

const Movies = () => {
    const [movies, setMovies] = useState([])

    useEffect(() => {
        fetch("https://seleksi-sea-2023.vercel.app/api/movies")
        .then(response => response.json())
        .then(data => setMovies(data))
    }, [])

    return (
        <div className='flex flex-col'>
            <div className="flex flex-col mx-auto sm:mx-0 sm:grid sm:grid-cols-[repeat(auto-fill,_275px)] md:flex-col md:mx-auto min-[822px]:mx-0 min-[822px]:grid min-[822px]:grid-cols-[repeat(auto-fill,_275px)] justify-between gap-4 gap-y-12">
                {movies && movies.map((obj: MovieObject) => 
                <Link href={`/movies/${obj.title}`} key={obj.id} className="bg-foreground text-background flex flex-col justify-between text-center gap-4 rounded-lg pb-4">
                    <Image width={0} height={0} src={obj.poster_url} alt={obj.title} className="rounded-t-lg w-full h-auto" sizes='275px'/>
                    <p className="mx-4">{obj.title}</p>
                    <p>{obj.age_rating}+</p>
                </Link>)}
            </div>

            <Footer/>
        </div>
    )
}

export default Movies