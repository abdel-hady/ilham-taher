import { useTranslations } from 'next-intl';
import React from 'react';
import GeneralModal from './GeneralModal';
import { useLocaleProvider } from '../../providers/LocaleProvider';

interface ShouldLoginModalProps {
	isOpen: boolean;
	closeModal: ()=>void;

}
export default function ShouldLoginModal({
	isOpen,
	closeModal,
}:ShouldLoginModalProps) {
	const t = useTranslations();
	const { makeLocaleUrl } = useLocaleProvider();
	return (
		<GeneralModal
			isOpen={isOpen}
			title={t('cant_proceed')}
			description={t('need_to_login_description')}
			hideText={t('hide')}
			closeModal={closeModal}
			actionProps={{
				actionText: t('login'),
				href: makeLocaleUrl('/auth/login'),
				actionSubmit: false,
			}}
		/>
	);
}
