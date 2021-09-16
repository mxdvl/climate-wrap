import { Box, Flex, Heading, HStack, Spacer, Stack } from '@chakra-ui/react';
import { Logo } from '@guardian/src-ed-logo';
import { brand } from '@guardian/src-foundations';
import { Container } from '@guardian/src-layout';

export const Header: React.FC = () => (
	<Box as="header" bg={brand[400]} paddingY="2">
		<Container>
			<Flex direction="row">
				<Flex justifyContent="left" alignItems="center">
					<Heading color="white">Climate Calculator</Heading>
				</Flex>
				<Spacer />
				<Flex>
					<Box as={Logo} logoType="standard" />
				</Flex>
			</Flex>
		</Container>
	</Box>
);
