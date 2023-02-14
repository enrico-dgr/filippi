import IoniconsButton from 'fe-gui/elements/buttons/Ionicons';
import palette from 'fe-utils/palette';
import React, { useCallback } from 'react';
import blockStyle from './style';
import { StyleProp, View, ViewStyle } from 'react-native';
import { useDispatch } from 'react-redux';
import { open } from 'fe-redux/slices/Chat';
import { useAppSelector } from 'fe-redux/index';

type Props = {
	style?: StyleProp<ViewStyle>;
};

const ChatOpenButton = ({ style }: Props) => {
	const dispatch = useDispatch();
	const onPressOut = useCallback(() => dispatch(open()), []);
	const notificationsAvailable = useAppSelector(
		(s) => s.Chat.notifications.length > 0
	);

	return (
		<IoniconsButton
			color={palette.deco.hex}
			name="chatbubble-sharp"
			onPressOut={onPressOut}
			size={35}
			style={style}
		>
			{notificationsAvailable && <View style={blockStyle.notification} />}
		</IoniconsButton>
	);
};

export default ChatOpenButton;
