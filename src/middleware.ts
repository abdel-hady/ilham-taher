import { NextRequest, NextResponse } from 'next/server';


import localeConfigs from '../locale/config.json';


export default function middleware(request: NextRequest): NextResponse | undefined {
	const { pathname, search } = request.nextUrl;


	const pathnameIsMissingValidLocale = localeConfigs.locales.every((locale) => !pathname.startsWith(`/${locale}`));
	if (pathnameIsMissingValidLocale) {
		return NextResponse.redirect(
			new URL(
				`/${localeConfigs.defaultLocale}/${pathname}${search}`,
				request.url,
			),
		);
	}

	const isHomePage = pathname.endsWith(`/${localeConfigs.defaultLocale}`);
	if (isHomePage) {
		return NextResponse.redirect(
			new URL(
				`/${localeConfigs.defaultLocale}/home${search}`,
				request.url,
			),
		);
	}
	return undefined;
}

export const config = {
	matcher: [
		// Skip all internal paths (_next)
		'/((?!api|_next/static|_next/image|images|assets|favicon.ico|sw.js).*)',
	],
};
