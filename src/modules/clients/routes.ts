import { ClientController } from "@clients/controller";
import { ClientRepositoryImpl } from "@clients/repository";
import { ClientService } from "@clients/service";
import { bodySchema } from "@clients/validation";
import { validateRequest } from "@shared/middlewares/validate-request";
import { RequestSource } from "@shared/utils/request-source";
import { Router } from "express";

export const clientsRoute = Router();

const repository = new ClientRepositoryImpl();
const service = new ClientService(repository);
const controller = new ClientController(service);

clientsRoute.post(
	"/clients/upload",
	validateRequest(bodySchema, RequestSource.body),
	controller.save.bind(controller),
);
clientsRoute.get("/clients", controller.findAll.bind(controller));
clientsRoute.get("/clients/:id", controller.findById.bind(controller));
