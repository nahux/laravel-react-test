import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Local components
import ListDrivers from "./components/Drivers/ListDrivers";
import AddDriver from "./components/Drivers/AddDriver";
import EditDriver from "./components/Drivers/EditDriver";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <ListDrivers /> } />
          <Route path="/add" element={ <AddDriver /> } />
          <Route path="/edit/:id" element={ <EditDriver /> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
