import type { IncomeLevel } from "@clients/types";

export interface RawClientInput {
	name: string;
	birthdate: string;
	income: string;
	email: string;
}

export interface EnrichedClient extends RawClientInput {
	id: string;
	age: number;
	incomeLevel: IncomeLevel;
}

export interface ClientQueryFilters {
	name?: string;
	incomeLevel?: IncomeLevel;
	page?: number;
	size?: number;
}
