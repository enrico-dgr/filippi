import React from 'react';
import style from './style';
import { View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Settings from 'fe-gui/Settings';
import { palette } from 'fe-utils/colors';
import Username from './Username';
import ButtonBig from 'fe-gui/ButtonBig';

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
				<View style={style.buttonsContainer}>
					<ButtonBig text="Book" style={style.button} />
					<ButtonBig text="Play" style={style.button} />
				</View>
			</View>
		</LinearGradient>
	);
};

export default Home;
