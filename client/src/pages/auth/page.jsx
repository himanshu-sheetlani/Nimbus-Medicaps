import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, Chrome } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useAuthStore } from "@/stores/useAuthStore";
import { auth, signInWithPopup, provider } from "@/config/firebase.config.js";
import { FcGoogle } from "react-icons/fc";

const Auth = () => {
  const { signUp } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e, isLogin) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", { ...formData, isLogin });
  };

  const handleGoogleLogin = async () => {
    const result = await signInWithPopup(auth, provider);
    const idToken = await result.user.getIdToken();
    await signUp(idToken);
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
        {" "}
        {/* Auth Card */}
        <div className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-2xl p-8 shadow-2xl">
          <Tabs defaultValue="login" className="w-full">
            {/* Tab Navigation */}
            <TabsList className="grid w-full grid-cols-2 mb-8 bg-zinc-800/50 border-zinc-700">
              <TabsTrigger
                value="login"
                className="data-[state=active]:bg-white data-[state=active]:text-black text-zinc-400"
              >
                Login
              </TabsTrigger>
              <TabsTrigger
                value="signup"
                className="data-[state=active]:bg-white data-[state=active]:text-black text-zinc-400"
              >
                Sign Up
              </TabsTrigger>
            </TabsList>

            {/* Login Tab Content */}
            <TabsContent value="login" className="space-y-4">
              {/* Google Login Button */}
              <Button
                onClick={handleGoogleLogin}
                variant="outline"
                className="w-full mb-6 bg-zinc-800/50 border-zinc-700 text-white hover:border-zinc-600 py-6"
              >
                <FcGoogle className="mr-3 h-5 w-5" />
                Continue with Google
              </Button>

              {/* Divider */}
              <div className="flex items-center mb-6">
                <div className="flex-1 border-t border-zinc-700"></div>
                <span className="px-4 text-zinc-500 text-sm">or</span>
                <div className="flex-1 border-t border-zinc-700"></div>
              </div>

              {/* Login Form */}
              <form
                onSubmit={(e) => handleSubmit(e, true)}
                className="space-y-4"
              >
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
                      required
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
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Forgot Password */}
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="text-sm text-white hover:text-gray-300 transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-white text-black hover:bg-gray-200 py-6 mt-6 shadow-lg"
                >
                  Sign In
                </Button>
              </form>
            </TabsContent>

            {/* Sign Up Tab Content */}
            <TabsContent value="signup" className="space-y-4">
              {/* Google Login Button */}
              <Button
                onClick={handleGoogleLogin}
                variant="outline"
                className="w-full mb-6 bg-zinc-800/50 border-zinc-700 text-white hover:bg-zinc-700/50 hover:border-zinc-600 py-6"
              >
                <Chrome className="mr-3 h-5 w-5" />
                Continue with Google
              </Button>

              {/* Divider */}
              <div className="flex items-center mb-6">
                <div className="flex-1 border-t border-zinc-700"></div>
                <span className="px-4 text-zinc-500 text-sm">or</span>
                <div className="flex-1 border-t border-zinc-700"></div>
              </div>

              {/* Sign Up Form */}
              <form
                onSubmit={(e) => handleSubmit(e, false)}
                className="space-y-4"
              >
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
                      required
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
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirm Password Field */}
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-zinc-500" />
                    <Input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirm your password"
                      className="pl-10 bg-zinc-800/50 border-zinc-700 text-white placeholder-zinc-500 focus:border-white focus:ring-white/20 py-6"
                      required
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-white text-black hover:bg-gray-200 py-6 mt-6 shadow-lg"
                >
                  Create Account
                </Button>

                {/* Terms */}
                <p className="text-xs text-zinc-500 text-center mt-4">
                  By creating an account, you agree to our{" "}
                  <a href="#" className="text-white hover:text-gray-300">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-white hover:text-gray-300">
                    Privacy Policy
                  </a>
                </p>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Auth;
