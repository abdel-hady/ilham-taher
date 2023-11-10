'use client';

import StandardBtn from '@/app/components/common/StandardBtn';
import TextField from '@/app/components/input/ControlledTextField';
import DatePickerField from '@/app/components/input/DatePickerField';
import DropdownSelectionField from '@/app/components/input/DropdownSelectionField';
// import PostWithoutCache from '@/app/util/FetchWrapper/PostWithoutCache';
// import { AUTH_URLS } from '@/app/util/url';
import Cookies from 'js-cookie';
import Link from 'next/link';
import React, { useState } from 'react';
import { Resolver, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslations } from 'next-intl';
import { useLocaleProvider } from '@/app/components/providers/LocaleProvider';
import { Option } from '@/app/components/input/data';
import { Country } from '@/app/util/types/remote-types';
import { calculateDir } from '@/app/util/RtlUtils';
import ControlledPhoneNumberField from '@/app/components/input/ControlledPhoneNumberField';
import ControlledCheckboxField from '@/app/components/input/ControlledCheckboxField';
import UsersService from '@/app/lib/services/UsersService';
import { ArrayErrorMessageError } from '@/app/util/types/local-types';
import ErrorAlert from '@/app/components/error-alert';
import useCountryCode from './useCountryCode';

interface IForm {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	phoneNumber: string;
	dateOfBirth: string;
	gender: string;
	country: number;
	subscribeNewsletter: boolean | undefined;
}


interface RegisterFormProps {
	genderOptions: Option[];
	countries: Country[];
}
function createSchema(t:any) {
	const validationSchema = yup.object().shape({
		firstName: yup.string().required(t('first_name_is_required')),
		lastName: yup.string().required(t('last_name_is_required')),
		email: yup.string().email(t('invalid_email_address')).required(t('email_is_required')),
		password: yup.string().min(8, t('password_must_be_at_least_8_characters')).required(('password_is_required')),
		phoneNumber: yup.string().required(t('phone_number_is_required')),
		dateOfBirth: yup.string().required(t('Date of birth is required')),
		gender: yup.string().required(t('gender_is_required')),
		country: yup.number().required(t('country_is_required')),
		subscribeNewsletter: yup.boolean(),
	});
	return validationSchema;
}

export default function RegisterForm({ genderOptions, countries }: RegisterFormProps) {
	const t = useTranslations();
	const { makeLocaleUrl, locale } = useLocaleProvider();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [backErrors, setBackErrors] = useState('');
	const [errorMessage, setErrorMessage] = useState('');


	const schema = createSchema(t);


	const {
		register, formState: { errors }, handleSubmit, watch,
	} = useForm<IForm>({
		resolver: yupResolver(schema) as Resolver<IForm>,
	});

	const selectedCountryValue = watch('country');

	const { selectedCountryCode } = useCountryCode({
		selectedCountryValue,
		countries,
	});

	const countryOptions = countries.map((country) => ({
		value: country.id,
		label: country.name,
	}));

	const onSubmit = (data: IForm) => {
		setIsLoading(true);
		setErrorMessage('');

		UsersService.register(
			data.firstName,
			data.lastName,
			data.email,
			data.password,
			selectedCountryCode + data.phoneNumber,
			data.dateOfBirth,
			data.gender,
			data.country,
			data.subscribeNewsletter ?? false,
			locale,
		).then((res: any) => {
			if (res != null) {
				const { token } = res;
				Cookies.set('token', token, { expires: 7 });
			}
			toast.success(t('registered_and_logged_in'), { position: 'top-right' });
			window.location.href = makeLocaleUrl('profile?registered=1');
		}).catch((e: ArrayErrorMessageError) => {
			// toast.error(t('something_went_wrong'), { position: 'top-right' });
			if (e.errorMessages.length !== 0) {
				const dep = e.errorMessages[0].substring(
					e.errorMessages[0].indexOf("'") + 1,
					e.errorMessages[0].lastIndexOf("'"),
				);
				setBackErrors(dep);
			}
			if (e.message === 'Bad Request') {
				setErrorMessage(e.message);
				setBackErrors(e.errorMessages[0]);
			}

			setIsLoading(false);
		});
	};
	let ERROR_COMPONENT = null;

	if (backErrors.length !== 0) {
		if (errorMessage === 'Bad Request') {
			ERROR_COMPONENT = <ErrorAlert duplicatedEntry={false} errorMessage={backErrors} />;
		} else {
			ERROR_COMPONENT = <ErrorAlert duplicatedEntry errorMessage={backErrors} />;
		}
	}


	return (
		<form dir={calculateDir(locale)} className=" flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
			<div className="w-full flex flex-col gap-5">

				{/* Name */}
				<div className="flex gap-5 flex-col sm:flex-row">
					<TextField
						label={t('first_name')}
						placeholder={t('first_name')}
						name="firstName"
						type="text"
						register={register}
						errors={errors}
					/>
					<TextField
						label={t('last_name')}
						placeholder={t('last_name')}
						name="lastName"
						type="text"
						register={register}
						errors={errors}
					/>

				</div>
				{/* Gender and Date */}
				<div className="flex gap-5">
					<DropdownSelectionField
						name="country"
						label={t('country')}
						errors={errors}
						register={register}
						options={countryOptions}
					/>
				</div>


				{/* Gender and Date */}
				<div className="flex gap-5 flex-col sm:flex-row">
					<DropdownSelectionField
						name="gender"
						label={t('gender')}
						errors={errors}
						register={register}
						options={genderOptions}
					/>
					<DatePickerField
						name="dateOfBirth"
						errors={errors}
						register={register}
						label={t('date_of_birth')}
					/>
				</div>

				{/* contact  */}
				<div className="flex gap-5 flex-col sm:flex-row">
					<TextField
						label={t('email')}
						placeholder="example@email.com"
						name="email"
						type="text"
						register={register}
						errors={errors}
					/>

					<ControlledPhoneNumberField
						label={t('phone_number')}
						placeholder="0 999 333 444"
						name="phoneNumber"
						register={register}
						errors={errors}
						phoneNumberCode={selectedCountryCode}
					/>

				</div>

				{/* Password */}
				<div className="flex gap-5 flex-col sm:flex-row">
					<TextField
						label={t('password')}
						placeholder="********"
						name="password"
						type="password"
						register={register}
						errors={errors}
					/>
					<TextField
						label={t('password_confirmation')}
						placeholder="********"
						name="passwordConfirmation"
						type="password"
						register={register}
						errors={errors}
					/>
				</div>
				<div className="flex gap-5 flex-col sm:flex-row">
					<ControlledCheckboxField
						label={t('news_letter_confirmation')}
						name="subscribeNewsletter"
						register={register}
						errors={errors}
					/>
					<div />
				</div>
			</div>

			{ERROR_COMPONENT}

			<div className="flex items-center justify-between">

				<StandardBtn text={t('register')} buttonType="submit" isLoading={isLoading} />
			</div>
			<div>
				<p>
					{t('already_have_an_account')}{calculateDir(locale) === 'ltr' ? '?' : '؟'}
				</p>
				<Link
					href={makeLocaleUrl('/auth/login')}
					className="inline-block align-baseline font-bold text-sm text-gray-500 hover:text-gray-800"
				>
					{t('login_now')}
				</Link>
			</div>
		</form>
	);
}
