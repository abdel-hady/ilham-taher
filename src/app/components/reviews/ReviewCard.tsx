import Image from 'next/image';
import React from 'react';

interface ReviewCardProps {
	description: string;
	name: string;
	age: number;
	coverImg: string;
	relationName?: string;
}
export default function ReviewCard({
	description, name, age, coverImg, relationName = '',
}:ReviewCardProps) {
	return (
		<div
			className="
			flex flex-col justify-around bg-gradient-to-br from-yellow-50 to-[#E3F0F5] relative
			  text-gray-700  h-[300px] px-8  rounded-lg "
			style={{ }}
		>

			<div className="flex flex-col justify-center">
				<p className="text-base sm:text-bese md:text-lg lg:text-base xl:text-xl" style={{ wordBreak: 'break-all' }}>
					{description}
				</p>
				<div className="w-full flex justify-end">
					<Image
						alt="vector"
						src="/assets/images/vector.svg"
						width={40}
						height={40}
						className="object-fill"
					/>
				</div>
			</div>
			<div className="w-full flex items-center">
				<Image
					alt="vector"
					src={coverImg}
					width={1000}
					height={1000}
					className="object-cover w-20 h-20 rounded-full"
				/>
				<div className="px-5">
					<p>{name}</p>
					{relationName !== '' && <p>{relationName}</p>}
					<p>{age}</p>
				</div>
			</div>
		</div>
	);
}
