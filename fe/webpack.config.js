const createExpoWebpackConfigAsync = require('@expo/webpack-config');
const generateAlias = require('./scripts/generateWebpackAlias');

module.exports = async function (env, argv) {
	const config = await createExpoWebpackConfigAsync(env, argv);

	const alias = generateAlias();

	Object.assign(config.resolve.alias, alias);

	return config;
};
