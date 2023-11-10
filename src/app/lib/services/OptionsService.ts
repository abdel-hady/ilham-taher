import { Option } from '@/app/components/input/data';
import GetAsync from '@/app/util/ApiClient/GetAsync';
import { Country } from '@/app/util/types/remote-types';
import { OPTIONS_URLS } from '@/app/util/url';

async function getCountryOptions(locale: string) {
	const url = OPTIONS_URLS.COUNTRIES;
	const countries = await GetAsync<Country[]>({
		url,
		locale,
	});
	return countries;
}

async function getGenderOptions(locale: string) {
	const url = OPTIONS_URLS.GENDERS;
	const genders = await GetAsync<Option[]>({
		url,
		locale,
	});
	return genders;
}


const OptionsService = {
	getCountryOptions,
	getGenderOptions,
};

export default OptionsService;
