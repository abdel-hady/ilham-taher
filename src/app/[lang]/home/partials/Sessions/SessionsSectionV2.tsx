import SectionTitle from '@/app/components/common/SectionTitle';
import SessionWideCard from '@/app/components/sessions/SessionWideCard';
import { Session } from '@/app/util/types/remote-types';
import React from 'react';

interface SessionsSectionV2Props {
	title: string;
	sessionsList: Session[];
}

export default function SessionsSectionV2({ title, sessionsList }: SessionsSectionV2Props) {
	const sessions = sessionsList.map(
		(session, index) => ({
			...session,
			imgOnLeft: index % 2 === 0,
		}),
	);
	return (
		<section dir="ltr" className="w-full text-greenish flex flex-col gap-5">
			<SectionTitle title={title} />
			{sessions.map((session, index) => {
				const isOnLeft = (index % 2 === 0);
				return (
					<SessionWideCard
						key={session.id}
						session={session}
						imgOnLeft={isOnLeft}
					/>
				);
			})}
		</section>
	);
}
