import StandardBtn from '@/app/components/common/StandardBtn';
import { useTranslations } from 'next-intl';
import React from 'react';


export default function AlreadyEnrolledBtn() {
	const t = useTranslations();

	const handleScroll = (
		event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
		href: string,
	) => {
		event.preventDefault();
		const target = document.querySelector(href);
		if (target) {
			const topOffset = target.getBoundingClientRect().top + window.pageYOffset;
			window.scrollTo({
				top: topOffset,
				behavior: 'smooth',
			});
		}
	};

	return (
		<div
			className="alert alert-outline border-0 max-w-[600px] mx-auto flex flex-col"
		>
			<div style={{
				display: 'flex',
				justifyContent: 'center',
				gap: '10px',
				opacity: '0.9',
			}}
			>

				<svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
				<span>{t('you_are_enrolled_in_course')}</span>
			</div>
			<div>
				<StandardBtn text={t('see_course_content')} onClick={(e) => { handleScroll(e, '#course-content'); }} />
			</div>
		</div>
	);
}
