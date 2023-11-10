import React from 'react';
import CustomReviewSwiper from '@/app/components/common/CustomReviewSwiper';
import ReviewCard from '@/app/components/reviews/ReviewCard';
import { Review } from '@/app/util/types/remote-types';
import parseImageUrl from '@/app/util/parseImageUrl';
import SectionTitle from '@/app/components/common/SectionTitle';

interface ReviewSectionProps {
	title:string;reviews: Review[];
}

export default function ReviewSection({ title, reviews }: ReviewSectionProps) {
	if (reviews.length <= 0) {
		return null;
	}

	return (
		<section className="w-full flex flex-col gap-5">
			<SectionTitle title={title} />
			<div className="container p-0">
				<CustomReviewSwiper>
					{reviews.map((review) => (
						<ReviewCard
							key={review.id}
							description={review.comment}
							age={review.user.age}
							coverImg={parseImageUrl(review.user.avatarFileUrl!)}
							name={review.user.fullName}
							relationName={review?.session?.name || review?.course?.name}

						/>
					))}
				</CustomReviewSwiper>
			</div>
		</section>
	);
}
