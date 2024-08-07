import getUsers from "../action/getUsers"
import SideBar from "../sideBar/SideBar"
import UserList from "./components/UserList";

export default async function userLayout(
    {
        children
    }:{
        children:React.ReactNode
    }
) {
    const users = await getUsers() ; 
    return (
    
        <SideBar>
        <div className="h-full">
            <UserList item={users}/>
            {
                children
            }
        </div>
        </SideBar>
    )


}