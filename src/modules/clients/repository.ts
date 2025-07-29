import type {
	ClientQueryFilters,
	EnrichedClient,
	RawClientInput,
} from "@clients/model";
import { db } from "@shared/database/drizzle/connection";
import { clientsTable } from "@shared/database/drizzle/schema";
import { eq } from "drizzle-orm";
import type { ResponsePagination } from "./types";

export interface ClientRepository {
	save(clients: RawClientInput[]): Promise<void>;
	findAll(
		filters?: ClientQueryFilters,
	): Promise<ResponsePagination<EnrichedClient>>;
	findById(id: string): Promise<EnrichedClient | null>;
	findByEmail(email: string): Promise<EnrichedClient | null>;
}

export class ClientRepositoryImpl implements ClientRepository {
	async save(rawClients: EnrichedClient[]): Promise<void> {
		await db.insert(clientsTable).values(rawClients).onConflictDoNothing();
	}

	async findAll(
		filters?: ClientQueryFilters,
	): Promise<ResponsePagination<EnrichedClient>> {
		throw new Error("Method not implemented.");
	}

	async findById(id: string): Promise<EnrichedClient | null> {
		const result = await db
			.select()
			.from(clientsTable)
			.where(eq(clientsTable.id, id));

		return result.at(0) ?? null;
	}

	async findByEmail(email: string): Promise<EnrichedClient | null> {
		const result = await db
			.select()
			.from(clientsTable)
			.where(eq(clientsTable.email, email));

		return result.at(0) ?? null;
	}
}
