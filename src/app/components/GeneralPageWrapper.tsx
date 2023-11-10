import React, { ReactNode } from 'react';


export default function GeneralPageWrapper({
	children,
}:{ children: ReactNode }) {
	return (
		<main>
			<section className="container mx-auto flex flex-col gap-10 py-10 pt-3 md:py-10 bg-white">
				{children}
			</section>
		</main>
	);
}
