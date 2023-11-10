import GeneralPageWrapper from '@/app/components/GeneralPageWrapper';
import EaseInFromLeft from '@/app/components/animation/EaseInFromLeft';
import EaseInFromRight from '@/app/components/animation/EaseInFromRight';
import IconsDisplayer from '@/app/components/common/IconsDisplayer';
import BlogsService from '@/app/lib/services/BlogsService';
import DateParser from '@/app/util/DateParser';
import { calculateDir } from '@/app/util/RtlUtils';
import parseImageUrl from '@/app/util/parseImageUrl';
import { DetailsWithSlugPageProps } from '@/app/util/types/local-types';
import { Metadata } from 'next';
import Image from 'next/image';
import { notFound, redirect } from 'next/navigation';
import React from 'react';
import getDictionary from '../../../../../locale/get-dictionary';


export async function generateMetadata(
	{ params: { slug, lang } }: DetailsWithSlugPageProps,
): Promise<Metadata> {
	const [dictionary, blog] = await Promise.all([
		getDictionary(lang),
		BlogsService.getSingleBlog(lang, slug),
	]);

	if (!blog) {
		return {
			title: dictionary.website_title,
		};
	}

	return {
		title: `${dictionary.website_title} | ${blog.title}`,
		keywords: blog.metaDataKeyword,
		description: blog.metaDataDescription,
	};
}

export default async function SingleBlogPage({ params: { lang, slug } }: DetailsWithSlugPageProps) {
	const blog = await BlogsService.getSingleBlog(lang, slug);

	if (!blog) {
		notFound();
	}

	if (slug !== encodeURIComponent(blog.slug)) {
		redirect(`/${lang}/blogs/${blog.slug}`);
	}

	return (
		<GeneralPageWrapper>
			<div
				className="
					flex flex-col
					shadow-lg border-2 border-gray-200 rounded-lg overflow-hidden
					p-4 lg:p-24 bg-white
					bg-flowers
				"
				dir="ltr"
			>
				<EaseInFromRight parentInView className="w-full rounded-lg flex flex-col gap-8">
					<Image
						width={1000}
						height={1000}
						src={parseImageUrl(blog.imageFileUrl)}
						className="w-full rounded-lg lg:object-contain lg:h-[600px]"
						alt={`${blog.title} cover image`}
					/>
					<IconsDisplayer
						iconUrls={blog.icons}
						withLabels
						imageClassName="lg:w-20 lg:h-20"
					/>
				</EaseInFromRight>
				<EaseInFromLeft parentInView className="lg:py-8 xl:p-16 ">
					<div dir={calculateDir(lang)} className="flex flex-col gap-3">
						<h3 className="font-bold text-3xl text-greenish capitalize">{blog.title}</h3>
						<p className="text-lg text-gray-500">{DateParser.toDayMonthYear(blog.createdAt)}</p>
						<p className="text-xl leading-5 text-greenish" dangerouslySetInnerHTML={{ __html: blog.content }} />
					</div>
				</EaseInFromLeft>
			</div>
		</GeneralPageWrapper>
	);
}
