/* eslint-disable jsx-a11y/anchor-is-valid */

'use client';

import { Menu, Transition } from '@headlessui/react';
import React, {
	Fragment,
} from 'react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOut, faUser } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie';
import parseImageUrl from '@/app/util/parseImageUrl';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useLocaleProvider } from '../../providers/LocaleProvider';
import { useAuth } from '../../providers/AuthProvider';

export default function ProfileDropdown() {
	const { makeLocaleUrl } = useLocaleProvider();
	const { getMiniUser } = useAuth();
	const t = useTranslations();

	const logoutLogic = () => {
		Cookies.remove('token');
		window.location.reload();
	};

	return (
		<Menu as="div" className="relative inline-block text-left h-full">
			<div>
				<Menu.Button className="
                    h-full
                    inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-4 py-1 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
				>
					<div className="flex items-center gap-3">
						<Image src={parseImageUrl(getMiniUser()?.avatar || '')} width="25" height="25" alt="English flag icon" className="rounded-full w-[25px] h-[25px] object-cover" />
						<span className="hidden md:inline-block">{getMiniUser()?.name || t('profile')}</span>
					</div>
					<ChevronDownIcon
						className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
						aria-hidden="true"
					/>
				</Menu.Button>
			</div>
			<Transition
				as={Fragment}
				enter="transition ease-out duration-100"
				enterFrom="transform opacity-0 scale-95"
				enterTo="transform opacity-100 scale-100"
				leave="transition ease-in duration-75"
				leaveFrom="transform opacity-100 scale-100"
				leaveTo="transform opacity-0 scale-95"
			>
				<Menu.Items className="absolute z-50 right-0 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
					<div className="px-1 py-1">
						<Menu.Item>
							{({ active }) => (
								<Link
									className={`${active ? 'bg-greenish bg-opacity-60 text-white' : 'text-greenish'} group flex w-full items-center gap-2 rounded-md px-4 py-3 text-sm`}
									href={makeLocaleUrl('profile')}
								>
									<span style={{ width: '30px' }}>
										<FontAwesomeIcon icon={faUser} size="lg" />
									</span>
									<span>{t('profile')}</span>
								</Link>
							)}
						</Menu.Item>

						<Menu.Item>
							{({ active }) => (
								<Link
									className={`${active ? 'bg-greenish bg-opacity-60 text-white' : 'text-greenish'} group flex w-full items-center gap-2 rounded-md px-4 py-3 text-sm`}
									onClick={logoutLogic}
									href="#"
								>
									<span style={{ width: '30px' }}>
										<FontAwesomeIcon icon={faSignOut} size="lg" />
									</span>
									<span>{t('logout')}</span>
								</Link>

							)}
						</Menu.Item>
					</div>
				</Menu.Items>
			</Transition>
		</Menu>
	);
}
