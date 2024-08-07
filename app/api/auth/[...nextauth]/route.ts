import { PrismaAdapter } from "@next-auth/prisma-adapter"
import NextAuth, { NextAuthOptions } from "next-auth"
import prisma from '@/app/libs/prismadb';
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';
 export const authOptions:NextAuthOptions={
  adapter:  PrismaAdapter(prisma),
  providers:[GitHubProvider(
    {
        clientId:process.env.GITHUB_ID as string, 
        clientSecret: process.env.GITHUB_SECRET as string
    }
  ),
GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string 
}),
CredentialsProvider({
    // The name to display on the sign in form (e.g. "Sign in with...")
    name: "credentials",
    // `credentials` is used to generate a form on the sign in page.
    // You can specify which fields should be submitted, by adding keys to the `credentials` object.
    // e.g. domain, username, password, 2FA token, etc.
    // You can pass any HTML attribute to the <input> tag through the object.
    credentials: {
      email: { label: "email", type: "text", placeholder: "Email" },
      password: { label: "password", type: "password" }
    },
    async authorize(credentials) {
        console.log("inside credential provider")
        if(!credentials?.email || !credentials?.password ){
            throw new Error("Invalid login Credentials")
        }
        const user = await prisma.user.findUnique({
            where:{
                email : credentials.email
            }
        })
        if(!user){
            throw new Error("Invalid Credential")
        }
        else if(!user.hashedPassword){
            throw new Error("Try to access using other option")
        }
        const password = await bcrypt.compare(credentials.password,user.hashedPassword);
        if(!password){
        throw new Error("Invalid Cresential") ; 
        }
        return user 
    }
  })],
  debug: process.env.NODE_ENV === 'development',
  session:{
  strategy: "jwt"
  
},
secret:process.env.NEXTAUTH_SECRET

}
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

