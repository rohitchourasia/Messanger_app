"use client"

import useConversation from "@/app/hooks/useConveration"
import { FullMessageType } from "@/app/types"
import { Message, User } from "@prisma/client"
import { useEffect, useRef, useState } from "react"
import MessageBox from "./MessageBox"
import axios from "axios"
import { pusherClient } from "@/app/libs/pusher"
import { find } from "lodash"

interface BodyProp {
    intialmessages: FullMessageType[]

    }

const Body = ({
    intialmessages
}:BodyProp) =>{
    
    const [messages,setMessage] = useState(intialmessages) ; 
    const bottomRef = useRef<HTMLDivElement>(null);
    const {conversationId} =  useConversation(); 
    useEffect(()=>{
        console.log("in seen useeffect")
        axios.post(`/api/conversations/${conversationId}/seen`)
    },[conversationId])
    useEffect(()=>{
            pusherClient.subscribe(conversationId)
            bottomRef?.current?.scrollIntoView()
            const messagehandler = (message:FullMessageType)=>{
                console.log(message, " in message handler")
                axios.post(`/api/conversations/${conversationId}/seen`)
                setMessage((current)=>{
                    if(find(current,{id:message.id})){
                        return current
                    }
                    return [...current,message]

                })
                bottomRef?.current?.scrollIntoView()

            }
            const updatemessagehandler = (newmessage:FullMessageType)=>{
                setMessage((current)=> current.map((currentmessage)=>{
                    if(currentmessage.id===newmessage.id){
                        return newmessage
                    }
                    return currentmessage
                }))

            }
            pusherClient.bind('messages:new',messagehandler)
            pusherClient.bind('message:update',updatemessagehandler)
            return ()=>{
                pusherClient.unsubscribe(conversationId);
                pusherClient.unbind('messages:new',messagehandler)
                pusherClient.unbind('message:update',updatemessagehandler)
            }
    },[conversationId])
    
    return (
        <div className="flex-1 overflow-y-auto">
            {
                messages.map((message,i)=>(
                    <MessageBox   key={message.id} isLast = {i=== messages.length-1} id={message.id} data = {message}/>
                ))

            }
            <div ref= {bottomRef} className="pt-4"/>
            </div>

    )

}
export default Body 