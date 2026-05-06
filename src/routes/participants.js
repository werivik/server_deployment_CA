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

router.post("/add", addParticipant);
router.get("/", getAllParticipants);
router.get("/details", getAllDetails);
router.get("/details/:email", getDetailsByEmail);
router.get("/work/:email", getWorkByEmail);
router.get("/home/:email", getHomeByEmail);
router.put("/:email", updateParticipant);
router.delete("/:email", deleteParticipant);

export default router;