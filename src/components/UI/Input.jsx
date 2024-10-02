import {forwardRef} from "react";

const Input = forwardRef(function Input({textArea , label , ...props} , ref){
    const className = "border shadow focus:outline-none focus:shadow-outline p-2 w-full rounded bg-stone-100";
    return (
        <p className="p-3">
            <label className="block font-medium mb-2">{label}</label>
            {textArea ? <textarea ref={ref} className={className} {...props} /> : <input ref={ref} {...props} className={className}/>}
        </p>
    )
});
export default Input;