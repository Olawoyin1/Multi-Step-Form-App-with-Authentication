import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import Main from "./Main";
import Login from "./Components/Login.jsx";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div>
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
      ;
      <Main />
      {/* <Login /> */}
    </div>
  );
}

export default App;
