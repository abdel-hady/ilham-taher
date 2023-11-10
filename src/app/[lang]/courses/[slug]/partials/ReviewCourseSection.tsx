'use client';

import React from 'react';
import CustomReviewSwiper from '@/app/components/common/CustomReviewSwiper';
import ReviewCard from '@/app/components/reviews/ReviewCard';
import { useTranslations } from 'next-intl';
import { Review } from '@/app/util/types/remote-types';
import parseImageUrl from '@/app/util/parseImageUrl';
import SectionTitle from '@/app/components/common/SectionTitle';


interface ReviewCourseSectionProps {
	reviews: Review[]
}
export default function ReviewCourseSection({ reviews }:ReviewCourseSectionProps) {
	const t = useTranslations();

	if (reviews.length <= 0) {
		return null;
	}

	return (
		<section className=" container mx-auto w-full flex flex-col gap-5 mt-10 text-greenish">
			<SectionTitle title={t('course_reviews')} className="font-semibold" />

			<div className="container">
				<CustomReviewSwiper>
					{reviews.map((review) => (
						<ReviewCard
							key={review.id}
							description={review.comment}
							age={review.user.age}
							// id={review.id}
							coverImg={parseImageUrl(review.user.avatarFileUrl!)}
							name={review.user.fullName}
						/>
					))}
				</CustomReviewSwiper>
			</div>
		</section>
	);
}
