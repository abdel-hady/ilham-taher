/* eslint-disable react/jsx-props-no-spreading */
import { useTranslations } from 'next-intl';
import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import {
	fa1, fa2, fa3, fa4, fa5, fa6, fa7, fa8, fa9,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface QuestionDisplayerProps {
	questionNumber: string;
	register: UseFormRegister<any>;
	errors: any
}
export default function QuestionDisplayer({
	questionNumber,
	register,
	errors,
}: QuestionDisplayerProps) {
	const t = useTranslations();

	const qustionLabelKey = `sessions_questions_${questionNumber}`;

	const questionAnswerRegisterKey = `q${questionNumber}`;

	const icons: { [key:string]: IconDefinition } = {
		1: fa1,
		2: fa2,
		3: fa3,
		4: fa4,
		5: fa5,
		6: fa6,
		7: fa7,
		8: fa8,
		9: fa9,
	};

	return (
		<div className="flex gap-5">
			<div className="">
				<FontAwesomeIcon icon={icons[questionNumber]} size="xl" />
				{questionNumber === '1_1'
					&& (
						<div>
							<FontAwesomeIcon icon={icons['1']} size="xl" />
							<span className="text-xl mx-2">-</span>
							<FontAwesomeIcon icon={icons['1']} size="xl" />
						</div>
					)}
			</div>
			<div>

				<h3>
					{t(qustionLabelKey)}
				</h3>

				<div className="flex gap-4">
					<div className="form-control">
						<label className="label cursor-pointer flex gap-2" htmlFor={qustionLabelKey}>
							<span className="label-text capitalize">{t('yes')}</span>
							<input type="radio" id={qustionLabelKey} {...register(questionAnswerRegisterKey, { required: true })} value="yes" className="radio checked:bg-golden" />
						</label>
					</div>
					<div className="form-control">
						<label className="label cursor-pointer flex gap-2" htmlFor={qustionLabelKey}>
							<span className="label-text capitalize">{t('no')}</span>
							<input type="radio" id={qustionLabelKey} {...register(questionAnswerRegisterKey, { required: true })} value="no" className="radio checked:bg-gray-400" />
						</label>
					</div>
				</div>
				<div>
					<small className="text-red-600">
						{errors[questionAnswerRegisterKey] && t('this_field_is_required')}
					</small>
				</div>
			</div>
		</div>
	);
}
