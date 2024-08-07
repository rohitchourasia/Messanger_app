import getConversationById from "@/app/action/getConversationById"
import getMessage from "@/app/action/getMessage"
import EmptyState from "@/app/components/EmptyState"
import Header from "./components/Header"
import Body from "./components/Body"
import Form from "./components/Form"

interface Iparams {
    conversationId:string 
}
const ConversationId = async({params}:{params:Iparams})=>{
    const message = await getMessage(params.conversationId) ;
    console.log("Messages",message)
    const conversation= await getConversationById(params.conversationId) ; 

    if(!conversation){
        return (
            <div className="lg:pl-80 h-full ">
                <div className="h-full flex flex-col">
                    <EmptyState/>
                </div>
            </div>
        )
    }
    return (
        <div className="lg:pl-80 h-full  ">
            <div className="h-full flex flex-col ">
                <Header conversation= {conversation}/>
                <Body intialmessages = {message}/>
                <Form/>
            </div>
        </div>
    )

}
export default ConversationId