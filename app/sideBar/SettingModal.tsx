"use client"

import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Modal from "../components/Modal";
import Input from "../components/Input/input";
import Image from "next/image";
import { CldUploadButton } from "next-cloudinary";
import Button from "../components/Button";

interface SettingModalProp{
    isSettingOpen?:boolean , 
    onClose: ()=>void , 
    currentuser:User
}
const SettingModal = ({
    isSettingOpen , 
    onClose , 
    currentuser
}:SettingModalProp) => {
    const router = useRouter() ; 
    const [isLoading,setisLoading] = useState(false);
    const {
        register , 
        handleSubmit , 
        setValue , 
        watch , 
        formState:{
            errors
        }

    }= useForm<FieldValues>({
        defaultValues:{
            name: currentuser?.name , 
            image : currentuser?.image

        }
    }

    )
    const image = watch('image')
    const handleUpload = (result:any)=>{
        setValue('image',result?.info?.secure_url,{
            shouldValidate:true 
        })
    }
    const onSubmit : SubmitHandler<FieldValues>= (data)=>{
        setisLoading(true)
        axios.post('/api/settings',data).then(()=>{
            router.refresh() ; 
            onClose() ; 
        }).catch(()=> toast.error('Something went wrong')).finally(()=>setisLoading(false))
    }


    return ( 
        <Modal isOpen= {isSettingOpen} onClose={onClose}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-10">
                    <div className="border-b border-gray-900/10 pb-12 ">
                        <h2 className="font-semibold text-base text-gray-900">
                            Profile:
                        </h2>
                        <p className="text-gray-600 text-sm mt-1">
                            Edit your public Information 
                        </p>
                        <div>
                            <Input  required disabled={isLoading} label="Name" id="name" register={register} errors={errors}/>

                        </div>
                        <div className="mt-5">
                            <label className="text-sm block font-medium text-gray-900">
                                        Photo
                            </label>
                            <div   className="flex space-x-2">
                            <div >
                                <Image alt="Avatar" height={44} width={44} className="rounded-full" 
                                src= {image || currentuser?.image || '/Image/user.png'}/>
                            </div>
                            <CldUploadButton options={{maxFiles:1}} onSuccess={handleUpload} uploadPreset="wcuhe8iu">
                                <Button secondary disabled={isLoading} type="button">
                                        Change
                                </Button>
                            </CldUploadButton>
                            </div>
                        </div>
                    </div>
                    <div className= " mt-6 flex items-center justify-end">
                        <Button secondary disabled={isLoading} onClick={onClose} type="button">
                            Cancel
                        </Button>
                        <Button  disabled={isLoading} type="submit">
                             Save
                        </Button>

                    </div>
                </div>
            </form>

        </Modal>
     );
}
 
export default SettingModal;