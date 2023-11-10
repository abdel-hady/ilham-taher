'use client';

import StandardBtn from '@/app/components/common/StandardBtn';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/app/components/providers/AuthProvider';
import React from 'react';
import useModal from '@/app/hooks/useModal';
import { SessionCalendlyDetails } from '@/app/util/types/remote-types';
import ShouldLoginModal from '@/app/components/common/modals/ShouldLoginModal';
import { useLocaleProvider } from '@/app/components/providers/LocaleProvider';
import SelectPaymentMethodModal from './SelectPaymentMethodModal';

interface CalendlySubmitBtnProps {
	sessionCalendlyDetailsArray: SessionCalendlyDetails[];
}

export default function CalendlySubmitBtn({
	sessionCalendlyDetailsArray,
} : CalendlySubmitBtnProps) {
	const t = useTranslations();

	const { isOpen, openModal, closeModal } = useModal();
	const {
		isOpen: isSelectMethodOpen,
		openModal: openSelectMethodModal,
		closeModal: closeSelectMethodModal,
	} = useModal();

	const { isLoggedIn } = useAuth();
	const { makeLocaleUrl } = useLocaleProvider();


	const isSessionFree = sessionCalendlyDetailsArray[0].paymentProvider.value === 'FREE';

	const handleClick = () => {
		if (!isLoggedIn()) {
			openModal();
			return;
		}

		if (isSessionFree) {
			const { url } = sessionCalendlyDetailsArray[0];
			sessionStorage.setItem('calendlyUrl', url);
			// Go to calendly page
			window.location.href = makeLocaleUrl('/calendly');
			return;
		}

		openSelectMethodModal();
	};


	return (
		<div>
			<StandardBtn text={t('take_the_session')} onClick={handleClick} />
			<ShouldLoginModal
				isOpen={isOpen}
				closeModal={closeModal}
			/>
			<SelectPaymentMethodModal
				isOpen={isSelectMethodOpen}
				closeModal={closeSelectMethodModal}
				sessionCalendlyDetailsArray={sessionCalendlyDetailsArray}
			/>
		</div>
	);
}
