import { useEffect, useState } from "react";
import { useTripStore } from "@/stores/useTripStore";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CalendarDays,
  Clock,
  MapPin,
  Users,
  DollarSign,
  Phone,
  Loader2,
  Plus,
  Eye,
  Share2,
  Plane,
} from "lucide-react";
import { format } from "date-fns";
import { Wrapper } from "@/components/global/wrapper";
import { Container } from "@/components/global/container";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const Trips = () => {
  const { trips, loading, error, fetchTrips, createCall } = useTripStore();
  const [creatingCall, setCreatingCall] = useState(false);

  useEffect(() => {
    fetchTrips();
  }, [fetchTrips]);

  const handleCreateCall = async () => {
    setCreatingCall(true);
    try {
      await createCall();
    } catch (error) {
      console.error("Failed to create call:", error);
    } finally {
      setCreatingCall(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      queued: {
        variant: "secondary",
        label: "Queued",
        className: "bg-warning/10 text-warning border-warning/20",
      },
      ringing: {
        variant: "default",
        label: "Ringing",
        className: "bg-primary/10 text-primary border-primary/20 animate-pulse",
      },
      "in-progress": {
        variant: "default",
        label: "In Progress",
        className: "bg-success/10 text-success border-success/20",
      },
      ended: {
        variant: "default",
        label: "Completed",
        className: "bg-primary/10 text-primary border-primary/20",
      },
      failed: {
        variant: "destructive",
        label: "Failed",
        className: "bg-destructive/10 text-destructive border-destructive/20",
      },
    };

    const config = statusConfig[status] || statusConfig.queued;
    return (
      <Badge variant={config.variant} className={config.className}>
        {config.label}
      </Badge>
    );
  };

  const formatDuration = (seconds) => {
    if (!seconds) return "N/A";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return format(new Date(dateString), "MMM dd, yyyy 'at' HH:mm");
  };

  const handleShareTrip = async (tripId, tripName) => {
    const shareUrl = `${window.location.origin}/share/${tripId}`;
    const shareData = {
      title: tripName || 'Check out my trip!',
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

  if (loading && trips.length === 0) {
    return (
      <div className="min-h-screen w-full bg-background">
        <Wrapper className="pt-6">
          <Container>
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="flex items-center space-x-2">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
                <span className="text-foreground font-inter-medium">
                  Loading your trips...
                </span>
              </div>
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
            <div className="flex items-center gap-3">
              <div>
                <h1 className="text-4xl font-inter-bold text-foreground">
                  My Trips
                </h1>
                <p className="text-muted-foreground font-inter-regular mt-1">
                  Track and manage your travel planning conversations
                </p>
              </div>
            </div>

            <Button
              onClick={handleCreateCall}
              disabled={creatingCall}
              className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 font-inter-medium"
            >
              {creatingCall ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating Call...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-2" />
                  New Trip Call
                </>
              )}
            </Button>
          </div>

          {/* Error State */}
          {error && (
            <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-6 mb-8">
              <p className="text-destructive font-inter-regular">{error}</p>
            </div>
          )}

          {/* Trips Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
                  <Phone className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-inter-bold text-foreground">
                    {trips.length}
                  </p>
                  <p className="text-sm text-muted-foreground font-inter-regular">
                    Total Calls
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-success/20 rounded-lg flex items-center justify-center">
                  <Clock className="h-5 w-5 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-inter-bold text-foreground">
                    {trips.filter((trip) => trip.callStatus === "ended").length}
                  </p>
                  <p className="text-sm text-muted-foreground font-inter-regular">
                    Completed
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-inter-bold text-foreground">
                    {
                      trips.filter((trip) => trip.tripDetails?.destination)
                        .length
                    }
                  </p>
                  <p className="text-sm text-muted-foreground font-inter-regular">
                    With Destinations
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-warning/20 rounded-lg flex items-center justify-center">
                  <Clock className="h-5 w-5 text-warning" />
                </div>
                <div>
                  <p className="text-2xl font-inter-bold text-foreground">
                    {Math.round(
                      trips.reduce(
                        (acc, trip) => acc + (trip.callDuration || 0),
                        0
                      ) / 60
                    )}
                    m
                  </p>
                  <p className="text-sm text-muted-foreground font-inter-regular">
                    Total Duration
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Trips Table */}
          <div className="bg-card border border-border rounded-xl">
            <div className="p-6 border-b border-border">
              <h3 className="text-xl font-inter-semibold text-foreground flex items-center gap-2">
                <Plane className="h-5 w-5 text-accent" />
                Recent Trips
              </h3>
              <p className="text-muted-foreground font-inter-regular mt-1">
                Your travel planning conversations and extracted trip details
              </p>
            </div>

            <div className="p-6">
              {trips.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-accent/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Phone className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="text-lg font-inter-semibold text-foreground mb-2">
                    No trips yet
                  </h3>
                  <p className="text-muted-foreground font-inter-regular mb-6">
                    Start a new trip planning call to see your conversations
                    here
                  </p>
                  <Button
                    onClick={handleCreateCall}
                    disabled={creatingCall}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 font-inter-medium"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Create Your First Trip Call
                  </Button>
                </div>
              ) : (
                <div className="rounded-lg border border-border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-border hover:bg-accent/5 transition-colors">
                        <TableHead className="text-foreground font-inter-medium">
                          Destination
                        </TableHead>
                        <TableHead className="text-foreground font-inter-medium">
                          Status
                        </TableHead>
                        <TableHead className="text-foreground font-inter-medium">
                          Duration
                        </TableHead>
                        <TableHead className="text-foreground font-inter-medium">
                          Travelers
                        </TableHead>
                        <TableHead className="text-foreground font-inter-medium">
                          Budget
                        </TableHead>
                        <TableHead className="text-foreground font-inter-medium">
                          Created
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {trips.map((trip) => (
                        <TableRow
                          key={trip._id}
                          className="border-border hover:bg-accent/5 transition-colors cursor-pointer"
                        >
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center">
                                <MapPin className="h-4 w-4 text-accent" />
                              </div>
                              <div>
                                <p className="font-inter-medium text-foreground">
                                  {trip.tripDetails?.destination ||
                                    "Not specified"}
                                </p>
                                {trip.tripDetails?.startDate && (
                                  <p className="text-xs text-muted-foreground font-inter-regular">
                                    {format(
                                      new Date(trip.tripDetails.startDate),
                                      "MMM dd, yyyy"
                                    )}
                                  </p>
                                )}
                              </div>
                            </div>
                          </TableCell>

                          <TableCell>
                            {getStatusBadge(trip.callStatus)}
                          </TableCell>

                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-accent" />
                              <span className="text-sm text-foreground font-inter-regular">
                                {formatDuration(trip.callDuration)}
                              </span>
                            </div>
                          </TableCell>

                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4 text-accent" />
                              <span className="text-sm text-foreground font-inter-regular">
                                {trip.tripDetails?.travelers || "N/A"}
                              </span>
                            </div>
                          </TableCell>

                          <TableCell>
                            <div className="flex items-center gap-2">
                              <DollarSign className="h-4 w-4 text-accent" />
                              <span className="text-sm text-foreground font-inter-regular">
                                {trip.tripDetails?.budget || "N/A"}
                              </span>
                            </div>
                          </TableCell>

                          <TableCell>
                            <span className="text-sm text-foreground font-inter-regular">
                              {formatDate(trip.createdAt)}
                            </span>
                          </TableCell>

                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Link
                                to={`/my-trips/${trip._id}`}
                                className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary text-primary-foreground text-xs font-inter-medium rounded-lg transition-all duration-200 hover:bg-primary/90 hover:scale-105"
                              >
                                <Eye className="h-3 w-3" />
                                View Details
                              </Link>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleShareTrip(trip._id, trip.name)}
                                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-inter-medium border-border hover:bg-muted"
                              >
                                <Share2 className="h-3 w-3" />
                                Share
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
          </div>
        </Container>
      </Wrapper>
    </div>
  );
};

export default Trips;
