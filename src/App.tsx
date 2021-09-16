import {
	Button,
	ChakraProvider,
	extendTheme,
	HStack,
	Stack,
} from '@chakra-ui/react';
import { Container } from '@guardian/src-layout';
import { Step, Steps, StepsStyleConfig, useSteps } from 'chakra-ui-steps';
import { BrowserRouter as Router } from 'react-router-dom';
import { Header } from './components/Header';
import { Travel } from './sections/Travel';
import { CarbonEmissionsStateProvider } from './State';

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
		// { label: 'Social', content: <Social /> },
		// { label: 'Spending', content: <Spending /> },
		{ label: 'Travel', content: <Travel /> },
		// { label: 'Overview', content: <Overview /> },
	];

	const backDisabled = activeStep === 0;
	const nextDisabled = activeStep === steps.length;

	return (
		<ChakraProvider theme={theme}>
			<CarbonEmissionsStateProvider>
				<Router>
					<div className="App">
						<Stack direction="column" spacing="8">
							<Header />
							<Container>
								<HStack>
									<Button
										onClick={prevStep}
										disabled={backDisabled}
									>
										Back
									</Button>
									<Button
										onClick={nextStep}
										disabled={nextDisabled}
									>
										Next
									</Button>
								</HStack>
								<Steps activeStep={activeStep}>
									{steps.map(({ label, content }) => (
										<Step label={label} key={label}>
											{content}
										</Step>
									))}
								</Steps>
							</Container>
						</Stack>
					</div>
				</Router>
			</CarbonEmissionsStateProvider>
		</ChakraProvider>
	);
};
