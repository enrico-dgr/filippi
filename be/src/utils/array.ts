export const getAutoIncrementID = <O extends { id: number }>(arr: O[]) =>
	arr.length === 0 ? 0 : arr[arr.length - 1].id + 1;
