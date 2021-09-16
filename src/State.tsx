import React from 'react';

interface ApplicationState {
	travel: {
		flights: number;
	};
}

interface Store {
	state: ApplicationState;
	setState: React.Dispatch<React.SetStateAction<ApplicationState>>;
}

export const initState: ApplicationState = {
	travel: {
		flights: 100,
	},
};

export const CarbonEmissionsContext = React.createContext<Store>({
	state: initState,
	setState: () => null,
});

export const CarbonEmissionsStateProvider: React.FC = ({ children }) => {
	// const [state, dispatch] = React.useReducer(reducer, initState);
	const [state, setState] = React.useState(initState);
	return (
		<CarbonEmissionsContext.Provider
			value={{ state, setState }}
			children={children}
		/>
	);
};
