import React from 'react';
import Interface from './Interface';
import { useAppSelector } from 'fe-redux/index';

type Props = {};

const Chat = ({}: Props) => {
	const isOpen = useAppSelector((s) => s.Chat.isOpen);

	return <>{isOpen && <Interface />}</>;
};

export default Chat;
