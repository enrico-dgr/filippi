var path = require('path');
var tsconfig = require('../tsconfig.json');

var alias = {};
var paths = tsconfig.compilerOptions.paths;

/**
 * Takes `tsconfig.compilerOptions.paths` object and creates a new object
 * with mapped keys
 * @example
 * { "controllers/*": ["src/.../controllers/*"] }
 * // becomes
 * { "controllers": "absolute/path/to/controllers" }
 */
module.exports = function () {
	for (var newAlias in paths) {
		if (Object.hasOwnProperty.call(paths, newAlias)) {
      // "controllers/*" => "controllers"
			var key = newAlias.replace('/*', '');

      // ["src/.../controllers/*"] => "./src/.../controllers"
      alias[key] = './' + paths[newAlias][0].replace('/*', '');
		}
	}

  return alias;
};
