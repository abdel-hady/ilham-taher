/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/control-has-associated-label */
import GeneralPageWrapper from '@/app/components/GeneralPageWrapper';
import CoursesService from '@/app/lib/services/CoursesService';
import { DetailsWithSlugPageProps } from '@/app/util/types/local-types';
import { notFound, redirect } from 'next/navigation';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard, faEuro } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import parseImageUrl from '@/app/util/parseImageUrl';
import CustomStripe from './partials/CustomStripe';
import getDictionary from '../../../../../../locale/get-dictionary';
import CustomPaypal from './partials/CustomPaypal';

export default async function CheckoutCoursePage(
	{ params: { slug, lang } }: DetailsWithSlugPageProps,
) {
	const course = await CoursesService.getSingleCourseBySlug(lang, slug);
	const dic = await getDictionary(lang);

	if (!course) {
		notFound();
	}

	const isEnrolledRes = await CoursesService.isEnrolledInCourse(course.id!);

	if (isEnrolledRes?.isEnrolled) {
		redirect(`/courses/${slug}`);
	}

	return (
		<GeneralPageWrapper>

			<div className="border-2 border-gray-200 rounded-lg shadow-lg p-24 bg-white flex flex-col gap-10">
				<div className="flex flex-col text-center items-center">
					<FontAwesomeIcon icon={faCreditCard} size="3x" />
					<h1 className="text-center text-2xl">
						{dic.checkout_page}
					</h1>
					<p className="text-lg">
						{dic.checkout_page_text}
					</p>
				</div>


				<div className="grid grid-cols-2 gap-5">
					<div className="p-5 py-10 border-2 border-gray-200 rounded-lg">
						<CustomPaypal courseId={course.id} courseSlug={course.slug} />
						<div className="divider">OR</div>
						<CustomStripe courseId={course.id} courseSlug={course.slug} />
					</div>
					<div className="flex flex-col p-5 py-10 border-2 border-gray-200 rounded-lg">
						<Image
							width={1000}
							height={1000}
							alt={`${course.name} cover image`}
							src={parseImageUrl(course.featureImageUrl)}
							className="rounded-lg w-4/5 mx-auto object-cover"
						/>

						<div className="overflow-x-auto">
							<table className="table table-zebra">
								<tbody>
									<tr className="bg-gray-100" style={{ borderBottom: '1px solid rgb(201 201 201)' }}>
										<th className="text-center">
											{dic.course_name}
										</th>
										<td className="text-center">{course.name}</td>
									</tr>
									<tr className="bg-gray-100">
										<th className="text-center">
											{dic.course_price}
										</th>
										<td className="text-center">{`${course.price} EUR`} <FontAwesomeIcon icon={faEuro} /></td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>


		</GeneralPageWrapper>
	);
}
