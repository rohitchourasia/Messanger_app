"use client"
import getConversation from "@/app/action/getConversations";
import Button from "@/app/components/Button";
import Modal from "@/app/components/Modal";
import useConversation from "@/app/hooks/useConveration";
import { DialogTitle } from "@headlessui/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { FiAlertTriangle } from "react-icons/fi"

 
interface ConfirmModalProp {
    isOpen:boolean , 
    onClose : ()=>void
}
const ConfirmModal = ({
    isOpen, 
    onClose
}:ConfirmModalProp) => {
    const router = useRouter() ; 
    const [ loading , setLoading] = useState(false)
    const {conversationId} = useConversation() ; 
    const onDelete = useCallback(()=>{
            setLoading(true) ; 
            axios.delete(`/api/conversations/${conversationId}`).then(()=>{
                onClose() ; 
                router.push('/conversations');
                router.refresh() ; 
            }).catch(()=> toast.error("Something went wrong")).finally(()=>setLoading(false))
    },[conversationId,router,onClose])
    return ( 
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="sm:flex sm:items-start">
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 
                sm:mx-0 sm:h-10 sm:w-10">
                    <FiAlertTriangle/>

                </div>
                <div className="text-center mt-3 sm:ml-4 sm:mt-0 sm:text-left">
                    <DialogTitle as="h3" className="font-semibold leading-6 text-gray-900">
                        Delete Conversation 
                    </DialogTitle>
                    <div className="text-sm text-gray-400">
                        Are you sure you want to delete this Conversation? 
                    </div>
                    </div>

            </div>
            <div className="mt-5 sm:mt-4 flex  justify-center gap-x-8 ">
                <Button onClick={onDelete} danger  disabled={loading} >
                    Delete
                </Button>
                <Button onClick={onClose} secondary disabled={loading}>
                Cancel
                </Button>
            </div>

        </Modal>
     );
}
 
export default ConfirmModal;