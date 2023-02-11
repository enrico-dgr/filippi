import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { addListener, removeListener } from 'fe-events';
import style from './style';

const Stats = () => {
	const [state, setState] = useState({ fps: '' });

	useEffect(() => {
		const listener = ({ fps }: { fps: string }) =>
			setState((s) => ({ ...s, fps }));

		addListener('stats', listener);

		return () => {
			removeListener('stats', listener);
		};
	}, []);

	return (
		<View style={style.container}>
			<Text style={style.text}>{state.fps}</Text>
		</View>
	);
};

export default Stats;
