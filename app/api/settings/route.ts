import { getUser } from "@/app/action/getUser";
import { NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb';
export async function POST(req:Request){
    try {
        const currentuser = await getUser() ; 
        const body = await req.json() ; 
        const {
            name , 
            image
        }= body 

        if(!currentuser?.id){
            return new NextResponse("Unauthorized User")
        }
        const updatedUser = await prisma.user.update({
            where:{
                id:currentuser.id
            },
            data :{
                name,
                image
            }
        })
        return NextResponse.json(updatedUser)

    }
    catch(error:any){
        console.log(error,"Erro_in_setting"); 
        return new NextResponse("Something gone wrong")
    }
}