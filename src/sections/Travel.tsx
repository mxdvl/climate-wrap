import {
	Box,
	Center,
	Heading,
	Slider,
	SliderFilledTrack,
	SliderThumb,
	SliderTrack,
	Stack,
	Text,
} from '@chakra-ui/react';
import React from 'react';
import { Gauge } from '../components/Gauge';
import { CarbonEmissionsContext, carbonPerKm, flightValues } from '../State';
import { sections } from './Sections';

export const Travel = (): JSX.Element => {
	const { state, setState } = React.useContext(CarbonEmissionsContext);
	const total = Object.values(state.travel).reduce((a, b) => a + b, 0);

	return (
		<Stack spacing="4" mt="4">
			<Box>
				<Heading as="h2" size="3xl" textAlign="center">
					Travel
				</Heading>
				<p>
					{total.toFixed(1)} kg CO<sub>2</sub> / year.
				</p>
			</Box>
			<Box>
				<Center>
					<Gauge
						score={
							state.travel.flights /
							(flightValues.maxKms * carbonPerKm.flight)
						}
						title="Flights"
						average={
							(flightValues.avgKms * carbonPerKm.flight) /
							(flightValues.maxKms * carbonPerKm.flight)
						}
					/>
				</Center>
			</Box>
			<Box>
				<Heading as="h3" size="lg">
					Total distance flown in a year
				</Heading>
				<Box>An average passenger flight is 11,000 km</Box>
				<Slider
					colorScheme="blue"
					size="lg"
					defaultValue={flightValues.avgKms}
					min={0}
					max={flightValues.maxKms}
					onChange={(value) => {
						console.log(value);
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
						<SliderFilledTrack bg={sections.travel.colour[100]} />
					</SliderTrack>
					<SliderThumb boxSize="6">
						<Text fontSize="lg">✈️</Text>
					</SliderThumb>
				</Slider>
			</Box>
		</Stack>
	);
};
