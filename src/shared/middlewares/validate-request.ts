import type { NextFunction, Request, Response } from "express";
import type { ZodType } from "zod/v4";

type Source = "body" | "query" | "params" | "headers" | "cookies";

export const validateRequest =
	<T extends Record<string, unknown>>(schema: ZodType<T>, source: Source) =>
	(req: Request, res: Response, next: NextFunction) => {
		const { success, error, data } = schema.safeParse(req[source] as T);

		if (!success) {
			return res.status(400).json({
				success: false,
				error: "Validation error",
				issues: error.issues.map(({ path, message }) => ({ path, message })),
			});
		}

		req[source] = data;
		next();
	};
