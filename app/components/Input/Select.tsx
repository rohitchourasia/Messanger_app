"use client" 
import ReactSelect  from 'react-select'
interface SelectProp{
    disabled?:boolean , 
    label:string , 
    value : Record<string,any>, 
    options : Record<string,any>[] , 
    onChange:(value:Record<string,any>)=>void    
}
const Select = ({
    disabled,
    label , 
    value , 
    options , 
    onChange
}: SelectProp) => {
    return ( <div>
        <label className="text-sm block text-black font-medium leading-6">
            {label}
            </label>
            <div className='mt-2'>
                <ReactSelect isDisabled={disabled} value={value} onChange={onChange} 
                isMulti 
                options={options}
                menuPortalTarget={document.body}
                styles={{
                    menuPortal:(base)=>({
                        ...base , 
                        zIndex:9999
                    })
                }}
                classNames= {
                    {
                        control:()=>"text-sm"
                    }
                }
                />
            </div>

        </div> );
}
 
export default Select;