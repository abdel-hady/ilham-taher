'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Lesson } from '@/app/util/types/remote-types';
import { useLocaleProvider } from '@/app/components/providers/LocaleProvider';
import LessonWideCard from '@/app/components/lessons/LessonWideCard';
import NeedToPurchaseCourse from '@/app/components/common/NeedToPurchaseCourse';
import { useAuth } from '@/app/components/providers/AuthProvider';
import ShouldLoginModal from '@/app/components/common/modals/ShouldLoginModal';
import useModal from '@/app/hooks/useModal';
import NoData from '@/app/components/fail/NoData';
import SectionTitle from '@/app/components/common/SectionTitle';

interface LessonsSectionProps {
	lessons: Lesson[];
	isEnrolled: boolean;
}
export default function LessonsSection({ lessons, isEnrolled }: LessonsSectionProps) {
	const t = useTranslations();
	const { makeLocaleUrl } = useLocaleProvider();
	const { isLoggedIn } = useAuth();

	const {
		isOpen: isLoginOpen,
		closeModal: closeLoginModal,
		openModal: openLoginModal,
	} = useModal();

	const {
		isOpen: isPurchaseRequiredOpen,
		closeModal: closePurchaseRequiredModal,
		openModal: openPurchaseRequiredModal,
	} = useModal();


	const goToLessonPage = (lesson: Lesson) => {
		if (!isLoggedIn()) {
			openLoginModal();
			return;
		}

		if (lesson.free) {
			window.location.href = makeLocaleUrl(`/lessons/${lesson.slug}`);
			return;
		}

		if (isEnrolled) {
			window.location.href = makeLocaleUrl(`/lessons/${lesson.slug}`);
			return;
		}

		openPurchaseRequiredModal();
	};


	if (lessons.length <= 0) {
		return (
			<section id="course-content" className=" container mx-auto w-full mt-10 text-greenish">
				<SectionTitle title={t('our_lessons')} className="font-semibold" />
				<div className="w-full min-h-[500px] mt-3rem">
					<NoData />
				</div>
			</section>
		);
	}

	return (
		<section id="course-content" className="w-full mt-10 text-greenish flex flex-col gap-5">
			<SectionTitle title={t('our_lessons')} className="font-semibold" />

			<div className="flex flex-col gap-5">
				{lessons.map((lesson, index) => (
					<LessonWideCard
						lesson={lesson}
						imgOnLeft={index % 2 === 0}
						onClick={() => { goToLessonPage(lesson); }}
					/>
				))}
			</div>
			<NeedToPurchaseCourse
				isOpen={isPurchaseRequiredOpen}
				closeModal={closePurchaseRequiredModal}
			/>
			<ShouldLoginModal
				isOpen={isLoginOpen}
				closeModal={closeLoginModal}
			/>
		</section>
	);
}
