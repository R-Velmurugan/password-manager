import Modal from "./UI/Modal";
import {Avatar, Card, CardContent, CardHeader, Divider, IconButton} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import {useQuery} from "@tanstack/react-query";
import FaviconFetcher from "./UI/FaviconFetcher";
import {useEffect, useRef} from "react";
import {fetchPasswordByID} from "../query/queries";
export default function Password({uuid , setUuid}){
    const showPasswordRef = useRef();


    const {data , isLoading , isError} = useQuery({
        queryKey : ["password" , uuid],
        queryFn : () => fetchPasswordByID(uuid),
        enabled : !!uuid
    })

    useEffect(() => {
        if(data && showPasswordRef.current){
            showPasswordRef.current.open();
        }
    } , [data])

    if(isLoading) return <></>
    if(isError) {
        return <b>Bruh</b>
    }
    if(data === null){
        return(
            <h1>ERROR</h1>
        );
    }
    return(
        <Modal ref={showPasswordRef} className="focus:outline-none">
            <Card>
                <CardHeader sx={{
                    '.MuiCardHeader-title': {
                        fontSize: '1.2rem',
                    },
                }}
                    avatar={
                        <Avatar sx={{bgcolor : 'transparent'}} variant="square">
                            <FaviconFetcher url={data ? data.url : "localhost"} domainName={data ? data.domain : "localhost"} size={64}/>
                        </Avatar>
                    }
                    title={data ? <a href={data.url} rel="noreferrer" target="_blank" >{data.domain}</a> : "localhost"}
                    action={
                        <IconButton onClick={() => {
                            showPasswordRef.current.close();
                            setUuid("");
                        }} >
                            <CloseIcon/>
                        </IconButton>
                    }
                />
                <Divider variant="middle" />
                <CardContent>
                    <p className = "grid grid-cols-3 gap-x-3 gap-y-1" >
                        <span className="col-span-1">Username</span>
                        <span className="col-span-2">{data.username}</span>

                        <span className="col-span-1">Email</span>
                        <span className="col-span-2">{data.email}</span>

                        <span className="col-span-1">Password</span>
                        <span className="flex align-middle col-span-2" >
                            <input className="disabled caret-transparent focus:outline-none border-none "
                                   type="password" value={data.password}/>
                            <lord-icon src="https://cdn.lordicon.com/lyrrgrsl.json" trigger="click"
                                       onClick={() => navigator.clipboard.writeText(data.password)}>
                            </lord-icon>
                        </span>

                    </p>
                </CardContent>
            </Card>
        </Modal>
    );
}