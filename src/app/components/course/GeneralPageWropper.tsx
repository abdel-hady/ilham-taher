import React, { ReactNode } from 'react';


export default function GeneralPageWrapper({
	children,
}:{ children: ReactNode }) {
	return (
		<main>
			<section className="container mx-auto flex flex-col gap-5 py-10">
				{children}
			</section>
		</main>
	);
}
