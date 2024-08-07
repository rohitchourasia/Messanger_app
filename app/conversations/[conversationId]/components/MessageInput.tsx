"use client"

import { FieldError, FieldErrors, FieldValue, FieldValues, UseFormRegister } from "react-hook-form";

interface MessageInputProp{
    id: string , 
    register : UseFormRegister<FieldValues>
    placeholder?:string , 
    errors: FieldErrors<FieldValues> ,
    required?:boolean ,
    type?:string
}
const MessageInput = ({
    id,
    register , 
    placeholder , 
    errors , 
    required,
    type
}:MessageInputProp) => {
    return ( <div className="relative w-full">
    <input id= {id} placeholder= {placeholder} type= {type} autoComplete={id} {...register(id,{required})} 
    className="rounded-full bg-neutral-100 font-light text-black focus:outline-none w-full py-2 px-4"/>
    </div> );
}
 
export default MessageInput;