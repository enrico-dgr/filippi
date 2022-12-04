import { useThree } from '@react-three/fiber';
import { Camera as TCamera, Vector3 } from 'three';
import { EntityComponent } from 'fe-types/entities';
import { BasicRotations } from 'c-types/entities';
import useEntity from 'fe-hooks/useEntity';
import { entity } from 'c-entities/Camera';

export type OtherProps = {
	position?: Vector3;
};

export type ThreeData = {
	object: TCamera;
};

export type EntityState = Record<'action', BasicRotations>;

const Camera: EntityComponent<EntityState, OtherProps> = (props) => {
	const camera = useThree((s) => s.camera);
  
	return useEntity({
		entityPromise: entity({ camera, position: props.position }),
	});
};

export default Camera;
