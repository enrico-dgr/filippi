import React from 'react';
import { useNavigate } from 'react-router-native';
import style from './style';
import ButtonBig from 'fe-gui/ButtonBig';
import Card from 'fe-gui/Card';
import routes from 'fe-utils/routes';

const ModeChoice = () => {
	const navigate = useNavigate();
	const onPressOutBack = () => navigate(routes.Home);

	return (
		<>
			<Card></Card>
			<ButtonBig
				onPressOut={onPressOutBack}
				style={style.button}
				text="Back"
			/>
		</>
	);
};

export default ModeChoice;
