import { useFrame, useThree } from '@react-three/fiber';
import React, { useEffect, useMemo, useState } from 'react';
import { Clock } from 'three';
import { ThreeDataPrimitive, Entity } from 'c-types/entities';
import { InputSystem } from 'fe-types/entities';

const useEntity = <ThreeData extends ThreeDataPrimitive, State extends {}>({
	entityPromise,
	children,
	inputSystems = [],
}: {
	entityPromise: (
		clock: Clock
	) => Promise<Entity<ThreeData, State> | undefined>;
	children?: React.ReactNode;
	inputSystems?: InputSystem<State>[];
}) => {
	const { clock, scene } = useThree((s) => ({
		clock: s.clock,
		scene: s.scene,
	}));

	const [entity, setEntity] = useState<Entity<ThreeData, State>>();
	const update = useMemo(() => (entity ? entity.update : () => {}), [entity]);
	const inputSystemsJSX = useMemo(
		() =>
			entity ? inputSystems.map((IS) => <IS state={entity.state} />) : [],
		[entity]
	);

	useEffect(() => {
		entityPromise(clock)
			.then((entity_) => {
				setEntity(entity_);
			})
			.catch((r) => {
				console.log('useEntity Error: ', r);
			});

		return () => {
			// entity &&
			// 	scene.remove(entity.threeData.object) &&
			// 	console.log('removed');
			// console.log(entity?.threeData.object);
			// console.log('unmount');
		};
	}, []);

	useFrame((_, delta) => {
		update(delta);
	});

	return (
		<>
			{entity && (
				<primitive object={entity.threeData.object}>
					{children}
					{inputSystemsJSX}
				</primitive>
			)}
		</>
	);
};

export default useEntity;
