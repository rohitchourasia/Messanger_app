import prisma from '@/app/libs/prismadb';

const getMessage = async(conversationId:string)=>{
    try {
        const messages = await prisma.message.findMany({
            where:{
                    conversationId
            },
            include:{
                seen:true , 
                sender:true 

            },
            orderBy:{
                createdAt:'asc'
            }
        })
        return messages 
    }
    catch(error:any){
        return [] ; 

    }

}
export default getMessage
