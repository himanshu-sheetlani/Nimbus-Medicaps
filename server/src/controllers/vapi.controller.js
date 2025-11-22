import { VapiClient } from "@vapi-ai/server-sdk";
import Trip from "../models/trip.model.js";
import User from "../models/user.model.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

const vapi = new VapiClient({
  token: process.env.VAPI_PRIVATE_KEY,
});

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

// Process transcript with Gemini to extract trip details
const processTranscriptWithGemini = async (transcript) => {
  try {
    const prompt = `
Analyze this travel conversation transcript and extract key trip planning details in JSON format:

Transcript: "${transcript}"

Please extract and return ONLY a valid JSON object with these fields:
{
  "destination": "extracted destination or null",
  "startDate": "extracted start date in YYYY-MM-DD format or null", 
  "endDate": "extracted end date in YYYY-MM-DD format or null",
  "budget": "extracted budget range or null",
  "travelers": "number of travelers or null",
  "preferences": ["array of travel preferences mentioned"],
  "activities": ["array of activities mentioned"],
  "keyPoints": ["3-5 key points from conversation"],
  "tripSummary": "2-3 sentence summary of the planned trip"
}

Return only the JSON object, no other text.
`;

    const result = await model.generateContent(prompt);
    const response = result.response.text();

    // Parse JSON response
    const cleanedResponse = response.replace(/```json|```/g, "").trim();
    const tripData = JSON.parse(cleanedResponse);

    console.log("✨ Gemini processed trip data:", tripData);
    return tripData;
  } catch (error) {
    console.error("❌ Gemini processing error:", error);
    return {
      destination: null,
      startDate: null,
      endDate: null,
      budget: null,
      travelers: null,
      preferences: [],
      activities: [],
      keyPoints: ["Failed to process transcript"],
      tripSummary: "Unable to extract trip details from conversation",
    };
  }
};

export const createOutboundCall = async (req, res) => {
  try {
    const userId = req.user.id;

    const call = await vapi.calls.create({
      phoneNumberId: process.env.VAPI_PHONE_NUMBER_ID,
      customer: {
        number: process.env.VAPI_CUSTOMER_PHONE_NUMBER,
      },
      assistantId: process.env.VAPI_ASSISTANT_ID,
    });

    const trip = new Trip({
      userId: userId,
      callId: call.id,
      phoneNumber: process.env.VAPI_CUSTOMER_PHONE_NUMBER,
      callStatus: "queued",
      assistantId: process.env.VAPI_ASSISTANT_ID,
      phoneNumberId: process.env.VAPI_PHONE_NUMBER_ID,
    });

    await trip.save();

    await User.findByIdAndUpdate(userId, {
      $push: { trips: trip._id },
    });

    console.log("Call initiated successfully. Call ID:", call.id);

    autoFetchTranscript(call.id);

    res.json({
      success: true,
      callId: call.id,
      tripId: trip._id,
      message: "Call initiated successfully",
    });
  } catch (error) {
    console.error("Error creating Vapi call:", error);
    res.status(500).json({
      success: false,
      error: "Failed to create call",
    });
  }
};

export const getCallTranscript = async (req, res) => {
  try {
    const { callId } = req.params;

    const call = await vapi.calls.get(callId);

    res.json({
      success: true,
      callId: call.id,
      transcript: call.transcript || "Transcript not ready yet",
      status: call.status,
    });
  } catch (error) {
    console.error("Error fetching transcript:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch transcript",
    });
  }
};

export const handleVapiWebhook = async (req, res) => {
  try {
    const { type, call } = req.body;

    console.log("Webhook received:", type, "Call ID:", call.id);

    if (type === "call-ended") {
      await Trip.findOneAndUpdate(
        { callId: call.id },
        {
          transcript: call.transcript || "",
          callStatus: call.status,
          callDuration: call.duration || 0,
          updatedAt: new Date(),
        }
      );

      console.log("Trip updated with transcript for call:", call.id);
    }

    res.status(200).send("OK");
  } catch (error) {
    console.error("Webhook error:", error);
    res.status(500).send("Error");
  }
};

export const getUserTrips = async (req, res) => {
  try {
    const userId = req.user.id;

    const trips = await Trip.find({ userId }).sort({ createdAt: -1 });

    res.json({
      success: true,
      trips,
    });
  } catch (error) {
    console.error("Error fetching user trips:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch trips",
    });
  }
};

export const getTripDetails = async (req, res) => {
  try {
    const { tripId } = req.params;
    const userId = req.user.id;

    const trip = await Trip.findOne({ _id: tripId, userId });

    if (!trip) {
      return res.status(404).json({
        success: false,
        error: "Trip not found",
      });
    }

    res.json({
      success: true,
      trip,
    });
  } catch (error) {
    console.error("Error fetching trip details:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch trip details",
    });
  }
};

