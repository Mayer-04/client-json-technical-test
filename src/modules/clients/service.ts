import type { ClientRepository } from "@clients/repository";
import type {
	ClientQueryFilters,
	EnrichedClient,
	RawClientInput,
} from "./model";

export class ClientService {
	constructor(private repository: ClientRepository) {}
	async save(inputClients: RawClientInput[]): Promise<void> {
		return await this.repository.save(inputClients);
	}

	// 	async save(inputClients: RawClientInput[]): Promise<void> {
	// 	for (const client of inputClients) {
	// 		const existing = await this.repository.findByEmail(client.email);
	// 		if (existing) {
	// 			throw new Error(`El cliente con email ${client.email} ya existe`);
	// 		}
	// 	}
	// 	await this.repository.save(inputClients);
	// }

	async findAll(filters?: ClientQueryFilters): Promise<EnrichedClient[]> {
		return await this.repository.findAll(filters);
	}
	async findById(id: string): Promise<EnrichedClient | null> {
		return await this.repository.findById(id);
	}
}
