import routes from 'fe-utils/routes';
import React from 'react';
import { NativeRouter, Routes, Route, Navigate } from 'react-router-native';
import Game from './Game';
import Home from './Home';
import InitialView from './InitialView';
import ModeChoice from './ModeChoice';

const Routing = () => {
	return (
		<NativeRouter>
			<Routes>
				<Route path="/" element={<Navigate to={routes.Home} />} />
				<Route path={routes.Home} element={<Home />}>
					<Route path="" element={<InitialView />} />
					<Route path={routes.ModeChoice} element={<ModeChoice />} />
					<Route path={routes.Lobby} />
				</Route>
				<Route path={routes.Game} element={<Game />} />
			</Routes>
		</NativeRouter>
	);
};

export default Routing;
