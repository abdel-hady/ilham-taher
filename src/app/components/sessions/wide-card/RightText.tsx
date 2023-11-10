'use client';

import React from 'react';
import { useInView } from 'react-intersection-observer';
import StandardBtn from '../../common/StandardBtn';
import EaseInFromLeft from '../../animation/EaseInFromLeft';

export default function RightWideCardText({
	description, title,
}: { description: string, title: string }) {
	const [ref, inView] = useInView({
		threshold: 0.2,
		triggerOnce: true,
	});
	return (
		<div className="w-4/5 py-2 flex flex-col justify-center gap-4 text-left lg:w-2/3 lg:gap-7 lg:px-12 lg:py-0" ref={ref}>
			<EaseInFromLeft
				parentInView={inView}
				className="flex justify-center flex-col gap-2 items-center text-center lg:text-left lg:items-start"
			>
				<h4 className="text-2xl font-bold lg:text-5xl">{title}</h4>
				<p className="text-sm lg:text-xl">{description}</p>
				<div className="w-fit">
					<StandardBtn text="Learn More" />
				</div>
			</EaseInFromLeft>
		</div>
	);
}
