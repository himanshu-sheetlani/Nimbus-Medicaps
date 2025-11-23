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
import { Wrapper } from "@/components/global/Wrapper";
import { Container } from "@/components/global/Container";
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
      <div className="min-h-screen w-full">
        <Wrapper className="pt-6">
          <Container>
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="flex items-center space-x-2">
                <RefreshCw className="h-6 w-6 animate-spin text-purple-400" />
                <span className="text-purple-100 font-inter-medium">
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
      <div className="min-h-screen w-full">
        <Wrapper className="pt-6">
          <Container>
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center text-purple-300">
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
    <div className="min-h-screen w-full">
      <Wrapper className="pt-6">
        <Container>
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              
              <div>
                <h1 className="text-4xl font-inter-bold text-purple-100">
                  Profile
                </h1>
                <p className="text-purple-300 font-inter-regular mt-1">
                  Manage your account and travel preferences
                </p>
              </div>
            </div>

            {!isEditing ? (
              <Button
                onClick={handleEdit}
                className="bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-500 hover:to-purple-600 transition-all duration-200 font-inter-medium"
              >
                <Edit3 className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button
                  onClick={handleCancel}
                  variant="outline"
                  className="border-purple-700/50 text-purple-300 hover:bg-purple-950/50 font-inter-medium"
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  disabled={isLoading}
                  className="bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-500 hover:to-purple-600 transition-all duration-200 font-inter-medium"
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
                <div className="bg-zinc-700/30 border border-zinc-400/30 rounded-xl">
                  <div className="p-6">
                    <div className="text-center">
                      {/* Profile Picture */}
                      <div className="relative mx-auto w-24 h-24 mb-4">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-500 to-blue-600 flex items-center justify-center">
                          {displayUser.profile ? (
                            <img
                              src={displayUser.profile}
                              alt="Profile"
                              className="w-24 h-24 rounded-full object-cover"
                            />
                          ) : (
                            <User className="h-12 w-12 text-white" />
                          )}
                        </div>
                        {isEditing && (
                          <Button
                            size="sm"
                            className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-purple-600 hover:bg-purple-700 text-white p-0"
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
                            className="text-center text-xl font-inter-semibold bg-purple-950/50 border-purple-800/30 text-purple-100"
                            placeholder="Full Name"
                          />
                          <div className="grid grid-cols-2 gap-2">
                            <Input
                              value={editedUser.firstName || ""}
                              onChange={(e) =>
                                handleInputChange("firstName", e.target.value)
                              }
                              className="text-center text-sm bg-purple-950/50 border-purple-800/30 text-purple-300"
                              placeholder="First Name"
                            />
                            <Input
                              value={editedUser.lastName || ""}
                              onChange={(e) =>
                                handleInputChange("lastName", e.target.value)
                              }
                              className="text-center text-sm bg-purple-950/50 border-purple-800/30 text-purple-300"
                              placeholder="Last Name"
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="mb-4">
                          <h2 className="text-xl font-inter-semibold text-purple-100 mb-2">
                            {displayUser.name}
                          </h2>
                          {(displayUser.firstName || displayUser.lastName) && (
                            <p className="text-sm text-purple-300 font-inter-regular">
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
                          className="text-center bg-purple-950/50 border-purple-800/30 text-purple-300 mb-2"
                          placeholder="@username"
                        />
                      ) : (
                        <p className="text-purple-300 mb-2 font-inter-regular">
                          @{displayUser.username || "Not set"}
                        </p>
                      )}

                      {/* Email */}
                      <div className="flex items-center justify-center gap-2 text-purple-300 mb-4">
                        <Mail className="h-4 w-4 text-purple-400" />
                        <span className="text-sm font-inter-regular">
                          {displayUser.email}
                        </span>
                      </div>

                      {/* Hometown */}
                      <div className="flex items-center justify-center gap-2 text-purple-300">
                        <MapPin className="h-4 w-4 text-purple-400" />
                        {isEditing ? (
                          <Input
                            value={editedUser.hometown || ""}
                            onChange={(e) =>
                              handleInputChange("hometown", e.target.value)
                            }
                            className="text-sm bg-purple-950/50 border-purple-800/30 text-purple-300"
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
                              ? "bg-green-900/50 text-green-300 border-green-700/50"
                              : "bg-yellow-900/50 text-yellow-300 border-yellow-700/50"
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
                <div className="bg-zinc-700/30 border border-zinc-400/30 rounded-xl">
                  <div className="p-6 border-b border-zinc-400/20">
                    <h3 className="text-xl font-inter-semibold text-purple-100 flex items-center gap-2">
                      <Award className="h-5 w-5 text-purple-400" />
                      Travel Stats
                    </h3>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-purple-300 font-inter-regular">
                        Member since
                      </span>
                      <span className="text-purple-100 font-inter-medium">
                        {new Date(displayUser.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-purple-300 font-inter-regular">
                        Countries visited
                      </span>
                      <span className="text-purple-100 font-inter-medium">
                        {displayUser.experience?.visitedCountries ||
                          "Not specified"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-purple-300 font-inter-regular">
                        Travel experience
                      </span>
                      <Badge className="bg-purple-900/50 text-purple-300 border-purple-700/50">
                        {displayUser.experience?.travelExperience || "Not set"}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Profile Completion */}
                <div className="bg-zinc-700/30 border border-zinc-400/30 rounded-xl">
                  <div className="p-6 border-b border-zinc-400/20">
                    <h3 className="text-xl font-inter-semibold text-purple-100 flex items-center gap-2">
                      <Settings className="h-5 w-5 text-purple-400" />
                      Profile Completion
                    </h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-purple-300 text-sm">
                          Basic Info
                        </span>
                        <Badge className="bg-green-900/50 text-green-300 border-green-700/50">
                          Complete
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-purple-300 text-sm">
                          Travel Preferences
                        </span>
                        <Badge
                          className={`${
                            displayUser.travelPreferences?.travelStyle?.length >
                            0
                              ? "bg-green-900/50 text-green-300 border-green-700/50"
                              : "bg-yellow-900/50 text-yellow-300 border-yellow-700/50"
                          }`}
                        >
                          {displayUser.travelPreferences?.travelStyle?.length >
                          0
                            ? "Complete"
                            : "Pending"}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-purple-300 text-sm">
                          Interests
                        </span>
                        <Badge
                          className={`${
                            displayUser.interests?.activityInterests?.length > 0
                              ? "bg-green-900/50 text-green-300 border-green-700/50"
                              : "bg-yellow-900/50 text-yellow-300 border-yellow-700/50"
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
                        <span className="text-purple-300 text-sm font-inter-medium">
                          Overall Progress
                        </span>
                        <span className="text-purple-100 text-sm">75%</span>
                      </div>
                      <div className="w-full bg-purple-950/50 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full"
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
              <div className="bg-zinc-700/30 border border-zinc-400/30 rounded-xl">
                <div className="p-6 border-b border-zinc-400/20">
                  <h3 className="text-xl font-inter-semibold text-purple-100 flex items-center gap-2">
                    <Plane className="h-5 w-5 text-purple-400" />
                    Travel Preferences
                  </h3>
                </div>
                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-inter-medium text-purple-200 mb-2 block">
                        <Users className="h-4 w-4 inline mr-2" />
                        Travel Style
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {displayUser.travelPreferences?.travelStyle?.map(
                          (style, index) => (
                            <Badge
                              key={index}
                              className="bg-blue-900/50 text-blue-300 border-blue-700/50"
                            >
                              {style}
                            </Badge>
                          )
                        ) || (
                          <span className="text-purple-400 text-sm font-inter-regular">
                            Not specified
                          </span>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-inter-medium text-purple-200 mb-2 block">
                        <Wallet className="h-4 w-4 inline mr-2" />
                        Budget Range
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {displayUser.travelPreferences?.budgetRange?.map(
                          (budget, index) => (
                            <Badge
                              key={index}
                              className="bg-green-900/50 text-green-300 border-green-700/50"
                            >
                              {budget}
                            </Badge>
                          )
                        ) || (
                          <span className="text-purple-400 text-sm font-inter-regular">
                            Not specified
                          </span>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-inter-medium text-purple-200 mb-2 block">
                        <Users className="h-4 w-4 inline mr-2" />
                        Group Size
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {displayUser.travelPreferences?.groupSize?.map(
                          (size, index) => (
                            <Badge
                              key={index}
                              className="bg-orange-900/50 text-orange-300 border-orange-700/50"
                            >
                              {size}
                            </Badge>
                          )
                        ) || (
                          <span className="text-purple-400 text-sm font-inter-regular">
                            Not specified
                          </span>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-inter-medium text-purple-200 mb-2 block">
                        <Calendar className="h-4 w-4 inline mr-2" />
                        Trip Duration
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {displayUser.travelPreferences?.tripDuration?.map(
                          (duration, index) => (
                            <Badge
                              key={index}
                              className="bg-purple-900/50 text-purple-300 border-purple-700/50"
                            >
                              {duration}
                            </Badge>
                          )
                        ) || (
                          <span className="text-purple-400 text-sm font-inter-regular">
                            Not specified
                          </span>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-inter-medium text-purple-200 mb-2 block">
                        <Clock className="h-4 w-4 inline mr-2" />
                        Travel Frequency
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {displayUser.travelPreferences?.travelFrequency?.map(
                          (frequency, index) => (
                            <Badge
                              key={index}
                              className="bg-cyan-900/50 text-cyan-300 border-cyan-700/50"
                            >
                              {frequency}
                            </Badge>
                          )
                        ) || (
                          <span className="text-purple-400 text-sm font-inter-regular">
                            Not specified
                          </span>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-inter-medium text-purple-200 mb-2 block">
                        <Home className="h-4 w-4 inline mr-2" />
                        Accommodation Type
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {displayUser.travelPreferences?.accommodationType?.map(
                          (type, index) => (
                            <Badge
                              key={index}
                              className="bg-pink-900/50 text-pink-300 border-pink-700/50"
                            >
                              {type}
                            </Badge>
                          )
                        ) || (
                          <span className="text-purple-400 text-sm font-inter-regular">
                            Not specified
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label className="text-sm font-inter-medium text-purple-200 mb-2 block">
                        <Car className="h-4 w-4 inline mr-2" />
                        Transportation Preference
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {displayUser.travelPreferences?.transportationPreference?.map(
                          (transport, index) => (
                            <Badge
                              key={index}
                              className="bg-indigo-900/50 text-indigo-300 border-indigo-700/50"
                            >
                              {transport}
                            </Badge>
                          )
                        ) || (
                          <span className="text-purple-400 text-sm font-inter-regular">
                            Not specified
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Interests & Preferences */}
              <div className="bg-zinc-700/30 border border-zinc-400/30 rounded-xl">
                <div className="p-6 border-b border-zinc-400/20">
                  <h3 className="text-xl font-inter-semibold text-purple-100 flex items-center gap-2">
                    <Heart className="h-5 w-5 text-purple-400" />
                    Interests & Preferences
                  </h3>
                </div>
                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-inter-medium text-purple-200 mb-2 block">
                        <Thermometer className="h-4 w-4 inline mr-2" />
                        Climate Preference
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {displayUser.interests?.climatePreference?.map(
                          (climate, index) => (
                            <Badge
                              key={index}
                              className="bg-teal-900/50 text-teal-300 border-teal-700/50"
                            >
                              {climate}
                            </Badge>
                          )
                        ) || (
                          <span className="text-purple-400 text-sm font-inter-regular">
                            Not specified
                          </span>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-inter-medium text-purple-200 mb-2 block">
                        <MapIcon className="h-4 w-4 inline mr-2" />
                        Destination Types
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {displayUser.interests?.destinationTypes?.map(
                          (type, index) => (
                            <Badge
                              key={index}
                              className="bg-emerald-900/50 text-emerald-300 border-emerald-700/50"
                            >
                              {type}
                            </Badge>
                          )
                        ) || (
                          <span className="text-purple-400 text-sm font-inter-regular">
                            Not specified
                          </span>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-inter-medium text-purple-200 mb-2 block">
                        <UtensilsCrossed className="h-4 w-4 inline mr-2" />
                        Cuisine Preferences
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {displayUser.interests?.cuisinePreferences?.map(
                          (cuisine, index) => (
                            <Badge
                              key={index}
                              className="bg-yellow-900/50 text-yellow-300 border-yellow-700/50"
                            >
                              {cuisine}
                            </Badge>
                          )
                        ) || (
                          <span className="text-purple-400 text-sm font-inter-regular">
                            Not specified
                          </span>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-inter-medium text-purple-200 mb-2 block">
                        <Activity className="h-4 w-4 inline mr-2" />
                        Activity Interests
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {displayUser.interests?.activityInterests?.map(
                          (activity, index) => (
                            <Badge
                              key={index}
                              className="bg-red-900/50 text-red-300 border-red-700/50"
                            >
                              {activity}
                            </Badge>
                          )
                        ) || (
                          <span className="text-purple-400 text-sm font-inter-regular">
                            Not specified
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Experience & Background */}
              <div className="bg-zinc-700/30 border border-zinc-400/30 rounded-xl">
                <div className="p-6 border-b border-zinc-400/20">
                  <h3 className="text-xl font-inter-semibold text-purple-100 flex items-center gap-2">
                    <Mountain className="h-5 w-5 text-purple-400" />
                    Experience & Background
                  </h3>
                </div>
                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-inter-medium text-purple-200 mb-2 block">
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
                          className="bg-purple-950/50 border-purple-800/30 text-purple-100"
                          placeholder="e.g., Beginner, Intermediate, Expert"
                        />
                      ) : (
                        <Badge className="bg-purple-900/50 text-purple-300 border-purple-700/50">
                          {displayUser.experience?.travelExperience ||
                            "Not specified"}
                        </Badge>
                      )}
                    </div>

                    <div>
                      <label className="text-sm font-inter-medium text-purple-200 mb-2 block">
                        <Languages className="h-4 w-4 inline mr-2" />
                        Languages
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {displayUser.experience?.languages?.map(
                          (language, index) => (
                            <Badge
                              key={index}
                              className="bg-blue-900/50 text-blue-300 border-blue-700/50"
                            >
                              {language}
                            </Badge>
                          )
                        ) || (
                          <span className="text-purple-400 text-sm font-inter-regular">
                            Not specified
                          </span>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-inter-medium text-purple-200 mb-2 block">
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
                          className="bg-purple-950/50 border-purple-800/30 text-purple-100"
                          placeholder="e.g., 15+ countries"
                        />
                      ) : (
                        <span className="text-purple-100 font-inter-medium">
                          {displayUser.experience?.visitedCountries ||
                            "Not specified"}
                        </span>
                      )}
                    </div>

                    <div>
                      <label className="text-sm font-inter-medium text-purple-200 mb-2 block">
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
                          className="bg-purple-950/50 border-purple-800/30 text-purple-100"
                          placeholder="Places you dream to visit..."
                          rows={3}
                        />
                      ) : (
                        <p className="text-purple-300 font-inter-regular text-sm">
                          {displayUser.experience?.dreamDestinations ||
                            "Not specified"}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Special Requirements */}
              <div className="bg-zinc-700/30 border border-zinc-400/30 rounded-xl">
                <div className="p-6 border-b border-zinc-400/20">
                  <h3 className="text-xl font-inter-semibold text-purple-100 flex items-center gap-2">
                    <Shield className="h-5 w-5 text-purple-400" />
                    Special Requirements
                  </h3>
                </div>
                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-inter-medium text-purple-200 mb-2 block">
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
                          className="bg-purple-950/50 border-purple-800/30 text-purple-100"
                          placeholder="Any accessibility requirements..."
                          rows={2}
                        />
                      ) : (
                        <p className="text-purple-300 font-inter-regular text-sm">
                          {displayUser.specialRequirements?.accessibility ||
                            "None specified"}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="text-sm font-inter-medium text-purple-200 mb-2 block">
                        <Utensils className="h-4 w-4 inline mr-2" />
                        Dietary Restrictions
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {displayUser.specialRequirements?.dietaryRestrictions?.map(
                          (restriction, index) => (
                            <Badge
                              key={index}
                              className="bg-orange-900/50 text-orange-300 border-orange-700/50"
                            >
                              {restriction}
                            </Badge>
                          )
                        ) || (
                          <span className="text-purple-400 text-sm font-inter-regular">
                            None specified
                          </span>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-inter-medium text-purple-200 mb-2 block">
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
                          className="bg-purple-950/50 border-purple-800/30 text-purple-100"
                          placeholder="Photography, wildlife, architecture, etc..."
                          rows={2}
                        />
                      ) : (
                        <p className="text-purple-300 font-inter-regular text-sm">
                          {displayUser.specialRequirements?.specialInterests ||
                            "None specified"}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="text-sm font-inter-medium text-purple-200 mb-2 block">
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
                          className="bg-purple-950/50 border-purple-800/30 text-purple-100"
                          placeholder="Any other important information..."
                          rows={2}
                        />
                      ) : (
                        <p className="text-purple-300 font-inter-regular text-sm">
                          {displayUser.specialRequirements?.additionalNotes ||
                            "None specified"}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Trips Summary */}
              <div className="bg-zinc-700/30 border border-zinc-400/30 rounded-xl">
                <div className="p-6 border-b border-zinc-400/20">
                  <h3 className="text-xl font-inter-semibold text-purple-100 flex items-center gap-2">
                    <Plane className="h-5 w-5 text-purple-400" />
                    Recent Trips
                  </h3>
                </div>
                <div className="p-6">
                  {displayUser.trips && displayUser.trips.length > 0 ? (
                    <div className="space-y-3">
                      <p className="text-purple-200 font-inter-medium">
                        Total Trips: {displayUser.trips.length}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                        {displayUser.trips.slice(0, 6).map((trip, index) => (
                          <div
                            key={index}
                            className="bg-purple-900/30 p-3 rounded-lg border border-purple-700/50"
                          >
                            <Badge className="bg-purple-900/50 text-purple-300 border-purple-700/50 text-xs">
                              Trip #{index + 1}
                            </Badge>
                          </div>
                        ))}
                      </div>
                      {displayUser.trips.length > 6 && (
                        <p className="text-purple-400 text-sm font-inter-regular">
                          +{displayUser.trips.length - 6} more trips
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <Plane className="h-12 w-12 text-purple-400 mx-auto mb-3" />
                      <p className="text-purple-300 font-inter-regular">
                        No trips yet
                      </p>
                      <p className="text-purple-400 text-sm">
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
