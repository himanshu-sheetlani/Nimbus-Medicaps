import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTripStore } from "@/stores/useTripStore";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Users,
  DollarSign,
  Clock,
  Phone,
  FileText,
  Brain,
  Star,
  Activity,
  Loader2,
  Download,
  Share,
  Edit,
  Copy,
  CheckCircle,
} from "lucide-react";
import { format } from "date-fns";
import { Wrapper } from "@/components/global/wrapper";
import { Container } from "@/components/global/container";
import { toast } from "sonner";

const TripDetail = () => {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const { getTripById, loading, error, trip } = useTripStore();
  const [activeTab, setActiveTab] = useState("overview");
  const [copiedTranscript, setCopiedTranscript] = useState(false);

  useEffect(() => {
    const fetchTripDetail = async () => {
      try {
        const tripData = await getTripById(tripId);
      } catch (error) {
        console.error("Failed to fetch trip details:", error);
        toast.error("Failed to load trip details");
      }
    };

    if (tripId) {
      fetchTripDetail();
    }
  }, [tripId, getTripById]);

  const getStatusBadge = (status) => {
    const statusConfig = {
      queued: {
        className: "bg-yellow-900/50 text-yellow-300 border-yellow-700/50",
        label: "Queued",
      },
      ringing: {
        className:
          "bg-blue-900/50 text-blue-300 border-blue-700/50 animate-pulse",
        label: "Ringing",
      },
      "in-progress": {
        className: "bg-green-900/50 text-green-300 border-green-700/50",
        label: "In Progress",
      },
      ended: {
        className: "bg-purple-900/50 text-purple-300 border-purple-700/50",
        label: "Completed",
      },
      failed: {
        className: "bg-red-900/50 text-red-300 border-red-700/50",
        label: "Failed",
      },
    };

    const config = statusConfig[status] || statusConfig.queued;
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const formatDuration = (seconds) => {
    if (!seconds) return "0:00";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Not specified";
    return format(new Date(dateString), "MMMM dd, yyyy");
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return "N/A";
    return format(new Date(dateString), "MMM dd, yyyy 'at' HH:mm");
  };

  const handleCopyTranscript = async () => {
    if (trip?.transcript) {
      try {
        await navigator.clipboard.writeText(trip.transcript);
        setCopiedTranscript(true);
        toast.success("Transcript copied to clipboard!");
        setTimeout(() => setCopiedTranscript(false), 2000);
      } catch (error) {
        toast.error("Failed to copy transcript");
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full">
        <Wrapper className="pt-6">
          <Container>
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="flex items-center space-x-2">
                <Loader2 className="h-6 w-6 animate-spin text-purple-400" />
                <span className="text-purple-100 font-inter-medium">
                  Loading trip details...
                </span>
              </div>
            </div>
          </Container>
        </Wrapper>
      </div>
    );
  }

  if (error || !trip) {
    return (
      <div className="min-h-screen w-full">
        <Wrapper className="pt-6">
          <Container>
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-red-900/50 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8 text-red-300" />
              </div>
              <h3 className="text-lg font-inter-semibold text-purple-100 mb-2">
                Trip not found
              </h3>
              <p className="text-purple-300 font-inter-regular mb-6">
                The trip you're looking for doesn't exist or has been deleted.
              </p>
              <Button
                onClick={() => navigate("/trips")}
                className="bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-500 hover:to-purple-600 transition-all duration-200 font-inter-medium"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Trips
              </Button>
            </div>
          </Container>
        </Wrapper>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full">
      <Wrapper className="pt-6">
        <Container>
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Button
                onClick={() => navigate("/trips")}
                variant="outline"
                className="border-purple-700/50 text-purple-300 hover:bg-purple-950/50"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Trips
              </Button>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-inter-bold text-purple-100">
                    {trip.tripDetails?.destination || "Trip Details"}
                  </h1>
                  <div className="flex items-center gap-3 mt-1">
                    {getStatusBadge(trip.callStatus)}
                    <span className="text-purple-300 font-inter-regular text-sm">
                      Created {formatDateTime(trip.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                className="border-purple-700/50 text-purple-300 hover:bg-purple-950/50"
              >
                <Share className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button
                variant="outline"
                className="border-purple-700/50 text-purple-300 hover:bg-purple-950/50"
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex space-x-1 mb-8">
            {[
              { id: "overview", label: "Overview", icon: Star },
              { id: "details", label: "Trip Details", icon: MapPin },
              { id: "transcript", label: "Conversation", icon: FileText },
              { id: "insights", label: "AI Insights", icon: Brain },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-inter-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-purple-600 text-white"
                    : "text-purple-300 hover:bg-purple-950/30"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="space-y-6">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Call Information */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Call Stats */}
                  <div className="bg-zinc-700/30 border border-zinc-400/30 rounded-xl">
                    <div className="p-6 border-b border-zinc-400/20">
                      <h3 className="text-xl font-inter-semibold text-purple-100 flex items-center gap-2">
                        <Phone className="h-5 w-5 text-purple-400" />
                        Call Information
                      </h3>
                    </div>
                    <div className="p-6">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div>
                          <label className="text-sm font-inter-medium text-purple-200 mb-1 block">
                            Call Duration
                          </label>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-purple-400" />
                            <span className="text-lg font-inter-bold text-purple-100">
                              {formatDuration(trip.callDuration)}
                            </span>
                          </div>
                        </div>

                        <div>
                          <label className="text-sm font-inter-medium text-purple-200 mb-1 block">
                            Status
                          </label>
                          {getStatusBadge(trip.callStatus)}
                        </div>

                        <div>
                          <label className="text-sm font-inter-medium text-purple-200 mb-1 block">
                            Call ID
                          </label>
                          <span className="text-sm font-inter-regular text-purple-300 font-mono">
                            {trip.callId}
                          </span>
                        </div>

                        <div>
                          <label className="text-sm font-inter-medium text-purple-200 mb-1 block">
                            Phone Number
                          </label>
                          <span className="text-sm font-inter-regular text-purple-300">
                            {trip.phoneNumber}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Trip Summary */}
                  {trip.tripDetails && (
                    <div className="bg-zinc-700/30 border border-zinc-400/30 rounded-xl">
                      <div className="p-6 border-b border-zinc-400/20">
                        <h3 className="text-xl font-inter-semibold text-purple-100 flex items-center gap-2">
                          <MapPin className="h-5 w-5 text-purple-400" />
                          Trip Summary
                        </h3>
                      </div>
                      <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="text-sm font-inter-medium text-purple-200 mb-2 block">
                              <MapPin className="h-4 w-4 inline mr-1" />
                              Destination
                            </label>
                            <p className="text-purple-100 font-inter-medium text-lg">
                              {trip.tripDetails.destination || "Not specified"}
                            </p>
                          </div>

                          <div>
                            <label className="text-sm font-inter-medium text-purple-200 mb-2 block">
                              <Users className="h-4 w-4 inline mr-1" />
                              Travelers
                            </label>
                            <p className="text-purple-100 font-inter-medium text-lg">
                              {trip.tripDetails.travelers
                                ? `${trip.tripDetails.travelers} people`
                                : "Not specified"}
                            </p>
                          </div>

                          <div>
                            <label className="text-sm font-inter-medium text-purple-200 mb-2 block">
                              <Calendar className="h-4 w-4 inline mr-1" />
                              Travel Dates
                            </label>
                            <p className="text-purple-100 font-inter-medium">
                              {trip.tripDetails.startDate
                                ? formatDate(trip.tripDetails.startDate)
                                : "Not specified"}
                              {trip.tripDetails.endDate &&
                                ` - ${formatDate(trip.tripDetails.endDate)}`}
                            </p>
                          </div>

                          <div>
                            <label className="text-sm font-inter-medium text-purple-200 mb-2 block">
                              <DollarSign className="h-4 w-4 inline mr-1" />
                              Budget
                            </label>
                            <p className="text-purple-100 font-inter-medium text-lg">
                              {trip.tripDetails.budget || "Not specified"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* AI Summary */}
                  {trip.aiInsights?.tripSummary && (
                    <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-purple-700/50 rounded-xl">
                      <div className="p-6">
                        <h3 className="text-lg font-inter-semibold text-purple-100 flex items-center gap-2 mb-4">
                          <Brain className="h-5 w-5 text-purple-400" />
                          AI Summary
                        </h3>
                        <p className="text-purple-200 font-inter-regular text-sm leading-relaxed">
                          {trip.aiInsights.tripSummary}
                        </p>
                        {trip.aiInsights.processedAt && (
                          <p className="text-purple-400 text-xs font-inter-regular mt-3">
                            Generated{" "}
                            {formatDateTime(trip.aiInsights.processedAt)}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Key Points */}
                  {trip.aiInsights?.keyPoints?.length > 0 && (
                    <div className="bg-zinc-700/30 border border-zinc-400/30 rounded-xl">
                      <div className="p-6 border-b border-zinc-400/20">
                        <h3 className="text-lg font-inter-semibold text-purple-100 flex items-center gap-2">
                          <Star className="h-5 w-5 text-purple-400" />
                          Key Points
                        </h3>
                      </div>
                      <div className="p-6">
                        <ul className="space-y-2">
                          {trip.aiInsights.keyPoints.map((point, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                              <span className="text-purple-200 font-inter-regular text-sm">
                                {point}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Trip Details Tab */}
            {activeTab === "details" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-zinc-700/30 border border-zinc-400/30 rounded-xl">
                  <div className="p-6 border-b border-zinc-400/20">
                    <h3 className="text-xl font-inter-semibold text-purple-100 flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-purple-400" />
                      Travel Information
                    </h3>
                  </div>
                  <div className="p-6 space-y-4">
                    <div>
                      <label className="text-sm font-inter-medium text-purple-200 mb-1 block">
                        Destination
                      </label>
                      <p className="text-purple-100 font-inter-regular">
                        {trip.tripDetails?.destination || "Not specified"}
                      </p>
                    </div>

                    <div>
                      <label className="text-sm font-inter-medium text-purple-200 mb-1 block">
                        Start Date
                      </label>
                      <p className="text-purple-100 font-inter-regular">
                        {trip.tripDetails?.startDate
                          ? formatDate(trip.tripDetails.startDate)
                          : "Not specified"}
                      </p>
                    </div>

                    <div>
                      <label className="text-sm font-inter-medium text-purple-200 mb-1 block">
                        End Date
                      </label>
                      <p className="text-purple-100 font-inter-regular">
                        {trip.tripDetails?.endDate
                          ? formatDate(trip.tripDetails.endDate)
                          : "Not specified"}
                      </p>
                    </div>

                    <div>
                      <label className="text-sm font-inter-medium text-purple-200 mb-1 block">
                        Number of Travelers
                      </label>
                      <p className="text-purple-100 font-inter-regular">
                        {trip.tripDetails?.travelers
                          ? `${trip.tripDetails.travelers} people`
                          : "Not specified"}
                      </p>
                    </div>

                    <div>
                      <label className="text-sm font-inter-medium text-purple-200 mb-1 block">
                        Budget
                      </label>
                      <p className="text-purple-100 font-inter-regular">
                        {trip.tripDetails?.budget || "Not specified"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Preferences */}
                  {trip.tripDetails?.preferences?.length > 0 && (
                    <div className="bg-zinc-700/30 border border-zinc-400/30 rounded-xl">
                      <div className="p-6 border-b border-zinc-400/20">
                        <h3 className="text-xl font-inter-semibold text-purple-100 flex items-center gap-2">
                          <Star className="h-5 w-5 text-purple-400" />
                          Preferences
                        </h3>
                      </div>
                      <div className="p-6">
                        <div className="flex flex-wrap gap-2">
                          {trip.tripDetails.preferences.map(
                            (preference, index) => (
                              <Badge
                                key={index}
                                className="bg-blue-900/50 text-blue-300 border-blue-700/50"
                              >
                                {preference}
                              </Badge>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Activities */}
                  {trip.tripDetails?.activities?.length > 0 && (
                    <div className="bg-zinc-700/30 border border-zinc-400/30 rounded-xl">
                      <div className="p-6 border-b border-zinc-400/20">
                        <h3 className="text-xl font-inter-semibold text-purple-100 flex items-center gap-2">
                          <Activity className="h-5 w-5 text-purple-400" />
                          Activities
                        </h3>
                      </div>
                      <div className="p-6">
                        <div className="flex flex-wrap gap-2">
                          {trip.tripDetails.activities.map(
                            (activity, index) => (
                              <Badge
                                key={index}
                                className="bg-green-900/50 text-green-300 border-green-700/50"
                              >
                                {activity}
                              </Badge>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Transcript Tab */}
            {activeTab === "transcript" && (
              <div className="bg-zinc-700/30 border border-zinc-400/30 rounded-xl">
                <div className="p-6 border-b border-zinc-400/20 flex items-center justify-between">
                  <h3 className="text-xl font-inter-semibold text-purple-100 flex items-center gap-2">
                    <FileText className="h-5 w-5 text-purple-400" />
                    Call Transcript
                  </h3>
                  <Button
                    onClick={handleCopyTranscript}
                    variant="outline"
                    className="border-purple-700/50 text-purple-300 hover:bg-purple-950/50"
                    disabled={!trip.transcript}
                  >
                    {copiedTranscript ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-2" />
                        Copy Transcript
                      </>
                    )}
                  </Button>
                </div>
                <div className="p-6">
                  {trip.transcript ? (
                    <div className="bg-zinc-800/50 border border-zinc-600/30 rounded-lg p-4">
                      <pre className="text-purple-200 font-inter-regular text-sm whitespace-pre-wrap leading-relaxed">
                        {trip.transcript}
                      </pre>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <FileText className="h-12 w-12 text-purple-400 mx-auto mb-3" />
                      <p className="text-purple-300 font-inter-regular">
                        No transcript available
                      </p>
                      <p className="text-purple-400 text-sm">
                        The call transcript will appear here once processed
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* AI Insights Tab */}
            {activeTab === "insights" && (
              <div className="space-y-6">
                {trip.aiInsights ? (
                  <>
                    {/* Trip Summary */}
                    {trip.aiInsights.tripSummary && (
                      <div className="bg-zinc-700/30 border border-zinc-400/30 rounded-xl">
                        <div className="p-6 border-b border-zinc-400/20">
                          <h3 className="text-xl font-inter-semibold text-purple-100 flex items-center gap-2">
                            <Brain className="h-5 w-5 text-purple-400" />
                            AI Trip Summary
                          </h3>
                        </div>
                        <div className="p-6">
                          <p className="text-purple-200 font-inter-regular leading-relaxed">
                            {trip.aiInsights.tripSummary}
                          </p>
                          {trip.aiInsights.processedAt && (
                            <p className="text-purple-400 text-sm font-inter-regular mt-4">
                              Generated on{" "}
                              {formatDateTime(trip.aiInsights.processedAt)}
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Key Points */}
                    {trip.aiInsights.keyPoints?.length > 0 && (
                      <div className="bg-zinc-700/30 border border-zinc-400/30 rounded-xl">
                        <div className="p-6 border-b border-zinc-400/20">
                          <h3 className="text-xl font-inter-semibold text-purple-100 flex items-center gap-2">
                            <Star className="h-5 w-5 text-purple-400" />
                            Key Insights
                          </h3>
                        </div>
                        <div className="p-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {trip.aiInsights.keyPoints.map((point, index) => (
                              <div
                                key={index}
                                className="flex items-start gap-3 p-4 bg-purple-950/30 rounded-lg border border-purple-800/30"
                              >
                                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                                <span className="text-purple-200 font-inter-regular text-sm">
                                  {point}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="bg-zinc-700/30 border border-zinc-400/30 rounded-xl">
                    <div className="p-12 text-center">
                      <Brain className="h-16 w-16 text-purple-400 mx-auto mb-4" />
                      <h3 className="text-lg font-inter-semibold text-purple-100 mb-2">
                        AI insights not available
                      </h3>
                      <p className="text-purple-300 font-inter-regular">
                        AI analysis will be available once the call is completed
                        and processed
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </Container>
      </Wrapper>
    </div>
  );
};

export default TripDetail;
