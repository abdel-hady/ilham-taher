import React from 'react';
import { useTranslations } from 'next-intl';
import GeneralModal from './modals/GeneralModal';


interface ShouldPurchaseCourseProps {
	isOpen: boolean;
	closeModal: ()=>void;

}
export default function ShouldPurchaseCourse({
	isOpen,
	closeModal,
}:ShouldPurchaseCourseProps) {
	const t = useTranslations();
	return (
		<GeneralModal
			isOpen={isOpen}
			title={t('cant_view_lession_title')}
			description={t('cant_view_lession_title_description')}
			hideText={t('hide')}
			closeModal={closeModal}
		/>
	);
}
