import GeneralPageWrapper from '@/app/components/GeneralPageWrapper';
import SessionsService from '@/app/lib/services/SessionsService';
import parseImageUrl from '@/app/util/parseImageUrl';
import Image from 'next/image';
import React from 'react';
import { notFound, redirect } from 'next/navigation';
import CustomReviewSwiper from '@/app/components/common/CustomReviewSwiper';
import ReviewCard from '@/app/components/reviews/ReviewCard';
import { calculateDir } from '@/app/util/RtlUtils';
import { DetailsWithSlugPageProps } from '@/app/util/types/local-types';
import NotVerifiedAlert from '@/app/[lang]/not-verified-alert/page';
import CalendlySubmitBtn from './partials/CalendlySubmitBtn';
import getDictionary from '../../../../../locale/get-dictionary';
import UserReviewWrapper from './partials/UserReviewWrapper';
import CustomVimeoPlayer from '../../courses/[slug]/partials/Hero/CustomVimeoPlayer';


export default async function SessionSinglePage({
	params: { lang, slug },
}:DetailsWithSlugPageProps) {
	const fetchedSession = await SessionsService.getSingleSession(lang, slug);
	const dic = await getDictionary(lang);

	if (!fetchedSession) {
		notFound();
	}

	if (slug !== encodeURIComponent(fetchedSession.slug)) {
		redirect(`/${lang}/sessions/${fetchedSession.slug}`);
	}

	const reviews = await SessionsService.getSessionReviews(fetchedSession.id, lang);

	const isMySession = await SessionsService.isMySession(fetchedSession.id.toString());


	let MEDIA_COMPONENT = null;
	if (fetchedSession.contentType.value === 'IMAGE') {
		MEDIA_COMPONENT = (
			<Image
				width={1000}
				height={1000}
				alt={`${fetchedSession.name} cover image`}
				src={parseImageUrl(fetchedSession.internalImageFileUrl)}
				className="object-cover rounded-lg"
				style={{ height: '400px' }}
			/>
		);
	} else {
		MEDIA_COMPONENT = (
			<CustomVimeoPlayer videoId={fetchedSession.trailerVimeoId!.toString()} />
		);
	}


	return (
		<GeneralPageWrapper>
			<NotVerifiedAlert />
			<div id="modal" />
			<section dir={calculateDir(lang)} className="shadow-lg py-4 md:py-10 bg-white border-2 border-gray-200 rounded-lg bg-flowers">
				<div className="mx-auto flex flex-col items-center gap-16 w-11/12 md:w-2/3">
					{MEDIA_COMPONENT}
					<div className="w-full flex flex-col gap-6 text-greenish">
						<h3 className=" text-3xl font-bold">{fetchedSession.name}</h3>
						<p className="" dangerouslySetInnerHTML={{ __html: fetchedSession.description }} />
					</div>
					<CalendlySubmitBtn
						sessionCalendlyDetailsArray={fetchedSession.sessionCalendlyDetails}
					/>
				</div>
			</section>

			{reviews.items.length > 0 && (
				<section id="reviews" className="container border-2 border-gray-200 rounded-lg mx-auto w-full flex flex-col gap-5 bg-white shadow-lg py-5 px-2 bg-flowers">
					<h2 className="text-center text-4xl font-bold">{dic.our_reviews}</h2>
					<div className="container">
						<CustomReviewSwiper>
							{reviews.items.map((review) => (
								<ReviewCard
									key={review.id}
									description={review.comment}
									age={review.user.age}
									coverImg={parseImageUrl(review.user.avatarFileUrl!)}
									name={review.user.fullName}
								/>
							))}
						</CustomReviewSwiper>
					</div>
				</section>
			)}
			{isMySession && <UserReviewWrapper sessionId={fetchedSession.id.toString()} />}
		</GeneralPageWrapper>

	);
}
