import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import Main from "./Main";
import Login from "./Components/Login.jsx";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "./Components/NotFound.jsx";
import Home from "./Components/Home.jsx";
import { UserProvider } from "./Components/UserContext.jsx";




function App() {
  return (
    <UserProvider>

    
    <Router>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            // padding: "10px",
            display: "flex",
            alignItems: "center",
            gap: "10px", // Adds space between icon and text
          },
        }}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Main />} />
        <Route path="*" element={<NotFound />} /> 
      </Routes>
    </Router>
    </UserProvider>
  );
}






export default App;
