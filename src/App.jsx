import Sidebar from "./components/Sidebar/Sidebar";
import {Route, Routes} from "react-router-dom";
import PasswordGenerator from "./components/PasswordGenerator/PasswordGenerator";
import PasswordHealth from "./components/PasswordHealth";
import AllPasswords from "./components/AllPasswords";
import {QueryClient , QueryClientProvider} from "@tanstack/react-query";
import Trash from "./components/Trash";
import Login from "./components/Login";
import {useState} from "react";
import ProtectedRoute from "./components/utils/ProtectedRoute";

const queryClient = new QueryClient();
function App() {
    const [isLoggedIn , setIsLoggedIn] = useState(false);
    console.log(isLoggedIn);
    return (
        <QueryClientProvider client = {queryClient} >
            {isLoggedIn ?
                <main className="bg-gradient-to-br from-[#061426] to-[#22262d] flex min-h-screen">
                    <Sidebar/>
                    <div className="flex-grow overflow-hidden">
                        <Routes>
                            <Route element={<ProtectedRoute isLoggedIn={isLoggedIn} />}>
                                <Route path="/all-passwords" element={<AllPasswords />} />
                                <Route path="/generate-password" element={<PasswordGenerator />} />
                                <Route path="/password-health" element={<PasswordHealth />} />
                                <Route path="/trash" element={<Trash />} />
                            </Route>
                        </Routes>
                    </div>
                </main> :
                <main className="bg-gradient-to-r from-[#090D15] via-[#061426] to-[#090D15] flex min-h-screen">
                    <Login setIsLoggedIn={setIsLoggedIn}/>
                </main>
            }
            {/*<ReactQueryDevtools initialIsOpen={true} />*/}
        </QueryClientProvider>
    );
}

export default App;
