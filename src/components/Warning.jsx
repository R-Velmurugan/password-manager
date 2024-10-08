import Modal from "./UI/Modal";
import {Button} from "@mui/material";
import AutoDeleteIcon from '@mui/icons-material/AutoDelete';
import {useEffect, useRef} from "react";
import {useMutation} from "@tanstack/react-query";
import {deletePasswordByUuid} from "../query/queries";

export default function Warning({deleteUuid, setDeleteUuid , refresh}){
    const showWarningRef = useRef();
    useEffect(() => {
        showWarningRef.current.open();
    }, [deleteUuid]);



    const deletePasswordMutation = useMutation({
        mutationFn : () => deletePasswordByUuid(deleteUuid),
        onSuccess : () => {
            showWarningRef.current.close();
            setDeleteUuid("");
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