import React, { PropsWithChildren, useMemo } from 'react';
import style from './style';
import { LinearGradient } from 'expo-linear-gradient';
import palette from 'fe-utils/palette';
import { GestureResponderEvent, Pressable, ViewStyle } from 'react-native';

const Card = ({
	style: { borderWidth, width, height, ...containerStyle },
	...props
}: PropsWithChildren<{
	contentStyle?: Pick<
		ViewStyle,
		'flexDirection' | 'alignItems' | 'justifyContent'
	>;
	onPressIn?: (event: GestureResponderEvent) => void;
	onPressOut?: (event: GestureResponderEvent) => void;
	reverse?: boolean;
	style: {
		borderWidth: number;
		marginRight?: number;
		marginLeft?: number;
		height: number;
		width: number;
	} & Pick<ViewStyle, 'position' | 'top' | 'left'>;
}>) => {
	const gradients = useMemo(
		() => ({
			outer: !props.reverse
				? {
						colors: ['black', palette.affair.hex],
						start: { x: 0.2, y: 0.3 },
						end: { x: 1.2, y: 1.2 },
				  }
				: {
						colors: [palette.affair.hex, 'black'],
						start: { x: 0, y: 0 },
						end: { x: 1, y: 1 },
				  },
			inner: !props.reverse
				? {
						colors: [palette.affair.hex, 'black'],
						start: { x: 0.05, y: -0.4 },
						end: { x: 0.9, y: 0.75 },
				  }
				: {
						colors: ['black', palette.affair.getRgba(0.7)],
						start: { x: -0.7, y: -0.6 },
						end: { x: 1.7, y: 1.7 },
				  },
		}),
		[props.reverse]
	);

	return (
		<LinearGradient
			{...gradients.outer}
			style={{
				...style.outer,
				...containerStyle,
				height: height + borderWidth,
				width: width + borderWidth,
			}}
		>
			<Pressable
				onPressIn={props.onPressIn}
				onPressOut={props.onPressOut}
			>
				<LinearGradient
					{...gradients.inner}
					style={{
						...(props.contentStyle ?? {}),
						height,
						width,
					}}
				>
					{props.children}
				</LinearGradient>
			</Pressable>
		</LinearGradient>
	);
};

export default Card;
