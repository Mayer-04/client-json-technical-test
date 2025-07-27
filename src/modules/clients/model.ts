import type { IncomeLevel } from "@clients/types";

interface RawClientInput {
	name: string;
	birthdate: string;
	income: string;
	email: string;
}

interface EnrichedClient {
	id: string;
	name: string;
	birthdate: string;
	age: number;
	income: string;
	incomeLevel: IncomeLevel;
	email: string;
}

interface ClientQueryFilters {
	minAge?: number;
	maxAge?: number;
	minIncome?: number;
	maxIncome?: number;
	incomeLevel?: IncomeLevel;
	search?: string;
}

export type { RawClientInput, EnrichedClient, ClientQueryFilters };
