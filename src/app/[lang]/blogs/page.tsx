'use client';

import GeneralPageWrapper from '@/app/components/GeneralPageWrapper';
import BlogCard from '@/app/components/blogs/BlogCard';
import NoData from '@/app/components/fail/NoData';
import BlogsService from '@/app/lib/services/BlogsService';
import { GeneralPageProp } from '@/app/util/types/local-types';
import React, { useEffect, useState } from 'react';
import { Blog } from '@/app/util/types/remote-types';
import SearchBox from '@/app/components/search-box';

export default function BlogsPage({ params: { lang } }: GeneralPageProp) {
	const [blogs, setBlogs] = useState<Blog[]>([]);
	const [isFetching, setIsFetching] = useState<boolean>(true);

	useEffect(() => {
		async function fetchInitalBlogs() {
			setIsFetching(true);
			const fetchedBlogs = await BlogsService.getPaginationBlogs(lang);
			setBlogs(fetchedBlogs.items);
			setIsFetching(false);
		}
		fetchInitalBlogs();
	}, []);

	const handleSearch = (keyword: string) => {
		setIsFetching(true);
		BlogsService.getPaginationBlogs(lang, { search: keyword })
			.then((data) => {
				setBlogs(data.items);
				setIsFetching(false);
			});
	};

	return (
		<GeneralPageWrapper>
			<SearchBox handleSearch={handleSearch} />
			<div className="z-10 min-h-[500px] bg-white">
				{
					isFetching
					&& (
						<div className="w-full min-h-[200px] flex justify-center items-center text-golden">
							<span className="loading loading-lg loading-spinner" />
						</div>
					)
				}

				{
					!isFetching && (

						blogs.length > 0
							? 					(
								<section className="grid grid-cols-1 lg:grid-cols-2 gap-12 ">
									{blogs.map((blog) => (
										<div key={blog.id} className="">
											<BlogCard
												slug={blog.slug}
												title={blog.title}
												imageFileUrl={blog.imageFileUrl}
												createdAt={blog.createdAt}
											/>
										</div>
									))}
								</section>
							)
							: (
								<div className="w-full min-h-[500px]">
									<NoData />
								</div>
							)
					)
				}
			</div>
		</GeneralPageWrapper>
	);
}
