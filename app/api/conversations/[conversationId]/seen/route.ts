import { getUser } from "@/app/action/getUser";
import { NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb';
import { renderToHTML } from "next/dist/server/render";
import { pusherServer } from "@/app/libs/pusher";
interface Iparam {
    conversationId: string 
}
export async function POST(req:Request , {params}:{params:Iparam}) {
  try {
    const currentuser = await getUser() ; 
    if(!currentuser?.email || !currentuser?.id){
        return new NextResponse("Invalid Credentails")
    }
    const {conversationId} = params ; 
    const conversation = await  prisma.conversation.findUnique({
        where:{
           id:conversationId 
        },
        include :{
            message:{
                include:{
                    seen:true 
                } 

            },
            users:true 
        }
    })
    if(!conversation){
        return new NextResponse("Invalid conversation Id")
    }
    const lastMessage = conversation.message[conversation.message.length-1];
    if(!lastMessage){
        return NextResponse.json(conversation)
    }
    const updatedMessage = await prisma.message.update({
        where:{
           id:lastMessage.id  
        },
        include:{
            sender:true , 
            seen: true 
        },
        data:{
            seen:{
                connect:{
                   id:currentuser.id  
                }
            }
        }
    })
    await pusherServer.trigger(currentuser.email,'conversation:update',{
        id:conversationId,
        message:[updatedMessage]

    })
    
    if(lastMessage.seenIds.indexOf(currentuser.id)!=-1){
        console.log(currentuser.name,' has seen')
        return NextResponse.json(conversation)
    }
    console.log("has not seen but updated now",currentuser.name)
    await pusherServer.trigger(conversationId,'message:update',updatedMessage)
    return NextResponse.json(updatedMessage)


  }
  catch(error:any){
    console.log(error,"Error_Seen"); 
    return new NextResponse("Internal Error")
  }
    
}