/* eslint-disable import/prefer-default-export */
import { User } from './local-types';
import { PaginationData } from './remote-types';

function generateDefaultPaginated(): PaginationData<any> {
	return {
		items: [],
		totalItems: 0,
		totalPages: 0,
		currentPage: 0,
	} as PaginationData<any>;
}

function generateDefaultUser(): User {
	const id = Math.floor(Math.random() * 1000);
	const createdAt = new Date().toISOString();
	const updatedAt = new Date().toISOString();
	const firstName = 'John';
	const lastName = 'Doe';
	const email = `john.doe${id}@example.com`;
	const phoneNumber = '123-456-7890';
	const active = true;
	const dateOfBirth = '1990-01-01';
	const gender = { label: 'Undefined', value: '-' };
	const avatarFileSize = null;
	const avatarFileName = null;
	const avatarFileUrl = null;
	const country = null;
	const genderLabel = '-';
	const subscribeNewsletter = false;
	const verifiedAt = null;


	return {
		id,
		createdAt,
		updatedAt,
		firstName,
		lastName,
		email,
		phoneNumber,
		active,
		dateOfBirth,
		gender,
		avatarFileSize,
		avatarFileName,
		avatarFileUrl,
		country,
		genderLabel,
		subscribeNewsletter,
		verifiedAt,
	};
}

export {
	generateDefaultUser,
	generateDefaultPaginated,
};
