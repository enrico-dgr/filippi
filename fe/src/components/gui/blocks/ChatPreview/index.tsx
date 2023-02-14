import React from 'react';
import { Text, View } from 'react-native';
import style from './style';

type Props = {
	user: string;
	lastMessage: string;
};

const ChatPreview = ({ user, lastMessage }: Props) => {
	return (
		<View style={style.container}>
			<Text style={style.user}>{user}</Text>
			<Text style={style.message}>{lastMessage}</Text>
		</View>
	);
};

export default ChatPreview;
