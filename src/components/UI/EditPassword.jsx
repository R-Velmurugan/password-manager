import Modal from "./Modal";
import Input from "./Input";
import {useEffect, useRef, useState} from "react";
import {Button, Divider} from "@mui/material";
import {useMutation, useQuery} from "@tanstack/react-query";
import {fetchPasswordByID, updatePasswordQuery} from "../../query/queries";
import {updatePassword} from "../../query/payload";

export default function EditPassword({uuid , refresh}){
    const [error , setError] = useState({
        css : "",
        errorMessage : ""
    })
    const editPasswordRef = useRef();

    const currentPasswordRef = useRef();
    const newPasswordRef = useRef();
    const newPasswordRetypeRef = useRef();

    const {data} = useQuery({
        queryKey : ["currentPassword"],
        queryFn : () => fetchPasswordByID(uuid)
    })
    const updatePassword = useMutation({
        mutationFn : () => updatePasswordQuery(uuid , newPasswordRetypeRef.current.value),
        onSuccess : () => {
            editPasswordRef.current.close();
            refresh();
        },
        onError : () => console.log("error")
    })

    useEffect(() => {
        editPasswordRef.current.open();
    }, [uuid]);

    const validateInput = () => {
        if (!currentPasswordRef.current.value || !newPasswordRef.current.value || !newPasswordRetypeRef.current.value){
            setError({
                css: "border-red-600",
                errorMessage: "This field is mandatory"
            })
        }
        else{
            if(decodePassword(data.password) !== currentPasswordRef.current.value){
                setError({
                    css: "border-red-600",
                    errorMessage: "Entered password does not match existing password"
                })
            }
            else{

                updatePassword.mutate();
            }
        }
    }

    const decodePassword = (encryptedPassword) => {
        return encryptedPassword;
    }

    return(
        <Modal ref={editPasswordRef} className="bg-stone-300 rounded">
            <form className="p-3">
                <Input ref={currentPasswordRef} label="Enter your Current Password" extraStyles={error.css}/>
                <p className="text-red-600 ml-3" >{error.errorMessage}</p>
                <Divider variant="middle"/>
                <Input ref={newPasswordRef} label="Enter your new Password"/>
                <Input ref={newPasswordRetypeRef} label="Retype your new Password"/>

                <footer className="flex gap-4 pb-2 justify-center mt-2">
                    <Button variant="outlined" size="small"
                            onClick={() => editPasswordRef.current.close()}>Cancel</Button>
                    <Button onClick={validateInput} variant="contained" size="small" color="error"
                            >Update</Button>
                </footer>
            </form>
        </Modal>
    )
}