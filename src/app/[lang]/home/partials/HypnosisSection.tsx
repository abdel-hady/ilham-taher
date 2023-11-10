'use client';

import Image from 'next/image';
import React, { useState, Fragment, useEffect } from 'react';
import SectionTitle from '@/app/components/common/SectionTitle';
import SessionsService from '@/app/lib/services/SessionsService';
import { useLocaleProvider } from '@/app/components/providers/LocaleProvider';
import { Session } from '@/app/util/types/remote-types';
import parseImageUrl from '@/app/util/parseImageUrl';
import useModal from '@/app/hooks/useModal';
import LinkStandardBtn from '@/app/components/common/LinkStandardBtn';
import { useTranslations } from 'next-intl';
import ImageSide from './Hypnosis/ImageSide';
import HypnosisPopupForSmallScreens from './Hypnosis/HypnosisPopupForSmallScreens';

export default function HypnosisSection() {
	const { locale, makeLocaleUrl } = useLocaleProvider();
	const t = useTranslations();
	const [vipSession, setVipSession] = useState<Session | null>(null);

	const { isOpen, closeModal, openModal } = useModal();


	useEffect(() => {
		if (locale) {
			SessionsService.getVipSession(locale)
				.then((data) => setVipSession(data));
		}
	}, [locale]);

	if (!vipSession) {
		return null;
	}

	return (
		<>
			<div id="modal" />

			<section className="w-full flex flex-col gap-5 text-greenish">
				<div className="flex flex-col gap-2">
					<SectionTitle title={vipSession.name} />
					{
						vipSession.shortDescription
						&& (
							<button
								type="button"
								className="btn btn-outline border-golden btn-sm min-w-18 mx-auto lg:hidden text-greenish"
								onClick={openModal}
							>
								<span>{t('details')}</span>
							</button>
						)
					}
				</div>
				<div className="w-full hidden lg:block">
					<p className="text-center">
						{vipSession.shortDescription}
					</p>
				</div>
				<div className="flex flex-col lg:flex-row shadow-lg bg-white border-2 border-gray-200 rounded-lg">
					<ImageSide coverImg={parseImageUrl(vipSession.externalImageFileUrl)} />
					<div className="w-full lg:w-[50%]">
						<div className="w-full h-full flex flex-col justify-center items-center py-2">
							<h1 className=" text-greenish text-center text-xl lg:text-2xl">
								{t('hypnosis_section_icons_title')}
							</h1>

							<div className="grid grid-cols-2 md:grid-cols-3">
								{vipSession.icons.map((icn) => (
									<div
										key={icn.id}
										className="
											px-10 lg:hover:scale-105 transform duration-150
											flex flex-col items-center
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
			{ vipSession.shortDescription &&	(
				<HypnosisPopupForSmallScreens
					isOpen={isOpen}
					handleCloseModal={closeModal}
					title={vipSession.name}
					description={vipSession.shortDescription}
				/>
			)}
		</>
	);
}
