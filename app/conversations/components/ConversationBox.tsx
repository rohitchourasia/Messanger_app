"use client"

import Avatar from "@/app/components/Avatar";
import useOtherUser from "@/app/hooks/useOtherUser";
import { FullConversationaType } from "@/app/types";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { format } from 'date-fns';
import AvatarGroup from "@/app/components/AvatarGroup";


interface ConversationBoxProp{
    data:FullConversationaType, 
    selected?:boolean
}
const ConversationBox= ({
    data,
    selected
}:ConversationBoxProp)=>{
    
    const otherUser = useOtherUser(data);
    const router = useRouter() ;
    const session = useSession() ;  
    const handleClick = useCallback(()=>{
            router.push(`/conversations/${data.id}`)
    },[data.id,router])
    const lastmessage = useMemo(()=>{
         const messages = data.message||[] ; 
         return messages[messages.length-1];
    },[data.message])
    
    const userEmail = useMemo(()=>{
        return session?.data?.user?.email ; 

    },[session?.data?.user?.email])
    
    const seenMessage = useMemo(()=>{
            if(!lastmessage){
                return false ; 
            }
            
            const seenArray = lastmessage.seen || [];
            
            if(!userEmail){
                console.log("here i m coming")
                return false 
            }
            
            
             return  seenArray.filter((user)=>user.email===userEmail).length!=0 ; 
            
    },[userEmail,lastmessage])
    
    const lastMessageText = useMemo(()=>{
        if(lastmessage?.Image){
            return 'Sent an image'
        }
        if(lastmessage?.body){
            return lastmessage.body
        }
        else {
            return 'Start a conversation'
        }
    },[lastmessage])
    return (
        <div onClick={handleClick}
        className={clsx(`w-full 
            relative 
            flex 
            items-center 
            space-x-3
             hover:bg-neutral-100 
            rounded-lg 
            transition 
            cursor-pointer 
   `,
        selected?"bg-neutral-100":"bg-white")}>
        {
            data.isGroup?(<AvatarGroup users={data.users}/>):(
            <Avatar currentuser={otherUser} />)
        }
            <div className="min-w-0 flex-1">
                <div className="focus:outline-none">
                    <div className="flex justify-between items-center mb-1">
                        <p className="font-semibold text-black">
                            {data.name || otherUser.name}
                        </p>
                        <div>
                            {
                                lastmessage?.createdAt && (
                                    
                                    <p className="text-xs text-gray-400 font-light">
                                        {
                                        format(new Date(lastmessage.createdAt),'p')
                                        }

                                        </p>
                                        
                                )
                            }
                        </div>
                    </div>
                    <p className={clsx(`truncate text-sm `,seenMessage?"text-gray-400":"text-black font-medium")}>
                        {
                            lastMessageText
                        }
                    </p>
                </div>
            </div>
        </div>
    )
}
export default ConversationBox