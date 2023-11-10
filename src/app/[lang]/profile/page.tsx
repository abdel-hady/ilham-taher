import GeneralPageWrapper from '@/app/components/GeneralPageWrapper';
import React from 'react';
import { GeneralPageProp } from '@/app/util/types/local-types';
import { redirect } from 'next/navigation';
import OptionsService from '@/app/lib/services/OptionsService';
import { ProfilePageProvider } from '@/app/components/providers/ProfilePageProvider';
import UsersService from '@/app/lib/services/UsersService';
import CoursesService from '@/app/lib/services/CoursesService';
import ProfileBasicInfo from './partials/ProfileBasicInfo';
import ProfileTabs from './partials/ProfileTabs';

export default async function Profile({ params: { lang } }:GeneralPageProp) {
	const user = await UsersService.getProfile(lang);


	if (!user) {
		redirect('/auth/login');
	}

	const [genderOptions, countries, userSessions, userCourses] = await Promise.all([
		OptionsService.getGenderOptions(lang),
		OptionsService.getCountryOptions(lang),
		UsersService.getUserSessions(lang),
		CoursesService.getUserCourses(lang),
	]);

	return (
		<GeneralPageWrapper>
			<ProfilePageProvider
				user={user}
				genderOptions={genderOptions || []}
				countries={countries || []}
				userSessions={userSessions.items}
				userCourses={userCourses.items}
			>
				<div className="grid grid-cols-1 gap-8 lg:grid-cols-4 bg-white min-h-[600px]">
					<div className="col-span-1 lg:col-span-1">
						<ProfileBasicInfo miniUser={{
							name: `${user.firstName} ${user.lastName}`,
							email: user.email,
							avatar: user.avatarFileUrl || '',
						}}
						/>
					</div>
					<div className="col-span-1 lg:col-span-3">
						<ProfileTabs />
					</div>
				</div>
			</ProfilePageProvider>
		</GeneralPageWrapper>
	);
}
