import Sidebar from "./components/Sidebar/Sidebar";
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import PasswordGenerator from "./components/PasswordGenerator/PasswordGenerator";
import PasswordHealth from "./components/PasswordHealth";
import AllPasswords from "./components/AllPasswords";
import {QueryClient , QueryClientProvider} from "@tanstack/react-query";
import Trash from "./components/Trash";
import Login from "./components/Login";
import {useEffect, useState} from "react";
import {isValidSessionPresent} from "./query/queries";
import UserContext from "./store/store";

const queryClient = new QueryClient();

const App = () => {
    const [username , setUsername] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        const checkSession = async () => {
            const result = await isValidSessionPresent(setUsername);
            if (result === true) {
                if(location.pathname === "/login") navigate("/all-passwords", { replace: true });
                else navigate(location.pathname , {replace : true});
            }
            else{
                navigate("/login" , {replace : true})
            }
        };
        checkSession();
    } , [location.pathname]);

    return (
        <QueryClientProvider client = {queryClient} >
            <UserContext.Provider value={{username: username , setUsername: setUsername}}>
                {username ?
                    <main className="bg-gradient-to-br from-[#061426] to-[#22262d] flex min-h-screen">
                        <Sidebar/>
                        <div className="flex-grow overflow-hidden">
                            <Routes>
                                <Route path="/all-passwords" element={<AllPasswords/>}/>
                                <Route path="/generate-password" element={<PasswordGenerator/>}/>
                                <Route path="/password-health" element={<PasswordHealth/>}/>
                                <Route path="/trash" element={<Trash/>}/>
                            </Routes>
                        </div>
                    </main>
                    :
                    <main className="bg-gradient-to-r from-[#090D15] via-[#061426] to-[#090D15] flex min-h-screen">
                        <Routes>
                            <Route path="/login" element={<Login/>}/>
                        </Routes>
                    </main>
                }
                {/*<ReactQueryDevtools initialIsOpen={true} />*/}
            </UserContext.Provider>

        </QueryClientProvider>
    );
}

export default App;
