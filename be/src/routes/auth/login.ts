// import express from 'express';

// import * as Middlewares from '../../middlewares';

// const router = express.Router();

// router.use(express.json({}));

// /**
//  * @route POST auth/login
//  * @description Login user
//  * @access  Public
//  * @returns
//  * - authToken string on success
//  * - status code and message otherwise
//  */
// const login: express.RequestHandler[] = [
//   ...Middlewares.Auth.Login.default,
//   async (req: express.Request, res: express.Response) => {
//     res.status(200);
//     res.statusMessage = "Login successful";

//     res.json(req.body);
//   },
// ];

// /**
//  * @route POST auth/token
//  * @description Verify token to login user
//  * @access  Public
//  */
// const verifyToken: express.RequestHandler[] = [
//   ...Middlewares.Auth.Tokens.middleware,
//   async (req: express.Request, res: express.Response) => {
//     const decoded = Middlewares.Auth.Tokens.getDecodedDataFromBody(req);

//     res.status(200).json(decoded);
//   },
// ];

// router.post("/login", login);
// router.post("/token", verifyToken);

// export default router;
