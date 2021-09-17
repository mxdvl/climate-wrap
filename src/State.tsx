import React from 'react';
import type { CarbonItem } from './components/CarbonItems';

interface ApplicationState {
	travel: {
		flights: number;
	};
	social: {
		diet: number;
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

	social: {
		diet: 0,
	},

	carbonItems: [
		{
			name: 'Vegan',
			section: 'social',
			emoji: '🥦',
			co2: 1400,
		},
		{
			name: 'Meat',
			section: 'social',
			emoji: '🥩',
			co2: 2600,
		},
		{
			name: 'Vegetarian',
			section: 'social',
			emoji: '🥛',
			co2: 1800,
		},
		{
			name: 'Pescetarian',
			section: 'social',
			emoji: '🐡',
			co2: 2200,
		},
	],
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
