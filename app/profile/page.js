'use client'
import { useSession } from "next-auth/react"
import { signOut } from "next-auth/react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Profile() {
    const { data: session, status } = useSession()
    console.log("status", status)
    console.log("session", session)
    const router = useRouter()

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/')
        }
    }, [router, status])
    return (

        <div>
            {status === 'authenticated' && session.user && (<div>Profile Page<div className="w-64"><img src={session.user.image} /></div><div>{session.user.name}</div></div>)}



            <div className='bg-red-500 w-fit text-sm text-white py-1 px-3 rounded-md mt-2'>
                <li className=' hover:cursor-pointer'><a onClick={() => signOut()} className='bg-red-500 text-white  rounded-md text-lg '>Sign out</a></li>
            </div>

        </div>
    )
}