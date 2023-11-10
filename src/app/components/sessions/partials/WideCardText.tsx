'use client';

import React from 'react';
import { useInView } from 'react-intersection-observer';
import { useTranslations } from 'next-intl';
import { IconDetails } from '@/app/util/types/remote-types';
import EaseInFromRight from '../../animation/EaseInFromRight';
import EaseInFromLeft from '../../animation/EaseInFromLeft';
import { useLocaleProvider } from '../../providers/LocaleProvider';
import IconsDisplayer from '../../common/IconsDisplayer';
import LinkStandardBtn from '../../common/LinkStandardBtn';


interface WideCardTextProps {
	slug: string;
	title: string;
	description?: string;
	easeInFromLeft?: boolean;
	icons: IconDetails[];
}
export default function WideCardText({
	slug,
	description,
	title,
	easeInFromLeft = false,
	icons,
}: WideCardTextProps) {
	const t = useTranslations();
	const [ref, inView] = useInView({
		threshold: 0.2,
		triggerOnce: true,
	});

	const { makeLocaleUrl } = useLocaleProvider();

	const textComponent = (
		<>
			<h4 className=" text-lg sm:text-2xl md:text-3xl lg:text-4xl">{title}</h4>
			{description && <p className="text-sm lg:text-xl mt-1">{description}</p>}
			<IconsDisplayer
				iconUrls={icons}
				withLabels
				imageClassName="sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14"
			/>
			<div className="w-fit">
				<LinkStandardBtn href={makeLocaleUrl(`/sessions/${slug}`)} text={t('learn_more')} />
			</div>
		</>
	);

	return (
		<div className="w-4/5 py-2 flex flex-col justify-center gap-4 text-left lg:w-2/3 lg:gap-7 lg:px-12 lg:py-0 text-greenish" ref={ref}>
			{easeInFromLeft
				? (
					<EaseInFromLeft
						parentInView={inView}
						className="
						flex justify-center flex-col gap-2 items-center
						 align-middle text-center lg:text-left lg:items-start"
					>
						{textComponent}


					</EaseInFromLeft>
				)
				: (
					<EaseInFromRight
						parentInView={inView}
						className="flex justify-center flex-col gap-2 items-center
						align-middle text-center lg:text-right lg:items-end"
					>
						{textComponent}
					</EaseInFromRight>
				)}

		</div>

	);
}
