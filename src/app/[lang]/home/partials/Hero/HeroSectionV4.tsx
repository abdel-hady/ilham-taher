import StandardBtn from '@/app/components/common/StandardBtn';
import Image from 'next/image';
import React from 'react';

export default function HeroSectionV4() {
	return (
		<div className="relative overflow-hidden flex flex-row md:flex-row" style={{ height: '75svh' }}>
			<Image
				alt="Hero"
				src="/assets/images/heros/bg/on-left.jpg"
				width={2000}
				height={2000}
				className="object-cover w-full"
			/>

			<div className="absolute p-2 top-0 left-0 z-10 w-full h-full flex justify-end">
				<div className="flex flex-col gap-3 justify-center h-100 w-1/2 px-20 text-greenish text-right mr-28 mt-10">
					<h1 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl drop-shadow-lg">
						{/* Ilhem Taher */}
						وفيك انطوى العالم الأكبر
					</h1>
					<p className="text-sm sm:text-xl md:text-2xl lg:text-3xl">
						{/* In this space, I present to you everything that helps you in balance and recovery
						Physical, emotional and energy */}
						اقدم لكم في هذه المساحة كل ما يساعدكم في التوازن والتشافي
						الجسدي، المشاعري والطاقي
					</p>
					<div className="flex justify-end w-full sm:justify-end md:justify-end lg:justify-end xl:justify-end mt-3">
						{/* <StandardBtn text="Discover Our Services" /> */}
						<StandardBtn text="اكتشف خدماتنا" />
					</div>
				</div>

			</div>
		</div>
	);
}
