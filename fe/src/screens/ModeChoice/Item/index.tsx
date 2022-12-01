import { modeChoice } from 'fe-redux/actions';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import style from './style';

type Props = {
	name: string;
};

const Item = ({ name }: Props, i: number) => {
	const dispatch = useDispatch();

	const onPressOut = () =>
		dispatch(modeChoice.set({ name, description: '' }));

	return (
		<Pressable
			key={'modechoice-select-' + name + i}
			style={style.container}
			onPressOut={onPressOut}
		>
			<View style={style.decoration}></View>
			<Text style={style.text}>{name}</Text>
		</Pressable>
	);
};

export default Item;
