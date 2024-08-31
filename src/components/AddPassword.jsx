import Modal from "./UI/Modal";
import Input from "./UI/Input";
import {Button} from "@mui/material";
import {useRef} from "react";
import axios from "axios";
import {useMutation} from "@tanstack/react-query";
import {savePassword} from "../resources/request-body/payload";

export default function AddPassword({addPasswordRef , refresh}){
    const formRef = useRef();
    const domainNameRef = useRef();
    const urlRef = useRef();
    const usernameRef = useRef();
    const passwordRef = useRef();
    const emailRef = useRef();
    const notesRef = useRef();

    const insertPassword = async () => {
        try {
            await axios.post(
                savePassword.url,
                {
                    query:savePassword.query,
                    variables:
                        {
                            "domain": domainNameRef.current.value,
                            "url": urlRef.current.value,
                            "username": usernameRef.current.value,
                            "email": emailRef.current.value,
                            "password": passwordRef.current.value,
                            "notes": notesRef.current.value
                        }

                },
                savePassword.config
            );
        } catch (error){
            console.log(domainNameRef.current)
            console.log(error)
        }
    }

    const mutation = useMutation({
        mutationFn : insertPassword,
        onSuccess : () => {
            addPasswordRef.current.close()
            refresh();
        },
        onError : () => console.log("error")
    })

    return(
        <Modal ref={addPasswordRef} className= "rounded w-2/5 bg-gray-50 mr-72 backdrop:bg-gray-400 backdrop:bg-opacity-50">
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
                        addPasswordRef.current.close();
                    }}>Cancel</Button>
                    <Button variant="contained" onClick={() => mutation.mutate()}>Save</Button>
                </footer>
            </form>
        </Modal>
    );
}