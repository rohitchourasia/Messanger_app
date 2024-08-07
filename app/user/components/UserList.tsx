import { User } from "@prisma/client";
import UserListItem from "./UserListItem";

interface UserListItem {
    item:User[] 
}
const UserList = ({
    item
}:UserListItem) => {
    return ( <>
   <aside className="fixed inset-y-0 pb-20 lg:pb-0 lg:w-80 lg:left-20 lg:block overflow-y-scroll border border-r border-gray-200 block w-full left-0 ">

    <div className="px-5">
        <div  className="flex flex-col">
            <div className="text-2xl font-semibold text-black">
                People
            </div>

        </ div>
        {
            item.map((items)=>(
                <UserListItem key= {items.id} user = {items}/>
            ))
        }
    </div>
    </aside>
    </> );
}
 
export default UserList;