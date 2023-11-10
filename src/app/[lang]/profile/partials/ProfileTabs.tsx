'use client';

import React, { useState } from 'react';
import { Tab } from '@headlessui/react';
import { useTranslations } from 'next-intl';
import ShowModal from '@/app/[lang]/profile/partials/modals/showModal';
import MyInfoTab from './tabs/UserInformationTab';
import CoursesTab from './tabs/CoursesTab';
import SessionsTab from './tabs/SessionsTab';

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(' ');
}

type Tap = 'my_info' | 'courses' | 'sessions';

export default function ProfileTabs() {
	const taps: Tap[] = ['my_info', 'sessions', 'courses'];
	const [activeTab, setActiveTab] = useState<Tap>('my_info');

	const t = useTranslations();


	return (
		<>
			<div className="w-full">
				<Tab.Group>
					<Tab.List className="flex border-b-4 border-golden">
						{taps.map((tap) => (
							<Tab
								key={tap}
								className={({ selected }) => classNames(
									'w-full text-2xl font-medium leading-5 py-4',
									'focus:outline-none',
									'text-greenish',
									selected
										? ' bg-gray-100 rounded-lg outline-none border-node font-bold'
										: ' hover:bg-gray-50',
								)}
								onClick={() => setActiveTab(tap)}
							>
								{t(tap)}
							</Tab>
						))}
					</Tab.List>

					<Tab.Panels className="mt-2">
						<Tab.Panel
							className={classNames(
								'rounded-6xl',
								'focus:outline-none',
							)}
						>
							{activeTab === 'my_info' && <MyInfoTab />}
						</Tab.Panel>
						<Tab.Panel
							className={classNames(
								'rounded-6xl',
								'focus:outline-none',
							)}
						>
							{activeTab === 'sessions' && <SessionsTab />}
						</Tab.Panel>
						<Tab.Panel
							className={classNames(
								'rounded-6xl',
								'focus:outline-none',
							)}
						>
							{activeTab === 'courses' && <CoursesTab />}
						</Tab.Panel>
					</Tab.Panels>
				</Tab.Group>
			</div>
			<ShowModal title="thank_you_for_registering" description="please_complete_profile_info" param="registered" />

		</>
	);
}
