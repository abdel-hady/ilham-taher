import React from 'react';
import { Session } from '@/app/util/types/remote-types';
import VipSession from './VipSession';

interface VipSessionsSectionsProps {
	vipSessionsList: Session[];
}
export default function VipSessionsSections(
	{ vipSessionsList }:VipSessionsSectionsProps,
) {
	return (
		<>
			{vipSessionsList.map((session) => (
				<VipSession vipSession={session} />
			))}
		</>
	);
}
