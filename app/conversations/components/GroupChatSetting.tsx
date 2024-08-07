"use client"
import Button from "@/app/components/Button";
import Input from "@/app/components/Input/input";
import Select from "@/app/components/Input/Select";
import Modal from "@/app/components/Modal";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

 
interface GroupChatSettingProp{
    users:User[], 
    isModalOpen:boolean , 
    onClose:()=>void 
}
const GroupChatSetting = ({
    users,
    isModalOpen,
    onClose
}:GroupChatSettingProp) => {
    const router = useRouter(); 
    const[isLoading,setisLoading] =  useState(false) ; 
    const {
      register , 
      handleSubmit , 
      formState:{
        errors
      },
      watch ,
      setValue
    }= useForm<FieldValues>({
        defaultValues: {
            name:'',
            members:[]
        },
    }
    )
    const members = watch('members')
    const onSubmit: SubmitHandler<FieldValues>= (data)=>{
        setisLoading(true) ; 
        axios.post('/api/conversations',{
            ...data,
            isGroup:true
        }).then(()=>{
            router.refresh() ; 
            onClose() ; 

        }).catch(()=> toast.error("Something went wrong")).finally(()=>setisLoading(false))
    }
    return ( 
        <Modal isOpen={isModalOpen} onClose={onClose}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-10">
                        <h2 className="text-base font-bold text-black">
                            Create a group Chat
                            </h2>
                            <p className="font-semibold leading-6 text-gray-900">
                                Chat with more than two people

                            </p>
                            <div className="flex flex-col mt-10 gap-y-8">
                        <Input register={register} label="Name" id="name" disabled={isLoading} required errors={errors}/>
                        <Select disabled={isLoading} label="Members" options={
                            users.map((user)=>(
                                {
                                    value:user.id , 
                                    label:user.name
                                }
                            ))
                        }
                        onChange = {(value)=>{
                            setValue('members',value,{
                                shouldValidate:true
                            })
                        }}
                        value={members}
                        />
                    </div>    
                        
                    </div>
                    
                </div>
                <div className= " flex gap-x-3 justify-end items-center">
                    <Button type="button" disabled={isLoading} onClick={onClose} secondary >
                      Cancel  
                    </Button>
                    <Button type="submit" disabled= {isLoading} >
                        Create
                        </Button>
                </div>
            </form>

        </Modal>
     );
}
 
export default GroupChatSetting;