import Input from "./UI/Input";
import {useContext, useEffect, useRef, useState} from "react";
import {useMutation} from "@tanstack/react-query";
import {login , register} from "../query/queries";
import {Box, Button, Tooltip} from "@mui/material";
import {useNavigate} from "react-router-dom";
import UserContext from "../store/store";
import {HttpStatusCode} from "axios";
import {getWrappedKey, getVaultKey} from "../crypto/crypto";

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
    const [isUsernamePresent, setIsUsernamePresent] = useState(false);
    const wk = getWrappedKey('bello');
    // console.log(getVaultKey(wk, 'bello'));
    wk.then(wrappedKey => console.log(wrappedKey));
    wk.then(wrappedKey => {
        let vaultKey = getVaultKey(wrappedKey, 'bello');
        vaultKey.then(vk => console.log(vk));
    });

    const loginMutation = useMutation({
        mutationFn : async () => {
            return await login(userNameRef.current.value, passwordRef.current.value);
        },
        onSuccess: () => {
            UserCtx.setUsername(userNameRef.current.value);
            UserCtx.setVaultKey(passwordRef.current.value);
            navigate('/all-passwords');
        },
        onError: error => {
            //show failure message
            console.log(error.message)
        }
    })

    const registrationMutation = useMutation({
        mutationFn : async () => {
            return await register(registrationUsernameRef.current.value, registrationPasswordRef.current.value , registrationEmailRef.current.value);
        },
        onSuccess: () => {
            setIsUsernamePresent(false);
            setIsLoginView(true);
        },
        onError: (data) => {
            if(data?.response?.status === HttpStatusCode.Conflict) setIsUsernamePresent(true);
            setIsLoginView(false)
        }
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
                <Login userNameRef={userNameRef} passwordRef={passwordRef} login={() => loginMutation.mutate()}
                       shouldRegister={() => setIsLoginView(false)}/> :
                <Register usernameRef={registrationUsernameRef} passwordRef={registrationPasswordRef}
                          reTypedPassword={registrationRetypePasswordRef} emailRef={registrationEmailRef}
                          register={() => registrationMutation.mutate()}
                          shouldLogin={() => setIsLoginView(true)}
                          isUsernamePresent={isUsernamePresent}
                          setIsUsernamePresent = {setIsUsernamePresent}/>
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

const Register = ({usernameRef , passwordRef , reTypedPassword , emailRef , register , shouldLogin, isUsernamePresent, setIsUsernamePresent}) => {
    const [errors, setErrors] = useState({
        'vaultKey': false,
        'rePassword': false,
        'email': false
    })
    const [isDisabled, setIsDisabled] = useState(true);
    useEffect(() =>{
        console.log(isDisabled)
        setIsDisabled(isUsernamePresent || errors.vaultKey || errors.rePassword || errors.email)
    }, [errors, isUsernamePresent])
    const tooltips = {
        username : "This username cannot be changed after registering. So pick a good one ;)",
        vaultKey : "Rule of thumb is to have a min length of 10 and a mix of uppercase, lowercase, digits and special characters. Avoid using personal and predictable data",
        reEnteredPassword : "This is to make sure that you are entering the wanted password without a typo",
        email : "For authentication and notification purposes."
    }

    const handleEmailChange = (event) => {
        setErrors({...errors, email: !isValidEmail(event.target.value)})
    }
    const handlePasswordChange = (event) => {
        setErrors({
            ...errors,
            vaultKey: !isValidPassword(event.target.value),
            rePassword: !isRePasswordMatchingPassword(event.target.value, reTypedPassword.current.value)})
    }
    const handleRePasswordChange = (event) => {
        setErrors({...errors, rePassword: !isRePasswordMatchingPassword(event.target.value, passwordRef.current.value)})
    }

    const handleUsernameChange = (event) => {
        setIsUsernamePresent(event.target.value === '')
    }
    return (
        <form key="sign-up" className="p-4">
            <Tooltip title={tooltips.username} placement="right">
                <Input ref={usernameRef} className="text-stone-200"
                       extraStyles="!bg-black border border-solid border-slate-800 text-stone-200 placeholder-gray-500"
                       label="Username"
                       placeholder="Enter a unique username"
                       type="text"
                       onChange={handleUsernameChange}/>
            </Tooltip>
            {isUsernamePresent && <p className="text-red-600">Username already exists</p>}
            <Tooltip title={tooltips.vaultKey} placement="left">
                <Input ref={passwordRef} className="text-stone-200"
                       extraStyles="!bg-black border border-solid border-slate-800 text-stone-200 placeholder-gray-500"
                       label="Password"
                       placeholder="Password as strong as you"
                       type="password"
                       onChange={handlePasswordChange}/>
            </Tooltip>
            {errors.vaultKey && <p className="text-red-600">Password did not match the requirements</p>}
            <Tooltip title={tooltips.reEnteredPassword} placement="right">
                <Input ref={reTypedPassword} className="text-stone-200"
                       extraStyles="!bg-black border border-solid border-slate-800 text-stone-200 placeholder-gray-500"
                       label="Password"
                       placeholder="Reenter the password."
                       type="password"
                       onChange={handleRePasswordChange}/>
            </Tooltip>
            {errors.rePassword && <p className="text-red-600">Passwords do not match</p>}
            <Tooltip title={tooltips.email} placement="left">
                <Input ref={emailRef} className="text-stone-200"
                       extraStyles="!bg-black border border-solid border-slate-800 text-stone-200 placeholder-gray-500"
                       label="Email" placeholder="bello.buddy@gmail.com"
                       type="email"
                       onChange={handleEmailChange}/>
            </Tooltip>
            {errors.email && <p className="text-red-600">Invalid email</p>}
            <Box sx={{padding: 1.5}}>
            <Button sx={{'&:hover': {backgroundColor: "#6c98eb"}}} fullWidth type="button" onClick={register} variant="contained" disabled={isDisabled}>
                Sign Up
            </Button>
            </Box>
            <p className="text-stone-500 text-center pb-4 pt-5">Existing User?
                <a className="cursor-pointer text-blue-900 hover:underline" onClick={shouldLogin}> Sign in</a>
            </p>
        </form>
    )
}
const isValidEmail = email => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
const isValidPassword = password => /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{10,}/.test(password);
const isRePasswordMatchingPassword = (password1, password2) => password1 === password2;