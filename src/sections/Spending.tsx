import { Box, Checkbox, CheckboxGroup, Heading, Stack } from '@chakra-ui/react';
import React from 'react';
import { CarbonEmissionsContext } from '../State';

export const Spending = (): JSX.Element => {
	const { state, setState } = React.useContext(CarbonEmissionsContext);

	return (
		<Stack spacing="4" mt="4">
			<Box>
				<Heading as="h2" size="3xl" textAlign="center">
					Spending
				</Heading>

				{/* <CheckboxGroup
					onChange={(val) => {
						setState({
							...state,
							spending: {
								...spending,
								diet: parseInt(val, 10),
							},
						});
					}}
					value={social.diet}
				>
					{carbonItems.map((v, i) => (
						<Checkbox value={i} key={v.name}>
							{v.name} {v.emoji}
						</Checkbox>
					))}
				</CheckboxGroup> */}
			</Box>
		</Stack>
	);
};
