'use client';

import React from 'react';
import { useInView } from 'react-intersection-observer';
import { useTranslations } from 'next-intl';
import EaseInFromRight from '../../animation/EaseInFromRight';
import StandardBtn from '../../common/StandardBtn';

export default function LeftWideCardText({
	description, title, onClick, isFree,
}: { description: string, title: string, onClick: ()=>void, isFree:boolean }) {
	const [ref, inView] = useInView({
		threshold: 0.2,
		triggerOnce: true,
	});
	const t = useTranslations();
	return (
		<div className="w-4/5 py-2 flex flex-col justify-center gap-4 text-left lg:w-2/3 lg:gap-7 lg:px-12 lg:py-0" ref={ref}>
			<EaseInFromRight
				parentInView={inView}
				className="flex justify-center flex-col gap-2 items-center align-middle text-center lg:text-left lg:items-start"
			>
				<h4 className="text-2xl font-bold lg:text-5xl">
					{title}
					{isFree && (
						<div className="badge badge-success gap-2">
							free
						</div>
					)}
				</h4>
				<p className="text-sm lg:text-xl">{description}</p>
				<div className="w-fit">
					<StandardBtn text={t('learn_more')} onClick={onClick} />
				</div>
			</EaseInFromRight>
		</div>

	);
}
