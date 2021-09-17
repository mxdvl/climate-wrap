import { Box, Heading, Stack } from '@chakra-ui/react';
import useSWR from 'swr';
import {
	useCarbonIntensity,
	useMp,
	useSupplierFuelMix,
	useSuppliersFuelMix,
	useSuppliersUsage,
} from '../hooks/climateWrapped';

export const Home = (): JSX.Element => {
	const { mpVotingRecord } = useMp('ip21 4rl');
	console.log(mpVotingRecord);

	return (
		<Stack spacing="4" mt="4">
			<Box>
				<Heading as="h2" size="3xl" textAlign="center">
					Home
				</Heading>
			</Box>
		</Stack>
	);
};
