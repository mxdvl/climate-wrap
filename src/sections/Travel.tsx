import {
	Box,
	Center,
	Heading,
	HStack,
	Slider,
	SliderFilledTrack,
	SliderThumb,
	SliderTrack,
	Stack,
	Text,
} from '@chakra-ui/react';
import { Inline } from '@guardian/src-layout';
import React from 'react';
import { CarbonItemWithGrid } from '../components/CarbonItems';
import { Gauge } from '../components/Gauge';
import {
	CarbonEmissionsContext,
	carbonPerKm,
	carValues,
	commuteValues,
	flightValues,
} from '../State';
import { sections } from './Sections';

export const Travel = (): JSX.Element => {
	const { state, setState } = React.useContext(CarbonEmissionsContext);
	const total = Object.values(state.travel).reduce((a, b) => a + b, 0);
	const totalOutOf =
		flightValues.maxKms * carbonPerKm.flight +
		carValues.maxKms * carbonPerKm.car +
		commuteValues.maxKms * carbonPerKm.commute;
	const totalAvg =
		flightValues.avgKms * carbonPerKm.flight +
		carValues.avgKms * carbonPerKm.car +
		commuteValues.avgKms * carbonPerKm.commute;

	return (
		<Stack>
			<Box>
				<Heading as="h2" size="3xl" textAlign="center">
					Travel
				</Heading>
				<p>
					{total.toFixed(1)} kg CO<sub>2</sub> / year.
				</p>
			</Box>
			// TOTAL TRAVEL
			<Box>
				<Center>
					<Gauge
						score={total / totalOutOf}
						title="Total Travel Score"
						average={totalAvg / totalOutOf}
					/>
				</Center>
			</Box>
			<Center>
				<HStack spacing="4" mt="4">
					// FLIGHTS
					<Box>
						<Box>
							<Center>
								<Gauge
									score={
										state.travel.flights /
										(flightValues.maxKms *
											carbonPerKm.flight)
									}
									title="Flights"
									average={
										(flightValues.avgKms *
											carbonPerKm.flight) /
										(flightValues.maxKms *
											carbonPerKm.flight)
									}
								/>
							</Center>
						</Box>
						<Heading as="h3" size="lg">
							Total kms flown per year
						</Heading>
						<Box>
							An average passenger flight is {flightValues.avgKms}{' '}
							km
						</Box>
						<Slider
							colorScheme="blue"
							size="lg"
							defaultValue={flightValues.avgKms}
							min={0}
							max={flightValues.maxKms}
							value={
								(state.travel.flights / 11_000) *
								flightValues.maxKms
							}
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
								<SliderFilledTrack
									bg={sections.travel.colour[100]}
								/>
							</SliderTrack>
							<SliderThumb boxSize="6">
								<Text fontSize="lg">✈️</Text>
							</SliderThumb>
						</Slider>
						<div style={{ display: 'inline', float: 'left' }}>
							0 km
						</div>
						<div style={{ display: 'inline', float: 'right' }}>
							{flightValues.maxKms} km
						</div>
					</Box>
					// VEHICLES
					<Box>
						<Box>
							<Center>
								<Gauge
									score={
										state.travel.cars /
										(carValues.maxKms * carbonPerKm.car)
									}
									title="Vehicles"
									average={
										(carValues.avgKms * carbonPerKm.car) /
										(carValues.maxKms * carbonPerKm.car)
									}
								/>
							</Center>
						</Box>
						<Heading as="h3" size="lg">
							Total kms driven per year
						</Heading>
						<Box>
							An average distance in the UK is {carValues.avgKms}{' '}
							km
						</Box>
						<Slider
							colorScheme="blue"
							size="lg"
							defaultValue={carValues.avgKms}
							min={0}
							max={carValues.maxKms}
							value={
								(state.travel.cars / 1140) * carValues.maxKms
							}
							onChange={(value) => {
								console.log(value);
								setState({
									...state,
									travel: {
										...state.travel,
										cars: value * carbonPerKm.car,
									},
								});
							}}
						>
							<SliderTrack>
								<SliderFilledTrack
									bg={sections.travel.colour[100]}
								/>
							</SliderTrack>
							<SliderThumb boxSize="6">
								<Text fontSize="lg">✈️</Text>
							</SliderThumb>
						</Slider>
						<div style={{ display: 'inline', float: 'left' }}>
							0 km
						</div>
						<div style={{ display: 'inline', float: 'right' }}>
							{carValues.maxKms} km
						</div>
					</Box>
					// COMMUTE
					<Box>
						<Box>
							<Center>
								<Gauge
									score={
										state.travel.commute /
										(commuteValues.maxKms *
											carbonPerKm.commute)
									}
									title="Commuting"
									average={
										(commuteValues.avgKms *
											carbonPerKm.commute) /
										(commuteValues.maxKms *
											carbonPerKm.commute)
									}
								/>
							</Center>
						</Box>
						<Heading as="h3" size="lg">
							Total kms by train/bus per year
						</Heading>
						<Box>
							An average commute is {commuteValues.avgKms} km per
							year
						</Box>
						<Slider
							colorScheme="blue"
							size="lg"
							defaultValue={commuteValues.avgKms}
							min={0}
							max={commuteValues.maxKms}
							value={
								(state.travel.commute / 240) *
								commuteValues.maxKms
							}
							onChange={(value) => {
								console.log(value);
								setState({
									...state,
									travel: {
										...state.travel,
										commute: value * carbonPerKm.commute,
									},
								});
							}}
						>
							<SliderTrack>
								<SliderFilledTrack
									bg={sections.travel.colour[100]}
								/>
							</SliderTrack>
							<SliderThumb boxSize="6">
								<Text fontSize="lg">✈️</Text>
							</SliderThumb>
						</Slider>
						<div style={{ display: 'inline', float: 'left' }}>
							0 km
						</div>
						<div style={{ display: 'inline', float: 'right' }}>
							{commuteValues.maxKms} km
						</div>
					</Box>
				</HStack>
			</Center>
			<HStack alignItems="top">
				<CarbonItemWithGrid
					item={{
						name: 'flight',
						co2: state.travel.flights,
						section: 'travel',
						emoji: '✈️',
					}}
				/>
				<CarbonItemWithGrid
					item={{
						name: 'private vehicles',
						co2: state.travel.cars,
						section: 'travel',
						emoji: '🚗',
					}}
				/>
				<CarbonItemWithGrid
					item={{
						name: 'commute',
						co2: state.travel.commute,
						section: 'travel',
						emoji: '🚆',
					}}
				/>
			</HStack>
		</Stack>
	);
};
