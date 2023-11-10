'use client';

import { useLocaleProvider } from '@/app/components/providers/LocaleProvider';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import React from 'react';

export default function LessonHeader({ courseId }: { courseId: string }) {
	const t = useTranslations();
	const { makeLocaleUrl } = useLocaleProvider();
	return (
		<div className="w-full relative">
			<Link
				className="btn btn-sm absolute left-0"
				href={makeLocaleUrl(`/courses/${courseId}`)}
			>
				<span>{t('back_to_course')}</span>
				<span><FontAwesomeIcon icon={faArrowLeft} /></span>
			</Link>
		</div>
	);
}
