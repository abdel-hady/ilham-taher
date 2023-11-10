import React from 'react';
import './globals.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import { Changa } from 'next/font/google';
import ProgressBar from './components/loaders/ProgressBar';

// import Particles from './components/particles';


config.autoAddCss = false;

const changa = Changa(
	{
		weight: ['200', '300', '400', '500', '600', '700', '800'],
		subsets: ['arabic', 'latin'],
		style: ['normal'],
		display: 'swap',
	},
);


export const metadata = {
	title: 'Ilhem Taher',
	description: 'Ilhem Taher website',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<body
				className={changa.className}
			>

				{children}
				<ProgressBar />
			</body>
		</html>
	);
}
