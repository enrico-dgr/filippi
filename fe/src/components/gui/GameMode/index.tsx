import React, { useEffect, useRef, useState } from 'react';
import {
	Pressable,
	Text,
	View,
	Animated,
	ViewStyle,
	PressableProps,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import palette from 'fe-utils/palette';
import style from './style';
import { useDispatch } from 'react-redux';
import { reset } from 'fe-redux/slices/modeChoice';
import { LinearGradient } from 'expo-linear-gradient';

const GameMode = ({
	description,
	title,
}: {
	description: string;
	title: string;
}) => {
	const [state, setState] = useState({ rotate: false });
	const onPressOut = () => setState({ ...state, rotate: !state.rotate });
	const dispatch = useDispatch();
	const onClose = () => dispatch(reset());

	return (
		<View style={style.container}>
			<Pressable onPressOut={onClose} style={style.close}>
				<Ionicons
					color={palette.deco.hex}
					name="close-circle-sharp"
					size={50}
				/>
			</Pressable>
			<View style={style.modal}>
				<Header
					title={title}
					onPressOutIcon={onPressOut}
					reverseIcon={state.rotate}
				/>
				<DoubleFace
					firstFace={<FirstFace />}
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
				size={28}
				color={palette.java.hex}
			/>
		</Pressable>
	</View>
);

const Button = ({
	onPressOut,
	text,
}: {
	onPressOut?: PressableProps['onPressOut'];
	style?: ViewStyle;
	text: string;
}) => (
	<LinearGradient
		colors={[
			palette['fuchsia-pink'].getRgba(0.8),
			palette['fuchsia-pink'].getRgba(0.2),
		]}
		start={{ x: 0, y: 0.5 }}
		end={{ x: 1, y: 0.5 }}
		style={style.buttonContainer}
	>
		<Pressable onPressOut={onPressOut} style={style.button}>
			<Text style={style.buttonText}>{text}</Text>
		</Pressable>
	</LinearGradient>
);

const FirstFace = () => {
	return (
		<>
			<Button text="Search" />
			<Button text="Create" />
			<Button text="Join" />
		</>
	);
};

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
	const duration = 800;

	const [state] = useState({
		timing: Animated.timing(refs.current, {
			toValue: 1,
			duration,
			useNativeDriver: true,
		}),
		timingBack: Animated.timing(refs.current, {
			toValue: 0,
			duration,
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
