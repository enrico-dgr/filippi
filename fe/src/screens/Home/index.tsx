import React from 'react';
import style from './style';
import { View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Settings from 'fe-gui/Settings';
import { palette } from 'fe-utils/colors';
import Username from './Username';
import { Outlet } from 'react-router-native';

const Home = () => {
	return (
		<LinearGradient
			colors={[palette.affair.hex, 'black']}
			start={{ x: 0.5, y: -0.1 }}
			end={{ x: 0.6, y: 0.75 }}
			style={{ height: '100%' }}
		>
			<View style={style.container}>
				<Settings />
				<Username />
				<Outlet />
			</View>
		</LinearGradient>
	);
};

export default Home;
