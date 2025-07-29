import express, { type Router } from "express";
import helmet from "helmet";

interface ServerOptions {
	port: number;
	routes: Router;
}

export class Server {
	public readonly app = express();
	private readonly port: number;
	private readonly routes: Router;

	constructor({ port, routes }: ServerOptions) {
		this.port = port;
		this.routes = routes;
	}

	private setupMiddlewares(): void {
		this.app.use(helmet());
		this.app.use(express.json({ limit: "10mb" }));
		this.app.use(express.urlencoded({ extended: true }));
		// Rutas de la API
		this.app.use(this.routes);
	}

	private setupRoutes(): void {
		this.app.get("/", (_req, res) => {
			res.send("Hello World!");
		});

		this.app.get("/health", (_req, res) => {
			res.status(200).json({
				success: true,
				message: "Server is running",
				timestamp: new Date().toISOString(),
				uptime: process.uptime(),
			});
		});
	}

	public start(): void {
		this.app.disable("x-powered-by");
		this.setupMiddlewares();
		this.setupRoutes();

		this.app.listen(this.port, () => {
			console.info(`Server is running at http://localhost:${this.port}`);
		});
	}
}
