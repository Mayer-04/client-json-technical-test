import type {
	ClientQueryFilters,
	EnrichedClient,
	RawClientInput,
} from "@clients/model";
import type { ClientRepository } from "@clients/repository";
import { enrichClientInput } from "@clients/validation";

export class ClientService {
	constructor(private repository: ClientRepository) {}

	async uploadClients(inputClients: RawClientInput[]): Promise<void> {
		if (!inputClients || inputClients.length === 0) {
			throw new Error("No se proporcionaron clientes para procesar");
		}

		// Enriquecer los datos
		const enrichedClients = enrichClientInput(inputClients);

		// Verificar duplicados por email antes de guardar
		for (const client of enrichedClients) {
			const existingClient = await this.repository.findByEmail(client.email);
			if (existingClient) {
				throw new Error(`Ya existe un cliente con el email: ${client.email}`);
			}
		}

		// Guardar los clientes enriquecidos
		await this.repository.save(enrichedClients);
	}

	async findAll(filters?: ClientQueryFilters): Promise<EnrichedClient[]> {
		return await this.repository.findAll(filters);
	}

	async findById(id: string): Promise<EnrichedClient | null> {
		if (!id || id.trim() === "") {
			throw new Error("El ID del cliente es requerido");
		}

		const client = await this.repository.findById(id);

		if (!client) {
			throw new Error(`Cliente con ID ${id} no encontrado`);
		}

		return client;
	}
}
