import type { EnrichedClient, RawClientInput } from "@clients/model";
import type { IncomeLevel } from "@clients/types";
import { z } from "zod/v4";

export const calculateAge = (birthdate: string): number => {
	const birth = new Date(birthdate);
	const today = new Date();

	let age = today.getFullYear() - birth.getFullYear();

	const yearsCompleted =
		today.getMonth() > birth.getMonth() ||
		(today.getMonth() === birth.getMonth() &&
			today.getDate() >= birth.getDate());

	if (!yearsCompleted) {
		age--;
	}

	return age;
};

export const calculateIncomeLevel = (income: string): IncomeLevel => {
	const convertIncome = Number(income);

	if (convertIncome < 2000) {
		return "bajo";
	}

	if (convertIncome <= 6000) {
		return "medio";
	}

	return "alto";
};

export const generateId = (name: string, birthdate: string): string => {
	const formattedName = name
		.toLowerCase()
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.replace(/[^a-z0-9\s-]/g, "")
		.trim()
		.replace(/\s+/g, "-");

	const formattedBirthdate = birthdate.replace(/-/g, "");

	return `${formattedName}-${formattedBirthdate}`;
};

export const enrichClientInput = (
	input: RawClientInput[],
): EnrichedClient[] => {
	return input.map(
		({ name, birthdate, income, email }) =>
			({
				id: generateId(name, birthdate),
				name,
				birthdate,
				age: calculateAge(birthdate),
				income,
				incomeLevel: calculateIncomeLevel(income),
				email,
			}) satisfies EnrichedClient,
	);
};

// Esquema para una sola persona
export const bodySchema = z.object({
	name: z
		.string()
		.nonempty()
		.min(1)
		.refine((val) => val.trim().split(/\s+/).length >= 2, {
			message: "El nombre debe contener al menos nombre y apellido",
		}),
	birthdate: z
		.string()
		.nonempty()
		.regex(/^\d{4}-\d{2}-\d{2}$/, {
			message: "La fecha debe estar en formato YYYY-MM-DD",
		}),
	income: z
		.number()
		.positive({ message: "El ingreso debe ser un número positivo" }),
	email: z
		.email({ message: "El correo no tiene un formato válido" })
		.nonempty(),
});

// Este tipo es el DTO inferido, lo usarás en tus servicios o controladores
export type BodyInput = z.infer<typeof bodySchema>;
