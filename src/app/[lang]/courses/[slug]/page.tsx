import GeneralPageWrapper from '@/app/components/GeneralPageWrapper';
import React from 'react';
import CoursesService from '@/app/lib/services/CoursesService';
import { DetailsWithSlugPageProps } from '@/app/util/types/local-types';
import { notFound, redirect } from 'next/navigation';
import NotVerifiedAlert from '@/app/[lang]/not-verified-alert/page';
import HeroSection from './partials/Hero/HeroSection';
import Description from './partials/Description';
import ReviewCourseSection from './partials/ReviewCourseSection';
import LessonsSection from './partials/LessonsSection';
import CoursePaymentParamsHandler from './partials/CoursePaymentParamsHandler';
import UserReviewWrapper from './partials/UserReviewWrapper';

export default async function CoursePage({ params }: DetailsWithSlugPageProps) {
	const { lang, slug } = params;
	const course = await CoursesService.getSingleCourseBySlug(lang, slug);

	if (!course) {
		notFound();
	}

	if (params.slug !== encodeURIComponent(course.slug)) {
		redirect(`/${params.lang}/courses/${course.slug}`);
	}

	const reviews = await CoursesService.getCourseReviews(course.id, lang);
	const isEnrolledRes = (await CoursesService.isEnrolledInCourse(course.id!));


	return (
		<GeneralPageWrapper>
			<NotVerifiedAlert />
			<HeroSection course={course} isEnrolled={isEnrolledRes?.isEnrolled ?? false} />
			<Description description={course.description} />
			<LessonsSection
				lessons={course.lessons}
				isEnrolled={isEnrolledRes?.isEnrolled ?? false}
			/>
			<ReviewCourseSection reviews={reviews.items} />
			{isEnrolledRes?.isEnrolled && <UserReviewWrapper courseId={course.id.toString()} />}
			<CoursePaymentParamsHandler />
		</GeneralPageWrapper>
	);
}
