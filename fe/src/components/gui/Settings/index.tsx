import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';
import style from './style';
import palette from 'fe-utils/palette';

const Settings = () => {
	return (
		<View style={style.container}>
			<Ionicons
				name="ios-settings-sharp"
				size={35}
				color={palette.deco.hex}
			/>
		</View>
	);
};

export default Settings;
