import useSWR from 'swr';
import { isInterfaceDeclaration } from 'typescript';

interface Vote {
	general: string;
	votes: string;
	party: string;
}
interface MpApiResponse {
	title: string;
	vote: Vote[];
}

interface UseMpResponse {
	mpVotingRecord?: MpApiResponse;
	isLoading: boolean;
	isError: boolean;
}

export function useMp(postcode: string): UseMpResponse {
	const { data, error } = useSWR<MpApiResponse, Error>(`mp/${postcode}`);

	return {
		mpVotingRecord: data,
		isLoading: !error && !data,
		isError: !!error,
	};
}

//////

type FuelType =
	| 'wind'
	| 'solar'
	| 'biomass'
	| 'coal'
	| 'imports'
	| 'gas'
	| 'nuclear'
	| 'other'
	| 'hydro';
export interface GenerationMix {
	fuel: FuelType;
	perc: number;
}

export interface CarbonIntensity {
	from: string;
	to: string;
	intensity: {
		forecast: number;
		index: string;
	};
	generationmix: GenerationMix[];
}

export interface CarbonIntensityApiResponse {
	regionid: number;
	dnoregion: string;
	shortname: string;
	postcode: string;
	data: CarbonIntensity[];
}

interface UseCarbonIntensityResponse {
	carbonIntensity?: CarbonIntensityApiResponse;
	isLoading: boolean;
	isError: boolean;
}

/**
 * https://github.com/coldlink/climate-wrapped-api#get-suppliers
 * Get a list of supplier codes and names to use in GET /suppliers/usage/:code/:usage
 */
export function useCarbonIntensity(
	postcode: string,
): UseCarbonIntensityResponse {
	const { data, error } = useSWR<CarbonIntensityApiResponse, Error>(
		`carbon-intensity/${postcode}`,
	);

	return {
		carbonIntensity: data,
		isLoading: !error && !data,
		isError: !!error,
	};
}

//////////

export interface Supplier {
	code: string;
	name: string;
}

type Suppliers = Supplier[];

interface SuppliersApiResponse {
	suppliers: Suppliers;
}

/**
 * https://github.com/coldlink/climate-wrapped-api#get-suppliers
 * Get a list of supplier codes and names to use in GET /suppliers/usage/:code/:usage
 */
function useSuppliers() {
	const { data, error } = useSWR<SuppliersApiResponse, Error>(`suppliers`);

	return {
		suppliers: data?.suppliers,
		isLoading: !error && !data,
		isError: !!error,
	};
}

export interface SupplierFuelMix {
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

type SuppliersFuelMix = SupplierFuelMix[];

interface UseSuppliersFuelMixResponse {
	suppliers?: SuppliersFuelMix;
	isLoading: boolean;
	isError: boolean;
}

// https://github.com/coldlink/climate-wrapped-api#get-suppliersfuel-mix

export function useSuppliersFuelMix(): UseSuppliersFuelMixResponse {
	const { data, error } = useSWR<SuppliersFuelMix, Error>(
		`suppliers/fuel-mix`,
	);

	return {
		suppliers: data,
		isLoading: !error && !data,
		isError: !!error,
	};
}

interface UseSupplierFuelMixResponse {
	supplier?: SupplierFuelMix;
	isLoading: boolean;
	isError: boolean;
}

// https://github.com/coldlink/climate-wrapped-api#get-suppliersfuel-mixcode
/**
 * Get fuel mix for a single supplier using it's code, which you can get from GET /suppliers
 *
 */
export function useSupplierFuelMix(code: string): UseSupplierFuelMixResponse {
	const { data, error } = useSWR<SupplierFuelMix, Error>(
		`suppliers/fuel-mix/${code}`,
	);

	return {
		supplier: data,
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
