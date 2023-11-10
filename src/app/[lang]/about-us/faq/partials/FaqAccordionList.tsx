'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import FaqAccordionItem from './FaqAccordionItem';
import { useFaqsProvider } from '../FaqProvider';

export default function FaqAccordionList() {
	const { faqs, isFaqsLoaded } = useFaqsProvider();
	const [openAccordionId, setOpenAccordionId] = useState<number | null>(null);
	const t = useTranslations();
	const handleClick = (id: number) => {
		if (id === openAccordionId) {
			setOpenAccordionId(null);
		} else {
			setOpenAccordionId(id);
		}
	};


	if (!isFaqsLoaded) {
		return (
			<div className="w-full lg:w-[70%] flex items-center justify-center text-golden">
				<span className="loading loading-lg loading-spinner" />
			</div>
		);
	}

	if (faqs.length <= 0) {
		return (
			<div className="w-full lg:w-[70%] flex items-center justify-center">
				<span>
					{t('no_data')}
				</span>
			</div>
		);
	}

	return (
		<div id="accordion-color" className="w-full lg:w-[70%]">
			{faqs.map((faq) => (
				<FaqAccordionItem
					key={faq.id}
					item={faq}
					isExpanded={openAccordionId === faq.id}
					onClick={handleClick}
				/>
			))}
		</div>
	);
}
