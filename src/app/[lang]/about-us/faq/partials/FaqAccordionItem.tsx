import { useLocaleProvider } from '@/app/components/providers/LocaleProvider';
import { calculateDir } from '@/app/util/RtlUtils';
import { Faq } from '@/app/util/types/remote-types';
import React from 'react';

interface FaqAccordionItemProp {
	item: Faq;
	isExpanded: boolean;
	onClick: (id: number)=>void;
}

export default function FaqAccordionItem({
	item, isExpanded, onClick,
}: FaqAccordionItemProp) {
	const { isRtl } = useLocaleProvider();
	const { locale } = useLocaleProvider();

	return (
		<div>
			<button
				type="button"
				className={`
                    flex gap-5 ${isRtl ? 'flex-row-reverse' : 'flex-row'}
                    ${isExpanded ? 'bg-golden text-white' : ''}
                    items-center justify-between w-full p-5 font-medium text-left text-golden-500
                    border-b-2 border-b-golden rounded-t-xl text-dark-gold hover:text-white hover:bg-golden
                `}
				onClick={() => { onClick(item.id); }}
				aria-expanded={isExpanded}
				aria-controls={`${item.id}-body`}
			>
				<span className="text-gold-500 hover:text-white">{item.question}</span>
				<svg
					className={`w-3 h-3 ${isExpanded ? '' : 'rotate-180'} transition-all duration-300 ease-in-out shrink-0`}
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 10 6"
				>
					<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5" />
				</svg>
			</button>
			<div
				id={`${item.id}-body`}
				className={`${isExpanded ? 'max-h-96' : 'max-h-0'} overflow-hidden transition-all duration-300 ease-in-out mb-1`}
				aria-labelledby={item.id.toString()}
			>
				<div className="p-5 border-b-2 border-golden" dir={calculateDir(locale)}>
					{item.answer}
				</div>
			</div>
		</div>
	);
}
