'use client';

import React, { useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Resolver, useForm } from 'react-hook-form';
import { useProfilePageProvider } from '@/app/components/providers/ProfilePageProvider';
import { toast } from 'react-toastify';
import { useTranslations } from 'next-intl';
import UsersService from '@/app/lib/services/UsersService';
import { useLocaleProvider } from '@/app/components/providers/LocaleProvider';
import { ArrayErrorMessageError } from '@/app/util/types/local-types';
import InfoDetails from './UserInformationPartials/InfoDetails';
import useEditProfileUiManager from '../hooks/useEditProfileUiManager';
import EditInfo from './UserInformationPartials/EditInfo';

interface IForm {
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
	dateOfBirth: string;
	gender: string;
	country: number | undefined;
	image: any;
	meditationPractice: string | undefined;
	exercisePractice: string | undefined;
	physicalDisability: string | undefined;
	medicationTaken: string | undefined;
	spiritualSessionsTaken: string | undefined;
	married: string | undefined;
	specialization: string | undefined;
}

function createSchema(t:any) {
	const validationSchema = yup.object().shape({
		firstName: yup.string().required(t('first_name_is_required')),
		lastName: yup.string().required(t('last_name_is_required')),
		email: yup.string().email(t('invalid_email_address')).required(t('email_is_required')),
		phoneNumber: yup.string().required(t('phone_number_is_required')),
		dateOfBirth: yup.string().required(t('Date of birth is required')),
		gender: yup.string().required(t('gender_is_required')),
		country: yup.number().optional(),
		image: yup.object(),
		meditationPractice: yup.string().optional(),
		exercisePractice: yup.string().optional(),
		physicalDisability: yup.string().optional(),
		medicationTaken: yup.string().optional(),
		spiritualSessionsTaken: yup.string().optional(),
		married: yup.string().optional(),
		specialization: yup.string().optional(),
	});
	return validationSchema;
}

export default function UserInformationTab() {
	const { user } = useProfilePageProvider();
	const t = useTranslations();
	const { locale } = useLocaleProvider();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [backErrors, setBackErrors] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	const {
		firstName, lastName, email,
		gender, dateOfBirth, country, phoneNumber,
		meditationPractice, exercisePractice,
		physicalDisability, medicationTaken,
		spiritualSessionsTaken, married,
		specialization,
	} = user;
	const schema = createSchema(t);


	const { register, handleSubmit, formState: { errors } } = useForm<IForm>({
		resolver: yupResolver(schema) as Resolver<IForm>,
		defaultValues: {
			firstName,
			lastName,
			email,
			phoneNumber,
			gender: gender.value.toString(),
			country: country ? country.id : undefined,
			dateOfBirth,
			meditationPractice: meditationPractice ? 'yes' : 'no',
			exercisePractice: exercisePractice ? 'yes' : 'no',
			physicalDisability: physicalDisability ? 'yes' : 'no',
			medicationTaken: medicationTaken ? 'yes' : 'no',
			spiritualSessionsTaken: spiritualSessionsTaken ? 'yes' : 'no',
			married: married ? 'yes' : 'no',
			specialization: specialization ?? '',

		},
	});
	const { isEditOpen, opneEditUi, closeEditUi } = useEditProfileUiManager();
	const handleUpdate = (data: IForm) => {
		setIsLoading(true);
		setErrorMessage('');

		UsersService.editProfile(
			data.firstName,
			data.lastName,
			data.email,
			data.phoneNumber,
			data.gender,
			data.country,
			data.dateOfBirth,
			data.meditationPractice === 'yes',
			data.exercisePractice === 'yes',
			data.physicalDisability === 'yes',
			data.medicationTaken === 'yes',
			data.spiritualSessionsTaken === 'yes',
			data.married === 'yes',
			data.specialization ?? '',
			locale,
		).then(() => {
			toast.success(t('profile_was_updated_successfully'), { position: 'top-right' });
			closeEditUi();
			setTimeout(() => {
				window.location.reload();
			}, 500);
		}).catch((e:ArrayErrorMessageError) => {
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
	const handleCancel = () => {
		closeEditUi();
	};


	return (
		<div>
			{
				!isEditOpen ? <InfoDetails onOpen={opneEditUi} />
					: (
						<EditInfo
							onSubmit={handleSubmit(handleUpdate)}
							onCancel={handleCancel}
							register={register}
							errors={errors}
							backErrorMessage={errorMessage}
							backErrors={backErrors}
							isBtnLoading={isLoading}
						/>
					)
			}
		</div>
	);
}
