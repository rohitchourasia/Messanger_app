import { getUser } from "@/app/action/getUser";
import { NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb';
import { pusherServer } from "@/app/libs/pusher";

export async function POST( req:Request) {
    console.log("here in post of conversations")
    try {
        const currentUser = await getUser() ; 
        const body = await req.json() ; 
        const {
            userId,
            isGroup , 
            members , 
            name
        }= body
        if(!currentUser?.id || !currentUser?.email){
            return  new NextResponse("Unauthorized User",{status:401})
        }
        if(isGroup && (!members || members.length<2 || !name)){
            return  new NextResponse("Invalid Data",{status:401})
        }
        if(isGroup){
            const newGroupConversation = await prisma.conversation.create({
                data:{
                    name , 
                    isGroup,
                    users:{
                        connect:[
                            ...members.map((member:{value:string})=>({
                                id:member.value
                            })),
                            {
                                id:currentUser.id 
                            }
                        ]
                    } 

                },
                
                    include:{
                        users:true 
                    }
                
            })
            await Promise.all(
                newGroupConversation.users.map(async (user) => {
                    if (user.email) {
                        await pusherServer.trigger(user.email, 'conversation:new', newGroupConversation);
                    }
                })
            );
            return NextResponse.json(newGroupConversation)
        }
        const existingUser = await prisma.conversation.findMany({
            where:{
                OR:[{
                    userIds:{
                        equals:[currentUser.id,userId]
                    }

                },{
                    userIds:{
                        equals:[userId,currentUser.id]
                    }

                }]
            }
        })
        const singleConversation = existingUser[0] ; 
        if(singleConversation){
            return NextResponse.json(singleConversation)
        }
        const newConversation  = await prisma.conversation.create({
            data:{
                users:{
                    connect:[
                        {
                            id:currentUser.id
                        },
                        {
                            id:userId
                        }
                    ]
            }
        },
        include:{
            users:true 
        }
        })
        newConversation.users.forEach((user)=>{
            if(user.email){
                pusherServer.trigger(user.email , 'conversation:new',newConversation)
            }
        })
        return NextResponse.json(newConversation)




    }
    catch(error:any){
        return new NextResponse("Invalid data")
        
    }
}