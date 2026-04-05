import { Bell, User, Menu } from "lucide-react";
import { motion } from "framer-motion";

export default function Topbar({ setSidebarOpen }) {
  const user = {
    name: "Ayesha",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
  };

  return (
    <motion.div
      className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-white/50 shadow-glow"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="px-6 md:px-8 py-4 flex items-center justify-between">
        {/* Mobile menu button */}
        <motion.button
          className="md:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
          onClick={() => setSidebarOpen(true)}
          whileTap={{ scale: 0.95 }}
        >
          <Menu className="w-6 h-6" />
        </motion.button>

        {/* Greeting */}
        <div className="hidden md:block">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-pink-500 bg-clip-text text-transparent">
            Welcome back, {user.name} 💜
          </h1>
          <p className="text-gray-500">Monday, 20 May</p>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <motion.button
            className="p-2 rounded-xl hover:bg-purple-100 hover:text-primary-600 transition-all relative"
            whileTap={{ scale: 0.95 }}
          >
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </motion.button>

          <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
            <div className="w-10 h-10 rounded-2xl overflow-hidden border-2 border-white/50 shadow-glow">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="hidden md:block">
              <p className="font-semibold text-gray-900">{user.name}</p>
              <p className="text-sm text-gray-500">Student</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
