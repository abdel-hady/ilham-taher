'use client';

import GeneralPageWrapper from '@/app/components/GeneralPageWrapper';
import React, { useEffect, useState } from 'react';
import NoData from '@/app/components/fail/NoData';
import SearchBox from '@/app/components/search-box';
import { OurService } from '@/app/util/types/remote-types';
import OurServicesService from '@/app/lib/services/OurServicesService';
import OurServiceCard from '@/app/components/our-services/OurServiceCard';

export default function OurServicesPage({ params: { lang } }: { params: { lang: string } }) {
	const [ourServices, setOurServices] = useState<OurService[]>([]);
	const [isFetching, setIsFetching] = useState<boolean>(true);
	useEffect(() => {
		async function fetchInitalOurServices() {
			setIsFetching(true);
			const fetchedOurServices = await OurServicesService.getPaginationOurServices(lang);
			setOurServices(fetchedOurServices.items);
			setIsFetching(false);
		}
		fetchInitalOurServices();
	}, []);

	const handleSearch = (keyword: string) => {
		setIsFetching(true);
		OurServicesService.getPaginationOurServices(lang, { search: keyword })
			.then((data) => {
				setOurServices(data.items);
				setIsFetching(false);
			});
	};

	return (
		<GeneralPageWrapper>
			<SearchBox handleSearch={handleSearch} />

			{
				isFetching
				&& (
					<div className="w-full min-h-[200px] flex justify-center items-center text-golden">
						<span className="loading loading-lg loading-spinner" />
					</div>
				)
			}
			{
				!isFetching
				&& (

					<section className="bg-white">
						{
							ourServices.length > 0
								? ourServices.map((ourService) => (
									<div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
										<OurServiceCard
											title={ourService.title}
											externalImageUrl={ourService.externalImageUrl}
											slug={ourService.slug}
										/>
									</div>


								))
								:									(
									<div className="w-full min-h-[500px]">
										<NoData />
									</div>
								)
						}
					</section>
				)
			}
		</GeneralPageWrapper>
	);
}
