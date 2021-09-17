import {
	Box,
	Center,
	Divider,
	Heading,
	HStack,
	Select,
	Spacer,
	Stack,
	Text,
} from '@chakra-ui/react';
import React, { ChangeEventHandler } from 'react';
import { Gauge } from '../components/Gauge';
import type { Supplier, SupplierFuelMix } from '../hooks/climateWrapped';
import {
	useCarbonIntensity,
	useMp,
	useSupplierFuelMix,
	useSuppliers,
	useSuppliersFuelMix,
	useSuppliersUsage,
} from '../hooks/climateWrapped';
import { CarbonEmissionsContext } from '../State';

interface SupplierInfoPanelProps {
	supplier: Supplier;
	fuelMix?: SupplierFuelMix;
}
const SupplierInfoPanel: React.FC<SupplierInfoPanelProps> = ({
	supplier,
	fuelMix,
}) => {
	const year = fuelMix?.year;
	return (
		<Stack spacing="1">
			<Heading size="lg">
				How did{' '}
				<Text as="span" color="red">
					{supplier.name}
				</Text>{' '}
				source their energy in {year}?
			</Heading>
			<Divider />
			{Object.keys(fuelMix ?? {}).map((key) => {
				if (key === 'supplier' || key === 'code' || key === 'year')
					return;
				const k = key.charAt(0).toUpperCase() + key.slice(1);
				const v = fuelMix && fuelMix[key as keyof SupplierFuelMix];
				const percentFiller =
					key === 'year' || key === 'nuclear waste' || key === 'CO2'
						? ''
						: '%';
				return (
					<>
						<HStack>
							<Heading size="md">{k}</Heading>
							<Spacer />
							<Heading size="md">
								{v}
								{percentFiller}
							</Heading>
						</HStack>
						<Divider />
					</>
				);
			})}
		</Stack>
	);
};

export const Home = (): JSX.Element => {
	const { state, setState } = React.useContext(CarbonEmissionsContext);
	const { home } = state;
	const { suppliers } = useSuppliers();

	const supplier = suppliers?.filter(
		(v) => v.code === home.selectedSupplier,
	)[0];

	const { supplier: supplierFuelMix } = useSupplierFuelMix(
		supplier?.code ?? '',
	);

	const { suppliers: ALLFMIX } = useSuppliersFuelMix();

	const average =
		(ALLFMIX ?? []).reduce((total, next) => total + next.CO2, 0) /
		(ALLFMIX ?? []).length;

	const maxAll = Math.max(
		...(ALLFMIX ?? []).map(function (o) {
			return o.CO2;
		}),
	);

	const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setState({
			...state,
			home: {
				...home,
				selectedSupplier: event.target.value,
			},
		});
	};

	return (
		<Stack spacing="4" mt="4">
			<Box>
				<Heading as="h2" size="3xl" textAlign="center">
					Home
				</Heading>
				<HStack>
					<Stack spacing="8" w="50%">
						<Stack spacing="4">
							<Heading as="h3" size="lg">
								Find your supplier
							</Heading>
							<Divider />
							<Select
								placeholder="Select option"
								value={home.selectedSupplier}
								onChange={onChange}
							>
								{suppliers?.map((supplier) => (
									<option
										key={supplier.code}
										value={supplier.code}
									>
										{supplier.name}
									</option>
								))}
							</Select>
						</Stack>
						<Box>
							{supplier && (
								<SupplierInfoPanel
									supplier={supplier}
									fuelMix={supplierFuelMix}
								/>
							)}
						</Box>
					</Stack>
					<Center w="50%">
						<Gauge
							score={(supplierFuelMix?.CO2 ?? 0) / maxAll}
							title="How does your supplier compare to the average CO2 emissions?"
							average={average}
						/>
					</Center>
				</HStack>
			</Box>
		</Stack>
	);
};
