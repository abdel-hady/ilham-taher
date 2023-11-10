import { cookies } from 'next/dist/client/components/headers';
import Cookies from 'js-cookie';

const TokenExtractor = (isClient: boolean): string => {
	let token = '';
	if (isClient) {
		token = Cookies.get('token') || '';
	} else {
		token = cookies().get('token')?.value || '';
	}
	return token;
};

export default TokenExtractor;
