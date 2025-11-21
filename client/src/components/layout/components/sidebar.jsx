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
  icons,
  FileBox,
} from "lucide-react";
import { useAuthStore } from "@/stores/useAuthStore";
import { useLocation } from "react-router-dom";

const Sidebar = ({ isOpen, onClose }) => {
  const { logout } = useAuthStore();
  const location = useLocation();

  const sidebarItems = [
    { icon: Home, label: "Home", href: "/home" },
    { icon: Box, label: "3d Models", href: "/3d-models" },
    { icon: Map, label: "Trip Planner", href: "/planner" },
    { icon: Calendar, label: "My Trips", href: "/my-trips" },
    { icon: FileBox, label: "3D Model Generator", href: "/3d-model-generator" },
    { icon: User, label: "Profile", href: "/profile" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ];

  // Function to check if the current path matches the item href
  const isActiveTab = (href) => {
    if (href === "/home") {
      return location.pathname === "/" || location.pathname === "/home";
    }
    return location.pathname === href;
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-zinc-900 border-r border-zinc-800 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-zinc-800">
          <h1 className="text-xl font-bold text-white">Nimbus</h1>
          <button
            onClick={onClose}
            className="lg:hidden text-gray-400 hover:text-white"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {sidebarItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                isActiveTab(item.href)
                  ? "bg-white text-black"
                  : "text-gray-400 hover:text-white hover:bg-zinc-800"
              }`}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.label}
            </a>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-zinc-800">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-3 text-sm font-medium text-gray-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
          >
            <LogOut className="mr-3 h-5 w-5" />
            Sign Out
          </button>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
    </>
  );
};

export default Sidebar;
