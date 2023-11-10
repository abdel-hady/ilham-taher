'use client';

import StandardBtn from '@/app/components/common/StandardBtn';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/app/components/providers/AuthProvider';
import { useLocaleProvider } from '@/app/components/providers/LocaleProvider';
import React from 'react';
import useModal from '@/app/hooks/useModal';
import ShouldLoginModal from '@/app/components/common/modals/ShouldLoginModal';


export default function CalendlySubmitBtn({ calendlyUrl } : { calendlyUrl: string }) {
	const t = useTranslations();
	const { makeLocaleUrl } = useLocaleProvider();

	const { isOpen, openModal, closeModal } = useModal();

	const { isLoggedIn } = useAuth();

	const handleClick = () => {
		if (!isLoggedIn()) {
			openModal();
			return;
		}

		// Add the url to the session storage
		sessionStorage.setItem('calendlyUrl', calendlyUrl);

		// Go to calendly page
		window.location.href = makeLocaleUrl('/calendly');
	};


	return (
		<div>
			<StandardBtn text={t('take_the_session')} onClick={handleClick} />
			<ShouldLoginModal
				isOpen={isOpen}
				closeModal={closeModal}

			/>
		</div>
	);
}
