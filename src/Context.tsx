import React from 'react';

export interface Action {
	type: 'add_item' | 'remove_item';
	payload: typeof initState;
}

export const Reducer = (state: typeof initState, action: Action) => {
	return {
		...state,
		...action,
	};
};

export const initState = { travel: 100 };

export const CarbonEmissions = React.createContext(initState);
