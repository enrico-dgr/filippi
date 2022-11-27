export const palette = {
	affair: {
		hex: '#634080',
	},
	black: {
		hex: '#000000',
	},
	'fuchsia-pink': {
		hex: '#b037b0',
		getRgba: (alpha?: number) => `rgba(176, 55, 176, ${alpha ?? 1})`,
	},
	deco: {
		hex: '#dddd9b',
		getRgba: (alpha?: number) => `rgba(221, 221, 152, ${alpha ?? 1})`,
	},
	java: {
		hex: '#19b0b6',
		getRgba: (alpha?: number) => `rgba(25, 176, 182, ${alpha ?? 1})`,
	},
};
