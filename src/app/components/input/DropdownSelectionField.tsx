/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useTranslations } from 'next-intl';
import { ControlledDropdownProps } from './data';


export default function DropdownSelectionField({
	label, name, register, errors, options,
}: ControlledDropdownProps) {
	const t = useTranslations();
	return (
		<div className="form-control w-full">
			<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={name}>
				{label}
			</label>
			<select id={name} name={name} className="select select-bordered" {...register(name)}>
				<option disabled selected value="-1">{t('pick_one')}</option>

				{options.map((op) => (
					<option value={op.value} className="capitalize">{op.label}</option>

				))}
			</select>
			{errors[name] && <p className="text-red-600 mt-1">{errors[name]?.message}</p>}

		</div>
	);
}
