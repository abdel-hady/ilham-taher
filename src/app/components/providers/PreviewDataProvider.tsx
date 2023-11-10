/* eslint-disable max-len */
/* eslint-disable react/jsx-no-constructed-context-values */

'use client';

import {
	Blog, Course, GeneralSettingsType, MultiTypeSettings, OurService, Session, VisualSettings,
} from '@/app/util/types/remote-types';
import React, { createContext, useContext } from 'react';
import getSettingByKey from '@/app/util/getSettingsByKey';

interface PreviewDataContextProps {
	sessions: Session[];
	blogs: Blog[];
	courses: Course[];
	settings: GeneralSettingsType[];
	getSettingsByKey: (key:string)=> MultiTypeSettings | VisualSettings | null;
	ourServices: OurService[];
}

export const PreviewDataContext = createContext<PreviewDataContextProps>({
	sessions: [],
	blogs: [],
	courses: [],
	settings: [],
	getSettingsByKey: () => null,
	ourServices: [],
});

interface PreviewDataProviderProps {
	sessions: Session[];
	blogs: Blog[];
	courses: Course[];
	children: React.ReactNode;
	settings: GeneralSettingsType[];
	ourServices: OurService[];
}

export function PreviewDataProvider({
	sessions, blogs, children, courses, settings, ourServices,
}: PreviewDataProviderProps) {
	const getSetting = (key: string): MultiTypeSettings | VisualSettings | null => getSettingByKey(settings, key);
	return (
		<PreviewDataContext.Provider value={{
			sessions, blogs, courses, settings, getSettingsByKey: getSetting, ourServices,
		}}
		>
			{children}
		</PreviewDataContext.Provider>
	);
}

export const usePreviewDataProvider = (): PreviewDataContextProps => useContext(PreviewDataContext);
