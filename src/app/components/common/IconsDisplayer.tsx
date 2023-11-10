import parseImageUrl from '@/app/util/parseImageUrl';
import { IconDetails } from '@/app/util/types/remote-types';
import Image from 'next/image';
import React from 'react';

interface IconsProps {
	iconUrls: IconDetails[];
	withLabels?: boolean;
	imageClassName? : string;
}

export default function IconsDisplayer({
	iconUrls, withLabels = false, imageClassName,
}: IconsProps) {
	return (
		<div className="flex items-start justify-center sm:gap-0 grid grid-cols-2 md:gap-1 grid grid-cols-3  lg:gap-2 flex-wrap items-between">
			{iconUrls?.map(({ fileUrl, title }) => (
				<div
					className={
						`
						my-3
						flex justify-center items-center flex-col
						hover:scale-110 transform duration-200
						w-[100px]
						`
					}
					key={fileUrl}
				>
					<Image
						alt={fileUrl}
						src={parseImageUrl(fileUrl)}
						width={1000}
						height={1000}
						className={`object-cover rounded-full w-12 h-12 ${imageClassName}`}
					/>
					{withLabels && <span className="text-center text-greenish">{title}</span>}
				</div>
			))}
		</div>
	);
}
