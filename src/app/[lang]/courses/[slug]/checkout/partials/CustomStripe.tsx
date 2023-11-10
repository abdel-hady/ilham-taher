'use client';

import StripeService from '@/app/lib/services/StripeService';
import React, { useEffect, useState } from 'react';
import { PaymentIntent, loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY!);

interface CustomStripeProps {
	courseId: number; courseSlug: string;
}
export default function CustomStripe({ courseId, courseSlug }: CustomStripeProps) {
	const [intent, setIntent] = useState<PaymentIntent | null>(null);

	useEffect(() => {
		StripeService.createPaymentIntent(courseId)
			.then((res) => setIntent(res.data));
	}, []);


	if (!intent) {
		return (
			<div className="w-full flex justify-center">
				<span className="loading loading-spinner loading-lg" />
			</div>
		);
	}

	return (
		<>
			<h3 className="px-10 text-2xl text-greenish mb-5 flex gap-3 items-center justify-center">
				<span>Pay With</span>
				{/* <Image */}
				{/* 	src="/assets/images/payment-icons/stripe-icon.png" */}
				{/* 	width="500" */}
				{/* 	height="500" */}
				{/* 	className="w-[100px] object-fit" */}
				{/* 	alt="Stripe Payment method" */}
				{/* /> */}
			</h3>

			<Elements
				options={{
					appearance: {
						theme: 'stripe',
					},
					clientSecret: intent.client_secret!,
				}}
				stripe={stripePromise}
			>
				<CheckoutForm courseSlug={courseSlug} />
			</Elements>
		</>
	);
}
