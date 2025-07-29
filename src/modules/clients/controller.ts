import type { ClientQueryFilters, EnrichedClient } from "@clients/model";
import type { ClientService } from "@clients/service";
import type { Request, Response } from "express";

export class ClientController {
	constructor(private readonly clientService: ClientService) {}

	async save(req: Request, res: Response): Promise<void> {
		try {
			const inputClients = req.body;
			await this.clientService.uploadClients(inputClients);
			res.status(201).json({
				success: true,
				message: "Clients created successfully",
			});
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : "Error desconocido";
			res.status(400).json({
				success: false,
				message: errorMessage,
			});
		}
	}

	async findAll(filters?: ClientQueryFilters): Promise<EnrichedClient[]> {
		return await this.clientService.findAll(filters);
	}

	async findById(req: Request, res: Response): Promise<void> {
		try {
			const { id } = req.params;

			// Validar que el ID existe
			if (!id) {
				res.status(400).json({
					success: false,
					message: "ID del cliente es requerido",
				});
				return;
			}

			const client = await this.clientService.findById(id);

			res.status(200).json({
				success: true,
				data: client,
			});
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : "Error desconocido";

			// Si es un error de "no encontrado", usar 404
			if (errorMessage.includes("no encontrado")) {
				res.status(404).json({
					success: false,
					message: errorMessage,
				});
			} else {
				res.status(400).json({
					success: false,
					message: errorMessage,
				});
			}
		}
	}
}
