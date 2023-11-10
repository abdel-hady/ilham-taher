/* eslint-disable react/no-danger */

'use client';

import parseImageUrl from '@/app/util/parseImageUrl';
import { OurService } from '@/app/util/types/remote-types';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useTranslations } from 'next-intl';
import { useLocaleProvider } from '../providers/LocaleProvider';

export default function OurServiceCard({
	title, slug, externalImageUrl,
}: Partial<OurService>) {
	const t = useTranslations();
	const { makeLocaleUrl, isRtl } = useLocaleProvider();
	return (
		<div
			className="
			mx-auto flex flex-col border-2 border-gray-200 rounded-lg
			shadow-lg overflow-hidden w-100
			lg:hover:scale-105
			transform duration-200
			max-h-[450px]
		"
		>
			<div className="h-2/3 overflow-hidden">
				<Link href={`/our-services/${slug}`}>
					<Image width={1000} height={1000} src={parseImageUrl(externalImageUrl!)} alt={`${title} cover image`} />
				</Link>
			</div>
			<div className="h-1/3 flex flex-col gap-1 justify-between p-7 border-t-2 border-gray-200">
				<Link href={`/our-services/${slug}`}>
					<h3 className=" font-extrabold text-2xl text-greenish capitalize">{title}</h3>
				</Link>
				<div className="flex flex-row-reverse">
					<Link href={makeLocaleUrl(`/our-services/${slug}`)}>
						<button
							type="button"
							className="
						flex items-center
						text-2xl text-golden gap-3
						hover:drop-shadow-lg hover:text-dark-gold
						transform duration-200
						mt-3
						"
						>
							<span>{t('read_more')}</span>
							<span>
								{isRtl
									? <FontAwesomeIcon icon={faArrowLeft} />
									: <FontAwesomeIcon icon={faArrowRight} />}
							</span>
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
}
