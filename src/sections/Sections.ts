import { theme } from '@chakra-ui/react';

export type Section = {
	name: string;
	colour: string;
	emoji: string;
	description: string;
};

export type SectionType =
	| 'travel'
	| 'community'
	| 'home'
	| 'spending'
	| 'social'
	| 'overview';

export const sections: Record<SectionType, Section> = {
	travel: {
		name: 'Travel',
		description: 'Communting, holidays, vehicles',
		colour: theme.colors.cyan[100],
		emoji: '✈️',
	},
	community: {
		name: 'Community',
		description: 'Local politics, actions together',
		colour: theme.colors.teal[100],
		emoji: '💬',
	},
	home: {
		name: 'Home',
		colour: theme.colors.pink[100],
		description: 'Housing, energy sources',
		emoji: '🏡',
	},
	spending: {
		name: 'Spending',
		description: 'Stuff you own or buy',
		colour: theme.colors.white,
		emoji: '💸',
	},
	social: {
		name: 'Social',
		emoji: '👪',
		description: 'Family size, pets, etc.',
		colour: theme.colors.orange[100],
	},
	overview: {
		name: 'Overview',
		emoji: '',
		description: '',
		colour: theme.colors.purple[100],
	},
};
