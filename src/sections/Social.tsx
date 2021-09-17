import { Box, Heading, Radio, RadioGroup, Stack } from '@chakra-ui/react';
import { sections } from './Sections';

export const Social = (): JSX.Element => {
	const emoji = sections.social.emoji;
	return (
		<Stack spacing="4" mt="4">
			<Box>
				<Heading as="h2" size="3xl" textAlign="center">
					Social
				</Heading>
				<Heading as="h3" size="lg">
					Diet
				</Heading>
				<RadioGroup>
					<Radio value="1">Meat</Radio>
					<Radio value="2">Vegetarian</Radio>
					<Radio value="3">Pescitarian</Radio>
					<Radio value="4">Vegan</Radio>
				</RadioGroup>
			</Box>
		</Stack>
	);
};
