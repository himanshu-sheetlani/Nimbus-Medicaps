import {
  Menu,
  Bell,
  Search,
  User,
  ChevronDown,
  Settings,
  LogOut,
  Sparkles,
} from "lucide-react";
import { useAuthStore } from "@/stores/useAuthStore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Topbar = ({ onMenuClick }) => {
  const { user, logout } = useAuthStore();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Welcome to NIMBUS! 🎉", type: "info", unread: true },
    {
      id: 2,
      message: "Your profile setup is pending",
      type: "warning",
      unread: true,
    },
  ]);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const userMenuRef = useRef(null);
  const notificationRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setIsNotificationOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/auth");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const markNotificationAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, unread: false } : notif
      )
    );
  };

  const userMenuItems = [
    {
      icon: User,
      label: "View Profile",
      onClick: () => navigate("/profile"),
      gradient: "from-blue-500 to-blue-600",
    },
    {
      icon: Settings,
      label: "Settings",
      onClick: () => navigate("/settings"),
      gradient: "from-purple-500 to-purple-600",
    },
    {
      icon: LogOut,
      label: "Sign Out",
      onClick: handleLogout,
      gradient: "from-red-500 to-red-600",
      danger: true,
    },
  ];

  return (
    <header className="h-16 bg-sidebar border-b border-theme backdrop-blur-xl flex items-center justify-between px-6 relative">
      {/* Background glow effect */}
      <div className="absolute inset-0  pointer-events-none" />

      {/* Left Side - Mobile Menu */}
      <div className="flex items-center space-x-4 relative z-10">
        <button
          onClick={onMenuClick}
          className="lg:hidden text-accent hover:text-accent/80 p-2 rounded-lg hover:bg-card transition-all duration-200 transform hover:scale-110 active:scale-95"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* Right Side - Notifications + User Menu */}
      <div className="flex items-center space-x-4 relative z-10">
        {/* Notifications */}
        <div className="relative" ref={notificationRef}>
          <button
            onClick={() => setIsNotificationOpen(!isNotificationOpen)}
            className="relative text-accent hover:text-accent/80 p-2 rounded-lg hover:bg-card transition-all duration-200 transform hover:scale-110 active:scale-95"
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-error rounded-full flex items-center justify-center animate-pulse">
                <span className="text-xs font-bold text-white">
                  {unreadCount}
                </span>
              </div>
            )}
          </button>

          {/* Notifications Dropdown */}
          {isNotificationOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-card backdrop-blur-xl border border-theme rounded-xl shadow-xl py-2 z-50 animate-in slide-in-from-top-2 duration-200">
              <div className="px-4 py-2 border-b border-theme">
                <h3 className="text-sm font-inter-semibold text-primary-theme">
                  Notifications
                </h3>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {notifications.map((notification) => (
                  <button
                    key={notification.id}
                    onClick={() => markNotificationAsRead(notification.id)}
                    className={`w-full px-4 py-3 text-left hover:bg-surface transition-colors duration-200 border-l-2 ${
                      notification.unread
                        ? "border-accent bg-surface/50"
                        : "border-transparent"
                    }`}
                  >
                    <p
                      className={`text-sm ${
                        notification.unread
                          ? "text-primary-theme"
                          : "text-secondary-theme"
                      }`}
                    >
                      {notification.message}
                    </p>
                    <div className="flex items-center justify-between mt-1">
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          notification.type === "info"
                            ? "bg-accent/10 text-accent"
                            : "bg-warning/10 text-warning"
                        }`}
                      >
                        {notification.type}
                      </span>
                      {notification.unread && (
                        <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Menu */}
        <div className="flex items-center space-x-3">
          {/* Theme Toggle */}
          <AnimatedThemeToggler className="p-2 text-accent hover:text-accent/80 hover:bg-card rounded-lg transition-all duration-200 transform hover:scale-110 active:scale-95" />

          <div className="hidden md:block text-right">
            <p className="text-sm font-inter-semibold text-primary-theme">
              {user?.name}
            </p>
            <p className="text-xs text-secondary-theme">{user?.email}</p>
          </div>
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center space-x-2 p-2 rounded-xl hover:bg-card transition-all duration-200 transform hover:scale-105 active:scale-95 border border-transparent hover:border-theme"
            >
              <div className="relative">
                <Avatar className="w-8 h-8 border-2 border-accent/30 transition-all duration-200 hover:border-accent/50">
                  <AvatarImage src={user?.profile} alt={user?.name} />
                  <AvatarFallback className="bg-accent text-white font-inter-semibold text-sm">
                    {user?.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-success border-2 border-background rounded-full animate-pulse" />
              </div>
              <ChevronDown
                className={`h-4 w-4 text-secondary-theme transition-transform duration-200 ${
                  isUserMenuOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* User Menu Dropdown */}
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-card backdrop-blur-xl border border-theme rounded-xl shadow-xl py-2 z-50 animate-in slide-in-from-top-2 duration-200">
                <div className="px-4 py-3 border-b border-theme">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10 border-2 border-accent/30">
                      <AvatarImage src={user?.profile} alt={user?.name} />
                      <AvatarFallback className="bg-accent text-white font-inter-semibold">
                        {user?.name?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-inter-semibold text-primary-theme truncate">
                        {user?.name}
                      </p>
                      <p className="text-xs text-secondary-theme truncate">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="py-2">
                  {userMenuItems.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        item.onClick();
                        setIsUserMenuOpen(false);
                      }}
                      className={`w-full flex items-center px-4 py-3 text-left transition-all duration-200 hover:bg-surface group ${
                        item.danger ? "hover:bg-error/10" : ""
                      }`}
                    >
                      <div
                        className={`mr-3 p-1.5 rounded-lg transition-all duration-300 transform group-hover:scale-110 ${
                          item.danger ? "bg-error/10" : "bg-accent/10"
                        }`}
                      >
                        <item.icon
                          className={`h-4 w-4 transition-colors duration-200 ${
                            item.danger ? "text-error" : "text-accent"
                          }`}
                        />
                      </div>
                      <span
                        className={`text-sm font-inter-medium transition-colors duration-200 ${
                          item.danger ? "text-error" : "text-primary-theme"
                        }`}
                      >
                        {item.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
