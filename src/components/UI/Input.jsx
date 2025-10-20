import {forwardRef} from "react";

const Input = forwardRef(function Input({textArea , label ,extraStyles = "" , onChange, ...props} , ref){
    const className = `shadow focus:outline-none focus:shadow-outline p-2 w-full rounded bg-stone-100 ${extraStyles} border`;
    return (
        <p className="p-3">
            <label className="block font-medium mb-2" {...props} >{label}</label>
            {textArea ? <textarea onChange={onChange} ref={ref} className={className} {...props} /> : <input onChange={onChange} ref={ref} {...props} className={className}/>}
        </p>
    )
});
export default Input;