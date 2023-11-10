'use client';

import GeneralPageWrapper from '@/app/components/GeneralPageWrapper';
import StandardBtn from '@/app/components/common/StandardBtn';
import TextField from '@/app/components/input/ControlledTextField';
import React, { useState } from 'react';
import { Resolver, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { redirect } from 'next/navigation';
import { useAuth } from '@/app/components/providers/AuthProvider';
import { useLocaleProvider } from '@/app/components/providers/LocaleProvider';
import { useTranslations } from 'next-intl';
import UsersService from '@/app/lib/services/UsersService';

interface IForm {
	token: string;
	password: string;
	confirmPassword: string;
}
function createSchema(t:any) {
	const validationSchema = yup.object().shape({
		token: yup.string(),
		password: yup.string().required(t('password_is_required')).min(8, t('password_must_be_at_least_8_characters')),
		confirmPassword: yup.string().required(t('confirm_password_is_required')).oneOf([yup.ref('password')], t('passwords_must_match')),
	});
	return validationSchema;
}

export default function ResetPasswordPage({ searchParams }:{ searchParams: { token: string } }) {
	const t = useTranslations();
	const { isLoggedIn } = useAuth();
	const { makeLocaleUrl, locale } = useLocaleProvider();
	const [isLoading, setIsLoading] = useState<boolean>(false);

	if (!searchParams.token) {
		redirect('/auth/forgot-password');
	}
	if (isLoggedIn()) {
		redirect(makeLocaleUrl('/home'));
	}
	const schema = createSchema(t);

	const { register, formState: { errors }, handleSubmit } = useForm<IForm>({
		resolver: yupResolver(schema)	as Resolver<IForm>,
		defaultValues: {
			token: searchParams.token || '',
			password: '',
			confirmPassword: '',
		},
	});


	const onSubmit = (data: IForm) => {
		setIsLoading(true);


		const { password, confirmPassword, token } = data;

		UsersService.resetPassword(password, confirmPassword, token, locale).then(() => {
			toast.success(t('password_reset_successfully'), { position: 'top-right' });
			window.location.href = makeLocaleUrl('profile');
		}).catch(() => {
			setIsLoading(false);
			toast.error(t('something_went_wrong'), { position: 'top-right' });
		});
	};


	return (
		<GeneralPageWrapper>
			<div className="
				shadow-lg bg-white rounded-lg p-10
				border-2 border-gray-200
				mx-2
				flex flex-col items-center justify-center gap-8
				h-[60vh]
				"
			>
				<h1 className="text-4xl text-greenish text-center">{t('reset_password-page')}</h1>

				<form
					className="
					w-full
				 	flex flex-col gap-5
					max-w-[450px]
				 	"
					onSubmit={handleSubmit(onSubmit)}
				>

					<TextField
						label={t('password')}
						placeholder=""
						name="password"
						type="password"
						register={register}
						errors={errors}
					/>
					<TextField
						label={t('confirm_password')}
						placeholder=""
						name="confirmPassword"
						type="password"
						register={register}
						errors={errors}
					/>

					<div className="flex items-center justify-between">
						<StandardBtn
							isLoading={isLoading}
							text={t('reset_password')}
							buttonType="submit"
						/>
					</div>
				</form>
			</div>
		</GeneralPageWrapper>
	);
}
