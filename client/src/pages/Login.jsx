import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { AppContext } from "../context/AppContext";

const Login = () => {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useContext(AppContext);

  const [state, setState] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
    console.log("Logged in!");
    navigate('/dashboard');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 sm:px-0 bg-[#131515]">
      <img
        onClick={() => navigate("/")}
        src="logo.svg"
        alt=""
        className="absolute top-5 w-28 sm:w-32 cursor-pointer"
      />

      <div className="bg-[#1A1C1E] p-10 rounded-lg shadow-lg w-full sm:w-96 text-[#fffafa] text-sm">
        <h2 className="text-3xl font-semibold text-white text-center mb-3">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </h2>

        <p className="text-center text-sm mb-6">
          {state === "Sign Up" ? "Create an Account" : "Login to your Account"}
        </p>
        <form onSubmit={onSubmitHandler}>
          {state === "Sign Up" && (
            <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                placeholder="Full Name"
                required
                className="bg-transparent outline-none text-white"
              />
            </div>
          )}

          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Email id"
              required
              className="bg-transparent outline-none text-white"
            />
          </div>

          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Password"
              required
              className="bg-transparent outline-none text-white"
            />
          </div>

          {state === "Login" && (
            <p
              onClick={() => navigate("/reset-password")}
              className="mb-4 text-blue-400 cursor-pointer"
            >
              Forgot Password?
            </p>
          )}
          <button
            type="submit"
            className="w-full py-2.5 rounded-full bg-gradient-to-r from-[#38b137] to-[#1f7a1f] text-white font-medium"
          >
            {state === "Sign Up" ? "Sign Up" : "Login"}
          </button>
        </form>

        {state === "Sign Up" ? (
          <p className="text-gray-400 text-center text-xs mt-4">
            Already have an account?{" "}
            <span
              onClick={() => setState("Login")}
              className="text-blue-400 cursor-pointer underline"
            >
              Login here
            </span>
          </p>
        ) : (
          <p className="text-gray-400 text-center text-xs mt-4">
            Don't have an account?{" "}
            <span
              onClick={() => setState("Sign Up")}
              className="text-blue-400 cursor-pointer underline"
            >
              Sign Up
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
