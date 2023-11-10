import GetAsync from '@/app/util/ApiClient/GetAsync';
import GetPaginationAsync from '@/app/util/ApiClient/GetPaginationAsync';
import GetSecureAsync from '@/app/util/ApiClient/secure/GetSecureAsync';
import PostSecureAsync from '@/app/util/ApiClient/secure/PostSecureAsync';
import { QueryParams } from '@/app/util/types/local-types';
import {
	DetailedSession,
	MyReview,
	Review,
	Session,
	UserSession,
} from '@/app/util/types/remote-types';
import { SESSIONS_URLS } from '@/app/util/url';

const sessionsUrl = SESSIONS_URLS.ALL_SEESIONS;

async function getPaginationSession(
	locale: string,
	queryParams: QueryParams = {},

) {
	const sessionsPagination = await GetPaginationAsync<Session>({
		url: sessionsUrl,
		locale,
		params: {
			type: 'REGULAR',
			...queryParams,
		},
	});

	return sessionsPagination;
}

async function getPreviewSessions(locale: string, queryParams: QueryParams = {}) {
	const sessionsPagination = await GetPaginationAsync<Session>({
		url: sessionsUrl,
		locale,
		params: {
			type: 'REGULAR',
			...queryParams,
		},
	});

	return sessionsPagination.items;
}

async function getSingleSession(locale:string, slug: string) {
	const session = await GetAsync<DetailedSession>({
		url: `${sessionsUrl}/${slug}`,
		locale,
	});
	return session;
}

async function getMySession(locale:string, sessionId: string) {
	const url = `${SESSIONS_URLS.USER_SESSIONS}/${sessionId}`;
	const session = await GetSecureAsync<UserSession>({
		url,
		locale,
	});
	return session;
}

async function addReviewToSession(sessionId: string | number, comment: string) {
	const url = `${SESSIONS_URLS.USER_SESSIONS}/${sessionId}/my-review`;
	const res = await PostSecureAsync({
		url,
		locale: 'en',
		data: { comment },
		isClientSide: true,
	});
	return res;
}

async function isMySession(sessionId:string) {
	const session = await getMySession('en', sessionId);

	if (session) {
		return true;
	}
	return false;
}

async function getMyReviewToSession(sessionId: string | number, locale: string) {
	const res = await GetSecureAsync<MyReview>({
		url: `${SESSIONS_URLS.USER_SESSIONS}/${sessionId}/my-review`,
		locale,
		isClientSide: true,
	});
	return res;
}

async function getSessionReviews(sessionId: string | number, locale: string) {
	const res = await GetPaginationAsync<Review>({
		url: SESSIONS_URLS.SESSIONS_REVIEWS,
		locale,
		params: {
			session: sessionId,
			pageSize: 50,
		},
	});
	return res;
}

async function getInHomeSessionReviews(locale: string) {
	const res = await GetPaginationAsync<Review>({
		url: SESSIONS_URLS.SESSIONS_REVIEWS,
		locale,
		params: {
			viewAtHome: 'true',
			pageSize: 50,
		},
	});
	return res;
}

async function getPaginationSessionByKeys(locale: string, keys: string[]) {
	const sessionsPagination = await GetPaginationAsync<Session>({
		url: sessionsUrl,
		locale,
		params: {
			calendlyEventTypeUuids: keys,
		},
	});

	return sessionsPagination;
}


async function getVipSession(locale: string) {
	const sessionsPagination = await GetPaginationAsync<Session>({
		url: sessionsUrl,
		locale,
		params: {
			calendlyEventTypeUuids: process.env.VIP_SESSION_KEY!,
		},
	});

	return sessionsPagination.items[0] ?? null;
}
async function getVipSessionsList(locale:string) {
	const sessionsPagination = await GetPaginationAsync<Session>({
		url: sessionsUrl,
		locale,
		params: {
			type: 'VIP',
		},
	});
	return sessionsPagination.items;
}


const SessionsService = {
	getPaginationSession,
	getPreviewSessions,
	getSingleSession,
	addReviewToSession,
	getMySession,
	isMySession,
	getMyReviewToSession,
	getSessionReviews,
	getInHomeSessionReviews,
	getPaginationSessionByKeys,
	getVipSession,
	getVipSessionsList,
};

export default SessionsService;
