'use client';

import React, { ReactElement } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Course, MultiTypeSettings, Session } from '@/app/util/types/remote-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import getSettingByKey from '@/app/util/getSettingsByKey';
import SettingsService from '@/app/lib/services/SettingsService';
import {
	faTiktok, faInstagram, faYoutube, faFacebook, faTelegram,
} from '@fortawesome/free-brands-svg-icons';
import { usePreviewDataProvider } from '../providers/PreviewDataProvider';
import { useLocaleProvider } from '../providers/LocaleProvider';


function SessionsItemsList({ sessions }: { sessions: Session[] }) {
	const { isRtl, makeLocaleUrl } = useLocaleProvider();
	const t = useTranslations();

	return (
		<div className={`hidden md:grid grid-rows-6 gap-5 justify-items-center ${isRtl ? 'md:justify-items-center' : 'md:justify-items-start'}`}>
			<div className="text-xl font-extrabold">{t('sessions')}</div>
			{sessions.slice(0, 5).map((session) => (
				<Link href={makeLocaleUrl(`/sessions/${session.slug}`)} key={session.id}>{session.name}</Link>
			))}
			<Link href={makeLocaleUrl('/sessions')}>{t('view_all')}</Link>
		</div>
	);
}

function CoursesItemsList({ courses }: { courses: Course[] }) {
	const { isRtl, makeLocaleUrl } = useLocaleProvider();
	const t = useTranslations();

	return (
		<div className={` hidden md:grid grid-rows-6 gap-5 justify-items-center ${isRtl ? 'md:justify-items-center' : 'md:justify-items-start'}`}>
			<div className="text-xl font-extrabold">{t('courses')}</div>
			{courses.slice(0, 5).map((course) => (
				<Link href={makeLocaleUrl(`/courses/${course.slug}`)} key={course.id}>{course.name}</Link>
			))}
			<Link href={makeLocaleUrl('/courses')}>{t('view_all')}</Link>
		</div>
	);
}


export default function FooterV2(): ReactElement {
	const t = useTranslations();
	const { isRtl, makeLocaleUrl } = useLocaleProvider();

	const { sessions, courses } = usePreviewDataProvider();

	const { settings } = usePreviewDataProvider();

	const insta = getSettingByKey<MultiTypeSettings>(
		settings,
		SettingsService.MULTI_TYPE_SETTINGS_KEYS.INSTAGRAM_LINK_SETTING,
	);

	const tiktok = getSettingByKey<MultiTypeSettings>(
		settings,
		SettingsService.MULTI_TYPE_SETTINGS_KEYS.TIKTOK_LINK_SETTING,
	);

	const youtube = getSettingByKey<MultiTypeSettings>(
		settings,
		SettingsService.MULTI_TYPE_SETTINGS_KEYS.YOUTUBE_LINK_SETTING,
	);

	const telegram = getSettingByKey<MultiTypeSettings>(
		settings,
		SettingsService.MULTI_TYPE_SETTINGS_KEYS.TELEGRAM_LINK_SETTING,
	);

	const facebook = getSettingByKey<MultiTypeSettings>(
		settings,
		SettingsService.MULTI_TYPE_SETTINGS_KEYS.FACEBOK_LINKE_SETTING,
	);

	const icons = [
		{ icon: faTiktok, link: tiktok?.value ?? '#', id: 1 },
		{ icon: faInstagram, link: insta?.value ?? '#', id: 2 },
		{ icon: faYoutube, link: youtube?.value ?? '#', id: 3 },
		{ icon: faFacebook, link: facebook?.value ?? '#', id: 4 },
		{ icon: faTelegram, link: telegram?.value ?? '#', id: 5 },
	];

	const pagesLinks = [
		{
			key: 'home',
			title: 'Home',
			link: '/home',
		},
		{
			key: 'courses',
			title: 'Courses',
			link: '/courses',
		},
		{
			key: 'sessions',
			title: 'Sessions',
			link: '/sessions',
		},
		{
			key: 'blogs',
			title: 'Blogs',
			link: '/blogs',
		},
		{
			key: 'faq',
			title: 'FAQs',
			link: '/about-us/faq',
		},
		{
			key: 'about_us',
			title: 'About Us',
			link: '/about-us/ilhem-taher',
		},
	];

	return (
		<footer className=" border-t-2 container mx-auto bg-white text-greenish">
			<div className="py-12 mx-auto space-y-8 overflow-hidden">
				<div className="w-full">
					<div className="grid grid-rows-2 grid-cols-1 grid-flow-col gap-5 md:grid-cols-3 md:grid-rows-1 md:grid-flow-row">
						<div className="flex justify-center flex-col items-center md:row-start-1">
							<Link href={makeLocaleUrl('/home')}>

								<Image
									src="/assets/images/logo.svg"
									alt="Ilham Taher Logo"
									width={200}
									height={48}
									priority
								/>
							</Link>
							<div className="pt-10">United Arab Emirate</div>
							<div className="flex gap-2 pt-5">
								{icons.map((icn) => (
									<a href={icn.link} target="_blank" rel="noreferrer" key={icn.id}>
										<div className="transition duration-300 hover:scale-110 hover:bg-golden hover:text-dark-green text-greenish w-7 h-7 flex items-center justify-center rounded-full">
											<FontAwesomeIcon icon={icn.icon} size="lg" />
										</div>
									</a>

								))}
							</div>
						</div>
						<div className="grid row-start-2 row-end-5 grid-cols-1 grid-flow-row gap-8 md:row-start-1 md:grid md:grid-cols-3 md:grid-rows-1 md:col-span-2 md:gap-1">
							<div className={`grid grid-rows-6 gap-0 md:gap-5 justify-items-center ${isRtl ? 'md:justify-items-center' : 'md:justify-items-start'}`}>
								<div className="text-xl font-extrabold">{t('pages')}</div>

								{
									pagesLinks.map((ele) => (
										<Link href={ele.link} key={ele.key}>{t(ele.key)}</Link>
									))
								}
							</div>
							<CoursesItemsList courses={courses} />
							<SessionsItemsList sessions={sessions} />
						</div>
					</div>
				</div>
				<hr />
				<div className="mt-8 text-base leading-6 text-center text-gray-400 flex flex-col gap-4 justify-between sm:flex-row sm:gap-0">
					<p className="text-base leading-6 text-center text-gray-400 flex justify-center md:gap-1" style={{ gap: '2px' }}>
						<span>© </span>
						<span>2023</span>
						<span>{t('ilhem_taher')}</span>
						<span>/</span>
						<span>{t('developed_by')}</span>
						<Link href="https://www.sheenvalue.com/" target="_blank" className=" underline">Sheen Value</Link>
					</p>
					<div>
						<Link href={makeLocaleUrl('privacy-policy')} className="px-2">{t('privacy_policy')}</Link>
						<span className=" border-r-2" />
						<Link href={makeLocaleUrl('terms-and-conditions')} className="px-2">{t('terms_and_conditions')}</Link>
					</div>
				</div>
			</div>
		</footer>
	);
}
