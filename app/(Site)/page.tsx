import Image from "next/image";
import Auth from "./component/Auth";

const Home = () => {
    return ( 
    <div className="flex justify-center   min-h-full flex-col  bg-gray-100 py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md ">
            <Image alt="Logo" src="/Image/image1.png" height={48} width= {48} className="mx-auto w-auto"/>
            <h2 className="text-3xl font-bold text-center text-gray-900">
                Sign in to your account 

            </h2>
        </div>
        <div>
        <Auth/>
        </div>
        </div>);
}
 
export default Home;