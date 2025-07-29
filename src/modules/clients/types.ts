export type IncomeLevel = "bajo" | "medio" | "alto";

export type ResponsePagination<T> = {
	data: T[];
	total: number;
};
