import { useTranslations } from 'next-intl';
import React from 'react';
import GeneralModal from './GeneralModal';

interface NotPurchasableModalProps {
	isOpen: boolean;
	closeModal: ()=>void;

}
export default function NotPurchasableModal({
	isOpen,
	closeModal,
}:NotPurchasableModalProps) {
	const t = useTranslations();
	return (
		<GeneralModal
			isOpen={isOpen}
			title={t('cant_proceed')}
			description={t('this_course_is_not_purchasable_msg')}
			hideText={t('hide')}
			closeModal={closeModal}
		/>
	);
}
