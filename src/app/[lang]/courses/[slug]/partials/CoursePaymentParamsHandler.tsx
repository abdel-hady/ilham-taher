'use client';

import { useSearchParams, usePathname } from 'next/navigation';
import React, {
	useEffect,
} from 'react';
import ProcessStatusModal from '@/app/components/common/modals/ProcessStatusModal';
import useModal from '@/app/hooks/useModal';

export default function CoursePaymentParamsHandler() {
	const searchParams = useSearchParams();
	const pathname = usePathname();

	const { isOpen, closeModal, openModal } = useModal();

	useEffect(() => {
		const redirectStatus = searchParams.get('redirect_status');
		if (redirectStatus && redirectStatus === 'succeeded') {
			openModal();
			window.history.replaceState(null, '', pathname);
		}
	}, []);

	return (
		<ProcessStatusModal
			isOpen={isOpen}
			closeModal={closeModal}
		/>
	);
}
