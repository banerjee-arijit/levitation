import Logo from "./shared/Logo";
import { Button } from "./ui/button";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  return (
    <header className="flex items-center justify-between bg-[#1F1F1F] h-[64.1px] px-4 sm:px-10 md:px-20 lg:px-40 z-50 w-full">
      <div className="flex-shrink-0">
        <Logo />
      </div>

      {location.pathname === "/login" ? (
        <Button className="text-[#CCF575] border-2 border-[#CCF575] bg-[#CCF575]/5 px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm">
          Connecting People With Technology
        </Button>
      ) : location.pathname === "/add_product" ? (
        <Button className="h-[36px] sm:h-[41px] w-[70px] sm:w-[90px] rounded-sm bg-[#CCF575] text-[#292C20] text-sm sm:text-base">
          Logout
        </Button>
      ) : (
        <Link to={"/login"}>
          <Button className="h-[36px] sm:h-[41px] w-[56px] sm:w-[78px] rounded-sm bg-[#CCF575] text-[#292C20] text-sm sm:text-base">
            Login
          </Button>
        </Link>
      )}
    </header>
  );
};

export default Navbar;
