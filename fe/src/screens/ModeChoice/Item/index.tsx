import * as modeChoice from 'fe-redux/slices/modeChoice';
import * as toast from 'fe-redux/slices/toast';
import * as games from 'fe-services/games';
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
		games
			.getByName({ name })
			.then((res) =>
				res.data !== undefined
					? modeChoice.set(res.data)
					: toast.set({
							type: 'error',
							message: res.errorMessage,
					  })
			)
			.then(dispatch);

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
