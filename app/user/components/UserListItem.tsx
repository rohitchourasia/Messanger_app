"use client"
import Avatar from "@/app/components/Avatar";
import LoadingModal from "@/app/components/LoadingModal";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

interface UserListItemProp{
    user:User
}

const UserListItem = ({
    user
}:UserListItemProp) => {
    const router = useRouter() ; 
    const [loading,setisLoading] = useState(false)
    const handleClick = useCallback(() => {
        setisLoading(true);
    
        axios.post('/api/conversations', { 
          userId: user.id
        })
        .then((data) => {
          router.push(`/conversations`);
        })
        .finally(() => setisLoading(false));
      }, [user, router]);
    
    return (  <>
    { loading && (
    <LoadingModal/>
    )
}
    <div onClick={handleClick} className=" cursor-pointer w-full relative flex items-center space-x-3 bg-white p-3 hover:bg-neutral-100  rounded-lg transition">
        <Avatar  currentuser = {user} />
        <div className="min-w-0 flex-1  ">
            <div className="focus:outline-none  ">
                <div className="flex justify-between items-center  ">
            <p className="text-sm font-medium text-gray-900">
                {user.name}
            </p>
            </div>
            </div>
        </div>

    </div>
    </>);
}
 
export default UserListItem;