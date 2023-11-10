// import { Dialog, Transition } from '@headlessui/react';
// import React, { Fragment } from 'react';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import GeneralModal from '@/app/components/common/modals/GeneralModal';
import { useTranslations } from 'next-intl';
import UsersService from '@/app/lib/services/UsersService';
import { useLocaleProvider } from '@/app/components/providers/LocaleProvider';
import { ArrayErrorMessageError } from '@/app/util/types/local-types';
import ErrorAlert from '@/app/components/error-alert';

export default function DeleteProfileImageModal(
	{ isOpen, closeModal }: { isOpen: boolean, closeModal: ()=>void },
) {
	const t = useTranslations();
	const { locale } = useLocaleProvider();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [backErrors, setBackErrors] = useState('');


	const handleDeleteClick = () => {
		setIsLoading(true);

		const avatar = '';
		UsersService.deleteAvatar(avatar, locale).then(() => {
			toast.success(t('image_deleted_successfully'), { position: 'top-right' });
			closeModal();
			setTimeout(() => {
				window.location.reload();
			}, 500);
		}).catch((e:ArrayErrorMessageError) => {
			if (e.errorMessages.length !== 0) setBackErrors(e.errorMessages[0]);
			setIsLoading(false);
		});
	};

	return (
		<GeneralModal
			title={t('delete_profile_image')}
			description={t('are_you_sure_you_want_to_delete_image')}
			isOpen={isOpen}
			closeModal={closeModal}
			hideText={t('hide')}
			actionProps={{
				actionText: t('delete'),
				actionCb: handleDeleteClick,
				actionSubmit: true,

			}}
			isBtnLoading={isLoading}
		>
			{ backErrors.length !== 0 ? (<ErrorAlert duplicatedEntry={false} errorMessage={backErrors} />) : ''}

		</GeneralModal>

	// <Transition appear show={isOpen} as={Fragment}>
	// 	<Dialog as="div" className="relative z-10" onClose={closeModal}>
	// 		<Transition.Child
	// 			as={Fragment}
	// 			enter="ease-out duration-300"
	// 			enterFrom="opacity-0"
	// 			enterTo="opacity-100"
	// 			leave="ease-in duration-200"
	// 			leaveFrom="opacity-100"
	// 			leaveTo="opacity-0"
	// 		>
	// 			<div className="fixed inset-0 bg-black bg-opacity-25" />
	// 		</Transition.Child>
	//
	// 		<div className="fixed inset-0 overflow-y-auto">
	// 			<div className="flex min-h-full items-center justify-center p-4 text-center">
	// 				<Transition.Child
	// 					as={Fragment}
	// 					enter="ease-out duration-300"
	// 					enterFrom="opacity-0 scale-95"
	// 					enterTo="opacity-100 scale-100"
	// 					leave="ease-in duration-200"
	// 					leaveFrom="opacity-100 scale-100"
	// 					leaveTo="opacity-0 scale-95"
	// 				>
	// 					<Dialog.Panel
	// 					className="w-full max-w-md transform
	// 					overflow-hidden rounded-2xl bg-white
	// 					p-6 text-left align-middle shadow-xl
	// 					transition-all">
	// 						<Dialog.Title
	// 							as="h3"
	// 							className="text-lg font-medium leading-6 text-gray-900"
	// 						>
	// 							Edit Profile Image
	// 						</Dialog.Title>
	// 						<div className="mt-2">
	// 							<p className="text-sm text-gray-500">
	// 								Are you sure you want to delete image
	// 							</p>
	//
	//
	// 							<div className="w-full flex justify-between mt-5">
	// 								<button
	// 									type="button"
	// 									className="btn"
	// 									onClick={closeModal}
	// 								>
	// 									hide
	// 								</button>
	//
	// 								<button
	// 									type="button"
	// 									className="btn btn-danger"
	// 									onClick={handleDeleteClick}
	// 								>
	// 									delete
	// 								</button>
	// 							</div>
	// 						</div>
	//
	// 					</Dialog.Panel>
	// 				</Transition.Child>
	// 			</div>
	// 		</div>
	// 	</Dialog>
	// </Transition>
	);
}
