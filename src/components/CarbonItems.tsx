import { Box, Center, Grid, GridItem } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/react';
import theme from '@chakra-ui/theme';
import { svgBackgroundImage } from '@guardian/src-helpers';
import type { SectionType } from '../sections/Sections';
import { sections } from '../sections/Sections';

export type CarbonItem = {
	co2: number;
	name: string;
	emoji: string;
	section: SectionType;
};

const gridSize = 22;
const gapSize = 2;
const backgroundSize = gridSize + gapSize;

const grid = svgBackgroundImage(`
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${backgroundSize} ${backgroundSize}">
			<g fill="${theme.colors.gray[400]}">
				<circle cx="0" cy="0" r="1" />
				<circle cx="${backgroundSize}" cy="0" r="1" />
				<circle cx="0" cy="${backgroundSize}" r="1" />
				<circle cx="${backgroundSize}" cy="${backgroundSize}" r="1" />
			</g>
		</svg>`);

const approximate = (min: number, max: number): number =>
	Math.floor(Math.random() * (max - min)) + min;

type Size = [number, number];

const boxFromCarbon = (co2: number): Size => {
	const blocks = Math.round(co2 / 10);
	const width = Math.round(Math.sqrt(blocks)) || 1;
	const height = Math.round(blocks / width) || 1;

	return [width, height];
};

const CarbonItemBox = ({
	item,
	onClick,
}: {
	item: CarbonItem;
	onClick: () => void;
}): JSX.Element => {
	const [cols, rows] = boxFromCarbon(item.co2);
	const { colour } = sections[item.section];

	return (
		<GridItem
			as={Button}
			variant="unstyled"
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
					lineHeight="1"
				>
					{item.emoji}
				</Box>
				{rows > 2 && cols > 1 ? (
					<Box textAlign="center">{item.name}</Box>
				) : null}
			</Center>
		</GridItem>
	);
};

const CarbonItemWithGrid = ({ item }: { item: CarbonItem }): JSX.Element => {
	return (
		<Grid
			bg={grid}
			bgSize={backgroundSize}
			bgPos={`${gapSize}px ${gapSize}px`}
			padding={`${1 + gapSize}px`}
			autoColumns={`${gridSize}px`}
			autoRows={`${gridSize}px`}
			gap={`${gapSize}px`}
			width="min-content"
		>
			<CarbonItemBox item={item} />
		</Grid>
	);
};

export {
	CarbonItemBox,
	CarbonItemWithGrid,
	boxFromCarbon,
	approximate,
	gridSize,
	gapSize,
	backgroundSize,
	grid,
};
