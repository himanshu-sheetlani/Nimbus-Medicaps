import { useState, useEffect } from "react";
import {
  User,
  Mail,
  MapPin,
  Edit3,
  Save,
  X,
  Camera,
  Globe,
  Heart,
  Plane,
  Calendar,
  Users,
  Wallet,
  Home,
  Car,
  Utensils,
  Mountain,
  Languages,
  Shield,
  Settings,
  Star,
  Award,
  Clock,
  RefreshCw,
  Thermometer,
  MapIcon,
  UtensilsCrossed,
  Activity,
  Accessibility,
  AlertTriangle,
  BookOpen,
  StickyNote,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Wrapper } from "@/components/global/wrapper";
import { Container } from "@/components/global/container";
import { useAuthStore } from "@/stores/useAuthStore";
import { toast } from "sonner";

const Profile = () => {
  const { user, getUserProfile, updateUserProfile, isLoading } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(null);

  useEffect(() => {
    if (!user) {
      getUserProfile();
    }
  }, []);

  useEffect(() => {
    if (user) {
      setEditedUser({ ...user });
    }
  }, [user]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedUser({ ...user });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedUser({ ...user });
  };

  const handleSave = async () => {
    try {
      await updateUserProfile(editedUser);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  const handleInputChange = (field, value) => {
    setEditedUser((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNestedInputChange = (section, field, value) => {
    setEditedUser((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  if (!user && isLoading) {
    return (
      <div className="min-h-screen w-full bg-background">
        <Wrapper className="pt-6">
          <Container>
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="flex items-center space-x-2">
                <RefreshCw className="h-6 w-6 animate-spin text-primary" />
                <span className="text-foreground font-inter-medium">
                  Loading profile...
                </span>
              </div>
            </div>
          </Container>
        </Wrapper>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen w-full bg-background">
        <Wrapper className="pt-6">
          <Container>
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center text-muted-foreground">
                <User className="h-16 w-16 mx-auto mb-4" />
                <p className="font-inter-medium">Unable to load profile</p>
              </div>
            </div>
          </Container>
        </Wrapper>
      </div>
    );
  }

  const displayUser = isEditing ? editedUser : user;

  return (
    <div className="min-h-screen w-full bg-background">
      <Wrapper className="pt-6">
        <Container>
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div>
                <h1 className="text-4xl font-inter-bold text-foreground">
                  Profile
                </h1>
                <p className="text-muted-foreground font-inter-regular mt-1">
                  Manage your account and travel preferences
                </p>
              </div>
            </div>

            {!isEditing ? (
              <Button
                onClick={handleEdit}
                className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 font-inter-medium"
              >
                <Edit3 className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button
                  onClick={handleCancel}
                  variant="outline"
                  className="border-border text-foreground hover:bg-accent/10 font-inter-medium"
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  disabled={isLoading}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 font-inter-medium"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Basic Info (Sticky) */}
            <div className="lg:col-span-1">
              <div className="space-y-6 sticky top-6">
                {/* Profile Card */}
                <div className="bg-card border border-border rounded-xl">
                  <div className="p-6">
                    <div className="text-center">
                      {/* Profile Picture */}
                      <div className="relative mx-auto w-24 h-24 mb-4">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                          {displayUser.profile ? (
                            <img
                              src={displayUser.profile}
                              alt="Profile"
                              className="w-24 h-24 rounded-full object-cover"
                            />
                          ) : (
                            <User className="h-12 w-12 text-primary-foreground" />
                          )}
                        </div>
                        {isEditing && (
                          <Button
                            size="sm"
                            className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground p-0"
                          >
                            <Camera className="h-4 w-4" />
                          </Button>
                        )}
                      </div>

                      {/* Name */}
                      {isEditing ? (
                        <div className="space-y-2 mb-4">
                          <Input
                            value={editedUser.name || ""}
                            onChange={(e) =>
                              handleInputChange("name", e.target.value)
                            }
                            className="text-center text-xl font-inter-semibold bg-card border-border text-foreground"
                            placeholder="Full Name"
                          />
                          <div className="grid grid-cols-2 gap-2">
                            <Input
                              value={editedUser.firstName || ""}
                              onChange={(e) =>
                                handleInputChange("firstName", e.target.value)
                              }
                              className="text-center text-sm bg-card border-border text-foreground"
                              placeholder="First Name"
                            />
                            <Input
                              value={editedUser.lastName || ""}
                              onChange={(e) =>
                                handleInputChange("lastName", e.target.value)
                              }
                              className="text-center text-sm bg-card border-border text-foreground"
                              placeholder="Last Name"
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="mb-4">
                          <h2 className="text-xl font-inter-semibold text-foreground mb-2">
                            {displayUser.name}
                          </h2>
                          {(displayUser.firstName || displayUser.lastName) && (
                            <p className="text-sm text-muted-foreground font-inter-regular">
                              {displayUser.firstName} {displayUser.lastName}
                            </p>
                          )}
                        </div>
                      )}

                      {/* Username */}
                      {isEditing ? (
                        <Input
                          value={editedUser.username || ""}
                          onChange={(e) =>
                            handleInputChange("username", e.target.value)
                          }
                          className="text-center bg-card border-border text-foreground mb-2"
                          placeholder="@username"
                        />
                      ) : (
                        <p className="text-muted-foreground mb-2 font-inter-regular">
                          @{displayUser.username || "Not set"}
                        </p>
                      )}

                      {/* Email */}
                      <div className="flex items-center justify-center gap-2 text-muted-foreground mb-4">
                        <Mail className="h-4 w-4 text-accent" />
                        <span className="text-sm font-inter-regular">
                          {displayUser.email}
                        </span>
                      </div>

                      {/* Hometown */}
                      <div className="flex items-center justify-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4 text-accent" />
                        {isEditing ? (
                          <Input
                            value={editedUser.hometown || ""}
                            onChange={(e) =>
                              handleInputChange("hometown", e.target.value)
                            }
                            className="text-sm bg-card border-border text-foreground"
                            placeholder="Hometown"
                          />
                        ) : (
                          <span className="text-sm font-inter-regular">
                            {displayUser.hometown || "Not specified"}
                          </span>
                        )}
                      </div>

                      {/* Onboarding Status */}
                      <div className="mt-4">
                        <Badge
                          variant={
                            displayUser.onBoarded ? "default" : "secondary"
                          }
                          className={
                            displayUser.onBoarded
                              ? "bg-success/20 text-success border-success/30"
                              : "bg-warning/20 text-warning border-warning/30"
                          }
                        >
                          {displayUser.onBoarded
                            ? "Profile Complete"
                            : "Setup Pending"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="bg-card border border-border rounded-xl">
                  <div className="p-6 border-b border-border">
                    <h3 className="text-xl font-inter-semibold text-foreground flex items-center gap-2">
                      <Award className="h-5 w-5 text-accent" />
                      Travel Stats
                    </h3>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground font-inter-regular">
                        Member since
                      </span>
                      <span className="text-foreground font-inter-medium">
                        {new Date(displayUser.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground font-inter-regular">
                        Countries visited
                      </span>
                      <span className="text-foreground font-inter-medium">
                        {displayUser.experience?.visitedCountries ||
                          "Not specified"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground font-inter-regular">
                        Travel experience
                      </span>
                      <Badge className="bg-accent/20 text-accent border-accent/30">
                        {displayUser.experience?.travelExperience || "Not set"}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Profile Completion */}
                <div className="bg-card border border-border rounded-xl">
                  <div className="p-6 border-b border-border">
                    <h3 className="text-xl font-inter-semibold text-foreground flex items-center gap-2">
                      <Settings className="h-5 w-5 text-accent" />
                      Profile Completion
                    </h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground text-sm">
                          Basic Info
                        </span>
                        <Badge className="bg-success/20 text-success border-success/30">
                          Complete
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground text-sm">
                          Travel Preferences
                        </span>
                        <Badge
                          className={`${
                            displayUser.travelPreferences?.travelStyle?.length >
                            0
                              ? "bg-success/20 text-success border-success/30"
                              : "bg-warning/20 text-warning border-warning/30"
                          }`}
                        >
                          {displayUser.travelPreferences?.travelStyle?.length >
                          0
                            ? "Complete"
                            : "Pending"}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground text-sm">
                          Interests
                        </span>
                        <Badge
                          className={`${
                            displayUser.interests?.activityInterests?.length > 0
                              ? "bg-success/20 text-success border-success/30"
                              : "bg-warning/20 text-warning border-warning/30"
                          }`}
                        >
                          {displayUser.interests?.activityInterests?.length > 0
                            ? "Complete"
                            : "Pending"}
                        </Badge>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-muted-foreground text-sm font-inter-medium">
                          Overall Progress
                        </span>
                        <span className="text-foreground text-sm">75%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-primary to-accent h-2 rounded-full"
                          style={{ width: "75%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Detailed Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Travel Preferences */}
              <div className="bg-card border border-border rounded-xl">
                <div className="p-6 border-b border-border">
                  <h3 className="text-xl font-inter-semibold text-foreground flex items-center gap-2">
                    <Plane className="h-5 w-5 text-accent" />
                    Travel Preferences
                  </h3>
                </div>
                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-inter-medium text-foreground mb-2 block">
                        <Users className="h-4 w-4 inline mr-2" />
                        Travel Style
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {displayUser.travelPreferences?.travelStyle?.map(
                          (style, index) => (
                            <Badge
                              key={index}
                              className="bg-accent/20 text-accent border-accent/30"
                            >
                              {style}
                            </Badge>
                          )
                        ) || (
                          <span className="text-muted-foreground text-sm font-inter-regular">
                            Not specified
                          </span>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-inter-medium text-foreground mb-2 block">
                        <Wallet className="h-4 w-4 inline mr-2" />
                        Budget Range
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {displayUser.travelPreferences?.budgetRange?.map(
                          (budget, index) => (
                            <Badge
                              key={index}
                              className="bg-success/20 text-success border-success/30"
                            >
                              {budget}
                            </Badge>
                          )
                        ) || (
                          <span className="text-muted-foreground text-sm font-inter-regular">
                            Not specified
                          </span>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-inter-medium text-foreground mb-2 block">
                        <Users className="h-4 w-4 inline mr-2" />
                        Group Size
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {displayUser.travelPreferences?.groupSize?.map(
                          (size, index) => (
                            <Badge
                              key={index}
                              className="bg-accent/20 text-accent border-accent/30"
                            >
                              {size}
                            </Badge>
                          )
                        ) || (
                          <span className="text-muted-foreground text-sm font-inter-regular">
                            Not specified
                          </span>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-inter-medium text-foreground mb-2 block">
                        <Calendar className="h-4 w-4 inline mr-2" />
                        Trip Duration
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {displayUser.travelPreferences?.tripDuration?.map(
                          (duration, index) => (
                            <Badge
                              key={index}
                              className="bg-accent/20 text-accent border-accent/30"
                            >
                              {duration}
                            </Badge>
                          )
                        ) || (
                          <span className="text-muted-foreground text-sm font-inter-regular">
                            Not specified
                          </span>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-inter-medium text-foreground mb-2 block">
                        <Clock className="h-4 w-4 inline mr-2" />
                        Travel Frequency
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {displayUser.travelPreferences?.travelFrequency?.map(
                          (frequency, index) => (
                            <Badge
                              key={index}
                              className="bg-accent/20 text-accent border-accent/30"
                            >
                              {frequency}
                            </Badge>
                          )
                        ) || (
                          <span className="text-muted-foreground text-sm font-inter-regular">
                            Not specified
                          </span>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-inter-medium text-foreground mb-2 block">
                        <Home className="h-4 w-4 inline mr-2" />
                        Accommodation Type
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {displayUser.travelPreferences?.accommodationType?.map(
                          (type, index) => (
                            <Badge
                              key={index}
                              className="bg-accent/20 text-accent border-accent/30"
                            >
                              {type}
                            </Badge>
                          )
                        ) || (
                          <span className="text-muted-foreground text-sm font-inter-regular">
                            Not specified
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label className="text-sm font-inter-medium text-foreground mb-2 block">
                        <Car className="h-4 w-4 inline mr-2" />
                        Transportation Preference
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {displayUser.travelPreferences?.transportationPreference?.map(
                          (transport, index) => (
                            <Badge
                              key={index}
                              className="bg-accent/20 text-accent border-accent/30"
                            >
                              {transport}
                            </Badge>
                          )
                        ) || (
                          <span className="text-muted-foreground text-sm font-inter-regular">
                            Not specified
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Interests & Preferences */}
              <div className="bg-card border border-border rounded-xl">
                <div className="p-6 border-b border-border">
                  <h3 className="text-xl font-inter-semibold text-foreground flex items-center gap-2">
                    <Heart className="h-5 w-5 text-accent" />
                    Interests & Preferences
                  </h3>
                </div>
                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-inter-medium text-foreground mb-2 block">
                        <Thermometer className="h-4 w-4 inline mr-2" />
                        Climate Preference
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {displayUser.interests?.climatePreference?.map(
                          (climate, index) => (
                            <Badge
                              key={index}
                              className="bg-accent/20 text-accent border-accent/30"
                            >
                              {climate}
                            </Badge>
                          )
                        ) || (
                          <span className="text-muted-foreground text-sm font-inter-regular">
                            Not specified
                          </span>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-inter-medium text-foreground mb-2 block">
                        <MapIcon className="h-4 w-4 inline mr-2" />
                        Destination Types
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {displayUser.interests?.destinationTypes?.map(
                          (type, index) => (
                            <Badge
                              key={index}
                              className="bg-accent/20 text-accent border-accent/30"
                            >
                              {type}
                            </Badge>
                          )
                        ) || (
                          <span className="text-muted-foreground text-sm font-inter-regular">
                            Not specified
                          </span>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-inter-medium text-foreground mb-2 block">
                        <UtensilsCrossed className="h-4 w-4 inline mr-2" />
                        Cuisine Preferences
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {displayUser.interests?.cuisinePreferences?.map(
                          (cuisine, index) => (
                            <Badge
                              key={index}
                              className="bg-accent/20 text-accent border-accent/30"
                            >
                              {cuisine}
                            </Badge>
                          )
                        ) || (
                          <span className="text-muted-foreground text-sm font-inter-regular">
                            Not specified
                          </span>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-inter-medium text-foreground mb-2 block">
                        <Activity className="h-4 w-4 inline mr-2" />
                        Activity Interests
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {displayUser.interests?.activityInterests?.map(
                          (activity, index) => (
                            <Badge
                              key={index}
                              className="bg-accent/20 text-accent border-accent/30"
                            >
                              {activity}
                            </Badge>
                          )
                        ) || (
                          <span className="text-muted-foreground text-sm font-inter-regular">
                            Not specified
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Experience & Background */}
              <div className="bg-card border border-border rounded-xl">
                <div className="p-6 border-b border-border">
                  <h3 className="text-xl font-inter-semibold text-foreground flex items-center gap-2">
                    <Mountain className="h-5 w-5 text-accent" />
                    Experience & Background
                  </h3>
                </div>
                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-inter-medium text-foreground mb-2 block">
                        <Star className="h-4 w-4 inline mr-2" />
                        Travel Experience
                      </label>
                      {isEditing ? (
                        <Input
                          value={editedUser.experience?.travelExperience || ""}
                          onChange={(e) =>
                            handleNestedInputChange(
                              "experience",
                              "travelExperience",
                              e.target.value
                            )
                          }
                          className="bg-card border-border text-foreground"
                          placeholder="e.g., Beginner, Intermediate, Expert"
                        />
                      ) : (
                        <Badge className="bg-accent/20 text-accent border-accent/30">
                          {displayUser.experience?.travelExperience ||
                            "Not specified"}
                        </Badge>
                      )}
                    </div>

                    <div>
                      <label className="text-sm font-inter-medium text-muted-foreground mb-2 block">
                        <Languages className="h-4 w-4 inline mr-2" />
                        Languages
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {displayUser.experience?.languages?.map(
                          (language, index) => (
                            <Badge
                              key={index}
                              className="bg-accent/20 text-accent border-accent/30"
                            >
                              {language}
                            </Badge>
                          )
                        ) || (
                          <span className="text-muted-foreground text-sm font-inter-regular">
                            Not specified
                          </span>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-inter-medium text-muted-foreground mb-2 block">
                        <Globe className="h-4 w-4 inline mr-2" />
                        Countries Visited
                      </label>
                      {isEditing ? (
                        <Input
                          value={editedUser.experience?.visitedCountries || ""}
                          onChange={(e) =>
                            handleNestedInputChange(
                              "experience",
                              "visitedCountries",
                              e.target.value
                            )
                          }
                          className="bg-card border-border text-foreground"
                          placeholder="e.g., 15+ countries"
                        />
                      ) : (
                        <span className="text-foreground font-inter-medium">
                          {displayUser.experience?.visitedCountries ||
                            "Not specified"}
                        </span>
                      )}
                    </div>

                    <div>
                      <label className="text-sm font-inter-medium text-muted-foreground mb-2 block">
                        <Heart className="h-4 w-4 inline mr-2" />
                        Dream Destinations
                      </label>
                      {isEditing ? (
                        <Textarea
                          value={editedUser.experience?.dreamDestinations || ""}
                          onChange={(e) =>
                            handleNestedInputChange(
                              "experience",
                              "dreamDestinations",
                              e.target.value
                            )
                          }
                          className="bg-card border-border text-foreground"
                          placeholder="Places you dream to visit..."
                          rows={3}
                        />
                      ) : (
                        <p className="text-muted-foreground font-inter-regular text-sm">
                          {displayUser.experience?.dreamDestinations ||
                            "Not specified"}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Special Requirements */}
              <div className="bg-card border border-border rounded-xl">
                <div className="p-6 border-b border-border">
                  <h3 className="text-xl font-inter-semibold text-foreground flex items-center gap-2">
                    <Shield className="h-5 w-5 text-accent" />
                    Special Requirements
                  </h3>
                </div>
                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-inter-medium text-muted-foreground mb-2 block">
                        <Accessibility className="h-4 w-4 inline mr-2" />
                        Accessibility Needs
                      </label>
                      {isEditing ? (
                        <Textarea
                          value={
                            editedUser.specialRequirements?.accessibility || ""
                          }
                          onChange={(e) =>
                            handleNestedInputChange(
                              "specialRequirements",
                              "accessibility",
                              e.target.value
                            )
                          }
                          className="bg-card border-border text-foreground"
                          placeholder="Any accessibility requirements..."
                          rows={2}
                        />
                      ) : (
                        <p className="text-muted-foreground font-inter-regular text-sm">
                          {displayUser.specialRequirements?.accessibility ||
                            "None specified"}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="text-sm font-inter-medium text-muted-foreground mb-2 block">
                        <Utensils className="h-4 w-4 inline mr-2" />
                        Dietary Restrictions
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {displayUser.specialRequirements?.dietaryRestrictions?.map(
                          (restriction, index) => (
                            <Badge
                              key={index}
                              className="bg-secondary text-secondary-foreground border-secondary"
                            >
                              {restriction}
                            </Badge>
                          )
                        ) || (
                          <span className="text-muted-foreground text-sm font-inter-regular">
                            None specified
                          </span>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-inter-medium text-muted-foreground mb-2 block">
                        <BookOpen className="h-4 w-4 inline mr-2" />
                        Special Interests
                      </label>
                      {isEditing ? (
                        <Textarea
                          value={
                            editedUser.specialRequirements?.specialInterests ||
                            ""
                          }
                          onChange={(e) =>
                            handleNestedInputChange(
                              "specialRequirements",
                              "specialInterests",
                              e.target.value
                            )
                          }
                          className="bg-card border-border text-foreground"
                          placeholder="Photography, wildlife, architecture, etc..."
                          rows={2}
                        />
                      ) : (
                        <p className="text-muted-foreground font-inter-regular text-sm">
                          {displayUser.specialRequirements?.specialInterests ||
                            "None specified"}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="text-sm font-inter-medium text-muted-foreground mb-2 block">
                        <StickyNote className="h-4 w-4 inline mr-2" />
                        Additional Notes
                      </label>
                      {isEditing ? (
                        <Textarea
                          value={
                            editedUser.specialRequirements?.additionalNotes ||
                            ""
                          }
                          onChange={(e) =>
                            handleNestedInputChange(
                              "specialRequirements",
                              "additionalNotes",
                              e.target.value
                            )
                          }
                          className="bg-card border-border text-foreground"
                          placeholder="Any other important information..."
                          rows={2}
                        />
                      ) : (
                        <p className="text-muted-foreground font-inter-regular text-sm">
                          {displayUser.specialRequirements?.additionalNotes ||
                            "None specified"}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Trips Summary */}
              <div className="bg-card border border-border rounded-xl">
                <div className="p-6 border-b border-border">
                  <h3 className="text-xl font-inter-semibold text-foreground flex items-center gap-2">
                    <Plane className="h-5 w-5 text-accent" />
                    Recent Trips
                  </h3>
                </div>
                <div className="p-6">
                  {displayUser.trips && displayUser.trips.length > 0 ? (
                    <div className="space-y-3">
                      <p className="text-foreground font-inter-medium">
                        Total Trips: {displayUser.trips.length}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                        {displayUser.trips.slice(0, 6).map((trip, index) => (
                          <div
                            key={index}
                            className="bg-secondary/30 p-3 rounded-lg border border-border"
                          >
                            <Badge className="bg-secondary text-secondary-foreground border-border text-xs">
                              Trip #{index + 1}
                            </Badge>
                          </div>
                        ))}
                      </div>
                      {displayUser.trips.length > 6 && (
                        <p className="text-muted-foreground text-sm font-inter-regular">
                          +{displayUser.trips.length - 6} more trips
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <Plane className="h-12 w-12 text-accent mx-auto mb-3" />
                      <p className="text-muted-foreground font-inter-regular">
                        No trips yet
                      </p>
                      <p className="text-muted-foreground text-sm">
                        Start planning your first adventure!
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Wrapper>
    </div>
  );
};

export default Profile;
