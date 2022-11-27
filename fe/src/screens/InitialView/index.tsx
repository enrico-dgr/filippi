import React from 'react';
import { View } from 'react-native';
import style from './style';
import ButtonBig from 'fe-gui/ButtonBig';
import { useNavigate } from 'react-router-native';
import routes from 'fe-utils/routes';

const InitialView = () => {
	const navigate = useNavigate();
	const onPressOutPlay = () => navigate(routes.ModeChoice);

	return (
		<View style={style.buttonsContainer}>
			<ButtonBig text="Book" style={style.button} />
			<ButtonBig
				text="Play"
				style={style.button}
				onPressOut={onPressOutPlay}
			/>
		</View>
	);
};

export default InitialView;
