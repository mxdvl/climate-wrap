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

export const carbonPerKm = {
	flight: 0.22, // kg CO2 / km
	car: 0.19, // kg CO2 / km
};

export const flightValues = {
	maxKms: 50000,
	avgKms: 11000,
};

export const initState: ApplicationState = {
	travel: {
		flights: flightValues.avgKms * carbonPerKm.flight,
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
