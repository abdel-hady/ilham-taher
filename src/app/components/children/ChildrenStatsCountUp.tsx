'use client';

import React from 'react';
import CountUp from 'react-countup';
import {
	Swiper,
	SwiperSlide,
} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { CharitySlider, MultiTypeSettings } from '@/app/util/types/remote-types';
import { useTranslations } from 'next-intl';
import SettingsService from '@/app/lib/services/SettingsService';
import getSettingByKey from '@/app/util/getSettingsByKey';
import { calculateDir } from '@/app/util/RtlUtils';
import StandardBtn from '../common/StandardBtn';
import { usePreviewDataProvider } from '../providers/PreviewDataProvider';
import { useLocaleProvider } from '../providers/LocaleProvider';


interface ChildrenComponentProps {
	charitySliders: CharitySlider[]
}

export default function ChildrenStatsCountUp({ charitySliders }: ChildrenComponentProps) {
	const t = useTranslations();
	const { locale } = useLocaleProvider();

	const { settings } = usePreviewDataProvider();

	const voulnteeringSettings = getSettingByKey<MultiTypeSettings>(
		settings,
		SettingsService.MULTI_TYPE_SETTINGS_KEYS.WHATSAPP_VOLUNTEER_LINK_SETTING,
	);

	const helpSettings = getSettingByKey<MultiTypeSettings>(
		settings,
		SettingsService.MULTI_TYPE_SETTINGS_KEYS.WHATSAPP_NEED_HELP_LINK_SETTING,
	);


	const handleClickVolunteer = () => {
		window.open(voulnteeringSettings?.value, '_blank');
	};
	const handleClickHelp = () => {
		window.open(helpSettings?.value, '_blank');
	};

	return (
		<Swiper
			effect="coverflow"
			spaceBetween={50}
			slidesPerView={1}
			grabCursor
			centeredSlides
			loop
			className="swiper_container h-[100%]"
			slideActiveClass="swiper-slide-active"
			autoplay={{ delay: 3000 }}
			initialSlide={0}
		>
			{charitySliders.map((sliderInfo, idx) => (
				<SwiperSlide key={sliderInfo.id}>
					{({ isActive: isSliderOnScreen }) => (
						<div
							className="text-greenish custom-texture flex flex-col items-center justify-center relative w-full h-96 px-12 py-16 gap-6 rounded-lg sm:gap-2 md:gap-2 lg:gap-2 lg:py-2 xl:py-16 hover:text-white"
						>
							{/* Last Slide is filled by hand or settings */}
							{idx === charitySliders.length - 1 ? (
								<div className="flex flex-col items-center gap-8">
									<div>
										<p className="flex justify-center text-center text-xl font-bold">
											{t(sliderInfo.title)}
										</p>
									</div>
									<div className="flex flex-col gap-8">
										<StandardBtn
											text={t('volunteering_in_the_association')}
											onClick={handleClickVolunteer}
											className="hover:bg-gray-300"
										/>
										<StandardBtn
											text={t('i_need_help')}
											onClick={handleClickHelp}
											className="hover:bg-gray-300"
										/>
									</div>
								</div>
							) : (
								<>
									{sliderInfo.title && (
										<h1 className="flex justify-center text-center font-semibold w-full text-2xl ">
											{sliderInfo.title}
										</h1>
									)}
									{sliderInfo.counter && (
										<div className="flex justify-center w-full h-1/3 items-center ">
											<div className="flex justify-center text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl text-center">
												{isSliderOnScreen && (
													<div dir={calculateDir(locale)} className="flex">
														<CountUp
															start={0}
															end={sliderInfo.counter}
															duration={3}
															decimals={0}
															key={sliderInfo.id}
														/>
														<div>
															{sliderInfo.numberUnit}
														</div>
													</div>
												)}
											</div>
										</div>
									)}
									<div>
										<p className="flex justify-center text-center text-base sm:text-bese md:text-lg lg:text-base xl:text-xl">
											{sliderInfo.description}
										</p>
									</div>
								</>
							)}
						</div>

					)}
				</SwiperSlide>
			))}
		</Swiper>
	);
}
