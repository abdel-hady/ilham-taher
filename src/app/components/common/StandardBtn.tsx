/* eslint-disable react/button-has-type */
import React from 'react';

type ButtonType = 'submit' | 'reset' | 'button' | undefined;

interface StandardBtnProps {
	text: string;
	buttonType?: ButtonType;
}

export default function StandardBtn({ text, buttonType = 'button' }: StandardBtnProps) {
	return (
		<button
			type={buttonType}
			className="
                px-10 py-3 rounded-full
                transition duration-200
                bg-golden text-white hover:bg-greenish hover:text-white shadow-lg
                font-bold text-base sm:text-xl"
		>{text}
		</button>
	);
}
