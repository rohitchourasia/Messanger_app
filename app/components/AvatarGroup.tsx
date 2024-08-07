"use client"
import { User } from "@prisma/client";
import Image from "next/image";

 
interface AvatarGroupProp{
    users:User[]
}
const AvatarGroup = ({
    users
}:AvatarGroupProp) => {
    const topUsers  = users?.slice(0,3) ; 
    const positionStyle = {
        0:'top-0 left-[12px]',
        1:'bottom-0',
        2: 'bottom-0 right-0'
    }
    return ( <div className="relative h-11 w-11">
        {
            topUsers.map((user,index)=>(
                <div key={user.id} className={
                    `absolute inline-block rounded-full overflow-hidden h-[21px] w-[21px] ${positionStyle[index as keyof typeof positionStyle]}`
                }>
                    <Image alt="Avatar" fill src={user?.image || '/Image/user.png'}/>

                    </div>
            ))
        }
    </div> );
}
 
export default AvatarGroup;