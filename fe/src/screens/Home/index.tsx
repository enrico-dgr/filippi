import React from 'react';
import style from './style';
import { View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Settings from 'fe-gui/Settings';
import palette from 'fe-utils/palette';
import Username from './Username';
import { Outlet } from 'react-router-native';
import Toast from 'fe-gui/Toast';
import Chat from 'fe-gui/Chat';
import Header from 'fe-gui/containers/Header';
import ChatOpenButton from 'fe-gui/blocks/ChatOpenButton';

const Home = () => {
	return (
		<LinearGradient
			colors={[palette.affair.hex, 'black']}
			start={{ x: 0.5, y: -0.1 }}
			end={{ x: 0.6, y: 0.75 }}
			style={{ height: '100%' }}
		>
			<View style={style.container}>
				<Header
					left={<Username />}
					right={
						<>
							<ChatOpenButton style={style.chat} />
							<Settings />
						</>
					}
					style={style.header}
				/>
				<Chat />
				<Toast />
				<Outlet />
			</View>
		</LinearGradient>
	);
};

export default Home;
