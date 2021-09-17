import {
	Box,
	Button,
	Divider,
	Heading,
	HStack,
	Input,
	Spacer,
	Stack,
	Stat,
	StatArrow,
	StatGroup,
	StatHelpText,
	StatLabel,
	StatNumber,
} from '@chakra-ui/react';
import type { ChangeEvent } from 'react';
import { useState } from 'react';
import type {
	CarbonIntensityApiResponse,
	MpApiResponse,
} from '../hooks/climateWrapped';

const fetchMpData = async (
	postcode?: string,
): Promise<MpApiResponse | undefined> => {
	if (postcode) {
		const result = await fetch(
			`https://climate-wrapped-api.app.makani.dev/mp/${postcode}`,
		);
		return result.json() as unknown as MpApiResponse;
	}
};

const fetchCarbonIntensity = async (
	postcode?: string,
): Promise<CarbonIntensityApiResponse | undefined> => {
	if (postcode) {
		const result = await fetch(
			`https://climate-wrapped-api.app.makani.dev/carbon-intensity/${postcode}`,
		);
		return result.json() as unknown as CarbonIntensityApiResponse;
	}
};

export const Community = (): JSX.Element => {
	const [postcode, setPostCode] = useState<string>();
	const [mpData, setMpData] = useState<MpApiResponse>();
	const [carbonIntensity, setCarbonIntensity] =
		useState<CarbonIntensityApiResponse>();

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setPostCode(event.target.value);
	};
	const handleSubmit = () => {
		console.log(postcode);
		if (postcode) {
			void fetchMpData(postcode)
				.then((v) => setMpData(v))
				.catch((e) => console.log(e));
			void fetchCarbonIntensity(postcode.split(' ')[0])
				.then((v) => setCarbonIntensity(v))
				.catch((e) => console.log(e));
		}
	};
	console.log(mpData);
	console.log(carbonIntensity);
	return (
		<Stack spacing="4" mt="4">
			<Box>
				<Heading as="h2" size="3xl" textAlign="center">
					Community
				</Heading>
				<Heading as="h3" size="lg">
					Your Postcode
				</Heading>
				<Input
					width="xs"
					marginEnd="2"
					placeholder="N1 9GU"
					value={postcode}
					onChange={handleChange}
				/>
				<Button width="xs" colorScheme="blue" onClick={handleSubmit}>
					Get Info
				</Button>
				{mpData && (
					<Box>
						<Heading as="h3" size="lg">
							Your MP
						</Heading>
						<Heading as="h4" size="md">
							{mpData.title}
						</Heading>
						{mpData.votes.map((vote) => (
							<Stat>
								<StatLabel>{vote.general}</StatLabel>
								<StatHelpText>{vote.votes}</StatHelpText>
							</Stat>
						))}
					</Box>
				)}
				{carbonIntensity && (
					<Box>
						<Heading as="h3" size="lg">
							Carbon Intensity
						</Heading>
						<Heading as="h4" size="md">
							Region: {carbonIntensity.shortname}
						</Heading>
						<Stat>
							<StatLabel>Current Carbon Intensity</StatLabel>
							<StatNumber>
								{carbonIntensity.data[0].intensity.forecast}{' '}
								gCO2/kWh
							</StatNumber>
							<StatHelpText>Last 30 mins</StatHelpText>
						</Stat>
						<Heading as="h4" size="md">
							Current Region Fuel Generation Mix
						</Heading>
						<Divider />
						{carbonIntensity.data[0].generationmix.map((mix) => (
							<>
								<HStack>
									<Heading size="md">
										{mix.fuel.toUpperCase()}
									</Heading>
									<Spacer />
									<Heading size="md">{mix.perc}%</Heading>
								</HStack>
								<Divider />
							</>
						))}
					</Box>
				)}
			</Box>
		</Stack>
	);
};
