/* eslint-disable react/require-default-props */

'use client';

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { COME_FROM_LEFT_X, EASE_IN_DURATION_IN_SECONDS } from './constants';

interface EaseInFromLeftProps {
	children: ReactNode;
	className?: string;
	parentInView: boolean;
}

export default function EaseInFromLeft({ children, className = '', parentInView }: EaseInFromLeftProps) {
	const variants = {
		hidden: { x: COME_FROM_LEFT_X },
		visible: { x: 0, transition: { duration: EASE_IN_DURATION_IN_SECONDS } },
	};

	return (
		<motion.div
			className={className}
			variants={variants}
			initial="hidden"
			animate={parentInView ? 'visible' : 'hidden'}
		>
			{children}
		</motion.div>
	);
}
