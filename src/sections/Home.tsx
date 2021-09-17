import { Box, Heading, Select, Stack } from '@chakra-ui/react';
import React from 'react';
import {
	useCarbonIntensity,
	useMp,
	useSupplierFuelMix,
	useSuppliers,
	useSuppliersFuelMix,
	useSuppliersUsage,
} from '../hooks/climateWrapped';
import { CarbonEmissionsContext } from '../State';

export const Home = (): JSX.Element => {
	const { state, setState } = React.useContext(CarbonEmissionsContext);
	const { suppliers } = useSuppliers();

	return (
		<Stack spacing="4" mt="4">
			<Box>
				<Heading as="h2" size="3xl" textAlign="center">
					Home
				</Heading>
				<Stack>
					<Heading as="h3" size="lg">
						Find your supplier
					</Heading>
					<Select placeholder="Select option">
						{suppliers?.map((supplier) => (
							<option key={supplier.code} value={supplier.code}>
								{supplier.name}
							</option>
						))}
					</Select>
				</Stack>
			</Box>
		</Stack>
	);
};
