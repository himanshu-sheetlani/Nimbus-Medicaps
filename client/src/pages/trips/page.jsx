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
  Plane,
} from "lucide-react";
import { format } from "date-fns";
import { Wrapper } from "@/components/global/wrapper";
import { Container } from "@/components/global/container";
import { Link } from "react-router-dom";

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
        className: "bg-yellow-900/50 text-yellow-300 border-yellow-700/50",
      },
      ringing: {
        variant: "default",
        label: "Ringing",
        className:
          "bg-blue-900/50 text-blue-300 border-blue-700/50 animate-pulse",
      },
      "in-progress": {
        variant: "default",
        label: "In Progress",
        className: "bg-green-900/50 text-green-300 border-green-700/50",
      },
      ended: {
        variant: "default",
        label: "Completed",
        className: "bg-purple-900/50 text-purple-300 border-purple-700/50",
      },
      failed: {
        variant: "destructive",
        label: "Failed",
        className: "bg-red-900/50 text-red-300 border-red-700/50",
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

  if (loading && trips.length === 0) {
    return (
      <div className="min-h-screen w-full">
        <Wrapper className="pt-6">
          <Container>
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="flex items-center space-x-2">
                <Loader2 className="h-6 w-6 animate-spin text-purple-400" />
                <span className="text-purple-100 font-inter-medium">
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
    <div className="min-h-screen w-full">
      <Wrapper className="pt-6">
        <Container>
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div>
                <h1 className="text-4xl font-inter-bold text-purple-100">
                  My Trips
                </h1>
                <p className="text-purple-300 font-inter-regular mt-1">
                  Track and manage your travel planning conversations
                </p>
              </div>
            </div>

            <Button
              onClick={handleCreateCall}
              disabled={creatingCall}
              className="bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-500 hover:to-purple-600 transition-all duration-200 font-inter-medium"
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
            <div className="bg-red-900/20 border border-red-700/30 rounded-xl p-6 mb-8">
              <p className="text-red-300 font-inter-regular">{error}</p>
            </div>
          )}

          {/* Trips Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-zinc-700/30 border border-zinc-400/30 rounded-xl p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-900/50 rounded-lg flex items-center justify-center">
                  <Phone className="h-5 w-5 text-blue-300" />
                </div>
                <div>
                  <p className="text-2xl font-inter-bold text-purple-100">
                    {trips.length}
                  </p>
                  <p className="text-sm text-purple-300 font-inter-regular">
                    Total Calls
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-zinc-700/30 border border-zinc-400/30 rounded-xl p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-900/50 rounded-lg flex items-center justify-center">
                  <Clock className="h-5 w-5 text-green-300" />
                </div>
                <div>
                  <p className="text-2xl font-inter-bold text-purple-100">
                    {trips.filter((trip) => trip.callStatus === "ended").length}
                  </p>
                  <p className="text-sm text-purple-300 font-inter-regular">
                    Completed
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-zinc-700/30 border border-zinc-400/30 rounded-xl p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-900/50 rounded-lg flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-purple-300" />
                </div>
                <div>
                  <p className="text-2xl font-inter-bold text-purple-100">
                    {
                      trips.filter((trip) => trip.tripDetails?.destination)
                        .length
                    }
                  </p>
                  <p className="text-sm text-purple-300 font-inter-regular">
                    With Destinations
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-zinc-700/30 border border-zinc-400/30 rounded-xl p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-900/50 rounded-lg flex items-center justify-center">
                  <Clock className="h-5 w-5 text-orange-300" />
                </div>
                <div>
                  <p className="text-2xl font-inter-bold text-purple-100">
                    {Math.round(
                      trips.reduce(
                        (acc, trip) => acc + (trip.callDuration || 0),
                        0
                      ) / 60
                    )}
                    m
                  </p>
                  <p className="text-sm text-purple-300 font-inter-regular">
                    Total Duration
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Trips Table */}
          <div className="bg-zinc-700/30 border border-zinc-400/30 rounded-xl">
            <div className="p-6 border-b border-zinc-400/20">
              <h3 className="text-xl font-inter-semibold text-purple-100 flex items-center gap-2">
                <Plane className="h-5 w-5 text-purple-400" />
                Recent Trips
              </h3>
              <p className="text-purple-300 font-inter-regular mt-1">
                Your travel planning conversations and extracted trip details
              </p>
            </div>

            <div className="p-6">
              {trips.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-purple-900/50 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Phone className="h-8 w-8 text-purple-300" />
                  </div>
                  <h3 className="text-lg font-inter-semibold text-purple-100 mb-2">
                    No trips yet
                  </h3>
                  <p className="text-purple-300 font-inter-regular mb-6">
                    Start a new trip planning call to see your conversations
                    here
                  </p>
                  <Button
                    onClick={handleCreateCall}
                    disabled={creatingCall}
                    className="bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-500 hover:to-purple-600 transition-all duration-200 font-inter-medium"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Create Your First Trip Call
                  </Button>
                </div>
              ) : (
                <div className="rounded-lg border border-zinc-400/20 overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-zinc-400/20 hover:bg-purple-950/20 transition-colors">
                        <TableHead className="text-purple-200 font-inter-medium">
                          Destination
                        </TableHead>
                        <TableHead className="text-purple-200 font-inter-medium">
                          Status
                        </TableHead>
                        <TableHead className="text-purple-200 font-inter-medium">
                          Duration
                        </TableHead>
                        <TableHead className="text-purple-200 font-inter-medium">
                          Travelers
                        </TableHead>
                        <TableHead className="text-purple-200 font-inter-medium">
                          Budget
                        </TableHead>
                        <TableHead className="text-purple-200 font-inter-medium">
                          Created
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {trips.map((trip) => (
                        <TableRow
                          key={trip._id}
                          className="border-zinc-400/20 hover:bg-purple-950/20 transition-colors cursor-pointer "
                        >
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-purple-900/50 rounded-lg flex items-center justify-center">
                                <MapPin className="h-4 w-4 text-purple-300" />
                              </div>
                              <div>
                                <p className="font-inter-medium text-purple-100">
                                  {trip.tripDetails?.destination ||
                                    "Not specified"}
                                </p>
                                {trip.tripDetails?.startDate && (
                                  <p className="text-xs text-purple-400 font-inter-regular">
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
                              <Clock className="h-4 w-4 text-purple-400" />
                              <span className="text-sm text-purple-200 font-inter-regular">
                                {formatDuration(trip.callDuration)}
                              </span>
                            </div>
                          </TableCell>

                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4 text-purple-400" />
                              <span className="text-sm text-purple-200 font-inter-regular">
                                {trip.tripDetails?.travelers || "N/A"}
                              </span>
                            </div>
                          </TableCell>

                          <TableCell>
                            <div className="flex items-center gap-2">
                              <DollarSign className="h-4 w-4 text-purple-400" />
                              <span className="text-sm text-purple-200 font-inter-regular">
                                {trip.tripDetails?.budget || "N/A"}
                              </span>
                            </div>
                          </TableCell>

                          <TableCell>
                            <span className="text-sm text-purple-200 font-inter-regular">
                              {formatDate(trip.createdAt)}
                            </span>
                          </TableCell>

                           <TableCell>
                            <div className="flex items-center gap-2">
                              <Link
                                to={`/my-trips/${trip._id}`}
                                className="inline-flex items-center gap-1 px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white text-xs font-inter-medium rounded-lg transition-all duration-200 hover:scale-105"
                              >
                                <Eye className="h-3 w-3" />
                                View Details
                              </Link>
                              
                              
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
