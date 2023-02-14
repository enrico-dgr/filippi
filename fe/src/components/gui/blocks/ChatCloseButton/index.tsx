import IoniconsButton from 'fe-gui/elements/buttons/Ionicons';
import palette from 'fe-utils/palette';
import React, { useCallback } from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { useDispatch } from 'react-redux';
import { close } from 'fe-redux/slices/Chat';
import blockStyle from './style';

type Props = {
	style?: StyleProp<ViewStyle>;
};

const ChatCloseButton = ({ style }: Props) => {
	const dispatch = useDispatch();
	const onPressOut = useCallback(() => dispatch(close()), []);

	return (
		<IoniconsButton
			color={palette.deco.hex}
			name="close-circle-sharp"
			onPressOut={onPressOut}
			size={50}
			style={StyleSheet.flatten([blockStyle.btn, style])}
		/>
	);
};

export default ChatCloseButton;
