enum Variables {
	CLIENT_URL = "CLIENT_URL",
	NODE_ENV = "NODE_ENV",
	SERVER_PORT = "SERVER_PORT",
	SERVER_PUBLIC_URL = "SERVER_PUBLIC_URL",
}

/**
 * @description
 * - "NODE_ENV" -> "DEV" | "PROD" | undefined
 * -
 */
const get_ = (variable: keyof typeof Variables): string | undefined => {
	switch (variable) {
		case "CLIENT_URL":
			return process.env[Variables.CLIENT_URL];

		case "NODE_ENV":
			const env = process.env.NODE_ENV;
			if (env !== "DEV" && env !== "PROD") {
				console.error('Env must be "DEV" or "PROD"');
				return undefined;
			}

			return env;

		case "SERVER_PORT":
			return process.env[Variables.SERVER_PORT];

		case "SERVER_PUBLIC_URL":
			return process.env[Variables.SERVER_PUBLIC_URL];
	}
};

/**
 * @description
 * - "NODE_ENV" -> "DEV" | "PROD"
 * -
 * @returns expected variable value or "Environment error"
 */
const get = (variable: keyof typeof Variables): string => {
	const envVar = get_(variable);

	if (envVar === undefined) {
		return "Environment error";
	}

	return envVar;
};

export default { get };
