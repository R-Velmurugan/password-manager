import {createContext} from "react";

const UserContext = createContext({
    username : "",
    vaultKey : "",
    setUsername : (username) => {},
    setVaultKey : (password) => {}
});


export default UserContext;