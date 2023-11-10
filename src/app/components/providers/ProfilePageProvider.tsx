'use client';

import { User } from '@/app/util/types/local-types';
import React, { createContext, useContext } from 'react';
import { generateDefaultUser } from '@/app/util/types/default-generator';
import { Country, UserCourse, UserSession } from '@/app/util/types/remote-types';
import { Option } from '../input/data';

interface ProfilePageContextProps {
	user: User;
	genderOptions: Option[];
	userSessions: UserSession[];
	countryOptions: Option[];
	userCourses: UserCourse[];
}

export const ProfilePageContext = createContext<ProfilePageContextProps>({
	genderOptions: [],
	countryOptions: [],
	userSessions: [],
	userCourses: [],
	user: generateDefaultUser(),
});

interface ProfilePageProviderProps {
	user: User;
	genderOptions: Option[];
	countries: Country[];
	userSessions: UserSession[];
	children: React.ReactNode;
	userCourses: UserCourse[];
}

export function ProfilePageProvider({
	user, genderOptions, children, countries, userSessions, userCourses,
}: ProfilePageProviderProps) {
	const countryOptions: Option[] = countries.map((country) => ({
		label: country.name, value: country.id,
	}));

	const contextValue = React.useMemo(
		() => ({
			user, genderOptions, countryOptions, userSessions, userCourses,
		}),
		[user, genderOptions, countryOptions, userSessions, userCourses],
	);
	return (
		<ProfilePageContext.Provider value={contextValue}>
			{children}
		</ProfilePageContext.Provider>
	);
}

export const useProfilePageProvider = (): ProfilePageContextProps => useContext(ProfilePageContext);
