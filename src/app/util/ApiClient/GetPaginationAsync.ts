import { generateDefaultPaginated } from '../types/default-generator';
import { QueryParams } from '../types/local-types';
import { PaginationData } from '../types/remote-types';
import DefaultPaginationQueryParams from './helpers/DefaultPaginationQueryParams';
import CreateUrlWithQuery from './helpers/CreateUrlWithQuery';

interface GetPaginationAsyncProps {
	url: string;
	locale: string;
	params?: QueryParams;
}
const GetPaginationAsync = async<T>({
	url,
	locale,
	params = {},
}: GetPaginationAsyncProps): Promise<PaginationData<T>> => {
	try {
		const finalUrl = CreateUrlWithQuery(
			url,
			{ ...DefaultPaginationQueryParams, ...params },
		);


		const res = await fetch(finalUrl, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				accept: '*/*',
				'x-locale': locale,
			},
			cache: 'no-cache',
		});

		const parsedRes = await res.json();
		if (!res.ok) {
			throw new Error(parsedRes.message);
		}


		return parsedRes.data as PaginationData<T>;
	} catch (e: any) {
		return generateDefaultPaginated();
	}
};

export default GetPaginationAsync;
