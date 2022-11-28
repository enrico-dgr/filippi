import React, { useCallback, useState } from 'react';
import style from './style';
import { Text, GestureResponderEvent, View } from 'react-native';
import Card from 'fe-gui/Card';

type Props = {
	marginLeft: number;
	onPressOut: (event: GestureResponderEvent) => void;
	text: string;
};

const CardButton = ({ marginLeft, text, ...props }: Props) => {
	const [state, setState] = useState({ isPressed: false });

	const onPressIn = useCallback(() => {
		setState((s) => ({ ...s, isPressed: true }));
	}, []);
	const onPressOut = useCallback((event: GestureResponderEvent) => {
		setState((s) => ({ ...s, isPressed: false }));
		props.onPressOut && props.onPressOut(event);
	}, []);

	return (
		<Card
			onPressIn={onPressIn}
			onPressOut={onPressOut}
			contentStyle={style.cardButtonContent}
			style={{
				...style.cardButton,
				marginLeft,
			}}
		>
			<View style={state.isPressed ? style.cardButtonPressed : {}}>
				<Text style={style.cardButtonText}>{text}</Text>
			</View>
		</Card>
	);
};

export default CardButton;
