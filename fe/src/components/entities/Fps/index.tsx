import { useFrame } from '@react-three/fiber';
import React, { useMemo } from 'react';
import { dispatch } from 'fe-events';

const Fps = () => {
	const data = useMemo(
		() => ({
			initTime: 0,
			averageOf: 15,
      counter: 0,
		}),
		[]
	);

	useFrame((s) => {
    if (data.counter === 0) {
      data.initTime = s.clock.elapsedTime;
    }
    
    data.counter++;

		if (data.counter >= data.averageOf) {
			// calc
			const deltasSum = s.clock.elapsedTime - data.initTime;
			const fps = data.averageOf / deltasSum;

			// clean
      data.counter = 0;

			//
			dispatch('stats', { fps: fps.toFixed(1) });
		}
	});

	return <></>;
};

export default Fps;
