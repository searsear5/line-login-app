"use client"
import React, { useEffect, useState } from 'react'

import Link from 'next/link'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const LoginPage = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const { data: session, status } = useSession()

  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(email)
    console.log(password)
    try {
      const res = await signIn("credentials", {
        email, password, redirect: false
      })
      //const line = await signIn('line', { redirect: false })
      console.log("response", res)
      if (res.error == null) {
        router.push('/profile')
      }


      /*if (res?.error) {
          setError("invalid credential")
          return
      }
      console.log('login success')
       router.replace("http://localhost:3000/home")*/
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (status == 'authenticated') {
      router.push('/profile')
    }
  }, [router, status])


  return (
    <div>

      <div className='container mx-auto py-5'>
        <h3>Sign in Page</h3>
        <hr className='my-3' />
        <form onSubmit={handleSubmit}>

          {error && (
            <div className='bg-red-500 w-fit text-sm text-white py-1 px-3 rounded-md mt-2'>
              {error}
            </div>
          )}

          <input onChange={(e) => setEmail(e.target.value)} className='block bg-gray-200 p-2 my-2 rounded-md' type="text" placeholder='email' />
          <input onChange={(e) => setPassword(e.target.value)} className='block bg-gray-200 p-2 my-2 rounded-md' type="password" placeholder='password' />

          <button type='submit' className='bg-blue-500 p-2 rounded-md text-white'>Sign in</button>
          <button onClick={() => signIn('line')} className='bg-green-500 p-2 rounded-md text-white'>Sign with LINE</button>
        </form>
        <hr className='my-3' />
        <p>Already have an account?<Link className='text-blue-500 hover:underline' href="">Sign up</Link>Page</p>
      </div>
    </div>
  )
}

export default LoginPage