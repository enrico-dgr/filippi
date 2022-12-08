import * as C from 'c-entities/Camera';
import BasicRotation from 'c-systems/BasicRotation';
import { Camera, Vector3 } from 'three';
import { extEntity } from 'c-builders/entity';

const entity =
	({ camera, position }: { camera: Camera; position?: Vector3 }) =>
	() => {
		position && camera.position.copy(position);

		return C.entity({ camera })().then((e) =>
			extEntity({
				entity: e,
				extensionState: {},
				extensionSystemBuilders: [BasicRotation],
			})
		);
	};

export default entity;
