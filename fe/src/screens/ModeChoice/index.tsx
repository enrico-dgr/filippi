import React from 'react';
import { useNavigate } from 'react-router-native';
import style from './style';
import ButtonBig from 'fe-gui/ButtonBig';
import routes from 'fe-utils/routes';
import Select from 'fe-gui/Select';
import GameMode from 'fe-gui/GameMode';
import { useAppSelector } from 'fe-redux/index';
import Item from './Item';

const ModeChoice = () => {
	const navigate = useNavigate();
	const onPressOutBack = () => navigate(routes.Home);
	const { name, description } = useAppSelector((s) => s.modeChoice);

	return (
		<>
			<Select
				map={Item}
				items={[{ name: 'Filippemy' }]}
				contentContainerStyle={style.scrollViewContent}
				style={style.scrollView}
				showsVerticalScrollIndicator={false}
			/>
			<ButtonBig
				onPressOut={onPressOutBack}
				style={style.button}
				text="Back"
			/>
			{name && <GameMode title={name} description={description} />}
		</>
	);
};

export default ModeChoice;
