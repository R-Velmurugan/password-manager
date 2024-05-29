import GppMaybeIcon from "@mui/icons-material/GppMaybe";

export default function PasswordHealth() {

    let weakPasswords = 0;

    return (<section className="w-full text-stone-200 text-xl py-2">
        <div className="text-center">
            <h1>Password Generator</h1>
            <hr className="w-32 border-stone-500 mx-auto my-4 h-1 rounded "/>
        </div>
        <ul className="px-[15rem] my-8">
            <li className="flex-col bg-[#3f434b] p-3 rounded-lg">
                    <span className="flex gap-2" >
                        <div className="rounded-full bg-pink-800 flex justify-center p-3">
                            <GppMaybeIcon style={{fontSize: "2rem"}}/>
                        </div>

                        <div>
                            <p className="text-pink-800">Weak Passwords</p>
                            <p className="text-sm"> Makes your account easy-to-hack </p>
                        </div>
                    </span>
                <a href="/" className="inline-block px-3 my-3" >
                    <span className="text-[2rem] " >{weakPasswords}</span>
                    <span> accounts</span>
                </a>
            </li>

        </ul>
    </section>);
}
