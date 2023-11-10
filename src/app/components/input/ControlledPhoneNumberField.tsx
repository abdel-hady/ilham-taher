/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { ControlledInputProps } from './data';


type ControlledPhoneNumberFieldProps = ControlledInputProps & {
	placeholder: string;
	phoneNumberCode: string | null;
};

export default function ControlledPhoneNumberField({
	name, label, placeholder,
	register, errors, phoneNumberCode,
}: ControlledPhoneNumberFieldProps) {
	const blockInvalidChar = (e:any) => ['e', 'E'].includes(e.key) && e.preventDefault();
	return (
		<div className="form-control w-full">
			<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={name}>
				{label}
			</label>
			<div dir="ltr" className="flex gap-2">
				<input
					className="input input-bordered w-[25%] text-center px-0"
					value={phoneNumberCode || ''}
					disabled
				/>
				<input
					className="input input-bordered w-full"
					id={name}
					name={name}
					type="number"
					onKeyDown={blockInvalidChar}
					placeholder={placeholder}
					{...register(name)}
					disabled={!phoneNumberCode}
					aria-invalid={errors[name] ? 'true' : 'false'}
				/>
			</div>
			{errors[name] && <p className="text-red-600 mt-1">{errors[name]?.message}</p>}
		</div>
	);
}
