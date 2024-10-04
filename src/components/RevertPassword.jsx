import Modal from "./UI/Modal";
import {Button} from "@mui/material";
import {useEffect, useRef} from "react";
import {useMutation} from "@tanstack/react-query";
import {restorePasswordQuery} from "../query/queries";

export default function RevertPassword({revertUuid , domainName , refresh , setRevertUuid}){
    const showConfirmRef = useRef();

    const revertSelectedPassword = useMutation({
        mutationFn : () => restorePasswordQuery(revertUuid),
        onSuccess : () => {
            showConfirmRef.current.close();
            setRevertUuid({
                uuid : "",
                domainName : ""
            })
            refresh();
        },
        onError : () => console.log("error")
    })

    useEffect(() => {
        showConfirmRef.current.open();
    }, [revertUuid]);

    return(
        <Modal ref={showConfirmRef} className="bg-stone-300 rounded">
            <form className="p-3" >
                <p>
                    Restore {domainName} to the active windows?
                </p>
                <footer className="flex gap-4 pb-2 justify-center mt-2">
                    <Button variant="outlined" size="small" onClick={() => showConfirmRef.current.close()} >Cancel</Button>
                    <Button variant="contained" size="small" color="success" onClick={ () => revertSelectedPassword.mutate() } >Restore</Button>
                </footer>
            </form>
        </Modal>
    )
}