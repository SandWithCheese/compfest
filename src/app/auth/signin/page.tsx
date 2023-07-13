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
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import { signIn } from "next-auth/react"
import { useState } from "react"

interface loginObject {
    email: string
    password: string
}

export default function LoginPage() {
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    })

    const [signupData, setSignupData] = useState({
        username: "",
        email: "",
        password: "",
    })

    const onLogin = async () => {
        const result = await signIn("credentials", {
            username: loginData.email,
            password: loginData.password,
            redirect:true,
            callbackUrl:"/"
        })
    }

    const onSignup = async (e:any) => {
        e.preventDefault()
        const formURL = e.target.action
        fetch(formURL, {
            method: "POST",
            body: JSON.stringify(signupData),
            headers: {
                "accept": "application/json"
            }
        })
        
        const result = await signIn("credentials", {
            username: signupData.email,
            password: signupData.password,
            redirect:true,
            callbackUrl:"/"
        })
    }

    return (
        <Tabs defaultValue="login" className="min-[480px]:w-[400px] mx-auto">
        <TabsList className="grid w-full grid-cols-2 bg-secondary">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Signup</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
            <Card>
            <CardHeader>
                <CardTitle>Login</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                <div className="space-y-1">
                    <Label htmlFor="email">Email</Label>
                    <Input required type="email" id="email" placeholder="Email" className="bg-foreground text-background" onChange={(e) => {setLoginData(values => ({...values, email: e.target.value}))}}/>
                </div>
                <div className="space-y-1">
                    <Label htmlFor="password">Password</Label>
                    <Input required type="password" id="password" placeholder="Password" className="bg-foreground text-background" onChange={(e) => {setLoginData(values => ({...values, password: e.target.value}))}}/>
                </div>
            </CardContent>
            <CardFooter>
                <Button type="submit" onClick={onLogin}>Login</Button>
            </CardFooter>
            </Card>
        </TabsContent>
        <TabsContent value="signup">
            <Card>
            <CardHeader>
                <CardTitle>Signup</CardTitle>
            </CardHeader>
            <form action="/api/user" method="post" onSubmit={onSignup}>
                <CardContent className="space-y-2">
                    <div className="space-y-1">
                        <Label htmlFor="username">Username</Label>
                        <Input required id="username" type="text" placeholder="Username" className="bg-foreground text-background" onChange={(e) => {setSignupData(values => ({...values, username: e.target.value}))}}/>
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="email">Email</Label>
                        <Input required id="email" type="email" placeholder="Email" className="bg-foreground text-background" onChange={(e) => {setSignupData(values => ({...values, email: e.target.value}))}}/>
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="password">Password</Label>
                        <Input required id="password" type="password" placeholder="Password" className="bg-foreground text-background" onChange={(e) => {setSignupData(values => ({...values, password: e.target.value}))}}/>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit">Signup</Button>
                </CardFooter>
            </form>
            </Card>
        </TabsContent>
        </Tabs>
    )
}
