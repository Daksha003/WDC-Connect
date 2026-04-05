import { motion } from "framer-motion";
import { TrendingUp, Users, Calendar, AlertCircle, Heart } from "lucide-react";
import EventCard from "../components/EventCard";
import ComplaintCard from "../components/ComplaintCard";
import { events } from "../data/events";

export default function Dashboard() {
  const stats = [
    {
      name: "Attendance",
      value: "98%",
      icon: TrendingUp,
      color: "from-emerald-500 to-emerald-600",
    },
    {
      name: "Events Joined",
      value: "12",
      icon: Calendar,
      color: "from-blue-500 to-blue-600",
    },
    {
      name: "ICC Requests",
      value: "3",
      icon: AlertCircle,
      color: "from-orange-500 to-orange-600",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <motion.div
        className="glass-card"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-pink-500 bg-clip-text text-transparent mb-3">
              Good Morning, Ayesha!
            </h1>
            <p className="text-xl text-gray-600">
              Here's what's happening today 💜
            </p>
          </div>
          <div className="glass-card p-6 text-center">
            <Heart className="w-12 h-12 text-pink-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-800">Stay Safe</p>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, staggerChildren: 0.1 }}
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            className="glass-card p-8 text-center hover:shadow-glow-lg transition-all duration-300 cursor-pointer group"
            whileHover={{ y: -5 }}
            transition={{ delay: index * 0.1 }}
          >
            <div
              className={`w-16 h-16 ${stat.color} bg-gradient-to-r rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-glow group-hover:scale-110 transition-transform`}
            >
              <stat.icon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-1">
              {stat.value}
            </h3>
            <p className="text-gray-600 font-medium">{stat.name}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Events Preview */}
      <motion.section
        className="glass-card"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Upcoming Events</h2>
          <a
            href="/events"
            className="text-primary-600 font-semibold hover:text-primary-700 flex items-center gap-1"
          >
            View All <span>→</span>
          </a>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.slice(0, 3).map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </motion.section>

      {/* Quick Actions */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <div className="glass-card p-8 hover:shadow-glow-lg transition-all duration-300 cursor-pointer group">
          <AlertCircle className="w-12 h-12 text-orange-400 mx-auto mb-4 group-hover:rotate-12 transition-transform" />
          <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">
            New Complaint
          </h3>
          <p className="text-gray-600 text-center mb-6">
            Report an issue anonymously
          </p>
          <a href="/complaint/new" className="gradient-btn w-full text-center">
            File Complaint
          </a>
        </div>

        <ComplaintCard status="ongoing" />

        <div className="glass-card p-8 text-center">
          <Users className="w-12 h-12 text-primary-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            Community Chat
          </h3>
          <p className="text-gray-600 mb-6">Connect with other members</p>
          <button className="w-full py-3 px-6 border-2 border-primary-200 text-primary-600 font-semibold rounded-2xl hover:bg-primary-50 transition-all duration-200">
            Join Chat
          </button>
        </div>
      </motion.div>
    </div>
  );
}
