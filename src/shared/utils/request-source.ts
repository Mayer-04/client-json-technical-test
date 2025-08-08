export const RequestSource = {
	body: "body",
	query: "query",
	params: "params",
	headers: "headers",
	cookies: "cookies",
} as const;

export type RequestSource = (typeof RequestSource)[keyof typeof RequestSource];
