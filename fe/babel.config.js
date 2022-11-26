const generateAlias = require('./scripts/generateBabelAlias');

module.exports = function (api) {
	api.cache(true);
	return {
		presets: ['babel-preset-expo'],
		plugins: [
			[
				'module-resolver',
				{
					root: ['.'],
					alias: generateAlias(),
				},
			],
		],
	};
};
