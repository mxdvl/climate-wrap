import useSWR from 'swr';

export interface Supplier {
	supplier: string;
	coal: number;
	gas: number;
	nuclear: number;
	renewable: number;
	other: number;
	CO2: number;
	nuclearWaste: number;
	year: number;
	code: string;
}

type Suppliers = Supplier[];

interface UseSuppliersResponse {
	suppliers?: Suppliers;
	isLoading: boolean;
	isError: boolean;
}

// https://github.com/coldlink/climate-wrapped-api#get-suppliersfuel-mix

export function useSuppliers(): UseSuppliersResponse {
	const { data, error } = useSWR<Suppliers, Error>(`suppliers/fuel-mix`);

	return {
		suppliers: data,
		isLoading: !error && !data,
		isError: !!error,
	};
}

interface Emissions {
	emissionsKg: number;
	nuclearWasteG: number;
}

interface EmissionsApiResponse {
	emissions: Emissions;
}

interface UseSuppliersUsageResponse {
	emissions?: Emissions;
	isLoading: boolean;
	isError: boolean;
}

// https://github.com/coldlink/climate-wrapped-api#get-suppliersusagecodeusage
/**
 * Get carbon emissions (kg - kilograms) and nuclear waste (g - grams) for a given supplier.

code - supplier code from GET /suppliers, e.g. avro1 usage - number of usage in kWh/y (kilowatt hours per year) e.g. 3100

GET /suppliers/usage/avro1/3100
 */
export function useSuppliersUsage(
	code: string,
	usage: number,
): UseSuppliersUsageResponse {
	const { data, error } = useSWR<EmissionsApiResponse, Error>(
		`suppliers/usage/${code}/${usage}`,
	);

	return {
		emissions: data?.emissions,
		isLoading: !error && !data,
		isError: !!error,
	};
}

// https://github.com/coldlink/climate-wrapped-api#get-suppliersfuel-mixcode
/**
 * Get fuel mix for a single supplier using it's code, which you can get from GET /suppliers
 *
 */
// export function useSuppliersFuelMix(code) {}
