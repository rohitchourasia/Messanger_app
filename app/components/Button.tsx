import clsx from "clsx"
import { Children, ReactElement } from "react"

interface ButtonProp {
    type?:'submit'|'reset'|'button'|undefined
    secondary?:boolean 
    fullWidth?:boolean 
    children:React.ReactNode
    onClick?:()=>void 
    danger?:boolean 
    disabled?:boolean 
}
const Button = ({
    type,
    secondary,
    fullWidth,
    children,
    onClick,
    danger ,
    disabled
}:ButtonProp) => {
    return ( <>
    <button onClick={onClick} type={type} disabled={disabled}  className={clsx(` px-3 py-2 min-w-md font-semibold text-sm px-auto py-auto rounded-md border-0 ring-1 ring-inset  flex justify-center`
        ,disabled && `opacity-50 cursor-default`,fullWidth &&'w-full',secondary?'text-gray-900':'text-white',
        danger && `bg-red-500 focus-visible:outline-rose-600 hover:bg-rose-800`,
        !secondary && !danger && (`bg-blue-500 hover:bg-sky-600 focus-visible:outline-blue-500`)

    )}>
        {
            children
        }
    </button>

    </> );
}
 
export default Button;