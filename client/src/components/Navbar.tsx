import Logo from "./shared/Logo";
import { Button } from "./ui/button";
import { useLocation, useNavigate, Link } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setTimeout(() => {
      navigate("/login");
    }, 800);
  };

  return (
    <header className="sticky top-0 flex items-center justify-between bg-[#1F1F1F] h-16 px-4 sm:px-8 md:px-16 lg:px-24 shadow-md z-50 w-full">
      <div className="flex-shrink-0">
        <Logo />
      </div>

      {location.pathname === "/login" ? (
        <Button className="text-[#CCF575] border border-[#CCF575] bg-[#CCF575]/10 px-3 sm:px-5 py-1 sm:py-2 text-xs sm:text-sm font-medium rounded-md transition-all duration-300 hover:bg-[#CCF575]/20 hover:scale-105">
          Connecting People With Technology
        </Button>
      ) : location.pathname === "/add_product" ? (
        <Button
          className="h-9 sm:h-10 px-4 sm:px-6 rounded-md bg-[#CCF575] text-[#1F1F1F] text-xs sm:text-sm md:text-base font-semibold shadow-md transition-all duration-300 hover:bg-[#b5e74a] hover:scale-105"
          onClick={handleLogout}
        >
          Logout
        </Button>
      ) : (
        <Link to="/login">
          <Button className="h-9 sm:h-10 px-4 sm:px-6 rounded-md bg-[#CCF575] text-[#1F1F1F] text-xs sm:text-sm md:text-base font-semibold shadow-md transition-all duration-300 hover:bg-[#b5e74a] hover:scale-105">
            Login
          </Button>
        </Link>
      )}
    </header>
  );
};

export default Navbar;
