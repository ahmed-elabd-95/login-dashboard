import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login } from "./Pages/Login/Login";
import { Dashboard } from "./Pages/Dashboard/Dashboard";

function App() {
  return (
    <>
      <Router>
        <div className="pages">
          <Routes>
            <Route exact path="/" Component={Login} />
            <Route exact path="/dashboard" Component={Dashboard} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
