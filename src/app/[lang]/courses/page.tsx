'use client';

import React, { useEffect, useState } from 'react';
import GeneralPageWrapper from '@/app/components/GeneralPageWrapper';
import CourseCard from '@/app/components/course/CourseCard';
import CoursesService from '@/app/lib/services/CoursesService';
import { GeneralPageProp } from '@/app/util/types/local-types';
import parseImageUrl from '@/app/util/parseImageUrl';
import SearchBox from '@/app/components/search-box';
import { Course } from '@/app/util/types/remote-types';
import NoData from '@/app/components/fail/NoData';

export default function Courses({ params }: GeneralPageProp) {
	const [courses, setCourses] = useState<Course[]>([]);
	const [isFetching, setIsFetching] = useState<boolean>(true);

	const handleSearch = (keyword: string) => {
		setIsFetching(true);
		CoursesService.getPaginationCourses(params.lang, { search: keyword })
			.then((data) => {
				setCourses(data.items);
				setIsFetching(false);
			});
	};

	useEffect(() => {
		async function fetchInitalCourses() {
			setIsFetching(true);
			const fetchedCourses = await CoursesService.getPaginationCourses(params.lang);
			setCourses(fetchedCourses.items);
			setIsFetching(false);
		}
		fetchInitalCourses();
	}, []);

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
				!isFetching && (

					courses.length > 0
						? 					(
							<section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
								{courses.map((course) => (
									<CourseCard
										key={course.id}
										title={course.name}
										coverImg={parseImageUrl(course.featureImageUrl)}
										type=""
										slug={course.slug}
										isFree={course.free}
									/>
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
		</GeneralPageWrapper>
	);
}
