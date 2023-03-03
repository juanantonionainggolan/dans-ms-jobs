import express from "express";
import { getUsers, Register, Login, Logout } from "../controller/Users.js";
import { getJobs, getJob } from "../controller/Jobs.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controller/RefreshToken.js";

const router = express.Router();

router.get('/users', verifyToken, getUsers);

router.post('/users', Register);

router.post('/login', Login);

router.get('/token', refreshToken);

router.delete('/logout', Logout);

router.get('/jobs', verifyToken, getJobs);

router.get('/job/:id', verifyToken, getJob);


export default router;