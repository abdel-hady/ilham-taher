'use client';

import Image from 'next/image';
import React from 'react';
import { useInView } from 'react-intersection-observer';
import EaseInFromRight from '../../animation/EaseInFromRight';

export default function RightWideCardImage({
	coverImg, title,
}: { coverImg: string, title: string }) {
	const [ref, inView] = useInView({
		threshold: 0.2,
		triggerOnce: true,
	});
	return (
		<div className="rounded-lg w-full lg:w-1/3 flex justify-center items-center" ref={ref}>
			<EaseInFromRight
				parentInView={inView}
			>
				<Image
					src={coverImg}
					width={1000}
					height={1000}
					alt={`${title} cover image`}
					className="w-full h-48 object-cover object-center top-0 rounded-lg sm:h-64 md:h-72 lg:w-full lg:h-96"
				/>
			</EaseInFromRight>
		</div>
	);
}
