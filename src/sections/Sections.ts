import type { ColorHues } from '@chakra-ui/react';
import { theme } from '@chakra-ui/react';

export type Section = {
	name: string;
	colour: ColorHues;
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
		colour: theme.colors.cyan,
		emoji: '✈️',
	},
	community: {
		name: 'Community',
		description: 'Local politics, actions together',
		colour: theme.colors.teal,
		emoji: '💬',
	},
	home: {
		name: 'Home',
		colour: theme.colors.yellow,
		description: 'Housing, energy sources',
		emoji: '🏡',
	},
	spending: {
		name: 'Spending',
		description: 'Stuff you own or buy',
		colour: theme.colors.red,
		emoji: '💸',
	},
	social: {
		name: 'Social',
		emoji: '👪',
		description: 'Family size, pets, etc.',
		colour: theme.colors.orange,
	},
	overview: {
		name: 'Overview',
		emoji: '🔎',
		description: '',
		colour: theme.colors.purple,
	},
};
