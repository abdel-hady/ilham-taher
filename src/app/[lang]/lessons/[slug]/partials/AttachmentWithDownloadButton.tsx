'use client';

import parseImageUrl from '@/app/util/parseImageUrl';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';

interface AttachmentWithDownloadButtonProp {
	attachmentUrl: string;
	attachmentFilename: string;
}
export default function AttachmentWithDownloadButton({
	attachmentUrl,
	attachmentFilename,
}: AttachmentWithDownloadButtonProp) {
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const t = useTranslations();
	const onClick = () => {
		setIsLoading(true);
		fetch(parseImageUrl(attachmentUrl), {
			method: 'GET',
		})
			.then((response) => response.blob())
			.then((blob) => {
				const url = window.URL.createObjectURL(blob);
				const a = document.createElement('a');
				a.href = url;
				a.download = attachmentFilename;
				document.body.appendChild(a);
				a.click();
				a.remove(); // afterwards we remove the element again
				setTimeout(() => {
					setIsLoading(false);
				}, 500);
			});
	};
	return (
		<div>
			<button className="btn btn-outline w-[200px]" onClick={onClick} type="button" disabled={isLoading}>

				{isLoading
					? <span className="loading loading-spinner" />
					:						(
						<>
							<span><FontAwesomeIcon icon={faDownload} /></span>
							<span>{t('download_attachement')}</span>
						</>
					)}

			</button>
		</div>
	);
}
