import Modal from "./Modal";
import {Button} from "@mui/material";
import AutoDeleteIcon from '@mui/icons-material/AutoDelete';
import {useEffect, useRef} from "react";
import {useMutation} from "@tanstack/react-query";
import axios from "axios";
import {deletePassword} from "../../resources/request-body/payload";

export default function Warning({deleteUuid , refresh}){
    const showWarningRef = useRef();
    useEffect(() => {
        showWarningRef.current.open();
    }, [deleteUuid]);

    const deletePasswordByUuid = async () => {
        console.log(deleteUuid)
        try {
            await axios.post(
                deletePassword.url,
                {
                    query : deletePassword.query,
                    variables : {
                        "uuid" : deleteUuid
                    }
                },
                deletePassword.config
            )
        }catch (error){
            console.log(error)
        }
    }

    const deletePasswordMutation = useMutation({
        mutationFn : deletePasswordByUuid,
        onSuccess : () => {
            showWarningRef.current.close();
            refresh()
        },
        onError : () => console.log("error")
    })

    return(
        <Modal ref={showWarningRef} className="bg-stone-300 rounded">
            <form className="p-3" >
                <p>
                    This password will be deleted and moved to trash <AutoDeleteIcon className="text-stone-700" /> <br/>
                    It will be removed after 30days.
                </p>
                <footer className="flex gap-4 pb-2 justify-center mt-2">
                    <Button variant="outlined" size="small" onClick={() => showWarningRef.current.close()} >Cancel</Button>
                    <Button variant="contained" size="small" color="error" onClick={ () => deletePasswordMutation.mutate() } >Delete</Button>
                </footer>
            </form>
        </Modal>
    )
}