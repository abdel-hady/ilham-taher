'use client';

import React from 'react';
import 'react-alice-carousel/lib/alice-carousel.css';
import { Course } from '@/app/util/types/remote-types';
import SectionTitle from '@/app/components/common/SectionTitle';
import CoursesSlider from './partials/CoursesSlider';

interface CoursesSectionProps { title: string, coursesList:Course[] }

export default function CoursesSection({ title, coursesList }: CoursesSectionProps): JSX.Element {
	return (
		<section id="courses-section" className="w-full flex flex-col gap-5">
			<SectionTitle title={title} />
			<CoursesSlider courses={coursesList} />
		</section>
	);
}
