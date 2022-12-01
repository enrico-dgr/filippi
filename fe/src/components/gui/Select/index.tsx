import React from 'react';
import { ScrollView, ScrollViewProps } from 'react-native';

const Select = <Item extends {}>({
	map,
	items,
	...props
}: {
	map: (item: Item, index: number) => JSX.Element;
	items: Item[];
} & ScrollViewProps) => {
	const list = items.map(map);

	return <ScrollView {...props}>{list}</ScrollView>;
};

export default Select;
