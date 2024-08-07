import { clsx } from "clsx";
import {  FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputParams{
     label:string ,
     id:string , 
     type?:string , 
     required?:boolean , 
     register:UseFormRegister<FieldValues>  
     errors:FieldErrors , 
     disabled?:boolean 
}
const Input = ({
    label,
    id,
    type,
    required,
    register,
    errors,
    disabled
}:InputParams) => {
    
    return (  <>
    <div>
    <label className="">
        {label}
    </label>
    <div>
        <input id={id} type={type} autoComplete={id} disabled={disabled} {...register(id,{required})}
        className={clsx(`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset 
        ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-500 sm:text-sm sm:leading-6`,disabled && 'opacity-50 cursor-default',errors[id]&&'ring-rose-600')}/>
    </div>
    </div>
    </>);
}
 
export default Input;