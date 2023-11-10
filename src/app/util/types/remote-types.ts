import { Option } from '@/app/components/input/data';

export interface LoginResponseDto {
	token: string,
	user: any,
}

export interface RemoteUser {
	id: number;
	createdAt: string;
	updatedAt: string;
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
	active: boolean;
	dateOfBirth: string;
	gender: number;
	avatarFileSize: number | null;
	avatarFileName: string | null;
	avatarFileUrl: string | null;
	country: string | null;
	roles?: {
		id: number;
		name: string;
	}[];
}

export interface PaginationData<T> {
	items: T[];
	totalItems: number;
	totalPages: number;
	currentPage: number;
}

export interface Session {
	calendlySchedulingUrl: string;
	name: string;
	description: string;
	id: string;
	icons:IconDetails[];
	slug: string;
	type: Option;
	externalImageFileUrl: string;
	shortDescription?: string;
	published: boolean;
	contentType: Option;
}

export interface DetailedSession {
	id: number;
	createdAt: string;
	updatedAt: string;
	slug: string;
	trailerVimeoId: string | null;
	type: Option;
	calendlySchedulingUrl: string;
	calendlyEventTypeUuid: string;
	calendlyEventTypeName: string;
	externalImageFileUrl: string;
	internalImageFileUrl: string;
	vip: boolean;
	icons: IconDetails[];
	name: string;
	description: string;
	published: boolean;
	contentType: Option;
	shortDescription: string;
	sessionCalendlyDetails: SessionCalendlyDetails[];
}

export interface SessionCalendlyDetails {
	name: string;
	uuid: string;
	url: string;
	paymentProvider: Option;
}

export interface MiniSession {
	id: number;
	name: string;
}

export interface UserSession {
	id: number;
	createdAt: string;
	updatedAt: string;
	locationType: number;
	locationJoinUrl: string;
	startTime: string;
	endTime: string;
	timezone: string;
	status: Option;
	session: MiniSession;
}

export interface Blog {
	id: number;
	createdAt: string;
	updatedAt: string;
	slug: string;
	imageFileName: string;
	imageFileUrl: string;
	title: string;
	icons:IconDetails[];

}

export interface IconDetails {
	id: number;
	fileUrl: string;
	title: string;
}

export interface BlogDetails extends Blog {
	content: string;
	metaDataDescription: string;
	metaDataKeyword: string;
}


export interface Country {
	id: number;
	createdAt: string;
	updatedAt: string;
	iso2: string;
	active: boolean;
	phoneNumberCode: string;
	name: string;
}

export interface Course {
	id: number;
	trailerVimeoId: string | null;
	published: boolean;
	price: number;
	featureImageUrl: string;
	name: string;
	description: string;
	slug: string;
	free: boolean;
}

export interface CourseDetails {
	id: number;
	trailerVimeoId: string | null;
	published: boolean;
	price: number;
	featureImageUrl: string;
	name: string;
	description: string;
	slug: string;
	free: boolean;
	icons: IconDetails[];
	lessons: Lesson[];
	purchasable: boolean;
}


export interface PaymentIntent {
	id: string;
	object: string;
	amount: number;
	amount_capturable: number;
	amount_details: {
		tip: {};
	};
	amount_received: number;
	application: null;
	application_fee_amount: null;
	automatic_payment_methods: null;
	canceled_at: null;
	cancellation_reason: null;
	capture_method: string;
	client_secret: string;
	confirmation_method: string;
	created: number;
	currency: string;
	customer: null;
	description: null;
	invoice: null;
	last_payment_error: null;
	latest_charge: null;
	livemode: boolean;
	metadata: {
		course: string;
		user: string;
	};
	next_action: null;
	on_behalf_of: null;
	payment_method: null;
	payment_method_options: {
		card: {
			installments: null;
			mandate_options: null;
			network: null;
			request_three_d_secure: string;
		};
	};
	payment_method_types: string[];
	processing: null;
	receipt_email: null;
	review: null;
	setup_future_usage: null;
	shipping: null;
	source: null;
	statement_descriptor: null;
	statement_descriptor_suffix: null;
	status: string;
	transfer_data: null;
	transfer_group: null;
}

export interface Lesson {
	id: number;
	createdAt: string;
	updatedAt: string;
	slug: string;
	type: Option;
	published: boolean;
	free: boolean;
	attachmentFileUrl: string;
	featureImageUrl: string;
	title: string;
	description: string;
}

export interface DetailedLesson {
	id: number;
	createdAt: string;
	updatedAt: string;
	slug: string;
	videoVimeoId: number;
	type: Option;
	published: boolean;
	free: boolean;
	attachmentFileSize: number;
	attachmentFileName: string;
	attachmentFileUrl: string;
	featureImageSize: number;
	featureImageName: string;
	featureImageUrl: string;
	title: string;
	description: string;
	content: any;
	audioUrl: string;
	course:{
		slug: string;
	}
}

export interface UserCourse {
	id: number;
	createdAt: string;
	updatedAt: string;
	course: {
		id: number;
		featureImageUrl: string;
		name: string;
		slug: string;
	};
	user: {
		id: number;
		fullName: string;
	};
}

export interface CharitySlider {
	id: number;
	counter: number | null;
	title: string;
	numberUnit: string | null;
	description: string | null;
}

export interface MyReview {
	comment: string; id: number;
}


export interface Review {
	id: number;
	comment: string;
	user: {
		id: number;
		fullName: string;
		avatarFileUrl: string | null;
		age: number;
	};
	course?: {
		id: number;
		name: string;
		description: string;
	}
	session?: {
		id: number;
		name: string;
	}
}


export interface VisualSettings {
	id: number;
	createdAt: string;
	updatedAt: string;
	settingKey: string;
	imageFileName: string;
	imageFileUrl: string;
	title: string;
	description: string;
}

export interface MultiTypeSettings {
	id: number;
	createdAt: string;
	updatedAt: string;
	settingKey: string;
	type: Option;
	value: string;
}

export type GeneralSettingsType = MultiTypeSettings | VisualSettings;


export interface FaqCategory {
	id: number;
	name: string;
}

export interface Faq {
	id: number;
	question: string;
	answer: string;
}


export interface OurService {
	id: string;
	contentType: Option;
	externalImageUrl: string;
	title: string;
	slug: string;
}


export interface OurServiceDetails {
	id: string;
	contentType: Option;
	externalImageUrl: string;
	title: string;
	slug: string;
	videoVimeoId: string | null,
	internalImageUrl: string,
	icons: IconDetails[],
	content: string,
	metaDataDescription: string;
	metaDataKeyword: string;
}
