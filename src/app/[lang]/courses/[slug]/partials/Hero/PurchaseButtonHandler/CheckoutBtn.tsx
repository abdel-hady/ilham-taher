'use client';

import StandardBtn from '@/app/components/common/StandardBtn';
import NotPurchasableModal from '@/app/components/common/modals/NotPurchasableModal';
import ShouldLoginModal from '@/app/components/common/modals/ShouldLoginModal';
import { useAuth } from '@/app/components/providers/AuthProvider';
import { useLocaleProvider } from '@/app/components/providers/LocaleProvider';
import useModal from '@/app/hooks/useModal';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import GeneralModal from '@/app/components/common/modals/GeneralModal';


interface CheckoutBtnProps {
	courseSlug:string;isPurchasable:boolean;isVerified?:boolean;
}
export default function CheckoutBtn({ courseSlug, isPurchasable, isVerified }: CheckoutBtnProps) {
	const t = useTranslations();
	const { isLoggedIn } = useAuth();
	const { makeLocaleUrl } = useLocaleProvider();

	const [isVerifiedModal, setIsVerifiedModal] = useState(false);
	const { isOpen, closeModal, openModal } = useModal();
	const {
		isOpen: isNotPurchasableModalOpen,
		closeModal: closeNotPurchasableModal,
		openModal: openNotPurchasableModal,
	} = useModal();

	const goToCheckoutPage = () => {
		if (!isLoggedIn()) {
			openModal();
			return;
		}

		if (!isPurchasable) {
			openNotPurchasableModal();
			return;
		}
		if (isVerified) {
			setIsVerifiedModal(true);
			return;
		}

		window.location.href = makeLocaleUrl(`/courses/${courseSlug}/checkout`);
	};
	return (
		<>
			<div className="w-60 mx-auto flex justify-center">
				<StandardBtn text={t('buy_course_now')} onClick={goToCheckoutPage} />
			</div>
			<ShouldLoginModal
				isOpen={isOpen}
				closeModal={closeModal}
			/>
			<NotPurchasableModal
				isOpen={isNotPurchasableModalOpen}
				closeModal={closeNotPurchasableModal}
			/>
			<GeneralModal
				title={t('please_verify_your_email')}
				description={t('verify_email_description')}
				isOpen={isVerifiedModal}
				closeModal={() => { 	setIsVerifiedModal(false); }}
			/>
		</>
	);
}
