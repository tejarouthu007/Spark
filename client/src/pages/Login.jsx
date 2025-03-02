import react, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
// import Navbar from "../components/Navbar";
// import { AppContext } from "../context/AppContext";
// import axios from "axios";

const Login = () => {

    const navigate = useNavigate();

    // const {backendUrl, setIsLoggedIn, getUserData } = useContext(AppContext);

    const [state, setState] = useState("Sign Up");
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmitHandler = async(e)=> {
        console.log("Logged in!")
    }

    return (
        <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gray-900  bg-cover bg-center">
            <div className="bg-[#131515] p-10 rounded-lg shadow-lg w-full sm:w-96 text-[#CCCCCC] text-sm">
                <h2 className="text-3xl font-semibold text-white text-center mb-3">{state==="Sign Up"? "Create Account": "Login"}</h2>

                <p className="text-center text-sm mb-6">{state==="Sign Up"? "Create an Account": "Login to your Account"}</p>
                <form onSubmit={onSubmitHandler}>
                    {state==="Sign Up" && (
                        <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
                        <input onChange={e=> setName(e.target.value)} value={name} type="text" placeholder="Full Name" required className="bg-transparent outline-none"/>
                    </div>)}
                    
                    
                    <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
                        <input onChange={e=> setEmail(e.target.value)} value={email} type="email" placeholder="Email id" required className="bg-transparent outline-none"/>
                    </div>
                    
                    <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
                        <input onChange={e=> setPassword(e.target.value)} value={password} type="password" placeholder="Password" required className="bg-transparent outline-none"/>
                    </div>
                    
                    {state==="Login" && <p onClick={()=>navigate('/reset-password')} className="mb-4 text-indigo-500 cursor-pointer">Forgot Password?</p> }
                    <button className={"w-full py-2.5 rounded-full bg-gradient-to-r from-[#38b137] to-[#1f7a1f] text-white font-medium"}>Login</button>
                </form>

                {state==='Sign Up'? (
                    <p className="text-gray-400 text-center text-xs mt-4">Already have an account? {" "} 
                    <span onClick={()=>setState("Login")} className="text-blue-400 cursor-pointer underline">Login here</span>
                </p>): (
                    <p className="text-gray-400 text-center text-xs mt-4">Don't have an account? {" "} 
                    <span onClick={()=>setState("Sign Up")} className="text-blue-400 cursor-pointer underline">Sign Up</span>
                </p>) }
                

                
            </div>
        </div> 
    )
}

export default Login;