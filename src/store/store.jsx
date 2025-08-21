import {createContext} from "react";

const UserContext = createContext({
    username : "",
    password : "",
    setUsername : (username) => {},
    setPassword : (password) => {}
});


export default UserContext;