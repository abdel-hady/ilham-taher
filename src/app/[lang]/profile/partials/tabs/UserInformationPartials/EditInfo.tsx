'use client';

import React from 'react';
import TextField from '@/app/components/input/ControlledTextField';
import DatePickerField from '@/app/components/input/DatePickerField';
import DropdownSelectionField from '@/app/components/input/DropdownSelectionField';
import StandardBtn from '@/app/components/common/StandardBtn';
import { useProfilePageProvider } from '@/app/components/providers/ProfilePageProvider';
import { useTranslations } from 'next-intl';
import ErrorAlert from '@/app/components/error-alert';
import QuestionDisplayer from './QuestionDisplayer';

export default function EditInfo({
	onSubmit, onCancel, register, errors, backErrorMessage, isBtnLoading, backErrors,
}:{ onCancel: ()=>void, onSubmit: ()=>void, errors: any,
	register: any, backErrorMessage:string, isBtnLoading:boolean, backErrors:any }) {
	const { genderOptions, countryOptions } = useProfilePageProvider();
	const t = useTranslations();
	const blockInvalidChar = (e:any) => ['e', 'E'].includes(e.key) && e.preventDefault();


	let ERROR_COMPONENT = null;

	if (backErrors.length !== 0) {
		if (backErrorMessage === 'Bad Request') {
			ERROR_COMPONENT = <ErrorAlert duplicatedEntry={false} errorMessage={backErrors} />;
		} else {
			ERROR_COMPONENT = <ErrorAlert duplicatedEntry errorMessage={backErrors} />;
		}
	}


	return (
		<form className="flex flex-col gap-5 pt-5" onSubmit={onSubmit}>

			<div className="flex gap-5">
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
			<div className="flex gap-5">
				<DatePickerField
					name="dateOfBirth"
					errors={errors}
					register={register}
					label={t('date_of_birth')}
				/>
				<DropdownSelectionField name="gender" label={t('gender')} errors={errors} register={register} options={genderOptions} />
			</div>

			<div className="flex gap-5">
				<TextField
					label={t('email')}
					placeholder="example@email.com"
					name="email"
					type="text"
					register={register}
					errors={errors}
				/>

				<TextField
					label={t('phone_number')}
					placeholder="+1 999 333 444"
					name="phoneNumber"
					type="number"
					onKeyDown={blockInvalidChar}
					register={register}
					errors={errors}
				/>
			</div>
			<div className="flex gap-5">
				<DropdownSelectionField
					name="country"
					label={t('country')}
					errors={errors}
					register={register}
					options={countryOptions}
				/>
			</div>

			<hr />
			<div>
				<h3 className="text-golden text-xl font-medium leading-5 text-center md:text-start mb-4">
					{t('more_info_about_you')}
				</h3>
				<div className="grid grid-col-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

					<QuestionDisplayer name="meditationPractice" register={register} />
					<QuestionDisplayer name="exercisePractice" register={register} />
					<QuestionDisplayer name="physicalDisability" register={register} />
					<QuestionDisplayer name="medicationTaken" register={register} />
					<QuestionDisplayer name="spiritualSessionsTaken" register={register} />
					<QuestionDisplayer name="married" register={register} />
				</div>
				<div className="grid grid-col-1 gap-6">
					<TextField
						name="specialization"
						register={register}
						errors={errors}
						label={t('specialization_q')}
						placeholder=""
						type="text"
						textArea
					/>
				</div>

			</div>

			{ERROR_COMPONENT}

			<div className="flex items-center justify-center md:justify-end flex-wrap gap-3">
				<StandardBtn text={t('cancel')} buttonType="button" onClick={onCancel} />
				<StandardBtn text={t('update')} buttonType="submit" isLoading={isBtnLoading} />
			</div>
		</form>
	);
}
