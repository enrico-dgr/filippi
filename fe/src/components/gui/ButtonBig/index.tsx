import React, { useCallback, useState } from 'react';
import {
	GestureResponderEvent,
	Pressable,
	PressableProps,
	Text,
	ViewStyle,
} from 'react-native';
import style from './style';

type Props = {
	style?: ViewStyle;
	text: string;
} & Pick<PressableProps, 'onPressIn' | 'onPressOut'>;

const ButtonBig = ({ style: containerStyle, text, ...props }: Props) => {
	const [state, setState] = useState({ isPressed: false });

	const onPressIn = useCallback((event: GestureResponderEvent) => {
		setState((s) => ({ ...s, isPressed: true }));
		props.onPressIn && props.onPressIn(event);
	}, []);
	const onPressOut = useCallback((event: GestureResponderEvent) => {
		setState((s) => ({ ...s, isPressed: false }));
		props.onPressOut && props.onPressOut(event);
	}, []);

	return (
		<Pressable
			onPressIn={onPressIn}
			onPressOut={onPressOut}
			style={{
				...style.textContainer,
				...containerStyle,
				...(state.isPressed ? style.textContainerPressed : {}),
			}}
		>
			<Text
				selectable={false}
				style={{
					...style.text,
					...(state.isPressed ? style.textPressed : {}),
				}}
			>
				{text}
			</Text>
		</Pressable>
	);
};

export default ButtonBig;
