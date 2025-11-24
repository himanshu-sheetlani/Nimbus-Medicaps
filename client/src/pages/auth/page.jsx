import { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/stores/useAuthStore";
import { auth, signInWithPopup, provider } from "@/config/firebase.config.js";
import { FcGoogle } from "react-icons/fc";

const Auth = () => {
  const { signUp } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  const handleGoogleAuth = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();
      await signUp(idToken);
    } catch (error) {
      console.error("Google auth failed:", error);
    }
  };

  return (
    <div className="min-h-screen w-full bg-black relative overflow-hidden flex items-center justify-center">
      {/* Background Gradient */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(125% 125% at 50% 10%, #000000 40%, #111111 100%)",
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-md mx-auto px-6">
        {/* Auth Card */}
        <div className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-2xl p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-inter text-white mb-2">
              Welcome to Nimbus
            </h1>
            <p className="text-zinc-400">Your AI-powered travel companion</p>
          </div>

          {/* Google Authentication - Primary Option */}
          <div className="space-y-4">
            <Button
              onClick={handleGoogleAuth}
              className="w-full bg-white text-black hover:bg-gray-100 py-6 font-medium"
            >
              <FcGoogle className="mr-3 h-5 w-5" />
              Continue with Google
            </Button>

            {/* Info Message */}
            <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-4">
              <p className="text-blue-300 text-sm text-center">
                ℹ️ For now, only sign up with Google works
              </p>
            </div>

            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="flex-1 border-t border-zinc-700"></div>
              <span className="px-4 text-zinc-500 text-sm">
                or use email (coming soon)
              </span>
              <div className="flex-1 border-t border-zinc-700"></div>
            </div>

            {/* Email Form - Disabled for now */}
            <form onSubmit={handleSubmit} className="space-y-4 opacity-50">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-zinc-500" />
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    className="pl-10 bg-zinc-800/50 border-zinc-700 text-white placeholder-zinc-500 focus:border-white focus:ring-white/20 py-6"
                    disabled
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-zinc-500" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    className="pl-10 pr-12 bg-zinc-800/50 border-zinc-700 text-white placeholder-zinc-500 focus:border-white focus:ring-white/20 py-6"
                    disabled
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
                    disabled
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button - Disabled */}
              <Button
                type="submit"
                className="w-full bg-zinc-600 text-zinc-400 py-6 mt-6 cursor-not-allowed"
                disabled
              >
                Email Login (Coming Soon)
              </Button>
            </form>

            {/* Terms */}
            <p className="text-xs text-zinc-500 text-center mt-6">
              By continuing, you agree to our{" "}
              <a href="#" className="text-white hover:text-gray-300 underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-white hover:text-gray-300 underline">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
