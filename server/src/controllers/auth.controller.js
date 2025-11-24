import asyncHandler from "../utils/async-handle.js";
import { auth } from "../config/firebase.config.js";
import generateToken from "../utils/jwt.js";
import User from "../models/user.model.js";
import ApiResponse from "../utils/response.js";
import ApiError from "../utils/error.js";
import {
  validateOnboardingData,
  sanitizeOnboardingData,
} from "../utils/validation.js";

const isProduction = process.env.NODE_ENV === "production";

export const signUp = asyncHandler(async (req, res) => {
  const { idToken } = req.body;
  if (!idToken) {
    throw new ApiError(400, "ID token is required", []);
  }
  const decodedToken = await auth.verifyIdToken(idToken);
  const { email, name, picture } = decodedToken;
  let user = await User.findOne({ email });
  if (!user) {
    user = new User({ email, name, profile: picture });
    await user.save();
  }
  const token = generateToken(user._id);
  res.cookie("token", token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
  });
  return res
    .status(200)
    .json(new ApiResponse(200, { user }, "Signup successful"));
});

export const logout = asyncHandler(async (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({
    success: true,
    data: {},
    message: "Logout successful",
  });
});

export const onBoardUser = asyncHandler(async (req, res) => {
  console.log(
    "Onboarding request received:",
    JSON.stringify(req.body, null, 2)
  );

  try {
    // Sanitize input data
    const sanitizedData = sanitizeOnboardingData(req.body);

    // Validate input data
    validateOnboardingData(sanitizedData);

    const {
      firstName,
      lastName,
      username,
      hometown,
      travelStyle,
      budgetRange,
      groupSize,
      tripDuration,
      travelFrequency,
      accommodationType,
      transportationPreference,
      climatePreference,
      destinationTypes,
      cuisinePreferences,
      activityInterests,
      travelExperience,
      languages,
      visitedCountries,
      dreamDestinations,
      accessibility,
      dietaryRestrictions,
      specialInterests,
      additionalNotes,
    } = sanitizedData;

    // Check if username is already taken by another user
    const existingUser = await User.findOne({
      username,
      _id: { $ne: req.user._id },
    });

    if (existingUser) {
      throw new ApiError(400, "Username is already taken", []);
    }

    // Create comprehensive user profile update
    const updateData = {
      firstName,
      lastName,
      username,
      hometown,
      travelPreferences: {
        travelStyle,
        budgetRange,
        groupSize,
        tripDuration,
        travelFrequency,
        accommodationType,
        transportationPreference,
      },
      interests: {
        climatePreference,
        destinationTypes,
        cuisinePreferences,
        activityInterests,
      },
      experience: {
        travelExperience,
        languages,
        visitedCountries,
        dreamDestinations,
      },
      specialRequirements: {
        accessibility,
        dietaryRestrictions,
        specialInterests,
        additionalNotes,
      },
      onBoarded: true,
    };

    // Update user in database
    const updatedUser = await User.findByIdAndUpdate(req.user._id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      throw new ApiError(404, "User not found", []);
    }

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { user: updatedUser },
          "Onboarding completed successfully"
        )
      );
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(500, "Failed to complete onboarding", [error.message]);
  }
});

export const checkAuth = asyncHandler(async (req, res) => {
  const user = req.user;
  return res.status(200).json({
    success: true,
    data: { user },
    message: "User is authenticated",
  });
});

export const getUserProfile = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-__v");

    if (!user) {
      throw new ApiError(404, "User not found", []);
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, { user }, "User profile retrieved successfully")
      );
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(500, "Failed to retrieve user profile", [error.message]);
  }
});

