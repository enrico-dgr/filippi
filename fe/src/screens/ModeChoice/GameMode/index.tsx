import React, { useMemo } from 'react';
import { View, Text, GestureResponderEvent } from 'react-native';
import Card from 'fe-gui/Card';
import style from './style';
import { Ionicons } from '@expo/vector-icons';
import { palette } from 'fe-utils/colors';
import CardButton from './CardButton';

type Props = {
	name: string;
	actions: {
		text: string;
		onPressOut?: (event: GestureResponderEvent) => void;
	}[];
};

const GameMode = ({ name, actions }: Props) => {
	const buttons = useMemo(
		() =>
			actions.map((a, i) => (
				<CardButton
					key={'gameChoiceBtn' + name + i}
					onPressOut={a.onPressOut}
					marginLeft={i === 0 ? 20 : 0}
					text={a.text}
				/>
			)),
		[]
	);

	return (
		<View style={style.container}>
			<Card style={style.card} />
			<View style={style.header}>
				<View style={{ width: 5 }}></View>
				<Text style={style.text}>{name}</Text>
				<Ionicons
					name="arrow-redo"
					size={30}
					color={palette.java.hex}
				/>
			</View>
			<View style={style.buttonsContainer}>{buttons}</View>
		</View>
	);
};

export default GameMode;
