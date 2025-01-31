import Input from "./UI/Input";
import {useRef} from "react";
import {useQuery} from "@tanstack/react-query";
import {login} from "../query/queries";
import {Button} from "@mui/material";

export default function Login({setIsLoggedIn}) {
    const userNameRef = useRef();
    const passwordRef = useRef();
    const {data , refetch} = useQuery({
        queryKey : ["login"],
        queryFn : () => login(userNameRef , passwordRef , setIsLoggedIn),
        enabled: false
    })
    console.log(data)
    return (
        <section className="relative m-auto border border-solid border-slate-800 rounded-md bg-gradient-to-b from-[#050E18] via-[#04111F] to-[#050E18]">
            <h1 className="text-stone-200 p-2 font-bold flex items-center">
                <lord-icon
                    src="https://cdn.lordicon.com/rhvyamqh.json"
                    trigger="loop"
                    colors="primary:#915110"
                    style=
                        {{width:40 , height:40}}>
                </lord-icon>
                Caput Draconis
            </h1>
            <h1 className="text-stone-200 p-3 font-bold text-xl">Sign in</h1>
            <form className="">
                <Input ref={userNameRef} className="text-stone-200" extraStyles="!bg-black border border-solid border-slate-800 text-stone-200" label="Username" type="text" />
                <Input ref={passwordRef} className="text-stone-200" extraStyles="!bg-black border border-solid border-slate-800 text-stone-200" label="Password" type="password"/>
                <Button type="button" onClick = {() => refetch()} variant="contained">
                    Sign in
                </Button>
            </form>
        </section>
    )
}