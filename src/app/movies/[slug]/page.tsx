"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
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

const ReadMore = ({ children }: any) => {
    const text = children;
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
    };
    return (
    <p className="text">
        {isReadMore ? text.slice(0, 150) : text}
        <span onClick={toggleReadMore} className="text-primary hover:underline">
        {isReadMore ? "...read more" : " show less"}
        </span>
    </p>
    );
};


export async function generateStaticParams() {
    const movies = await fetch('https://seleksi-sea-2023.vercel.app/api/movies').then((res) => res.json())
   
    return movies.map((movie: MovieObject) => ({
      slug: movie.title,
    }))
  }

  export default function Page({ params }: { params: { slug: string}}) {
    const { slug } = params

    const [movies, setMovies] = useState<MovieObject[]>([])

    useEffect(() => {
        fetch("https://seleksi-sea-2023.vercel.app/api/movies")
        .then(response => response.json())
        .then(data => setMovies(data))
    }, [])

    const movie = movies.find((obj: MovieObject) => {
        return obj.title === decodeURIComponent(slug)
    })


    if (movie){
        return (
            <div>
                <div className="flex flex-col min-[1200px]:flex-row justify-between gap-12 xl:gap-36">
                    <main className="flex flex-col">
                        <Image alt={movie.title} src={movie.poster_url} width={0} height={0} sizes="400px" className="min-[1200px]:w-full w-[300px] mx-auto"/>
                    </main>
                    <section className="flex flex-col gap-4 mx-auto max-w-xl">
                        <h2 className="mb-8">{movie.title}</h2>
                        <div className="flex flex-col gap-2">
                            <p>Deskripsi</p>
                            <ReadMore>{movie.description}</ReadMore>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p>Rating Usia</p>
                            <p>{movie.age_rating}+</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p>Harga</p>
                            <p>{new Intl.NumberFormat("id-ID", {style: "currency", currency: "IDR"}).format(movie.ticket_price)}</p>
                        </div>
                        <Link href={`/payment/${movie.title}`} className="mx-auto mt-12 min-[1200px]:mx-0 min-[1200px]:mt-0"><Button className="px-12">Pesan Tiket</Button></Link>
                    </section>
                </div>

                <Footer/>
            </div>
        )
    }
    else{
        return (
            <div>
                Page doesn&apos;t exist
            </div>
        )
    }
  }