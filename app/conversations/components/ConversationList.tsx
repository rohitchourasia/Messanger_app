"use client"
import useConversation from "@/app/hooks/useConveration";
import { FullConversationaType } from "@/app/types";

import { Conversation, User } from "@prisma/client"
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { use, useEffect, useMemo, useState } from "react";
import { MdOutline10Mp, MdOutlineGroupAdd } from "react-icons/md";
import ConversationBox from "./ConversationBox";
import GroupChatSetting from "./GroupChatSetting";
import { useSession } from "next-auth/react";
import { pusherClient } from "@/app/libs/pusher";
import { find } from "lodash";

interface ConversationListProp {
    itemList :FullConversationaType[] ; 
    users: User[] 
}
const ConversationList = ({
    itemList,
    users

}:ConversationListProp)=>{
    
    const{isOpen,conversationId} = useConversation() ; 
    console.log("in conversation list", isOpen )
    const [item,setItem]= useState(itemList)
    const router = useRouter() ;
    const [isModalOpen,setisModalOpen] = useState(false); 
    const session = useSession() ; 
    const pusherKey = useMemo(()=>{
            return session?.data?.user?.email
    },[session])
    useEffect(()=>{
            if(!pusherKey){
                return 
            }
            const eventhandler= (conversation:FullConversationaType)=>{
                setItem((current)=>{
                    if(find(current,{id:conversation.id})){
                        return current 
                    }
                    return [conversation,...current]
                })
                
            }
            const updateEventHandler = (conversation: FullConversationaType) => {
                console.log("Received conversation:update event", conversation.id, conversation.message); // Debug statement
                setItem((current) =>
                  current.map((element) => {
                    if (element.id === conversation.id) {
                      return {
                        ...element,
                        message: conversation.message,
                      }
                    }
                    return element;
                  })
                );
              };
            const removeHandler= (conversation:FullConversationaType)=>{
                setItem((current)=>{
                    return [...current.filter((convo)=>convo.id!== conversation.id)]
                })
                if(conversationId === conversation.id){
                    router.push('/conversations')
                }
            }  
            pusherClient.subscribe(pusherKey);
            pusherClient.bind('conversation:new',eventhandler);
            pusherClient.bind('conversation:update',updateEventHandler)
            pusherClient.bind('conversation:remove',removeHandler) ; 
            return ()=>{
                pusherClient.unsubscribe(pusherKey)
                pusherClient.unbind('conversation:new',eventhandler)
                pusherClient.unbind('conversation:update',updateEventHandler)

            }
    },[pusherKey,router,conversationId])

    return (
        <>
        <GroupChatSetting  users={users}isModalOpen={isModalOpen} onClose={()=>setisModalOpen(false)}/>
        <aside className={clsx(`fixed inset-y-0 pb-20 lg:pb-0   lg:left-20 lg:w-80 lg:block  overflow-y-auto border-r border-gray-200`,isOpen?'hidden':'block w-full left-0')}>
            <div className="px-5 ">
                <div className="flex justify-between mb-4 pt-4 ">
                    <div className="font-semibold text-gray-950">
                        Messages
                    </div>
                    <div onClick={()=>{
                        setisModalOpen(true)
                    }}className = "rounded-full p-2 cursor-pointer transition hover:opacity-40 bg-gray-100 ">
                        <MdOutlineGroupAdd size={20}/>
                    </div>
                </div>
                <div >
                    {
                        item.map((element)=>(
                            <ConversationBox key = {element.id} data={element} selected={conversationId===element.id}/>
                        ))
                    }
                </div>
            </div>
        </aside>
        </>
    )

}
export default ConversationList