import { Router } from "express";
import {
    addParticipant,
    getAllParticipants,
    getAllDetails,
    getDetailsByEmail,
    getWorkByEmail,
    getHomeByEmail,
    updateParticipant,
    deleteParticipant
} from "../controllers/participantController.js";

const router = Router();

// Add a new participant
router.post("/add", addParticipant);

// get all participants with full details
router.get("/", getAllParticipants);

// get all participants' names and email
router.get("/details", getAllDetails);

// get personal details of a specific participant
router.get("/details/:email", getDetailsByEmail);

// get work details of a specific participant
router.get("/work/:email", getWorkByEmail);

// get home details of a specific participant
router.get("/home/:email", getHomeByEmail);

// update a specific participant
router.put("/:email", updateParticipant);

// delete a specific participant
router.delete("/:email", deleteParticipant);

export default router;