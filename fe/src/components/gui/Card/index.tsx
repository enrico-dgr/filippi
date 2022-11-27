import React, { PropsWithChildren } from 'react';
import { View } from 'react-native';

const Card = (props: PropsWithChildren<{}>) => {
	return <View>{props.children}</View>;
};

export default Card;
