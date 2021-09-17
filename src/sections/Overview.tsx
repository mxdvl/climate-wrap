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
import { useState } from 'react';
import grid from '../grid.svg';
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

const numeric = (a: number, b: number) => b - a;

export const Overview = (): JSX.Element => {
	const [consumptions, setConsumptions] = useState(defaultConsumptions);

	// const total = getTotal(consumptions);
	let total = 0;
	const emoji = sections.overview.emoji;
	return (
		<Stack spacing="4" mt="4">
			<Heading as="h3" textAlign="center" size="3xl">
				Overview {emoji}
			</Heading>
			<Center>
				<Grid
					bg={theme.colors.gray[100]}
					templateColumns={'repeat(30, 32px)'}
					templateRows="repeat(10, 32px)"
					bgImage={grid}
					bgSize={36}
					bgPos={'2px 2px'}
					p={'4px'}
					w={'min-content'}
					m={4}
					gap={'4px'}
					gridAutoFlow="column dense"
					gridAutoColumns={'18px'}
				>
					{[
						[2, 1],
						[5, 2],
						[3, 6],
						[4, 2],
						[2, 2],
						[10, 4],
						[2, 2],
						[6, 6],
						[6, 6],
						[7, 7],
						[1, 1],
						[3, 1],
						[1, 1],
						[1, 4],
						[2, 4],
						[2, 4],
						[1, 1],
						[4, 1],
					].map((size, index) => {
						const randomSize = [
							Math.floor(Math.random() * 4) + 1,
							Math.floor(Math.random() * 3) + 1,
						];
						const [r, c] = Math.random() < 0.3 ? randomSize : size;

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
								border={'2px solid '}
								borderColor={colour[400]}
							>
								<Center h={'100%'}>{index}</Center>
							</GridItem>
						);
					})}
					{Array(300 - total)
						.fill(Array.from('🌳🌳🌳🌳🌲🌲🌲🌴🌿🌵'))
						.map((tree: string) => (
							<GridItem rowSpan={1} colSpan={1}>
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
		</Stack>
	);
};
