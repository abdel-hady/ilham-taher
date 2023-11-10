/* eslint-disable react/button-has-type */
import Link from 'next/link';
import React from 'react';


interface LinkStandardBtnProps {
	text: string;
	onClick?: (params: any)=>void;
	href: string;
	isLoading?: boolean;
	className? : string;
	wide?: boolean;
	btnSize?: 'large' | 'medium' | 'small' | 'extra-small';
}

export default function LinkStandardBtn({
	text,
	isLoading = false,
	href,
	onClick = () => {},
	wide = true,
	btnSize = 'medium',
	className = '',
}: LinkStandardBtnProps) {
	const btnSizesClasses = {
		large: 'btn-lg',
		medium: 'btn-md',
		small: 'btn-sm',
		'extra-small': 'btn-xs',
	};

	const calulatedBtnSize = btnSizesClasses[btnSize];

	return (
		<>
			<Link
				href={href}
				className={`
				btn
				${wide && ' btn-wide'}
				rounded-full
				bg-golden text-white hover:bg-greenish hover:text-white
				transition duration-200
				font-bold text-base
				${calulatedBtnSize}
				border-0
				${className}
				`}
				onClick={onClick}
			>
				{isLoading ? <span className="loading loading-spinner" /> : text }
			</Link>
			{/* <button
				type={buttonType}
				className={`
			btn
			${wide && ' btn-wide'}
			rounded-full
			bg-golden text-white hover:bg-greenish hover:text-white
			transition duration-200
			font-bold text-base
			${calulatedBtnSize}
			border-0
			${className}
			`}
				onClick={onClick}
				disabled={isLoading}
			>
				{isLoading ? <span className="loading loading-spinner" /> : text }
			</button> */}
		</>
	);
}
