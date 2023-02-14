import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
	OpaqueColorValue,
	Pressable,
	PressableProps,
	StyleProp,
	ViewStyle,
} from 'react-native';

type IoniconsProps = {
	color?: string | OpaqueColorValue | undefined;
	name: keyof typeof Ionicons['glyphMap'];
	size?: number;
};

type Props = {
	children?: React.ReactNode;
	onPressOut?: PressableProps['onPressOut'];
	style?: StyleProp<ViewStyle>;
} & IoniconsProps;

const IoniconsButton = ({
	children,
	color,
	name,
	onPressOut,
	size,
	style,
}: Props) => (
	<Pressable onPressOut={onPressOut} style={style}>
		<Ionicons color={color} name={name} size={size} />
		{children}
	</Pressable>
);

export default IoniconsButton;
