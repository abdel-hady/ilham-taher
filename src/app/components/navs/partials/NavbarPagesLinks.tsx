import React from 'react';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useLocaleProvider } from '../../providers/LocaleProvider';
import { usePreviewDataProvider } from '../../providers/PreviewDataProvider';
import CustomPopover from './CustomPopover';

export default function NavbarPagesLinks() {
	const path = usePathname();
	const t = useTranslations();
	const { makeLocaleUrl, locale } = useLocaleProvider();

	const {
		sessions, blogs, courses, ourServices,
	} = usePreviewDataProvider();

	const sessionsList = [
		...sessions.slice(0, 5).map((session) => ({ title: session.name, link: makeLocaleUrl(`/sessions/${session.slug}`) })),
		{ title: t('find_your_session_page'), link: makeLocaleUrl('/find-your-session') },
	];
	const coursesList = courses.slice(0, 5).map((course) => ({ title: course.name, link: makeLocaleUrl(`/courses/${course.slug}`) }));
	const blogsList = blogs.map((blog) => ({ title: blog.title, link: makeLocaleUrl(`/blogs/${blog.slug}`) }));
	const aboutList = [
		{
			title: t('about_ilhem'),
			link: makeLocaleUrl('/about-us/ilhem-taher'),
		},
		{
			title: t('the_new_childhood_association'),
			link: makeLocaleUrl('/about-us/new-me-child-charity'),
		},
		{
			title: t('faq'),
			link: makeLocaleUrl('/about-us/faq'),
		},
	];
	const ourServicesList = ourServices.slice(0, 5).map((ourService) => ({
		title: ourService.title,
		link: makeLocaleUrl(`/our-services/${ourService.slug}`),
	}));

	return (
		<div className={`flex gap-2  ${locale === 'fr' ? 'w-9/12' : 'w-[70%]'}`}>
			<CustomPopover
				titleKey="home"
				link={makeLocaleUrl('home')}
				isActive={path.includes('home')}
				list={[]}
			/>
			<CustomPopover
				titleKey="courses"
				link={makeLocaleUrl('courses')}
				isActive={path.includes('courses')}
				list={coursesList}
			/>
			<CustomPopover
				titleKey="sessions"
				link={makeLocaleUrl('sessions')}
				isActive={path.includes('sessions')}
				list={sessionsList}
			/>
			<CustomPopover
				titleKey="blogs"
				link={makeLocaleUrl('blogs')}
				isActive={path.includes('blogs')}
				list={blogsList}
			/>
			<CustomPopover
				titleKey="our_services"
				link={makeLocaleUrl('/our-services')}
				isActive={path.includes('our-services')}
				list={ourServicesList}
			/>
			<CustomPopover
				titleKey="about_us"
				isActive={path.includes('about-us')}
				list={aboutList}
			/>
		</div>
	);
}
