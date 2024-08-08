import { getUser } from "@/app/action/getUser";
import { NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb';
import { pusherServer } from "@/app/libs/pusher";
interface Iparam{
    conversationId:  string 
}
export async function DELETE(req:Request , {params}:{params:Iparam}){
    try {
        console.log("in delete")
        const {conversationId}= params ; 
        console.log(conversationId)
        const currentuser = await getUser() ; 
        console.log(currentuser?.name)
        if(!currentuser?.id){
            return new NextResponse("Unauthorized User")
        }
        const exisitingConversation = await prisma.conversation.findUnique({
            where:{
                id:conversationId
            },
            include:{
                users:true 
            }
        })
        if(!exisitingConversation){
            return new NextResponse("No such conversation Exist")
        }
        const deleteConversation = await prisma.conversation.deleteMany({
            where :{
                id:conversationId,
                userIds:{
                    hasSome:[currentuser.id]
                }
            }


        })
        exisitingConversation.users.forEach(async (user)=>{
            if(user.email){
                await  pusherServer.trigger(user.email,'conversation:remove',exisitingConversation)
            }
        })
        console.log(deleteConversation)
        return NextResponse.json(deleteConversation)



    }
    catch(error:any){

        console.log("got error " , error)
        return new NextResponse("Something is wrong")

    }
}