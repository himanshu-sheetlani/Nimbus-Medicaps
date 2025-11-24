import express from "express";
import { getPersonalizedRecommendations } from "../controllers/recommendation.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", authenticate, getPersonalizedRecommendations);

export default router;
