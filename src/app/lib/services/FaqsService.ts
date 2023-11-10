import GetAsync from '@/app/util/ApiClient/GetAsync';
import { Faq, FaqCategory } from '@/app/util/types/remote-types';
import { FAQS_URLS } from '@/app/util/url';

async function getFaqCategories(locale: string) {
	const url = FAQS_URLS.CATEGORIES;
	const faqCategories = await GetAsync<FaqCategory[]>({
		url,
		locale,
	});
	return faqCategories;
}
async function getFaqs(locale: string, categoryId?: number) {
	const faqs = await GetAsync<Faq[]>({
		url: FAQS_URLS.FAQS,
		locale,
		params: {
			faqCategory: categoryId || '',
		},
	});
	return faqs;
}


const FaqsService = {
	getFaqCategories,
	getFaqs,
};


export default FaqsService;
