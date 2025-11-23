import { Menu, Bell, Search, User, ChevronDown, Settings, LogOut, Sparkles } from "lucide-react";
import { useAuthStore } from "@/stores/useAuthStore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Topbar = ({ onMenuClick }) => {
  const { user, logout } = useAuthStore();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Welcome to NIMBUS! 🎉", type: "info", unread: true },
    { id: 2, message: "Your profile setup is pending", type: "warning", unread: true },
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
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsNotificationOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadCount = notifications.filter(n => n.unread).length;

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/auth");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const markNotificationAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, unread: false } : notif
      )
    );
  };

  const userMenuItems = [
    {
      icon: User,
      label: "View Profile",
      onClick: () => navigate("/profile"),
      gradient: "from-blue-500 to-blue-600"
    },
    {
      icon: Settings,
      label: "Settings",
      onClick: () => navigate("/settings"),
      gradient: "from-purple-500 to-purple-600"
    },
    {
      icon: LogOut,
      label: "Sign Out",
      onClick: handleLogout,
      gradient: "from-red-500 to-red-600",
      danger: true
    }
  ];

  return (
    <header className="h-16 bg-gradient-to-r from-zinc-900 via-zinc-900 to-black border-b border-purple-900/30 backdrop-blur-xl flex items-center justify-between px-6 relative">
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-zinc-500/5 via-transparent to-zinc-500/5 pointer-events-none" />
      
      {/* Left Side - Mobile Menu */}
      <div className="flex items-center space-x-4 relative z-10">
        <button
          onClick={onMenuClick}
          className="lg:hidden text-purple-400 hover:text-purple-300 p-2 rounded-lg hover:bg-purple-950/50 transition-all duration-200 transform hover:scale-110 active:scale-95"
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
            className="relative text-purple-400 hover:text-purple-300 p-2 rounded-lg hover:bg-purple-950/50 transition-all duration-200 transform hover:scale-110 active:scale-95"
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center animate-pulse">
                <span className="text-xs font-bold text-white">{unreadCount}</span>
              </div>
            )}
          </button>

          {/* Notifications Dropdown */}
          {isNotificationOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-zinc-900/95 backdrop-blur-xl border border-purple-900/30 rounded-xl shadow-xl shadow-black/20 py-2 z-50 animate-in slide-in-from-top-2 duration-200">
              <div className="px-4 py-2 border-b border-purple-900/30">
                <h3 className="text-sm font-inter-semibold text-purple-100">Notifications</h3>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {notifications.map((notification) => (
                  <button
                    key={notification.id}
                    onClick={() => markNotificationAsRead(notification.id)}
                    className={`w-full px-4 py-3 text-left hover:bg-purple-950/30 transition-colors duration-200 border-l-2 ${
                      notification.unread 
                        ? 'border-purple-500 bg-purple-950/20' 
                        : 'border-transparent'
                    }`}
                  >
                    <p className={`text-sm ${notification.unread ? 'text-purple-100' : 'text-purple-300'}`}>
                      {notification.message}
                    </p>
                    <div className="flex items-center justify-between mt-1">
                      <span className={`text-xs px-2 py-1 rounded ${
                        notification.type === 'info' 
                          ? 'bg-blue-900/50 text-blue-300'
                          : 'bg-yellow-900/50 text-yellow-300'
                      }`}>
                        {notification.type}
                      </span>
                      {notification.unread && (
                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
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
          <div className="hidden md:block text-right">
            <p className="text-sm font-inter-semibold text-purple-100">{user?.name}</p>
            <p className="text-xs text-purple-400">{user?.email}</p>
          </div>
          <div className="relative" ref={userMenuRef}>
            <button 
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center space-x-2 p-2 rounded-xl hover:bg-purple-950/50 transition-all duration-200 transform hover:scale-105 active:scale-95 border border-transparent hover:border-purple-800/30"
            >
              <div className="relative">
                <Avatar className="w-8 h-8 border-2 border-purple-500/30 transition-all duration-200 hover:border-purple-500/50">
                  <AvatarImage src={user?.profile} alt={user?.name} />
                  <AvatarFallback className="bg-gradient-to-br from-purple-500 to-purple-600 text-white font-inter-semibold text-sm">
                    {user?.name?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-zinc-900 rounded-full animate-pulse" />
              </div>
              <ChevronDown className={`h-4 w-4 text-purple-400 transition-transform duration-200 ${
                isUserMenuOpen ? 'rotate-180' : ''
              }`} />
            </button>

            {/* User Menu Dropdown */}
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-zinc-900/95 backdrop-blur-xl border border-purple-900/30 rounded-xl shadow-xl shadow-black/20 py-2 z-50 animate-in slide-in-from-top-2 duration-200">
                <div className="px-4 py-3 border-b border-purple-900/30">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10 border-2 border-purple-500/30">
                      <AvatarImage src={user?.profile} alt={user?.name} />
                      <AvatarFallback className="bg-gradient-to-br from-purple-500 to-purple-600 text-white font-inter-semibold">
                        {user?.name?.charAt(0) || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-inter-semibold text-purple-100 truncate">
                        {user?.name}
                      </p>
                      <p className="text-xs text-purple-400 truncate">
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
                      className={`w-full flex items-center px-4 py-3 text-left transition-all duration-200 hover:bg-purple-950/30 group ${
                        item.danger ? 'hover:bg-red-950/30' : ''
                      }`}
                    >
                      <div className={`mr-3 p-1.5 rounded-lg transition-all duration-300 transform group-hover:scale-110 bg-gradient-to-r ${item.gradient} bg-opacity-20 group-hover:bg-opacity-30`}>
                        <item.icon className={`h-4 w-4 transition-colors duration-200 ${
                          item.danger 
                            ? 'text-red-400 group-hover:text-red-300' 
                            : 'text-purple-400 group-hover:text-purple-300'
                        }`} />
                      </div>
                      <span className={`text-sm font-inter-medium transition-colors duration-200 ${
                        item.danger 
                          ? 'text-red-300 group-hover:text-red-200' 
                          : 'text-purple-300 group-hover:text-purple-100'
                      }`}>
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