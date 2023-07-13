"use client"

import { signIn, signOut, useSession } from 'next-auth/react'
import React from 'react'
import { Button } from "@/components/ui/button"

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
    navigationMenuTriggerStyle,
  } from "@/components/ui/navigation-menu"  

  
import Link from 'next/link'


const LoginButton = () => {
    const {data: session} = useSession()
    if (session && session.user){
        return (
            <div>
                <NavigationMenu>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger className='hover:bg-transparent focus:bg-transparent'>{session.user.name}</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul>
                                <li>
                                    <Link href="/balance" legacyBehavior passHref>
                                        <NavigationMenuLink className={`hover:text-background ${navigationMenuTriggerStyle()}`}>
                                            Balance
                                        </NavigationMenuLink>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/history" legacyBehavior passHref>
                                        <NavigationMenuLink className={`hover:text-background ${navigationMenuTriggerStyle()}`}>
                                            History
                                        </NavigationMenuLink>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="" legacyBehavior passHref>
                                        <NavigationMenuLink className={`hover:text-background ${navigationMenuTriggerStyle()}`} onClick={() => signOut()}>
                                            Logout
                                        </NavigationMenuLink>
                                    </Link>
                                </li>
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                </NavigationMenu>

            </div>
        )
    }
    
    return (
        <Button onClick={() => signIn()} className='ml-2 sm:ml-0 px-8'>Login</Button>
    )
}

export default LoginButton