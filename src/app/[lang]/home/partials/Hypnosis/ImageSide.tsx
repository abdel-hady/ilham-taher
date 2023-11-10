// interface CourseSliderProps { courses:Course[] }
import React from 'react';
import Image from 'next/image';

export default function ImageSide({ coverImg }: { coverImg: string }) {
	return (
		<div className="w-full lg:w-[50%]">
			<Image
				width={1000}
				height={1000}
				alt=" cover image"
				src={coverImg}
				className="object-cover rounded-lg max-height-600"
			/>
		</div>
	);
}
