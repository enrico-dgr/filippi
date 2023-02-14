import React, { useMemo } from 'react';
import { ScrollView, View } from 'react-native';
import style from './style';
import ChatCloseButton from 'fe-gui/blocks/ChatCloseButton';
import Header from 'fe-gui/containers/Header';
import { useAppSelector } from 'fe-redux/index';
import ChatPreview from 'fe-gui/blocks/ChatPreview';

const Interface = () => {
	const chats = useAppSelector((s) => s.Chat.chats);

	const chatPreviews = useMemo(
		() =>
			chats
				.map((chat) => chat.messages.slice(0, 1))
				.reduce((prevMsg, currMsg) => [...prevMsg, ...currMsg], [])
				.map((msg, i) => (
					<ChatPreview
						key={`ChatPreview${i}` + msg.username}
						lastMessage={msg.text}
						user={msg.username}
					/>
				)),
		[chats]
	);

	return (
		<View style={style.container}>
			<Header right={<ChatCloseButton />} />
			<ScrollView style={style.chatsList}>{chatPreviews}</ScrollView>
		</View>
	);
};

export default Interface;
