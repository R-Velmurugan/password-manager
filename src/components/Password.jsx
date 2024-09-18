import Modal from "./UI/Modal";
import {Avatar, Card, CardContent, CardHeader, Divider} from "@mui/material";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {getPassword} from "../resources/request-body/payload";
import FaviconFetcher from "./UI/FaviconFetcher";
export default function Password({showPasswordRef , uuid}){
    const fetchPasswordByID = async () => {
        const response = await axios.post(
            getPassword.url,
            {
                query : getPassword.query,
                variables :
                    {
                        "uuid" : uuid
                    }
                },
            getPassword.config
        )
        return response.data.data.password;
    }

    const {data , isLoading , isError} = useQuery({
        queryKey : ["password" , uuid],
        queryFn : fetchPasswordByID,
    enabled : !!uuid
    })

    if(isLoading) return <b>Eh! wait for sometime</b>
    if(isError) {
        return <b>Bruh</b>
    }
    console.log(data);
    if(data === null){
        return(
            <h1>ERROR</h1>
        );
    }
    return(
        data && <Modal ref={showPasswordRef} className="focus:outline-none">
            <Card>
                <CardHeader sx={{
                    '.MuiCardHeader-title': {
                        fontSize: '1.2rem',
                    }
                }}
                    avatar={
                        <Avatar sx={{bgcolor : 'transparent'}} >
                            <FaviconFetcher url={data.url} domainName={data.domain} size={64}/>
                        </Avatar>
                    }
                    title={data.domain}
                />
                <Divider variant="middle" />
                <CardContent>
                    <p className="flex" >
                        <span className="" >Username</span>
                        <span>{data.username}</span>
                    </p>
                </CardContent>
            </Card>
        </Modal>
    );
}