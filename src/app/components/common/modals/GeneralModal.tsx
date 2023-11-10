'use client';

import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';
import { calculateDir } from '@/app/util/RtlUtils';
import Link from 'next/link';
import { useLocaleProvider } from '../../providers/LocaleProvider';


interface ActionProps {
	actionText: string;
	actionCb?: ()=>void;
	href?: string;
	actionSubmit:boolean;
}

interface GeneralModalProps {
	hideText?: string;
	title:string;
	description: string;
	children?: React.ReactNode;
	isOpen: boolean;
	closeModal: ()=>void;
	actionProps?: ActionProps | null;
	isBtnLoading?:boolean;
}

export default function GeneralModal({
	hideText = 'hide', title,
	description, children, closeModal,
	isOpen, actionProps = null, isBtnLoading = false,
}: GeneralModalProps) {
	const { locale } = useLocaleProvider();

	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog as="div" className="relative z-[1000]" dir={calculateDir(locale)} onClose={closeModal}>
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
					<div className="flex min-h-full items-center justify-center p-4 text-center">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<Dialog.Panel className="
                                w-full max-w-md transform overflow-hidden rounded-2xl
                                 bg-white p-6 text-left align-middle shadow-xl transition-all
                                 flex flex-col gap-4
                                "
							>
								<Dialog.Title
									as="h3"
									className="text-xl text-greenish text-center font-bold"
								>
									{title}
								</Dialog.Title>
								<hr />
								<Dialog.Description
									className="p-4 text-center text-greenish text-lg"
								>

									{description}
								</Dialog.Description>

								{
									children
								}

								<hr />
								<div className="w-full flex justify-between">
									<button
										type="button"
										className="btn text-greenish focus:outline-none focus-visible:outline-none"
										onClick={closeModal}
									>
										{hideText}
									</button>
									{ actionProps && actionProps.href && (
										<Link
											className="btn bg-golden text-white hover:text-greenish focus:outline-none focus-visible:outline-none"
											href={actionProps.href}
										>
											{actionProps.actionText}
										</Link>
									)}
									{
										actionProps && !actionProps.href && (
											<button
												type="button"
												disabled={isBtnLoading}
												className="btn bg-golden text-white hover:text-greenish focus:outline-none focus-visible:outline-none"
												onClick={() => {
													if (actionProps.actionCb) {
														actionProps.actionCb();
													} if (actionProps.actionSubmit === false) {
														closeModal();
													}
												}}
											>
												{isBtnLoading ? <span className="loading loading-spinner" /> : actionProps.actionText }
											</button>
										)
									}
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
}
