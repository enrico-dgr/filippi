import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Mesh, Vector3 } from 'three';
import { useNavigate } from 'react-router-native';
import palette from 'fe-utils/palette';
import { Pressable } from 'react-native';
import Camera from 'fe-entities/Camera';
import Character from 'fe-entities/Character';
import Player from 'fe-entities/Player';

function Box(props: { position: [number, number, number] }) {
	// This reference will give us direct access to the mesh
	const mesh = useRef<Mesh>();

	// Set up state for the hovered and active state
	const [hovered, setHover] = useState(false);
	const [active, setActive] = useState(false);

	// Rotate mesh every frame, this is outside of React without overhead
	useFrame(() => {
		if (mesh && mesh.current) {
			mesh.current.rotation.x = mesh.current.rotation.y += 0.01;
		}
	});

	return (
		<mesh
			{...props}
			ref={mesh as any}
			scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
			onClick={() => setActive(!active)}
			onPointerOver={() => setHover(true)}
			onPointerOut={() => setHover(false)}
		>
			<boxGeometry attach="geometry" args={[1, 1, 1]} />
			<meshStandardMaterial
				attach="material"
				color={hovered ? 'hotpink' : 'orange'}
			/>
		</mesh>
	);
}

const Game = () => {
	const navigate = useNavigate();
	const goHome = () => navigate('/');
	// navigate('/');

	return (
		<>
			<Pressable
				onPressOut={goHome}
				style={{
					position: 'absolute',
					top: 20,
					right: 20,
					backgroundColor: palette['tall-poppy'].hex,
					height: 25,
					width: 25,
					zIndex: 40,
				}}
			/>
			<Canvas
				style={{ backgroundColor: palette.black.hex }}
				onCreated={(state) => {
          // fix pixelStorei not supported params
          // on loading ".glb"
					const _gl = state.gl.getContext();
					const pixelStorei = _gl.pixelStorei.bind(_gl);
					_gl.pixelStorei = function (...args) {
						const [parameter] = args;
						switch (parameter) {
							case _gl.UNPACK_FLIP_Y_WEBGL:
								return pixelStorei(...args);
						}
					};

          _gl.getExtension('EXT_color_buffer_float')
          console.log(state.gl.info)
				}}
			>
				<ambientLight />
				<pointLight position={[10, 10, 10]} />
				<Camera position={new Vector3(0, 0, 5)} />
				<Box position={[1.2, 0, 0]} />
				<Box position={[-1.2, 0, 0]} />
        {/* @todo Player needs "document" variable to be removed */}
				{/* <Player /> */}
			</Canvas>
		</>
	);
};

export default Game;
