import type { BodyInput } from "@clients/validation";
import type { NextFunction, Request, Response } from "express";
import { treeifyError, type ZodType } from "zod/v4";

export const validateRequestBody =
	(schema: ZodType<BodyInput>) =>
	(request: Request, response: Response, next: NextFunction) => {
		const { success, data, error } = schema.safeParse(request.body);

		if (!success) {
			return response.status(400).json({
				success: false,
				error: "Validation error",
				issues: treeifyError(error),
			});
		}

		request.body = data;
		next();
	};
