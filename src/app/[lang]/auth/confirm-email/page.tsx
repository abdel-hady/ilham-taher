'use client';

import React, { useEffect } from 'react';
import UsersService from '@/app/lib/services/UsersService';
import { useLocaleProvider } from '@/app/components/providers/LocaleProvider';
import '../../../components/loaders/PageLoader/style.css';


export default function ConfirmEmailPage() {
	let params = null;
	const { makeLocaleUrl, locale } = useLocaleProvider();

	useEffect(() => {
		params = new URLSearchParams(window.location.search);
		UsersService.verifyEmail(params.get('confirmationToken'), locale).then(() => {
			setTimeout(() => {
				window.location.href = makeLocaleUrl('profile?verified=1');
			}, 500);
		});
	}, []);
	return (
		<div
			id="loader-wrapper"
			style={{
				zIndex: '100',
				position: 'fixed',
				background: 'white',
				top: '0',
			}}
		>
			<span className="loader" />
		</div>
	);
}
