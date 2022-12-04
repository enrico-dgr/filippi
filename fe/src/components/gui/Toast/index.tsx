import { useAppSelector } from 'fe-redux/index';
import { reset, ToastState } from 'fe-redux/slices/toast';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import style from './style';

type State = {
	is: 'hidden' | 'shown' | 'animIn' | 'animOut';
};

const Toast = () => {
	const toastData = useAppSelector((s) => s.toast);
	const dispatch = useDispatch();

	const duration = 600;
	const valueAnim = useMemo(() => new Animated.Value(0), []);

	const anims = useMemo(
		() => ({
			timingIn: Animated.timing(valueAnim, {
				toValue: 1,
				duration,
				useNativeDriver: true,
			}),
			timingOut: Animated.timing(valueAnim, {
				toValue: 0,
				duration,
				useNativeDriver: true,
			}),
			opacity: valueAnim.interpolate({
				inputRange: [0, 1],
				outputRange: [0, 0.7],
			}),
			translateY: valueAnim.interpolate({
				inputRange: [0, 0.7, 1],
				outputRange: [-800, 40, 0],
			}),
		}),
		[]
	);

	const [state, setState] = useState<State>({ is: 'hidden' });

	useEffect(() => {
		const newState = { ...state };

		if (toastData.type === 'unset') {
			newState.is = 'hidden';
		} else if (state.is === 'hidden') {
			newState.is = 'animIn';
		} else if (state.is === 'animIn') {
			const onAnimInEnd = () => setState({ is: 'shown' });
			anims.timingIn.start(onAnimInEnd);
		} else if (state.is === 'animOut') {
			const onAnimOutEnd = () => dispatch(reset());
			anims.timingOut.start(onAnimOutEnd);
		}

		setState(newState);
	}, [toastData.type, state.is]);

	const resetToast = useCallback(() => {
		setState((s) => (s.is === 'shown' ? { ...s, is: 'animOut' } : s));
	}, []);

	const Background = () => (
		<Animated.View
			style={{ ...style.modalBackground, opacity: anims.opacity }}
		>
			<Pressable onPressOut={resetToast} style={{ flex: 1 }} />
		</Animated.View>
	);

	const Modal = () => (
		<Animated.View
			style={{
				transform: [{ translateY: anims.translateY }],
				zIndex: style.modalBackground.zIndex + 1,
			}}
		>
			<Pressable
				onPressOut={resetToast}
				style={getModalStyle(toastData.type)}
			>
				<Text style={getTextStyle(toastData.type)}>
					{toastData.message}
				</Text>
			</Pressable>
		</Animated.View>
	);

	return (
		<View style={getWrapperStyle(toastData.type)}>
			<Background />
			<Modal />
		</View>
	);
};

const getWrapperStyle = (type: ToastState['type']) => {
	let additionalStyle = {};

	switch (type) {
		case 'unset':
			Object.assign(additionalStyle, style.modalWrapperOnUnset);
			break;
	}

	return Object.assign({}, style.modalWrapper, additionalStyle);
};

const getModalStyle = (type: ToastState['type']) => {
	let styleOnType = {};

	switch (type) {
		case 'error':
			styleOnType = style.modalOnError;
			break;
	}

	return { ...style.modal, ...styleOnType };
};

const getTextStyle = (type: ToastState['type']) => {
	let styleOnType = {};

	switch (type) {
		case 'error':
			styleOnType = style.textOnError;
			break;
	}

	return { ...style.text, ...styleOnType };
};

export default Toast;
