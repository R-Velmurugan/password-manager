import Modal from "./UI/Modal";
import Input from "./UI/Input";
import {Button} from "@mui/material";
import {useRef} from "react";
import {useMutation} from "@tanstack/react-query";
import {insertPassword} from "../query/queries";

export default function AddPassword({addEditPasswordRef , refresh , isEdit = false , uuid = ""}){
    const formRef = useRef();
    const domainNameRef = useRef();
    const urlRef = useRef();
    const usernameRef = useRef();
    const passwordRef = useRef();
    const emailRef = useRef();
    const notesRef = useRef();



    const mutation = useMutation({
        mutationFn : () => insertPassword(
            domainNameRef,
            urlRef,
            usernameRef,
            emailRef,
            passwordRef,
            notesRef
        ),
        onSuccess : () => {
            addEditPasswordRef.current.close()
            refresh();
        },
        onError : () => console.log("error")
    })

    return(
        <Modal ref={addEditPasswordRef} className= "rounded w-2/5 bg-stone-200 mr-72 backdrop:bg-gray-400 backdrop:bg-opacity-50">
            <form ref={formRef} method="dialog" className="px-5">
                <Input ref={domainNameRef} label="Domain Name" />
                <Input ref={urlRef} type = "url"  label="URL" />
                <Input ref={usernameRef} type = "text"  label="Username" />
                <Input ref={passwordRef} type = "password"  label="Password" />
                <Input ref={emailRef} type = "email"  label="e-mail" />
                <Input ref={notesRef} textArea label="Notes" />
                <footer className="flex gap-4 pb-2 justify-center">
                    <Button variant="outlined" onClick={() => {
                        formRef.current.reset();
                        addEditPasswordRef.current.close();
                    }}>Cancel</Button>
                    <Button variant="contained" onClick={() => mutation.mutate()}>Save</Button>
                </footer>
            </form>
        </Modal>
    );
}