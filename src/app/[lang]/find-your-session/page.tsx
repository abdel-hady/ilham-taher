'use client';

import GeneralPageWrapper from '@/app/components/GeneralPageWrapper';
import React, { useState } from 'react';

import SessionsService from '@/app/lib/services/SessionsService';
import { GeneralPageProp } from '@/app/util/types/local-types';
import { Session } from '@/app/util/types/remote-types';
import SessionWideCard from '@/app/components/sessions/SessionWideCard';
import NoData from '@/app/components/fail/NoData';
import { useTranslations } from 'next-intl';
import Form from './partials/Form';


export default function FindYourSessionPage({ params: { lang } }:GeneralPageProp) {
	const [isFetching, setIsFetching] = useState<boolean>(false);
	const [showForm, setShowForm] = useState<boolean>(true);
	const [sessions, setSessions] = useState<Session[]>([]);
	const t = useTranslations();

	const onSubmitHandler = (keys:string[]) => {
		setShowForm(false);
		if (keys.length > 0) {
			setIsFetching(true);
			SessionsService.getPaginationSessionByKeys(lang, keys)
				.then((data) => {
					setShowForm(false);
					setIsFetching(false);
					setSessions(data.items);
				});
		}
	};

	if (showForm) {
		return (
			<GeneralPageWrapper>
				<Form onSubmitHandler={onSubmitHandler} />
			</GeneralPageWrapper>
		);
	}

	return (
		<GeneralPageWrapper>
			{isFetching
				? (
					<div className="w-full min-h-[300px] flex items-center justify-center">
						<span className="loading loading-spinner loading-lg" />
					</div>
				)
				: (
					<div className="border-2 border-gray-200 rounded-lg p-2 lg:p-24 py-10">
						<h1 className="text-center text-4xl">
							{t('suggested_sessions')}
						</h1>
						<div className="divider" />

						<section dir="ltr" className="grid grid-cols-1 gap-10 min-h-[500px]">
							{
								sessions.length > 0
									? sessions.map((session, index) => {
										const isOnLeft = (index % 2 === 0);
										return (
											<SessionWideCard
												key={session.id}
												session={session}
												imgOnLeft={isOnLeft}
											/>
										);
									})
									: <NoData />
							}
						</section>
					</div>
				)}
		</GeneralPageWrapper>
	);
}
