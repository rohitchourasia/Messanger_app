import { getUser } from "./getUser";
import prisma from '@/app/libs/prismadb';
export default async function getConversation(){

    try {
        const currentUser = await getUser() ; 
        console.log(currentUser?.id)
        if(!currentUser){
            return [ ] ; 
        }
        const conversations = await prisma.conversation.findMany({
            orderBy:{
                lastMessageAt:'desc'
            },
            where:{
                    userIds:{
                        has:currentUser.id 
                    }
            },
            include:{
                users:true , 
                message:{
                    include:{
                        sender:true , 
                        seen:true 
                    }
                }
            }
        })
    
        return conversations 

    }
    catch(error:any){
        return [] ; 
    }
}