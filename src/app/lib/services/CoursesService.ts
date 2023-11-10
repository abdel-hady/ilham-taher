import { COURSES_URLS } from '@/app/util/url';
import {
	Course, CourseDetails, MyReview, Review, UserCourse,
} from '@/app/util/types/remote-types';
import GetPaginationAsync from '@/app/util/ApiClient/GetPaginationAsync';
import { QueryParams } from '@/app/util/types/local-types';
import GetAsync from '@/app/util/ApiClient/GetAsync';
import PostSecureAsync from '@/app/util/ApiClient/secure/PostSecureAsync';
import GetSecureAsync from '@/app/util/ApiClient/secure/GetSecureAsync';
import GetSecurePaginationAsync from '@/app/util/ApiClient/secure/GetSecurePaginationAsync';

const coursesUrl = COURSES_URLS.COURSES;

async function getPaginationCourses(
	locale: string,
	queryParams: QueryParams = {},
) {
	const coursesPagination = await GetPaginationAsync<Course>({
		url: coursesUrl,
		locale,
		params: queryParams,
	});

	return coursesPagination;
}

async function getPreviewCourses(locale: string, queryParams: QueryParams = {}) {
	const coursesPagination = await GetPaginationAsync<Course>({
		url: coursesUrl,
		locale,
		params: queryParams,
	});
	return coursesPagination.items;
}

async function getSingleCourse(locale:string, id: string) {
	const url = `${coursesUrl}/${id}`;
	const course = await GetAsync<CourseDetails>({
		url,
		locale,
	});
	return course;
}

async function getSingleCourseBySlug(locale:string, slug: string) {
	const url = `${coursesUrl}/${slug}`;
	const course = await GetAsync<CourseDetails>({ url, locale });
	return course;
}

async function isEnrolledInCourse(courseId: string | number) {
	const url = `${COURSES_URLS.USER_COURSES}/${courseId}/is-enrolled`;
	const isEnrolled = await GetSecureAsync<{ isEnrolled: boolean }>({
		url,
		locale: 'en',
	});
	return isEnrolled;
}

async function enrollInFreeCourse(courseId: number) {
	const url = COURSES_URLS.USER_COURSES;
	const enrollResult = await PostSecureAsync({
		url,
		locale: 'en',
		data: { course: courseId },
		isClientSide: true,
	});
	return enrollResult;
}

async function getUserCourses(locale: string) {
	const url = COURSES_URLS.USER_COURSES;
	const courses = await GetSecurePaginationAsync<UserCourse>({
		url,
		locale,
	});
	return courses;
}

async function getMyReviewToCourse(courseId: string | number, locale: string) {
	const url = `${COURSES_URLS.USER_COURSES}/${courseId}/my-review`;
	const res = await GetSecureAsync<MyReview>({
		url,
		locale,
		isClientSide: true,
	});
	return res;
}

async function getCourseReviews(courseId: string | number, locale: string) {
	const res = await GetPaginationAsync<Review>({
		url: COURSES_URLS.COURSES_REVIEWS,
		locale,
		params: {
			course: courseId,
			pageSize: 50,
		},
	});
	return res;
}


async function addReviewToCourse(courseId: string | number, comment: string) {
	const url = `${COURSES_URLS.USER_COURSES}/${courseId}/my-review`;
	const res = await PostSecureAsync({
		url,
		locale: 'en',
		data: { comment },
		isClientSide: true,
	});
	return res;
}

async function getInHomeCourseReviews(locale: string) {
	const res = await GetPaginationAsync<Review>({
		url: COURSES_URLS.COURSES_REVIEWS,
		locale,
		params: {
			viewAtHome: 'true',
			pageSize: 50,
		},
	});
	return res;
}


const CoursesService = {
	getPaginationCourses,
	getPreviewCourses,
	getSingleCourse,
	getSingleCourseBySlug,
	isEnrolledInCourse,
	enrollInFreeCourse,
	getUserCourses,
	getCourseReviews,
	getMyReviewToCourse,
	addReviewToCourse,
	getInHomeCourseReviews,
};

export default CoursesService;