export const debugTrip = async (req, res) => {
  try {
    const { callId } = req.params;

    const trip = await Trip.findOne({ callId });

    const call = await vapi.calls.get(callId);

    res.json({
      success: true,
      database: trip,
      vapi: {
        id: call.id,
        status: call.status,
        transcript: call.transcript,
        duration: call.duration,
      },
    });
  } catch (error) {
    console.error("Debug error:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const autoFetchTranscript = async (callId) => {
  const delays = [30, 60, 120];

  for (const delay of delays) {
    setTimeout(async () => {
      try {
        const call = await vapi.calls.get(callId);

        if (call.status === "ended" && call.transcript) {
          console.log(
            `🔍 Processing transcript with Gemini for call ${callId}...`
          );

          const geminiData = await processTranscriptWithGemini(call.transcript);

          await Trip.findOneAndUpdate(
            { callId },
            {
              transcript: call.transcript,
              callStatus: call.status,
              callDuration: call.duration || 0,
              tripDetails: {
                destination: geminiData.destination,
                startDate: geminiData.startDate
                  ? new Date(geminiData.startDate)
                  : null,
                endDate: geminiData.endDate
                  ? new Date(geminiData.endDate)
                  : null,
                budget: geminiData.budget,
                travelers: geminiData.travelers,
                preferences: geminiData.preferences || [],
                activities: geminiData.activities || [],
              },
              aiInsights: {
                keyPoints: geminiData.keyPoints || [],
                tripSummary: geminiData.tripSummary || "",
                processedAt: new Date(),
              },
            }
          );
          console.log(
            `✅ Transcript auto-saved with AI insights for call ${callId}`
          );
          return;
        } else {
          console.log(
            `⏳ Call ${callId} status: ${call.status}, waiting for transcript...`
          );
        }
      } catch (error) {
        console.error(`❌ Auto-fetch error for call ${callId}:`, error);
      }
    }, delay * 1000);
  }
};

export const startTranscriptPolling = () => {
  console.log("🔄 Starting background transcript polling...");

  setInterval(async () => {
    try {
      const pendingTrips = await Trip.find({
        transcript: "",
        createdAt: { $lt: new Date(Date.now() - 30000) },
        createdAt: { $gt: new Date(Date.now() - 600000) },
      });

      if (pendingTrips.length > 0) {
        console.log(
          `📋 Found ${pendingTrips.length} pending transcripts to check`
        );
      }

      for (const trip of pendingTrips) {
        try {
          const call = await vapi.calls.get(trip.callId);

          if (call.status === "ended" && call.transcript) {
            console.log(
              `🔍 Background job processing transcript with Gemini for ${trip.callId}...`
            );

            const geminiData = await processTranscriptWithGemini(
              call.transcript
            );

            await Trip.findByIdAndUpdate(trip._id, {
              transcript: call.transcript,
              callStatus: call.status,
              callDuration: call.duration || 0,
              tripDetails: {
                destination: geminiData.destination,
                startDate: geminiData.startDate
                  ? new Date(geminiData.startDate)
                  : null,
                endDate: geminiData.endDate
                  ? new Date(geminiData.endDate)
                  : null,
                budget: geminiData.budget,
                travelers: geminiData.travelers,
                preferences: geminiData.preferences || [],
                activities: geminiData.activities || [],
              },

              aiInsights: {
                keyPoints: geminiData.keyPoints || [],
                tripSummary: geminiData.tripSummary || "",
                processedAt: new Date(),
              },
            });
            console.log(
              `✅ Background job saved transcript with AI insights for ${trip.callId}`
            );
          }
        } catch (error) {
          console.error(
            `❌ Failed to fetch transcript for ${trip.callId}:`,
            error
          );
        }
      }
    } catch (error) {
      console.error("❌ Background polling error:", error);
    }
  }, 60000);
};

export const getTripInsights = async (req, res) => {
  try {
    const { tripId } = req.params;
    const userId = req.user.id;

    const trip = await Trip.findOne({ _id: tripId, userId }).select(
      "tripDetails aiInsights callDuration createdAt -transcript"
    );

    if (!trip) {
      return res.status(404).json({
        success: false,
        error: "Trip not found",
      });
    }

    res.json({
      success: true,
      insights: {
        tripDetails: trip.tripDetails,
        aiInsights: trip.aiInsights,
        callDuration: trip.callDuration,
        createdAt: trip.createdAt,
      },
    });
  } catch (error) {
    console.error("Error fetching trip insights:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch trip insights",
    });
  }
};
