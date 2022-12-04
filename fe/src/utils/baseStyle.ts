import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	heading: {
		fontFamily: 'Bitter-Regular',
		fontSize: 20,
		letterSpacing: 3,
	},
	paragraph: {
		fontFamily: 'Open-Sans-Regular',
		fontSize: 16,
		letterSpacing: 1,
	},
	paragraphLarge: {
		fontFamily: 'Open-Sans-Regular',
		fontSize: 20,
		letterSpacing: 1,
	},
	modalWrapper: {
		flexDirection: 'column',
		position: 'absolute',
		left: 0,
		right: 0,
		height: '100%',
		width: '100%',
    zIndex: 20
	},
});
