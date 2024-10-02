import axios from "axios";
import {deletePassword, getPassword, getPasswords, savePassword} from "./payload";

const fetchAllPasswords = async () => {
    const response = await axios.post(
        getPasswords.url,
        getPasswords.data,
        getPasswords.config
    );
    return response.data.data.passwords;
}

const insertPassword = async (domainNameRef , urlRef , usernameRef , emailRef , passwordRef , notesRef) => {
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

const fetchPasswordByID = async (uuid) => {
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
const deletePasswordByUuid = async (deleteUuid) => {
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

export {fetchAllPasswords , insertPassword , fetchPasswordByID , deletePasswordByUuid}