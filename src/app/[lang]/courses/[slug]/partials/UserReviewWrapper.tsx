'use client';

import AddReviewSection from '@/app/components/common/AddReviewSection';
import ViewReviewSection from '@/app/components/common/ViewReviewSection';
import CoursesService from '@/app/lib/services/CoursesService';
import { MyReview } from '@/app/util/types/remote-types';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslations } from 'next-intl';

export default function UserReviewWrapper({ courseId }: { courseId:string }) {
	const [myReview, setMyReview] = useState<MyReview | null>(null);
	const t = useTranslations();
	const onSubmit = (comment: string) => {
		CoursesService.addReviewToCourse(courseId, comment).then((data:any) => {
			toast.success(t('comment_added_successfully'), { position: 'top-right' });
			setMyReview({
				comment: data.comment,
				id: data.id,
			});
		});
	};

	useEffect(() => {
		async function getTheReview() {
			const res = await CoursesService.getMyReviewToCourse(courseId, 'en');
			setMyReview(res);
		}

		getTheReview();
	}, []);

	if (!myReview) {
		return (
			<AddReviewSection onSubmit={onSubmit} />
		);
	}
	return <ViewReviewSection comment={myReview.comment} />;
}
