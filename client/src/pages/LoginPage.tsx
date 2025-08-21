import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import sliderImageOne from "@/assets/sliderImageOne.png";
import sliderImageTwo from "@/assets/sliderImageTwo.png";
import { jwtDecode } from "jwt-decode";

const images = [sliderImageOne, sliderImageTwo];

const LoginPage = () => {
  const [current, setCurrent] = useState(0);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/add_product");
  }, [navigate]);

  useEffect(() => {
    const interval = setInterval(() => setCurrent((prev) => (prev + 1) % images.length), 3000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.id]: e.target.value });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

    if (!emailRegex.test(formData.email)) return toast.error("Invalid email");
    if (!passwordRegex.test(formData.password))
      return toast.error("Password must be at least 6 chars, 1 letter & 1 number");

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);

        const decoded: any = jwtDecode(data.token); // decode JWT
        const user = {
          id: decoded.id,
          email: decoded.email,
        };

        localStorage.setItem("user", JSON.stringify(user)); // store user info
        toast.success("Login Successful");
        setTimeout(() => navigate("/add_product"), 8000);
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-[#141414] flex flex-col font-poppins relative">
      <Toaster position="top-right" />
      <div className="flex flex-1 items-center justify-center px-4 md:px-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 w-full max-w-[1280px]">
          <div className="relative w-full lg:w-[700px] h-[500px] md:h-[733px] bg-gray-800 rounded-2xl overflow-hidden z-50 mt-10 md:mt-0">
            <img
              src={images[current]}
              alt="slider"
              className="w-full h-full object-cover transition-all duration-700 ease-in-out"
            />
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              {images.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-4 h-1 rounded-full ${
                    idx === current ? "bg-[#CCF575]" : "bg-gray-500"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="w-full lg:w-[496px]">
            <div className="text-white mb-6">
              <h2 className="text-xl">Levitation Infotech</h2>
              <h3 className="text-3xl font-bold mb-3">Let the Journey Begin!</h3>
              <p className="text-[#A7A7A7] leading-relaxed">Login to continue</p>
            </div>

            <form className="space-y-6" onSubmit={handleLogin}>
              <div>
                <Label htmlFor="email" className="text-white text-sm">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full h-[56px] mt-2 bg-[#202020] border border-[#424647] text-white placeholder:text-[#7C7C7C] rounded px-4 focus:ring-2 focus:ring-[#CCF575] focus:border-[#CCF575]"
                />
              </div>

              <div>
                <Label htmlFor="password" className="text-white text-sm">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full h-[56px] mt-2 bg-[#202020] border border-[#424647] text-white placeholder:text-[#7C7C7C] rounded px-4 focus:ring-2 focus:ring-[#CCF575] focus:border-[#CCF575]"
                />
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
                <Button
                  type="submit"
                  className="bg-[#303030] text-[#CCF575] w-full sm:w-[120px] h-[50px] rounded hover:bg-[#CCF575] hover:text-[#141414] transition-all duration-300"
                >
                  Login
                </Button>
                <Link to="/register" className="text-[#B8B8B8] text-sm hover:text-white">
                  Create account
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
