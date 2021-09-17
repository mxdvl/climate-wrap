import {
	Box,
	Center,
	Grid,
	GridItem,
	Heading,
	Stack,
	theme,
} from '@chakra-ui/react';
import type { CarbonItem } from '../components/CarbonItems';
import {
	backgroundSize,
	boxFromCarbon,
	CarbonItemBox,
	gapSize,
	grid,
	gridSize,
} from '../components/CarbonItems';
import { sections } from './Sections';

const numeric = (a: number, b: number) => b - a;

export const Overview = (): JSX.Element => {
	// const total = getTotal(consumptions);
	let total = 0;
	const emoji = sections.overview.emoji;

	const items: CarbonItem[] = [
		{
			name: 'long-haul flight',
			emoji: '✈️',
			co2: 2500,
			section: 'travel',
		},

		{
			name: 'basic plant-based diet',
			emoji: '🥬',
			co2: 1400,
			section: 'social',
		},
		{
			name: 'meat diet',
			emoji: '🥩',
			co2: 1200,
			section: 'social',
		},

		{
			name: 'beans',
			emoji: '☕',
			co2: Math.ceil(0.28 * 365 * 1.2),
			section: 'spending',
		},
	];

	const sorted = items.sort((a, b) => numeric(a.co2, b.co2));

	return (
		<Stack spacing="4" mt="4">
			<Heading as="h3" textAlign="center" size="3xl">
				Overview {emoji}
			</Heading>
			<Center>
				<Box>Each block represents 10 kg CO2e</Box>
			</Center>
			<Center>
				<Grid
					bg={theme.colors.gray[100]}
					templateColumns={`repeat(52, ${gridSize}px)`}
					templateRows={`repeat(20, ${gridSize}px)`}
					bgImage={grid}
					bgSize={backgroundSize}
					bgPos={`${gapSize}px ${gapSize}px`}
					p={`${1 + gapSize}px`}
					w={'min-content'}
					m={4}
					gap={`${gapSize}px`}
					gridAutoFlow="column dense"
					gridAutoColumns={`${backgroundSize}px`}
				>
					{sorted.map((item, index) => {
						const [rows, columns] = boxFromCarbon(item.co2);
						total += rows * columns;
						return <CarbonItemBox key={index} item={item} />;
					})}

					{Array(Math.max(0, 1040 - Math.floor(total)))
						.fill(Array.from('🌳🌳🌳🌳🌲🌲🌲🌴🌿🌵'))
						.map((tree: string, index) => (
							<GridItem
								key={index}
								rowSpan={1}
								colSpan={1}
								fontSize={'0.875rem'}
							>
								<Center h={'100%'}>
									{
										tree[
											Math.floor(
												Math.random() * tree.length,
											)
										]
									}
								</Center>
							</GridItem>
						))}
				</Grid>
			</Center>
			<Box>
				You have {1040 - Math.floor(total)} kg CO2e left to meet UK 2045
				carbon zero targets
			</Box>
		</Stack>
	);
};
