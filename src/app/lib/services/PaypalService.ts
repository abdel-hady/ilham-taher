import { PAYPAL_URLS } from '@/app/util/url';

import Cookies from 'js-cookie';

function createOrder(course: number): Promise<string> {
	const token = Cookies.get('token');

	return fetch(PAYPAL_URLS.CREATE_ORDER, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({
			course,
		}),
	})
		.then((response) => response.json())
		.then((data) => data.data.id);
}
function captureOrder(data: any, onSuccessCb: () => void, onErrorCb: () => void): Promise<any> {
	const token = Cookies.get('token');

	return fetch(`${PAYPAL_URLS.CREATE_ORDER}/${data.orderID}/capture`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	})
		.then((response) => {
			if (response.ok) {
				return response.json();
			}
			onErrorCb();
			throw new Error('Invalid order data received from server');
		})
		.then((orderData) => {
			if (!orderData) {
				onErrorCb();
				throw new Error('Invalid order data received from server');
			} else {
				onSuccessCb();
			}
		})
		.catch((error) => {
			throw error;
		});
}
const PaypalService = {
	createOrder,
	captureOrder,
};

export default PaypalService;
