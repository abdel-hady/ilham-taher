import { faArrowUp, faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import FreeChip from '../common/FreeChip';

interface CourseCardProps {
	title: string;
	type: string;
	slug: string;
	coverImg: string;
	isFree?: boolean;
}

export default function CourseCard({
	title, type, coverImg, slug, isFree = false,
}: CourseCardProps) {
	return (
		<div className="p-2">
			<div
				className="
				relative transition duration-200 hover:shadow-lg
				hover:scale-95
				rounded-lg border-2 border-gray-200"
				style={{ height: '400px' }}
			>
				<Image
					alt={`${title} cover image`}
					src={coverImg}
					width={1000}
					height={1000}
					className="h-full object-cover object-center rounded-lg"
				/>
				<div className="absolute z-10 top-0 left-0 w-full h-full flex flex-col justify-between">
					<div className="flex flex-row-reverse justify-between p-5">
						<Link href={`/courses/${slug}`}>
							<div className="rounded-full bg-amber-300 w-12 h-12 p-5 flex justify-center items-center rotate-45">
								<FontAwesomeIcon icon={faArrowUp} size="lg" />
							</div>
						</Link>

						{isFree && <FreeChip />}
					</div>
					<div className=" bg-black bg-opacity-30 rounded-b-lg p-5">
						<div className="flex justify-between items-center text-white">

							<div className="flex flex-col">
								<span className="text-sm">{type}</span>
								<span className="text-2xl">{title}</span>
							</div>
							<Link href={`/courses/${slug}`}>
								<div className="rounded-full bg-amber-300 text-black w-12 h-12 p-5 flex justify-center items-center">
									<FontAwesomeIcon icon={faPlay} size="lg" className="pl-1" />
								</div>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>


	);
}
