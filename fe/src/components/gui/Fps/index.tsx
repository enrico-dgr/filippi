import { useFrame } from '@react-three/fiber';
import React, { useMemo, useState } from 'react';
import helvetica from 'three/examples/fonts/helvetiker_bold.typeface.json';
import { FontLoader, TextGeometry } from 'three-stdlib';

const Fps = () => {
	const [state, setState] = useState({ fps: 0 });
	const data = useMemo(
		() => ({
			lastTime: 0,
			averageOf: 15,
			deltas: [] as number[],
		}),
		[]
	);
	const font = useMemo(() => new FontLoader().parse(helvetica as any), []);

	useFrame((s) => {
		data.deltas.push(s.clock.elapsedTime - data.lastTime);
		data.lastTime = s.clock.elapsedTime;

		if (data.deltas.length > data.averageOf - 2) {
			// calc
      const deltasSum = data.deltas.reduce((acc, cur) => (acc += cur), 0);
			const fps = data.averageOf / deltasSum;

      // clean
			data.deltas.splice(0);

      // set state
			setState((s) => ({ ...s, fps }));
		}
	});

	return (
		<mesh
			geometry={
				new TextGeometry(state.fps.toFixed(0), {
					font: font,
					size: 0.2,
					height: 0.03,
					curveSegments: 12,
				})
			}
			position={[-6, 3, 0]}
		>
			<meshPhongMaterial color={'green'} />
		</mesh>
	);
};

export default Fps;
