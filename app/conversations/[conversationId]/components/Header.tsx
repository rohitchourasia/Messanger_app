"use client"
import Avatar from "@/app/components/Avatar";
import useOtherUser from "@/app/hooks/useOtherUser";
import { Conversation, User } from "@prisma/client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { HiChevronLeft } from "react-icons/hi";
import { HiEllipsisHorizontal } from "react-icons/hi2";
import ProfileDrawer from "./ProfileDrawer";
import AvatarGroup from "@/app/components/AvatarGroup";
import useActiveList from "@/app/hooks/useActiveList";

interface HeaderProp{
    conversation : Conversation &{
        users:User[] ;
    }
}
const Header = ({conversation}:HeaderProp)=>{
    const otherUser = useOtherUser(conversation) ; 
    const { members } = useActiveList();
    const isActive = members.indexOf(otherUser?.email!) !== -1;
    
    const [drawer,setDrawer] = useState(false) ; 
    const statusText = useMemo(()=>{
            if(conversation.isGroup){
                return `${conversation.users.length} members`
            }
            return isActive?'Active':'Oflline'
    },[conversation,isActive])
    return (
        <>
        <ProfileDrawer data= {conversation} isOpen = {drawer} onClose = {()=>{
            setDrawer(false)
        }} />
        <div className="bg-white  w-full flex  border-b-[1px] sm:px-4  py-3 lg:px-6 justify-between items-center shadow-sm ">
                <div className="flex gap-x-3 items-center">
                    <Link href="/conversations" className="text-blue-500 block  lg:hidden hover:text-sky-700 transition cursor-pointer">
                            <HiChevronLeft size={32}/>
                    </Link>
                    {
                     conversation.isGroup? (<AvatarGroup users={conversation.users}/>):( 
                    <Avatar currentuser = {otherUser}
                     />)
                   }
                    <div className="flex flex-col">
                        <div className="font-semibold text-black text-md">
                            {conversation.name || otherUser.name}
                        </div>
                        <div className="text-gray-300 font-light ">
                            {statusText}
                        </div>
                    </div>
                

                

                    </div>
                    <HiEllipsisHorizontal size={32} onClick = {()=>{setDrawer(true)}}   className="text-blue-400 cursor-pointer transition "/>
                    
        </div>
        </>
    )


}
export default Header ; 