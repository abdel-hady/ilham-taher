/* eslint-disable prefer-destructuring */
export const REMOTE_URLS = process.env.BASE_URL;
export const WEBSITE_BASE_URL = process.env.WEBSITE_BASE_URL;

export const AUTH_URLS = {
	login: `${REMOTE_URLS}/api/auth/login`,
	register: `${REMOTE_URLS}/api/auth/register`,
	profile: `${REMOTE_URLS}/api/auth/profile`,
	forgotPassword: `${REMOTE_URLS}/api/auth/forgot-password`,
	resetPassword: `${REMOTE_URLS}/api/auth/reset-password`,
	changePassword: `${REMOTE_URLS}/api/auth/change-password`,
	verifyEmail: `${REMOTE_URLS}/api/auth/verify-email`,

};

export const SESSIONS_URLS = {
	ALL_SEESIONS: `${REMOTE_URLS}/api/sessions`,
	USER_SESSIONS: `${REMOTE_URLS}/api/users/me/sessions`,
	SESSIONS_REVIEWS: `${REMOTE_URLS}/api/session-reviews`,
};

export const PROFILE_URL = {
	USER_SESSIONS: `${REMOTE_URLS}/api/users/me/sessions`,
};

export const BLOGS_URLS = {
	ALL_BLOGS: `${REMOTE_URLS}/api/blogs`,
};
export const OUR_SERVICES_URLS = {
	ALL_OUR_SERVICES: `${REMOTE_URLS}/api/our-services`,
};
export const LESSONS_URLS = {
	SINGLE_LESSON: `${REMOTE_URLS}/api/lessons`,
};

export const OPTIONS_URLS = {
	GENDERS: `${REMOTE_URLS}/api/options/gender`,
	COUNTRIES: `${REMOTE_URLS}/api/country`,
};

export const CHARITY_URLS = {
	SLIDERS: `${REMOTE_URLS}/api/charity-sliders`,
};

export const COURSES_URLS = {
	COURSES: `${REMOTE_URLS}/api/courses`,
	USER_COURSES: `${REMOTE_URLS}/api/users/me/courses`,
	COURSES_REVIEWS: `${REMOTE_URLS}/api/course-reviews`,
};

export const STRIPE_URLS = {
	INTENT: `${REMOTE_URLS}/api/stripe/course-payments`,
};
export const PAYPAL_URLS = {
	CREATE_ORDER: `${REMOTE_URLS}/api/paypal/course-orders`,
};

export const SETTINGS_URLS = {
	VISUAL_SETTINGS: `${REMOTE_URLS}/api/visual-settings`,
	MULTI_TYPE_SETTINGS: `${REMOTE_URLS}/api/multi-type-settings`,
};

export const FAQS_URLS = {
	FAQS: `${REMOTE_URLS}/api/faqs`,
	CATEGORIES: `${REMOTE_URLS}/api/faq-categories`,
};

export default {
	REMOTE_URLS,
	AUTH_URLS,
	SESSIONS_URLS,
	BLOGS_URLS,
	OPTIONS_URLS,
	STRIPE_URLS,
	CHARITY_URLS,
	SETTINGS_URLS,
	FAQS_URLS,
	OUR_SERVICES_URLS,
};
