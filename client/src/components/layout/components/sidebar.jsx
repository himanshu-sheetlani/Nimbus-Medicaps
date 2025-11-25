import {
  Home,
  Map,
  Calendar,
  MessageCircle,
  Settings,
  User,
  LogOut,
  X,
  Box,
  FileBox,
  Sparkles,
  Plane,
} from "lucide-react";
import { useAuthStore } from "@/stores/useAuthStore";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import logo from "@/assets/logo.png";

const Sidebar = ({ isOpen, onClose }) => {
  const { logout } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { theme } = useTheme();

  const sidebarItems = [
    {
      icon: Home,
      label: "Home",
      href: "/home",
      gradient: "from-blue-500 to-cyan-500",
      hoverGradient: "from-blue-400 to-cyan-400",
    },
    {
      icon: Box,
      label: "3D Models",
      href: "/3d-models",
      gradient: "from-green-500 to-emerald-500",
      hoverGradient: "from-green-400 to-emerald-400",
    },
    {
      icon: Plane,
      label: "My Trips",
      href: "/my-trips",
      gradient: "from-purple-500 to-violet-500",
      hoverGradient: "from-purple-400 to-violet-400",
    },
    {
      icon: User,
      label: "Profile",
      href: "/profile",
      gradient: "from-pink-500 to-rose-500",
      hoverGradient: "from-pink-400 to-rose-400",
    },
    {
      icon: Settings,
      label: "Settings",
      href: "/settings",
      gradient: "from-gray-500 to-slate-500",
      hoverGradient: "from-gray-400 to-slate-400",
    },
  ];

  // Function to check if the current path matches the item href
  const isActiveTab = (href) => {
    if (href === "/home") {
      return location.pathname === "/" || location.pathname === "/home";
    }
    return location.pathname.startsWith(href);
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      navigate("/auth");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleNavigation = (href) => {
    navigate(href);
    onClose(); // Close mobile sidebar after navigation
  };

  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-sidebar border-r border-sidebar-border transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-all duration-500 ease-in-out lg:translate-x-0 lg:static lg:inset-0 backdrop-blur-xl shadow-lg`}
        style={
          theme === "dark"
            ? {
                background: `
            linear-gradient(135deg, 
              rgba(18, 18, 18, 0.95) 0%, 
              rgba(30, 30, 30, 0.95) 50%, 
              rgba(18, 18, 18, 0.95) 100%
            )
          `,
              }
            : {}
        }
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-sidebar-border backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center transform transition-transform duration-300 hover:scale-110 hover:rotate-12">
              <img src={logo} alt="Nimbus Logo" className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-inter-bold text-sidebar-foreground">
              NIMBUS
            </h1>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden text-sidebar-foreground/60 hover:text-sidebar-foreground p-1 rounded-lg hover:bg-sidebar-accent transition-all duration-200 transform hover:scale-110"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          {sidebarItems.map((item, index) => (
            <button
              key={index}
              onClick={() => handleNavigation(item.href)}
              className={`group w-full flex items-center px-3 py-3 rounded-lg text-sm font-inter-medium transition-all duration-200 transform hover:scale-[1.02] relative overflow-hidden ${
                isActiveTab(item.href)
                  ? "bg-sidebar-accent text-sidebar-primary shadow-sm border border-sidebar-border"
                  : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50 border border-transparent"
              }`}
              style={{
                animationDelay: `${index * 100}ms`,
                animation: isOpen ? "slideInLeft 0.5s ease-out forwards" : "",
              }}
            >
              {/* Subtle background glow for active state */}
              {isActiveTab(item.href) && (
                <div
                  className="absolute inset-0 rounded-lg opacity-20"
                  style={{
                    background: `linear-gradient(135deg, var(--primary) 0%, transparent 70%)`,
                  }}
                />
              )}

              {/* Icon container */}
              <div
                className={`relative mr-3 p-1.5 rounded-md transition-all duration-200 ${
                  isActiveTab(item.href)
                    ? `bg-linear-to-r ${item.gradient} shadow-sm`
                    : `text-sidebar-foreground/50 group-hover:text-sidebar-foreground/80 group-hover:bg-sidebar-accent`
                }`}
              >
                <item.icon
                  className={`h-4 w-4 transition-colors duration-200 ${
                    isActiveTab(item.href) ? "text-white" : ""
                  }`}
                />
              </div>

              <span className="relative z-10 font-inter-medium">
                {item.label}
              </span>

              {/* Simple active indicator */}
              {isActiveTab(item.href) && (
                <div className="absolute right-3 w-1.5 h-1.5 bg-sidebar-primary rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-sidebar-border backdrop-blur-sm">
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="group w-full flex items-center px-3 py-3 text-sm font-inter-medium text-sidebar-foreground/70 hover:text-error hover:bg-error/5 rounded-lg transition-all duration-200 border border-transparent hover:border-error/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="mr-3 p-1.5 rounded-md transition-all duration-200 group-hover:bg-error/10">
              <LogOut
                className={`h-4 w-4 transition-all duration-200 ${
                  isLoggingOut ? "animate-spin" : ""
                }`}
              />
            </div>
            {isLoggingOut ? "Signing Out..." : "Sign Out"}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-all duration-500"
          onClick={onClose}
          style={{
            animation: "fadeIn 0.3s ease-out",
          }}
        />
      )}
    </>
  );
};

export default Sidebar;
