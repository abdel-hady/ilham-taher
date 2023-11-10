import { useTranslations } from 'next-intl';
import React from 'react';
import GeneralModal from './GeneralModal';

interface ProcessStatusModalProps {
	isOpen: boolean;
	closeModal: ()=>void;

}
export default function ProcessStatusModal({
	isOpen,
	closeModal,
}:ProcessStatusModalProps) {
	const t = useTranslations();
	return (
		<GeneralModal
			isOpen={isOpen}
			title={t('payment_success')}
			description={t('payment_successfully_submitted_msg')}
			hideText={t('hide')}
			closeModal={closeModal}
		/>
	);
}
