"use client"
import Avatar from "@/app/components/Avatar";
import { FullMessageType } from "@/app/types";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import {format} from 'date-fns'
import Image from "next/image";
import { useState } from "react";
import ImageModal from "./ImageModal";

interface MessageBoxProp {
    isLast: boolean , 
    data: FullMessageType,
    id:string 
}
const MessageBox = ({isLast,data}: MessageBoxProp) => {
    console.log("Message Box",data)
    const[imageModal,setImageModal]= useState(false)
    const session = useSession() ; 
    console.log(session?.data?.user?.email , " ",data?.sender?.email )
    const isOwn = session?.data?.user?.email === data?.sender?.email ; 
    
    const seenUser = (data.seen || []).filter((user)=> user.email != data?.sender?.email).map((user)=> user.name).join(',')
    console.log("printing array of seen users",seenUser)
    const container = clsx("flex gap-3 p-4",isOwn && "justify-end");
    const avatar = clsx(isOwn && "order-2")
    const body = clsx("flex flex-col gap-2",isOwn && "items-end");
    const message = clsx("text-sm w-fit overflow-hidden", isOwn?"bg-sky-500 text-white":"bg-gray-100",
        data.Image? 'rounded-md p-0': 'rounded-full py-2 px-3'
    )
    return ( <div className={container}>
      <div className={avatar}>
        <Avatar currentuser={data.sender}/>

      </div>
      <div className={body}>
        <div className="flex items-center gap-1">
            <div className="text-sm text-gray-500">
                {data.sender.name}
                </div>
            <div className="text-sm text-gray-400">
                {
                    format(new Date(data.createdAt),'p')
                }
                </div>    
        </div>
        <div className={message}>
            <ImageModal src={data.Image} onClose={()=>setImageModal(false)} isOpen={imageModal}/>
            {
                data.Image?(
                    <Image alt = "Image" src={data.Image} height={288} width={288} 
                    className="object cover cursor-pointer hover:scale-110 transition transalate" onClick={()=>setImageModal(true)} />

                ):(
                    <div>
                        {
                          data.body
                        }

                        </div>
                )
            }
            </div>
            {
                isLast && isOwn && seenUser.length>0 && (
                    <div className=" text-xs text-gray-500 font-light">
                        {
                            `Seen by ${seenUser}`
                        }
                        </div>
                )
            }

      </div>
    </div> );
}
 
export default MessageBox;