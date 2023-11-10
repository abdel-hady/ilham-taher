import { STRIPE_URLS } from '@/app/util/url';

import Cookies from 'js-cookie';

async function createPaymentIntent(courseId: number) {
	try {
		const token = Cookies.get('token');

		const res = await fetch(STRIPE_URLS.INTENT, {
			method: 'POST',
			body: JSON.stringify({ course: courseId }),
			headers: {
				'Content-Type': 'application/json',
				accept: '*/*',
				Authorization: `Bearer ${token}`,
			},
		});

		const parsedRes = await res.json();
		if (!res.ok) {
			throw new Error(parsedRes.message);
		}

		return parsedRes;
	} catch (e: any) {
		return null;
	}
}

const StripeService = {
	createPaymentIntent,
};

export default StripeService;
