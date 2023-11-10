'use client';

import Image from 'next/image';
import React, { ReactElement, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faBars, faBellConcierge, faBookOpen, faHomeAlt, faPersonChalkboard,
} from '@fortawesome/free-solid-svg-icons';
import { faBlogger } from '@fortawesome/free-brands-svg-icons';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import useClickOutsideClose from '@/app/hooks/useClickOutsideClose';
import NavbarPagesLinks from './partials/NavbarPagesLinks';
import { useLocaleProvider } from '../providers/LocaleProvider';

function DropdownBurgerMenuLinks({ closeNavCb }: { closeNavCb: ()=>void }) {
	const { makeLocaleUrl } = useLocaleProvider();
	const t = useTranslations();

	const { dropdownRef } = useClickOutsideClose({ closeCb: closeNavCb });

	const links = [
		{ title: t('home'), icon: faHomeAlt, link: makeLocaleUrl('/home') },
		{ title: t('courses'), icon: faBookOpen, link: makeLocaleUrl('/courses') },
		{ title: t('sessions'), icon: faPersonChalkboard, link: makeLocaleUrl('/sessions') },
		{ title: t('our_services'), icon: faBellConcierge, link: makeLocaleUrl('/our-services') },
		{ title: t('blogs'), icon: faBlogger, link: makeLocaleUrl('/blogs') },
	];

	const aboutUsLinks = [
		{ title: t('ilhem_taher'), link: makeLocaleUrl('/about-us/ilhem-taher') },
		{ title: t('the_new_childhood_association'), link: makeLocaleUrl('/about-us/new-me-child-charity') },
		{ title: t('faq'), link: makeLocaleUrl('/about-us/faq') },
	];
	return (
		<div ref={dropdownRef}>
			<ul className="w-full text-center text-xl flex flex-col gap-4 py-4 xl:hidden border-t-2 border-t-gray-100">
				{links.map((link) => (
					<li className="w-[120px] mx-auto">
						<Link href={link.link} className="flex justify-between" onClick={() => { closeNavCb(); }}>
							<span>{link.title}</span>
							<span><FontAwesomeIcon icon={link.icon} /></span>
						</Link>
					</li>
				))}
				<li className="flex justify-center"><hr className="w-[75%] border border-1" /></li>
				{aboutUsLinks.map((link) => (
					<li className="flex justify-center mx-auto hover:scale-110 transition">
						<Link href={link.link} onClick={() => { closeNavCb(); }}>
							<span>{link.title}</span>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}

function Navbar(): ReactElement {
	const [navbarOpen, setNavbarOpen] = useState(false);
	const { isRtl, makeLocaleUrl } = useLocaleProvider();

	return (
		<nav
			className="bg-white shadow-lg"
		>
			<div
				className="container mx-auto flex flex-wrap justify-between items-stretch"
			>
				<div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
					<a
						className={
							`text-gray-800
							title-lg font-bold leading-relaxed inline-block py-2 whitespace-nowrap uppercase
							${isRtl ? 'ml-4' : 'mr-4'}
							`
						}
						href={makeLocaleUrl('/home')}
					>
						<Image
							src="/assets/images/logo.svg"
							alt="Ilham Taher Logo"
							width={100}
							height={24}
						/>
					</a>
					<button
						className={`
						btn block my-auto mr-3 lg:hidden
						${navbarOpen ? ' bg-gray-100' : 'bg-transparent'}
						`}
						type="button"
						onClick={() => setNavbarOpen(!navbarOpen)}
					>
						<span>
							<FontAwesomeIcon icon={faBars} />
						</span>
					</button>
				</div>
				<div
					className={
						`lg:flex flex-grow items-stretch bg-white lg:bg-transparent lg:shadow-none${
							navbarOpen ? ' block rounded shadow-lg' : ' hidden'}`
					}
					id="example-navbar-warning"
				>
					{navbarOpen
						? <DropdownBurgerMenuLinks closeNavCb={() => { setNavbarOpen(false); }} />
						: <NavbarPagesLinks />}
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
