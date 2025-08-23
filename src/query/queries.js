import axios from "axios";
import {
    deletePassword,
    getPassword,
    getPasswords,
    restorePassword,
    savePassword,
    updatePassword,
    loginData,
    isLoggedIn,
    logout,
    getExpiredPasswords, getMultiplePasswordsByUUID
} from "./payload";

const fetchAllPasswords = async (isActive, username, password) => {
    const response = await axios.post(
        getPasswords.url,
        {
            query : getPasswords.query,
            variables : {
                isActive,
                username,
                password
            }
        },
        getPasswords.config
    );
    return response.data.data.passwords;
}

const insertPassword = async (domainNameRef , urlRef , usernameRef , emailRef , passwordRef , notesRef , masterPassword , uname) => {
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
                        "notes": notesRef.current.value,
                        uname,
                        masterPassword
                    }
            },
            savePassword.config
        );
    } catch (error){
        console.log(domainNameRef.current)
        console.log(error)
    }
}

const fetchPasswordByID = async (uuid , username , password) => {
    const response = await axios.post(
        getPassword.url,
        {
            query : getPassword.query,
            variables :
                {
                    uuid,
                    username,
                    password
                }
        },
        getPassword.config
    )
    return response.data.data.password;
}

const fetchExpiredPasswordsForNotification = async (type , username) => {
    const response = await axios.post(
        getExpiredPasswords.url,
        {
            query : getExpiredPasswords.query,
            variables : {
                "type" : type,
                "username" : username
            }
        },
        getExpiredPasswords.config
    )
    return response.data.data.notifications;
}

const fetchMultiplePasswordsByUUID = async (uuids , username) => {
    const response = await axios.post(
        getMultiplePasswordsByUUID.url,
        {
            query : getMultiplePasswordsByUUID.query,
            variables : {
                uuids,
                username
            }
        },
        getMultiplePasswordsByUUID.config
    )
    return response.data.data.multiplePasswords;
}

const deletePasswordByUuid = async (deleteUuid) => {
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

const updatePasswordQuery = async (uuid , password) => {
    try{
        await axios.post(
            updatePassword.url,
            {
                query : updatePassword.query,
                variables : {
                    "uuid" : uuid,
                    "password" : password
                }
            },
            updatePassword.config
        )
    } catch (error) {
        console.log(error)
    }
}

const restorePasswordQuery = async (uuid) => {
    try{
        await axios.post(
            restorePassword.url,
            {
                query : restorePassword.query,
                variables : {
                    "uuid" : uuid
                }
            },
            restorePassword.config
        )
    }catch (error) {
        console.log(error);
    }
}

const login = async (username, password) => {
    const credentials = new URLSearchParams();
    credentials.append("username" , username.current.value);
    credentials.append("password" , password.current.value);
    try {
        const response = await axios.post(
            loginData.url,
            credentials,
            loginData.config
        )
        return 200 === response.status;
    }catch (error) {
        return false;
    }
}

const isValidSessionPresent = async (setUsername) => {
    try{
        const response = await axios.post(
            isLoggedIn.url,
            {},
            isLoggedIn.config
        )
        if(200 === response.status){
            setUsername(response.data);
            return true;
        }
        else{
            setUsername("");
            return false;
        }
    }catch (error) {
        setUsername("");
        return false;
    }
}

const removeSession = async (setIsLoggedIn) => {
    try{
        const response = await axios.post(
            logout.url,
            null,
            logout.config
        )
        if(200 === response.status) setIsLoggedIn(false);
        else setIsLoggedIn(true);
    } catch (error){
        setIsLoggedIn(true);
    }
}

export {fetchAllPasswords , insertPassword , fetchPasswordByID , fetchMultiplePasswordsByUUID , fetchExpiredPasswordsForNotification , deletePasswordByUuid , updatePasswordQuery , restorePasswordQuery , login , isValidSessionPresent , removeSession}