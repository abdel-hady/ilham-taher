import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface SessionCardProps {
	// id: number;
	coverImg: string;
	title: string;
	description: string;
	enrolls: number;
}


export default function SessionCard({
	coverImg, title, description, enrolls,
}: SessionCardProps) {
	return (
		<div className=" grid grid-rows-2 rounded-tl-xl rounded-br-xl border border-amber-300 overflow-hidden shadow-lg" style={{ height: '400px', maxWidth: '350px' }}>
			<div>
				<Image
					src={coverImg}
					width={1000}
					height={1000}
					alt={`${title} course cover image`}
					className="w-full object-cover"
				/>
			</div>
			<div className="flex flex-col gap-1 px-4 justify-center">
				<span className="text-xs text-gray-400">{enrolls} enrolls</span>
				<h5 className="font-semibold text-xl">{title}</h5>
				<p className="text-sm text-gray-500">{description}</p>
				<Link href="/" className=" text-amber-400 py-1">
					{'View Course ->'}
				</Link>
			</div>
		</div>
	);
}
