import express from "express";
import {
    getUser,
    getUserFriend,
    addRemoveFriend
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
// Get a user by ID
router.get("/:id", verifyToken, getUser);

// Get a user's friends by ID
router.get("/:id/friends", verifyToken, getUserFriend);

/* UPDATE */
// Add or remove a friend for a user by their IDs
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

export default router;
