import GeneralPageWrapper from '@/app/components/GeneralPageWrapper';
import SectionTitle from '@/app/components/common/SectionTitle';
import { GeneralPageProp } from '@/app/util/types/local-types';
import React from 'react';
import FaqCategoriesMenu from './partials/FaqCategoriesMenu';
import FaqAccordionList from './partials/FaqAccordionList';
import { FaqProvider } from './FaqProvider';
import getDictionary from '../../../../../locale/get-dictionary';


export default async function FAQ({ params: { lang } }:GeneralPageProp) {
	const dic = await getDictionary(lang);
	return (
		<GeneralPageWrapper>
			<section
				dir="ltr"
				className="shadow-lg p-20 bg-white border-2 border-gray-200 rounded-lg flex gap-5 flex-col bg-flowers min-h-[500px]"
			>
				<SectionTitle title={dic.faq} className="text-greenish" />
				<div className="flex flex-col lg:flex-row gap-10">
					<FaqProvider lang={lang}>
						<FaqCategoriesMenu />
						<FaqAccordionList />
					</FaqProvider>
				</div>
			</section>
		</GeneralPageWrapper>
	);
}
