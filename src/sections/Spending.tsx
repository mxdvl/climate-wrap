import { Box, Heading, Stack } from '@chakra-ui/react';
import { sections } from './Sections';

export const Spending = (): JSX.Element => {
	const emoji = sections.spending.emoji;
	return (
		<Stack spacing="4" mt="4">
			<Box>
				<Heading as="h2" size="3xl">
					Spending {emoji}
				</Heading>
			</Box>
		</Stack>
	);
};
