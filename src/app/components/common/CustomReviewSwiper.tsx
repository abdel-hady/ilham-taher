'use client';

import { v4 as uuidv4 } from 'uuid';

import React from 'react';
import {
	Swiper,
	SwiperSlide,
} from 'swiper/react';
import SwiperCore, {
	EffectCoverflow, Navigation, Pagination, Autoplay,
} from 'swiper';
import 'swiper/css';

SwiperCore.use([Autoplay]);

interface ReviewSwiperProps {
	children: React.ReactNode[];
}

export default function CustomReviewSwiper({ children }: ReviewSwiperProps): JSX.Element {
	return (
		<Swiper
			effect="coverflow"
			spaceBetween={50}
			slidesPerView={3}
			grabCursor
			centeredSlides
			loop
			coverflowEffect={{
				rotate: 0,
				stretch: 0,
				depth: 100,
				modifier: 2.5,
			}}
			pagination={{ el: '.swiper-pagination', clickable: true }}
			navigation={{
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
				// clickable: true,
			}}
			modules={[EffectCoverflow, Pagination, Navigation]}
			className="swiper_container"
			slideActiveClass="swiper-slide-active"
			autoplay={{ delay: 3000 }}
			breakpoints={{
				0: {
					slidesPerView: 1,
					spaceBetween: 20,
				},
				640: {
					slidesPerView: 2,
					spaceBetween: 30,
				},
				768: {
					slidesPerView: 3,
					spaceBetween: 30,
				},
			}}
		>
			{children.map((review) => (
				<SwiperSlide key={uuidv4()}>{review}</SwiperSlide>
			))}
		</Swiper>
	);
}
