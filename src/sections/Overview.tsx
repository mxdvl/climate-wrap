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
	CarbonItemWithGrid,
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
		<Stack spacing="6" mt="4">
			<Heading as="h3" textAlign="center" size="3xl">
				Overview {emoji}
			</Heading>
			<Center>
				<Box>Each block represents 10 kg CO2e</Box>
			</Center>
			<Center m={4}>
				<Grid
					bg={theme.colors.gray[100]}
					templateColumns={`repeat(52, ${gridSize}px)`}
					templateRows={`repeat(20, ${gridSize}px)`}
					bgImage={grid}
					bgSize={backgroundSize}
					bgPos={`${gapSize}px ${gapSize}px`}
					p={`${1 + gapSize}px`}
					w={'min-content'}
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
						.fill(Array.from('🌳🌳🌳🌳🌳🌳🌲🌲🌲🌲🌴🌿🌵'))
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
			<Center>
				<Box marginBottom={6}>
					For 2021, you have {1040 - Math.floor(total)} kg CO2e left
					to meet the UK’s 2045 net-zero carbon target.
				</Box>
			</Center>

			<CarbonItemWithGrid
				item={{
					co2: 500,
					name: 'something',
					emoji: '5',
					section: 'travel',
				}}
			/>
			<CarbonItemWithGrid
				item={{
					co2: 10,
					name: '10',
					emoji: '1',
					section: 'home',
				}}
			/>
			<CarbonItemWithGrid
				item={{
					co2: 20,
					name: '20',
					emoji: '2',
					section: 'home',
				}}
			/>
			<CarbonItemWithGrid
				item={{
					co2: 30,
					name: '30',
					emoji: '3',
					section: 'home',
				}}
			/>
			<CarbonItemWithGrid
				item={{
					co2: 40,
					name: '40',
					emoji: '4',
					section: 'home',
				}}
			/>
			<CarbonItemWithGrid
				item={{
					co2: 50,
					name: '50',
					emoji: '5',
					section: 'home',
				}}
			/>
			<CarbonItemWithGrid
				item={{
					co2: 60,
					name: '60',
					emoji: '6',
					section: 'home',
				}}
			/>
			<CarbonItemWithGrid
				item={{
					co2: 70,
					name: '70',
					emoji: '7',
					section: 'home',
				}}
			/>
			<CarbonItemWithGrid
				item={{
					co2: 80,
					name: '80',
					emoji: '8',
					section: 'home',
				}}
			/>
			<CarbonItemWithGrid
				item={{
					co2: 90,
					name: '90',
					emoji: '9',
					section: 'home',
				}}
			/>
			<CarbonItemWithGrid
				item={{
					co2: 100,
					name: '100',
					emoji: '2',
					section: 'home',
				}}
			/>
		</Stack>
	);
};
