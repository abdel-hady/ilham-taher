'use client';

import React from 'react';
import CourseCard from '@/app/components/course/CourseCard';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

interface Course {
	title: string;
	type: string;
	id: number;
	coverImg: string;
}

export default function CoursesSection(): JSX.Element {
	const courses: Course[] = [
		{
			title: 'Course 1',
			type: 'Workshop',
			id: 1,
			coverImg: '/assets/images/course-default.jpg',
		},
		{
			title: 'Course 2',
			type: 'Workshop',
			id: 2,
			coverImg: '/assets/images/course-default.jpg',
		},
		{
			title: 'Course 3',
			type: 'Workshop',
			id: 3,
			coverImg: '/assets/images/course-default.jpg',
		},
		{
			title: 'Course 4',
			type: 'Workshop',
			id: 4,
			coverImg: '/assets/images/course-default.jpg',
		},
	];
	const items = courses.map((course) => (
		<CourseCard
			key={course.id}
			title={course.title}
			id={course.id}
			coverImg={course.coverImg}
			type={course.type}
		/>
	));

	return (
		<section className=" container mx-auto w-full flex flex-col gap-5">
			<h2 className="text-center text-4xl font-bold">Our Courses</h2>
			<AliceCarousel
				autoPlay
				autoPlayInterval={3000}
				animationDuration={1000}
				disableButtonsControls
				responsive={{
					0: { items: 1 },
					768: { items: 2 },
					1024: { items: 3 },
					// 1280: {
					// 	items: 4,
					// 	itemsFit: 'contain',
					// },
				}}
				disableDotsControls
				mouseTracking
				items={items}
				controlsStrategy="alternate"
			/>
		</section>
	);
}
