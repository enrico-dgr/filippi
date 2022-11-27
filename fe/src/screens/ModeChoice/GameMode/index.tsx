import React from 'react';
import { View, Text } from 'react-native';
import style from './style';
import Card from 'fe-gui/Card';
import { Ionicons } from '@expo/vector-icons';
import { palette } from 'fe-utils/colors';

const GameMode = () => {
	return (
		<View style={style.container}>
			<Card style={style.card} />
			<View style={style.header}>
				<View style={{ width: 25 }}></View>
				<Text style={style.text}>Title</Text>
				<Ionicons
					name="arrow-redo"
					size={30}
					color={palette.java.hex}
				/>
			</View>
			<View style={style.buttonsContainer}>
				<Card
					reverse
					style={{ ...style.cardButton, marginLeft: 20 }}
				></Card>
				<Card reverse style={style.cardButton}></Card>
				<Card reverse style={style.cardButton}></Card>
			</View>
		</View>
	);
};

export default GameMode;
