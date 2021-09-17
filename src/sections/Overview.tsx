import {
	Box,
	Button,
	Center,
	Grid,
	GridItem,
	Heading,
	Stack,
	theme,
} from '@chakra-ui/react';
import { useSteps } from 'chakra-ui-steps';
import React from 'react';
import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
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
import { CarbonEmissionsContext } from '../State';
import type { Section, SectionType } from './Sections';
import { sections } from './Sections';

const numeric = (a: number, b: number) => b - a;

export const Overview = ({
	setStep,
}: {
	setStep: (step: number) => void;
}): JSX.Element => {
	const { state } = React.useContext(CarbonEmissionsContext);

	const itemsByIndex: CarbonItem[] = [state.social.diet].map(
		(i) => state.carbonItems[i],
	);
	const items: CarbonItem[] = [
		...itemsByIndex,
		{
			name: 'flights',
			co2: state.travel.flights,
			section: 'travel',
			emoji: '✈️',
		},
		{
			name: 'cars',
			co2: state.travel.cars,
			section: 'travel',
			emoji: '🚗',
		},
		{
			name: 'commute',
			co2: state.travel.commute,
			section: 'travel',
			emoji: '🚆',
		},
		...state.spending.filter((i) => i.used).map((v) => v.item),
	];

	let total = 0;
	const emoji = sections.overview.emoji;
	// const sorted = items.sort((a, b) => numeric(a.co2, b.co2));
	const sectionIds = Object.keys(sections);
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
					{items.map((item, index) => {
						const [rows, columns] = boxFromCarbon(item.co2);
						total += rows * columns;
						return (
							<CarbonItemBox
								onClick={() => {
									const indexOfPath = sectionIds.indexOf(
										item.section,
									);
									console.log('we clicked', indexOfPath);
									const step =
										indexOfPath > -1 ? indexOfPath : 0;
									setStep(step);
								}}
								key={index}
								item={item}
							/>
						);
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
		</Stack>
	);
};
