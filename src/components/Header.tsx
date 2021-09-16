import { Box, Flex, Stack } from '@chakra-ui/react';
import { Logo } from '@guardian/src-ed-logo';
import { brand } from '@guardian/src-foundations';
import { Container } from '@guardian/src-layout';

export const Header: React.FC = () => (
	<Box as="header" bg={brand[400]} paddingY="4">
		<Container>
			<Flex justifyContent="right">
				<Box as={Logo} logoType="standard" />
			</Flex>
		</Container>
	</Box>
);
