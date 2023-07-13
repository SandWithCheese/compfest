import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import useWindowDimensions from '@/hooks/useWindowDimensions'

const Footer = () => {
    const { width } = useWindowDimensions()

    return (
        <div className='bg-foreground text-background p-8 mt-36 rounded-lg'>
            <div className='flex flex-col lg:flex-row gap-16'>
                <div>
                    <h3>Lokasi</h3>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.9927077350853!2d107.60808417432466!3d-6.8914746674359835!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e65767c9b183%3A0x2478e3dcdce37961!2sBandung%20Institute%20of%20Technology!5e0!3m2!1sen!2sid!4v1688982828016!5m2!1sen!2sid" width={width! < 400 ? width! - 100 : 300} height={width! < 400 ? width! - 100 : 300} allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>

                <div className='flex gap-16 lg:self-end'>
                    <div className='flex flex-col gap-4 mb-8'>
                        <h3>Media Sosial</h3>
                        <div className='flex gap-1 sm:gap-2'>
                            <Link href="/"><Image alt="instagram" src="/Instagram_black.svg" width={32} height={32}/></Link>
                            <Link href="/"><Image alt="instagram" src="/Twitter_black.svg" width={32} height={32}/></Link>
                            <Link href="/"><Image alt="instagram" src="/Facebook_black.svg" width={32} height={32}/></Link>
                        </div>
                    </div>

                    <div className='flex flex-col gap-4 mb-8'>
                        <h3>Eksplor</h3>
                        <Link href="/" className='hover:underline'>Home</Link>
                        <Link href="/movies" className='hover:underline'>Movies</Link>
                    </div>
                </div>
            </div>

            <hr className='my-4'/>
            <p>Copyright © 2023 All Rights Reserved</p>
        </div>
    )
}

export default Footer