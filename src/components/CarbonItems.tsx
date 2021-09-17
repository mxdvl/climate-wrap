import { Box, Center, GridItem } from '@chakra-ui/layout';
import type { SectionType } from '../sections/Sections';
import { sections } from '../sections/Sections';

export type CarbonItem = {
	co2: number;
	name: string;
	emoji: string;
	section: SectionType;
};

const approximate = (min: number, max: number): number =>
	Math.floor(Math.random() * (max - min)) + min;

type Size = [number, number];

const boxFromCarbon = (co2: number): Size => {
	const blocks = Math.round(co2 / 10);
	const width = Math.floor(Math.sqrt(blocks)) || 1;
	const height = Math.round(blocks / width) || 1;

	return [width, height];
};

const CarbonItemBox = ({ item }: { item: CarbonItem }): JSX.Element => {
	const [cols, rows] = boxFromCarbon(item.co2);
	const { colour } = sections[item.section];

	return (
		<GridItem
			colSpan={cols}
			rowSpan={rows}
			bg={colour[100]}
			borderRadius={6}
			border={'2px solid '}
			borderColor={colour[400]}
		>
			<Center h={'100%'} flexDirection="column">
				<Box
					fontSize={`${Math.min(6, Math.min(rows, cols))}rem`}
					lineHeight="0.75"
				>
					{item.emoji}
				</Box>
				<Box>{item.name}</Box>
			</Center>
		</GridItem>
	);
};

export { CarbonItemBox, boxFromCarbon, approximate };
