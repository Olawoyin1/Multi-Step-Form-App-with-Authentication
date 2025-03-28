import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "./Loading";

const Home = () => {
  const {user , setUser} = useContext(UserContext)
  const [loading, setLoading] = useState(false)
  

  const logout = async() => {
    setLoading(true)
    try {

        // const response = await axios.post('http://localhost:8000/api/logout/')
        
        
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        
        setUser(null)
        setLoading(false)
        window.location.reload();
        

        
        
        return toast.success("You're Now Logged Out.")
        
        
      } catch (error) {
        if (error.response && error.response.data) {
          const errors = error.response.data;
          console.log(errors)
          setLoading(false)
          
        }
        
        
        else {
          setLoading(false)
          console.error("Unknown error:", error);
        }
      }

}

  return (
    <div className="d-flex home align-items-center justify-content-center flex-column gap-3">
      {loading && <Loading />}
      <h1>Welcome to the Study Lab 📚</h1>
      <div>

            {
              user ? <div className=" d-flex align-items-center flex-column">
                <h4>Logged In User - {user.first_name}</h4>
                <Link  onClick={logout}>Logout</Link>
              </div>
             : <li>
            <Link to="/login">Go to Login</Link> | <Link to="/signup">Go to Signup</Link>
            </li>
            }


        
      </div>
    </div>
  );
};

export default Home;