import cors from "cors";
import express from "express";

// import login from "./login";
// import register from "./register";

const router = express.Router();

router.use(
	cors({
		// origin: process.env.CLIENT_URL,
	})
);
/**
 * route path: /auth/*
 */
// router.use("/auth", register);
// router.use("/auth", login);

export default router;
