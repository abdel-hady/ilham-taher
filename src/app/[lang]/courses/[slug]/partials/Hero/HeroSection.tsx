'use client';

import IconsDisplayer from '@/app/components/common/IconsDisplayer';
import { CourseDetails } from '@/app/util/types/remote-types';
import React from 'react';

import FreeChip from '@/app/components/common/FreeChip';
import CustomVimeoPlayer from './CustomVimeoPlayer';
import PurchaseButtonHandler from './PurchaseButtonHandler';

interface Hero {
	course: CourseDetails;
	isEnrolled: boolean;
}

export default function HeroSection({ course, isEnrolled }:Hero) {
	return (
		<div className="container flex flex-col lg:gap-8 text-greenish">
			<div className="flex justify-center flex-col items-center gap-8">
				<h1 className="text-3xl font-semibold flex items-center gap-4">
					<span>{course.name}</span>
					{course.free && <FreeChip />}
				</h1>
				<div className="w-full h-full rounded-lg overflow-auto lg:px-24">
					<CustomVimeoPlayer videoId={course.trailerVimeoId || '845671884'} />
				</div>
			</div>
			<IconsDisplayer iconUrls={course.icons} withLabels />

			<PurchaseButtonHandler
				isEnrolled={isEnrolled}
				isFree={course.free}
				courseSlug={course.slug}
				courseId={course.id}
				isPurchasable={course.purchasable}
			/>
		</div>
	);
}
