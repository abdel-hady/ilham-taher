import React from 'react';
import SessionsService from '@/app/lib/services/SessionsService';
import CharitySlidersService from '@/app/lib/services/CharitySlidersService';
import CoursesService from '@/app/lib/services/CoursesService';
import ChildrenSection from './partials/ChildrenSection';
import ReviewSection from './partials/ReviewSection';
import SessionSectionV2 from './partials/Sessions/SessionsSectionV2';
import getDictionary from '../../../../locale/get-dictionary';
import HeroSection from './partials/Hero/HeroSection';
import CoursesSection from './partials/Courses/CoursesSection';
import PodcastSection from './partials/PodcastSection';
// import LogoWithFlowerSmallScreen from './partials/Hero/LogoWithFlowerSmallScreen';
import VipSessionsSections from './partials/Sessions/Vip/VipSessionsSection';

export default async function Page({ params: { lang } }: { params: { lang: string } }) {
	const dic = await getDictionary(lang);
	const [
		courses,
		sessions,
		sliders,
		sessionsReviews,
		courseReviews,
		vipSessions,
	] = await Promise.all([
		CoursesService.getPreviewCourses(lang),
		SessionsService.getPreviewSessions(lang),
		CharitySlidersService.getSliders(lang),
		SessionsService.getInHomeSessionReviews(lang),
		CoursesService.getInHomeCourseReviews(lang),
		SessionsService.getVipSessionsList(lang),
	]);

	function addLastOneToSlider() {
		sliders.push({
			id: 1000,
			counter: null,
			description: null,
			numberUnit: '',
			title: 'contact_us_charity',
		});
	}
	addLastOneToSlider();

	return (

		<main
			className="flex flex-col gap-10 relative py-10 text-greenish"
		>
			<HeroSection />
			{/* <HeroSection className="hidden md:block" /> */}
			{/* <LogoWithFlowerSmallScreen className="md:hidden" /> */}
			<div className="container flex flex-col gap-10 bg-white">
				<ChildrenSection sliders={sliders} />
				<CoursesSection title={dic.our_courses} coursesList={courses} />
				<SessionSectionV2 title={dic.our_sessions} sessionsList={sessions} />
				<VipSessionsSections vipSessionsList={vipSessions} />
				<ReviewSection
					title={dic.our_reviews}
					reviews={[...sessionsReviews.items, ...courseReviews.items]}
				/>
				<PodcastSection title={dic.our_podcasts} />
			</div>

		</main>
	);
}
