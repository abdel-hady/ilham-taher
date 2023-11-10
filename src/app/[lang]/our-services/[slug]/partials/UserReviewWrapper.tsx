'use client';

import AddReviewSection from '@/app/components/common/AddReviewSection';
import ViewReviewSection from '@/app/components/common/ViewReviewSection';
import SessionsService from '@/app/lib/services/SessionsService';
import { MyReview } from '@/app/util/types/remote-types';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function UserReviewWrapper({ sessionId }: { sessionId: string }) {
	const [myReview, setMyReview] = useState<MyReview | null>(null);
	const t = useTranslations();
	const onSubmit = (comment: string) => {
		SessionsService.addReviewToSession(sessionId, comment).then((data: any) => {
			toast.success(t('comment_added_successfully)', { position: 'top-right' }));
			setMyReview({
				comment: data.comment,
				id: data.id,
			});
		});
	};

	useEffect(() => {
		async function getTheReview() {
			const res = await SessionsService.getMyReviewToSession(sessionId, 'en');
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
