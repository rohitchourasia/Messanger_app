"use client" 
import { User } from "@prisma/client";
import Image from "next/image";
import useActiveList from "../hooks/useActiveList";
import { useEffect } from "react";
interface AvatarProp{
    currentuser?:User
}
const Avatar = ({
    currentuser
}:AvatarProp) => {
    const { members } = useActiveList();
    const isActive = members.indexOf(currentuser?.email!) !== -1;
    useEffect(()=>{

    },[isActive])
    return ( <>
    <div className="relative">
        <div className="relative inline-block rounded-full w-9 h-9 overflow-hidden md:h-11 md:w-11">
            <Image alt="Avatar" src={currentuser?.image || "/Image/user.png"} fill/>
        </div>
        {isActive && (
        <span className = {"absolute block rounded-full bg-green-500 top-0 right-0 h-23 w-2 md:h-3 md:w-3"}/>

)    }
    </div>
    </> );
}
 
export default Avatar;