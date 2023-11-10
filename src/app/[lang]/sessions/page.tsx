'use client';

import GeneralPageWrapper from '@/app/components/GeneralPageWrapper';
import React, { useEffect, useState } from 'react';
import SessionWideCard from '@/app/components/sessions/SessionWideCard';
import SessionsService from '@/app/lib/services/SessionsService';
import NoData from '@/app/components/fail/NoData';
import SearchBox from '@/app/components/search-box';
import { Session } from '@/app/util/types/remote-types';

export default function SessionsPage({ params: { lang } }: { params: { lang: string } }) {
	const [sessions, setSessions] = useState<Session[]>([]);
	const [isFetching, setIsFetching] = useState<boolean>(true);
	useEffect(() => {
		async function fetchInitalSessions() {
			setIsFetching(true);
			const fetchedSessions = await SessionsService.getPaginationSession(lang);
			setSessions(fetchedSessions.items);
			setIsFetching(false);
		}
		fetchInitalSessions();
	}, []);

	const handleSearch = (keyword: string) => {
		setIsFetching(true);
		SessionsService.getPaginationSession(lang, { search: keyword })
			.then((data) => {
				setSessions(data.items);
				setIsFetching(false);
			});
	};

	return (
		<GeneralPageWrapper>
			<SearchBox handleSearch={handleSearch} />

			{
				isFetching
				&& (
					<div className="w-full min-h-[200px] flex justify-center items-center text-golden">
						<span className="loading loading-lg loading-spinner" />
					</div>
				)
			}
			{
				!isFetching
				&& (

					<section dir="ltr" className="grid grid-cols-1 gap-10 min-h-[500px] bg-white">
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
				)
			}
		</GeneralPageWrapper>
	);
}
