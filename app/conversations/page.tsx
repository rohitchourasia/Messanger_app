"use client"

import clsx from "clsx";
import EmptyState from "../components/EmptyState";
import useConversation from "../hooks/useConveration";

const Home = ()=>{
    const {isOpen} = useConversation() ; 
    console.log("Opening stste in conversation;s pagre",isOpen)


    return (
        <div className ={clsx('h-full lg:pl-80 lg:block ',isOpen?'block':'hidden')}>
            <EmptyState/>
            </div>

    )

}
export default Home ; 