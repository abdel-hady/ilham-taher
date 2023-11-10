import { ArrayErrorMessageError } from '@/app/util/types/local-types';
import DataToSendParser from '../helpers/DataToSendParser';
import TokenExtractor from '../helpers/TokenExtractor';

interface PostSecureAsyncProps {
	url: string,
	locale: string,
	data: any,
	isClientSide?: boolean,
	isFormData?: boolean,
}

const PostSecureAsync = async<T>({
	url,
	locale,
	data,
	isClientSide = false,
	isFormData = false,
}: PostSecureAsyncProps): Promise<T | Error | null> => {
	try {
		const token = TokenExtractor(isClientSide ?? false);

		const dataToSend = DataToSendParser(data, isFormData);

		const headers:any = {
			'Content-Type': 'application/json',
			accept: '*/*',
			'x-locale': locale,
			Authorization: `Bearer ${token}`,
		};

		if (isFormData) {
			delete headers['Content-Type'];
		}

		const res = await fetch(url, {
			method: 'POST',
			body: dataToSend,
			headers,
		});

		const parsedRes = await res.json();
		if (!res.ok) {
			throw new ArrayErrorMessageError(parsedRes.message, parsedRes.errors);
		}


		return parsedRes.data as T;
	} catch (e: any) {
		console.log(e.message);
		throw e;
	}
};

export default PostSecureAsync;
