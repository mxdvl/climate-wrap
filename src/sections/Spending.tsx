import { Box, Checkbox, Heading, Stack, VStack } from '@chakra-ui/react';
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

				<VStack>
					{state.spending.map((v, i) => (
						<Checkbox
							defaultChecked={v.used}
							checked={v.used}
							key={i}
							onChange={() => {
								const newSpends = [...state.spending];
								newSpends[i].used = !newSpends[i].used;

								console.log(i, newSpends);
								setState({
									...state,
									spending: newSpends,
								});
							}}
						>
							{v.item.name} {v.item.emoji}
						</Checkbox>
					))}
				</VStack>
			</Box>
		</Stack>
	);
};
