"use client"
import useConversation from "@/app/hooks/useConveration";
import axios from "axios";
import { FieldValue, FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { HiMiniPaperAirplane, HiPhoto } from "react-icons/hi2";
import MessageInput from "./MessageInput";
import { HiPaperAirplane } from "react-icons/hi";
import { CldUploadButton } from 'next-cloudinary';
 

 
const Form = () => {
    const {conversationId} = useConversation();
    const {register,handleSubmit,setValue,formState:{
        errors
    }} = useForm<FieldValues>({
        defaultValues: {
            message:''
        },
    })
    const onSubmit : SubmitHandler<FieldValues>= (data)=>{
        setValue('message',' ',{shouldValidate:true})
        axios.post('/api/messages',{
            ...data,
            conversationId
        })
    }
    const handleUpload = (result:any)=>{
        console.log("here", result)
        axios.post('/api/messages',{
            image: result?.info?.secure_url,
            conversationId
        })
    }
    return ( <div className="flex py-4 px-4 bg-white border-t  items-center w-full gap-2 lg:gap-4">
        <CldUploadButton options={{maxFiles:1}} onSuccess={handleUpload} uploadPreset="wcuhe8iu">
        <HiPhoto size={22} className="text-blue-500"/>
        </CldUploadButton>
        <form onSubmit={handleSubmit(onSubmit)} className="flex items-center gap-2 w-full">
            <MessageInput id="message" register ={register} errors = {errors} required placeholder = "Write a message"/>
            <button type="submit" className="rounded-full p-2 cursor-pointer bg-sky-700 hover:bg-sky-600 transition ">
                <HiMiniPaperAirplane size={22} className="text-white"/>
            </button>

        </form>
    </div> );
}
 
export default Form;