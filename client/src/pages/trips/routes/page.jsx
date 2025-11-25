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
        className: "bg-warning/10 text-warning border-warning/20",
        label: "Queued",
      },
      ringing: {
        className: "bg-primary/10 text-primary border-primary/20 animate-pulse",
        label: "Ringing",
      },
      "in-progress": {
        className: "bg-success/10 text-success border-success/20",
        label: "In Progress",
      },
      ended: {
        className: "bg-primary/10 text-primary border-primary/20",
        label: "Completed",
      },
      failed: {
        className: "bg-destructive/10 text-destructive border-destructive/20",
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

  const handleShareTrip = async () => {
    const shareUrl = `${window.location.origin}/share/${tripId}`;
    const shareData = {
      title: trip?.name || 'Check out my trip!',
      text: `I planned an amazing trip using AI. Check it out!`,
      url: shareUrl,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        toast.success("Trip shared successfully!");
      } catch (error) {
        if (error.name !== 'AbortError') {
          // Fallback to copying URL
          await navigator.clipboard.writeText(shareUrl);
          toast.success("Share link copied to clipboard!");
        }
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      try {
        await navigator.clipboard.writeText(shareUrl);
        toast.success("Share link copied to clipboard!");
      } catch (error) {
        toast.error("Failed to copy share link");
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-background">
        <Wrapper className="pt-6">
          <Container>
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="flex items-center space-x-2">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
                <span className="text-foreground font-inter-medium">
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
      <div className="min-h-screen w-full bg-background">
        <Wrapper className="pt-6">
          <Container>
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-destructive/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8 text-destructive" />
              </div>
              <h3 className="text-lg font-inter-semibold text-foreground mb-2">
                Trip not found
              </h3>
              <p className="text-muted-foreground font-inter-regular mb-6">
                The trip you're looking for doesn't exist or has been deleted.
              </p>
            </div>
          </Container>
        </Wrapper>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-background">
      <Wrapper className="pt-6">
        <Container>
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div>
                  <h1 className="text-3xl font-inter-bold text-foreground">
                    {trip.tripDetails?.destination || "Trip Details"}
                  </h1>
                  <div className="flex items-center gap-3 mt-1">
                    {getStatusBadge(trip.callStatus)}
                    <span className="text-muted-foreground font-inter-regular text-sm">
                      Created {formatDateTime(trip.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={handleShareTrip}
                className="border-border text-muted-foreground hover:bg-accent/10"
              >
                <Share className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button
                variant="outline"
                className="border-border text-muted-foreground hover:bg-accent/10"
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
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent/10"
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
                  <div className="bg-card border border-border rounded-xl">
                    <div className="p-6 border-b border-border">
                      <h3 className="text-xl font-inter-semibold text-foreground flex items-center gap-2">
                        <Phone className="h-5 w-5 text-accent" />
                        Call Information
                      </h3>
                    </div>
                    <div className="p-6">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div>
                          <label className="text-sm font-inter-medium text-muted-foreground mb-1 block">
                            Call Duration
                          </label>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-accent" />
                            <span className="text-lg font-inter-bold text-foreground">
                              {formatDuration(trip.callDuration)}
                            </span>
                          </div>
                        </div>

                        <div>
                          <label className="text-sm font-inter-medium text-muted-foreground mb-1 block">
                            Status
                          </label>
                          {getStatusBadge(trip.callStatus)}
                        </div>

                        <div>
                          <label className="text-sm font-inter-medium text-muted-foreground mb-1 block">
                            Call ID
                          </label>
                          <span className="text-sm font-inter-regular text-muted-foreground font-mono">
                            {trip.callId}
                          </span>
                        </div>

                        <div>
                          <label className="text-sm font-inter-medium text-muted-foreground mb-1 block">
                            Phone Number
                          </label>
                          <span className="text-sm font-inter-regular text-muted-foreground">
                            {trip.phoneNumber}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Trip Summary */}
                  {trip.tripDetails && (
                    <div className="bg-card border border-border rounded-xl">
                      <div className="p-6 border-b border-border">
                        <h3 className="text-xl font-inter-semibold text-foreground flex items-center gap-2">
                          <MapPin className="h-5 w-5 text-accent" />
                          Trip Summary
                        </h3>
                      </div>
                      <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="text-sm font-inter-medium text-muted-foreground mb-2 block">
                              <MapPin className="h-4 w-4 inline mr-1" />
                              Destination
                            </label>
                            <p className="text-foreground font-inter-medium text-lg">
                              {trip.tripDetails.destination || "Not specified"}
                            </p>
                          </div>

                          <div>
                            <label className="text-sm font-inter-medium text-muted-foreground mb-2 block">
                              <Users className="h-4 w-4 inline mr-1" />
                              Travelers
                            </label>
                            <p className="text-foreground font-inter-medium text-lg">
                              {trip.tripDetails.travelers
                                ? `${trip.tripDetails.travelers} people`
                                : "Not specified"}
                            </p>
                          </div>

                          <div>
                            <label className="text-sm font-inter-medium text-muted-foreground mb-2 block">
                              <Calendar className="h-4 w-4 inline mr-1" />
                              Travel Dates
                            </label>
                            <p className="text-foreground font-inter-medium">
                              {trip.tripDetails.startDate
                                ? formatDate(trip.tripDetails.startDate)
                                : "Not specified"}
                              {trip.tripDetails.endDate &&
                                ` - ${formatDate(trip.tripDetails.endDate)}`}
                            </p>
                          </div>

                          <div>
                            <label className="text-sm font-inter-medium text-muted-foreground mb-2 block">
                              <DollarSign className="h-4 w-4 inline mr-1" />
                              Budget
                            </label>
                            <p className="text-foreground font-inter-medium text-lg">
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
                    <div className="bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 border border-border rounded-xl">
                      <div className="p-6">
                        <h3 className="text-lg font-inter-semibold text-foreground flex items-center gap-2 mb-4">
                          <Brain className="h-5 w-5 text-accent" />
                          AI Summary
                        </h3>
                        <p className="text-muted-foreground font-inter-regular text-sm leading-relaxed">
                          {trip.aiInsights.tripSummary}
                        </p>
                        {trip.aiInsights.processedAt && (
                          <p className="text-muted-foreground text-xs font-inter-regular mt-3">
                            Generated{" "}
                            {formatDateTime(trip.aiInsights.processedAt)}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Key Points */}
                  {trip.aiInsights?.keyPoints?.length > 0 && (
                    <div className="bg-card border border-border rounded-xl">
                      <div className="p-6 border-b border-border">
                        <h3 className="text-lg font-inter-semibold text-foreground flex items-center gap-2">
                          <Star className="h-5 w-5 text-accent" />
                          Key Points
                        </h3>
                      </div>
                      <div className="p-6">
                        <ul className="space-y-2">
                          {trip.aiInsights.keyPoints.map((point, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                              <span className="text-muted-foreground font-inter-regular text-sm">
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
                <div className="bg-card border border-border rounded-xl">
                  <div className="p-6 border-b border-border">
                    <h3 className="text-xl font-inter-semibold text-foreground flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-accent" />
                      Travel Information
                    </h3>
                  </div>
                  <div className="p-6 space-y-4">
                    <div>
                      <label className="text-sm font-inter-medium text-muted-foreground mb-1 block">
                        Destination
                      </label>
                      <p className="text-foreground font-inter-regular">
                        {trip.tripDetails?.destination || "Not specified"}
                      </p>
                    </div>

                    <div>
                      <label className="text-sm font-inter-medium text-muted-foreground mb-1 block">
                        Start Date
                      </label>
                      <p className="text-foreground font-inter-regular">
                        {trip.tripDetails?.startDate
                          ? formatDate(trip.tripDetails.startDate)
                          : "Not specified"}
                      </p>
                    </div>

                    <div>
                      <label className="text-sm font-inter-medium text-muted-foreground mb-1 block">
                        End Date
                      </label>
                      <p className="text-foreground font-inter-regular">
                        {trip.tripDetails?.endDate
                          ? formatDate(trip.tripDetails.endDate)
                          : "Not specified"}
                      </p>
                    </div>

                    <div>
                      <label className="text-sm font-inter-medium text-muted-foreground mb-1 block">
                        Number of Travelers
                      </label>
                      <p className="text-foreground font-inter-regular">
                        {trip.tripDetails?.travelers
                          ? `${trip.tripDetails.travelers} people`
                          : "Not specified"}
                      </p>
                    </div>

                    <div>
                      <label className="text-sm font-inter-medium text-muted-foreground mb-1 block">
                        Budget
                      </label>
                      <p className="text-foreground font-inter-regular">
                        {trip.tripDetails?.budget || "Not specified"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Preferences */}
                  {trip.tripDetails?.preferences?.length > 0 && (
                    <div className="bg-card border border-border rounded-xl">
                      <div className="p-6 border-b border-border">
                        <h3 className="text-xl font-inter-semibold text-foreground flex items-center gap-2">
                          <Star className="h-5 w-5 text-accent" />
                          Preferences
                        </h3>
                      </div>
                      <div className="p-6">
                        <div className="flex flex-wrap gap-2">
                          {trip.tripDetails.preferences.map(
                            (preference, index) => (
                              <Badge
                                key={index}
                                className="bg-accent/20 text-accent border-accent/30"
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
                    <div className="bg-card border border-border rounded-xl">
                      <div className="p-6 border-b border-border">
                        <h3 className="text-xl font-inter-semibold text-foreground flex items-center gap-2">
                          <Activity className="h-5 w-5 text-accent" />
                          Activities
                        </h3>
                      </div>
                      <div className="p-6">
                        <div className="flex flex-wrap gap-2">
                          {trip.tripDetails.activities.map(
                            (activity, index) => (
                              <Badge
                                key={index}
                                className="bg-success/20 text-success border-success/30"
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
              <div className="bg-card border border-border rounded-xl">
                <div className="p-6 border-b border-border flex items-center justify-between">
                  <h3 className="text-xl font-inter-semibold text-foreground flex items-center gap-2">
                    <FileText className="h-5 w-5 text-accent" />
                    Call Transcript
                  </h3>
                  <Button
                    onClick={handleCopyTranscript}
                    variant="outline"
                    className="border-border text-muted-foreground hover:bg-accent/10"
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
                    <div className="bg-muted border border-border rounded-lg p-4">
                      <pre className="text-foreground font-inter-regular text-sm whitespace-pre-wrap leading-relaxed">
                        {trip.transcript}
                      </pre>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                      <p className="text-foreground font-inter-regular">
                        No transcript available
                      </p>
                      <p className="text-muted-foreground text-sm">
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
                      <div className="bg-card border border-border rounded-xl">
                        <div className="p-6 border-b border-border">
                          <h3 className="text-xl font-inter-semibold text-foreground flex items-center gap-2">
                            <Brain className="h-5 w-5 text-accent" />
                            AI Trip Summary
                          </h3>
                        </div>
                        <div className="p-6">
                          <p className="text-muted-foreground font-inter-regular leading-relaxed">
                            {trip.aiInsights.tripSummary}
                          </p>
                          {trip.aiInsights.processedAt && (
                            <p className="text-muted-foreground text-sm font-inter-regular mt-4">
                              Generated on{" "}
                              {formatDateTime(trip.aiInsights.processedAt)}
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Key Points */}
                    {trip.aiInsights.keyPoints?.length > 0 && (
                      <div className="bg-card border border-border rounded-xl">
                        <div className="p-6 border-b border-border">
                          <h3 className="text-xl font-inter-semibold text-foreground flex items-center gap-2">
                            <Star className="h-5 w-5 text-accent" />
                            Key Insights
                          </h3>
                        </div>
                        <div className="p-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {trip.aiInsights.keyPoints.map((point, index) => (
                              <div
                                key={index}
                                className="flex items-start gap-3 p-4 bg-accent/10 rounded-lg border border-accent/20"
                              >
                                <CheckCircle className="h-5 w-5 text-success mt-0.5 shrink-0" />
                                <span className="text-muted-foreground font-inter-regular text-sm">
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
                  <div className="bg-card border border-border rounded-xl">
                    <div className="p-12 text-center">
                      <Brain className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-inter-semibold text-foreground mb-2">
                        AI insights not available
                      </h3>
                      <p className="text-muted-foreground font-inter-regular">
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
