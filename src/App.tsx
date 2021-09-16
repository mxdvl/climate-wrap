import {
	Box,
	Button,
	ChakraProvider,
	extendTheme,
	Flex,
	HStack,
	Stack,
	VStack,
} from '@chakra-ui/react';
import { Container } from '@guardian/src-layout';
import { Step, Steps, StepsStyleConfig, useSteps } from 'chakra-ui-steps';
import { Link, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { Header } from './components/Header';
import { Overview } from './sections/Overview';
import { Social } from './sections/Social';
import { Spending } from './sections/Spending';
import { Travel } from './sections/Travel';

const theme = extendTheme({
	components: {
		Steps: StepsStyleConfig,
	},
});

export const App = (): JSX.Element => {
	const { nextStep, prevStep, setStep, reset, activeStep } = useSteps({
		initialStep: 0,
	});

	const steps = [
		{ label: 'Social', content: Social },
		{ label: 'Spending', content: Spending },
		{ label: 'Travel', content: Travel },
		{ label: 'Overview', content: Overview },
	];

	const backDisabled = activeStep === 0;
	const nextDisabled = activeStep === steps.length;
	return (
		<ChakraProvider theme={theme}>
			<Router>
				<div className="App">
					<Stack direction="column" spacing="8">
						<Header />
						<Container>
							<Steps activeStep={activeStep}>
								{steps.map(({ label, content }) => (
									<Step label={label} key={label}>
										{content}
									</Step>
								))}
							</Steps>
						</Container>
						<HStack>
							<Button onClick={prevStep} disabled={backDisabled}>
								Back
							</Button>
							<Button onClick={nextStep} disabled={nextDisabled}>
								Next
							</Button>
						</HStack>
					</Stack>
				</div>
			</Router>
		</ChakraProvider>
	);
};
