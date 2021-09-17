import { Box, Heading, Stack } from '@chakra-ui/react';
import useSWR from 'swr';
import { useSuppliers } from '../hooks/climateWrapped';

export const Home = (): JSX.Element => {
	const { suppliers } = useSuppliers();
	console.log(suppliers);
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
