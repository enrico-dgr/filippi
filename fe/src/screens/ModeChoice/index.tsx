import React from 'react';
import { useNavigate } from 'react-router-native';
import style from './style';
import ButtonBig from 'fe-gui/ButtonBig';
import routes from 'fe-utils/routes';
import { ScrollView } from 'react-native';
import GameMode from './GameMode';

const ModeChoice = () => {
	const navigate = useNavigate();
	const onPressOutBack = () => navigate(routes.Home);

	return (
		<>
			<ScrollView
				horizontal
				contentContainerStyle={style.scrollViewContent}
				style={style.scrollView}
				showsHorizontalScrollIndicator={false}
			>
				<GameMode />
				<GameMode />
				<GameMode />
				<GameMode />
			</ScrollView>
			<ButtonBig
				onPressOut={onPressOutBack}
				style={style.button}
				text="Back"
			/>
		</>
	);
};

export default ModeChoice;
