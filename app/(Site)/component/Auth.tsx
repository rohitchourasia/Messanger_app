"use client"
import Button from "@/app/components/Button";
import Input from "@/app/components/Input/input";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import AuthSocial from "./AuthSocial";
import { BsGithub, BsGoogle } from "react-icons/bs";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


type variant = 'LOGIN'|'REGISTER'
const Auth = () => {
    const router = useRouter() ; 
    const session = useSession() ; 
    const[variant,setVariant]= useState<variant>('LOGIN');
    const [isLoading,setisLoading] = useState(false);
    useEffect(()=>{
        if(session?.status==='authenticated'){
            console.log("Autheticated", session.status)
            console.log(session) 
            router.push('/user')
        }
    },[session?.status])
    const toggleVariant = useCallback(()=>{
        if(variant==='LOGIN'){
            setVariant('REGISTER')
        }
        else {
            setVariant('LOGIN')
        }
    },[variant])
    const {register,handleSubmit,formState:{
        errors
    }} = useForm<FieldValues>({
        defaultValues:{
            name:"", 
            email:"",
            password:""

        }
    })
    const onSubmit:SubmitHandler<FieldValues>=(data)=>{
        setisLoading(true)
        if(variant==='REGISTER'){
                //Axios register 
                axios.post('/api/register',data).then(()=>{
                    toast.success("Account Created")
                    signIn('credentials',data)
                }).catch(()=>toast.error("Something went wrong")).finally(()=>{
                    setisLoading(false)
                })

        }
        if(variant==='LOGIN'){
            //Next auth sign in
            signIn('credentials',{
                ...data , 
                redirect:false 

            }).then((callback)=>{
                console.log("the callback" , callback)
                if(callback?.error){
                        toast.error('Invalid Credential')
                }
                if(callback?.ok && !callback?.error){
                    toast.success('Succesfully logged in')
                    router.push('/user')

                }
            }).finally(()=>{
                setisLoading(false)
            })
        }
    }
    const socialAction  = (action:string)=>{
        setisLoading(true)
        signIn(action,{
            redirect:false
        }).then((callback)=>{
            if(callback?.error){
                toast.error('Invalid Credentials');
            }
            if(callback?.ok && !callback?.error){
                toast.success('Logged in Succesfully')
            }

        }).finally(()=>{
            setisLoading(false)
        })
    }
    return (  <>
    <div className=" sm:max-w-md sm: w-auto sm:mx-auto mt-8">
        <div className="bg-white sm:rounded-lg shadow sm:px-10 px-4 py-8">
            <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
                {
                    variant==='REGISTER' && (
                <Input id="name" register={register}  label="name"  errors={errors}/>
                    )}
                <Input id="email" register={register}  label="email"  errors={errors} disabled={isLoading}/>  
                <Input id="password" register={register}  label="Password" type="password" errors={errors} disabled={isLoading}/>  
                <Button type="submit" secondary={false} danger={false} fullWidth={true} disabled={isLoading}>
                    {
                        variant==='LOGIN'?'SIGN IN':'REGISTER'
                    }
                     </Button>

            </form>
            <div className="mt-6">
                <div  className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"/>
                        </div>
                    <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">
                    Or continue with 

                </span>
            </div>    

                </div>
                <div  className="mt-6 space-x-4 flex justify-center">
                    <AuthSocial icon={BsGoogle} onClick={()=>{
                        socialAction('google')
                    }}/>
                    <AuthSocial icon={BsGithub} onClick={()=>{
                        socialAction('github')
                    }}/>
                </ div>
                <div  className="mt-4 flex justify-center">
                < div>
                {
                    variant==='LOGIN'?'New to Messanger?':'Already Registerd!'
                }
                </div>

                <div onClick={toggleVariant} className="underline cursor-pointer">
                {
                    variant==='REGISTER'?'Create an account': 'LOG IN'
                }
                </div>

                </div>
                
            </div>
            

        </div>
    </div>
    </>);
}
 
export default Auth;