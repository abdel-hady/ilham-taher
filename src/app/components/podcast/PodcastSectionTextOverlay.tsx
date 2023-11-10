'use client';

import React from 'react';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import Link from 'next/link';
import EaseInFromLeft from '../animation/EaseInFromLeft';
import { useLocaleProvider } from '../providers/LocaleProvider';

interface PodcastSectionTextOverlayProps {
	title:string; description:string;
	icons: { id: number, icon: string, url:string }[]
}
export default function PodcastSectionTextOverlay({
	title,
	description,
	icons,
}: PodcastSectionTextOverlayProps) {
	const [ref, inView] = useInView({
		threshold: 0.2,
		triggerOnce: true,
	});
	const { isRtl } = useLocaleProvider();

	return (
		<div ref={ref}>
			<EaseInFromLeft
				className="absolute bottom-0 top-0 right-0 left-0 flex flex-col justify-center gap-2 md:gap-5 w-full p-6 md:p-12"
				parentInView={inView}
			>
				<div className={`text-greenish w-full md:w-2/3 ${isRtl ? 'text-right' : 'text-left'}`}>
					<p className="text-2xl text-center md:text-3xl lg:text-4xl mt-2">
						{title}
					</p>
					<p className="text-2xl text-center md:text-3xl lg:text-4xl mt-2">
						{description}
					</p>
					{/* <p dangerouslySetInnerHTML={{ __html: description }} /> */}
				</div>
				<div className=" w-full md:w-2/3">
					<div className="text-greenish text-center flex justify-center gap-8">
						{icons.map((icn) => (
							<Link href={icn.url} target="_blank" key={icn.id}>
								<div className="w-16 flex flex-row gap-4 items-center text-greenish text-2xl hover:scale-110 transition">
									<Image
										width={1000}
										height={1000}
										alt="cover image"
										src={icn.icon}
										className="w-16 rounded-lg"
									/>
								</div>
							</Link>
						))}
					</div>
				</div>
			</EaseInFromLeft>
		</div>
	);
}
