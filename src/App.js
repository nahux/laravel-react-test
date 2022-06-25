import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Local components
import Home from "./components/Home/Home";
import ListDrivers from "./components/Driver/ListDrivers";
import AddDriver from "./components/Driver/AddDriver";
import EditDriver from "./components/Driver/EditDriver";
import Navbar from "./components/Common/Navbar";
import { DriversProvider } from "./components/Driver/DriverContext";
import SignUp from "./components/Auth/SignUp";
import AuthProvider from "./components/Auth/AuthContext";


function App() {
  return (
    <AuthProvider>
      {/* <DriversProvider> */}
        <div className="wrapper">
          <BrowserRouter>
            <Navbar />
            <div className="content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/auth/signup" element={<SignUp />} />
                <Route path="/driver/list" element={<ListDrivers />} />
                <Route path="/driver/add" element={<AddDriver />} />
                <Route path="/driver/edit/:id" element={<EditDriver />} />
              </Routes>
            </div>
          </BrowserRouter>
        </div>
      {/* </DriversProvider> */}
    </AuthProvider>
  );
}

export default App;
