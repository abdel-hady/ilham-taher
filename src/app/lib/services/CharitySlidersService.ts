import GetPaginationAsync from '@/app/util/ApiClient/GetPaginationAsync';
import { CharitySlider } from '@/app/util/types/remote-types';
import { CHARITY_URLS } from '@/app/util/url';

async function getSliders(locale: string) {
	const url = CHARITY_URLS.SLIDERS;
	const sliders = await GetPaginationAsync<CharitySlider>({
		url,
		locale,
		params: {
			pageSize: 50,
		},
	});
	return sliders.items;
}

const CharitySlidersService = {
	getSliders,
};

export default CharitySlidersService;
