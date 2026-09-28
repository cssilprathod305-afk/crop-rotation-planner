import { useState } from "react";
import "./App.css";

import Home from "./components/Home";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Dashboard from "./components/Dashboard";
import CropPlanner from "./components/CropPlanner";

function App() {
  const [page, setPage] = useState("home");

  return (
    <>
      {page === "home" && (
        <Home setPage={setPage} />
      )}

      {page === "signup" && (
        <SignUp setPage={setPage} />
      )}

      {page === "signin" && (
        <SignIn setPage={setPage} />
      )}

      {page === "dashboard" && (
        <Dashboard setPage={setPage} />
      )}
      {page === "crop" && (
        <CropPlanner setPage={setPage} />
      )}
    </>
  );
}

export default App;