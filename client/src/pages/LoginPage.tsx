import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import sliderImageOne from "@/assets/sliderImageOne.png";
import sliderImageTwo from "@/assets/sliderImageTwo.png";

const images = [sliderImageOne, sliderImageTwo];

const LoginPage = () => {
  const [current, setCurrent] = useState(0);
  const [formData, setFormData] = useState({ email: "", password: "" });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!passwordRegex.test(formData.password)) {
      alert(
        "Password must be at least 6 characters long and include at least 1 letter and 1 number.",
      );
      return;
    }

    console.log("Login data:", formData);
    // Proceed with API call or further logic
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#141414] flex flex-col font-poppins relative">
      <div className="absolute inset-0 left-[1700px] top-[143.55px] z-10 hidden lg:block">
        <div className="w-[420px] h-[120px] bg-[#4F59A8] rounded-full blur-[100px] opacity-80"></div>
      </div>

      <div className="flex flex-1 items-center justify-center px-4 md:px-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 w-full max-w-[1280px]">
          {/* Slider */}
          <div
            className="relative w-full lg:w-[700px] h-[500px] md:h-[733px] bg-gray-800 rounded-2xl overflow-hidden z-50 md:mt-0
           mt-10"
          >
            <img
              src={images[current]}
              alt="login"
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

          {/* Form */}
          <div className="w-full lg:w-[496px]">
            <div className="text-white mb-6">
              <h2 className="text-white text-xl">Levitation Infotech</h2>
              <h3 className="text-3xl mb-3 font-bold">Let the Journey Begin!</h3>
              <p className="text-[#A7A7A7] leading-relaxed">
                This is a basic login page used for the levitation assignment.
              </p>
            </div>

            <form className="space-y-6 z-50" onSubmit={handleLogin}>
              <div>
                <Label htmlFor="email" className="text-white text-sm">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter Email ID"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full h-[56px] mt-2 bg-[#202020] border border-[#424647] text-white placeholder:text-[#7C7C7C] rounded-[4px] px-4 focus:ring-2 focus:ring-[#CCF575] focus:border-[#CCF575]"
                />
                <p className="text-[#B8B8B8] mt-2 text-sm">
                  This email will be displayed with your inquiry
                </p>
              </div>

              <div>
                <Label htmlFor="password" className="text-white text-sm">
                  Current Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter the Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full h-[56px] mt-2 bg-[#202020] border border-[#424647] text-white placeholder:text-[#7C7C7C] rounded-[4px] px-4 focus:ring-2 focus:ring-[#CCF575] focus:border-[#CCF575]"
                />
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
                <Button
                  type="submit"
                  className="bg-[#303030] text-[#CCF575] w-full sm:w-[120px] h-[50px] rounded-[4px] hover:bg-[#CCF575] hover:text-[#141414] transition-all duration-300"
                >
                  Login now
                </Button>
                <Link
                  to="/forgot-password"
                  className="text-[#B8B8B8] text-sm hover:text-white transition md:mb-0 mb-10"
                >
                  Forget password ?
                </Link>
              </div>
            </form>

            <div className="absolute left-0 inset-0 top-[500px] md:top-[710px] z-10">
              <div className="w-[220px] h-[220px] left-6 bg-[#CCF575] rounded-full blur-[160px] opacity-60"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
