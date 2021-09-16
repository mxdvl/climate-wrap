import { Box, Heading, Stack } from '@chakra-ui/react';
import { sections } from './Sections';

export const Social = (): JSX.Element => {
	const emoji = sections.social.emoji;
	return (
		<Stack spacing="4" mt="4">
			<Box>
				<Heading as="h2" size="3xl">
					Social {emoji}
				</Heading>
			</Box>
		</Stack>
	);
};
