"use client"

import { useState } from "react";
import useRoute from "../hooks/useRoutes";
import DesktopSideBarItem from "./DesktopSideBarItem";
import { User } from "@prisma/client";
import Avatar from "../components/Avatar";
import SettingModal from "./SettingModal";
interface DesktopSideBarProp{
    currentuser:User
}
const DesktopSideBar = ({
    currentuser
}:DesktopSideBarProp) => {
    const route = useRoute() ;
    
    const [isOpen,setOpen] = useState(false)
    return ( 
        <>
        <SettingModal isSettingOpen={isOpen} currentuser={currentuser} onClose = {()=> setOpen(false)}/>
         <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-20 xl:px-6 lg:overflow-y-auto lg:bg-white lg:border-r-[2px] lg:pb-4 lg:flex lg:flex-col justify-between" >
        <nav className="flex flex-col mt-4 justify-between">
            
            <ul role="list" className="flex flex-col items-center space-y-1">
                {
                    route.map((item:any)=>(
                        <DesktopSideBarItem
                        key = {item.lable}
                        label= {item.lable}
                        icon = { item.icon}
                        href =  {item.href}
                        active = {item.active} 
                        onClick = {item.onClick}/>
                    ))
                }

            </ul>
            </nav>
            <nav className="mt-4 flex flex-col justify-between items-center ">
                    <div onClick={()=>{
                        setOpen(true)
                    }} className="cursor pointer hover:opacity-70 transition">
                        <Avatar currentuser={currentuser}/>

                    </div>
            </nav>
    </div>
    </> );
}
 
export default DesktopSideBar;