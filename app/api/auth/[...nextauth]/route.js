import NextAuth from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaClient } from "@prisma/client"
import bcrypt from 'bcrypt'
import { PrismaAdapter } from "@auth/prisma-adapter"
import LineProvider from "next-auth/providers/line"

const prisma = new PrismaClient()

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'Email', type: 'email', placeholder: 'sear@test.com' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials, req) {
                if (!credentials) return null
                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },

                })
                if (
                    user &&
                    (await bcrypt.compare(credentials.password, user.password))
                ) {
                    console.log(user)
                    return (user)



                } else {
                    throw new Error('invalid email or password')
                }


            }
        }),
        LineProvider({
            clientId: process.env.LINE_CLIENT_ID,
            clientSecret: process.env.LINE_CLIENT_SECRET
        })
    ],
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: 'jwt'
    },
    callback: {
        jwt: async ({ token, user }) => {
            if (user) {
                token.id = user.id
            }
            return token
        },
        session: async ({ session, token }) => {
            if (session.user) {
                session.user.id = token.id
            }
            return session
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }