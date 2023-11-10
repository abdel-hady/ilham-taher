/* eslint-disable react/jsx-props-no-spreading */
import { useTranslations } from 'next-intl';
import React from 'react';
import { UseFormRegister } from 'react-hook-form';

interface QuestionDisplayerProps {
	name: string;
	register: UseFormRegister<any>;
}
export default function QuestionDisplayer({
	name,
	register,
}: QuestionDisplayerProps) {
	const t = useTranslations();

	const qustionLabelKey = `${name}_q`;

	return (
		<div className="flex gap-5 text-greenish">
			<div>

				<h3>
					{t(qustionLabelKey)}
				</h3>

				<div className="flex gap-4">
					<div className="form-control">
						<label className="label cursor-pointer flex gap-2" htmlFor={qustionLabelKey}>
							<span className="label-text capitalize">{t('yes')}</span>
							<input type="radio" id={qustionLabelKey} {...register(name)} value="yes" className="radio checked:bg-golden" />
						</label>
					</div>
					<div className="form-control">
						<label className="label cursor-pointer flex gap-2" htmlFor={qustionLabelKey}>
							<span className="label-text capitalize">{t('no')}</span>
							<input type="radio" id={qustionLabelKey} {...register(name)} value="no" className="radio checked:bg-gray-400" />
						</label>
					</div>
				</div>
			</div>
		</div>
	);
}
