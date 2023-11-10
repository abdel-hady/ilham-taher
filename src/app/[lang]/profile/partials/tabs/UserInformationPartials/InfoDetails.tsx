'use client';

import { useTranslations } from 'next-intl';
import StandardBtn from '@/app/components/common/StandardBtn';
import { useProfilePageProvider } from '@/app/components/providers/ProfilePageProvider';
import React from 'react';
import DateParser from '@/app/util/DateParser';

export default function InfoDetails({ onOpen }: { onOpen: ()=>void }) {
	const { user } = useProfilePageProvider();
	const t = useTranslations();

	const {
		firstName, lastName, email, phoneNumber, country, dateOfBirth, gender,
		married, spiritualSessionsTaken, exercisePractice, medicationTaken, meditationPractice,
		specialization, physicalDisability,
	} = user;

	const questionsAnswers = {
		meditationPractice,
		exercisePractice,
		physicalDisability,
		medicationTaken,
		spiritualSessionsTaken,
		married,
		specialization,
	};


	return (
		<div>
			<div
				className="relative rounded-md p-3 flex justify-between px-6 flex-col md:flex-row gap-6"
			>
				<div className="grid gap-6">

					{/* Full name */}
					<div className="grid gap-2">
						<h3 className="text-golden text-xl font-medium leading-5 text-center md:text-start">
							{t('user_name')}
						</h3>
						<h3 className="text-xl font-medium leading-5 text-greenish text-center md:text-start">
							{`${firstName} ${lastName}`}
						</h3>
					</div>
					{/* Email */}
					<div className="grid gap-2">
						<h3 className="text-golden text-xl font-medium leading-5 text-center md:text-start">
							{t('email')}
						</h3>
						<h3 className="text-xl font-medium leading-5 text-greenish text-center md:text-start">
							{email}
						</h3>
					</div>
				</div>
				<div className="grid gap-6">
					{/* Phone number */}
					<div className="grid gap-2">
						<h3 className="text-golden text-xl font-medium leading-5 text-center md:text-start">
							{t('phone')}
						</h3>
						<h3 className="text-xl font-medium leading-5 text-greenish text-center md:text-start" dir="ltr">
							{phoneNumber}
						</h3>
					</div>
					{/* Gender */}
					<div className="grid gap-2">
						<h3 className="text-golden text-xl font-medium leading-5 text-center md:text-start">
							{t('gender')}
						</h3>
						<h3 className="text-xl font-medium leading-5 text-greenish capitalize text-center md:text-start">
							{gender.label}
						</h3>
					</div>
				</div>
				<div className="grid gap-6">
					{/* Country */}
					<div className="grid gap-2">
						<h3 className="text-golden text-xl font-medium leading-5 text-center md:text-start">
							{t('country')}
						</h3>
						<h3 className="text-xl font-medium leading-5 text-greenish text-center md:text-start">
							{country?.name || '-'}
						</h3>
					</div>
					{/* Date of Birth */}
					<div className="grid gap-2">
						<h3 className="text-golden text-xl font-medium leading-5 text-center md:text-start">
							{t('date_of_birth')}
						</h3>
						<h3 className="text-xl font-medium leading-5 text-greenish text-center md:text-start">
							{DateParser.toDayMonthYear(dateOfBirth)}
						</h3>
					</div>
				</div>
			</div>
			<div className="flex flex-col gap-6 w-full px-6 mt-10">
				<h3 className="text-golden text-xl font-medium leading-5 text-center md:text-start">
					{t('more_info_about_you')}
				</h3>
				<div className="w-full grid grid-col-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

					{Object.entries(questionsAnswers).map(([key, val]) => {
						const translationKey = `${key.toString()}_q`;
						return (
							<div className="w-full text-greenish flex gap-2">
								<span className="text-xl font-medium leading-5 text-center">{t(translationKey)}</span>
								<span>
									{key === 'specialization' && (val || t('no_data'))}
									{key !== 'specialization' && (val ? t('yes') : t('no'))}
								</span>
							</div>
						);
					})}
				</div>
			</div>
			<div className="flex justify-center md:justify-end mt-8">
				<StandardBtn text={t('edit')} onClick={onOpen} />
			</div>
		</div>
	);
}
