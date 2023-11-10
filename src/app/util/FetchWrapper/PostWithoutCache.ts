import { ArrayErrorMessageError } from '../types/local-types';

type PostWithoutCacheType = <T>(
	url: string,
	data: any,
	onSuccessCb: (res: T) => void,
	onErrorCb: (error: any) => void
) => void;

const PostWithoutCache: PostWithoutCacheType = async <T>(
	url: string,
	data: any,
	onSuccessCb: (res: T) => void,
	onErrorCb: (error: any) => void,
) => {
	try {
		const res = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				accept: '*/*',
			},
			body: JSON.stringify(data),
		});

		const parsedRes = await res.json();
		if (!res.ok) {
			throw new ArrayErrorMessageError(parsedRes.message, parsedRes.errors || []);
		}

		onSuccessCb(parsedRes);
	} catch (e: any) {
		onErrorCb(e);
	}
};

export default PostWithoutCache;
