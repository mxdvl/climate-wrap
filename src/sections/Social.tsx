import { Box, Heading, Radio, RadioGroup, Stack } from '@chakra-ui/react';
import React from 'react';
import { CarbonItemWithGrid } from '../components/CarbonItems';
import { CarbonEmissionsContext } from '../State';
import { sections } from './Sections';

export const Social = (): JSX.Element => {
	// const [diet, setDiet] = React.useState('1');
	const { state, setState } = React.useContext(CarbonEmissionsContext);
	const { carbonItems, social } = state;
	console.log(carbonItems);
	return (
		<Stack spacing="4" mt="4" dir="horizontal">
			<Box>
				<Heading as="h2" size="3xl" textAlign="center">
					Social
				</Heading>
				<Heading as="h3" size="lg">
					Diet
				</Heading>
				<RadioGroup
					onChange={(val) => {
						setState({
							...state,
							social: {
								...social,
								diet: parseInt(val, 10),
							},
						});
					}}
					value={social.diet}
				>
					{carbonItems.map((v, i) => (
						<Radio value={i} key={v.name}>
							{v.name} {v.emoji}
						</Radio>
					))}
				</RadioGroup>
				<Heading as="h3" size="lg">
					Carbon Impact
				</Heading>
			</Box>
			<CarbonItemWithGrid item={carbonItems[social.diet]} />
		</Stack>
	);
};
