import React from 'react';
import type { CarbonItem } from './components/CarbonItems';
import type { Suppliers } from './hooks/climateWrapped';

interface ApplicationState {
	travel: {
		flights: number;
		cars: number;
		commute: number;
	};
	social: {
		diet: number;
	};
	home: {
		selectedCompany: string;
	};

	spending: Array<{
		id: number;
		used: boolean;
		item: CarbonItem;
	}>;

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
	maxKms: 55_000,
	avgKms: 11_000,
};

export const carValues = {
	maxKms: 20_000,
	avgKms: 4_000,
};

export const commuteValues = {
	maxKms: 30_000,
	avgKms: 6_000,
};

export const initState = (): ApplicationState => {
	return {
		travel: {
			flights: flightValues.avgKms * carbonPerKm.flight,
			cars: carValues.avgKms * carbonPerKm.car,
			commute: commuteValues.avgKms * carbonPerKm.commute,
		},

		social: {
			diet: 0,
		},

		home: {
			selectedCompany: '',
		},

		spending: [
			{
				id: 0,
				used: false,
				item: {
					name: 'phone',
					co2: 80, // iPhone
					emoji: '📱',
					section: 'spending',
				},
			},
			{
				id: 1,
				used: false,
				item: {
					name: 'new jeans',
					co2: 33, // based on Levis’s 501
					emoji: '👖',
					section: 'spending',
				},
			},
			{
				id: 2,
				used: false,
				item: {
					name: 'shirt',
					co2: 20, // No idea
					emoji: '👕',
					section: 'spending',
				},
			},
		],

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
};

export const CarbonEmissionsContext = React.createContext<Store>({
	state: initState(),
	setState: () => null,
});

export const CarbonEmissionsStateProvider: React.FC = ({ children }) => {
	const [state, setState] = React.useState(initState());

	return (
		<CarbonEmissionsContext.Provider
			value={{ state, setState }}
			children={children}
		/>
	);
};
