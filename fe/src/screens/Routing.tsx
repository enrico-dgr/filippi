import React from 'react';
import { NativeRouter, Routes, Route } from 'react-router-native';
import Game from './Game';
import Home from './Home';

const Routing = () => {
	return (
		<NativeRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/game" element={<Game />} />
			</Routes>
		</NativeRouter>
	);
};

export default Routing;
