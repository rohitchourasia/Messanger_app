import getConversation from "../action/getConversations"
import getUsers from "../action/getUsers";
import SideBar from "../sideBar/SideBar"
import ConversationList from "./components/ConversationList";

export default async function ConversationLayout({

    children
}:{
        children:React.ReactNode
    }
){
    const conversations = await getConversation() ; 
    const users = await getUsers() ; 
    return (
        <SideBar>
           
            <div className="h-full border ">
            <ConversationList itemList = {conversations} users={users}/>
                {children}
            </div>

        </SideBar>
    )

}