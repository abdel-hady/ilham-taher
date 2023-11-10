'use client';

import { useTranslations } from 'next-intl';
import React, { useRef } from 'react';
import { calculateDir } from '../util/RtlUtils';
import { useLocaleProvider } from './providers/LocaleProvider';

interface SearchBoxProps {
	handleSearch: (keyword: string) => void;
}

export default function SearchBox({ handleSearch }: SearchBoxProps) {
	const t = useTranslations();
	const inputRef = useRef<HTMLInputElement>(null);
	const { locale } = useLocaleProvider();

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const keyword = inputRef.current?.value || '';
		handleSearch(keyword);
	};

	return (
		<div dir="ltr" className="flex justify-center">
			<div className="w-full">
				<form onSubmit={handleSubmit}>
					<div className="input-group relative flex items-stretch w-full p-10 sm:p-0 sm:w-2/3 md:w-1/2 mx-auto my-3">
						<input
							ref={inputRef}
							type="search"
							dir={calculateDir(locale)}
							className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5
								text-xl font-normal text-dark-green bg-white bg-clip-padding border border-solid border-gray-300
								rounded-l transition ease-in-out m-0 focus:text-dark-green focus:bg-white focus:border-dark-gold focus:outline-none
								"
							placeholder={t('search')}
							aria-label="Search"
							aria-describedby="button-addon2"
						/>
						<button
							className="btn px-6 py-2.5
								font-medium text-xs leading-tight uppercase
								rounded-r shadow-md
								bg-greenish text-white
								hover:bg-dark-green hover:shadow-lg
								focus:bg-dark-green focus:shadow-lg
								active:bg-dark-green active:shadow-lg transition duration-150 ease-in-out
								focus:outline-none focus:ring-0
								flex items-center
								"
							type="submit"
							id="button-addon2"
						>
							<svg
								aria-hidden="true"
								focusable="false"
								data-prefix="fas"
								data-icon="search"
								className="w-4"
								role="img"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 512 512"
							>
								<path
									fill="currentColor"
									d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
								/>
							</svg>
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
