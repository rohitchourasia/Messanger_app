import getSession from "./getSession"
import prisma from '@/app/libs/prismadb';
export async function getUser() {
    try {

        const session = await getSession() ; 
        
        if(!session?.user?.email){
            return null ; 
        }
        const user = await prisma.user.findUnique({
            where :{
               email:session.user.email  
            }
        })
        if(!user){
            return null ; 
        }
        return user ; 
    }
    catch (error:any){
        return null 
    }
    
    
    
}