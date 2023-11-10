/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { ControlledInputProps } from './data';


type ControlledCheckboxFieldProps = ControlledInputProps & {
};

export default function ControlledCheckboxField({
	name, label, register, errors,
}: ControlledCheckboxFieldProps) {
	return (
		<div>
			<div className="form-control">
				<label className="label cursor-pointer flex" htmlFor={name}>
					<input
						type="checkbox"
						className="checkbox"
						id={name}
						name={name}
						{...register(name)}
					/>
					<span className="label-text mx-2">{label}</span>
				</label>
			</div>
			{errors[name] && <p className="text-red-600 mt-1">{errors[name]?.message}</p>}
		</div>
	);
}
