import { Camera, Vector3 } from 'three';
import { buildEntity } from 'c-builders/entity';

export const entity =
	({ camera, position }: { camera: Camera; position?: Vector3 }) =>
	async () => {
		position && camera.position.copy(position);
		camera.lookAt(camera.position.clone().add(new Vector3(0, 0, -1)));

		return buildEntity({
			threeData: {
				object: camera,
			},
			state: {
				action: {
					horizontalTurn: 0,
					verticalTurn: 0,
				},
			},
			systemBuilders: [],
		});
	};
