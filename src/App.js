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
import Login from "./components/Auth/Login";
import ProtectedRoute from "./components/Common/ProtectedRoute";
import ForgotPassword from "./components/Auth/ForgotPassword";


function App() {
  return (
    <div className="wrapper">
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <div className="content">
            <DriversProvider>
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/auth/signup" element={<SignUp />} />
                <Route path="/auth/login" element={<Login />} />
                <Route path="/auth/forgot-password" element={<ForgotPassword />} />
                <Route
                  path="/driver/list"
                  element={
                    <ProtectedRoute>
                      <ListDrivers />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/driver/add"
                  element={
                    <ProtectedRoute>
                      <AddDriver />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/driver/edit/:id"
                  element={
                    <ProtectedRoute>
                      <EditDriver />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </DriversProvider>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
