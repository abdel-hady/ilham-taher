import { QueryParams } from '../../types/local-types';

export default function CreateUrlWithQuery(baseUrl: string, queryParams: QueryParams): string {
	const apiUrl = new URL(baseUrl);

	// Set query parameters
	Object.entries(queryParams).forEach(([key, value]) => {
		if (!value) {
			return;
		}
		if (Array.isArray(value)) {
			const { searchParams } = apiUrl;
			value.forEach((str) => {
				searchParams.append(key, str);
			});
			const updatedSearchString = searchParams.toString();
			apiUrl.search = updatedSearchString;
			return;
		}
		apiUrl.searchParams.set(key, value.toString());
	});

	return apiUrl.toString();
}
