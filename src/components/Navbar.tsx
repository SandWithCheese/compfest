import LoginButton from "./LoginButton"
import Link from "next/link"

export default function Navbar() {
    return (
      <div className="flex justify-between mb-24 gap-4">
        <Link href="/"><h1 className="text-2xl  sm:text-4xl">SEA Cinema</h1></Link>  
        <ul className="flex gap-2 sm:gap-8 md:gap-16 lg:gap-24 items-center">
            <li><Link href="/movies" className="hover:underline">Movies</Link></li>
            <li><LoginButton/></li>
        </ul>
      </div>
    )
  }