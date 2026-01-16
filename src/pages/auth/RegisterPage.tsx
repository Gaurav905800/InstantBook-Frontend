import type React from "react";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Building,
  Check,
  Shield,
  Phone,
  ChevronDown,
  AlertCircle,
} from "lucide-react";

function RegisterPage() {
  const {
    username,
    phone,
    email,
    password,
    role,
    setUsername,
    setPhone,
    setEmail,
    setPassword,
    setRole,
    signUp,
    isLoading,
    error,
  } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signUp();
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* left Side */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-6 md:p-12 rounded-2xl">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
            <p className="text-gray-600 mt-2">
              Join BookingHub and unlock exclusive benefits
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Username
              </label>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <User className="h-5 w-5 text-gray-400" />
                </div>

                <input
                  type="text"
                  className="w-full pl-10 pr-3 py-3 border bg-white border-gray-300 rounded-4xl focus:outline-none focus:ring-2 focus:ring-gray-500  focus:border-transparent transition-all"
                  placeholder="Choose a username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  className="w-full pl-10 pr-3 py-3 border bg-white border-gray-300 rounded-4xl focus:outline-none focus:ring-2 focus:ring-gray-500  focus:border-transparent transition-all"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full pl-10 pr-3 py-3 border bg-white border-gray-300 rounded-4xl focus:outline-none focus:ring-2 focus:ring-gray-500  focus:border-transparent transition-all"
                  placeholder="Create a password (min. 6 characters)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="tel"
                  className="w-full pl-10 pr-3 py-3 border bg-white border-gray-300 rounded-4xl focus:outline-none focus:ring-2 focus:ring-gray-500  focus:border-transparent transition-all"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Role Selector */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Account Type
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <Building className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as "user" | "admin")}
                  className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-4xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent appearance-none bg-white cursor-pointer transition-all"
                >
                  <option value="user">Regular User</option>
                  <option value="admin">Hotel Administrator</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="terms"
                className="mt-1 h-4 w-4"
                required
              />
              <label htmlFor="terms" className="text-sm text-gray-600">
                I agree to the{" "}
                <Link
                  to="#"
                  className="font-semibold text-gray-700 hover:underline"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  to="#"
                  className="font-semibold text-gray-700 hover:underline"
                >
                  Privacy Policy
                </Link>
              </label>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm flex items-center">
                <AlertCircle className="w-4 h-4 mr-2" />
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-black text-white py-3.5 rounded-4xl font-semibold focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 transition-all duration-200 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-3" />
                  Creating Account...
                </span>
              ) : (
                "Create Account"
              )}
            </button>

            <div className="text-center pt-4">
              <p className="text-gray-600 text-sm">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-gray-700 hover:underline"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </form>

          {/* Security Note */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center space-x-2 mb-2">
              <Shield className="w-5 h-5 text-green-600" />
              <p className="text-sm font-medium text-gray-700">
                Your data is secure with us
              </p>
            </div>
            <p className="text-xs text-gray-500">
              We use industry-standard encryption to protect your personal
              information.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="hidden md:flex md:w-1/2 bg-linear-to-br from-[#2E0F1A] to-[#6d2e46] text-white flex-col justify-center relative overflow-hidden rounded-4xl bg-cover bg-center m-2">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 25px 25px, rgba(166,78,106,0.3) 2px, transparent 2px)",
              backgroundSize: "50px 50px",
            }}
          ></div>
        </div>

        <div className="relative z-10 max-w-lg mx-auto">
          <div className="mb-12">
            <h2 className="text-4xl font-bold mb-2">
              Booking<span className="text-[#A64E6A]">Hub</span>
            </h2>
            <p className="text-[#F2E6EA]">Join Our Premium Community</p>
          </div>

          {/* Benefits */}
          <div className="space-y-10">
            <div className="space-y-4">
              <p className="text-xl">
                Join thousands of satisfied guests who enjoy exclusive deals,
                priority booking, and personalized hotel recommendations.
              </p>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-[#A64E6A] flex items-center justify-center font-bold text-[#3A1524]">
                  JD
                </div>
                <div>
                  <p className="font-semibold">John Doe</p>
                  <p className="text-sm text-[#F2E6EA]">Member since 2020</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-lg">
                As a registered member, you get access to member-only rates,
                free room upgrades, and early check-in privileges.
              </p>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-[#A64E6A] flex items-center justify-center font-bold text-[#3A1524]">
                  SM
                </div>
                <div>
                  <p className="font-semibold">Sarah Miller</p>
                  <p className="text-sm text-[#F2E6EA]">Elite Member</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-[#8B425A]">
              <div className="text-center">
                <p className="text-3xl font-bold">30%</p>
                <p className="text-sm text-[#F2E6EA]">Member Discount</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold">500+</p>
                <p className="text-sm text-[#F2E6EA]">Partner Hotels</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold">24/7</p>
                <p className="text-sm text-[#F2E6EA]">Support</p>
              </div>
            </div>
          </div>

          <div className="mt-12 space-y-4">
            <h3 className="text-xl font-semibold mb-4">Why Register?</h3>
            {[
              "Exclusive member-only rates",
              "Free cancellation on most bookings",
              "Priority customer support",
              "Personalized recommendations",
            ].map((item, i) => (
              <div key={i} className="flex items-center space-x-3">
                <Check className="w-5 h-5 text-[#A64E6A]" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="mt-12 md:hidden text-center">
            <p className="text-[#F2E6EA]">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-[#A64E6A] font-semibold hover:underline"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
