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
