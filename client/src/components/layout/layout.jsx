import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/sidebar";
import Topbar from "./components/topbar";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleMenuClick = () => {
    setSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="h-screen bg-black text-white flex overflow-hidden relative">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={handleSidebarClose} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        {/* Top Bar */}
        <Topbar onMenuClick={handleMenuClick} />

        {/* Main Content - This is where the page content will be rendered */}
        <main className="flex-1 overflow-y-auto bg-black p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
