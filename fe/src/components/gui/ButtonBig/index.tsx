import React, { useCallback, useState } from 'react';
import { Pressable, Text, ViewStyle } from 'react-native';
import style from './style';

type Props = {
	style?: ViewStyle;
	text: string;
};

const ButtonBig = ({ style: containerStyle, text }: Props) => {
	const [state, setState] = useState({ isPressed: false });

	const onPressIn = useCallback(() => {
		return setState((s) => ({ ...s, isPressed: true }));
	}, []);
	const onPressOut = useCallback(
		() => setState((s) => ({ ...s, isPressed: false })),
		[]
	);

	return (
		<Pressable
			onPressIn={onPressIn}
			onPressOut={onPressOut}
			style={containerStyle}
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
