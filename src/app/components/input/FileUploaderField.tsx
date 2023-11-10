/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { ControlledInputProps } from './data';

export default function FileUploaderField({
	name, register, errors, label,
}: ControlledInputProps) {
	return (
		<div className="form-control w-full">
			<label className="block text-gray-700 text-sm font-bold mb-2 flex justify-start" htmlFor={name}>
				{label}
			</label>
			<input
				dir="ltr"
				type="file"
				name={name}
				id={name}
				accept="image/jpeg, image/png, image/gif"
				className="file-input file-input-bordered w-full"
				{...register(name)}
			/>
			{errors[name] && <p className="text-red-600 mt-1">{errors[name]?.message}</p>}
		</div>
	);
}
