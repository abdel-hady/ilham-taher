import React from 'react';
import CourseCard from '@/app/components/course/CourseCard';
import { useProfilePageProvider } from '@/app/components/providers/ProfilePageProvider';
import parseImageUrl from '@/app/util/parseImageUrl';

export default function CoursesTab() {
	const { userCourses } = useProfilePageProvider();
	return (
		<div className="grid grid-cols-1 gap-4 mt-8 md:grid-cols-2">
			{userCourses.map((course) => (
				<CourseCard
					key={course.id}
					title={course.course.name}
					coverImg={parseImageUrl(course.course.featureImageUrl)}
					type=""
					slug={course.course.slug}
				/>
			))}
		</div>
	);
}
