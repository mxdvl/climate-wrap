import React from 'react';
import type { CarbonItem } from './components/CarbonItems';

interface ApplicationState {
	travel: {
		flights: number;
		cars: number;
		commute: number;
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
	commute: 0.02, // MADE UP VALUE!!
};

export const flightValues = {
	maxKms: 50_000,
	avgKms: 11_000,
};

export const carValues = {
	maxKms: 6_000,
	avgKms: 4_000,
};

export const commuteValues = {
	maxKms: 12_000,
	avgKms: 6_000,
};

export const initState: ApplicationState = {
	travel: {
		flights: flightValues.avgKms * carbonPerKm.flight,
		cars: carValues.avgKms * carbonPerKm.car,
		commute: commuteValues.avgKms * carbonPerKm.commute,
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
