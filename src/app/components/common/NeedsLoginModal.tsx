import React from 'react';
import { Dialog } from '@headlessui/react';
import { calculateDir } from '@/app/util/RtlUtils';
import { useTranslations } from 'next-intl';
import { useLocaleProvider } from '../providers/LocaleProvider';

interface NeedsLoginModalProps {
	actionCb:()=>void;
	hideCb: ()=>void;
	isOpen: boolean;
	title?: string;
	description?: string;
}
export default function NeedsLoginModal({
	actionCb, hideCb, isOpen,
	title = 'لا يمكنك التسجيل',
	description = 'يجب عليك تسجيل الدخول من أجل التسجيل',
}: NeedsLoginModalProps) {
	const { locale } = useLocaleProvider();
	const t = useTranslations();
	return (
		<Dialog
			open={isOpen}
			onClose={hideCb}
			as="div"
			dir={calculateDir(locale)}
			className="
				absolute top-1/2 left-1/2 -translate-x-1/2 z-10 w-[400px]
				shadow-lg rounded-lg border-2 border-gray-200 py-5 px-10
				bg-white
				"
		>
			<Dialog.Panel className="flex flex-col gap-3">
				<Dialog.Title>{title}</Dialog.Title>
				<Dialog.Description>
					{description}
				</Dialog.Description>

				<div className="w-full flex justify-between">
					<button className="btn btn-neutral" onClick={() => { 	actionCb(); }} type="button">{t('go_to_login')}</button>
					<button className="btn" onClick={() => { hideCb(); }} type="button">{t('hide')}</button>
				</div>
			</Dialog.Panel>
		</Dialog>
	);
}
