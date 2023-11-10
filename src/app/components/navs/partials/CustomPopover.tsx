import { Popover, Transition } from '@headlessui/react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import React, { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faChevronDown,
} from '@fortawesome/free-solid-svg-icons';

type CustomPopoverProps = {
	titleKey: 'home' | 'courses' | 'sessions' | 'about_us' | 'blogs' | 'our_services';
	link?: string;
	isActive: boolean;
	list: { title: string, link: string }[];
};
export default function CustomPopover({
	titleKey, link = '', isActive, list,
}: CustomPopoverProps) {
	const t = useTranslations();

	return (
		<div className={
			`
            w-full h-full
            border-dark-gold
			transform duration-100
            hover:bg-gray-50 hover:border-b-2 hover:text-dark-gold
                ${isActive ? 'border-b-2 text-dark-gold font-bold' : ''}
            `
		}
		>
			<Popover className="relative h-full">
				{({ open, close }) => (
					<>
						<Popover.Button
							className={`
                                   ${open ? 'text-dark-gold' : ''}
                                   w-full flex justify-center items-center gap-3 focus:outline-none
                                   h-full
								   text-xl
								   ${isActive ? 'text-dark-gold' : 'text-greenish'}
								   hover:text-dark-gold
                                `}
							onBlur={() => { close(); }}
						>
							{list.length > 0 ? (
								<>
									<span>{t(titleKey)}</span>

									<FontAwesomeIcon icon={faChevronDown} size="sm" />
								</>
							) : (
								<Link
									href={link}
									className="w-full h-full flex items-center justify-center "
								>
									<span>{t(titleKey)}</span>
								</Link>
							)}
						</Popover.Button>
						{list.length > 0 && (
							<Transition
								as={Fragment}
								enter="transition ease-out duration-200"
								enterFrom="opacity-0 translate-y-1"
								enterTo="opacity-100 translate-y-0"
								leave="transition ease-in duration-150"
								leaveFrom="opacity-100 translate-y-0"
								leaveTo="opacity-0 translate-y-1"
							>
								<Popover.Panel className="absolute z-50 w-96 transform-cpu">
									<div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
										<div className="relative bg-white p-5">
											{list.map((item) => (
												<a
													key={item.title}
													href={item.link}
													className="
														w-full
                                                        flex items-center p-3 rounded-md px-5
                                                        transition duration-150 ease-in-out
                                                        hover:bg-golden
                                                        focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50
                                                    "
												>
													<p className="w-full text-base text-greenish">
														{item.title}
													</p>
												</a>
											))}
											{link !== '' && (
												<a
													href={link}
													className="
														w-full
                                                        flex items-center p-3 rounded-md px-5
                                                        transition duration-150 ease-in-out
                                                        hover:bg-golden
                                                        focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50
                                                    "
												>
													<p className="w-full text-base text-greenish">
														{t('view_all')}
													</p>
												</a>
											)}
										</div>
									</div>
								</Popover.Panel>
							</Transition>
						)}
					</>
				)}
			</Popover>
		</div>
	);
}
