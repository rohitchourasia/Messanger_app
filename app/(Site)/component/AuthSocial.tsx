import { IconType } from "react-icons";


interface IconProp {
    icon:IconType,
    onClick: ()=> void 
}
const AuthSocial = ({
    icon:Icon ,
    onClick
}:IconProp) => {
    return ( 
    <button  onClick={onClick} className="
    inline-flex,
    min-w-md , 
    justify-center , 
    rounded-md , 
    bg-white  ,
    
    px-4 , 
    py-2 , 
    ring-gray-400 , 
    ring-1 ,
    ring-inset
    hover:bg-gray-400 , 
    focus:outline-offset-0
 ">
        <Icon/>
    </ button>
     );
}
 
export default AuthSocial;