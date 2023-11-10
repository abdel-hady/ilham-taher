import React from 'react';

export default function SectionTitle({ title, className = '' }: { title:string;className?:string; }) {
	return (
		<h2 className={`text-center text-3xl lg:text-4xl font-bold ${className}`}>{title}</h2>
	);
}
