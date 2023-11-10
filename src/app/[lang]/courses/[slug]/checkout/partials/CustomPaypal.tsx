'use client';

import PaypalService from '@/app/lib/services/PaypalService';

import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { useLocaleProvider } from '@/app/components/providers/LocaleProvider';
import { toast } from 'react-toastify';
import { useTranslations } from 'next-intl';

interface CustomPaypalProps {
	courseId: number;
	courseSlug: string;
}
export default function CustomPaypal({
	courseId,
	courseSlug,
}: CustomPaypalProps) {
	const { makeLocaleUrl } = useLocaleProvider();
	const t = useTranslations();

	return (
		<PayPalScriptProvider
			options={{
				currency: 'EUR',
				clientId: `${process.env.PAYPAL_CLIENT_ID}`,
			}}
		>
			<PayPalButtons
				createOrder={() => PaypalService.createOrder(courseId)}
				onApprove={(data) => PaypalService.captureOrder(
					data,
					() => {
						window.location.href = makeLocaleUrl(`/courses/${courseSlug}`);
					},
					() => {
						toast.error(t('something_went_wrong'), { position: 'top-right' });
					},
				)}
				style={{
					layout: 'horizontal',
					color: 'blue',
					shape: 'pill',
					label: 'paypal',
				}}
			/>
		</PayPalScriptProvider>
	);
}
