import React, { Suspense } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { Metadata } from 'next';
import getDictionary from '../../../locale/get-dictionary';
import { LocaleProvider } from '../components/providers/LocaleProvider';
import ClientToastContainer from '../components/toast-container/ClientToastContainer';
import NavsWrapper from '../components/navs/NavsWrapper';
import FooterV2 from '../components/footer/FooterV2';
import Particles from '../components/particles';
import { AuthProvider } from '../components/providers/AuthProvider';
import SessionsService from '../lib/services/SessionsService';
import BlogsService from '../lib/services/BlogsService';
import PageLoader from '../components/loaders/PageLoader';
import { PreviewDataProvider } from '../components/providers/PreviewDataProvider';
import { calculateDir } from '../util/RtlUtils';
import UsersService from '../lib/services/UsersService';
import CoursesService from '../lib/services/CoursesService';
import FindYourSessionOverlay from '../components/common/FindYourSessionOverlay';
import SettingsService from '../lib/services/SettingsService';
import { GeneralSettingsType } from '../util/types/remote-types';
import OurServicesService from '../lib/services/OurServicesService';


async function Content({ children, params, promise }: {
	children: React.ReactNode,
	params: { lang: string },
	promise: Promise<any>
}) {
	const [
		user, dic, sessions, blogs,
		courses, multiTypeSettings, visualSettings,
		ourServices,
	] = await promise;


	const { lang } = params;

	const settingArray: GeneralSettingsType[] = [...multiTypeSettings.items, ...visualSettings.items];

	return (
		<AuthProvider user={user}>
			<NextIntlClientProvider locale={params.lang} messages={dic}>
				<div className="relative z-[5]" dir={calculateDir(lang)} lang={lang}>
					<LocaleProvider>
						<PreviewDataProvider
							blogs={blogs}
							sessions={sessions}
							courses={courses}
							settings={settingArray}
							ourServices={ourServices}
						>

							<ClientToastContainer />
							<NavsWrapper />
							<div style={{ paddingTop: '113px', zIndex: 5 }}>
								{children}
							</div>

							<FooterV2 />
							<FindYourSessionOverlay />
						</PreviewDataProvider>

					</LocaleProvider>
				</div>
				<Particles />
			</NextIntlClientProvider>
		</AuthProvider>

	);
}

export async function generateMetadata(
	{ params: { lang } }: { params: { lang: string } },
): Promise<Metadata> {
	const [dictionary, description, keywords] = await Promise.all([
		getDictionary(lang),
		SettingsService.getVisualSettingsByKey(
			lang,
			SettingsService.VISUAL_SETTINGS_KEYS.META_DATA_DESCRIPTION_SETTING,
		),
		SettingsService.getVisualSettingsByKey(
			lang,
			SettingsService.VISUAL_SETTINGS_KEYS.META_DATA_KEYWORD_SETTING,
		),
	]);

	if (!description || !keywords) {
		return {
			title: dictionary.website_title,
		};
	}
	return {
		title: dictionary.website_title,
		keywords: keywords.description,
		description: description.description,
	};
}


export default function LangLayout({ children, params }: {
	children: React.ReactNode,
	params: { lang: string }
}) {
	const { lang } = params;

	const promise = Promise.all([
		UsersService.getProfile(lang),
		getDictionary(lang),
		SessionsService.getPreviewSessions(lang),
		BlogsService.getPreviewBlogs(lang),
		CoursesService.getPreviewCourses(lang),
		SettingsService.getMultiTypeSettings(lang),
		SettingsService.getVisualSettings(lang),
		OurServicesService.getPreviewOurServices(lang),
	]);

	return (
		<Suspense fallback={<PageLoader />}>
			{/* @ts-expect-error Server Component */}
			<Content promise={promise} params={params}>
				{children}
			</Content>
		</Suspense>

	);
}
