'use client';

import Image from 'next/image';
import React from 'react';
import { useInView } from 'react-intersection-observer';
import EaseInFromLeft from '../../animation/EaseInFromLeft';

export default function LeftWideCardImage({
	coverImg, title,
}: { coverImg: string, title: string }) {
	const [ref, inView] = useInView({
		threshold: 0.2,
		triggerOnce: true,
	});
	return (
		<div className="rounded-lg w-full lg:w-1/3 flex justify-center items-center" ref={ref}>
			<EaseInFromLeft
				parentInView={inView}
			>
				<Image
					src={coverImg}
					width={1000}
					height={1000}
					alt={`${title} cover image`}
					className="w-full h-48 object-cover object-center top-0 rounded-lg sm:h-64 md:h-72 lg:w-full lg:h-96"
				/>
			</EaseInFromLeft>
		</div>
	);
}
