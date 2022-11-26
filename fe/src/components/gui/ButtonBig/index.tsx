import React from 'react';
import { Pressable, Text, ViewStyle } from 'react-native';
import style from './style';

type Props = {
	style?: ViewStyle;
	text: string;
};

const ButtonBig = ({ style: containerStyle, text }: Props) => {
	return (
		<Pressable style={containerStyle}>
			<Text style={style.text}>{text}</Text>
		</Pressable>
	);
};

export default ButtonBig;
