import { generateDefaultPaginated } from '../../types/default-generator';
import { PaginationData } from '../../types/remote-types';
import TokenExtractor from '../helpers/TokenExtractor';
import CreateUrlWithQuery from '../helpers/CreateUrlWithQuery';
import { QueryParams } from '../../types/local-types';
import DefaultPaginationQueryParams from '../helpers/DefaultPaginationQueryParams';

interface GetSecurePaginationAsyncProps {
	url: string,
	locale: string,
	isClientSide?: boolean,
	params?: QueryParams
}

const GetSecurePaginationAsync = async<T>({
	url,
	locale,
	isClientSide = false,
	params = {},
}: GetSecurePaginationAsyncProps): Promise<PaginationData<T>> => {
	try {
		const queryUrl = CreateUrlWithQuery(
			url,
			{ ...DefaultPaginationQueryParams, ...params },
		);

		const token = TokenExtractor(isClientSide ?? false);

		const res = await fetch(queryUrl, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				accept: '*/*',
				'x-locale': locale,
				Authorization: `Bearer ${token}`,
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

export default GetSecurePaginationAsync;
