'use client';

import FaqsService from '@/app/lib/services/FaqsService';
import { Faq, FaqCategory } from '@/app/util/types/remote-types';
import React, {
	createContext, useContext, useEffect, useMemo, useState,
} from 'react';

interface FaqProviderProps {
	lang: string;
	children: React.ReactNode;
}

interface FaqContextType {
	categories: FaqCategory[];
	faqs: Faq[];
	selectedCategory: number | null;
	setSelectedCategory: React.Dispatch<React.SetStateAction<number | null>>;
	isFaqsLoaded: boolean;
	isCategoriesLoaded: boolean;
}

const FaqContext = createContext<FaqContextType>({
	categories: [],
	faqs: [],
	selectedCategory: null,
	setSelectedCategory: () => {},
	isFaqsLoaded: false,
	isCategoriesLoaded: false,
});

export function FaqProvider({ lang, children }: FaqProviderProps) {
	const [categories, setCategories] = useState<FaqCategory[]>([]);
	const [faqs, setFaqs] = useState<Faq[]>([]);
	const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

	const [isCategoriesLoaded, setIsCategoriesLoaded] = useState<boolean>(false);
	const [isFaqsLoaded, setIsFaqsLoaded] = useState<boolean>(false);

	useEffect(() => {
		async function fetchInitialData() {
			try {
				const fetchedCategories = await FaqsService.getFaqCategories(lang) || [];

				const firstCategoryId = fetchedCategories[0]?.id || undefined;

				const fetchedFaqs = await FaqsService.getFaqs(lang, firstCategoryId) || [];

				setSelectedCategory(fetchedCategories[0]?.id);
				setCategories(fetchedCategories);
				setFaqs(fetchedFaqs);
				setIsCategoriesLoaded(true);
				setIsFaqsLoaded(true);
			} catch (error) {
				setCategories([]);
				setFaqs([]);
				setIsCategoriesLoaded(true);
				setIsFaqsLoaded(true);
			}
		}

		fetchInitialData();
	}, [lang]);

	useEffect(() => {
		if (!selectedCategory) {
			return;
		}

		async function fetchNewFaqs() {
			try {
				setIsFaqsLoaded(false);

				const fetchedFaqs = await FaqsService.getFaqs(lang, selectedCategory!) || [];

				setFaqs(fetchedFaqs);
				setIsFaqsLoaded(true);
			} catch (error) {
				setFaqs([]);
				setIsFaqsLoaded(true);
			}
		}
		fetchNewFaqs();
	}, [selectedCategory]);

	const contextValue = useMemo(() => ({
		categories,
		faqs,
		selectedCategory,
		setSelectedCategory,
		isFaqsLoaded,
		isCategoriesLoaded,
	}), [categories, faqs, selectedCategory, isFaqsLoaded, isCategoriesLoaded]);

	return (
		<FaqContext.Provider value={contextValue}>
			{children}
		</FaqContext.Provider>
	);
}

export const useFaqsProvider = (): FaqContextType => useContext(FaqContext);
