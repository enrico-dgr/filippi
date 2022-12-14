import { AnimationMixer, AnimationAction } from 'three';
import { GLTF, GLTFLoader, SkeletonUtils } from 'three-stdlib';

const chc: Record<string, GLTF> = {};

export const gltf = async <Names extends string>(url: string) => {
	let model: GLTF;

	if (chc[url]) {
		model = chc[url];
	} else {
		model = await new GLTFLoader().loadAsync(url);
		chc[url] = model;
	}

	const newScene = SkeletonUtils.clone(model.scene);
	const mixer = new AnimationMixer(newScene);

	const actions: Partial<Record<Names, AnimationAction>> = {};

	model.animations.forEach((a) => {
		actions[a.name as Names] = mixer.clipAction(a);
	});

	return {
		object: newScene,
		actions: actions as Record<Names, AnimationAction>,
		mixer,
	};
};
