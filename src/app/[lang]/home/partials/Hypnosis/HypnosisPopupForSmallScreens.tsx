/* eslint-disable max-len */

'use client';

import { useLocaleProvider } from '@/app/components/providers/LocaleProvider';
import { calculateDir } from '@/app/util/RtlUtils';
import { Dialog, Transition } from '@headlessui/react';
import { useTranslations } from 'next-intl';
import React, { Fragment } from 'react';

interface HypnosisPopupForSmallScreensProps {
	isOpen: boolean;
	handleCloseModal: ()=>void;
	title: string;
	description: string;

}
export default function HypnosisPopupForSmallScreens({
	isOpen, handleCloseModal, title, description,
}:HypnosisPopupForSmallScreensProps) {
	const { locale } = useLocaleProvider();
	const t = useTranslations();
	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog as="div" className="relative z-10" onClose={() => { handleCloseModal(); }}>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-black bg-opacity-25" />
				</Transition.Child>

				<div className="fixed inset-0 overflow-y-auto">
					<div className="flex min-h-full items-center justify-center p-4 text-center" dir={calculateDir(locale)}>
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
								<Dialog.Title
									as="h3"
									className="text-3xl leading-6 text-gray-900 text-center"
								>
									{title}
								</Dialog.Title>
								<div className="mt-2">
									<p className="text-lg text-gray-500">
										{description}
									</p>
								</div>

								<div className="mt-4 text-center">
									<button
										type="button"
										className="btn btn-wide"
										onClick={() => { handleCloseModal(); }}
									>
										{t('hide')}
									</button>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
}
