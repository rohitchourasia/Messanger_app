import { getUser } from "@/app/action/getUser";
import { NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb';
import { connect } from "http2";
import { pusherServer } from "@/app/libs/pusher";
export  async  function POST(req:Request){
    try {
        const currentUser = await getUser() ; 
        if(!currentUser){
            return new NextResponse("Invalid User")
        }
        const body =  await req.json() ; 
        console.log("the body ", body)
        const {
            message , 
            image , 
            conversationId
        } = body ; 
        console.log(conversationId)
        console.log(image)
        const new_message = await prisma.message.create({
            data:{
                body:message, 
                Image:image , 
                conversation:{
                    connect:{
                        id: conversationId
                    }
                },
                seen:{
                    connect:{
                        id:currentUser.id
                    }
                },
                sender:{
                    connect:{
                        id:currentUser.id 
                    }
                },
                

            },
            include:{
                seen:true , 
                sender:true 
            }
        })
        const updatedConversation = await prisma.conversation.update({
            where:{
                id:conversationId
            },
            data:{
                lastMessageAt: new Date(),
                message :{
                    connect:{
                        id:new_message.id 
                    }
                }

            },
            include:{
                users:true , 
                message:{
                    include:{
                        seen:true 
                    }
                }
            }
        })
        await pusherServer.trigger(conversationId,'messages:new',new_message);
        const lastmessage = updatedConversation.message[updatedConversation.message.length-1]
        updatedConversation.users.map((user)=>{
            pusherServer.trigger(user.email! , 'conversation:update',{
                id:conversationId , 
                message:[lastmessage]
            })
        })
        return  NextResponse.json(new_message)


    }
    catch(error:any){
            console.log(error,"[Error_here]");
            return new NextResponse("Internal Error")
    }
}