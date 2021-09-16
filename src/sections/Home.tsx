import { Box, Heading, Stack } from '@chakra-ui/react';
import { sections } from './Sections';

export const Home = (): JSX.Element => {
	const emoji = sections.home.emoji;
	return (
		<Stack spacing="4" mt="4">
			<Box>
				<Heading as="h2" size="3xl">
					Home {emoji}
				</Heading>
			</Box>
		</Stack>
	);
};
