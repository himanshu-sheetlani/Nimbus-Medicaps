import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    username: { type: String, unique: true, sparse: true },
    email: { type: String, required: true, unique: true },
    profile: { type: String },
    hometown: { type: String },
    onBoarded: { type: Boolean, default: false },

    travelPreferences: {
      travelStyle: [{ type: String }],
      budgetRange: [{ type: String }],
      groupSize: [{ type: String }],
      tripDuration: [{ type: String }],
      travelFrequency: [{ type: String }],
      accommodationType: [{ type: String }],
      transportationPreference: [{ type: String }],
    },

    interests: {
      climatePreference: [{ type: String }],
      destinationTypes: [{ type: String }],
      cuisinePreferences: [{ type: String }],
      activityInterests: [{ type: String }],
    },

    experience: {
      travelExperience: { type: String },
      languages: [{ type: String }],
      visitedCountries: { type: String },
      dreamDestinations: { type: String },
    },

    specialRequirements: {
      accessibility: { type: String },
      dietaryRestrictions: [{ type: String }],
      specialInterests: { type: String },
      additionalNotes: { type: String },
    },

    trips: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Trip",
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
