import express from "express";
import { getUsers, Register, Login, Logout } from "../controller/Users.js";
import { getJobs } from "../controller/Jobs.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controller/RefreshToken.js";

const router = express.Router();

router.get('/users', verifyToken, getUsers);

router.post('/users', Register);

router.post('/login', Login);

router.get('/token', refreshToken);

router.delete('/logout', Logout);

router.get('/jobs', getJobs);


export default router;