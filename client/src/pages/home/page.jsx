import { Wrapper } from "@/components/global/wrapper";
import { Container } from "@/components/global/container";
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
  Loader2,
  RefreshCw,
  Sparkles,
  MapPin as LocationIcon,
  IndianRupee,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useRecommendationStore } from "@/stores/useRecommendationStore";
import { useTheme } from "@/contexts/ThemeContext";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const {
    recommendations,
    loading: recommendationsLoading,
    error: recommendationsError,
    getRecommendations,
  } = useRecommendationStore();

  useEffect(() => {
    getRecommendations();
  }, [getRecommendations]);

  const recentTrips = [
    {
      id: 1,
      destination: "Shimla, Himachal Pradesh",
      date: "Dec 15-22, 2024",
      planType: "family",
      image: "/api/placeholder/300/200",
      arViewed: true,
      hasAR: true,
      has3D: true,
      hasVR: false,
      budget: "₹65,000",
      participants: 4,
    },
    {
      id: 2,
      destination: "Goa, India",
      date: "Nov 8-15, 2024",
      planType: "solo",
      image: "/api/placeholder/300/200",
      rating: 5,
      hasAR: true,
      has3D: true,
      hasVR: true,
      budget: "₹55,000",
      participants: 1,
    },
    {
      id: 3,
      destination: "Jaipur, Rajasthan",
      date: "Oct 20-25, 2024",
      planType: "couple",
      image: "/api/placeholder/300/200",
      rating: 4,
      hasAR: true,
      has3D: false,
      hasVR: true,
      budget: "₹48,000",
      participants: 2,
    },
    {
      id: 4,
      destination: "Munnar, Kerala",
      date: "Sep 12-18, 2024",
      planType: "friends",
      image: "/api/placeholder/300/200",
      rating: 5,
      hasAR: true,
      has3D: true,
      hasVR: false,
      budget: "₹72,000",
      participants: 5,
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

  const handleRefreshRecommendations = () => {
    getRecommendations();
  };

  const renderAISuggestions = () => {
    if (recommendationsLoading) {
      return (
        <div className="space-y-4 mb-8">
          {[1, 2, 3].map((index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-xl p-4 animate-pulse"
            >
              <div className="w-full h-32 bg-accent/20 rounded-lg mb-4"></div>
              <div className="h-4 bg-accent/30 rounded mb-2"></div>
              <div className="h-3 bg-muted rounded mb-3 w-3/4"></div>
              <div className="flex items-center justify-between">
                <div className="h-3 bg-success/30 rounded w-20"></div>
                <div className="h-4 bg-accent/30 rounded w-4"></div>
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (recommendationsError) {
      return (
        <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-6 text-center mb-8">
          <div className="text-destructive mb-2">⚠️</div>
          <h3 className="text-destructive font-inter-semibold mb-2">
            Unable to load recommendations
          </h3>
          <p className="text-destructive/80 text-sm mb-4">
            {recommendationsError}
          </p>
          <button
            onClick={handleRefreshRecommendations}
            className="px-4 py-2 bg-destructive/10 border border-destructive/30 text-destructive rounded-lg text-sm hover:bg-destructive/20 transition-colors flex items-center gap-2 mx-auto"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </button>
        </div>
      );
    }

    if (!recommendations || recommendations.length === 0) {
      return (
        <div className="bg-accent/10 border border-accent/30 rounded-xl p-6 text-center mb-8">
          <Sparkles className="h-8 w-8 text-accent mx-auto mb-3" />
          <h3 className="text-foreground font-inter-semibold mb-2">
            No recommendations yet
          </h3>
          <p className="text-muted-foreground text-sm mb-4">
            Complete your profile to get personalized travel suggestions
          </p>
          <Link
            to="/profile"
            className="px-4 py-2 bg-accent/10 border border-accent/30 text-accent rounded-lg text-sm hover:bg-accent/20 transition-colors inline-flex items-center gap-2"
          >
            <Settings className="h-4 w-4" />
            Complete Profile
          </Link>
        </div>
      );
    }

    return (
      <div className="space-y-4 mb-8">
        {recommendations.slice(0, 3).map((recommendation, index) => (
          <div
            key={recommendation.id || index}
            className="bg-card border border-border rounded-xl p-4 hover:bg-accent/10 transition-colors cursor-pointer group"
          >
            {/* Recommendation Image Placeholder */}
            <div className="w-full h-32 bg-linear-to-br from-accent/20 to-accent/30 rounded-lg mb-4 overflow-hidden flex items-center justify-center">
              <div className="text-center">
                <LocationIcon className="h-8 w-8 text-accent mx-auto mb-2" />
                <span className="text-accent text-sm font-inter-medium">
                  {recommendation.placeName}
                </span>
              </div>
            </div>

            {/* Recommendation Details */}
            <h3 className="text-lg font-inter-semibold text-foreground mb-2">
              {recommendation.placeName}
            </h3>
            <p className="text-muted-foreground font-inter-regular text-sm mb-3 line-clamp-2">
              {recommendation.description}
            </p>

            {/* Key Info */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-3 w-3 text-accent" />
                <span className="text-muted-foreground text-xs">
                  Best time: {recommendation.bestTimeToVisit}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-3 w-3 text-accent" />
                <span className="text-muted-foreground text-xs">
                  Duration: {recommendation.travelDuration}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <IndianRupee className="h-3 w-3 text-accent" />
                <span className="text-muted-foreground text-xs">
                  Budget: {recommendation.estimatedBudget}
                </span>
              </div>
            </div>

            {/* Match Reasoning */}
            {recommendation.fitReasoning &&
              recommendation.fitReasoning.length > 0 && (
                <div className="mb-4">
                  <div className="flex items-center gap-1 mb-2">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span className="text-success font-inter-medium text-xs">
                      Perfect match
                    </span>
                  </div>
                  <ul className="space-y-1">
                    {recommendation.fitReasoning
                      .slice(0, 2)
                      .map((reason, idx) => (
                        <li
                          key={idx}
                          className="text-muted-foreground text-xs flex items-start gap-2"
                        >
                          <span className="text-muted mt-1">•</span>
                          <span className="line-clamp-1">{reason}</span>
                        </li>
                      ))}
                  </ul>
                </div>
              )}

            {/* Action Button */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="h-3 w-3 text-warning" />
                <span className="text-warning font-inter-medium text-xs">
                  AI Recommended
                </span>
              </div>
              <button className="text-accent hover:text-accent/80 transition-colors">
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen w-full bg-background">
      <Wrapper className="pt-6">
        <Container>
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-inter-bold text-foreground mb-2">
                Welcome back! 👋
              </h1>
              <p className="text-muted-foreground font-inter-regular">
                Ready for your next adventure?
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Link
                to="/settings"
                className="p-2 bg-card border border-border rounded-lg text-foreground hover:bg-accent/10 transition-colors"
              >
                <Settings className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Trips */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-inter-semibold text-gray-900 dark:text-blue-100">
                  Recent Trips
                </h2>
                <Link
                  to="/my-trips"
                  className="text-blue-600 dark:text-blue-400 font-inter-medium text-sm hover:text-blue-700 dark:hover:text-blue-300 transition-colors flex items-center"
                >
                  View All <ChevronRight className="h-3 w-3 ml-1" />
                </Link>
              </div>

              <div className="space-y-4">
                {recentTrips.map((trip) => (
                  <div
                    key={trip.id}
                    className="bg-white dark:bg-zinc-700/30 border border-gray-200 dark:border-zinc-400/30 rounded-xl p-4 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors group "
                  >
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center overflow-hidden">
                        <MapPin className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                      </div>

                      <div className="flex-1 b0">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-md font-inter-semibold text-gray-900 dark:text-blue-100">
                            {trip.destination}
                          </h3>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-inter-medium ${
                              trip.planType === "family"
                                ? "bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300"
                                : trip.planType === "solo"
                                ? "bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300"
                                : "bg-pink-100 dark:bg-pink-900/50 text-pink-700 dark:text-pink-300"
                            }`}
                          >
                            {trip.planType}
                          </span>
                        </div>
                        <p className="text-gray-600 dark:text-blue-300 font-inter-regular text-xs mb-2">
                          {trip.date}
                        </p>
                        <div className="flex items-center gap-4 mb-3">
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3 text-blue-500 dark:text-blue-400" />
                            <span className="text-gray-600 dark:text-blue-300 text-xs">
                              {trip.participants}{" "}
                              {trip.participants === 1 ? "person" : "people"}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-blue-600 dark:text-blue-400 text-xs">
                              Budget:
                            </span>
                            <span className="text-gray-700 dark:text-blue-300 text-xs font-inter-medium">
                              {trip.budget}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg text-blue-600 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800/50 transition-colors opacity-0 group-hover:opacity-100">
                          <Share2 className="h-4 w-4" />
                        </button>
                        <button className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg text-blue-600 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800/50 transition-colors opacity-0 group-hover:opacity-100">
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                to="/my-trips"
                className="bg-white dark:bg-zinc-700/30 border border-gray-200 dark:border-zinc-400/30 rounded-xl flex flex-col items-center py-6 mt-6 cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors"
              >
                <Plus className="h-6 w-6 text-blue-600 dark:text-blue-400 mb-2" />
                <p className="text-blue-600 dark:text-blue-400 font-inter-medium text-sm hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
                  Plan New Trip
                </p>
              </Link>
            </div>

            {/* AI Suggestions Sidebar */}
            <div className="max-h-[82vh] overflow-y-scroll">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-inter-semibold text-gray-900 dark:text-blue-100">
                  AI Suggestions
                </h2>
                {!recommendationsLoading && recommendations.length > 0 && (
                  <button
                    onClick={handleRefreshRecommendations}
                    className="p-2 bg-gray-100 dark:bg-blue-950/50 border border-gray-200 dark:border-blue-800/30 rounded-lg text-gray-700 dark:text-blue-300 hover:bg-gray-200 dark:hover:bg-blue-950/70 transition-colors"
                    title="Refresh recommendations"
                  >
                    <RefreshCw className="h-4 w-4" />
                  </button>
                )}
              </div>

              {/* Render AI Suggestions */}
              {renderAISuggestions()}

              {/* View All Recommendations Link */}
              {recommendations.length > 3 && (
                <Link
                  to="/recommendations"
                  className="block w-full text-center py-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/30 rounded-xl text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-950/50 transition-colors"
                >
                  View All Recommendations ({recommendations.length})
                </Link>
              )}
            </div>
          </div>

          {/* Experience Travel Section */}
          <div className="mb-12 p-6 rounded-2xl mt-6">
            <div className="mb-8">
              <h2 className="text-2xl font-inter-bold text-gray-900 dark:text-blue-100 mb-3">
                Experience Travel Like Never Before
              </h2>
              <p className="text-gray-600 dark:text-blue-300 font-inter-regular max-w-2xl">
                Immerse yourself in destinations with our cutting-edge AR, VR,
                and 3D technology
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link
                to="/3d-models"
                className="bg-blue-50 dark:bg-blue-900/40 border border-blue-200 dark:border-blue-700/50 rounded-xl p-6 hover:bg-blue-100 dark:hover:bg-blue-800/50 transition-all duration-300 group text-center"
              >
                <div className="w-16 h-16 bg-linear-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Eye className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-inter-semibold text-gray-900 dark:text-blue-100 mb-2">
                  AR Preview
                </h3>
                <p className="text-gray-600 dark:text-blue-300 font-inter-regular text-sm mb-4">
                  Walk through destinations in augmented reality
                </p>
                <div className="text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                  Try AR Experience →
                </div>
              </Link>

              <Link
                to="/3d-models"
                className="bg-cyan-50 dark:bg-cyan-900/40 border border-cyan-200 dark:border-cyan-700/50 rounded-xl p-6 hover:bg-cyan-100 dark:hover:bg-cyan-800/50 transition-all duration-300 group text-center"
              >
                <div className="w-16 h-16 bg-linear-to-br from-cyan-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Box className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-inter-semibold text-gray-900 dark:text-blue-100 mb-2">
                  3D Models
                </h3>
                <p className="text-gray-600 dark:text-blue-300 font-inter-regular text-sm mb-4">
                  Explore detailed 3D reconstructions of landmarks
                </p>
                <div className="text-cyan-600 dark:text-cyan-400 group-hover:text-cyan-700 dark:group-hover:text-cyan-300 transition-colors">
                  View 3D Gallery →
                </div>
              </Link>

              <Link
                to="/3d-models"
                className="bg-indigo-50 dark:bg-indigo-900/40 border border-indigo-200 dark:border-indigo-700/50 rounded-xl p-6 hover:bg-indigo-100 dark:hover:bg-indigo-800/50 transition-all duration-300 group text-center"
              >
                <div className="w-16 h-16 bg-linear-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <MonitorSpeaker className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-inter-semibold text-gray-900 dark:text-blue-100 mb-2">
                  VR Tours
                </h3>
                <p className="text-gray-600 dark:text-blue-300 font-inter-regular text-sm mb-4">
                  Immersive virtual reality travel experiences
                </p>
                <div className="text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors">
                  Start VR Tour →
                </div>
              </Link>
            </div>
          </div>

          {/* Bottom Action Bar */}
          <div className="mt-12 p-6 bg-linear-to-r from-blue-50 via-blue-100 to-blue-50 dark:from-blue-950/50 dark:via-blue-900/30 dark:to-blue-950/50 border border-blue-200 dark:border-blue-800/30 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-inter-semibold text-gray-900 dark:text-blue-100 mb-2">
                  Ready for your next adventure?
                </h3>
                <p className="text-gray-600 dark:text-blue-300 font-inter-regular">
                  Let our AI plan the perfect trip for you
                </p>
              </div>
              <div className="flex gap-4">
                <Link
                  to="/my-trips"
                  className="px-6 py-3 border border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-100 rounded-lg font-inter-medium hover:bg-blue-100 dark:hover:bg-blue-950/50 transition-colors flex items-center"
                >
                  <Mic className="h-4 w-4 mr-2" />
                  Voice Plan
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
