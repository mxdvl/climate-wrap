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
					const width = `${1.8 * 100 * (consumption / total)}%`;
					const height = '40%';
					const order =
						Object.values(consumptions)
							.filter((v) => v > 0)
							.sort(numeric)
							.indexOf(consumption) + 1;

					if (id == 'community') return;
					if (id === 'overview') return;

					return (
						<WrapItem
							key={id}
							order={order === 1 ? -1 : order % 4}
							width={width}
							height={height}
						>
							<Box
								padding={1}
								margin={1}
								width="100%"
								height="100%"
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
