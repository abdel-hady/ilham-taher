import TokenExtractor from '../helpers/TokenExtractor';

interface GetSecureAsyncProps {
	url :string;
	locale: string;
	isClientSide?: boolean;
}

const GetSecureAsync = async<T>({
	url,
	locale,
	isClientSide = false,
}: GetSecureAsyncProps): Promise<T | null> => {
	try {
		const apiUrl = new URL(url);

		const token = TokenExtractor(isClientSide ?? false);

		const res = await fetch(apiUrl.toString(), {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				accept: '*/*',
				'x-locale': locale,
				Authorization: `Bearer ${token}`,
			},
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

export default GetSecureAsync;
