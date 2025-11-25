import { useState } from "react";
import {
  User,
  MapPin,
  Calendar,
  Heart,
  DollarSign,
  Camera,
  Mountain,
  Utensils,
  Users,
  Clock,
  Languages,
  Plane,
  ChevronRight,
  ChevronLeft,
  Check,
  Coffee,
  Sun,
  Home,
  Car,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuthStore } from "@/stores/useAuthStore";
import { toast } from "sonner";

const Board = () => {
  const { onBoardUser } = useAuthStore();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Info
    firstName: "",
    lastName: "",
    username: "",
    hometown: "",

    // Travel Preferences
    travelStyle: [],
    budgetRange: [],
    groupSize: [],
    tripDuration: [],
    travelFrequency: [],
    accommodationType: [],
    transportationPreference: [],

    // Interests & Preferences
    climatePreference: [],
    destinationTypes: [],
    cuisinePreferences: [],
    activityInterests: [],

    // Travel Experience
    travelExperience: "",
    languages: [],
    visitedCountries: "",
    dreamDestinations: "",

    // Special Requirements
    accessibility: "",
    dietaryRestrictions: [],
    specialInterests: "",
    additionalNotes: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMultiSelect = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((item) => item !== value)
        : [...prev[field], value],
    }));
  };

  const MultiSelectField = ({
    field,
    options,
    label,
    placeholder,
    icon: Icon,
  }) => (
    <div>
      <label className="block text-sm font-medium text-foreground mb-3">
        {label}
      </label>
      <div className="grid grid-cols-2 gap-3">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => handleMultiSelect(field, option)}
            className={`p-3 rounded-lg border transition-colors text-sm ${
              formData[field].includes(option)
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-card border-border text-foreground hover:border-accent"
            }`}
          >
            <div className="flex items-center gap-2">
              {Icon && <Icon className="h-4 w-4" />}
              {option}
            </div>
          </button>
        ))}
      </div>
      {formData[field].length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {formData[field].map((item) => (
            <span
              key={item}
              className="px-3 py-1 bg-white/10 text-white text-xs rounded-full flex items-center gap-1"
            >
              {item}
              <button
                type="button"
                onClick={() => handleMultiSelect(field, item)}
                className="hover:text-red-400"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );

  const handleNext = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    try {
      // Validate required fields
      if (!formData.firstName || !formData.lastName || !formData.username) {
        toast.error("Please fill in all required fields");
        return;
      }

      await onBoardUser(formData);
      // On success, the store will show a success toast and user will be redirected via route guards
    } catch (error) {
      console.error("Onboarding failed:", error);
      // Error toast is handled in the store
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <User className="h-12 w-12 text-white mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">
          Personal Information
        </h2>
        <p className="text-zinc-400">Tell us about yourself</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">
            First Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-zinc-500" />
            <Input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="First name"
              className="pl-10 bg-zinc-800/50 border-zinc-700 text-white placeholder-zinc-500 focus:border-white focus:ring-white/20 py-6"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">
            Last Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-zinc-500" />
            <Input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Last name"
              className="pl-10 bg-zinc-800/50 border-zinc-700 text-white placeholder-zinc-500 focus:border-white focus:ring-white/20 py-6"
              required
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-zinc-300 mb-2">
          Username
        </label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-zinc-500" />
          <Input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            placeholder="Choose a unique username"
            className="pl-10 bg-zinc-800/50 border-zinc-700 text-white placeholder-zinc-500 focus:border-white focus:ring-white/20 py-6"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-zinc-300 mb-2">
          Hometown
        </label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-zinc-500" />
          <Input
            type="text"
            name="hometown"
            value={formData.hometown}
            onChange={handleInputChange}
            placeholder="Where are you from?"
            className="pl-10 bg-zinc-800/50 border-zinc-700 text-white placeholder-zinc-500 focus:border-white focus:ring-white/20 py-6"
            required
          />
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <Plane className="h-12 w-12 text-white mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">
          Travel Style & Preferences
        </h2>
        <p className="text-zinc-400">How do you like to travel?</p>
      </div>

      <MultiSelectField
        field="travelStyle"
        options={[
          "Adventure",
          "Luxury",
          "Budget",
          "Cultural",
          "Relaxation",
          "Business",
          "Backpacking",
          "Photography",
          "Wildlife",
          "Romantic",
        ]}
        label="Travel Style (Select all that apply)"
        icon={Plane}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MultiSelectField
          field="accommodationType"
          options={[
            "Hotels",
            "Hostels",
            "Airbnb/Rentals",
            "Resorts",
            "Boutique Hotels",
            "Camping",
            "Luxury Lodges",
            "Guesthouses",
          ]}
          label="Accommodation Preferences"
          icon={Home}
        />

        <MultiSelectField
          field="transportationPreference"
          options={[
            "Flying",
            "Road Trips",
            "Train Travel",
            "Cruises",
            "Public Transport",
            "Rental Cars",
            "Walking/Cycling",
            "Private Transport",
          ]}
          label="Transportation Preferences"
          icon={Car}
        />
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <Heart className="h-12 w-12 text-white mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">
          Interests & Preferences
        </h2>
        <p className="text-zinc-400">What do you love most about traveling?</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-zinc-300 mb-3">
          Climate Preferences (Select multiple)
        </label>
        <div className="grid grid-cols-3 gap-3">
          {[
            { id: "tropical", label: "Tropical", icon: Sun },
            { id: "desert", label: "Desert", icon: Sun },
            { id: "mountain", label: "Mountain", icon: Mountain },
            { id: "coastal", label: "Coastal", icon: Sun },
            { id: "temperate", label: "Temperate", icon: Mountain },
            { id: "cold", label: "Cold", icon: Mountain },
          ].map((climate) => {
            const Icon = climate.icon;
            return (
              <button
                key={climate.id}
                type="button"
                onClick={() =>
                  handleMultiSelect("climatePreference", climate.id)
                }
                className={`p-3 rounded-lg border transition-colors text-sm flex items-center space-x-2 ${
                  formData.climatePreference.includes(climate.id)
                    ? "bg-white text-black border-white"
                    : "bg-zinc-800/50 border-zinc-700 text-zinc-300 hover:border-zinc-600"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{climate.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-zinc-300 mb-3">
          Destination Types (Select multiple)
        </label>
        <div className="grid grid-cols-2 gap-3">
          {[
            { id: "beaches", label: "Beaches & Coastal", icon: Sun },
            { id: "cities", label: "Cities & Urban", icon: MapPin },
            { id: "mountains", label: "Mountains & Nature", icon: Mountain },
            { id: "historical", label: "Historical Sites", icon: Camera },
            { id: "countryside", label: "Countryside", icon: Mountain },
            { id: "islands", label: "Islands", icon: Sun },
          ].map((destination) => {
            const Icon = destination.icon;
            return (
              <button
                key={destination.id}
                type="button"
                onClick={() =>
                  handleMultiSelect("destinationTypes", destination.id)
                }
                className={`p-4 rounded-lg border transition-colors text-sm flex items-center space-x-2 ${
                  formData.destinationTypes.includes(destination.id)
                    ? "bg-white text-black border-white"
                    : "bg-zinc-800/50 border-zinc-700 text-zinc-300 hover:border-zinc-600"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{destination.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-zinc-300 mb-3">
          Activity Interests (Select multiple)
        </label>
        <div className="grid grid-cols-2 gap-3">
          {[
            { id: "sightseeing", label: "Sightseeing", icon: Camera },
            { id: "adventure", label: "Adventure Sports", icon: Mountain },
            { id: "cultural", label: "Cultural Tours", icon: MapPin },
            { id: "food", label: "Food Tours", icon: Utensils },
            { id: "photography", label: "Photography", icon: Camera },
            { id: "shopping", label: "Shopping", icon: MapPin },
            { id: "nightlife", label: "Nightlife", icon: Coffee },
            { id: "wellness", label: "Wellness/Spa", icon: Heart },
          ].map((activity) => {
            const Icon = activity.icon;
            return (
              <button
                key={activity.id}
                type="button"
                onClick={() =>
                  handleMultiSelect("activityInterests", activity.id)
                }
                className={`p-3 rounded-lg border transition-colors text-sm flex items-center space-x-2 ${
                  formData.activityInterests.includes(activity.id)
                    ? "bg-white text-black border-white"
                    : "bg-zinc-800/50 border-zinc-700 text-zinc-300 hover:border-zinc-600"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{activity.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-zinc-300 mb-3">
          Cuisine Preferences (Select multiple)
        </label>
        <div className="grid grid-cols-2 gap-3">
          {[
            "Local Street Food",
            "Fine Dining",
            "Vegetarian",
            "Seafood",
            "International",
            "Traditional",
            "Fusion",
            "Organic",
          ].map((cuisine) => (
            <button
              key={cuisine}
              type="button"
              onClick={() => handleMultiSelect("cuisinePreferences", cuisine)}
              className={`p-3 rounded-lg border transition-colors text-sm flex items-center space-x-2 ${
                formData.cuisinePreferences.includes(cuisine)
                  ? "bg-white text-black border-white"
                  : "bg-zinc-800/50 border-zinc-700 text-zinc-300 hover:border-zinc-600"
              }`}
            >
              <Utensils className="w-4 h-4" />
              <span>{cuisine}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <Mountain className="h-12 w-12 text-white mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">
          Travel Experience & More
        </h2>
        <p className="text-zinc-400">Help us personalize your experience</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-zinc-300 mb-3">
          Languages Spoken (Select multiple)
        </label>
        <div className="grid grid-cols-2 gap-3">
          {[
            "English",
            "Spanish",
            "French",
            "German",
            "Italian",
            "Portuguese",
            "Chinese",
            "Japanese",
            "Arabic",
            "Hindi",
            "Other",
          ].map((language) => (
            <button
              key={language}
              type="button"
              onClick={() => handleMultiSelect("languages", language)}
              className={`p-3 rounded-lg border transition-colors text-sm flex items-center space-x-2 ${
                formData.languages.includes(language)
                  ? "bg-white text-black border-white"
                  : "bg-zinc-800/50 border-zinc-700 text-zinc-300 hover:border-zinc-600"
              }`}
            >
              <Languages className="w-4 h-4" />
              <span>{language}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-zinc-300 mb-2">
          Special Interests & Notes (Optional)
        </label>
        <Textarea
          name="additionalNotes"
          value={formData.additionalNotes}
          onChange={handleInputChange}
          placeholder="Any specific interests, accessibility needs, dietary restrictions, or other notes you'd like us to know about your travel preferences?"
          className="bg-zinc-800/50 border-zinc-700 text-white placeholder-zinc-500 focus:border-white focus:ring-white/20 min-h-24 resize-none"
          rows={4}
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen w-full bg-black relative overflow-hidden flex items-center justify-center py-8">
      {/* Background Gradient */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(125% 125% at 50% 10%, #000000 40%, #111111 100%)",
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-2xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome to Your Travel Journey
          </h1>
          <p className="text-zinc-400">
            Let's personalize your travel experience
          </p>
        </div>

        {/* Enhanced Step Indicator */}
        <div className="mb-8">
          <div className="flex justify-center mb-4">
            <div className="flex space-x-4">
              {[
                { step: 1, label: "Personal", icon: User },
                { step: 2, label: "Travel Style", icon: Plane },
                { step: 3, label: "Preferences", icon: Heart },
                { step: 4, label: "Experience", icon: Mountain },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.step} className="flex items-center">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                          item.step <= currentStep
                            ? "bg-white text-black"
                            : "bg-zinc-800 text-zinc-400 border border-zinc-700"
                        }`}
                      >
                        {item.step < currentStep ? (
                          <Check className="w-5 h-5" />
                        ) : (
                          <Icon className="w-5 h-5" />
                        )}
                      </div>
                      <span
                        className={`text-xs mt-2 ${
                          item.step <= currentStep
                            ? "text-white"
                            : "text-zinc-500"
                        }`}
                      >
                        {item.label}
                      </span>
                    </div>
                    {item.step < 4 && (
                      <div
                        className={`w-8 h-0.5 mx-3 mt-5 ${
                          item.step < currentStep ? "bg-white" : "bg-zinc-700"
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="flex justify-between text-sm text-zinc-400 mb-2">
            <span>Step {currentStep} of 4</span>
            <span>{Math.round((currentStep / 4) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-zinc-800 rounded-full h-2">
            <div
              className="bg-white h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* Onboarding Card */}
        <div className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-2xl p-8 shadow-2xl">
          {/* Step Content */}
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <Button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              variant="outline"
              className="bg-zinc-800/50 border-zinc-700 text-white hover:bg-zinc-700/50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            {currentStep < 4 ? (
              <Button
                onClick={handleNext}
                className="bg-white text-black hover:bg-gray-200 px-8"
              >
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                className="bg-white text-black hover:bg-gray-200 px-8"
              >
                Complete Onboarding
                <Check className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Board;
