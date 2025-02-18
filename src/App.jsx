import Sidebar from "./components/Sidebar/Sidebar";
import {Navigate, Route, Routes , useNavigate} from "react-router-dom";
import PasswordGenerator from "./components/PasswordGenerator/PasswordGenerator";
import PasswordHealth from "./components/PasswordHealth";
import AllPasswords from "./components/AllPasswords";
import {QueryClient , QueryClientProvider} from "@tanstack/react-query";
import Trash from "./components/Trash";
import Login from "./components/Login";
import {useEffect, useState} from "react";
import {isValidSessionPresent} from "../src/query/queries";

const queryClient = new QueryClient();
function App() {
    const [isLoggedIn , setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        isValidSessionPresent(setIsLoggedIn);
    }, []);

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login");
        }
    }, [isLoggedIn, navigate]);
    return (
        <QueryClientProvider client = {queryClient} >
            {isLoggedIn ?
                <main className="bg-gradient-to-br from-[#061426] to-[#22262d] flex min-h-screen">
                    <Sidebar setIsLoggedIn={setIsLoggedIn} />
                    <div className="flex-grow overflow-hidden">
                        <Routes>
                            <Route path="/all-passwords" element={<AllPasswords />} />
                            <Route path="/generate-password" element={<PasswordGenerator />} />
                            <Route path="/password-health" element={<PasswordHealth />} />
                            <Route path="/trash" element={<Trash />} />
                        </Routes>
                    </div>
                </main> :
                <main className="bg-gradient-to-r from-[#090D15] via-[#061426] to-[#090D15] flex min-h-screen">
                    <Navigate to={"/login"}/>
                    <Login setIsLoggedIn={setIsLoggedIn}/>
                </main>
            }
            {/*<ReactQueryDevtools initialIsOpen={true} />*/}
        </QueryClientProvider>
    );
}

export default App;
