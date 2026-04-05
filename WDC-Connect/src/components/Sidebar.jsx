import { Link, useLocation, useResolvedPath } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Calendar,
  AlertTriangle,
  Bell,
  User,
  LayoutDashboard,
  Megaphone,
  FileText,
} from "lucide-react";

const navItems = [
  { name: "Dashboard", path: "/home", icon: LayoutDashboard },
  { name: "Events", path: "/events", icon: Calendar },
  { name: "Complaints", path: "/complaints", icon: AlertTriangle },
  { name: "Updates", path: "/profile", icon: Bell },
  { name: "Profile", path: "/profile", icon: User },
];

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();

  const isActive = (path) => {
    return useResolvedPath(path).pathname === location.pathname;
  };

  return (
    <>
      {/* Mobile sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            className="fixed inset-y-0 left-0 z-50 w-64 bg-white/90 backdrop-blur-xl shadow-2xl md:hidden"
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: "spring", bounce: 0 }}
          >
            <div className="p-6">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-pink-400 rounded-2xl flex items-center justify-center shadow-glow">
                  <span className="text-2xl font-bold text-white">W</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-primary-600 to-pink-500 bg-clip-text text-transparent">
                    WDC-Connect
                  </h1>
                  <p className="text-sm text-gray-500">Empower Her</p>
                </div>
              </div>

              <nav className="space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`sidebar-link ${isActive(item.path) ? "sidebar-link-active" : ""}`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <motion.aside
        className="fixed inset-y-0 left-0 z-30 w-64 bg-white/90 backdrop-blur-xl shadow-glow-lg hidden md:block"
        initial={{ x: -280 }}
        animate={{ x: 0 }}
      >
        <div className="p-6 h-full flex flex-col">
          <div className="flex items-center gap-3 mb-12 pb-6 border-b border-gray-100">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-pink-400 rounded-2xl flex items-center justify-center shadow-glow">
              <span className="text-2xl font-bold text-white">W</span>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary-600 to-pink-500 bg-clip-text text-transparent">
                WDC-Connect
              </h1>
              <p className="text-sm text-gray-500">Empower Her</p>
            </div>
          </div>

          <nav className="flex-1 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`sidebar-link ${isActive(item.path) ? "sidebar-link-active" : ""}`}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </motion.aside>
    </>
  );
}
