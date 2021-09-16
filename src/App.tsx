import {
	Box,
	ChakraProvider,
	extendTheme,
	Flex,
	HStack,
	Stack,
} from '@chakra-ui/react';
import { css } from '@emotion/react';
import { LinkButton } from '@guardian/src-button';
import { brand } from '@guardian/src-foundations';
import {
	SvgArrowLeftStraight,
	SvgArrowRightStraight,
} from '@guardian/src-icons';
import { Container } from '@guardian/src-layout';
import { Step, Steps, StepsStyleConfig, useSteps } from 'chakra-ui-steps';
import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { FontFamily } from './fonts/Font';
import { Fonts } from './fonts/fonts';
import { Community } from './sections/Community';
import { Home } from './sections/Home';
import { Overview } from './sections/Overview';
import { sections as sectionDetails } from './sections/Sections';
import { Social } from './sections/Social';
import { Spending } from './sections/Spending';
import { Travel } from './sections/Travel';
import { CarbonEmissionsStateProvider } from './State';

const theme = extendTheme({
	components: {
		Steps: StepsStyleConfig,
	},
	colors: {
		blue: {
			500: brand[400],
		},
	},
	fonts: { heading: FontFamily.HEADLINE, body: FontFamily.SANS },
});

export const App = (): JSX.Element => {
	const { nextStep, prevStep, setStep, reset, activeStep } = useSteps({
		initialStep: 0,
	});
	const location = useLocation();
	const history = useHistory();

	const sections = Object.values(sectionDetails);
	const sectionKeys = Object.keys(sectionDetails);

	// Set the step to the loaded path.
	React.useEffect(() => {
		const path = location.pathname.split('/')[1];
		const indexOfPath = sectionKeys.indexOf(path);
		const step = indexOfPath > -1 ? indexOfPath : 0;
		setStep(step);
	}, []);

	React.useEffect(() => {
		const route = sectionKeys[activeStep];
		history.push(`/${route}`);
	}, [activeStep]);

	const stepComponents: Record<string, React.ReactNode> = {
		Social: <Social />,
		Spending: <Spending />,
		Travel: <Travel />,
		Overview: <Overview />,
		Home: <Home />,
		Community: <Community />,
	};

	const backDisabled = activeStep === 0;
	const nextDisabled = activeStep === sections.length - 1;

	return (
		<ChakraProvider theme={theme}>
			<Fonts />
			<CarbonEmissionsStateProvider>
				<Stack direction="column" spacing="4">
					<Header />
					<Container>
						<Box height="78vh">
							<Steps activeStep={activeStep} colorScheme="blue">
								{sections.map(({ emoji, name }) => (
									<Step
										label={name}
										key={name}
										icon={() => <span>{emoji}</span>}
									>
										<Flex direction="column" h="100%">
											{stepComponents[name]}
											<HStack
												marginTop="auto"
												alignSelf="center"
												spacing="8"
											>
												<LinkButton
													cssOverrides={css`
														visibility: ${!backDisabled
															? 'visible'
															: 'hidden'};
													`}
													onClick={prevStep}
													iconSide="left"
													nudgeIcon
													icon={
														<SvgArrowLeftStraight />
													}
												>
													Back
												</LinkButton>

												<LinkButton
													cssOverrides={css`
														visibility: ${!nextDisabled
															? 'visible'
															: 'hidden'};
													`}
													onClick={nextStep}
													iconSide="right"
													nudgeIcon
													icon={
														<SvgArrowRightStraight />
													}
												>
													Next
												</LinkButton>
											</HStack>
										</Flex>
									</Step>
								))}
							</Steps>
						</Box>
					</Container>
				</Stack>
			</CarbonEmissionsStateProvider>
		</ChakraProvider>
	);
};
