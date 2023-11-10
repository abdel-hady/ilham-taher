'use client';

import StandardBtn from '@/app/components/common/StandardBtn';
import NotPurchasableModal from '@/app/components/common/modals/NotPurchasableModal';
import ShouldLoginModal from '@/app/components/common/modals/ShouldLoginModal';
import { useAuth } from '@/app/components/providers/AuthProvider';
import useModal from '@/app/hooks/useModal';
import CoursesService from '@/app/lib/services/CoursesService';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import GeneralModal from '@/app/components/common/modals/GeneralModal';

interface FreeEnrollBtnProps {
	courseId:string; isPurchasable:boolean; isVerified?:boolean
}

export default function FreeEnrollBtn({ courseId, isPurchasable, isVerified }: FreeEnrollBtnProps) {
	const t = useTranslations();
	const { isLoggedIn } = useAuth();
	const { isOpen, openModal, closeModal } = useModal();
	const {
		isOpen: isNotPurchasableModalOpen,
		closeModal: closeNotPurchasableModal,
		openModal: openNotPurchasableModal,
	} = useModal();
	const [isVerifiedModal, setIsVerifiedModal] = useState(false);

	const freeEnrollClicked = () => {
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
		CoursesService.enrollInFreeCourse(Number(courseId)).then(() => {
			window.location.reload();
		});
	};

	return (
		<>
			<div className="flex justify-center">
				<StandardBtn text={t('enroll_for_free')} onClick={freeEnrollClicked} />
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
				closeModal={() => {				setIsVerifiedModal(false); }}
			/>
		</>
	);
}
