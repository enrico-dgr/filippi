// import bcrypt from "bcrypt";
// import express from "express";
// import * as E from "fp-ts/Either";
// import { pipe } from "fp-ts/function";
// import * as TE from "fp-ts/TaskEither";
// import path from "path";

// import { connection } from "../../db";
// import { Type } from "../../db/types/users";
// import EnvVars from "../../EnvVars";
// import * as Middlewares from "../../middlewares";
// import { VerifyRegistration } from "../../Utils/Auth/tokens";
// import { Transporter } from "../../Utils/Media/mail";

// const User = () => connection.user;

// const router = express.Router();

// router.use(express.json({}));

// /**
//  * @route POST auth/register
//  * @description Register user
//  * @access  Public
//  */
// const add: express.RequestHandler[] = [
// 	...Middlewares.Auth.Register.default,
// 	(req: express.Request, res: express.Response) => {
// 		const { username, email, password }: Type = req.body;

// 		const hashedPassword = (
// 			rawPassword: string
// 		): TE.TaskEither<
// 			Pick<express.Response, "statusCode" | "statusMessage">,
// 			string
// 		> => () =>
// 			bcrypt
// 				.hash(rawPassword, Number(EnvVars.get("BCRYPT_SALT")))
// 				.then((encryptedPassword) => E.right(encryptedPassword))
// 				.catch(() =>
// 					E.left({
// 						statusMessage: "Error while generating personal info.",
// 						statusCode: 500,
// 					})
// 				);

// 		const route = pipe(
// 			hashedPassword(password),
// 			TE.chain((encryptedPassword) =>
// 				User().create({
// 					username,
// 					email,
// 					password: encryptedPassword,
// 				})
// 			),
// 			TE.map((user) => {
// 				const baseUrl =
// 					EnvVars.get("NODE_ENV") === "DEV"
// 						? `http://localhost:${EnvVars.get("SERVER_PORT")}`
// 						: EnvVars.get("SERVER_PUBLIC_URL");

// 				const token = VerifyRegistration.builder();

// 				const encodedToken = token.sign({
// 					_id: user._id,
// 				});

// 				const verificationUrl =
// 					`${baseUrl}/auth/register/verify/` + encodedToken;

// 				Transporter.sendMail({
// 					to: user.email,
// 					subject: "Verify Account",
// 					html: `Click <a href = '${verificationUrl}'>here</a> to confirm your email.`,
// 				});
// 			}),
// 			TE.match(
// 				(l) => res.status(l.statusCode).send(l.statusMessage),
// 				() => res.sendStatus(200)
// 			)
// 		);

// 		return route();
// 	},
// ];

// /**
//  * @route POST auth/register/verify/:verificationToken
//  * @description Verify registration of user account
//  * @access  Public
//  */
// const verify: express.RequestHandler[] = [
// 	async (req: express.Request, res: express.Response) => {
// 		const { verificationToken } = req.params;

// 		if (!verificationToken) {
// 			return res.status(422).send({
// 				message: "Missing Token",
// 			});
// 		}

// 		const validateToken = (
// 			token: string
// 		): TE.TaskEither<
// 			Pick<express.Response, "statusCode" | "statusMessage">,
// 			number
// 		> => {
// 			const tokenController = VerifyRegistration.builder();
// 			const verifiedToken = tokenController.verify(token);

// 			return verifiedToken.tag_ === "Bad"
// 				? TE.left({
// 						statusMessage: "Invalid token",
// 						statusCode: 400,
// 				  })
// 				: TE.right(verifiedToken.decoded._id);
// 		};

// 		const route = pipe(
// 			validateToken(verificationToken),
// 			TE.chain((_id) => User().findById(_id)),
// 			TE.chain((user) =>
// 				user.verified
// 					? TE.left({
// 							statusMessage: "User is already verified.",
// 							statusCode: 400,
// 					  })
// 					: User().update(user._id, {
// 							verified: true,
// 					  })
// 			),
// 			TE.match(
// 				(l) => res.status(l.statusCode).send(l.statusMessage),
// 				() => res.status(200).redirect(EnvVars.get("CLIENT_URL") + "/ps/login")
// 			)
// 		);

// 		return route();
// 	},
// ];

// /**
//  * @route GET auth/register/common
//  * @description Redirect to register/login page
//  * @access  Public
//  */
// const redirectToLogin: express.RequestHandler[] = [
// 	async (_req: express.Request, res: express.Response) => {
// 		res.sendFile(path.resolve(__dirname, "../../../public/docs/index.html"));
// 	},
// ];

// router.post("/register", add);
// router.get("/register/verify/:verificationToken", verify);
// router.get("/register/common", redirectToLogin);

// export default router;
