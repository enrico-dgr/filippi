import React, { useEffect, useRef, useState } from 'react';
import { Pressable, Text, View, Animated, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { palette } from 'fe-utils/colors';
import style from './style';

const GameMode = ({
	description,
	title,
}: {
	description: string;
	title: string;
}) => {
	const [state, setState] = useState({ rotate: false });
	const onPressOut = () => setState({ ...state, rotate: !state.rotate });

	return (
		<View style={style.container}>
			<View style={style.modal}>
				<Header
					title={title}
					onPressOutIcon={onPressOut}
					reverseIcon={state.rotate}
				/>
				<DoubleFace
					firstFace={
						<View
							style={{
								backgroundColor: 'red',
								height: '100%',
								width: '100%',
							}}
						></View>
					}
					secondFace={
						<View
							style={{
								height: '100%',
								width: '100%',
							}}
						>
							<Text style={style.description}>{description}</Text>
						</View>
					}
					rotate={state.rotate}
					style={{ flex: 1 }}
				/>
			</View>
		</View>
	);
};

const Header = ({
	onPressOutIcon,
	reverseIcon: reverse,
	title,
}: {
	onPressOutIcon: () => void;
	reverseIcon?: boolean;
	title: string;
}) => (
	<View style={style.header}>
		<Text style={style.headerText}>{title}</Text>
		<Pressable onPressOut={onPressOutIcon}>
			<Ionicons
				name={!reverse ? 'arrow-redo' : 'arrow-undo'}
				size={30}
				color={palette.java.hex}
			/>
		</Pressable>
	</View>
);

const DoubleFace = ({
	firstFace,
	rotate,
	secondFace,
	...props
}: {
	firstFace: JSX.Element;
	secondFace: JSX.Element;
	rotate?: boolean;
	style?: ViewStyle;
}) => {
	const refs = useRef(new Animated.Value(0));

	const [state] = useState({
		timing: Animated.timing(refs.current, {
			toValue: 1,
			duration: 2000,
			useNativeDriver: true,
		}),
		timingBack: Animated.timing(refs.current, {
			toValue: 0,
			duration: 2000,
			useNativeDriver: true,
		}),
		spin: refs.current.interpolate({
			inputRange: [0, 1],
			outputRange: ['0deg', '180deg'],
		}),
		spin2: refs.current.interpolate({
			inputRange: [0, 1],
			outputRange: ['180deg', '0deg'],
		}),
	});

	useEffect(() => {
		if (rotate) {
			state.timingBack.stop();
			state.timing.start();
		} else {
			state.timing.stop();
			state.timingBack.start();
		}
	}, [rotate]);

	return (
		<View style={props.style}>
			<Animated.View
				style={{
					...style.cardSide,
					transform: [{ rotateY: state.spin }, { perspective: 1000 }],
				}}
			>
				{firstFace}
			</Animated.View>
			<Animated.View
				style={{
					...style.cardSide,
					transform: [
						{ rotateY: state.spin2 },
						{ perspective: 1000 },
					],
				}}
			>
				{secondFace}
			</Animated.View>
		</View>
	);
};

export default GameMode;
