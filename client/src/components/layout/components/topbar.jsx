import { Menu, Bell, Search, User, ChevronDown } from "lucide-react";
import { useAuthStore } from "@/stores/useAuthStore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Topbar = ({ onMenuClick }) => {
  const { user } = useAuthStore();
  return (
    <header className="h-16 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between px-6">
      {/* Left Side - Mobile Menu + Search */}
      <div className="flex items-center space-x-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden text-gray-400 hover:text-white"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Right Side - Notifications + User Menu */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}

        {/* User Menu */}
        <div className="flex items-center space-x-3">
          <div className="hidden md:block text-right">
            <p className="text-sm font-medium text-white">{user?.name}</p>
            <p className="text-xs text-gray-400">{user?.email}</p>
          </div>
          <div className="relative">
            <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-zinc-800 transition-colors">
              <Avatar className="bg-black">
                <AvatarImage src={user?.profile} alt={user?.name} />
                <AvatarFallback className="bg-black">
                  {user?.name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
