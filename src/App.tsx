import { ChakraProvider, extendTheme, Heading } from '@chakra-ui/react';
import { Overview } from './sections/Overview';
import { Travel } from './sections/Travel';

const theme = extendTheme({
	colors: {
		brand: {
			100: '#f7fafc',
			900: '#1a202c',
		},
	},
});

export const App = (): JSX.Element => {
	return (
		<ChakraProvider theme={theme}>
			<div className="App">
				<Heading as="h3" textAlign="center">
					HEADER HERE
				</Heading>

				<Overview />

				<Travel />

				{/* etc */}
			</div>
		</ChakraProvider>
	);
};
