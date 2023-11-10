import Image from 'next/image';
import React from 'react';

interface NoDataProp {
	text?: string;
	image?: string;
}

export default function NoData({ text = 'No Data', image = '/assets/images/no-data.svg' }: NoDataProp) {
	return (
		<div className="max-w-[400px] mx-auto text-center h-[300px]">
			<Image
				src={image}
				width="1000"
				height="1000"
				alt="no data"
				className="w-full"
			/>
			<h3 className="text-4xl mt-5">
				{text}
			</h3>
		</div>
	);
}
