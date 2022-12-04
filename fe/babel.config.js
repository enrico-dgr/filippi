const generateAlias = require('./scripts/generateBabelAlias');

const alias = generateAlias();

module.exports = function (api) {
	api.cache(true);
	return {
		presets: ['babel-preset-expo'],
		plugins: [
			[
				'module-resolver',
				{
					root: ['.'],
					alias,
				},
			],
		],
	};
};
