import { useAuth } from '@/app/components/providers/AuthProvider';
import React from 'react';
import CheckoutBtn from './CheckoutBtn';
import AlreadyEnrolledBtn from './AlreadyEnrolledBtn';
import FreeEnrollBtn from './FreeEnrollBtn';

interface PurchaseButtonHandlerProps {
	isFree: boolean;
	isEnrolled: boolean;
	courseSlug: string;
	courseId: string | number;
	isPurchasable: boolean;
}
export default function PurchaseButtonHandler({
	isFree, isEnrolled, courseSlug, courseId, isPurchasable,
}:PurchaseButtonHandlerProps) {
	const { isLoggedIn, canDisplayVerify } = useAuth();

	if (!isLoggedIn()) {
		if (isFree) {
			return <FreeEnrollBtn courseId={courseId.toString()} isPurchasable={isPurchasable} />;
		}

		return <CheckoutBtn courseSlug={courseSlug} isPurchasable={isPurchasable} />;
	}

	if (isEnrolled) {
		return <AlreadyEnrolledBtn />;
	}

	if (isFree) {
		return (
			<FreeEnrollBtn
				courseId={courseId.toString()}
				isPurchasable={isPurchasable}
				isVerified={canDisplayVerify()}
			/>
		);
	}

	return (
		<CheckoutBtn
			courseSlug={courseSlug}
			isPurchasable={isPurchasable}
			isVerified={canDisplayVerify()}
		/>
	);
}
