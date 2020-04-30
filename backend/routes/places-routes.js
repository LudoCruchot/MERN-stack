import express from "express";
import {
  getPlaceById,
  getPlaceByUserId,
  createPlace,
  updatePlace,
  deletePlace,
} from "../controllers/places-controllers";

const router = express.Router();

router.get("/:placeId", getPlaceById);

router.get("/user/:userId", getPlaceByUserId);

router.post("/", createPlace);

router.patch("/:placeId", updatePlace);

router.delete("/:placeId", deletePlace);

export default router;
