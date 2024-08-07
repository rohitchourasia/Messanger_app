import { NextResponse } from "next/server";
import { BiCabinet } from "react-icons/bi";
import bcrypt from 'bcrypt'
import prisma from '@/app/libs/prismadb';
export  async function POST(req:Request) {
    try {
        console.log("here i m ")
        const {
            email,
            password , 
            name
        } = await req.json() ; 
        if(!email || !password || !name){
            return new NextResponse("Missing credential",{ status:400})
        }
        const hashedPassword = await bcrypt.hash(password,12) ; 
        const user = await prisma.user.create({
            data:{
                email , 
                name, 
                hashedPassword
            }
        })
        return NextResponse.json(user)

    }
    catch(error:any){
        console.log(Error,"Registration_Map")

    }
    
    
}