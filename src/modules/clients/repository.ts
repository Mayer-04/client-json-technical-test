import { db } from "@shared/database/drizzle/connection";
import { clientsTable } from "@shared/database/drizzle/schema";
import { eq } from "drizzle-orm";
import type {
	ClientQueryFilters,
	EnrichedClient,
	RawClientInput,
} from "./model";
import { enrichInput } from "./validation";

export interface ClientRepository {
	save(clients: RawClientInput[]): Promise<void>;
	findAll(filters?: ClientQueryFilters): Promise<EnrichedClient[]>;
	findById(id: string): Promise<EnrichedClient | null>;
}

export class ClientRepositoryImpl implements ClientRepository {
	async save(inputClients: RawClientInput[]): Promise<void> {
		console.log("repository-enrichInput", enrichInput);
		const enrichedClients = inputClients.map(enrichInput);
		console.log("repository", enrichedClients);
		await db.insert(clientsTable).values(enrichedClients);
	}
	async findAll(filters?: ClientQueryFilters): Promise<EnrichedClient[]> {
		return await db.select().from(clientsTable);
	}
	async findById(id: string): Promise<EnrichedClient | null> {
		const result = await db
			.select()
			.from(clientsTable)
			.where(eq(clientsTable.id, id));

		return result.at(0) ?? null;
	}
}
