type GameInfo = {
	name: string;
	description: string;
};

const mocks: GameInfo[] = [
	{
		name: 'Filippemy',
		description: `Don't get caught by Filippi! 
    \nBe careful not to remain bald, when Filippi is near you, you'll start losing hair.
    \nIf he gets you, you instantly become bald! 
    \nFillippi is behind the corner...`,
	},
];

export const getByName = async ({ name }: { name: string }) => {
	const response: {
		data?: GameInfo;
		errorMessage: string;
	} = {
		errorMessage:
			'Something unexpected occurred while looking for game infos.',
	};

	const game = mocks.find((m) => m.name === name);

	if (!game) {
		response.errorMessage = `No game found with name "${name}".`;
	} else {
		response.data = game;
	}

	return response;
};
