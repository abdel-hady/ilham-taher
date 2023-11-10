/* eslint-disable react/jsx-props-no-spreading */

'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import SectionTitle from './SectionTitle';

interface ViewReviewSectionProps {
	comment: string
}

export default function ViewReviewSection({ comment }:ViewReviewSectionProps) {
	const t = useTranslations();
	return (
		<section className="
            container border-2 border-gray-200 rounded-lg
            w-full flex flex-col gap-5 items-center justify-center
            bg-white shadow-lg py-5 px-10
            min-h-[300px]
			text-greenish
            "
		>
			<SectionTitle title={t('already_commented')} className="font-normal" />

			<div className="w-full">
				<p className=" text-xl text-center">
					{comment}
				</p>
			</div>
		</section>
	);
}
