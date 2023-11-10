'use client';

import GeneralPageWrapper from '@/app/components/GeneralPageWrapper';
import EaseInFromLeft from '@/app/components/animation/EaseInFromLeft';
import EaseInFromRight from '@/app/components/animation/EaseInFromRight';
import TextField from '@/app/components/input/ControlledTextField';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { Resolver, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import StandardBtn from '@/app/components/common/StandardBtn';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslations } from 'next-intl';
import { useLocaleProvider } from '@/app/components/providers/LocaleProvider';
import { calculateDir } from '@/app/util/RtlUtils';
import { useAuth } from '@/app/components/providers/AuthProvider';
import { redirect } from 'next/navigation';
import UsersService from '@/app/lib/services/UsersService';
import { ArrayErrorMessageError, GeneralPageProp } from '@/app/util/types/local-types';
import * as yup from 'yup';

interface IForm {
	email: string;
	password: string;
}
function createSchema(t:any) {
	const validationSchema = yup.object().shape({
		email: yup.string().required(t('email_is_required')),
		password: yup.string().required(t('password_is_required')),
	});
	return validationSchema;
}

// Define a validation schema using yup

export default function Login({ params: { lang } }: GeneralPageProp) {
	const t = useTranslations();
	const { locale, makeLocaleUrl } = useLocaleProvider();
	const { isLoggedIn } = useAuth();
	const schema = createSchema(t);

	if (isLoggedIn()) {
		redirect(makeLocaleUrl('/home'));
	}

	const [isLoading, setIsLoading] = useState<boolean>(false);

	const { register, formState: { errors }, handleSubmit } = useForm<IForm>({
		resolver: yupResolver(schema) as Resolver<IForm>,
	});
	const [backErrors, setBackErrors] = useState('');

	const onSubmit = (data: IForm) => {
		const { email, password } = data;

		setIsLoading(true);

		UsersService.login(email, password, locale).then((res: any) => {
			if (res != null) {
				const { token } = res;
				Cookies.set('token', token, { expires: 7 });
			}
			toast.success(t('logged_in_successfully'), { position: 'top-right' });
			window.location.href = makeLocaleUrl('/home');
		}).catch((e: ArrayErrorMessageError) => {
			if (e.errorMessages.length !== 0) {
				setBackErrors(t('wrong_credentials'));
			}
			setIsLoading(false);
			// toast.error(t('wrong_credentials'), { position: 'top-right' });
		});
	};
	return (
		<GeneralPageWrapper>
			<div className=" shadow-lg bg-white rounded-lg p-10 grid grid-cols-1 md:grid-cols-2 gap-5 border-2 border-gray-200">
				<EaseInFromLeft className="flex justify-center" parentInView>
					<Image
						src="/assets/images/auth-img.jpg"
						width="1000"
						height="1000"
						alt="welcome page cover image"
						className="w-full md:w-2/3 object-cover rounded-lg"
						style={{ maxWidth: '450px' }}
					/>
				</EaseInFromLeft>

				<EaseInFromRight className="flex items-center" parentInView>
					<form
						dir={calculateDir(locale)}
						className="w-full xl:w-2/3 flex flex-col gap-5"
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
						<TextField
							label={t('password')}
							placeholder="*******"
							name="password"
							type="password"
							register={register}
							errors={errors}
						/>
						{backErrors.length !== 0 ? (
							<div
								className={
									lang === 'ar'
										? 'bg-red-100 border-r-4 border-red-500 text-red-700 p-4 '
										: 'bg-red-100 border-l-4 border-red-500 text-red-700 p-4 '
								}
								role="alert"
							>
								<p className="font-bold">{t('errors')}</p>
								<p>{backErrors}</p>
							</div>
						) : (
							''
						)}

						<div className="flex items-center justify-between flex-col gap-2 lg:gap-0 lg:flex-row">
							<StandardBtn
								isLoading={isLoading}
								wide
								text={t('login')}
								buttonType="submit"
							/>
							<Link
								href={`/${locale}/auth/forgot-password`}
								className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
							>
								<p>
									{t('forgot_password')}
									{calculateDir(locale) === 'ltr' ? '?' : '؟'}
								</p>
							</Link>
						</div>
						<div>
							<p>
								{t('dont_have_an_account')}
								{calculateDir(locale) === 'ltr' ? '?' : '؟'}
							</p>
							<Link
								href={`/${locale}/auth/register`}
								className="inline-block align-baseline font-bold text-sm text-gray-500 hover:text-gray-800"
							>
								{t('register_now')}
							</Link>
						</div>
					</form>
				</EaseInFromRight>
			</div>
		</GeneralPageWrapper>
	);
}
