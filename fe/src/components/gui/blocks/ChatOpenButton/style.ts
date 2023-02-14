import palette from 'fe-utils/palette';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	notification: {
		backgroundColor: palette['tall-poppy'].hex,
		borderRadius: 6.2,
		position: 'absolute',
		left: 22,
		top: 22,
		height: 12,
		width: 12,
	},
});
