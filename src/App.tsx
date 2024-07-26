import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Heros from "./components/Heros";
import Details from "./components/Details";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/heros" element={<Heros />} />
            <Route path="/heros/:id" element={<Details />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
