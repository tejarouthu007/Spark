import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Menu, X } from "lucide-react"; // icons

const Header = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // mobile menu
  const navClass = "md:flex hidden relative text-[#fffafa] after:content-[''] after:absolute after:left-[25%] after:bottom-[-4px] after:h-[3px] after:w-1/2 after:bg-[#38b137] after:rounded-full after:transition-all after:duration-300 after:ease-in-out hover:after:w-[90%] hover:after:left-[5%]";

  return (
    <nav className="w-full bg-[#131515] border-b-4 border-[#38b137] p-4 min-h-20">
      <div className="max-w-[90%] mx-auto flex items-center justify-between h-full">
        
      <img src='logo.svg' className='w-32 sm:w-32' onClick={()=>{navigate('/')}}/>
      
        

        {/*Desktop menu*/}
        { isLoggedIn ?

          <div className="flex gap-6">
            <button className={`${navClass}`} onClick={() => navigate("/dashboard")}>Dashboard</button>
            <button className={`${navClass}`} onClick={() => navigate("/devices")}>Devices</button>
            <button className={`${navClass}`} onClick={() => navigate("/energy-profiles")}>Energy Profiles</button>
            <button className={`${navClass}`} onClick={() => navigate("/reports")}>Reports</button>


            <User size={28} className="text-[#fffafa] hover:text-[#38b137] transition-colors duration-300"/>
            <button className="md:hidden text-[#fffafa] hover:text-[#38b137] transition-colors duration-300"
              onClick={()=> setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div> : 
          <button className="flex items-center font-bold gap-2 bg-[#38b137] text-bold rounded-full px-5 py-1.5 text-[#fffafa] hover:bg-[#fffafa] hover:text-[#38b137] transition-all duration-300" onClick={()=>{setIsLoggedIn(true); /*navigate('/login')*/}}>Login</button>
        }

      </div>
      {/*Mobile Menu*/}
      {isMenuOpen && (
        <div className="md:hidden flex flex-col items-center gap-4 bg-[#131515] p-4 border-t border-[#38b137]">
          <button className="text-[#fffafa] hover:text-[#38b137] transition-colors duration-300" onClick={() => navigate("/devices")}>Dashboard</button>
          <button className="text-[#fffafa] hover:text-[#38b137] transition-colors duration-300" onClick={() => navigate("/devices")}>Devices</button>
          <button className="text-[#fffafa] hover:text-[#38b137] transition-colors duration-300" onClick={() => navigate("/energy-profiles")}>Energy Profiles</button>
          <button className="text-[#fffafa] hover:text-[#38b137] transition-colors duration-300" onClick={() => navigate("/reports")}>Reports</button>
        </div>
      )}
      
    </nav>
  );
};

export default Header;

