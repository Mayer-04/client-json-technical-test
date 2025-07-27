import { PORT } from "@config/envs";
import app from "./app";

function main() {
	app.listen(PORT);
	console.log(`Server listening on port ${PORT}`);
}

main();
