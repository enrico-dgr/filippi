import { entity, State } from 'c-entities/Character';
import useEntity from 'fe-hooks/useEntity';
import { EntityComponent } from 'fe-types/entities';

const Character: EntityComponent<State, {}> = ({ children, inputSystems }) => {
	return useEntity({ entityPromise: entity, children, inputSystems });
};

export default Character;
