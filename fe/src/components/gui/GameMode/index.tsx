import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
	Pressable,
	Text,
	View,
	Animated,
	ViewStyle,
	PressableProps,
	GestureResponderEvent,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import palette from 'fe-utils/palette';
import style from './style';
import { useDispatch } from 'react-redux';
import { reset } from 'fe-redux/slices/modeChoice';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigate } from 'react-router-native';
import routes from 'fe-utils/routes';

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
					firstFace={<FirstFace name={title} />}
					secondFace={<SecondFace description={description} />}
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
}) => {
	const onPressOut_ = useCallback(
		(event: GestureResponderEvent) => {
			onPressOut && onPressOut(event);
		},
		[onPressOut]
	);

	return (
		<LinearGradient
			colors={[
				palette['fuchsia-pink'].getRgba(0.8),
				palette['fuchsia-pink'].getRgba(0.2),
			]}
			start={{ x: 0, y: 0.5 }}
			end={{ x: 1, y: 0.5 }}
			style={style.buttonContainer}
		>
			<Pressable onPressOut={onPressOut_} style={style.button}>
				<Text style={style.buttonText}>{text}</Text>
			</Pressable>
		</LinearGradient>
	);
};

const FirstFace = ({ name }: { name: string }) => {
	const navigate = useNavigate();
	const goToGame = () =>
		navigate(routes.Game, {
			state: {
				mode: name,
			},
		});

	return (
		<>
			<Button text="Search" />
			<Button onPressOut={goToGame} text="Create" />
			<Button text="Join" />
		</>
	);
};

const SecondFace = ({ description }: { description: string }): JSX.Element => (
	<Text style={style.description}>{description}</Text>
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
					zIndex: rotate ? 1 : 2,
					transform: [{ rotateY: state.spin }, { perspective: 1000 }],
				}}
			>
				{firstFace}
			</Animated.View>
			<Animated.View
				style={{
					...style.cardSide,
					zIndex: rotate ? 2 : 1,
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
