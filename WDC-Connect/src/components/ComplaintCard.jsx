import { motion } from "framer-motion";
import { AlertCircle, Clock, CheckCircle, User } from "lucide-react";

const statusConfig = {
  ongoing: { label: "Ongoing", color: "orange", icon: Clock },
  resolved: { label: "Resolved", color: "emerald", icon: CheckCircle },
  new: { label: "New", color: "blue", icon: AlertCircle },
};

export default function ComplaintCard({ status = "ongoing" }) {
  const config = statusConfig[status];

  return (
    <motion.div
      className="glass-card p-6 hover:shadow-glow-lg transition-all duration-300 cursor-pointer"
      whileHover={{ y: -4 }}
    >
      <div className="flex items-start gap-4 mb-4">
        <div
          className={`w-3 h-12 bg-gradient-to-b from-${config.color}-400 to-${config.color}-500 rounded-xl flex-shrink-0`}
        ></div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <span
              className={`px-3 py-1 bg-${config.color}-100 text-${config.color}-700 text-xs font-semibold rounded-xl`}
            >
              <config.icon className="w-3 h-3 inline mr-1" />
              {config.label}
            </span>
            <span className="text-xs text-gray-500">#CMP-045</span>
          </div>
          <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">
            Harassment incident at library section B
          </h3>
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            Reported by anonymous student on 20th May. Investigation in
            progress.
          </p>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <User className="w-3 h-3" />
            Anonymous • 2 days ago
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <span className="text-sm font-medium text-gray-700">3 updates</span>
        <div
          className={`px-3 py-1 bg-${config.color}-50 border border-${config.color}-200 rounded-xl text-xs font-semibold text-${config.color}-700`}
        >
          View Status
        </div>
      </div>
    </motion.div>
  );
}
