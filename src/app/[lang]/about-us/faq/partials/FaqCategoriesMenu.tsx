'use client';

import React from 'react';
import { useFaqsProvider } from '../FaqProvider';

export default function FaqCategoriesMenu() {
	const {
		categories, setSelectedCategory, selectedCategory, isCategoriesLoaded,
	} = useFaqsProvider();

	const handleClick = (categoryId: number) => {
		setSelectedCategory(categoryId);
	};
	if (!isCategoriesLoaded) {
		return (
			<div className="w-full lg:w-[30%] min-h-[200px] flex justify-center items-center text-golden">
				<span className="loading loading-lg loading-spinner" />
			</div>
		);
	}

	return (
		<div className="w-full lg:w-[30%] h-fit border-2 border-golden text-center rounded-lg">
			{categories.map((category) => (
				<button
					type="button"
					key={category.id}
					onClick={() => handleClick(category.id)}
					className={`
						block w-full border-b p-4 border-golden hover:text-white
						${selectedCategory === category.id ? 'bg-golden text-white' : 'text-greenish'}
						hover:bg-golden
						cursor-pointer
					`}
				>
					{category.name}
				</button>
			))}
		</div>
	);
}
