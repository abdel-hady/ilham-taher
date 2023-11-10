import { Option } from '@/app/components/input/data';
import { Country } from './remote-types';

export interface ApiResponse<T> {
	status: string;
	data: T;
}

export interface User {
	id: number;
	createdAt: string;
	updatedAt: string;
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
	active: boolean;
	dateOfBirth: string;
	gender: Option;
	genderLabel: string;
	avatarFileSize: number | null;
	avatarFileName: string | null;
	avatarFileUrl: string | null;
	country: Country | null;
	subscribeNewsletter: boolean;
	meditationPractice?: boolean;
	exercisePractice?: boolean;
	physicalDisability?: boolean;
	medicationTaken?: boolean;
	spiritualSessionsTaken?: boolean;
	married?: boolean;
	specialization?: string;
	verifiedAt:string | null;
}


export interface MiniUser {
	name: string;
	avatar: string;
	email: string;
}

export interface DetailsPageProps {
	params: {
		lang: string;
		id: string;
	};
	searchParams: any;
}

export interface DetailsWithSlugPageProps {
	params: {
		lang: string;
		slug: string;
	};
	searchParams: any;
}

export interface GeneralPageProp {
	params: {
		lang: string;
	};
	searchParams: any;
}


export interface QueryParams {
	[key: string]: string | number | Array<any>;
}

export class ArrayErrorMessageError extends Error {
	errorMessages: string[];

	constructor(message:string, errorMessages: string[]) {
		super(message);
		this.name = 'ArrayErrorMessageError';
		this.errorMessages = errorMessages;
	}
}
