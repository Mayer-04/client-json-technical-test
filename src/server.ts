import { PORT } from "@config/env";
import { clientsRoute } from "@modules/clients/routes";
import { Server } from "./app";

const startServer = () => {
	const server = new Server({
		port: PORT,
		routes: clientsRoute,
	});

	server.start();
};

startServer();
