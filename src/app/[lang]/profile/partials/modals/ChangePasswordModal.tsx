'use client';

import React, { useState } from 'react';
import { Resolver, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import GeneralModal from '@/app/components/common/modals/GeneralModal';
import { useTranslations } from 'next-intl';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import TextField from '@/app/components/input/ControlledTextField';
import UsersService from '@/app/lib/services/UsersService';
import { ArrayErrorMessageError } from '@/app/util/types/local-types';
import ErrorAlert from '@/app/components/error-alert';
import { useLocaleProvider } from '@/app/components/providers/LocaleProvider';


interface IForm {
	currentPassword: string,
	password:string,
	confirmPassword:string
}

function createSchema(t:any) {
	const changePasswordValidationSchema = yup.object().shape({
		currentPassword: yup.string().required(t('current_password_is_required')).min(8, t('password_must_be_at_least_8_characters')),
		password: yup.string().required(t('new_password_is_required')).min(8, t('password_must_be_at_least_8_characters')),
		confirmPassword: yup.string().required(t('confirm_password_is_required')).oneOf([yup.ref('password')], t('passwords_must_match')),
	});
	return changePasswordValidationSchema;
}

export default function ChangePasswordModal(
	{ isOpen, closeModal }: { isOpen: boolean, closeModal: ()=>void },
) {
	const t = useTranslations();
	const schema = createSchema(t);
	const { register, handleSubmit, formState: { errors } } = useForm<IForm>({
		resolver: yupResolver(schema) as Resolver<IForm>,
	});
	const [backErrors, setBackErrors] = useState('');
	const { locale } = useLocaleProvider();
	const [isLoading, setIsLoading] = useState<boolean>(false);


	const onSubmit = (data: IForm) => {
		const { currentPassword, password, confirmPassword } = data;
		setIsLoading(true);
		// PostFormData(AUTH_URLS.changePassword, dataToSend, onSuccess, onError);
		UsersService.changePassword(currentPassword, password, confirmPassword, locale)
			.then(() => {
				toast.success(t('password_changed_successfully'), { position: 'top-right' });
				closeModal();
			})
			.catch((e:ArrayErrorMessageError) => {
				if (e.errorMessages.length !== 0) setBackErrors(e.errorMessages[0]);
				setIsLoading(false);
			});
	};

	return (
		<GeneralModal
			title={t('change_password')}
			description=""
			isOpen={isOpen}
			closeModal={closeModal}
			hideText={t('hide')}
			actionProps={{
				actionText: t('submit'),
				actionCb: handleSubmit(onSubmit),
				actionSubmit: true,

			}}
			isBtnLoading={isLoading}
		>
			<form className="flex flex-col gap-5 pt-5" onSubmit={handleSubmit(onSubmit)}>
				<div className="flex gap-5">
					<TextField
						label={t('current_password')}
						placeholder={t('current_password')}
						name="currentPassword"
						type="password"
						register={register}
						errors={errors}
					/>
				</div>
				<div className="flex gap-5">
					<TextField
						label={t('new_password')}
						placeholder={t('new_password')}
						name="password"
						type="password"
						register={register}
						errors={errors}
					/>
				</div>
				<div className="flex gap-5">
					<TextField
						label={t('confirm_password')}
						placeholder={t('confirm_password')}
						name="confirmPassword"
						type="password"
						register={register}
						errors={errors}
					/>
				</div>
				{backErrors.length !== 0 ? (<ErrorAlert duplicatedEntry={false} errorMessage={backErrors} />) : ''}
			</form>
		</GeneralModal>
	);
}
