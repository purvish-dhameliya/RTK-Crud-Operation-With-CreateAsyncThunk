import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Edit from "./pages/Edit";
import Create from "./pages/Create";
import Read from "./pages/Read";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/read" element={<Read />} />
          <Route path="/" element={<Create />} />
          <Route path="/edit/:id" element={<Edit />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
