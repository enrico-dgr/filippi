type Color = {
	hex: string;
	r: number;
	g: number;
	b: number;
	getRgba: (alpha: number) => string;
};

const defaults: Pick<Color, 'getRgba' | 'hex'> = {
	hex: '#000000',
	getRgba: () => 'rgba(0, 0, 0, 1)',
};

const colorHandler = {
	get(obj: Color, prop: keyof Color) {
		let res = undefined;

		// this function doesn't keep count of numbers outside
		// color intervals.
		const primToHex = (primitiveColor: number) => {
			const nToHex = (n: number) =>
				n < 10
					? n + ''
					: String.fromCharCode('a'.charCodeAt(0) + n - 10);

			const division = primitiveColor / 16;
			const integer = Math.trunc(division);
			const decimal = division - integer;

			return nToHex(integer) + nToHex(decimal * 16);
		};

		if (prop === 'getRgba') {
			res = function (alpha: number) {
				return `rgba(${obj.r}, ${obj.g}, ${obj.b}, ${alpha ?? 1})`;
			};
		} else if (prop === 'hex') {
			res = '#' + primToHex(obj.r) + primToHex(obj.g) + primToHex(obj.b);
		} else if (prop in obj) {
			res = obj[prop];
		}

		return res;
	},
};

export default {
	affair: new Proxy({ r: 99, g: 64, b: 128, ...defaults }, colorHandler),
	black: new Proxy({ r: 0, g: 0, b: 0, ...defaults }, colorHandler),
	'fuchsia-pink': new Proxy(
		{ r: 176, g: 55, b: 176, ...defaults },
		colorHandler
	),
	deco: new Proxy({ r: 221, g: 221, b: 152, ...defaults }, colorHandler),
	java: new Proxy({ r: 25, g: 176, b: 182, ...defaults }, colorHandler),
	'tall-poppy': new Proxy(
		{ r: 183, g: 42, b: 50, ...defaults },
		colorHandler
	),
};
