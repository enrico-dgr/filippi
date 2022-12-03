import { useAppSelector } from 'fe-redux/index';
import { reset, ToastState } from 'fe-redux/slices/toast';
import React, { useCallback, useEffect } from 'react';
import { Pressable, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import style from './style';

const Toast = () => {
	const toastData = useAppSelector((s) => s.toast);
	const dispatch = useDispatch();

	const resetToast = useCallback(() => {
		dispatch(reset());
	}, [dispatch]);

	useEffect(() => {}, [toastData.type]);

	return (
		<Pressable
			onPressOut={resetToast}
			style={getContainerStyle(toastData.type)}
		>
			<Text style={getTextStyle(toastData.type)}>
				{toastData.message}
			</Text>
		</Pressable>
	);
};

const getContainerStyle = (type: ToastState['type']) => {
	let styleOnType = {};

	switch (type) {
		case 'unset':
			styleOnType = style.containerOnUnset;
			break;
		case 'error':
			styleOnType = style.containerOnError;
			break;
	}

	return { ...style.container, ...styleOnType };
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
