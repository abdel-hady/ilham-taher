'use client';

import SectionTitle from '@/app/components/common/SectionTitle';
import { useTranslations } from 'next-intl';
import React from 'react';

interface DescriptionInt {
	description: string;
}

export default function Description({ description }:DescriptionInt) {
	const t = useTranslations();
	return (
		<div className="flex justify-center items-center flex-col gap-6 text-greenish">
			<SectionTitle title={t('description')} className="font-semibold" />
			<p dangerouslySetInnerHTML={{ __html: description }} />
		</div>
	);
}
