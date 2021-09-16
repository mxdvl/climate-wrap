import {
	Box,
	Heading,
	Slider,
	SliderFilledTrack,
	SliderThumb,
	SliderTrack,
} from '@chakra-ui/react';
import React from 'react';
import { CarbonEmissionsContext } from '../State';
import { sections } from './Sections';

const carbonPerKm = {
	flight: 0.22, // kg CO2 / km
	car: 0.19, // kg CO2 / km
};

export const Travel = (): JSX.Element => {
	const { state, setState } = React.useContext(CarbonEmissionsContext);
	const total = Object.values(state.travel).reduce((a, b) => a + b, 0);

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
					setState({
						...state,
						travel: {
							...state.travel,
							flights: value * carbonPerKm.flight,
						},
					});
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
