import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  MapPin, 
  Calendar, 
  Clock, 
  Users, 
  Share2, 
  Download, 
  Heart,
  Star,
  Camera,
  Navigation,
  Plane,
  Hotel,
  Utensils,
  Car,
  ArrowLeft,
  ExternalLink,
  Copy,
  Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import { useTripStore } from "@/stores/useTripStore";
import { toast } from "sonner";

const SharePage = () => {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const { trip, loading, getTripById } = useTripStore();
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (tripId) {
      getTripById(tripId);
    }
  }, [tripId, getTripById]);

  const handleShare = async () => {
    const shareData = {
      title: trip?.name || 'Amazing Trip',
      text: trip?.description || 'Check out this amazing trip!',
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.log('Error sharing:', error);
        handleCopyLink();
      }
    } else {
      handleCopyLink();
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    toast.success("Link copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLike = () => {
    setLiked(!liked);
    toast.success(liked ? "Removed from favorites" : "Added to favorites");
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatDuration = (startDate, endDate) => {
    if (!startDate || !endDate) return "N/A";
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} ${diffDays === 1 ? 'day' : 'days'}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Spinner className="mx-auto mb-4" />
          <p className="text-muted-foreground">Loading trip details...</p>
        </div>
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="mb-6">
            <MapPin className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-foreground mb-2">Trip Not Found</h2>
            <p className="text-muted-foreground">
              Sorry, we couldn't find the trip you're looking for. It may have been removed or the link is invalid.
            </p>
          </div>
          <Button onClick={() => navigate('/')} className="bg-primary text-primary-foreground">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Hero Section */}
      <div className="relative h-64 sm:h-80 lg:h-96 bg-gradient-to-br from-primary/20 to-accent/20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              <Plane className="h-3 w-3 mr-1" />
              Shared Trip
            </Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              {trip.name || "Untitled Trip"}
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              {trip.description || "Discover this amazing journey and get inspired for your next adventure."}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Action Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => navigate('/')}
              className="border-border hover:bg-muted"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleLike}
              className={`border-border hover:bg-muted ${liked ? 'bg-red-50 border-red-200 text-red-600' : ''}`}
            >
              <Heart className={`h-4 w-4 mr-2 ${liked ? 'fill-red-500 text-red-500' : ''}`} />
              {liked ? 'Liked' : 'Like'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
              className="border-border hover:bg-muted"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Copied
                </>
              ) : (
                <>
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Trip Overview */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <MapPin className="h-5 w-5 text-primary" />
                  Trip Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                    <Calendar className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Start Date</p>
                      <p className="font-medium text-foreground">{formatDate(trip.startDate)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                    <Clock className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Duration</p>
                      <p className="font-medium text-foreground">{formatDuration(trip.startDate, trip.endDate)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                    <Users className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Travelers</p>
                      <p className="font-medium text-foreground">{trip.travelers || 1}</p>
                    </div>
                  </div>
                </div>

                {trip.destinations && trip.destinations.length > 0 && (
                  <div>
                    <h4 className="font-medium text-foreground mb-3">Destinations</h4>
                    <div className="flex flex-wrap gap-2">
                      {trip.destinations.map((destination, index) => (
                        <Badge key={index} variant="secondary" className="bg-primary/10 text-primary">
                          {destination}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Itinerary */}
            {trip.itinerary && trip.itinerary.length > 0 && (
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <Navigation className="h-5 w-5 text-primary" />
                    Itinerary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {trip.itinerary.map((day, index) => (
                      <div key={index} className="flex gap-4 p-4 bg-muted/30 rounded-lg">
                        <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-primary font-semibold">D{index + 1}</span>
                        </div>
                        <div className="flex-1">
                          <h5 className="font-medium text-foreground mb-1">
                            {day.title || `Day ${index + 1}`}
                          </h5>
                          <p className="text-muted-foreground text-sm">{day.description}</p>
                          {day.activities && day.activities.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-1">
                              {day.activities.map((activity, actIndex) => (
                                <Badge key={actIndex} variant="outline" className="text-xs">
                                  {activity}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Trip Highlights */}
            {trip.highlights && trip.highlights.length > 0 && (
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <Star className="h-5 w-5 text-primary" />
                    Trip Highlights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {trip.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                        <Star className="h-4 w-4 text-yellow-500 mt-0.5" />
                        <p className="text-sm text-foreground">{highlight}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Trip Stats */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Trip Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Hotel className="h-4 w-4 text-primary" />
                    <span className="text-sm text-foreground">Accommodations</span>
                  </div>
                  <span className="font-medium text-foreground">{trip.accommodations?.length || 0}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Utensils className="h-4 w-4 text-primary" />
                    <span className="text-sm text-foreground">Restaurants</span>
                  </div>
                  <span className="font-medium text-foreground">{trip.restaurants?.length || 0}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Car className="h-4 w-4 text-primary" />
                    <span className="text-sm text-foreground">Activities</span>
                  </div>
                  <span className="font-medium text-foreground">{trip.activities?.length || 0}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Camera className="h-4 w-4 text-primary" />
                    <span className="text-sm text-foreground">Photos</span>
                  </div>
                  <span className="font-medium text-foreground">{trip.photos?.length || 0}</span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={() => navigate('/auth')}
                >
                  <Plane className="h-4 w-4 mr-2" />
                  Plan Similar Trip
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full border-border hover:bg-muted"
                  onClick={handleCopyLink}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Share Link
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full border-border hover:bg-muted"
                  onClick={() => window.print()}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Save as PDF
                </Button>
              </CardContent>
            </Card>

            {/* Creator Info */}
            {trip.creator && (
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Created by</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{trip.creator.name || 'Anonymous Traveler'}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(trip.createdAt)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SharePage;