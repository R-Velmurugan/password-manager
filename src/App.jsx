import Sidebar from "./components/Sidebar/Sidebar";
import {Route, Routes} from "react-router-dom";
import PasswordGenerator from "./components/PasswordGenerator";

function App() {
  return (
      <>
          <main className="bg-gradient-to-b from-[#2e333d] to-[#22262d] flex ">
              <Sidebar/>
              <div className="flex-grow overflow-hidden" >
                  <Routes>
                      <Route path="/generate-password" element={<PasswordGenerator/>} />
                  </Routes>
              </div>
          </main>

      </>
  );
}

export default App;
