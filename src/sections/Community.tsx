import {
	Box,
	Button,
	Heading,
	Input,
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
import { useCarbonIntensity, useMp } from '../hooks/climateWrapped';
import type { MpApiResponse } from '../hooks/climateWrapped';

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

export const Community = (): JSX.Element => {
	const [postcode, setPostCode] = useState<string>();
	const [mpData, setMpData] = useState<MpApiResponse>();

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setPostCode(event.target.value);
	};
	const handleSubmit = () => {
		console.log(postcode);
		if (postcode) {
			void fetchMpData(postcode)
				.then((v) => setMpData(v))
				.catch((e) => console.log(e));
		}
	};
	console.log(mpData);
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
				<Heading as="h3" size="lg">
					Carbon Intensity
				</Heading>
			</Box>
		</Stack>
	);
};
