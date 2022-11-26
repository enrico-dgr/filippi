const createExpoWebpackConfigAsync = require('@expo/webpack-config');
const generateAlias = require('./scripts/generateWebpackAlias');


module.exports = async function (env, argv) {
	const config = await createExpoWebpackConfigAsync(env, argv);

	Object.assign(config.resolve.alias, generateAlias());

	return config;
};
