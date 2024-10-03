import Sidebar from "./components/Sidebar/Sidebar";
import {Route, Routes} from "react-router-dom";
import PasswordGenerator from "./components/PasswordGenerator/PasswordGenerator";
import PasswordHealth from "./components/PasswordHealth";
import AllPasswords from "./components/AllPasswords";
import {QueryClient , QueryClientProvider} from "@tanstack/react-query";
import Trash from "./components/Trash";

const queryClient = new QueryClient();
function App() {
  return (
      <QueryClientProvider client = {queryClient} >
          <main className="bg-gradient-to-b from-[#2e333d] to-[#22262d] flex min-h-screen">
              <Sidebar/>
              <div className="flex-grow overflow-hidden" >
                  <Routes>
                      <Route path="/all-passwords" element={<AllPasswords/>}/>
                      <Route path="/generate-password" element={<PasswordGenerator/>} />
                      <Route path="/password-health" element={<PasswordHealth/>} />
                      <Route path="/trash" element={<Trash/>}/>
                  </Routes>
              </div>
          </main>
          {/*<ReactQueryDevtools initialIsOpen={true} />*/}
      </QueryClientProvider>
  );
}

export default App;
