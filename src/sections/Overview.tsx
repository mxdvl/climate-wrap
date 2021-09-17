import {
	Box,
	Center,
	Grid,
	GridItem,
	Heading,
	Slider,
	SliderFilledTrack,
	SliderThumb,
	SliderTrack,
	Stack,
	theme,
	Wrap,
	WrapItem,
} from '@chakra-ui/react';
import { svgBackgroundImage } from '@guardian/src-helpers';
import { useState } from 'react';
import ReactDOM from 'react-dom';
import type { Section, SectionType } from './Sections';
import { sections } from './Sections';

type Consumptions = Record<SectionType, number>;

const defaultConsumptions: Consumptions = {
	travel: 600,
	home: 1800,
	spending: 500,
	social: 1200,
	community: 0,
	overview: 0,
};

const getTotal = (consumptions: Consumptions) => {
	const real = Object.values(consumptions).reduce(
		(total, add) => total + add,
	);
	const values = Object.values(consumptions)
		.filter((v) => v > 0)
		.sort(numeric);
	const [one, two, three, four] = values;
	const visual = Math.max(one + four, two + three) * 2;

	return Math.max(real, visual);
};

const rand = (min: number, max: number) =>
	Math.floor(Math.random() * (max - min)) + min;

const numeric = (a: number, b: number) => b - a;

type Size = [number, number];
const boxFromCarbon = (co2: number): Size => {
	const blocks = Math.round(co2 / 10);
	const width = Math.floor(Math.sqrt(blocks)) || 1;
	const height = Math.round(blocks / width) || 1;

	console.log(co2, blocks, [width, height]);

	return [width, height];
};

export const Overview = (): JSX.Element => {
	// const total = getTotal(consumptions);
	let total = 0;
	const emoji = sections.overview.emoji;

	const items: Size[] = [
		boxFromCarbon(2500), // long-haul flight

		boxFromCarbon(1400), // plant-based diet (base)
		boxFromCarbon(1200), // meat diet

		boxFromCarbon(100),
		boxFromCarbon(100),
		boxFromCarbon(100),
		boxFromCarbon(100),
		boxFromCarbon(100),
		boxFromCarbon(100),

		boxFromCarbon(150),
		boxFromCarbon(150),
		boxFromCarbon(150),
		boxFromCarbon(150),

		boxFromCarbon(250),
		boxFromCarbon(250),
		boxFromCarbon(250),

		// boxFromCarbon(rand(100, 2500)),
	];

	const sorted = items.sort((a: Size, b: Size) =>
		numeric(a[0] * a[1], b[0] * b[1]),
	);

	const gridSize = 24;
	const gapSize = 2;
	const backgroundSize = gridSize + gapSize;

	const grid = svgBackgroundImage(`
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${backgroundSize} ${backgroundSize}">
			<g fill="#abc">
				<circle cx="0" cy="0" r="1" />
				<circle cx="${backgroundSize}" cy="0" r="1" />
				<circle cx="0" cy="${backgroundSize}" r="1" />
				<circle cx="${backgroundSize}" cy="${backgroundSize}" r="1" />
			</g>
		</svg>`);

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
					{sorted.map((size, index) => {
						const [r, c] = size;

						total += r * c;

						const section = [
							sections.spending,
							sections.home,
							sections.social,
							sections.travel,
						][index % 4];
						const { colour } = section;
						return (
							<GridItem
								rowSpan={r}
								colSpan={c}
								bg={colour[100]}
								borderRadius={6}
								border={'2px solid '}
								borderColor={colour[400]}
							>
								<Center h={'100%'}>{index}</Center>
							</GridItem>
						);
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
			<Box>Leftover Carbon = {1040 - Math.floor(total)}</Box>
		</Stack>
	);
};

export { boxFromCarbon };
