import GeneralPageWrapper from '@/app/components/GeneralPageWrapper';
import EaseInFromRight from '@/app/components/animation/EaseInFromRight';
import React from 'react';
import OptionsService from '@/app/lib/services/OptionsService';
import { GeneralPageProp } from '@/app/util/types/local-types';
import UsersService from '@/app/lib/services/UsersService';
import { redirect } from 'next/navigation';
import RegisterForm from './partials/RegisterForm';
import getDictionary from '../../../../../locale/get-dictionary';


export default async function Register({ params: { lang } }: GeneralPageProp) {
	const user = await UsersService.getProfile(lang);
	if (user) {
		redirect(`/${lang}/home`);
	}

	const [genderOptions, countryOptions] = await Promise.all([
		OptionsService.getGenderOptions(lang),
		OptionsService.getCountryOptions(lang),
	]);
	const dic = await getDictionary(lang);
	console.log('count', countryOptions);
	return (
		<GeneralPageWrapper>
			<div
				dir="ltr"
				className=" shadow-lg bg-white rounded-lg p-10 flex flex-col gap-10 border-2 border-gray-200 bg-flowers"
			>
				<h2 className="text-center text-5xl">
					{dic.register_page}
				</h2>
				<EaseInFromRight
					className="w-full lg:w-10/12 mx-auto"
					parentInView
				>
					<RegisterForm genderOptions={genderOptions!} countries={countryOptions!} />
				</EaseInFromRight>
			</div>
		</GeneralPageWrapper>
	);
}
