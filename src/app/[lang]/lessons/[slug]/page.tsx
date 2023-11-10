/* eslint-disable react/no-danger */
import GeneralPageWrapper from '@/app/components/GeneralPageWrapper';
import LessonsService from '@/app/lib/services/LessonsService';
import { calculateDir } from '@/app/util/RtlUtils';
import parseImageUrl from '@/app/util/parseImageUrl';
import { DetailsWithSlugPageProps } from '@/app/util/types/local-types';
import Image from 'next/image';
import { notFound, redirect } from 'next/navigation';
import React from 'react';
import UsersService from '@/app/lib/services/UsersService';
import CustomVimeoPlayer from '../../courses/[slug]/partials/Hero/CustomVimeoPlayer';
import AttachmentWithDownloadButton from './partials/AttachmentWithDownloadButton';
import LessonHeader from './partials/LessonHeader';
import CustomAudioPlayer from './partials/CustomAudioPlayer';

export default async function LesssonPage({ params: { slug, lang } }: DetailsWithSlugPageProps) {
	const user = await UsersService.getProfile(lang);

	if (!user) {
		redirect('/auth/login');
	}

	const lesson = await LessonsService.getSingleLessonBySlug(lang, slug);

	if (!lesson) {
		notFound();
	}

	if (slug !== encodeURIComponent(lesson.slug)) {
		redirect(`/${lang}/lessons/${lesson.slug}`);
	}


	const lessonType = lesson.type.value;


	const attachement = lesson.attachmentFileUrl;
	const ATTACHMENT_COMPONENT = (
		<div>
			{attachement && (
				<AttachmentWithDownloadButton
					attachmentFilename={lesson.attachmentFileName}
					attachmentUrl={lesson.attachmentFileUrl}
				/>
			)}

		</div>
	);

	let TOP_COMPONENT = null;

	if (lessonType === 'ARTICLE') {
		TOP_COMPONENT = (
			<section dir={calculateDir(lang)} className="shadow-lg py-4 md:py-10 bg-white border-2 border-gray-200 rounded-lg bg-flowers">
				<div className="mx-auto flex flex-col items-center gap-16 w-11/12 md:w-2/3">
					<LessonHeader courseId={lesson.course.slug} />
					<div className="w-full flex flex-col gap-3 md:gap-6 text-gray-500">
						<h3 className=" text-3xl font-bold">{lesson.title}</h3>
						<p dangerouslySetInnerHTML={{ __html: lesson.description }} />
						<Image
							width={1000}
							height={1000}
							alt=" cover image"
							src={parseImageUrl(lesson.featureImageUrl)}
							className="object-cover rounded-lg"
							style={{ height: '600px', objectFit: 'scale-down' }}
						/>
						<div dangerouslySetInnerHTML={{ __html: lesson.content }} />
					</div>
					{ATTACHMENT_COMPONENT}


				</div>
			</section>
		);
	} else if (lessonType === 'VIDEO') {
		TOP_COMPONENT = (
			<section dir={calculateDir(lang)} className="shadow-lg py-4 md:py-10 bg-white border-2 border-gray-200 rounded-lg bg-flowers">
				<div className="mx-auto flex flex-col items-center gap-16 w-11/12 md:w-2/3">
					<LessonHeader courseId={lesson.course.slug} />

					<div className="w-full flex flex-col gap-3 md:gap-6 text-gray-500">
						<h3 className=" text-3xl font-bold">{lesson.title}</h3>
						<p dangerouslySetInnerHTML={{ __html: lesson.description }} />
						<div className="w-full rounded-lg overflow-auto">
							<CustomVimeoPlayer videoId={lesson.videoVimeoId.toString()} />
						</div>
						<div dangerouslySetInnerHTML={{ __html: lesson.content }} />


					</div>
					{ATTACHMENT_COMPONENT}
				</div>
			</section>
		);
	} else { // audio
		TOP_COMPONENT = (
			<section dir={calculateDir(lang)} className="shadow-lg py-4 md:py-10 bg-white border-2 border-gray-200 rounded-lg bg-flowers">
				<div className="mx-auto flex flex-col items-center gap-16 w-11/12 md:w-2/3">
					<LessonHeader courseId={lesson.course.slug} />

					<div className="w-full flex flex-col gap-3 md:gap-6 text-gray-500">
						<h3 className=" text-3xl font-bold">{lesson.title}</h3>
						<p dangerouslySetInnerHTML={{ __html: lesson.description }} />
						<div className="w-full rounded-lg overflow-auto">
							<CustomAudioPlayer audioUrl={lesson.audioUrl} />
						</div>
						<div dangerouslySetInnerHTML={{ __html: lesson.content }} />

					</div>
					{ATTACHMENT_COMPONENT}
				</div>
			</section>
		);
	}


	return (
		<GeneralPageWrapper>
			<div id="modal" />
			{TOP_COMPONENT}
		</GeneralPageWrapper>
	);
}
