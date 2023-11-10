/* eslint-disable react/no-danger */

'use client';

import DateParser from '@/app/util/DateParser';
import parseImageUrl from '@/app/util/parseImageUrl';
import { Blog } from '@/app/util/types/remote-types';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useTranslations } from 'next-intl';
import { useLocaleProvider } from '../providers/LocaleProvider';

export default function BlogCard({
	title, slug, imageFileUrl, createdAt,
}: Partial<Blog>) {
	const t = useTranslations();
	const { makeLocaleUrl, isRtl } = useLocaleProvider();
	return (
		<div
			className="
			mx-auto flex flex-col border-2 border-gray-200 rounded-lg
			shadow-lg overflow-hidden w-100
			lg:hover:scale-105
			transform duration-200"
		>
			<div className="h-1/2">
				<Link href={`/blogs/${slug}`}>
					<Image width={1000} height={1000} src={parseImageUrl(imageFileUrl!)} className="w-full object-cover h-[350px]" alt={`${title} cover image`} />
				</Link>
			</div>
			<div className="h-1/2 flex flex-col gap-1 justify-between p-7">
				<Link href={`/blogs/${slug}`}>
					<h3 className=" font-extrabold text-2xl text-greenish capitalize">{title}</h3>
				</Link>
				<p className="text-base text-gray-500">{DateParser.toDayMonthYear(createdAt!)}</p>
				{/* <p className="text-lg leading-5 text-gray-500 truncate">{shortDescription}</p> */}
				<div className="flex flex-row-reverse">
					<Link href={makeLocaleUrl(`/blogs/${slug}`)}>
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
