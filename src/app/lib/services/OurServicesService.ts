import { OurService, OurServiceDetails } from '@/app/util/types/remote-types';
import { OUR_SERVICES_URLS } from '@/app/util/url';
import GetPaginationAsync from '@/app/util/ApiClient/GetPaginationAsync';
import { QueryParams } from '@/app/util/types/local-types';
import GetAsync from '@/app/util/ApiClient/GetAsync';

const ourServicesURL = OUR_SERVICES_URLS.ALL_OUR_SERVICES;

async function getPaginationOurServices(
	locale: string,
	queryParams: QueryParams = {},
) {
	const ourServicesPagination = await GetPaginationAsync<OurService>({
		url: ourServicesURL,
		locale,
		params: queryParams,
	});
	return ourServicesPagination;
}

async function getPreviewOurServices(locale: string, queryParams: QueryParams = {}) {
	const ourServicesPagination = await GetPaginationAsync<OurService>({
		url: ourServicesURL,
		locale,
		params: queryParams,
	});
	return ourServicesPagination.items;
}

async function getSingleOurService(locale:string, slug: string) {
	const ourService = await GetAsync<OurServiceDetails>({
		url: `${ourServicesURL}/${slug}`,
		locale,
	});
	return ourService;
}

const OurServicesService = {
	getPaginationOurServices,
	getPreviewOurServices,
	getSingleOurService,
};

export default OurServicesService;
