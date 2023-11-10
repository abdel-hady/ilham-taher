'use client';

import GeneralPageWrapper from '@/app/components/GeneralPageWrapper';
import StandardBtn from '@/app/components/common/StandardBtn';
import TextField from '@/app/components/input/ControlledTextField';
import React, { useState } from 'react';
import { Resolver, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/app/components/providers/AuthProvider';
import { useLocaleProvider } from '@/app/components/providers/LocaleProvider';
import { redirect } from 'next/navigation';
import UsersService from '@/app/lib/services/UsersService';
import { ArrayErrorMessageError } from '@/app/util/types/local-types';
import ErrorAlert from '@/app/components/error-alert';

interface IForm {
	email: string,
}
function createSchema(t:any) {
	const validationSchema = yup.object().shape({
		email: yup.string().email(t('invalid_email_address')).required(t('email_is_required')),
	});
	return validationSchema;
}

export default function ForgotPassword() {
	const t = useTranslations();
	const schema = createSchema(t);
	const { register, formState: { errors }, handleSubmit } = useForm<IForm>({
		resolver: yupResolver(schema) as Resolver<IForm>,
	});
	const { isLoggedIn } = useAuth();
	const { makeLocaleUrl, locale } = useLocaleProvider();

	const [isLoading, setIsLoading] = useState<boolean>(false);
	if (isLoggedIn()) {
		redirect(makeLocaleUrl('/home'));
	}

	const [isSent, setIsSent] = useState<boolean>(false);
	const [backErrors, setBackErrors] = useState('');


	const onSubmit = (data: IForm) => {
		setIsLoading(true);

		UsersService.forgotPassword(data.email, locale)
			.then(() => {
				toast.success(t('please_check_your_email'), { position: 'top-right' });
				setIsSent(true);
			})
			.catch((e:ArrayErrorMessageError) => {
				if (e.errorMessages.length !== 0) setBackErrors(e.errorMessages[0]);
				setIsLoading(false);
			});
	};
	return (
		<GeneralPageWrapper>
			<div className="
				shadow-lg bg-white rounded-lg p-10
				 border-2 border-gray-200
				 pb-20
				  flex flex-col items-center justify-center gap-8
				  "
			>
				<h1 className="text-4xl text-greenish">{t('forgot_password_page')}</h1>

				<p className="w-375px sm:w-[450px] text-greenish">
					{t('forgot_password_description')}
				</p>

				<form
					className="
					w-full
				 	flex flex-col gap-5
					max-w-[450px]
				 	"
					onSubmit={handleSubmit(onSubmit)}
				>

					<TextField
						label={t('email')}
						placeholder="example@email.com"
						name="email"
						type="email"
						register={register}
						errors={errors}
					/>
					{ backErrors.length !== 0 ? (<ErrorAlert duplicatedEntry={false} errorMessage={backErrors} />) : ''}

					{!isSent
						? (
							<div className="flex items-center justify-between">
								<StandardBtn
									isLoading={isLoading}
									text={t('reset_password')}
									buttonType="submit"
								/>
							</div>
						)
						: (
							<div className="flex items-center justify-between">
								<p className="text-lg text-center text-golden w-full">
									{t('check_you_email_msg')}
								</p>
							</div>
						)}
				</form>
			</div>
		</GeneralPageWrapper>
	);
}
