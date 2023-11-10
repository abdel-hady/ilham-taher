import { LESSONS_URLS } from '@/app/util/url';
import { DetailedLesson } from '@/app/util/types/remote-types';
import GetSecureAsync from '@/app/util/ApiClient/secure/GetSecureAsync';

const lessonUrl = LESSONS_URLS.SINGLE_LESSON;

async function getSingleLessonBySlug(locale:string, slug: string) {
	const url = `${lessonUrl}/${slug}`;
	const lesson = await GetSecureAsync<DetailedLesson>({
		url,
		locale,
	});
	return lesson;
}

const LessonsService = {
	getSingleLessonBySlug,
};

export default LessonsService;
