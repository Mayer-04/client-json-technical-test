import type { ClientQueryFilters, EnrichedClient } from "@clients/model";
import type { ClientService } from "@clients/service";
import type { Request, Response } from "express";

export class ClientController {
	constructor(private readonly clientService: ClientService) {}

	async save(req: Request, res: Response): Promise<void> {
		const inputClients = req.body;
		await this.clientService.save(inputClients);
		res.status(201).json({
			success: true,
			message: "Clients created successfully",
		});
	}

	async findAll(filters?: ClientQueryFilters): Promise<EnrichedClient[]> {
		return await this.clientService.findAll(filters);
	}

	async findById(id: string): Promise<EnrichedClient | null> {
		return await this.clientService.findById(id);
	}
}
