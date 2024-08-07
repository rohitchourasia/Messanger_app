import { usePathname } from "next/navigation"
import useConversation from "./useConveration";
import { HiChat } from "react-icons/hi";
import { HiArrowLeftOnRectangle, HiUser } from "react-icons/hi2";
import { useMemo } from "react";
import { signOut } from "next-auth/react";


const useRoute = ()=>{
    const pathname = usePathname() ; 
    const {conversationId} = useConversation() ; 
    const route = useMemo(()=>[
        {
            lable:'Chat' , 
            href:'/conversations', 
            icon:HiChat ,
            active: pathname==='/conversations' || !!conversationId
        },
        {
            lable: 'User',
            href : '/user', 
            icon: HiUser,
            active : pathname==='/user'
        },
        {
            lable: 'Logout',
            href : '#' , 
            onClick: ()=> signOut() ,
            icon:HiArrowLeftOnRectangle
        }
    ],[pathname,conversationId])
    return route 
}
export default useRoute
