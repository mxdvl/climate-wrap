import { Box, Heading, Stack } from '@chakra-ui/react';
import { sections } from './Sections';

export const Community = (): JSX.Element => {
	const emoji = sections.community.emoji;

	return (
		<Stack spacing="4" mt="4">
			<Box>
				<Heading as="h2" size="3xl">
					Community {emoji}
				</Heading>
			</Box>
		</Stack>
	);
};
