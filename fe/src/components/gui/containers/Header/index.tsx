import React, { ReactNode } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import containerStyle from './style';

type Props = {
	left?: ReactNode;
	right?: ReactNode;
	style?: StyleProp<ViewStyle>;
};

const Header = ({ left = <></>, right = <></>, style }: Props) => {
	return (
		<View style={StyleSheet.flatten([style, containerStyle.header])}>
			<View style={containerStyle.side}>{left}</View>
			<View style={containerStyle.side}>{right}</View>
		</View>
	);
};

export default Header;
