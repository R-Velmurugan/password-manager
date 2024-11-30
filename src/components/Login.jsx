import Input from "./UI/Input";

export default function Login({setIsLoggedIn}) {
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
                <Input className="text-stone-200" extraStyles="!bg-black border border-solid border-slate-800 text-stone-200" label="Username" type="text" />
                <Input className="text-stone-200" extraStyles="!bg-black border border-solid border-slate-800 text-stone-200" label="Password" type="password"/>
                <Input type="button" value="Sign in" extraStyles="font-bold border-none cursor-pointer" onClick={() => setIsLoggedIn(true)}/>
            </form>
        </section>
    )
}