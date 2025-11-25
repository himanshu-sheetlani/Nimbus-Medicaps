import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import { Wrapper } from "@/components/global/wrapper";
import { Container } from "@/components/global/container";

import { useModelStore } from "@/stores/useModelStore";
import {
  Search,
  Filter,
  MapPin,
  Calendar,
  Eye,
  Box,
  MonitorSpeaker,
  ExternalLink,
  Star,
  Building,
} from "lucide-react";

import SketchfabModalViewer from "./components/viewer";

export default function MonumentsDashboard() {
  const { models, getModels, isLoading } = useModelStore();
  const [isArModalOpen, setIsArModalOpen] = useState(false);
  const [selectedModelUid, setSelectedModelUid] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [selectedArchitecture, setSelectedArchitecture] = useState("all");
  const [selectedPeriod, setSelectedPeriod] = useState("all");

  useEffect(() => {
    getModels();
  }, []);

  const handleArViewClick = (uid) => {
    setSelectedModelUid(uid);
    setIsArModalOpen(true);
  };

  const handleArLinkClick = (arlink) => {
    window.open(arlink, "_blank", "width=800,height=600,toolbar=no,menubar=no");
  };

  // Updated VR handler to use vrHTMLPath from database
  const handleVrViewClick = (monument) => {
    if (monument.vrHTMLPath) {
      // Construct the VR URL using the path stored in database
      const vrUrl = `/VR/${monument.vrHTMLPath}`;

      // Open VR experience in new window with VR-optimized settings
      const vrWindow = window.open(
        vrUrl,
        "vrExperience",
        "width=1400,height=900,fullscreen=yes,toolbar=no,menubar=no,scrollbars=no,location=no,status=no"
      );

      // Focus the VR window and attempt fullscreen
      if (vrWindow) {
        vrWindow.focus();

        // Try to trigger fullscreen after a short delay
        setTimeout(() => {
          if (
            vrWindow.document &&
            vrWindow.document.documentElement.requestFullscreen
          ) {
            vrWindow.document.documentElement
              .requestFullscreen()
              .catch((err) => {
                console.log("Fullscreen request failed:", err);
              });
          }
        }, 1000);
      }
    } else {
      // Show a more informative message for unavailable VR
      alert(
        `🥽 VR experience for ${monument.name} is coming soon! We're working on creating an immersive virtual tour for this magnificent monument.`
      );
    }
  };

  console.log(models);

  // Get unique values for filter options
  const locations = [...new Set(models.map((m) => m.location))];
  const architectures = [...new Set(models.map((m) => m.architecture))];
  const periods = [
    ...new Set(
      models.map((m) => {
        const year = parseInt(m.yearBuilt);
        if (year < 1000) return "Ancient";
        if (year < 1500) return "Medieval";
        if (year < 1800) return "Early Modern";
        if (year < 1900) return "19th Century";
        return "Modern";
      })
    ),
  ];

  // Filter models based on search and filters
  const filteredModels = models.filter((model) => {
    const matchesSearch =
      model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      model.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesLocation =
      selectedLocation === "all" || model.location === selectedLocation;
    const matchesArchitecture =
      selectedArchitecture === "all" ||
      model.architecture === selectedArchitecture;

    const year = parseInt(model.yearBuilt);
    let period;
    if (year < 1000) period = "Ancient";
    else if (year < 1500) period = "Medieval";
    else if (year < 1800) period = "Early Modern";
    else if (year < 1900) period = "19th Century";
    else period = "Modern";

    const matchesPeriod = selectedPeriod === "all" || period === selectedPeriod;

    return (
      matchesSearch && matchesLocation && matchesArchitecture && matchesPeriod
    );
  });

  // Count VR-enabled monuments
  const vrEnabledCount = models.filter((model) => model.vrHTMLPath).length;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="flex items-center space-x-3">
          <Spinner className="text-primary" />
          <span className="text-foreground font-inter-medium">
            Loading monuments...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-background">
      <Wrapper className="pt-6">
        <Container>
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-inter-bold text-foreground mb-2">
                Monuments of India
              </h1>
              <p className="text-muted-foreground font-inter-regular">
                Explore India's heritage through immersive 3D, AR, and VR
                experiences
              </p>
            </div>

            {/* Stats Badges */}
            <div className="flex items-center gap-2">
              <Badge className="bg-primary/10 text-primary border-primary/20">
                <Building className="h-3 w-3 mr-1" />
                {models.length} Monuments
              </Badge>
              <Badge className="bg-secondary/10 text-secondary border-secondary/20">
                <MonitorSpeaker className="h-3 w-3 mr-1" />
                {vrEnabledCount} VR Ready
              </Badge>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="mb-8 p-6 bg-card border border-border rounded-xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search Bar */}
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search monuments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full bg-background border-input text-foreground placeholder:text-muted-foreground focus:border-primary"
                />
              </div>

              {/* Location Filter */}
              <div className="w-full">
                <Select
                  value={selectedLocation}
                  onValueChange={setSelectedLocation}
                >
                  <SelectTrigger className="w-full bg-background border-input text-foreground">
                    <SelectValue
                      placeholder="Select Location"
                      className="truncate"
                    />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border w-full">
                    <SelectItem value="all" className="text-foreground">
                      All Locations
                    </SelectItem>
                    {locations.map((location) => (
                      <SelectItem
                        key={location}
                        value={location}
                        className="text-foreground"
                        title={location}
                      >
                        <span className="truncate">{location}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Architecture Filter */}
              <div className="w-full">
                <Select
                  value={selectedArchitecture}
                  onValueChange={setSelectedArchitecture}
                >
                  <SelectTrigger className="w-full bg-background border-input text-foreground">
                    <SelectValue
                      placeholder="Architecture Style"
                      className="truncate"
                    />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border w-full">
                    <SelectItem value="all" className="text-foreground">
                      All Styles
                    </SelectItem>
                    {architectures.map((arch) => (
                      <SelectItem
                        key={arch}
                        value={arch}
                        className="text-foreground"
                        title={arch}
                      >
                        <span className="truncate">{arch}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Period Filter */}
              <div className="w-full">
                <Select
                  value={selectedPeriod}
                  onValueChange={setSelectedPeriod}
                >
                  <SelectTrigger className="w-full bg-background border-input text-foreground">
                    <SelectValue
                      placeholder="Time Period"
                      className="truncate"
                    />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border w-full">
                    <SelectItem value="all" className="text-foreground">
                      All Periods
                    </SelectItem>
                    {periods.map((period) => (
                      <SelectItem
                        key={period}
                        value={period}
                        className="text-foreground"
                        title={period}
                      >
                        <span className="truncate">{period}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Results count */}
            <div className="mt-4 flex justify-between items-center">
              <span className="text-muted-foreground text-sm">
                Showing {filteredModels.length} of {models.length} monuments
              </span>

              {/* Clear Filters Button */}
              <Button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedLocation("all");
                  setSelectedArchitecture("all");
                  setSelectedPeriod("all");
                }}
                variant="outline"
                size="sm"
                className="border-border text-muted-foreground hover:bg-accent/10"
              >
                <Filter className="h-4 w-4 mr-2" />
                Clear Filters
              </Button>
            </div>
          </div>

          {/* Monument Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredModels.map((monument) => (
              <div
                key={monument._id}
                className="bg-card border border-border rounded-xl p-4 hover:bg-card/80 transition-all duration-300 group shadow-sm"
              >
                {/* Monument Image with VR Badge */}
                <div className="relative w-full h-48 bg-muted rounded-lg mb-4 overflow-hidden">
                  <img
                    src={monument.imageUrl}
                    alt={monument.name}
                    className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* VR Status Badge */}
                  <div className="absolute top-3 right-3">
                    {monument.vrHTMLPath ? (
                      <Badge className="bg-success/20 text-success border-success/30 backdrop-blur-sm">
                        <MonitorSpeaker className="h-3 w-3 mr-1" />
                        VR Ready
                      </Badge>
                    ) : (
                      <Badge className="bg-muted/90 text-muted-foreground border-border backdrop-blur-sm">
                        VR Soon
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Monument Info */}
                <div className="space-y-3">
                  <div>
                    <h3
                      className="text-lg font-inter-semibold text-foreground mb-1 truncate group-hover:text-primary transition-colors"
                      title={monument.name}
                    >
                      {monument.name}
                    </h3>
                    <div className="flex items-center gap-1 mb-2">
                      <MapPin className="h-3 w-3 text-accent shrink-0" />
                      <span
                        className="text-muted-foreground font-inter-regular text-sm truncate"
                        title={monument.location}
                      >
                        {monument.location}
                      </span>
                    </div>
                  </div>

                  <p className="text-muted-foreground font-inter-regular text-sm leading-relaxed line-clamp-3">
                    {monument.description}
                  </p>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-accent/20 text-accent border-accent/30 shrink-0">
                      <Calendar className="h-3 w-3 mr-1" />
                      {monument.yearBuilt}
                    </Badge>
                    <Badge
                      className="bg-secondary/20 text-secondary-foreground border-secondary/30 truncate max-w-[120px]"
                      title={monument.architecture}
                    >
                      {monument.architecture}
                    </Badge>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2 pt-2">
                    {/* 3D Model Button - Full Width */}
                    <Button
                      onClick={() => handleArViewClick(monument.sketchfabUid)}
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 font-inter-medium text-sm"
                    >
                      <Box className="h-3 w-3 mr-2" />
                      3D Model
                    </Button>

                    {/* AR and VR Buttons - Side by Side */}
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        onClick={() => handleArLinkClick(monument.arlink)}
                        className="bg-accent/20 border border-accent/30 text-accent hover:bg-accent/30 transition-all duration-200 font-inter-medium text-sm"
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        AR View
                      </Button>

                      <Button
                        onClick={() => handleVrViewClick(monument)}
                        disabled={!monument.vrHTMLPath}
                        className={`transition-all duration-200 font-inter-medium text-sm ${
                          monument.vrHTMLPath
                            ? "bg-success/20 border border-success/30 text-success hover:bg-success/30 hover:scale-105"
                            : "bg-muted border border-border text-muted-foreground cursor-not-allowed"
                        }`}
                      >
                        <MonitorSpeaker className="h-3 w-3 mr-1" />
                        {monument.vrHTMLPath ? (
                          <>
                            VR Tour
                            <ExternalLink className="h-2 w-2 ml-1" />
                          </>
                        ) : (
                          "VR Soon"
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No results message */}
          {filteredModels.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-muted rounded-xl flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-inter-semibold text-foreground mb-2">
                No monuments found
              </h3>
              <p className="text-muted-foreground font-inter-regular">
                Try adjusting your search criteria or clear filters to see all
                monuments
              </p>
            </div>
          )}

          {/* Bottom CTA */}
          <div className="mt-12 p-6 bg-gradient-to-r from-card/50 via-accent/10 to-card/50 border border-border rounded-xl text-center">
            <h3 className="text-xl font-inter-semibold text-foreground mb-2">
              Experience Heritage in Virtual Reality
            </h3>
            <p className="text-muted-foreground font-inter-regular mb-4">
              Step into history with our immersive VR experiences.{" "}
              {vrEnabledCount} monuments now available in virtual reality!
            </p>
            <div className="flex justify-center gap-2">
              <Badge className="bg-success/20 text-success border-success/30">
                🥽 VR Compatible
              </Badge>
              <Badge className="bg-accent/20 text-accent border-accent/30">
                📱 Mobile Friendly
              </Badge>
              <Badge className="bg-primary/20 text-primary border-primary/30">
                🎮 Interactive Tours
              </Badge>
            </div>
          </div>
        </Container>
      </Wrapper>

      {/* 3D Model Modal */}
      <Dialog open={isArModalOpen} onOpenChange={setIsArModalOpen}>
        <DialogContent className="sm:max-w-screen w-screen h-screen bg-background border-border p-0 m-0">
          <DialogHeader className="p-4 bg-card/90 backdrop-blur border-b border-border">
            <DialogTitle className="text-foreground font-inter-semibold">
              3D Model Viewer{" "}
              {selectedModelUid ? `- Interactive Experience` : ""}
            </DialogTitle>
          </DialogHeader>
          <div className="w-full h-[calc(100vh-60px)]">
            {selectedModelUid && (
              <SketchfabModalViewer uid={selectedModelUid} />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
