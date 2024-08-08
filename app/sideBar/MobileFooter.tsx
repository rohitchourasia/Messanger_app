"use client"

import { Router } from "next/router";
import useConversation from "../hooks/useConveration";
import useRoute from "../hooks/useRoutes";
import MobileFooterItem from "./MobileFooterItem";
import { User } from "@prisma/client";
import Avatar from "../components/Avatar";
import { useState } from "react";
import SettingModal from "./SettingModal";
interface MobileFooterProp{
    currentuser:User
}
const MobileFooter = ({
    currentuser
}:MobileFooterProp) => {
    const routes = useRoute() ; 
    const {isOpen} = useConversation() ; 
    const [isOpenModal,setisOpenModal] = useState(false)
    if(isOpen){
        return  null ; 
    }
    return ( 
        <>
        <SettingModal currentuser={currentuser} isSettingOpen={isOpenModal} onClose={()=>setisOpenModal(false)}/>
    <div className="lg:hidden  fixed flex justify-between w-full bottom-0 z-40 items-center border-t-[1px]">
             <nav className="mt-4 flex flex-col justify-between items-center  ">
                    <div onClick={()=>{
                        setisOpenModal(true)
                    }} className="cursor pointer hover:opacity-70 transition">
                        <Avatar currentuser={currentuser}/>

                    </div>
            </nav>
        {
            routes.map((route)=>(
                    <MobileFooterItem key={route.lable}
                    lable = {route.lable}
                    active = {route.active}
                    icon = {route.icon}
                    href= {route.href}
                    onClick = {route.onClick} 
                    />
            ))
        }
        
    </div> 
    </>);
}
 
export default MobileFooter;