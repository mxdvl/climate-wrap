import type { SectionType } from './sections/Sections';

export type CarbonItem = {
	co2: number;
	name: string;
	emoji: string;
	section: SectionType;
};
