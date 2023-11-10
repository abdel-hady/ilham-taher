import FileUploaderField from '@/app/components/input/FileUploaderField';
// import { Dialog, Transition } from '@headlessui/react';
// import React, { Fragment } from 'react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import GeneralModal from '@/app/components/common/modals/GeneralModal';
import { useTranslations } from 'next-intl';
import UsersService from '@/app/lib/services/UsersService';
import { useLocaleProvider } from '@/app/components/providers/LocaleProvider';
import ErrorAlert from '@/app/components/error-alert';

interface IForm {
	avatar: FileList
}
let avatarLength:any = null;

export default function EditProfileImageModal(
	{ isOpen, closeModal }: { isOpen: boolean, closeModal: ()=>void },
) {
	const t = useTranslations();
	const { locale } = useLocaleProvider();
	const { register, handleSubmit, formState: { errors } } = useForm<IForm>({
	});

	const [isLoading, setIsLoading] = useState<boolean>(false);

	const onSubmit = (data: IForm) => {
		setIsLoading(true);
		const { avatar } = data;
		avatarLength = avatar.length;
		if (avatar.length > 0) {
			UsersService.editAvatar(avatar.item(0), locale).then(() => {
				toast.success(t('image_changed_successfully'), { position: 'top-right' });
				closeModal();
				setTimeout(() => {
					window.location.reload();
				}, 500);
			}).catch(() => {
				setIsLoading(false);
			});
		} else {
			setIsLoading(false);
			// console.log('no image assigned');
		}
	};

	return (
		<GeneralModal
			title={t('edit_profile_image')}
			description={t('upload_an_image')}
			isOpen={isOpen}
			closeModal={closeModal}
			hideText={t('hide')}
			actionProps={{
				actionText: t('update'),
				actionCb: handleSubmit(onSubmit),
				actionSubmit: true,
			}}
			isBtnLoading={isLoading}
		>
			<form onSubmit={handleSubmit(onSubmit)}>
				<FileUploaderField register={register} errors={errors} name="avatar" label={t('profile_image')} />
			</form>
			{ avatarLength === 0 ? (<ErrorAlert duplicatedEntry={false} errorMessage={t('file_is_required')} />) : ''}
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
		// 					<Dialog.Panel className="w-full max-w-md transform overflow-hidden
		// 					rounded-2xl bg-white p-6 text-left align-middle shadow-xl
		// 					transition-all">
		// 						<Dialog.Title
		// 							as="h3"
		// 							className="text-lg font-medium leading-6 text-gray-900"
		// 						>
		// 							Edit Profile Image
		// 						</Dialog.Title>
		// 						<div className="mt-2">
		// 							<p className="text-sm text-gray-500">
		// 								upload an image
		// 							</p>
		//
		// 							<form onSubmit={handleSubmit(onSubmit)}>
		// 								<FileUploaderField register={register}
		// 								errors={errors} name="avatar" label="Profile Image" />
		//
		// 								<div className="w-full flex justify-between mt-5">
		// 									<button
		// 										type="button"
		// 										className="btn"
		// 										onClick={closeModal}
		// 									>
		// 										hide
		// 									</button>
		//
		// 									<button
		// 										type="submit"
		// 										className="btn btn-primary"
		// 									>
		// 										update
		// 									</button>
		// 								</div>
		// 							</form>
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
