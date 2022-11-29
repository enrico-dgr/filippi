import React, { useMemo } from 'react';
import { ScrollView, ScrollViewProps } from 'react-native';

const Select = <Item extends {}>({
	map,
	items,
	...props
}: {
	map: (item: Item) => JSX.Element;
	items: Item[];
} & ScrollViewProps) => {
	const list = useMemo(() => items.map(map), []);

	return <ScrollView {...props}>{list}</ScrollView>;
};

export default Select;
