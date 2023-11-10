'use client';

import Image from 'next/image';
import React from 'react';
import SectionTitle from '@/app/components/common/SectionTitle';
import { useLocaleProvider } from '@/app/components/providers/LocaleProvider';
import { Session } from '@/app/util/types/remote-types';
import parseImageUrl from '@/app/util/parseImageUrl';
import LinkStandardBtn from '@/app/components/common/LinkStandardBtn';
import { useTranslations } from 'next-intl';
import ImageSide from '../../Hypnosis/ImageSide';

interface VipSessionProps {
	vipSession: Session
}

export default function VipSession({ vipSession }: VipSessionProps) {
	const { makeLocaleUrl } = useLocaleProvider();
	const t = useTranslations();
	let lastNumberOfSessions = null;
	if (vipSession.icons.length > 4) {
		lastNumberOfSessions = 3;
	} else {
		lastNumberOfSessions = 2;
	}

	return (
		<>
			<div id="modal" />

			<section className="w-full flex flex-col gap-5 text-greenish">
				<div className="flex flex-col gap-2">
					<SectionTitle title={vipSession.name} />
				</div>
				<div className="flex flex-col lg:flex-row shadow-lg bg-white border-2 border-gray-200 rounded-lg">
					<ImageSide coverImg={parseImageUrl(vipSession.externalImageFileUrl)} />
					<div className="w-full lg:w-[50%]">
						<div className="w-full h-full flex flex-col justify-center items-center py-5">
							<h1 className=" text-greenish text-center text-xl lg:text-2xl">
								{vipSession.shortDescription}
							</h1>

							<div className={vipSession.icons.length > 4
								? 'grid grid-cols-1 md:grid-cols-3 w-full'
								: 'grid grid-cols-1 md:grid-cols-2 w-full'}
							>
								{vipSession.icons.slice(0, lastNumberOfSessions).map((icn) => (
									<div
										key={icn.id}
										className="
											px-10 lg:hover:scale-105 transform duration-150
											flex flex-col items-center md:py-5
										"
									>
										<div className="w-[100px]">
											<Image
												key={icn.id}
												alt={icn.title}
												src={parseImageUrl(icn.fileUrl)}
												width={1000}
												height={1000}
												className="w-full object-cover"
											/>
										</div>

										<span className="text-lg text-center">{icn.title}</span>
									</div>
								))}
							</div>
							<div className={vipSession.icons.length > 5
								? 'grid grid-cols-1 md:grid-cols-3 w-full'
								: 'grid grid-cols-1 md:grid-cols-2 w-full'}
							>
								{vipSession.icons.slice(lastNumberOfSessions, 6).map((icn) => (
									<div
										key={icn.id}
										className="
											px-10 lg:hover:scale-105 transform duration-150
											flex flex-col items-center md:py-5
										"
									>
										<div className="w-[100px]">
											<Image
												key={icn.id}
												alt={icn.title}
												src={parseImageUrl(icn.fileUrl)}
												width={1000}
												height={1000}
												className="w-full object-cover"
											/>
										</div>

										<span className="text-lg text-center">{icn.title}</span>
									</div>
								))}
							</div>
							<div className="w-full flex justify-center mt-8">
								<LinkStandardBtn
									text={t('learn_more')}
									href={makeLocaleUrl(`/sessions/${vipSession.slug}`)}
								/>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
