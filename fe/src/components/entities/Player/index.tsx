import React, { useMemo } from 'react';
import FirstPersonCamera from 'fe-entities/FirstPersonCamera';
import InputMovement from 'fe-systems/InputMovement';
import InputRotation from 'fe-systems/InputRotation';
import { Vector3 } from 'three';
import { EntityComponent } from 'fe-types/entities/component';
import Cursor from 'fe-entities/Cursor';
import Character from 'fe-entities/Character';

const Player: EntityComponent<{}, {}> = (props) => {
	console.log('Render: Player');

	const inputSystems = useMemo(
		() => [
			InputMovement,
			InputRotation({ direction: 'horizontal' }),
			...(props.inputSystems ? props.inputSystems : []),
		],
		[props.inputSystems]
	);

	const configs = useMemo(
		() => ({
			camera: { position: new Vector3(2.5, 11.2, 2.3) },
			cursor: { position: new Vector3(0, 0, -1.1) },
		}),
		[]
	);

	return (
		<Character inputSystems={inputSystems}>
			{props.children}
			<FirstPersonCamera position={configs.camera.position}>
				<Cursor position={configs.cursor.position} />
			</FirstPersonCamera>
		</Character>
	);
};

export default Player;
