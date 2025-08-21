import Navbar from "@/components/Navbar";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const Layout = () => {
  return (
    <div className="min-h-screen bg-[#141414]">
      <Navbar />
      <Outlet />
      <Toaster
        position="top-right"
        toastOptions={{
          className: "",
          duration: 5000,
          removeDelay: 1000,
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />
    </div>
  );
};

export default Layout;
