import express from "express";
import {
  getPlaceById,
  getPlaceByUserId,
  createPlace,
} from "../controllers/places-controllers";

const router = express.Router();

router.get("/:placeId", getPlaceById);

router.get("/user/:userId", getPlaceByUserId);

router.post("/", createPlace);

export default router;
