import { clientsRoute } from "@modules/clients/routes";
import express from "express";

const configExpress = {
	app: express(),
} as const;

const { app } = configExpress;

app.disable("x-powered-by");

app.use(express.json());

app.use(clientsRoute);

app.get("/", (_req, res) => {
	res.send("Hello World!");
});

export default app;
