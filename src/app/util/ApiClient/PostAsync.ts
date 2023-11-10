import { ArrayErrorMessageError } from '@/app/util/types/local-types';
import DataToSendParser from './helpers/DataToSendParser';

interface PostSecureAsyncProps {
	url: string,
	locale: string,
	data: any,
	isClientSide?: boolean,
	isFormData?: boolean,
}

const PostAsync = async<T>({
	url,
	locale,
	data,
	isFormData = false,
}: PostSecureAsyncProps): Promise<T> => {
	try {
		const dataToSend = DataToSendParser(data, isFormData);

		const res = await fetch(url, {
			method: 'POST',
			body: dataToSend,
			headers: {
				'Content-Type': 'application/json',
				accept: '*/*',
				'x-locale': locale,
			},
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

export default PostAsync;
