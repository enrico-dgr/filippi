import { palette } from 'fe-utils/colors';
import { StyleSheet } from 'react-native';

const height = 210;
const width = 210;

export default StyleSheet.create({
	buttonsContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'center',
		justifyContent: 'flex-start',
		marginLeft: 15,
	},
	card: {
		borderWidth: 1,
		height,
		width,
		position: 'absolute',
		left: 0,
		top: 0,
	},
	cardButton: {
		borderWidth: 1,
		height: 60,
		width: 60,
		marginRight: 20,
		marginBottom: 10,
	},
	cardButtonContent: {
		flexDirection: 'column',
		justifyContent: 'center',
	},
	cardButtonText: {
		color: palette.deco.hex,
		textAlign: 'center',
	},
	container: {
		flexDirection: 'column',
		alignItems: 'center',
		marginRight: 40,
		height,
		width,
	},
	header: {
		flexDirection: 'row',
		alignItems: 'baseline',
		justifyContent: 'space-between',
		marginTop: 6,
		marginBottom: 20,
		marginLeft: 50,
		paddingHorizontal: 12,
		width: '100%',
	},
	text: {
		color: palette.deco.hex,
		fontFamily: 'Bitter-Regular',
		fontSize: 20,
		letterSpacing: 6,
	},
});
