import express, { type Router } from "express";

interface ServerOptions {
	port: number;
	routes: Router;
}

export class Server {
	public readonly app = express();
	private readonly PORT: number;
	private readonly routes: Router;

	constructor({ port, routes }: ServerOptions) {
		this.PORT = port;
		this.routes = routes;
	}

	private setupMiddlewares(): void {
		this.app.use(express.json());
		this.app.use(this.routes);
	}

	private setupRoutes(): void {
		this.app.get("/", (_req, res) => {
			res.send("Hello World!");
		});
	}

	public start(): void {
		this.app.disable("x-powered-by");
		this.setupMiddlewares();
		this.setupRoutes();

		this.app.listen(this.PORT, () => {
			console.info(`Server is running at http://localhost:${this.PORT}`);
		});
	}
}
