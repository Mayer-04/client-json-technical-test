export enum HttpCode {
	Ok = 200,
	Created = 201,
	BadRequest = 400,
	Unauthorized = 401,
	Forbidden = 403,
	NotFound = 404,
	Conflict = 409,
	InternalServerError = 500,
}

export class AppError extends Error {
	public readonly httpCode: HttpCode;
	public readonly isOperational: boolean;

	constructor(
		name: string,
		httpCode: HttpCode,
		description: string,
		isOperational: boolean,
	) {
		super(description);
		Object.setPrototypeOf(this, new.target.prototype); // importante para mantener la cadena de prototipos
		this.name = name;
		this.httpCode = httpCode;
		this.isOperational = isOperational;

		Error.captureStackTrace(this); // genera el stack trace
	}
}
