import React from 'react';
import type { CarbonItem } from './components/CarbonItems';

interface ApplicationState {
	travel: {
		flights: number;
	};
	carbonItems: CarbonItem[];
}

interface Store {
	state: ApplicationState;
	setState: React.Dispatch<React.SetStateAction<ApplicationState>>;
}

export const initState: ApplicationState = {
	travel: {
		flights: 100,
	},
	carbonItems: [],
};

export const CarbonEmissionsContext = React.createContext<Store>({
	state: initState,
	setState: () => null,
});

export const CarbonEmissionsStateProvider: React.FC = ({ children }) => {
	const [state, setState] = React.useState(initState);

	return (
		<CarbonEmissionsContext.Provider
			value={{ state, setState }}
			children={children}
		/>
	);
};
