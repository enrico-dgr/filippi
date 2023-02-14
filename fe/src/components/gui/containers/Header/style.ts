import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	header: {
		width: '100%',
		display: 'flex',
    flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
    paddingHorizontal: 25,
	},
	side: {
		display: 'flex',
    flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around',
	},
});
