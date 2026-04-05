import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Filter, AlertCircle } from "lucide-react";
import ComplaintCard from "../components/ComplaintCard";
import { Link } from "react-router-dom";

const complaintTabs = ["All", "Ongoing", "Resolved", "Closed"];

export default function Complaints() {
  const [activeTab, setActiveTab] = useState("All");

  const complaints = [
    { id: 1, status: "ongoing", title: "Harassment at library" },
    { id: 2, status: "resolved", title: "Stalking incident" },
    { id: 3, status: "new", title: "Hostile environment" },
    { id: 4, status: "ongoing", title: "Unequal treatment" },
  ];

  const filteredComplaints = complaints.filter(
    (c) => activeTab === "All" || c.status === activeTab.toLowerCase(),
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        className="glass-card p-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-3 flex items-center gap-3">
              <AlertCircle className="w-12 h-12 text-orange-400" />
              My Complaints
            </h1>
            <p className="text-xl text-gray-600">
              Track your complaints and their status
            </p>
          </div>
          <Link
            to="/complaint/new"
            className="gradient-btn px-8 py-4 text-lg font-semibold"
          >
            <Plus className="w-5 h-5 inline mr-2" />
            New Complaint
          </Link>
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div
        className="glass-card p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex bg-white/50 rounded-3xl p-1 mb-8">
          {complaintTabs.map((tab) => (
            <button
              key={tab}
              className={`flex-1 py-4 px-6 rounded-2xl font-medium transition-all duration-200 relative ${
                activeTab === tab
                  ? "bg-gradient-to-r from-orange-500 to-orange-400 text-white shadow-glow"
                  : "text-gray-600 hover:text-gray-900 hover:bg-white/30"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Complaints List */}
      <AnimatePresence mode="wait">
        {filteredComplaints.length > 0 ? (
          <motion.section
            className="glass-card p-8"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredComplaints.map((complaint) => (
                <motion.div
                  key={complaint.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <ComplaintCard status={complaint.status} />
                </motion.div>
              ))}
            </div>
          </motion.section>
        ) : (
          <motion.section
            className="text-center py-24 glass-card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <AlertCircle className="w-24 h-24 text-gray-300 mx-auto mb-8" />
            <h3 className="text-2xl font-bold text-gray-500 mb-4">
              {activeTab === "All"
                ? "No complaints yet"
                : `No ${activeTab.toLowerCase()} complaints`}
            </h3>
            <p className="text-gray-500 max-w-lg mx-auto mb-8">
              {activeTab === "All"
                ? "You haven't filed any complaints. Everything okay?"
                : `Your ${activeTab.toLowerCase()} complaints will appear here.`}
            </p>
            <Link
              to="/complaint/new"
              className="gradient-btn px-12 py-4 text-lg mx-auto block w-fit"
            >
              File First Complaint
            </Link>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}
