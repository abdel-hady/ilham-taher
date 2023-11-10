import { useTranslations } from 'next-intl';
import React from 'react';
import { SessionCalendlyDetails } from '@/app/util/types/remote-types';
import Image from 'next/image';
import { useLocaleProvider } from '@/app/components/providers/LocaleProvider';
import GeneralModal from '../../../../components/common/modals/GeneralModal';

interface ShouldLoginModalProps {
	isOpen: boolean;
	closeModal: ()=>void;
	sessionCalendlyDetailsArray: SessionCalendlyDetails[];


}
export default function SelectPaymentMethodModal({
	isOpen,
	closeModal,
	sessionCalendlyDetailsArray,
}:ShouldLoginModalProps) {
	const t = useTranslations();
	const { makeLocaleUrl } = useLocaleProvider();
	const handleClick = (url: string) => {
		// Add the url to the session storage
		sessionStorage.setItem('calendlyUrl', url);

		// Go to calendly page
		window.location.href = makeLocaleUrl('/calendly');
	};

	return (
		<GeneralModal
			isOpen={isOpen}
			title={t('payment_method')}
			description={t('select_your_prefered_payment_method')}
			hideText={t('hide')}
			closeModal={closeModal}
		>
			<div className="flex items-center">
				{sessionCalendlyDetailsArray.map((detailsObj) => (
					<button
						onClick={() => { handleClick(detailsObj.url); }}
						style={{ width: '200px', height: '100px' }}
						className={`border-0 flex justify-center items-center ${detailsObj.paymentProvider.value === 'STRIPE' ? 'border-l border-black' : ''}`}
						type="button"
					>
						{ detailsObj.paymentProvider.value === 'STRIPE'
							&& (
								<Image
									src="/assets/images/payment-icons/visa-master-card-icon-removebg-preview.png"
									width="500"
									height="500"
									className=" object-fit max-w-45 hover:scale-110 transform duration-150"
									alt={detailsObj.paymentProvider.label}
								/>
							)}
						{ detailsObj.paymentProvider.value === 'PAYPAL'
							&& (
								<Image
									src="/assets/images/payment-icons/paypal-icon.png"
									width="500"
									height="80"
									className=" object-fit max-w-70 hover:scale-110 transform duration-150"
									alt={detailsObj.paymentProvider.label}
								/>
							)}
					</button>
				))}
			</div>
		</GeneralModal>
	);
}
