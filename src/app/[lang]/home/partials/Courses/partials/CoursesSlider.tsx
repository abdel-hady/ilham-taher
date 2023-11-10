'use client';

import CourseCard from '@/app/components/course/CourseCard';
import parseImageUrl from '@/app/util/parseImageUrl';
import { Course } from '@/app/util/types/remote-types';
import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

interface CourseSliderProps { courses:Course[] }

export default function CoursesSlider({ courses }: CourseSliderProps) {
	const items = courses.map((course) => (
		<CourseCard
			key={course.id}
			title={course.name}
			// id={course.id}
			coverImg={parseImageUrl(course.featureImageUrl)}
			type=""
			slug={course.slug}
			isFree={course.free}
		/>
	));
	const getInnerWidth = () => {
		try {
			// if client
			return window.innerWidth;
		} catch (_) {
			// if server, set any desired value
			return 1024;
		}
	};

	return (
		<AliceCarousel
			autoPlay
			autoPlayInterval={3000}
			animationDuration={1000}
			disableButtonsControls
			innerWidth={getInnerWidth()}
			responsive={{
				0: { items: 1 },
				768: { items: 2 },
				1024: { items: 3 },
			}}
			infinite={items.length > 3}
			disableDotsControls
			mouseTracking
			items={items}
		/>
	);
}
