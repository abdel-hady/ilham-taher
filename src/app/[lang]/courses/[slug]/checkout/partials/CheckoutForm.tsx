import React, { useState } from 'react';
import {
	PaymentElement,
	useStripe,
	useElements,
} from '@stripe/react-stripe-js';
import { useLocaleProvider } from '@/app/components/providers/LocaleProvider';
import { useTranslations } from 'next-intl';

export default function CheckoutForm({ courseSlug }: { courseSlug: string }) {
	const stripe = useStripe();
	const elements = useElements();

	const t = useTranslations();
	const { makeLocaleUrl } = useLocaleProvider();

	// const [isLoading, setIsLoading] = useState(false);
	const [message, setMessage] = useState('');

	const websiteBase = process.env.WEBSITE_BASE_URL;

	const handleSubmit = async (e: any) => {
		e.preventDefault();

		if (!stripe || !elements) {
			return;
		}

		// setIsLoading(true);

		const { error } = await stripe.confirmPayment({
			elements,
			confirmParams: {
				return_url: websiteBase + makeLocaleUrl(`courses/${encodeURIComponent(courseSlug)}`),
			},
		});

		if (error.type === 'card_error' || error.type === 'validation_error') {
			setMessage(error.message!);
		} else {
			setMessage('An unexpected error occurred.'!);
		}

		// setIsLoading(false);
	};

	return (
		<form id="payment-form" onSubmit={handleSubmit} className="flex flex-col gap-5 items-center justify-center">
			<PaymentElement
				id="payment-element"
				className="w-[80%]"
				options={{
					layout: 'tabs',
				}}
			/>
			<button type="submit" id="submit" className="btn bg-greenish border-0 text-white">
				<span id="button-text">
					{t('pay_now')}
				</span>
			</button>
			{/* Show any error or success messages */}
			{message && <div id="payment-message">{message}</div>}
		</form>

	);
}
