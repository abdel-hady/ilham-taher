import { QueryParams } from '../types/local-types';
import CreateUrlWithQuery from './helpers/CreateUrlWithQuery';

interface GetAsyncProps {
	url: string;
	locale: string;
	params?: QueryParams;
}

const GetAsync = async<T>({ url, locale, params = {} }:GetAsyncProps): Promise<T | null> => {
	try {
		const finalUrl = CreateUrlWithQuery(url, params);

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


		return parsedRes.data as T;
	} catch (e: any) {
		return null;
	}
};

export default GetAsync;
