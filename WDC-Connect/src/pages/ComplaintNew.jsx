import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Upload,
  AlertTriangle,
  Calendar,
  MapPin,
  User,
  Shield,
  Check,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const complaintTypes = [
  {
    id: "harassment",
    label: "Sexual Harassment",
    icon: AlertTriangle,
    color: "from-orange-400 to-orange-500",
  },
  {
    id: "bullying",
    label: "Bullying / Ragging",
    icon: AlertTriangle,
    color: "from-red-400 to-red-500",
  },
  {
    id: "discrimination",
    label: "Discrimination",
    icon: Shield,
    color: "from-purple-400 to-purple-500",
  },
  {
    id: "stalking",
    label: "Stalking",
    icon: User,
    color: "from-pink-400 to-pink-500",
  },
  {
    id: "other",
    label: "Other",
    icon: AlertTriangle,
    color: "from-gray-400 to-gray-500",
  },
];

export default function ComplaintNew() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    type: "",
    dateTime: "",
    location: "",
    peopleInvolved: "",
    description: "",
    anonymous: true,
    files: [],
  });
  const [fileInputKey, setFileInputKey] = useState(0);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock submit
    alert(
      "Complaint submitted successfully! Reference: #CMP-" +
        Math.floor(Math.random() * 1000),
    );
    navigate("/complaints");
  };

  const addFile = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({ ...prev, files: [...prev.files, ...files] }));
    setFileInputKey((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 p-6 md:p-12">
      <div className="max-w-2xl mx-auto">
        <Link
          to="/complaints"
          className="inline-flex items-center gap-3 mb-12 p-4 bg-white/50 backdrop-blur-xl rounded-3xl hover:shadow-glow-lg transition-all group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-semibold text-gray-800">
            Back to Complaints
          </span>
        </Link>

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Header */}
          <div className="glass-card p-8 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-glow-lg">
              <AlertTriangle className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent mb-3">
              File New Complaint
            </h1>
            <p className="text-xl text-gray-600 max-w-lg mx-auto">
              We're here to support you. Your safety matters.
            </p>
            <div className="flex items-center justify-center gap-2 mt-6 text-sm text-gray-500">
              <Check className="w-4 h-4 text-emerald-500" />
              <span>Anonymous reporting available</span>
            </div>
          </div>

          {/* Step 1: Type */}
          {step === 1 && (
            <motion.div
              className="glass-card p-8"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-8">
                What happened?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {complaintTypes.map((type) => (
                  <motion.button
                    key={type.id}
                    type="button"
                    className={`p-6 rounded-3xl border-2 transition-all duration-300 hover:shadow-glow-lg flex flex-col items-center gap-3 h-full ${
                      formData.type === type.id
                        ? `bg-gradient-to-br ${type.color} text-white border-transparent shadow-glow-lg`
                        : "border-gray-200 bg-white/50 hover:border-primary-200"
                    }`}
                    onClick={() => {
                      setFormData((prev) => ({ ...prev, type: type.id }));
                      setStep(2);
                    }}
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div
                      className={`p-3 rounded-2xl ${formData.type === type.id ? "bg-white/20" : "bg-white/30"}`}
                    >
                      <type.icon className="w-8 h-8" />
                    </div>
                    <span className="font-semibold text-left">
                      {type.label}
                    </span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Details */}
          {step === 2 && (
            <>
              <motion.div
                className="glass-card p-8"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <h3 className="text-xl font-bold text-gray-800 mb-6">
                  When & Where?
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Date & Time
                    </label>
                    <input
                      type="datetime-local"
                      required
                      className="w-full px-4 py-4 border border-gray-200 rounded-2xl bg-white/50 backdrop-blur-sm focus:ring-4 focus:ring-orange-500/20 focus:border-transparent"
                      value={formData.dateTime}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          dateTime: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Location
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Library Section B, Canteen Area"
                      required
                      className="w-full px-4 py-4 border border-gray-200 rounded-2xl bg-white/50 backdrop-blur-sm focus:ring-4 focus:ring-orange-500/20 focus:border-transparent"
                      value={formData.location}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          location: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="glass-card p-8"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    People involved (optional)
                  </label>
                  <input
                    type="text"
                    placeholder="Names/IDs if known (helps investigation)"
                    className="w-full px-4 py-4 border border-gray-200 rounded-2xl bg-white/50 backdrop-blur-sm focus:ring-4 focus:ring-orange-500/20 focus:border-transparent"
                    value={formData.peopleInvolved}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        peopleInvolved: e.target.value,
                      }))
                    }
                  />
                </div>
              </motion.div>

              <motion.div
                className="glass-card p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Detailed description{" "}
                  <span className="text-orange-500">*</span>
                </label>
                <textarea
                  rows="6"
                  placeholder="Please describe the incident in detail. Include what happened, who was involved, and any witnesses. Your detailed account helps us take appropriate action."
                  required
                  className="w-full px-4 py-4 border border-gray-200 rounded-2xl bg-white/50 backdrop-blur-sm focus:ring-4 focus:ring-orange-500/20 focus:border-transparent resize-vertical"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                />
              </motion.div>

              {/* Anonymous toggle */}
              <motion.div
                className="glass-card p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <label className="flex items-center gap-4 cursor-pointer group">
                  <div
                    className={`w-6 h-6 rounded-xl flex items-center justify-center border-2 transition-all duration-200 ${
                      formData.anonymous
                        ? "bg-gradient-to-r from-primary-500 to-pink-400 border-transparent shadow-glow-sm"
                        : "border-gray-300"
                    }`}
                  >
                    {formData.anonymous && (
                      <Check className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">
                      File anonymously
                    </p>
                    <p className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
                      Your identity will be protected. Recommended for sensitive
                      cases.
                    </p>
                  </div>
                </label>
              </motion.div>

              {/* File upload */}
              <motion.div
                className="glass-card p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-4 flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Attach evidence (photos, screenshots) - optional
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-3xl p-8 text-center hover:border-primary-300 hover:bg-primary-50/50 transition-all duration-200 group">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4 group-hover:text-primary-400 transition-colors" />
                  <p className="text-gray-600 mb-2">
                    Click to upload or drag files
                  </p>
                  <p className="text-sm text-gray-500 mb-6">
                    PNG, JPG, PDF up to 10MB
                  </p>
                  <input
                    key={fileInputKey}
                    type="file"
                    multiple
                    accept="image/*,.pdf"
                    className="hidden"
                    onChange={addFile}
                  />
                  <button
                    type="button"
                    className="gradient-btn px-8 py-3 text-sm"
                    onClick={() =>
                      document.querySelector("input[type=file]").click()
                    }
                  >
                    Choose Files
                  </button>
                </div>

                {formData.files.length > 0 && (
                  <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
                    {formData.files.map((file, index) => (
                      <div key={index} className="relative group">
                        <div className="w-full aspect-video rounded-2xl overflow-hidden bg-gray-100">
                          {file.type.startsWith("image/") ? (
                            <img
                              src={URL.createObjectURL(file)}
                              alt={file.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-200">
                              <span className="text-sm text-gray-500">PDF</span>
                            </div>
                          )}
                        </div>
                        <button
                          type="button"
                          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              files: prev.files.filter((_, i) => i !== index),
                            }))
                          }
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>

              {/* Submit */}
              <motion.div
                className="glass-card p-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="max-w-md mx-auto text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-glow-lg">
                    <Shield className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Ready to submit?
                  </h2>
                  <p className="text-gray-600 mb-8">
                    Your complaint will be reviewed by our ICC team within 24
                    hours. You will receive reference number via notification.
                  </p>
                  <button
                    type="submit"
                    className="gradient-btn w-full text-lg font-semibold py-5 px-12 rounded-3xl shadow-glow-lg hover:shadow-glow-xl"
                  >
                    Submit Complaint Securely
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </motion.form>
      </div>
    </div>
  );
}
