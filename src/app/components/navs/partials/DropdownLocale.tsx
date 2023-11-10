import { Menu, Transition } from '@headlessui/react';
import React, {
	Fragment,
} from 'react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import Image from 'next/image';
import { useLocaleProvider } from '../../providers/LocaleProvider';

export default function DropdownLocale() {
	const {
		setNewLocale, currentLocaleInfo, otherLocaleInfoList,
	} = useLocaleProvider();

	return (
		<Menu as="div" className="relative inline-block text-left">
			<div>
				<Menu.Button className="inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
					<div className="flex gap-3">
						{/* <Image src="https://cdn-icons-png.flaticon.com/512/197/197374.png" width="20" height="20" alt="English flag icon" />
						<span>English</span> */}
						<Image src={currentLocaleInfo.icon} width="20" height="20" alt="English flag icon" />
						<span className="hidden md:inline-block">{currentLocaleInfo.name}</span>
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
						{otherLocaleInfoList.map((obj) => (
							<Menu.Item key={obj.name}>
								{({ active }) => (
									<button
										className={`${active ? 'bg-greenish bg-opacity-60 text-white' : 'text-gray-900'} group flex w-full items-center gap-3 rounded-md px-2 py-2 text-sm`}
										type="button"
										onClick={() => { setNewLocale(obj.locale); }}
									>
										<Image src={obj.icon} width="25" height="25" alt="UAE flag icon" />

										<span>{obj.name}</span>
									</button>
								)}
							</Menu.Item>
						))}
					</div>
				</Menu.Items>
			</Transition>
		</Menu>
	);
}
