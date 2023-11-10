/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { ControlledInputProps } from './data';


type InputType = 'text' | 'email' | 'password' | 'tel' | 'number' ;

type TextFieldProps = ControlledInputProps & {
	placeholder: string;
	type: InputType;
	onKeyDown?:any;
	textArea?:boolean;
};

export default function ControlledTextField({
	name, label, placeholder, type, onKeyDown = null, textArea = false,
	register, errors,
}: TextFieldProps) {
	return (
		<div className="form-control w-full">
			<label className="block text-gray-700 text-sm font-bold mb-2 flex justify-start" htmlFor={name}>
				{label}
			</label>
			{textArea ? (
				<textarea
					className="input input-bordered w-full p-3"
					id={name}
					name={name}
					onKeyDown={onKeyDown}
					placeholder={placeholder}
					{...register(name)}
					aria-invalid={errors[name] ? 'true' : 'false'}
				/>
			) : (
				<input
					className="input input-bordered w-full"
					id={name}
					name={name}
					type={type}
					onKeyDown={onKeyDown}
					placeholder={placeholder}
					{...register(name)}
					aria-invalid={errors[name] ? 'true' : 'false'}
				/>
			)}

			{errors[name] && <p className="text-red-600 mt-1">{errors[name]?.message}</p>}
		</div>
	);
}
