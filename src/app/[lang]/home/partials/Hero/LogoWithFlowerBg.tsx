import SliderTextWithLogoOverlay from '@/app/components/hero/SliderTextWithLogoOverlay';
import Image from 'next/image';
import React from 'react';

export default function HeroSectionV2() {
	return (
		<div className="relative overflow-hidden" style={{ height: '75svh' }}>
			<Image
				alt="Hero"
				src="/assets/images/heros/bg/flowers.jpg"
				width={2000}
				height={2000}
				className="object-cover w-full h-full opacity-40"
			/>
			<SliderTextWithLogoOverlay />
		</div>
	);
}
