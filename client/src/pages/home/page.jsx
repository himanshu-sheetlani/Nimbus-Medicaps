import { Wrapper } from "@/components/global/Wrapper";
import { Container } from "@/components/global/Container";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Eye,
  MapPin,
  Mic,
  Cuboid,
  Calendar,
  Clock,
  Star,
  TrendingUp,
  Camera,
  Compass,
  BookOpen,
  Settings,
  Bell,
  Search,
  Filter,
  Plus,
  Map,
  Heart,
  Share2,
  Play,
  ChevronRight,
  MoreHorizontal,
  Box,
  MonitorSpeaker,
  Users,
} from "lucide-react";
import { useState } from "react";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data - replace with actual API calls
  const recentTrips = [
    {
      id: 1,
      destination: "Paris, France",
      date: "Dec 15-22, 2024",
      planType: "family",
      image: "/api/placeholder/300/200",
      arViewed: true,
      hasAR: true,
      has3D: true,
      hasVR: false,
      budget: "$2500",
      participants: 4,
    },
    {
      id: 2,
      destination: "Tokyo, Japan",
      date: "Nov 8-15, 2024",
      planType: "solo",
      image: "/api/placeholder/300/200",
      rating: 5,
      hasAR: true,
      has3D: true,
      hasVR: true,
      budget: "$3000",
      participants: 1,
    },
    {
      id: 3,
      destination: "New York, USA",
      date: "Oct 20-25, 2024",
      planType: "couple",
      image: "/api/placeholder/300/200",
      rating: 4,
      hasAR: true,
      has3D: false,
      hasVR: true,
      budget: "$1800",
      participants: 2,
    },
  ];

  const quickActions = [
    {
      icon: Camera,
      label: "Upload Photos",
      desc: "Convert to 3D",
      action: "/upload",
    },
    {
      icon: Eye,
      label: "AR Preview",
      desc: "Virtual walkthrough",
      action: "/ar",
    },
    {
      icon: Mic,
      label: "Voice Plan",
      desc: "AI trip planner",
      action: "/voice",
    },
    {
      icon: Compass,
      label: "Explore",
      desc: "Discover places",
      action: "/explore",
    },
  ];

  const aiSuggestions = [
    {
      title: "Bali, Indonesia",
      reason: "Perfect weather in December",
      confidence: 92,
      image:
        "https://plus.unsplash.com/premium_photo-1677829177642-30def98b0963?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmFsaXxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      title: "Switzerland Alps",
      reason: "Based on your mountain preferences",
      confidence: 88,
      image:
        "https://plus.unsplash.com/premium_photo-1689084892324-fd8822cb97c1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c3dpdHplcmxhbmQlMjBhbHBzfGVufDB8fDB8fHww",
    },
    {
      title: "Iceland",
      reason: "Aurora season starting",
      confidence: 85,
      image:
        "https://images.unsplash.com/photo-1531168556467-80aace0d0144?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aWNlbGFuZHxlbnwwfHwwfHx8MA%3D%3D",
    },
  ];

  return (
    <div className="min-h-screen w-full">
      <Wrapper className="pt-6">
        <Container>
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-inter-bold text-purple-100 mb-2">
                Welcome back! 👋
              </h1>
              <p className="text-purple-300 font-inter-regular">
                Ready for your next adventure?
              </p>
            </div>

            <div className="flex items-center gap-4">
              <button className="p-2 bg-purple-950/50 border border-purple-800/30 rounded-lg text-purple-300 hover:bg-purple-950/70 transition-colors">
                <Bell className="h-5 w-5" />
              </button>
              <button className="p-2 bg-purple-950/50 border border-purple-800/30 rounded-lg text-purple-300 hover:bg-purple-950/70 transition-colors">
                <Settings className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Trips */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-inter-semibold text-purple-100">
                  Recent Trips
                </h2>
                <Link
                  to="/trips"
                  className="text-purple-400 font-inter-medium text-sm hover:text-purple-300 transition-colors flex items-center"
                >
                  View All <ChevronRight className="h-3 w-3 ml-1" />
                </Link>
              </div>

              <div className="space-y-4">
                {recentTrips.map((trip) => (
                  <div
                    key={trip.id}
                    className="bg-zinc-700/30 border border-zinc-400/30 rounded-xl p-4 hover:bg-purple-950/40 transition-colors group "
                  >
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 bg-purple-900/50 rounded-lg flex items-center justify-center overflow-hidden">
                        <MapPin className="h-8 w-8 text-purple-400" />
                      </div>

                      <div className="flex-1 b0">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-md font-inter-semibold text-purple-100">
                            {trip.destination}
                          </h3>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-inter-medium ${
                              trip.planType === "family"
                                ? "bg-blue-900/50 text-blue-300"
                                : trip.planType === "solo"
                                ? "bg-green-900/50 text-green-300"
                                : "bg-pink-900/50 text-pink-300"
                            }`}
                          >
                            {trip.planType}
                          </span>
                          {trip.arViewed && (
                            <Eye
                              className="h-4 w-4 text-purple-400"
                              title="AR Viewed"
                            />
                          )}
                        </div>
                        <p className="text-purple-300 font-inter-regular text-xs mb-2">
                          {trip.date}
                        </p>
                        <div className="flex items-center gap-4 mb-3">
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3 text-purple-400" />
                            <span className="text-purple-300 text-xs">
                              {trip.participants}{" "}
                              {trip.participants === 1 ? "person" : "people"}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-purple-400 text-xs">
                              Budget:
                            </span>
                            <span className="text-purple-300 text-xs font-inter-medium">
                              {trip.budget}
                            </span>
                          </div>
                        </div>
                        {trip.rating && (
                          <div className="flex items-center gap-1 mb-3">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${
                                  i < trip.rating
                                    ? "text-yellow-400 fill-current"
                                    : "text-gray-600"
                                }`}
                              />
                            ))}
                          </div>
                        )}
                        <div className="flex gap-2 mt-3">
                          {trip.hasAR && (
                            <Link
                              to={`/trips/${trip.id}/ar`}
                              className="px-3 py-1.5 bg-purple-900/50 border border-purple-700/50 rounded-md text-purple-300 text-xs font-inter-medium hover:bg-purple-800/50 transition-colors flex items-center gap-1"
                            >
                              <Eye className="h-3 w-3" />
                              AR View
                            </Link>
                          )}
                          {trip.has3D && (
                            <Link
                              to={`/trips/${trip.id}/3d`}
                              className="px-3 py-1.5 bg-purple-900/50 border border-purple-700/50 rounded-md text-purple-300 text-xs font-inter-medium hover:bg-purple-800/50 transition-colors flex items-center gap-1"
                            >
                              <Box className="h-3 w-3" />
                              3D Model
                            </Link>
                          )}
                          {trip.hasVR && (
                            <Link
                              to={`/trips/${trip.id}/vr`}
                              className="px-3 py-1.5 bg-purple-900/50 border border-purple-700/50 rounded-md text-purple-300 text-xs font-inter-medium hover:bg-purple-800/50 transition-colors flex items-center gap-1"
                            >
                              <MonitorSpeaker className="h-3 w-3" />
                              VR View
                            </Link>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button className="p-2 bg-purple-900/50 rounded-lg text-purple-300 hover:bg-purple-800/50 transition-colors opacity-0 group-hover:opacity-100">
                          <Share2 className="h-4 w-4" />
                        </button>
                        <button className="p-2 bg-purple-900/50 rounded-lg text-purple-300 hover:bg-purple-800/50 transition-colors opacity-0 group-hover:opacity-100">
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-zinc-700/30 border border-zinc-400/30 rounded-xl flex flex-col items-center py-6 mt-6 cursor-pointer hover:bg-purple-950/40 transition-colors">
                <Plus className="h-6 w-6 text-purple-400 mb-2" />
                <p className="text-purple-400 font-inter-medium text-sm hover:text-purple-300 transition-colors">
                  Plan New Trip
                </p>
              </div>

              {/* <div className="w-full flex items-center justify-evenly mt-8">
                <div className="bg-gradient-to-br from-purple-950/50 to-purple-900/30 border border-purple-800/30 rounded-xl p-6">
                  <h3 className="text-lg font-inter-semibold text-purple-100 mb-4">
                    Weather Update
                  </h3>
                  <div className="text-center">
                    <div className="text-3xl mb-2">☀️</div>
                    <p className="text-2xl font-inter-bold text-purple-100 mb-1">
                      22°C
                    </p>
                    <p className="text-purple-300 font-inter-regular text-sm">
                      Perfect for exploring!
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-950/50 to-blue-900/30 border border-blue-800/30 rounded-xl p-6">
                  <h3 className="text-lg font-inter-semibold text-purple-100 mb-4">
                    AI Activity
                  </h3>
                  <div className="text-center">
                    <div className="text-3xl mb-2">🤖</div>
                    <p className="text-2xl font-inter-bold text-purple-100 mb-1">
                      12
                    </p>
                    <p className="text-purple-300 font-inter-regular text-sm">
                      Suggestions made today
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-pink-950/50 to-pink-900/30 border border-pink-800/30 rounded-xl p-6">
                  <h3 className="text-lg font-inter-semibold text-purple-100 mb-4">
                    Immersive Views
                  </h3>
                  <div className="text-center">
                    <div className="text-3xl mb-2">🥽</div>
                    <p className="text-2xl font-inter-bold text-purple-100 mb-1">
                      47
                    </p>
                    <p className="text-purple-300 font-inter-regular text-sm">
                      AR/VR/3D experiences
                    </p>
                  </div>
                </div>
              </div> */}
            </div>

            {/* AI Suggestions Sidebar */}
            <div className="max-h-[85vh] overflow-y-scroll">
              <h2 className="text-2xl font-inter-semibold text-purple-100 mb-6">
                AI Suggestions
              </h2>

              <div className="space-y-4 mb-8">
                {aiSuggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="bg-zinc-700/30 border border-zinc-400/30 rounded-xl p-4 hover:bg-purple-950/50 transition-colors cursor-pointer group"
                  >
                    <div className="w-full h-32 bg-purple-900/50 rounded-lg mb-4 overflow-hidden">
                      <img
                        src={suggestion.image}
                        alt={suggestion.title}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>

                    <h3 className="text-lg font-inter-semibold text-purple-100 mb-2">
                      {suggestion.title}
                    </h3>
                    <p className="text-purple-300 font-inter-regular text-xs mb-3">
                      {suggestion.reason}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-green-300 font-inter-medium text-xs">
                          {suggestion.confidence}% match
                        </span>
                      </div>
                      <button className="text-purple-400 hover:text-purple-300 transition-colors">
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-12 p-6 rounded-2xl mt-6">
            <div className="mb-8">
              <h2 className="text-2xl font-inter-bold text-purple-100 mb-3">
                Experience Travel Like Never Before 🚀
              </h2>
              <p className="text-purple-300 font-inter-regular max-w-2xl">
                Immerse yourself in destinations with our cutting-edge AR, VR,
                and 3D technology
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link
                to="/ar-experience"
                className="bg-purple-900/40 border border-purple-700/50 rounded-xl p-6 hover:bg-purple-800/50 transition-all duration-300 group text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Eye className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-inter-semibold text-purple-100 mb-2">
                  AR Preview
                </h3>
                <p className="text-purple-300 font-inter-regular text-sm mb-4">
                  Walk through destinations in augmented reality
                </p>
                <div className="text-purple-400 group-hover:text-purple-300 transition-colors">
                  Try AR Experience →
                </div>
              </Link>

              <Link
                to="/3d-models"
                className="bg-blue-900/40 border border-blue-700/50 rounded-xl p-6 hover:bg-blue-800/50 transition-all duration-300 group text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Box className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-inter-semibold text-purple-100 mb-2">
                  3D Models
                </h3>
                <p className="text-purple-300 font-inter-regular text-sm mb-4">
                  Explore detailed 3D reconstructions of landmarks
                </p>
                <div className="text-blue-400 group-hover:text-blue-300 transition-colors">
                  View 3D Gallery →
                </div>
              </Link>

              <Link
                to="/vr-tours"
                className="bg-pink-900/40 border border-pink-700/50 rounded-xl p-6 hover:bg-pink-800/50 transition-all duration-300 group text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <MonitorSpeaker className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-inter-semibold text-purple-100 mb-2">
                  VR Tours
                </h3>
                <p className="text-purple-300 font-inter-regular text-sm mb-4">
                  Immersive virtual reality travel experiences
                </p>
                <div className="text-pink-400 group-hover:text-pink-300 transition-colors">
                  Start VR Tour →
                </div>
              </Link>
            </div>
          </div>

          {/* Bottom Action Bar */}
          <div className="mt-12 p-6 bg-gradient-to-r from-purple-950/50 via-purple-900/30 to-purple-950/50 border border-purple-800/30 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-inter-semibold text-purple-100 mb-2">
                  Ready for your next adventure?
                </h3>
                <p className="text-purple-300 font-inter-regular">
                  Let our AI plan the perfect trip for you
                </p>
              </div>
              <div className="flex gap-4">
                <Link
                  to="/voice-companion"
                  className="px-6 py-3 border border-purple-700 text-purple-100 rounded-lg font-inter-medium hover:bg-purple-950/50 transition-colors flex items-center"
                >
                  <Mic className="h-4 w-4 mr-2" />
                  Voice Plan
                </Link>
                <Link
                  to="/explore"
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg font-inter-medium hover:from-purple-500 hover:to-purple-600 transition-all duration-200 flex items-center"
                >
                  <Compass className="h-4 w-4 mr-2" />
                  Explore Now
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </Wrapper>
    </div>
  );
};

export default Dashboard;
