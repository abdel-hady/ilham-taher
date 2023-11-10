'use client';

import React from 'react';
import { useInView } from 'react-intersection-observer';
import { useTranslations } from 'next-intl';
import { IconDetails } from '@/app/util/types/remote-types';
import EaseInFromRight from '../../animation/EaseInFromRight';
import StandardBtn from '../../common/StandardBtn';
import EaseInFromLeft from '../../animation/EaseInFromLeft';
import IconsDisplayer from '../../common/IconsDisplayer';


interface WideCardTextProps {
	title: string;
	description: string;
	easeInFromLeft?: boolean;
	icons: IconDetails[];
	onClick: ()=>void;
	isFree: boolean;
}
export default function WideCardText({
	description,
	title,
	easeInFromLeft = false,
	icons,
	onClick,
	isFree,
}: WideCardTextProps) {
	const t = useTranslations();
	const [ref, inView] = useInView({
		threshold: 0.2,
		triggerOnce: true,
	});


	const textComponent = (
		<>
			<h4 className=" text-lg sm:text-2xl md:text-3xl lg:text-4xl">{title}</h4>

			<p dangerouslySetInnerHTML={{ __html: description }} />
			{isFree && (
				<div className="badge  badge-lg gap-2 p-4" style={{ backgroundColor: 'rgb(187, 255, 133, 0.6)' }}>
					{t('free')}
				</div>
			)}
			<IconsDisplayer iconUrls={icons} />
			<div className="w-fit">
				<StandardBtn
					text={t('learn_more')}
					onClick={onClick}
				/>
			</div>
		</>
	);

	return (
		<div className="w-4/5 py-2 flex flex-col justify-center gap-4 text-left lg:w-2/3 lg:gap-7 lg:px-12 lg:py-0" ref={ref}>
			{easeInFromLeft
				? (
					<EaseInFromLeft
						parentInView={inView}
						className="flex justify-center flex-col gap-2 items-center align-middle text-center lg:text-left lg:items-start"
					>
						{textComponent}


					</EaseInFromLeft>
				)
				: (
					<EaseInFromRight
						parentInView={inView}
						className="flex flex-col gap-2  justify-end items-center lg:items-end"
					>
						{textComponent}
					</EaseInFromRight>
				)}

		</div>

	);
}
