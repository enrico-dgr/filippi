import model from 'c-assets/models3d/character.glb';
import BasicMovement from 'c-systems/BasicMovement';
import BasicRotation from 'c-systems/BasicRotation';
import { AnimationMixer, AnimationAction, Object3D } from 'three';
import { AnimationName } from 'c-types/entities';
import { buildEntity } from 'c-builders/entity';
import { gltf } from 'c-builders/threeData';
import Animation from './Animation';

export type State = {
	action: {
		forward: boolean;
		backward: boolean;
		left: boolean;
		right: boolean;
		horizontalTurn: number;
		verticalTurn: number;
	};
};

export type ThreeData = {
	actions: Record<AnimationName, AnimationAction>;
	mixer: AnimationMixer;
	object: Object3D;
};

export const entity = () =>
	gltf<AnimationName>(model)
		.then((threeData) =>
			buildEntity<State, ThreeData>({
				threeData,
				state: {
					action: {
						forward: false,
						backward: false,
						left: false,
						right: false,
						horizontalTurn: 0,
						verticalTurn: 0,
					},
				},
				systemBuilders: [Animation, BasicMovement, BasicRotation],
			})
		)
		.catch((r) => {
			console.log('Gltf character entity Error: ', r);
			return undefined;
		});
