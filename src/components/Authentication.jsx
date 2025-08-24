import Input from "./UI/Input";
import {useContext, useRef, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {login , register} from "../query/queries";
import {Box, Button, Tooltip} from "@mui/material";
import {useNavigate} from "react-router-dom";
import UserContext from "../store/store";

export default function Authentication() {
    const userNameRef = useRef();
    const passwordRef = useRef();
    const registrationUsernameRef = useRef();
    const registrationPasswordRef = useRef();
    const registrationRetypePasswordRef = useRef();
    const registrationEmailRef = useRef();
    const navigate = useNavigate();
    const UserCtx = useContext(UserContext);
    const [isLoginView , setIsLoginView] = useState(true);
    const {refetch : signIn} = useQuery({
        queryKey : ["login"],
        queryFn : async () => {
            let isSuccess = await login(userNameRef, passwordRef);
            if(isSuccess){
                UserCtx.setUsername(userNameRef.current.value);
                UserCtx.setPassword(passwordRef.current.value);
                navigate("/all-passwords");
            }
        },
        enabled: false
    })

    const {refetch : signUp} = useQuery({
        queryKey : ["register"],
        queryFn : async () => {
            let isSuccess = await register(registrationUsernameRef, registrationPasswordRef , registrationEmailRef);
            if(isSuccess) setIsLoginView(true);
            else setIsLoginView(false);
        },
        enabled : false
    })

    return (
        <section className="relative m-auto border border-solid border-slate-800 rounded-md bg-gradient-to-b from-[#050E18] via-[#04111F] to-[#050E18]">
            <h1 className="text-stone-200 p-2 font-bold flex items-center text-xl text-center">
                <lord-icon
                    src="https://cdn.lordicon.com/rhvyamqh.json"
                    trigger="loop"
                    colors="primary:#915110"
                    style=
                        {{width:40 , height:40}}>
                </lord-icon>
                Caput Draconis
            </h1>
            {isLoginView ?
                <Login userNameRef={userNameRef} passwordRef={passwordRef} login={() => signIn()}
                       shouldRegister={() => setIsLoginView(false)}/> :
                <Register usernameRef={registrationUsernameRef} passwordRef={registrationPasswordRef}
                          reEnteredPassword={registrationRetypePasswordRef} emailRef={registrationEmailRef}
                          register={() => signUp()}
                          shouldLogin={() => setIsLoginView(true)}/>
            }
        </section>
    )
}

const Login = ({userNameRef , passwordRef , login , shouldRegister}) => {
    return (
        <form key="login" className="p-4">
            <Input ref={userNameRef} className="text-stone-200"
                   extraStyles="!bg-black border border-solid border-slate-800 text-stone-200" label="Username"
                   type="text"/>
            <Input ref={passwordRef} className="text-stone-200"
                   extraStyles="!bg-black border border-solid border-slate-800 text-stone-200" label="Password"
                   type="password"/>
            <Box sx={{padding: 1.5}}>
                <Button sx={{'&:hover': {backgroundColor: "#6c98eb"}}} fullWidth type="button" onClick={login}
                        variant="contained">
                    Sign in
                </Button>
            </Box>

            <p className="text-stone-500 text-center pb-8 pt-5">New Here?
                <a className="cursor-pointer text-blue-900 hover:underline" onClick={shouldRegister} > Sign up</a>
            </p>
        </form>
    )
}

const Register = ({usernameRef , passwordRef , reEnteredPassword , emailRef , register , shouldLogin}) => {
    const tooltips = {
        username : "This username cannot be changed after registering. So pick a good one ;)",
        password : "Rule of thumb is to have a min length of 10 and a mix of uppercase, lowercase, digits and special characters. Avoid using personal and predictable data",
        reEnteredPassword : "This is to make sure that you are entering the wanted password without a typo",
        email : "For authentication and notification purposes."
    }
    return (
        <form key="sign-up"  className="p-4">
            <Tooltip title={tooltips.username} placement="right">
                <Input ref={usernameRef} className="text-stone-200"
                       extraStyles="!bg-black border border-solid border-slate-800 text-stone-200 placeholder-gray-500" label="Username"
                       placeholder = "Enter a unique username"
                       type="text"/>
            </Tooltip>
            <Tooltip title={tooltips.password} placement="left">
                <Input ref={passwordRef} className="text-stone-200"
                       extraStyles="!bg-black border border-solid border-slate-800 text-stone-200 placeholder-gray-500" label="Password"
                       placeholder = "Password as strong as you"
                       type="password"/>
            </Tooltip>
            <Tooltip title={tooltips.reEnteredPassword} placement="right">
                <Input ref={reEnteredPassword} className="text-stone-200"
                       extraStyles="!bg-black border border-solid border-slate-800 text-stone-200 placeholder-gray-500" label="Password"
                       placeholder = "Reenter the password."
                       type="password"/>
            </Tooltip>
            <Tooltip title={tooltips.email} placement="left">
                <Input ref={emailRef} className="text-stone-200"
                       extraStyles="!bg-black border border-solid border-slate-800 text-stone-200 placeholder-gray-500" label="Email" placeholder="bello.buddy@gmail.com"
                       type="email"/>
            </Tooltip>
            <Box sx={{padding: 1.5}}>
                <Button sx={{'&:hover': {backgroundColor: "#6c98eb"}}} fullWidth type="button" onClick={register}
                        variant="contained">
                    Sign Up
                </Button>
            </Box>
            <p className="text-stone-500 text-center pb-4 pt-5">Existing User?
                <a className="cursor-pointer text-blue-900 hover:underline" onClick={shouldLogin}> Sign in</a>
            </p>
        </form>
    )
}