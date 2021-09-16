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

const consumptions: Record<SectionType, number> = {
	travel: 600,
	home: 2000,
	spending: 500,
	social: 1200,
	community: 0,
};

export const Overview = (): JSX.Element => (
	<Box bg={theme.colors.gray[100]}>
		<Heading as="h3" textAlign="center">
			OVERVIEW section
		</Heading>

		<Wrap spacing={2} align="center" justify="center" width="100%">
			{Object.entries(sections).map((entry) => {
				const [id, section] = entry as [SectionType, Section];
				const total = Object.values(consumptions).reduce(
					(total, add) => total + add,
				);
				const consumption = consumptions[id];
				const width = `${(180 * consumption) / total}vw`;
				const height = '40vh';
				const order =
					Object.values(consumptions)
						.sort((a, b) => b - a)
						.indexOf(consumption) + 1;

				if (id == 'community') return;

				return (
					<WrapItem key={id} order={order}>
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
						</Box>
					</WrapItem>
				);
			})}
		</Wrap>

		<SliderController></SliderController>
	</Box>
);

const SliderController = () => {
	return (
		<Slider defaultValue={100}>
			<SliderTrack>
				<SliderFilledTrack />
			</SliderTrack>
			<SliderThumb />
		</Slider>
	);
};
