import { Box, Heading, Stack } from '@chakra-ui/react';
import useSWR from 'swr';
import { useSuppliers, useSuppliersUsage } from '../hooks/climateWrapped';

export const Home = (): JSX.Element => {
	const { emissions } = useSuppliersUsage('avro1', 3100);
	console.log(emissions);

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
