import {createPortal} from "react-dom";
import {useEffect, useRef} from "react";

export default function Modal({children , open , className}){
    const dialogRef = useRef();
    useEffect(() => {
        if(open){
            dialogRef.current.showModal();
        }
    }, [open]);
    return (
        createPortal(
            <dialog className={className} ref={dialogRef}>{children}</dialog> ,
            document.getElementById("modal")
        )
    );
}