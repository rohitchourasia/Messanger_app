"use client"
import clsx from "clsx"
import Link from "next/link"
import { IconType } from "react-icons"

 
interface MobileFooterItemProp {
    lable: string
    active?:boolean
    icon:IconType
    href :string
    onClick?:()=>void
}
const MobileFooterItem = ({
    lable, 
    active , 
    icon:Icon , 
    href , 
    onClick
}:MobileFooterItemProp) => {
    const handleClick = ()=>{
        if(onClick){
            return onClick() ; 
        }
    }
    return ( <>
    
        <Link href={href} onClick={handleClick} className={clsx(`group flex gap-x-3 rounded-md p-3 text-sm loading-6 font-semibold text-gray-500 hover:bg-black hover:text-gray-100`
            , active && 'bg-gray-100 text-blue-400'
        )}>
        <Icon className="h-6 w-6 shrink-0"/>
        <span>
            {lable}
        </span>
        
        </Link>

    
    </> );
}
 
export default MobileFooterItem;