/* eslint-disable react/jsx-props-no-spreading */

'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslations } from 'next-intl';
import SectionTitle from './SectionTitle';

interface IForm {
	comment: string;
}

const validationSchema = yup.object().shape({
	comment: yup.string().max(100, 'max_is_100').required('field_is_required'),
});

interface AddReviewSectionProps {
	onSubmit: (comment: string) => void
}

export default function AddReviewSection({ onSubmit }:AddReviewSectionProps) {
	const { register, formState: { errors }, handleSubmit } = useForm<IForm>({
		resolver: yupResolver(validationSchema),
	});

	const t = useTranslations();

	const handler = (data:IForm) => {
		onSubmit(data.comment);
	};

	return (
		<section className="
            container border-2 border-gray-200 rounded-lg
            w-full flex flex-col gap-5 items-center justify-center
            bg-white shadow-lg py-5 px-10
            min-h-[400px]
            "
		>
			<SectionTitle title="بامكانك إضافة تعليقك الخاص" className="font-normal" />

			<form className="w-full flex flex-col justify-center gap-5" onSubmit={handleSubmit(handler)}>
				<div>
					<textarea
						{...register('comment')}
						placeholder="اكتب تعليقك هنا"
						className="textarea border-2 border-golden textarea-lg w-full"
					/>
					<small className="text-red-600">
						{errors?.comment && errors.comment.message}
					</small>
				</div>
				<div className="w-full flex justify-center">
					<button className="btn btn-outline" type="submit">{t('add')}</button>
				</div>
			</form>
		</section>
	);
}
