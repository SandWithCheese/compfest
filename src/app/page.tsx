"use client"

import { useEffect, useState } from "react"
import Image from 'next/image'

import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from 'react-responsive-carousel'
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Footer from "@/components/Footer"
interface MovieObject {
  id: number,
  title: string,
  description: string,
  release_date: string,
  poster_url: string,
  age_rating: number,
  ticket_price: number,
}

export default function Home() {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    fetch("https://seleksi-sea-2023.vercel.app/api/movies")
    .then(response => response.json())
    .then(data => setMovies(data.slice(0, 8)))
  }, [])

  return (<div>
    
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-24">
      <main>
        <Carousel className="max-w-4xl" showThumbs={false}>
          <div>
            <Image alt="fast-x" src="/fastx.jpg" width={1080} height={720}/>
          </div>
          <div>
            <Image alt="john-wick" src="/john_wick.jpg" width={1080} height={720}/>
          </div>
          <div>
            <Image alt="mario" src="/mario.png" width={1080} height={720}/>
          </div>
          <div>
            <Image alt="avatar" src="/avatar.jpeg" width={1080} height={720}/>
          </div>
        </Carousel>
      </main>

      <section className="self-center text-center lg:text-left">  
        <h2>Nonton film bersama orang tercinta</h2>
      </section>
    </div>

    <div className="flex flex-col mt-48">
      <h2 className="mb-8">Now Playing</h2>

      <div className="flex flex-col mx-auto sm:mx-0 sm:grid sm:grid-cols-[repeat(auto-fill,_275px)] md:flex-col md:mx-auto min-[822px]:mx-0 min-[822px]:grid min-[822px]:grid-cols-[repeat(auto-fill,_275px)] justify-between gap-4 gap-y-12">
        {movies && movies.map((obj: MovieObject) => 
        <Link href={`/movies/${obj.title}`} key={obj.id} className="bg-foreground text-background flex flex-col justify-between text-center gap-4 rounded-lg pb-4">
          <Image width={0} height={0} src={obj.poster_url} alt={obj.title} className="rounded-t-lg w-full h-auto" sizes='275px'/>
          <p className="mx-4">{obj.title}</p>
          <p>{obj.age_rating}+</p>
          </Link>)}
      </div>

      <Link href="/movies" className="mt-12 mx-auto"><Button>Lainnya</Button></Link>
    </div>

    <Footer/>
  </div>)
  }
