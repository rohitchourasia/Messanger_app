import { getUser } from "../action/getUser"
import DesktopSideBar from "./DesktopSideBar"
import MobileFooter from "./MobileFooter"


export default async function SideBar({
    children
}:{
    children:React.ReactNode
}){
    const currentuser = await getUser() 
return (
    
    <div className="h-full">
       
        <DesktopSideBar currentuser ={currentuser!}/>
        <MobileFooter currentuser={currentuser!}/>
        <main className=" lg:pl-20 h-full">
      
        {children}
        </main>
       
    </div>
)

}