import {
	Box,
	Heading,
	Slider,
	SliderFilledTrack,
	SliderThumb,
	SliderTrack,
	theme,
	Wrap,
	WrapItem,
} from '@chakra-ui/react';
import { useState } from 'react';

type Section = {
	name: string;
	colour: string;
	emoji: string;
	description: string;
};

type SectionType = 'travel' | 'community' | 'home' | 'spending' | 'social';

const sections: Record<SectionType, Section> = {
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
};

type Consumptions = Record<SectionType, number>;

const defaultConsumptions: Consumptions = {
	travel: 600,
	home: 1800,
	spending: 500,
	social: 1200,
	community: 0,
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

	const total = getTotal(consumptions);

	return (
		<Box bg={theme.colors.gray[100]}>
			<Heading as="h3" textAlign="center">
				OVERVIEW section
			</Heading>

			<Wrap spacing={2} align="center" justify="center" width="100%">
				{Object.entries(sections).map((entry) => {
					const [id, section] = entry as [SectionType, Section];
					const consumption = consumptions[id];
					const width = `${1.8 * 100 * (consumption / total)}vw`;
					const height = '40vh';
					const order =
						Object.values(consumptions)
							.filter((v) => v > 0)
							.sort(numeric)
							.indexOf(consumption) + 1;

					if (id == 'community') return;

					return (
						<WrapItem key={id} order={order === 1 ? -1 : order % 4}>
							<Box
								padding={1}
								margin={1}
								width={width}
								height={height}
								background={section.colour}
								flexWrap="wrap"
							>
								<Heading as="h4">{section.name}</Heading>
								{section.description}

								<Heading as="h5">
									{consumption} Kg CO<sub>2</sub>
								</Heading>
							</Box>
						</WrapItem>
					);
				})}
			</Wrap>

			<Slider
				value={consumptions.travel}
				min={1}
				max={2000}
				onChange={(value) => {
					setConsumptions({ ...consumptions, travel: value });
					return value;
				}}
			>
				<SliderTrack>
					<SliderFilledTrack bg={sections.travel.colour} />
				</SliderTrack>
				<SliderThumb />
			</Slider>

			<Slider
				value={consumptions.home}
				min={1}
				max={2000}
				onChange={(value) => {
					setConsumptions({ ...consumptions, home: value });
					return value;
				}}
			>
				<SliderTrack>
					<SliderFilledTrack bg={sections.home.colour} />
				</SliderTrack>
				<SliderThumb />
			</Slider>

			<Slider
				defaultValue={consumptions.spending}
				min={1}
				max={2000}
				onChange={(value) => {
					setConsumptions({ ...consumptions, spending: value });
					return value;
				}}
			>
				<SliderTrack>
					<SliderFilledTrack bg={sections.spending.colour} />
				</SliderTrack>
				<SliderThumb />
			</Slider>

			<Slider
				value={consumptions.social}
				min={1}
				max={2000}
				onChange={(value) => {
					setConsumptions({ ...consumptions, social: value });
					return value;
				}}
			>
				<SliderTrack>
					<SliderFilledTrack bg={sections.social.colour} />
				</SliderTrack>
				<SliderThumb />
			</Slider>
		</Box>
	);
};
