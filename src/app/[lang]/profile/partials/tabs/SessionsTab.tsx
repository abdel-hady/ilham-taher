import NoData from '@/app/components/fail/NoData';
import { useProfilePageProvider } from '@/app/components/providers/ProfilePageProvider';
import DateParser from '@/app/util/DateParser';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import React from 'react';

export default function SessionsTab() {
	const { userSessions } = useProfilePageProvider();
	const t = useTranslations();


	if (userSessions.length <= 0) {
		return (
			<div className="w-full min-h[300px] p-10">
				<NoData text={t('no_data')} />
			</div>
		);
	}

	return (
		<div className="w-full px-0 lg:px-10 mt-8">
			<div className="overflow-x-auto">
				<table className="table rounded-xl border-separate border-spacing-1 text-center">
					<thead>
						<tr className="">
							<th className=" bg-greenish text-white text-2xl">{t('session_title')}</th>
							<th className=" bg-greenish text-white text-2xl">{t('time')}</th>
							<th className=" bg-greenish text-white text-2xl">{t('date')}</th>
							<th className=" bg-greenish text-white text-2xl">{t('link')}</th>
						</tr>
					</thead>
					<tbody>
						{
							userSessions.map((row) => (
								<tr key={row.id} className="rounded-xl">
									<td className=" bg-golden text-xl">{row.session.name}</td>
									<td className="bg-golden text-xl flex gap-2 justify-center" dir="ltr">
										<span className="uppercase">{DateParser.toTime(row.startTime)}</span>
										<span>to</span>
										<span className="uppercase">{DateParser.toTime(row.endTime)}</span>
									</td>
									<td className="bg-golden text-xl" dir="ltr">{`${DateParser.toDayMonthYear(row.startTime)}`}</td>
									<td className=" bg-golden text-xl text-blue-700">
										<div dir="ltr" className="hover:scale-110 transform duration-200 flex gap-2 justify-center">

											<span><FontAwesomeIcon icon={faLink} /></span>
											<Link target="_blank" href={row.locationJoinUrl}>{t('link')}</Link>
										</div>
									</td>
								</tr>
							))
						}
					</tbody>
				</table>
			</div>
		</div>
	);
}
