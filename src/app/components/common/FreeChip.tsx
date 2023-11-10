'use client';

import { useTranslations } from 'next-intl';
import React from 'react';

export default function FreeChip() {
	const t = useTranslations();
	return (
		<div className="badge badge-lg p-4 capitalize" style={{ backgroundColor: 'rgb(187, 255, 133, 0.6)' }}>
			{t('free')}
		</div>
	);
}
