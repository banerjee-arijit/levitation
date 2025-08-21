import { useEffect, useState } from "react";
import loginImage from "@/assets/loginPageImage.png";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/add_product");
    }
  }, [navigate]);

  const API_URL = import.meta.env.VITE_API_URL;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const nameRegex = /^[a-zA-Z ]{2,30}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

    if (!nameRegex.test(formData.name)) {
      toast.error("Please enter a valid name (2-30 letters only).");
      return;
    }

    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (!passwordRegex.test(formData.password)) {
      toast.error("Password must be at least 6 characters and include 1 letter and 1 number.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Registration Completed Please Login");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="h-screen overflow-hidden bg-[#141414] flex flex-col font-poppins relative md:m-0 mt-20">
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
      <div className="absolute inset-0 left-[1050px] top-[143.55px] z-10">
        <div className="w-[420px] h-[120px] bg-[#CCF575] rounded-full blur-[160px] opacity-60"></div>
      </div>
      <div className="flex flex-1 items-center justify-center px-4 md:px-10">
        <div className="flex flex-col md:flex-row items-center w-full max-w-[1280px]">
          <div className="w-full md:w-[496px]">
            <div className="text-white mb-6">
              <h3 className="text-3xl mb-3 font-bold">Sign up to begin journey</h3>
              <p className="text-[#A7A7A7] leading-relaxed">
                This is a basic signup page which is used for levitation assignment purpose.
              </p>
            </div>

            <form className="space-y-6 z-50" onSubmit={handleRegister}>
              <div>
                <Label htmlFor="name" className="text-white text-sm">
                  Full Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full h-[56px] mt-2 bg-[#202020] border border-[#424647] text-white placeholder:text-[#7C7C7C] rounded-[4px] px-4"
                />
                <p className="text-[#B8B8B8] mt-2 text-sm">
                  This name will be displayed with your inquiry
                </p>
              </div>

              <div>
                <Label htmlFor="email" className="text-white text-sm">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full h-[56px] mt-2 bg-[#202020] border border-[#424647] text-white placeholder:text-[#7C7C7C] rounded-[4px] px-4"
                />
                <p className="text-[#B8B8B8] mt-2 text-sm">
                  This email will be displayed with your inquiry
                </p>
              </div>

              <div>
                <Label htmlFor="password" className="text-white text-sm">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full h-[56px] mt-2 bg-[#202020] border border-[#424647] text-white placeholder:text-[#7C7C7C] rounded-[4px] px-4"
                />
                <p className="text-[#B8B8B8] mt-2 text-sm">
                  Any further updates will be forwarded on this Email ID
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center">
                <Button
                  type="submit"
                  className="bg-[#303030] text-[#CCF575] w-[120px] h-[50px] rounded-[4px] hover:bg-[#CCF575] hover:text-[#141414] transition-all duration-300"
                >
                  Register
                </Button>
                <Link to="/login" className="text-[#B8B8B8] text-sm hover:text-white transition">
                  Already have an account?
                </Link>
              </div>
            </form>

            <div className="absolute left-0 inset-0 top-[790px] z-10">
              <div className="w-[220px] h-[220px] left-6 bg-[#CCF575] rounded-full blur-[160px] opacity-60"></div>
            </div>
          </div>

          {/* Registration page image */}
          <div className="relative left-0 md:left-82 w-full md:w-[900px] md:block hidden h-[733px] bg-gray-800 rounded-l-3xl overflow-hidden z-50">
            <img src={loginImage} alt="login" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
