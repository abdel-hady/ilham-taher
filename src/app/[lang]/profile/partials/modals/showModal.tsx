'use client';

import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';
import GeneralModal from '@/app/components/common/modals/GeneralModal';

interface ShowModalProps {
	title:string,
	description:string,
	param:string
}

export default function ShowModal({
	title,
	description,
	param,
}:ShowModalProps) {
	const t = useTranslations();


	let params = null;
	let url = '';

	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);


	useEffect(() => {
		url = window.location.href;
		params = new URLSearchParams(window.location.search);
		if (params.get(param) === '1') {
			setIsModalOpen(true);
			params.delete(param);
			const newUrl = `${url.split('?')[0]}${params.toString()}`;
			window.history.replaceState({ path: newUrl }, '', newUrl);
		}
	}, []);
	return (
		<GeneralModal
			title={t(title)}
			description={t(description)}
			isOpen={isModalOpen}
			closeModal={() => { setIsModalOpen(false); }}
			hideText={t('hide')}
		/>
	);
}
