'use client';

import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useLocaleProvider } from '../providers/LocaleProvider';

export default function FindYourSessionOverlay() {
	const t = useTranslations();
	const { makeLocaleUrl } = useLocaleProvider();
	const pathname = usePathname();

	const [canShow, setCanShow] = useState<boolean>(false);

	useEffect(() => {
		if (sessionStorage.getItem('FindYourSessionOverlayVisible') === 'false') {
			return;
		}
		setTimeout(() => {
			setCanShow(true);
		}, 20000);
	}, []);


	const onHideClicked = () => {
		setCanShow(false);
		sessionStorage.setItem('FindYourSessionOverlayVisible', 'false');
	};


	const isInFindYourSessionPage = pathname.includes('find-your-session');
	if (isInFindYourSessionPage || !canShow) {
		return null;
	}

	return (
		<div className="
            w-[350px] bg-white rounded-lg
            border-2 border-gray-200
            shadow-lg
            fixed bottom-[1rem] right-[2rem] z-50
            p-5
            flex flex-col gap-5
			bg-flowers
        "
		>
			<h4 className="text-2xl font-bold text-greenish">
				{t('need_help_finding_session')}
			</h4>
			<div className="w-full flex justify-between">
				<button
					className="
                        btn btn-active btn-ghost
                        text-white
                    "
					type="button"
					onClick={onHideClicked}

				>{t('hide')}
				</button>

				<Link
					className="
						btn btn-active
						border-0
						bg-golden
						text-white
					"
					href={makeLocaleUrl('/find-your-session')}
				>
					{t('start_now')}
				</Link>
			</div>
		</div>
	);
}
