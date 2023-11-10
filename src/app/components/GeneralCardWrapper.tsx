import React, { ReactNode } from 'react';


interface GeneralCardWrapperProps {
	children: ReactNode;
	className?: string;
}
export default function GeneralCardWrapper({
	children, className = '',
}:GeneralCardWrapperProps) {
	return (
		<div className={`
		border-2 border-gray-200 bg-white
		rounded-lg
		p-24 py-10
		${className}
		`}
		>
			{children}
		</div>
	);
}
