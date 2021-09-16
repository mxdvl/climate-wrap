import {
	Box,
	Heading,
	Slider,
	SliderFilledTrack,
	SliderThumb,
	SliderTrack,
} from '@chakra-ui/react';
import React from 'react';
import { useState } from 'react';
import { CarbonEmissions } from '../Context';
import { sections } from './Overview';

const carbonPerKm = {
	flight: 0.22, // kg CO2 / km
	car: 0.19, // kg CO2 / km
};

export const Travel = (): JSX.Element => {
	const [travelCarbon, setTravelCarbon] = useState<Record<string, number>>(
		{},
	);

	const total = Object.values(travelCarbon).reduce((a, b) => a + b, 0);

	const [state, dispatch] = React.useContext(CarbonEmissions);

	return (
		<div>
			<Heading as="h2">Travel</Heading>
			<p>
				{total.toFixed(1)} kg CO<sub>2</sub> / year.
			</p>
			<Heading as="h3">Total distance flow in a year</Heading>
			<Box>An average passenger flight is 11,000 km</Box>
			<Slider
				defaultValue={11_000}
				min={0}
				max={50_000}
				onChange={(value) => {
					setTravelCarbon({
						...travelCarbon,
						flights: value * carbonPerKm.flight,
					});

					// eslint-disable-next-line @typescript-eslint/no-unsafe-call -- it’s fine
					dispatch({ type: 'TRAVEL', payload: { travel: total } });
				}}
			>
				<SliderTrack>
					<SliderFilledTrack bg={sections.travel.colour} />
				</SliderTrack>
				<SliderThumb />
			</Slider>
		</div>
	);
};
