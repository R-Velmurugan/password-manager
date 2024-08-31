import {createPortal} from "react-dom";
import {forwardRef, useImperativeHandle, useRef} from "react";

const Modal = forwardRef(function Modal({children , className} , ref){
    const dialogRef = useRef();

    useImperativeHandle(ref , () => {
        return {
            open() {
                dialogRef.current.showModal();
            },
            close(){
                dialogRef.current.close();
            }
        }
    })

    return (
        createPortal(
            <dialog className={className} ref={dialogRef}>{children}</dialog> ,
            document.getElementById("modal")
        )
    );
});

export default Modal;