import { Box, Heading, Stack } from '@chakra-ui/react';
import { sections } from './Sections';

export const Home = (): JSX.Element => {
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
