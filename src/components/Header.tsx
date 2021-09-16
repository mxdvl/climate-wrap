import { Box, Flex, Stack } from '@chakra-ui/react';
import { css } from '@emotion/react';
import { Logo } from '@guardian/src-ed-logo';
import { brand } from '@guardian/src-foundations';
import { Container } from '@guardian/src-layout';

export const Header: React.FC = () => (
	<Box as="header" bg={brand[400]}>
		<Container>
			<Flex justifyContent="right">
				<Box as={Logo} logoType="standard" />
			</Flex>
		</Container>
	</Box>
);
