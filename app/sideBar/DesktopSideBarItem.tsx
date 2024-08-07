"use client"
import clsx from "clsx";
import Link from "next/link";
import { IconType } from "react-icons";

 
interface DesktopSideBarItemProp {
    label:string ,
    href : string ,
    icon : IconType , 
    active? : Boolean , 
    onClick?:()=>void
}
const DesktopSideBarItem = ({
    label,
    href,
    icon:Icon,
    active,
    onClick
}:DesktopSideBarItemProp) => {

    const handleClick = ()=>{
        if(onClick){
            return onClick() ; 
        }
    }
    return ( <>
    <li onClick = {handleClick}>
        <Link href={href}  className={clsx(`group flex gap-x-3 rounded-md p-3 text-sm loading-6 font-semibold text-gray-500 hover:bg-black hover:text-gray-100`
            , active && 'bg-gray-100 text-blue-400'
        )}>
        <Icon className="h-6 w-6 shrink-0"/>
        <span className="sr-only">
            {label}
        </span>
        
        </Link>

    </li>
    </> );
}
 
export default DesktopSideBarItem;