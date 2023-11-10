import GeneralPageWrapper from '@/app/components/GeneralPageWrapper';
import parseImageUrl from '@/app/util/parseImageUrl';
import Image from 'next/image';
import React from 'react';
import { notFound, redirect } from 'next/navigation';
import { calculateDir } from '@/app/util/RtlUtils';
import { DetailsWithSlugPageProps } from '@/app/util/types/local-types';
import OurServicesService from '@/app/lib/services/OurServicesService';
import CustomVimeoPlayer from '../../courses/[slug]/partials/Hero/CustomVimeoPlayer';


export default async function OurServiceSinglePage({
	params: { lang, slug },
}:DetailsWithSlugPageProps) {
	const fetchedOurService = await OurServicesService.getSingleOurService(lang, slug);

	if (!fetchedOurService) {
		notFound();
	}

	if (slug !== encodeURIComponent(fetchedOurService.slug)) {
		redirect(`/${lang}/our-services/${fetchedOurService.slug}`);
	}


	let MEDIA_COMPONENT = null;
	if (fetchedOurService.contentType.value === 'IMAGE') {
		MEDIA_COMPONENT = (
			<Image
				width={1000}
				height={1000}
				alt={`${fetchedOurService.title} cover image`}
				src={parseImageUrl(fetchedOurService.internalImageUrl)}
				className="object-cover rounded-lg"
				style={{ height: '400px' }}
			/>
		);
	} else {
		MEDIA_COMPONENT = (
			<CustomVimeoPlayer videoId={fetchedOurService.videoVimeoId!.toString()} />
		);
	}


	return (
		<GeneralPageWrapper>
			<div id="modal" />
			<section dir={calculateDir(lang)} className="shadow-lg py-4 md:py-10 bg-white border-2 border-gray-200 rounded-lg bg-flowers">
				<div className="mx-auto flex flex-col items-center gap-16 w-11/12 md:w-2/3">
					{MEDIA_COMPONENT}
					<div className="w-full flex flex-col gap-6 text-greenish">
						<h3 className=" text-3xl font-bold">{fetchedOurService.title}</h3>
						<p className="" dangerouslySetInnerHTML={{ __html: fetchedOurService.content }} />
					</div>
				</div>
			</section>
		</GeneralPageWrapper>

	);
}