export const updateUserProfile = asyncHandler(async (req, res) => {
  // Sanitize input data
  const sanitizedData = sanitizeOnboardingData(req.body);

  // Validate input data (excluding required field validation for updates)
  const errors = [];

  // Username format validation if provided
  if (
    sanitizedData.username &&
    !/^[a-zA-Z0-9_]+$/.test(sanitizedData.username)
  ) {
    errors.push("Username can only contain letters, numbers, and underscores");
  }

  // Array fields validation
  const arrayFields = [
    "travelStyle",
    "budgetRange",
    "groupSize",
    "tripDuration",
    "travelFrequency",
    "accommodationType",
    "transportationPreference",
    "climatePreference",
    "destinationTypes",
    "cuisinePreferences",
    "activityInterests",
    "languages",
    "dietaryRestrictions",
  ];

  arrayFields.forEach((field) => {
    if (sanitizedData[field] && !Array.isArray(sanitizedData[field])) {
      errors.push(`${field} must be an array`);
    }
  });

  if (errors.length > 0) {
    throw new ApiError(400, "Validation failed", errors);
  }

  try {
    // Check if username is already taken by another user (if username is being updated)
    if (sanitizedData.username) {
      const existingUser = await User.findOne({
        username: sanitizedData.username,
        _id: { $ne: req.user._id },
      });

      if (existingUser) {
        throw new ApiError(400, "Username is already taken", []);
      }
    }

    // Build update object with only provided fields
    const updateData = {};

    // Basic fields
    if (sanitizedData.firstName) updateData.firstName = sanitizedData.firstName;
    if (sanitizedData.lastName) updateData.lastName = sanitizedData.lastName;
    if (sanitizedData.username) updateData.username = sanitizedData.username;
    if (sanitizedData.hometown) updateData.hometown = sanitizedData.hometown;

    // Travel preferences - only update if any preference is provided
    const travelPrefs = {};
    if (sanitizedData.travelStyle)
      travelPrefs.travelStyle = sanitizedData.travelStyle;
    if (sanitizedData.budgetRange)
      travelPrefs.budgetRange = sanitizedData.budgetRange;
    if (sanitizedData.groupSize)
      travelPrefs.groupSize = sanitizedData.groupSize;
    if (sanitizedData.tripDuration)
      travelPrefs.tripDuration = sanitizedData.tripDuration;
    if (sanitizedData.travelFrequency)
      travelPrefs.travelFrequency = sanitizedData.travelFrequency;
    if (sanitizedData.accommodationType)
      travelPrefs.accommodationType = sanitizedData.accommodationType;
    if (sanitizedData.transportationPreference)
      travelPrefs.transportationPreference =
        sanitizedData.transportationPreference;

    if (Object.keys(travelPrefs).length > 0) {
      updateData.travelPreferences = travelPrefs;
    }

    // Interests - only update if any interest is provided
    const interests = {};
    if (sanitizedData.climatePreference)
      interests.climatePreference = sanitizedData.climatePreference;
    if (sanitizedData.destinationTypes)
      interests.destinationTypes = sanitizedData.destinationTypes;
    if (sanitizedData.cuisinePreferences)
      interests.cuisinePreferences = sanitizedData.cuisinePreferences;
    if (sanitizedData.activityInterests)
      interests.activityInterests = sanitizedData.activityInterests;

    if (Object.keys(interests).length > 0) {
      updateData.interests = interests;
    }

    // Experience - only update if any experience field is provided
    const experience = {};
    if (sanitizedData.travelExperience !== undefined)
      experience.travelExperience = sanitizedData.travelExperience;
    if (sanitizedData.languages) experience.languages = sanitizedData.languages;
    if (sanitizedData.visitedCountries !== undefined)
      experience.visitedCountries = sanitizedData.visitedCountries;
    if (sanitizedData.dreamDestinations !== undefined)
      experience.dreamDestinations = sanitizedData.dreamDestinations;

    if (Object.keys(experience).length > 0) {
      updateData.experience = experience;
    }

    // Special requirements - only update if any requirement is provided
    const specialReqs = {};
    if (sanitizedData.accessibility !== undefined)
      specialReqs.accessibility = sanitizedData.accessibility;
    if (sanitizedData.dietaryRestrictions)
      specialReqs.dietaryRestrictions = sanitizedData.dietaryRestrictions;
    if (sanitizedData.specialInterests !== undefined)
      specialReqs.specialInterests = sanitizedData.specialInterests;
    if (sanitizedData.additionalNotes !== undefined)
      specialReqs.additionalNotes = sanitizedData.additionalNotes;

    if (Object.keys(specialReqs).length > 0) {
      updateData.specialRequirements = specialReqs;
    }

    // Update user in database
    const updatedUser = await User.findByIdAndUpdate(req.user._id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      throw new ApiError(404, "User not found", []);
    }

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { user: updatedUser },
          "Profile updated successfully"
        )
      );
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(500, "Failed to update profile", [error.message]);
  }
});
