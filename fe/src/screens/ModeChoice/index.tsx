import React from 'react';
import { useNavigate } from 'react-router-native';
import style from './style';
import ButtonBig from 'fe-gui/ButtonBig';
import routes from 'fe-utils/routes';
import Select from 'fe-gui/Select';
import { Text } from 'react-native';
import GameMode from 'fe-gui/GameMode';

const ModeChoice = () => {
	const navigate = useNavigate();
	const onPressOutBack = () => navigate(routes.Home);

	return (
		<>
			<Select
				map={({ name }) => <Text>{name}</Text>}
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
			<GameMode
				title="Filippemy"
				description="A long description. A long description. A long description. A long description. A long description. A long description. A long description. A long description. A long description. A long description. A long description. A long description. A long description. A long description. A long description. A long description. "
			/>
		</>
	);
};

export default ModeChoice;
